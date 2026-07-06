/**
 * ================================================================
 * Automated Script Enterprise Automation Framework
 * ------------------------------------------------
 * Module  : Self Healing
 * File    : SelfHealingEngine.js
 * Purpose : Enterprise locator recovery engine
 *  Responsibility

SelfHealingEngine coordinates:

Try original locator
Try previous successful locator
Attribute-based recovery
Similarity matching
XPath fallback
Update repository
Return HealingResult

It does not directly perform actions like click/type.

BaseElement remains the executor.
 * Author  : Mahesh Upadhyay
 * ================================================================
 */


import { HealingResult }
    from "./HealingResult.js";


import { LocatorRepository }
    from "./LocatorRepository.js";


import { LocatorSnapshotManager }
    from "./LocatorSnapshotManager.js";


import { SimilarityMatcher }
    from "./SimilarityMatcher.js";

import { HealingReporter }
    from "../reporting/HealingReporter.js";


/**
 * Main Self Healing Engine.
 *
 * Responsible for:
 *
 * - Locator recovery
 * - Attribute matching
 * - Similarity matching
 * - Repository update
 *
 * @class SelfHealingEngine
 */
export class SelfHealingEngine {


    static CONFIDENCE_THRESHOLD = 0.75;



    /**
     * Resolve working locator.
     *
     * @param {Page} page
     * Playwright page instance
     *
     * @param {string} locatorKey
     * Example:
     * LoginPage.username
     *
     * @param {string} selector
     * Original locator
     *
     * @returns {HealingResult}
     */
    static async resolve(
        page,
        locatorKey,
        selector
    ){


        /**
         * 1. Try original locator
         */
        if(
            await this.isLocatorWorking(
                page,
                selector
            )
        ){


            await LocatorSnapshotManager.capture(
                page,
                locatorKey,
                selector
            );


            return HealingResult.original(
                selector
            );

        }




        /**
         * Load previous locator information
         */
        const storedData =
            LocatorRepository.get(
                locatorKey
            );



        /**
         * 2. Previous successful locator
         */
        if(
            storedData
            &&
            storedData.successfulLocator
        ){


            const previous =
                storedData.successfulLocator;



            if(
                await this.isLocatorWorking(
                    page,
                    previous
                )
            ){


                const result =
                HealingResult.success({


                    elementName:
                        locatorKey,


                    originalLocator:
                        selector,


                    resolvedLocator:
                        previous,


                    strategy:
                        "PREVIOUS_SUCCESSFUL",


                    confidence:
                        0.95,


                    message:
                        "Recovered using previous successful locator"

                });




            await HealingReporter
                .attachHealingResult(
                    result
                );



            return result;

            }

        }




        /**
         * No previous snapshot available
         */
        if(
            !storedData
            ||
            !storedData.attributes
        ){


        const failure =
            HealingResult.failure(

                selector,

                "No locator snapshot available"

            );



        await HealingReporter
            .attachHealingFailure({


                element:
                    locatorKey,


                locator:
                    selector,


                reason:
                    "No locator snapshot available",


                timestamp:
                    new Date()
                        .toISOString()

            });




        return failure;

        }





        /**
         * 3 + 4 Attribute and similarity healing
         */
        const candidates =
            await this.collectCandidates(
                page
            );



        const bestMatch =
            SimilarityMatcher.findBestMatch(

                storedData.attributes,

                candidates

            );




        if(
            bestMatch
            &&
            bestMatch.confidence
                >=
            this.CONFIDENCE_THRESHOLD
        ){



            LocatorRepository
                .updateSuccessfulLocator(

                    locatorKey,

                    bestMatch.locator

                );



            const result =
            HealingResult.success({


                elementName:
                    locatorKey,


                originalLocator:
                    selector,


                resolvedLocator:
                    bestMatch.locator,


                strategy:
                    "SIMILARITY_MATCH",


                confidence:
                    bestMatch.confidence,


                message:
                    "Recovered using DOM similarity"

            });





        await HealingReporter
            .attachHealingResult(
                result
            );




        return result;

        }






        /**
         * Healing failed
         */
        const failure =
            HealingResult.failure(

                selector,

                "Unable to heal locator"

            );



        await HealingReporter
            .attachHealingFailure({


                element:
                    locatorKey,


                locator:
                    selector,


                strategy:
                    "ALL_STRATEGIES_FAILED",


                timestamp:
                    new Date()
                        .toISOString()

            });




        return failure;

    }







    /**
     * Verify locator existence.
     *
     * @param {Page} page
     * @param {string} selector
     *
     * @returns {boolean}
     */
    static async isLocatorWorking(
        page,
        selector
    ){


        try{


            const locator =
                page.locator(selector);



            return (
                await locator.count()
            )
            >
            0;


        }
        catch(error){


            return false;

        }

    }







    /**
     * Collect possible DOM candidates.
     *
     * Creates alternative locator options.
     *
     * @param {Page} page
     *
     * @returns {Array}
     */
    static async collectCandidates(
        page
    ){


        return await page.evaluate(()=>{


            const elements =
                Array.from(
                    document.querySelectorAll("*")
                );


            return elements.map(element=>{


                const attributes = {


                    tag:
                        element.tagName
                            .toLowerCase(),


                    id:
                        element.id,


                    name:
                        element.getAttribute(
                            "name"
                        ),


                    class:
                        element.getAttribute(
                            "class"
                        ),


                    placeholder:
                        element.getAttribute(
                            "placeholder"
                        ),


                    "aria-label":
                        element.getAttribute(
                            "aria-label"
                        ),


                    text:
                        element.innerText

                };





                let locator = null;



                if(attributes.id){

                    locator =
                        "#" + attributes.id;

                }
                else if(attributes.name){

                    locator =
                        `${attributes.tag}[name='${attributes.name}']`;

                }
                else if(attributes.placeholder){

                    locator =
                        `${attributes.tag}[placeholder='${attributes.placeholder}']`;

                }
                else if(attributes.text){

                    locator =
                        `text=${attributes.text}`;

                }





                return {

                    locator,

                    attributes

                };


            })
            .filter(

                item =>
                    item.locator !== null

            );

        });

    }

    /**
     * ============================================================================
     * Compatibility method for BaseElement integration
     * ----------------------------------------------------------------------------
     * BaseElement calls heal().
     *
     * Internally delegates to main resolver.
     *
     * @param {Page} page
     * @param {string} locatorKey
     * @param {string} selector
     *
     * @returns {Promise<HealingResult>}
     * ============================================================================
     */
    static async heal(
        page,
        locatorKey,
        selector
    ){


        return await this.resolve(

            page,

            locatorKey,

            selector

        );

    }

    /**
     * ============================================================================
     * Capture successful locator snapshot.
     *
     * Called automatically from BaseElement whenever
     * primary locator works.
     *
     * Stores metadata for future healing.
     *
     * @param {string} locatorKey
     * Element unique name
     *
     * @param {string} selector
     * Original selector
     *
     * @param {Locator} locator
     * Playwright locator
     *
     * ============================================================================
     */
    /**
     * Capture successful locator snapshot.
     *
     * Temporary debug version.
     */
    static async captureSnapshot(
        locatorKey,
        selector,
        locator
    ){


        console.log(
            "==============================="
        );

        console.log(
            "SELF HEAL SNAPSHOT START"
        );


        console.log(
            "KEY:",
            locatorKey
        );


        console.log(
            "SELECTOR:",
            selector
        );



        await LocatorSnapshotManager.capture(

            locatorKey,

            selector,

            locator

        );



        console.log(
            "SELF HEAL SNAPSHOT SAVED:",
            locatorKey
        );


        console.log(
            "==============================="
        );

    }
}
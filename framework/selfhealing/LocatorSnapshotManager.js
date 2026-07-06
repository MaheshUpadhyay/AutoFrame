/**
 * ================================================================
 * Automated Script Enterprise Automation Framework
 * ------------------------------------------------
 * Module  : Self Healing
 * File    : LocatorSnapshotManager.js
 * Purpose : Captures successful locator metadata snapshots
 * It is responsible for:

Reading live DOM attributes
Creating locator fingerprint
Saving successful locator snapshots
Updating LocatorRepository
Providing data later for healing comparison
 *
 * Author  : Mahesh Upadhyay
 * ================================================================
 */


import { LocatorRepository } 
    from "./LocatorRepository.js";


/**
 * Captures and manages locator snapshots.
 *
 * Snapshot data is later used by
 * SelfHealingEngine for recovery.
 *
 * @class LocatorSnapshotManager
 */
export class LocatorSnapshotManager {


    /*
    * Capture successful locator snapshot.
    *
    * Called by SelfHealingEngine.
    *
    * @param {string} locatorKey
    * Element unique name
    *
    * @param {string} selector
    * Original locator
    *
    * @param {Locator} locator
    * Playwright locator object
    */
    static async capture(
        locatorKey,
        selector,
        locator
    ){


        try{


            const count =
                await locator.count();



            if(count === 0){

                return;

            }




            const element =
                locator.first();




            const attributes =
                await this.extractAttributes(

                    element

                );




            LocatorRepository.update(

                locatorKey,

                {

                    primary:
                        selector,


                    successfulLocator:
                        selector,


                    attributes

                }

            );



        }
        catch(error){


            console.warn(

                `Snapshot capture failed : ${locatorKey}`,

                error.message

            );

        }

    }






    /**
     * Extract element attributes.
     *
     * @param {Locator} element
     *
     * @returns {Object}
     */
    static async extractAttributes(
        element
    ){


        const attributes = {};



        attributes.tag =
            await element.evaluate(

                node =>
                    node.tagName
                        .toLowerCase()

            );




        attributes.id =
            await element.getAttribute(
                "id"
            );



        attributes.name =
            await element.getAttribute(
                "name"
            );



        attributes.class =
            await element.getAttribute(
                "class"
            );



        attributes.placeholder =
            await element.getAttribute(
                "placeholder"
            );



        attributes["aria-label"] =
            await element.getAttribute(
                "aria-label"
            );



        attributes.type =
            await element.getAttribute(
                "type"
            );



        attributes.text =
            await this.extractText(
                element
            );



        return this.clean(
            attributes
        );

    }






    /**
     * Extract visible text.
     *
     * @param {Locator} element
     *
     * @returns {string}
     */
    static async extractText(
        element
    ){

        try{


            return (
                await element.innerText()
            )
            .trim();

        }
        catch(error){

            return "";

        }

    }







    /**
     * Remove empty/null attributes.
     *
     * Keeps repository clean.
     *
     * @param {Object} attributes
     *
     * @returns {Object}
     */
    static clean(attributes){


        const cleaned = {};



        for(
            const key
            of Object.keys(attributes)
        ){


            const value =
                attributes[key];



            if(
                value !== null
                &&
                value !== undefined
                &&
                value !== ""
            ){

                cleaned[key] =
                    value;

            }

        }



        return cleaned;

    }

}
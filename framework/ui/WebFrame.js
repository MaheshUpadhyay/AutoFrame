/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebFrame.js
 * Purpose : Enterprise Frame wrapper
 *
 * Provides reusable operations for iframe handling.
 *
 * Supports:
 *
 * - iframe locator access
 * - role selectors
 * - text selectors
 * - label selectors
 * - placeholder selectors
 * - test id selectors
 *
 * NOTE:
 *
 * WebFrame does NOT extend BaseElement.
 *
 * A frame is a browsing context/container,
 * not a DOM element.
 *
 * Author  : Mahesh Upadhyay
 * ============================================================================
 */


/**
 * Enterprise Frame Element.
 *
 * @class WebFrame
 */
export class WebFrame {


    #frame;

    #description;

    #page;

    #selector;



    /**
     * Creates Frame wrapper.
     *
     * Existing:
     *
     * new WebFrame(frameLocator)
     *
     * Enhanced:
     *
     * new WebFrame(
     *      page,
     *      "#iframe",
     *      "Payment Frame"
     * )
     *
     * @param {*} frameOrPage
     * @param {string} selectorOrDescription
     * @param {string} description
     */
    constructor(
        frameOrPage,
        selectorOrDescription =
            "Frame",
        description =
            "Frame"
    ){


        if(!frameOrPage){

            throw new Error(
                "Frame cannot be null."
            );

        }



        /*
         * New framework style:
         *
         * page + selector
         */
        if(
            typeof selectorOrDescription
                ===
            "string"
            &&
            frameOrPage.frameLocator
        ){


            this.#page =
                frameOrPage;


            this.#selector =
                selectorOrDescription;


            this.#frame =
                frameOrPage.frameLocator(
                    selectorOrDescription
                );


            this.#description =
                description;

        }

        /*
         * Backward compatibility:
         *
         * direct FrameLocator
         */
        else{


            this.#frame =
                frameOrPage;


            this.#description =
                selectorOrDescription;


            this.#page =
                null;


            this.#selector =
                null;

        }

    }








    /**
     * Returns Playwright FrameLocator.
     *
     * @returns {FrameLocator}
     */
    getFrame(){


        return this.#frame;

    }








    /**
     * Returns description.
     *
     * @returns {string}
     */
    getDescription(){


        return this.#description;

    }








    /**
     * Returns iframe selector.
     *
     * @returns {string|null}
     */
    getSelector(){


        return this.#selector;

    }









    // ============================================================
    // Locator Methods
    // ============================================================


    /**
     * Find element inside frame.
     *
     * @param {string} selector
     */
    locator(selector){


        return this.#frame.locator(
            selector
        );

    }







    /**
     * Locate by role.
     *
     * @param {string} role
     * @param {object} options
     */
    getByRole(
        role,
        options = {}
    ){


        return this.#frame.getByRole(

            role,

            options

        );

    }







    /**
     * Locate by text.
     *
     * @param {string|RegExp} text
     */
    getByText(text){


        return this.#frame.getByText(
            text
        );

    }








    /**
     * Locate by label.
     *
     * @param {string|RegExp} label
     */
    getByLabel(label){


        return this.#frame.getByLabel(
            label
        );

    }








    /**
     * Locate by placeholder.
     *
     * @param {string|RegExp} placeholder
     */
    getByPlaceholder(
        placeholder
    ){


        return this.#frame
            .getByPlaceholder(
                placeholder
            );

    }









    /**
     * Locate by test id.
     *
     * @param {string} testId
     */
    getByTestId(testId){


        return this.#frame
            .getByTestId(
                testId
            );

    }









    // ============================================================
    // Frame State Helpers
    // ============================================================


    /**
     * Check frame exists.
     *
     * Works only when page metadata exists.
     *
     * @returns {Promise<boolean>}
     */
    async exists(){


        if(
            !this.#page
            ||
            !this.#selector
        ){

            return true;

        }



        return (

            await this.#page

                .locator(this.#selector)

                .count()

        ) > 0;

    }









    /**
     * Wait for frame attached.
     *
     * @param {number} timeout
     */
    async waitForFrame(
        timeout = 30000
    ){


        if(
            !this.#page
            ||
            !this.#selector
        ){

            return;

        }



        await this.#page

            .locator(this.#selector)

            .waitFor({

                state:"attached",

                timeout

            });

    }

}
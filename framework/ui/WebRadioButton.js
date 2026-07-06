/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebRadioButton.js
 * Purpose : Enterprise Radio Button wrapper with Self Healing support
 *
 * Provides radio button specific operations while inheriting:
 *
 * - Common UI actions
 * - Wait handling
 * - Assertions
 * - Screenshots
 * - Self healing locator recovery
 *
 * Author  : Mahesh Upadhyay
 * ============================================================================
 */


import { BaseElement }
    from "../core/BaseElement.js";


/**
 * Enterprise Radio Button Element.
 *
 * @class WebRadioButton
 */
export class WebRadioButton extends BaseElement {


    /**
     * Creates radio button element.
     *
     * @param {import("@playwright/test").Page} page
     * Playwright page instance
     *
     * @param {string} selector
     * Locator selector
     *
     * @param {string} description
     * Element description
     */
    constructor(
        page,
        selector,
        description = "Radio Button"
    ){

        super(

            page.locator(selector),

            description,

            {
                page,

                selector
            }

        );

    }





    // ============================================================
    // Radio Button Actions
    // ============================================================


    /**
     * Select radio button.
     *
     * Safe if already selected.
     *
     * @param {object} options
     */
    async select(
        options = {}
    ){


        await this.waitForVisible();

        await this.waitForEnabled();


        const locator =
            await this.getLocator();


        await locator.check(
            options
        );

    }






    /**
     * Select radio button only when required.
     */
    async selectIfRequired(){


        if(
            !(await this.isChecked())
        ){

            await this.select();

        }

    }






    /**
     * Selenium style alias.
     */
    async clickRadio(){


        await this.select();

    }







    // ============================================================
    // Information Methods
    // ============================================================


    /**
     * Returns radio button value.
     *
     * @returns {Promise<string|null>}
     */
    async getValue(){


        return await this.getAttribute(
            "value"
        );

    }






    /**
     * Returns radio button label.
     *
     * Supports:
     *
     * <label>
     *      <input type="radio">
     *      Option
     * </label>
     *
     * @returns {Promise<string>}
     */
    async getLabel(){


        const locator =
            await this.getLocator();


        const label =
            locator.locator(

                "xpath=ancestor::label[1]"

            );



        if(
            await label.count()
        ){

            return (

                await label.innerText()

            ).trim();

        }



        return "";

    }






    /**
     * Returns selection status.
     *
     * @returns {Promise<boolean>}
     */
    async isSelected(){


        return await this.isChecked();

    }







    // ============================================================
    // Assertions
    // ============================================================


    /**
     * Verify radio button selected.
     */
    async verifySelected(){


        await this.verifyChecked();

    }





    /**
     * Verify radio button not selected.
     */
    async verifyNotSelected(){


        await this.verifyUnchecked();

    }






    /**
     * Verify radio button label.
     *
     * @param {string|RegExp} expected
     */
    async verifyLabel(expected){


        const label =
            await this.getLabel();


        if(expected instanceof RegExp){


            if(!expected.test(label)){

                throw new Error(

                    `Radio label verification failed.
Expected pattern: ${expected}
Actual: ${label}`

                );

            }

        }
        else{


            if(label !== expected){

                throw new Error(

                    `Radio label verification failed.
Expected: ${expected}
Actual: ${label}`

                );

            }

        }

    }

}
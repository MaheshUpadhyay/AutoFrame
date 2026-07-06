/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebCheckBox.js
 * Purpose : Enterprise Checkbox wrapper with Self Healing support
 *
 * Provides checkbox specific operations while inheriting:
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
 * Enterprise Checkbox Element.
 *
 * @class WebCheckBox
 */
export class WebCheckBox extends BaseElement {


    /**
     * Creates checkbox element.
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
        description = "Checkbox"
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
    // Checkbox Actions
    // ============================================================


    /**
     * Check checkbox.
     *
     * Safe if already checked.
     *
     * @param {object} options
     */
    async check(
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
     * Uncheck checkbox.
     *
     * Safe if already unchecked.
     *
     * @param {object} options
     */
    async uncheck(
        options = {}
    ){


        await this.waitForVisible();

        await this.waitForEnabled();


        const locator =
            await this.getLocator();


        await locator.uncheck(
            options
        );

    }






    /**
     * Toggle checkbox status.
     */
    async toggle(){


        if(
            await this.isChecked()
        ){

            await this.uncheck();

        }
        else{

            await this.check();

        }

    }






    /**
     * Check checkbox only if required.
     */
    async checkIfRequired(){


        if(
            !(await this.isChecked())
        ){

            await this.check();

        }

    }






    /**
     * Uncheck checkbox only if required.
     */
    async uncheckIfRequired(){


        if(
            await this.isChecked()
        ){

            await this.uncheck();

        }

    }







    // ============================================================
    // Information Methods
    // ============================================================


    /**
     * Returns checkbox value attribute.
     *
     * @returns {Promise<string|null>}
     */
    async getValue(){


        return await this.getAttribute(
            "value"
        );

    }






    /**
     * Returns checkbox label.
     *
     * Supports:
     *
     * <label>
     *   <input type="checkbox">
     *   Text
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







    // ============================================================
    // Assertions
    // ============================================================


    /**
     * Verify checkbox checked.
     */
    async verifySelected(){


        await this.verifyChecked();

    }





    /**
     * Verify checkbox unchecked.
     */
    async verifyNotSelected(){


        await this.verifyUnchecked();

    }







    // ============================================================
    // Selenium Style Aliases
    // ============================================================


    /**
     * Alias for check().
     */
    async select(){


        await this.check();

    }





    /**
     * Alias for uncheck().
     */
    async deselect(){


        await this.uncheck();

    }

}
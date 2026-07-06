/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebButton.js
 * Purpose : Enterprise Button wrapper with Self Healing support
 *
 * Provides button specific operations while inheriting:
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
 * Enterprise Button Element.
 *
 * @class WebButton
 */
export class WebButton extends BaseElement {


    /**
     * Creates button element.
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
        description = "Button"
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
    // Information Methods
    // ============================================================


    /**
     * Returns button label/text.
     *
     * @returns {Promise<string>}
     */
    async getLabel(){


        return await this.getText();

    }




    /**
     * Returns trimmed button label.
     *
     * @returns {Promise<string>}
     */
    async getTrimmedLabel(){


        const label =
            await this.getLabel();


        return label.trim();

    }




    // ============================================================
    // Assertions
    // ============================================================


    /**
     * Verify exact button label.
     *
     * @param {string|RegExp} expected
     */
    async verifyLabel(expected){


        await this.verifyText(
            expected
        );

    }




    /**
     * Verify button contains text.
     *
     * @param {string} expected
     */
    async verifyContains(expected){


        await this.verifyContainsText(
            expected
        );

    }




    /**
     * Verify button is clickable.
     */
    async verifyClickable(){


        await this.verifyVisible();


        await this.verifyEnabled();

    }





    // ============================================================
    // State Methods
    // ============================================================


    /**
     * Returns true if button is clickable.
     *
     * @returns {Promise<boolean>}
     */
    async isClickable(){


        return (

            await this.isVisible()

            &&

            await this.isEnabled()

        );

    }





    /**
     * Wait until button becomes clickable.
     *
     * @param {number} timeout
     */
    async waitUntilClickable(
        timeout = 30000
    ){


        await this.waitForVisible(
            timeout
        );


        await this.waitForEnabled(
            timeout
        );

    }






    // ============================================================
    // Button Actions
    // ============================================================


    /**
     * Performs click after ensuring
     * button is clickable.
     *
     * @param {object} options
     */
    async safeClick(
        options = {}
    ){


        await this.waitUntilClickable();


        await this.click(
            options
        );

    }





    /**
     * Selenium style alias.
     *
     * Useful for readability.
     */
    async clickButton(){


        await this.safeClick();

    }

}
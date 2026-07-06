/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebTextBox.js
 * Purpose : Enterprise TextBox wrapper with Self Healing support
 *
 * Provides textbox specific operations while inheriting:
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


import { expect } from "@playwright/test";

import { BaseElement } 
    from "../core/BaseElement.js";


/**
 * Enterprise TextBox Element.
 *
 * @class WebTextBox
 */
export class WebTextBox extends BaseElement {


    /**
     * Creates textbox element.
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
        description = "Textbox"
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
    // Text Actions
    // ============================================================


    /**
     * Clears existing value and enters text.
     *
     * @param {string|number} value
     */
    async enterText(value){


        await this.waitForEditable();


        const locator =
            await this.getLocator();


        await locator.fill(
            String(value)
        );

    }




    /**
     * Clears textbox value.
     */
    async clear(){


        await this.waitForEditable();


        const locator =
            await this.getLocator();


        await locator.clear();

    }




    /**
     * Append text without clearing.
     *
     * Simulates real keyboard typing.
     *
     * @param {string|number} value
     */
    async appendText(value){


        await this.waitForEditable();


        const locator =
            await this.getLocator();


        await locator.pressSequentially(

            String(value)

        );

    }




    /**
     * Alias method.
     *
     * Common Selenium style naming.
     *
     * @param {string|number} value
     */
    async type(value){


        await this.enterText(value);

    }





    // ============================================================
    // Keyboard Actions
    // ============================================================


    /**
     * Select all textbox content.
     */
    async selectAll(){


        await this.press(
            "Control+A"
        );

    }




    /**
     * Copy selected text.
     */
    async copy(){


        await this.press(
            "Control+C"
        );

    }




    /**
     * Paste clipboard content.
     */
    async paste(){


        await this.press(
            "Control+V"
        );

    }




    /**
     * Cut selected text.
     */
    async cut(){


        await this.press(
            "Control+X"
        );

    }




    // ============================================================
    // Information Methods
    // ============================================================


    /**
     * Get placeholder text.
     *
     * @returns {Promise<string|null>}
     */
    async getPlaceholder(){


        return await this.getAttribute(

            "placeholder"

        );

    }




    /**
     * Check textbox empty.
     *
     * @returns {Promise<boolean>}
     */
    async isEmpty(){


        const value =
            await this.getValue();


        return value === "";

    }




    /**
     * Get textbox character count.
     *
     * @returns {Promise<number>}
     */
    async getLength(){


        const value =
            await this.getValue();


        return value.length;

    }




    /**
     * Get trimmed textbox value.
     *
     * @returns {Promise<string>}
     */
    async getTrimmedValue(){


        const value =
            await this.getValue();


        return value.trim();

    }






    // ============================================================
    // Assertions
    // ============================================================


    /**
     * Verify placeholder text.
     *
     * @param {string|RegExp} expected
     */
    async verifyPlaceholder(expected){


        await this.verifyAttribute(

            "placeholder",

            expected

        );

    }





    /**
     * Verify textbox empty.
     */
    async verifyEmpty(){


        await this.verifyValue("");

    }





    /**
     * Verify textbox not empty.
     */
    async verifyNotEmpty(){


        const value =
            await this.getValue();


        expect(value.length)
            .toBeGreaterThan(0);

    }





    /**
     * Verify textbox contains value.
     *
     * @param {string} expected
     */
    async verifyContains(expected){


        const locator =
            await this.getLocator();


        await expect(locator)
            .toHaveValue(

                new RegExp(expected)

            );

    }





    /**
     * Verify textbox max length.
     *
     * @param {number} expected
     */
    async verifyLength(expected){


        const length =
            await this.getLength();


        expect(length)
            .toBe(expected);

    }

}
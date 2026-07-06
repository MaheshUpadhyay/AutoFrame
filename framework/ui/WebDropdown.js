/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebDropdown.js
 * Purpose : Enterprise Dropdown wrapper with Self Healing support
 *
 * Supports native HTML <select> controls.
 *
 * Provides:
 *
 * - Selection by text
 * - Selection by value
 * - Selection by index
 * - Multi select handling
 * - Dropdown validations
 * - Self healing locator recovery
 *
 * Author  : Mahesh Upadhyay
 * ============================================================================
 */


import { expect }
    from "@playwright/test";


import { BaseElement }
    from "../core/BaseElement.js";


/**
 * Enterprise Dropdown Element.
 *
 * @class WebDropdown
 */
export class WebDropdown extends BaseElement {


    /**
     * Creates dropdown element.
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
        description = "Dropdown"
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
    // Selection Methods
    // ============================================================


    /**
     * Select option using visible text.
     *
     * @param {string} text
     */
    async selectByText(text){


        await this.waitForEnabled();


        const locator =
            await this.getLocator();


        await locator.selectOption({

            label:text

        });

    }






    /**
     * Select option using value.
     *
     * @param {string} value
     */
    async selectByValue(value){


        await this.waitForEnabled();


        const locator =
            await this.getLocator();


        await locator.selectOption({

            value

        });

    }






    /**
     * Select option using index.
     *
     * @param {number} index
     */
    async selectByIndex(index){


        await this.waitForEnabled();


        const locator =
            await this.getLocator();


        await locator.selectOption({

            index

        });

    }







    /**
     * Select multiple values.
     *
     * @param {Array<string>} values
     */
    async selectMultiple(values){


        await this.waitForEnabled();


        const locator =
            await this.getLocator();


        await locator.selectOption(

            values

        );

    }






    /**
     * Clear dropdown selection.
     *
     * Applicable for multi select.
     */
    async clearSelection(){


        await this.waitForEnabled();


        const locator =
            await this.getLocator();


        await locator.selectOption([]);

    }







    // ============================================================
    // Information Methods
    // ============================================================


    /**
     * Returns selected value.
     *
     * @returns {Promise<string>}
     */
    async getSelectedValue(){


        return await this.getValue();

    }







    /**
     * Returns selected visible text.
     *
     * @returns {Promise<string>}
     */
    async getSelectedText(){


        const locator =
            await this.getLocator();


        return await locator.evaluate(

            select =>

                select
                .options[
                    select.selectedIndex
                ]?.text ?? ""

        );

    }







    /**
     * Returns all dropdown option texts.
     *
     * @returns {Promise<string[]>}
     */
    async getOptions(){


        const locator =
            await this.getLocator();


        return await locator.evaluate(

            select =>

                [...select.options]
                    .map(

                        option =>
                            option.text

                    )

        );

    }







    /**
     * Returns option count.
     *
     * @returns {Promise<number>}
     */
    async getOptionCount(){


        const options =
            await this.getOptions();


        return options.length;

    }







    /**
     * Verify dropdown supports multiple values.
     *
     * @returns {Promise<boolean>}
     */
    async isMultiSelect(){


        const locator =
            await this.getLocator();


        return await locator.evaluate(

            select =>
                select.multiple

        );

    }






    /**
     * Verify option exists.
     *
     * @param {string} text
     * @returns {Promise<boolean>}
     */
    async hasOption(text){


        const options =
            await this.getOptions();


        return options.includes(
            text
        );

    }







    // ============================================================
    // Assertions
    // ============================================================


    /**
     * Verify selected value.
     *
     * @param {string|RegExp} expected
     */
    async verifySelectedValue(expected){


        await this.verifyValue(
            expected
        );

    }






    /**
     * Verify selected text.
     *
     * @param {string} expected
     */
    async verifySelectedText(expected){


        const actual =
            await this.getSelectedText();


        expect(actual)
            .toBe(expected);

    }






    /**
     * Verify option exists.
     *
     * @param {string} expected
     */
    async verifyOptionExists(expected){


        const exists =
            await this.hasOption(
                expected
            );


        expect(exists)
            .toBeTruthy();

    }







    /**
     * Verify dropdown option count.
     *
     * @param {number} expected
     */
    async verifyOptionCount(expected){


        const count =
            await this.getOptionCount();


        expect(count)
            .toBe(expected);

    }

}
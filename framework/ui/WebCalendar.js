/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebCalendar.js
 * Purpose : Enterprise Calendar wrapper with Self Healing support
 *
 * Supports:
 *
 * - HTML5 Date Input
 * - Date picker fields
 * - Calendar validations
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
 * Enterprise Calendar Element.
 *
 * @class WebCalendar
 */
export class WebCalendar extends BaseElement {


    /**
     * Creates Calendar element.
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
        description = "Calendar"
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
    // Date Actions
    // ============================================================


    /**
     * Select date.
     *
     * Expected format:
     *
     * YYYY-MM-DD
     *
     * @param {string} date
     */
    async selectDate(date){


        if(!date){

            throw new Error(
                "Date value cannot be empty."
            );

        }


        await this.waitForEditable();


        const locator =
            await this.getLocator();


        await locator.fill(
            date
        );

    }






    /**
     * Clear selected date.
     */
    async clear(){


        await this.waitForEditable();


        const locator =
            await this.getLocator();


        await locator.clear();

    }







    /**
     * Opens calendar popup.
     */
    async open(){


        await this.click();

    }







    // ============================================================
    // Information Methods
    // ============================================================


    /**
     * Returns selected date.
     *
     * @returns {Promise<string>}
     */
    async getSelectedDate(){


        return await this.getValue();

    }






    /**
     * Returns minimum allowed date.
     *
     * @returns {Promise<string|null>}
     */
    async getMinDate(){


        return await this.getAttribute(
            "min"
        );

    }







    /**
     * Returns maximum allowed date.
     *
     * @returns {Promise<string|null>}
     */
    async getMaxDate(){


        return await this.getAttribute(
            "max"
        );

    }








    /**
     * Returns input type.
     *
     * @returns {Promise<string|null>}
     */
    async getType(){


        return await this.getAttribute(
            "type"
        );

    }








    /**
     * Returns placeholder.
     *
     * Useful for custom calendars.
     *
     * @returns {Promise<string|null>}
     */
    async getPlaceholder(){


        return await this.getAttribute(
            "placeholder"
        );

    }









    // ============================================================
    // State Methods
    // ============================================================


    /**
     * Checks date selected.
     *
     * @returns {Promise<boolean>}
     */
    async hasDate(){


        return (

            await this.getSelectedDate()

        ) !== "";

    }









    /**
     * Checks HTML5 calendar.
     *
     * @returns {Promise<boolean>}
     */
    async isDateInput(){


        return (

            await this.getType()

        ) === "date";

    }









    // ============================================================
    // Enterprise Helpers
    // ============================================================


    /**
     * Select today's date.
     */
    async selectToday(){


        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        await this.selectDate(
            today
        );

    }








    /**
     * Select date object.
     *
     * @param {Date} date
     */
    async selectDateObject(date){


        if(
            !(date instanceof Date)
        ){

            throw new Error(
                "Invalid Date object."
            );

        }


        await this.selectDate(

            date
            .toISOString()
            .split("T")[0]

        );

    }










    // ============================================================
    // Assertions
    // ============================================================


    /**
     * Verify selected date.
     *
     * @param {string|RegExp} expected
     */
    async verifySelectedDate(expected){


        await this.verifyValue(
            expected
        );

    }







    /**
     * Verify minimum date.
     *
     * @param {string|RegExp} expected
     */
    async verifyMinDate(expected){


        await this.verifyAttribute(

            "min",

            expected

        );

    }







    /**
     * Verify maximum date.
     *
     * @param {string|RegExp} expected
     */
    async verifyMaxDate(expected){


        await this.verifyAttribute(

            "max",

            expected

        );

    }







    /**
     * Verify HTML input type=date.
     */
    async verifyDateInput(){


        const locator =
            await this.getLocator();



        await expect(locator)

            .toHaveAttribute(

                "type",

                "date"

            );

    }








    /**
     * Verify date exists.
     */
    async verifyHasDate(){


        expect(

            await this.hasDate()

        ).toBeTruthy();

    }

}
/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebProgressBar.js
 * Purpose : Enterprise Progress Bar wrapper with Self Healing support
 *
 * Supports:
 *
 * - HTML5 <progress>
 * - Bootstrap Progress
 * - Material UI Progress
 * - PrimeNG ProgressBar
 * - Ant Design Progress
 * - ARIA progressbar components
 *
 * Author  : Mahesh Upadhyay
 * ============================================================================
 */


import { expect }
    from "@playwright/test";


import { BaseElement }
    from "../core/BaseElement.js";


/**
 * Enterprise ProgressBar Element.
 *
 * @class WebProgressBar
 */
export class WebProgressBar extends BaseElement {


    /**
     * Creates ProgressBar element.
     *
     * @param {import("@playwright/test").Page} page
     * @param {string} selector
     * @param {string} description
     */
    constructor(
        page,
        selector,
        description = "Progress Bar"
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
    // Information
    // ============================================================


    /**
     * Returns current progress value.
     *
     * Supports:
     * aria-valuenow
     * value
     *
     * @returns {Promise<number>}
     */
    async getCurrentValue(){


        const value =

            await this.getAttribute(
                "aria-valuenow"
            )

            ??

            await this.getAttribute(
                "value"
            );



        return Number(
            value ?? 0
        );

    }







    /**
     * Returns minimum value.
     *
     * @returns {Promise<number>}
     */
    async getMinimum(){


        const value =

            await this.getAttribute(
                "aria-valuemin"
            )

            ??

            await this.getAttribute(
                "min"
            );



        return Number(
            value ?? 0
        );

    }








    /**
     * Returns maximum value.
     *
     * @returns {Promise<number>}
     */
    async getMaximum(){


        const value =

            await this.getAttribute(
                "aria-valuemax"
            )

            ??

            await this.getAttribute(
                "max"
            );



        return Number(
            value ?? 100
        );

    }








    /**
     * Returns progress percentage.
     *
     * @returns {Promise<number>}
     */
    async getPercentage(){


        const current =
            await this.getCurrentValue();


        const minimum =
            await this.getMinimum();


        const maximum =
            await this.getMaximum();



        if(
            maximum <= minimum
        ){

            return 0;

        }



        return Math.round(

            (
                (
                    current - minimum
                )

                /

                (
                    maximum - minimum
                )

            )

            *

            100

        );

    }









    /**
     * Checks completion.
     *
     * @returns {Promise<boolean>}
     */
    async isCompleted(){


        return (

            await this.getCurrentValue()

        )

        >=

        (

            await this.getMaximum()

        );

    }









    /**
     * Checks progress is started.
     *
     * @returns {Promise<boolean>}
     */
    async isStarted(){


        return (

            await this.getCurrentValue()

        )

        >

        (

            await this.getMinimum()

        );

    }










    // ============================================================
    // Wait Methods
    // ============================================================


    /**
     * Wait until expected value.
     *
     * @param {number} expected
     * @param {number} timeout
     */
    async waitUntilValue(
        expected,
        timeout = 30000
    ){


        await expect

            .poll(

                async () =>

                    await this.getCurrentValue(),

                {
                    timeout
                }

            )

            .toBe(

                Number(expected)

            );

    }









    /**
     * Wait until percentage.
     *
     * @param {number} expected
     * @param {number} timeout
     */
    async waitUntilPercentage(
        expected,
        timeout = 30000
    ){


        await expect

            .poll(

                async () =>

                    await this.getPercentage(),

                {
                    timeout
                }

            )

            .toBe(

                Number(expected)

            );

    }









    /**
     * Wait until completed.
     *
     * @param {number} timeout
     */
    async waitUntilCompleted(
        timeout = 30000
    ){


        await expect

            .poll(

                async () =>

                    await this.isCompleted(),

                {
                    timeout
                }

            )

            .toBe(true);

    }









    // ============================================================
    // Assertions
    // ============================================================


    async verifyCurrentValue(expected){


        expect(

            await this.getCurrentValue()

        )

        .toBe(

            Number(expected)

        );

    }








    async verifyMinimum(expected){


        expect(

            await this.getMinimum()

        )

        .toBe(

            Number(expected)

        );

    }








    async verifyMaximum(expected){


        expect(

            await this.getMaximum()

        )

        .toBe(

            Number(expected)

        );

    }









    async verifyPercentage(expected){


        expect(

            await this.getPercentage()

        )

        .toBe(

            Number(expected)

        );

    }









    async verifyCompleted(){


        expect(

            await this.isCompleted()

        )

        .toBeTruthy();

    }








    async verifyStarted(){


        expect(

            await this.isStarted()

        )

        .toBeTruthy();

    }

}
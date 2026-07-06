/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebSlider.js
 * Purpose : Enterprise Slider wrapper with Self Healing support
 *
 * Supports:
 *
 * - HTML5 input range slider
 * - Material UI Slider
 * - Bootstrap Range
 * - PrimeNG Slider
 * - Ant Design Slider
 *
 * Author  : Mahesh Upadhyay
 * ============================================================================
 */


import { expect }
    from "@playwright/test";


import { BaseElement }
    from "../core/BaseElement.js";


/**
 * Enterprise Slider Element.
 *
 * @class WebSlider
 */
export class WebSlider extends BaseElement {


    /**
     * Creates Slider element.
     *
     * @param {import("@playwright/test").Page} page
     * @param {string} selector
     * @param {string} description
     */
    constructor(
        page,
        selector,
        description = "Slider"
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
    // Actions
    // ============================================================


    /**
     * Sets slider value.
     *
     * Fires:
     * input event
     * change event
     *
     * @param {number|string} value
     */
    async setValue(value){


        await this.waitForEnabled();


        const slider =
            await this.getLocator();


        await slider.evaluate(

            (
                element,
                newValue
            )=>{


                element.value =
                    newValue;



                element.dispatchEvent(

                    new Event(

                        "input",

                        {
                            bubbles:true
                        }

                    )

                );



                element.dispatchEvent(

                    new Event(

                        "change",

                        {
                            bubbles:true
                        }

                    )

                );


            },

            String(value)

        );

    }






    /**
     * Move slider to minimum.
     */
    async setMinimum(){


        await this.setValue(

            await this.getMinimum()

        );

    }







    /**
     * Move slider to maximum.
     */
    async setMaximum(){


        await this.setValue(

            await this.getMaximum()

        );

    }








    /**
     * Increase slider by step.
     */
    async increase(){


        const current =
            await this.getCurrentValue();


        const step =
            await this.getStep();



        await this.setValue(

            current + step

        );

    }








    /**
     * Decrease slider by step.
     */
    async decrease(){


        const current =
            await this.getCurrentValue();


        const step =
            await this.getStep();



        await this.setValue(

            current - step

        );

    }









    // ============================================================
    // Information
    // ============================================================


    /**
     * Returns current value.
     *
     * @returns {Promise<number>}
     */
    async getCurrentValue(){


        return Number(

            await super.getValue()

        );

    }







    /**
     * Returns minimum value.
     *
     * @returns {Promise<number>}
     */
    async getMinimum(){


        return Number(

            await this.getAttribute(
                "min"
            )

            ??

            0

        );

    }








    /**
     * Returns maximum value.
     *
     * @returns {Promise<number>}
     */
    async getMaximum(){


        return Number(

            await this.getAttribute(
                "max"
            )

            ??

            100

        );

    }








    /**
     * Returns step value.
     *
     * @returns {Promise<number>}
     */
    async getStep(){


        return Number(

            await this.getAttribute(
                "step"
            )

            ??

            1

        );

    }








    /**
     * Returns percentage position.
     *
     * @returns {Promise<number>}
     */
    async getPercentage(){


        const value =
            await this.getCurrentValue();


        const min =
            await this.getMinimum();


        const max =
            await this.getMaximum();



        return Math.round(

            (

                (value - min)

                /

                (max - min)

            )

            *

            100

        );

    }








    // ============================================================
    // Assertions
    // ============================================================


    /**
     * Verify slider value.
     *
     * @param {number} expected
     */
    async verifyCurrentValue(expected){


        expect(

            await this.getCurrentValue()

        )

        .toBe(

            Number(expected)

        );

    }








    /**
     * Verify minimum.
     *
     * @param {number} expected
     */
    async verifyMinimum(expected){


        expect(

            await this.getMinimum()

        )

        .toBe(

            Number(expected)

        );

    }









    /**
     * Verify maximum.
     *
     * @param {number} expected
     */
    async verifyMaximum(expected){


        expect(

            await this.getMaximum()

        )

        .toBe(

            Number(expected)

        );

    }









    /**
     * Verify step.
     *
     * @param {number} expected
     */
    async verifyStep(expected){


        expect(

            await this.getStep()

        )

        .toBe(

            Number(expected)

        );

    }










    /**
     * Verify percentage.
     *
     * @param {number} expected
     */
    async verifyPercentage(expected){


        expect(

            await this.getPercentage()

        )

        .toBe(

            Number(expected)

        );

    }

}
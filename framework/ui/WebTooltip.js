/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebTooltip.js
 * Purpose : Enterprise Tooltip wrapper with Self Healing support
 *
 * Supports:
 *
 * - Bootstrap Tooltip
 * - Material Tooltip
 * - PrimeNG Tooltip
 * - Ant Design Tooltip
 * - Native HTML Tooltip
 *
 * Author  : Mahesh Upadhyay
 * ============================================================================
 */


import { expect }
    from "@playwright/test";


import { BaseElement }
    from "../core/BaseElement.js";


/**
 * Enterprise Tooltip Element.
 *
 * @class WebTooltip
 */
export class WebTooltip extends BaseElement {


    /**
     * Creates Tooltip element.
     *
     * @param {import("@playwright/test").Page} page
     * @param {string} selector
     * @param {string} description
     */
    constructor(
        page,
        selector,
        description = "Tooltip"
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
     * Display tooltip by hovering target.
     *
     * Target can be:
     *
     * - BaseElement
     * - Any framework element
     *
     * @param {BaseElement} target
     */
    async show(target){


        if(!target){

            throw new Error(
                "Tooltip target element cannot be null."
            );

        }


        await target.hover();


        await this.waitForVisible();

    }









    /**
     * Hide tooltip.
     *
     * Uses Escape key.
     *
     * @param {BaseElement} target
     */
    async hide(target){


        if(target){

            await target.press(
                "Escape"
            );

        }


        await this.waitForHidden();

    }









    // ============================================================
    // Information
    // ============================================================


    /**
     * Returns tooltip message.
     *
     * @returns {Promise<string>}
     */
    async getMessage(){


        return await this.getText();

    }








    /**
     * Returns trimmed message.
     *
     * @returns {Promise<string>}
     */
    async getTrimmedMessage(){


        return (

            await this.getMessage()

        ).trim();

    }








    /**
     * Returns tooltip role.
     *
     * @returns {Promise<string|null>}
     */
    async getRole(){


        return await this.getAttribute(

            "role"

        );

    }








    /**
     * Returns aria label.
     *
     * @returns {Promise<string|null>}
     */
    async getAriaLabel(){


        return await this.getAttribute(

            "aria-label"

        );

    }









    /**
     * Checks tooltip visible.
     *
     * @returns {Promise<boolean>}
     */
    async isDisplayed(){


        return await this.isVisible();

    }









    /**
     * Checks tooltip has text.
     *
     * @returns {Promise<boolean>}
     */
    async hasMessage(){


        return (

            await this.getTrimmedMessage()

        ).length > 0;

    }









    // ============================================================
    // Assertions
    // ============================================================


    /**
     * Verify tooltip message.
     *
     * @param {string|RegExp} expected
     */
    async verifyMessage(
        expected
    ){


        await this.verifyText(

            expected

        );

    }








    /**
     * Verify tooltip contains text.
     *
     * @param {string} expected
     */
    async verifyContains(
        expected
    ){


        await this.verifyContainsText(

            expected

        );

    }








    /**
     * Verify tooltip visible.
     */
    async verifyDisplayed(){


        await this.verifyVisible();

    }









    /**
     * Verify tooltip hidden.
     */
    async verifyHidden(){


        await super.verifyHidden();

    }









    /**
     * Verify role tooltip.
     */
    async verifyTooltipRole(){


        expect(

            await this.getRole()

        )

        .toBe(
            "tooltip"
        );

    }








    /**
     * Verify tooltip message exists.
     */
    async verifyHasMessage(){


        expect(

            await this.hasMessage()

        )

        .toBeTruthy();

    }

}
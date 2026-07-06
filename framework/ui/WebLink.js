/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebLink.js
 * Purpose : Enterprise Link wrapper with Self Healing support
 *
 * Supports:
 *
 * - Anchor link actions
 * - Navigation handling
 * - Attribute validations
 * - New tab links
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
 * Enterprise Link Element.
 *
 * @class WebLink
 */
export class WebLink extends BaseElement {


    /**
     * Creates Link element.
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
        description = "Link"
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
    // Navigation Actions
    // ============================================================


    /**
     * Opens/clicks the link.
     *
     * @param {object} options
     */
    async open(
        options = {}
    ){


        await this.click(
            options
        );

    }






    /**
     * Opens link in new browser tab.
     *
     * Uses Ctrl + click.
     */
    async openInNewTab(){


        await this.click({

            modifiers:[
                "Control"
            ]

        });

    }







    // ============================================================
    // Information Methods
    // ============================================================


    /**
     * Returns link visible text.
     *
     * @returns {Promise<string>}
     */
    async getLinkText(){


        return await this.getText();

    }






    /**
     * Returns trimmed link text.
     *
     * @returns {Promise<string>}
     */
    async getTrimmedText(){


        const text =
            await this.getLinkText();



        return text.trim();

    }







    /**
     * Returns href.
     *
     * @returns {Promise<string|null>}
     */
    async getHref(){


        return await this.getAttribute(
            "href"
        );

    }







    /**
     * Returns target attribute.
     *
     * @returns {Promise<string|null>}
     */
    async getTarget(){


        return await this.getAttribute(
            "target"
        );

    }







    /**
     * Returns rel attribute.
     *
     * @returns {Promise<string|null>}
     */
    async getRel(){


        return await this.getAttribute(
            "rel"
        );

    }








    /**
     * Checks if link opens new tab.
     *
     * @returns {Promise<boolean>}
     */
    async opensInNewTab(){


        return (

            await this.getTarget()

        ) === "_blank";

    }








    /**
     * Checks if href exists.
     *
     * @returns {Promise<boolean>}
     */
    async hasHref(){


        const href =
            await this.getHref();



        return !!href;

    }









    // ============================================================
    // Assertions
    // ============================================================


    /**
     * Verify link text.
     *
     * @param {string|RegExp} expected
     */
    async verifyLinkText(expected){


        await this.verifyText(
            expected
        );

    }







    /**
     * Verify href.
     *
     * @param {string|RegExp} expected
     */
    async verifyHref(expected){


        await this.verifyAttribute(

            "href",

            expected

        );

    }








    /**
     * Verify target.
     *
     * @param {string|RegExp} expected
     */
    async verifyTarget(expected){


        await this.verifyAttribute(

            "target",

            expected

        );

    }








    /**
     * Verify rel.
     *
     * @param {string|RegExp} expected
     */
    async verifyRel(expected){


        await this.verifyAttribute(

            "rel",

            expected

        );

    }








    /**
     * Verify link opens in new tab.
     */
    async verifyOpensInNewTab(){


        expect(

            await this.opensInNewTab()

        ).toBeTruthy();

    }








    /**
     * Verify href exists.
     */
    async verifyHasHref(){


        expect(

            await this.hasHref()

        ).toBeTruthy();

    }

}
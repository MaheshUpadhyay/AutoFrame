/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebAccordion.js
 * Purpose : Enterprise Accordion wrapper with Self Healing support
 *
 * Supports:
 *
 * - Bootstrap Accordion
 * - Material UI Accordion
 * - PrimeNG Accordion
 * - Ant Design Collapse
 * - Custom expandable panels
 *
 * Author  : Mahesh Upadhyay
 * ============================================================================
 */


import { expect }
    from "@playwright/test";


import { BaseElement }
    from "../core/BaseElement.js";


/**
 * Enterprise Accordion Element.
 *
 * @class WebAccordion
 */
export class WebAccordion extends BaseElement {


    /**
     * Creates Accordion element.
     *
     * @param {import("@playwright/test").Page} page
     * @param {string} selector
     * @param {string} description
     */
    constructor(
        page,
        selector,
        description = "Accordion"
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
     * Expands accordion.
     */
    async expand(){


        if(
            !(await this.isExpanded())
        ){

            await this.click();

        }

    }




    /**
     * Collapses accordion.
     */
    async collapse(){


        if(
            await this.isExpanded()
        ){

            await this.click();

        }

    }





    /**
     * Toggles accordion state.
     */
    async toggle(){


        await this.click();

    }





    // ============================================================
    // State Methods
    // ============================================================


    /**
     * Returns true if expanded.
     *
     * @returns {Promise<boolean>}
     */
    async isExpanded(){


        const expanded =
            await this.getAttribute(
                "aria-expanded"
            );


        return expanded === "true";

    }





    /**
     * Returns true if collapsed.
     *
     * @returns {Promise<boolean>}
     */
    async isCollapsed(){


        return !(

            await this.isExpanded()

        );

    }






    // ============================================================
    // Wait Methods
    // ============================================================


    /**
     * Wait until accordion expands.
     *
     * @param {number} timeout
     */
    async waitUntilExpanded(
        timeout = 30000
    ){


        const locator =
            await this.getLocator();


        await expect(locator)

            .toHaveAttribute(

                "aria-expanded",

                "true",

                {
                    timeout
                }

            );

    }






    /**
     * Wait until accordion collapses.
     *
     * @param {number} timeout
     */
    async waitUntilCollapsed(
        timeout = 30000
    ){


        const locator =
            await this.getLocator();



        await expect(locator)

            .toHaveAttribute(

                "aria-expanded",

                "false",

                {
                    timeout
                }

            );

    }






    // ============================================================
    // Information Methods
    // ============================================================


    /**
     * Returns accordion title.
     *
     * @returns {Promise<string>}
     */
    async getTitle(){


        return await this.getText();

    }





    /**
     * Returns controlled panel id.
     *
     * @returns {Promise<string|null>}
     */
    async getPanelId(){


        return await this.getAttribute(

            "aria-controls"

        );

    }






    /**
     * Returns accordion content panel.
     *
     * @returns {Promise<Locator|null>}
     */
    async getPanel(){


        const panelId =
            await this.getPanelId();



        if(!panelId){

            return null;

        }



        const locator =
            await this.getLocator();



        return locator.page()
            .locator(
                `#${panelId}`
            );

    }







    // ============================================================
    // Assertions
    // ============================================================


    /**
     * Verify accordion title.
     *
     * @param {string|RegExp} expected
     */
    async verifyTitle(expected){


        await this.verifyText(
            expected
        );

    }






    /**
     * Verify accordion expanded.
     */
    async verifyExpanded(){


        const locator =
            await this.getLocator();



        await expect(locator)

            .toHaveAttribute(

                "aria-expanded",

                "true"

            );

    }






    /**
     * Verify accordion collapsed.
     */
    async verifyCollapsed(){


        const locator =
            await this.getLocator();



        await expect(locator)

            .toHaveAttribute(

                "aria-expanded",

                "false"

            );

    }






    /**
     * Verify accordion has panel.
     */
    async verifyHasPanel(){


        expect(

            await this.getPanelId()

        ).not.toBeNull();

    }

}
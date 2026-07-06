/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebTab.js
 * Purpose : Enterprise Tab wrapper with Self Healing support
 *
 * Supports:
 *
 * - Bootstrap Tabs
 * - Material UI Tabs
 * - PrimeNG Tabs
 * - Ant Design Tabs
 * - ARIA compliant tabs
 *
 * Author  : Mahesh Upadhyay
 * ============================================================================
 */


import { expect }
    from "@playwright/test";


import { BaseElement }
    from "../core/BaseElement.js";


/**
 * Enterprise Tab Element.
 *
 * @class WebTab
 */
export class WebTab extends BaseElement {


    /**
     * Creates Tab element.
     *
     * @param {import("@playwright/test").Page} page
     * @param {string} selector
     * @param {string} description
     */
    constructor(
        page,
        selector,
        description = "Tab"
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
     * Select the tab.
     */
    async select(){


        await this.waitForVisible();


        await this.waitForEnabled();


        await this.click();

    }







    // ============================================================
    // State
    // ============================================================


    /**
     * Returns true if tab selected.
     *
     * Supports:
     *
     * aria-selected="true"
     *
     * @returns {Promise<boolean>}
     */
    async isSelected(){


        const selected =
            await this.getAttribute(

                "aria-selected"

            );



        return selected === "true";

    }








    /**
     * Returns true if tab disabled.
     *
     * @returns {Promise<boolean>}
     */
    async isTabDisabled(){


        const disabled =
            await this.getAttribute(

                "aria-disabled"

            );



        return disabled === "true";

    }









    // ============================================================
    // Information
    // ============================================================


    /**
     * Returns tab label.
     *
     * @returns {Promise<string>}
     */
    async getLabel(){


        return await this.getText();

    }








    /**
     * Returns trimmed tab label.
     *
     * @returns {Promise<string>}
     */
    async getTrimmedLabel(){


        return (

            await this.getLabel()

        ).trim();

    }









    /**
     * Returns connected panel id.
     *
     * @returns {Promise<string|null>}
     */
    async getPanelId(){


        return await this.getAttribute(

            "aria-controls"

        );

    }








    /**
     * Returns tab role.
     *
     * @returns {Promise<string|null>}
     */
    async getRole(){


        return await this.getAttribute(

            "role"

        );

    }








    // ============================================================
    // Wait Methods
    // ============================================================


    /**
     * Wait until selected.
     *
     * @param {number} timeout
     */
    async waitUntilSelected(
        timeout = 30000
    ){


        const tab =
            await this.getLocator();



        await expect(tab)

            .toHaveAttribute(

                "aria-selected",

                "true",

                {
                    timeout
                }

            );

    }









    // ============================================================
    // Assertions
    // ============================================================


    /**
     * Verify tab label.
     *
     * @param {string|RegExp} expected
     */
    async verifyLabel(expected){


        await this.verifyText(

            expected

        );

    }









    /**
     * Verify tab selected.
     */
    async verifySelected(){


        expect(

            await this.isSelected()

        )

        .toBeTruthy();

    }









    /**
     * Verify tab not selected.
     */
    async verifyNotSelected(){


        expect(

            await this.isSelected()

        )

        .toBeFalsy();

    }









    /**
     * Verify tab disabled.
     */
    async verifyTabDisabled(){


        expect(

            await this.isTabDisabled()

        )

        .toBeTruthy();

    }









    /**
     * Verify tab panel exists.
     */
    async verifyHasPanel(){


        expect(

            await this.getPanelId()

        )

        .not

        .toBeNull();

    }

}
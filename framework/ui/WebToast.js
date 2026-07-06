/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebToast.js
 * Purpose : Enterprise Toast Notification wrapper with Self Healing support
 *
 * Supports:
 *
 * - Bootstrap Toast
 * - Material Snackbar
 * - PrimeNG Toast
 * - Ant Design Message
 * - Custom Notifications
 *
 * Author  : Mahesh Upadhyay
 * ============================================================================
 */


import { expect }
    from "@playwright/test";


import { BaseElement }
    from "../core/BaseElement.js";


/**
 * Enterprise Toast Element.
 *
 * @class WebToast
 */
export class WebToast extends BaseElement {


    /**
     * Creates Toast element.
     *
     * @param {import("@playwright/test").Page} page
     * @param {string} selector
     * @param {string} description
     */
    constructor(
        page,
        selector,
        description = "Toast"
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
    // Wait Methods
    // ============================================================


    /**
     * Wait until toast appears.
     *
     * @param {number} timeout
     */
    async waitUntilAppears(
        timeout = 30000
    ){


        await this.waitForVisible(
            timeout
        );

    }







    /**
     * Wait until toast disappears.
     *
     * @param {number} timeout
     */
    async waitUntilDisappears(
        timeout = 30000
    ){


        await this.waitForHidden(
            timeout
        );

    }








    // ============================================================
    // Information
    // ============================================================


    /**
     * Returns toast message.
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
     * Detect toast type.
     *
     * Supported:
     *
     * success
     * error
     * warning
     * info
     *
     * @returns {Promise<string>}
     */
    async getType(){


        const className =
            await this.getClassName();



        if(!className){

            return "unknown";

        }



        const css =
            className.toLowerCase();




        if(
            css.includes("success")
        ){

            return "success";

        }



        if(
            css.includes("error")
            ||
            css.includes("danger")
        ){

            return "error";

        }



        if(
            css.includes("warning")
        ){

            return "warning";

        }




        if(
            css.includes("info")
        ){

            return "info";

        }



        return "unknown";

    }








    /**
     * Checks toast message exists.
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
     * Verify toast message.
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
     * Verify toast contains text.
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
     * Verify toast type.
     *
     * @param {string} expected
     */
    async verifyType(
        expected
    ){


        expect(

            await this.getType()

        )

        .toBe(

            expected.toLowerCase()

        );

    }









    /**
     * Verify success toast.
     */
    async verifySuccess(){


        await this.verifyType(
            "success"
        );

    }








    /**
     * Verify error toast.
     */
    async verifyError(){


        await this.verifyType(
            "error"
        );

    }








    /**
     * Verify message exists.
     */
    async verifyHasMessage(){


        expect(

            await this.hasMessage()

        )

        .toBeTruthy();

    }

}
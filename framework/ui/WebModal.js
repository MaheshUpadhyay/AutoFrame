/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebModal.js
 * Purpose : Enterprise Modal/Dialog wrapper with Self Healing support
 *
 * Supports:
 *
 * - Bootstrap Modal
 * - Material UI Dialog
 * - PrimeNG Dialog
 * - Ant Design Modal
 * - Custom modal components
 *
 * Author  : Mahesh Upadhyay
 * ============================================================================
 */


import { expect }
    from "@playwright/test";


import { BaseElement }
    from "../core/BaseElement.js";


/**
 * Enterprise Modal Element.
 *
 * @class WebModal
 */
export class WebModal extends BaseElement {


    /**
     * Creates Modal element.
     *
     * @param {import("@playwright/test").Page} page
     * @param {string} selector
     * @param {string} description
     */
    constructor(
        page,
        selector,
        description = "Modal"
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
    // State
    // ============================================================


    /**
     * Wait until modal opened.
     *
     * @param {number} timeout
     */
    async waitUntilOpened(
        timeout = 30000
    ){

        await this.waitForVisible(
            timeout
        );

    }




    /**
     * Wait until modal closed.
     *
     * @param {number} timeout
     */
    async waitUntilClosed(
        timeout = 30000
    ){

        await this.waitForHidden(
            timeout
        );

    }





    /**
     * Check modal open.
     *
     * @returns {Promise<boolean>}
     */
    async isOpen(){

        return await this.isVisible();

    }





    /**
     * Check modal closed.
     *
     * @returns {Promise<boolean>}
     */
    async isClosed(){

        return await this.isHidden();

    }





    // ============================================================
    // Actions
    // ============================================================


    /**
     * Close modal using Escape key.
     */
    async closeWithEscape(){


        const modal =
            await this.getLocator();


        await modal
            .page()
            .keyboard
            .press(
                "Escape"
            );

    }





    /**
     * Close modal using close button.
     *
     * @param {string} selector
     */
    async close(
        selector =
        ".close,[aria-label='Close'],.btn-close"
    ){


        const modal =
            await this.getLocator();



        await modal

            .locator(selector)

            .click();

    }






    /**
     * Click button inside modal.
     *
     * @param {string} buttonText
     */
    async clickButton(
        buttonText
    ){


        const modal =
            await this.getLocator();



        await modal

            .getByRole(

                "button",

                {
                    name:
                        buttonText
                }

            )

            .click();

    }






    // ============================================================
    // Information
    // ============================================================


    /**
     * Returns modal title.
     *
     * @param {string} selector
     */
    async getTitle(
        selector =
        ".modal-title,h1,h2,h3"
    ){


        const modal =
            await this.getLocator();



        return (

            await modal

                .locator(selector)

                .innerText()

        ).trim();

    }







    /**
     * Returns modal body.
     *
     * @param {string} selector
     */
    async getBody(
        selector = ".modal-body"
    ){


        const modal =
            await this.getLocator();



        return (

            await modal

                .locator(selector)

                .innerText()

        ).trim();

    }







    /**
     * Returns modal footer.
     *
     * @param {string} selector
     */
    async getFooter(
        selector = ".modal-footer"
    ){


        const modal =
            await this.getLocator();



        return (

            await modal

                .locator(selector)

                .innerText()

        ).trim();

    }







    /**
     * Checks if modal contains text.
     *
     * @param {string} text
     */
    async containsText(text){


        const modal =
            await this.getLocator();



        return (

            await modal.innerText()

        ).includes(text);

    }







    // ============================================================
    // Assertions
    // ============================================================


    /**
     * Verify modal title.
     *
     * @param {string|RegExp} expected
     */
    async verifyTitle(
        expected,
        selector =
        ".modal-title,h1,h2,h3"
    ){


        const actual =
            await this.getTitle(
                selector
            );



        if(
            expected instanceof RegExp
        ){

            expect(actual)
                .toMatch(expected);

        }
        else{

            expect(actual)
                .toBe(expected);

        }

    }







    /**
     * Verify modal body contains text.
     *
     * @param {string} expected
     */
    async verifyBodyContains(
        expected,
        selector=".modal-body"
    ){


        const body =
            await this.getBody(
                selector
            );


        expect(body)
            .toContain(expected);

    }








    /**
     * Verify modal opened.
     */
    async verifyOpened(){


        await this.verifyVisible();

    }







    /**
     * Verify modal closed.
     */
    async verifyClosed(){


        await this.verifyHidden();

    }








    /**
     * Verify modal contains text.
     *
     * @param {string} text
     */
    async verifyContainsText(
        text
    ){


        expect(

            await this.containsText(text)

        ).toBeTruthy();

    }

}
/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebPagination.js
 * Purpose : Enterprise Pagination wrapper with Self Healing support
 *
 * Supports:
 *
 * - Bootstrap Pagination
 * - Material UI Pagination
 * - PrimeNG Paginator
 * - Ant Design Pagination
 * - Custom Pagination Components
 *
 * Author  : Mahesh Upadhyay
 * ============================================================================
 */


import { expect }
    from "@playwright/test";


import { BaseElement }
    from "../core/BaseElement.js";


/**
 * Enterprise Pagination Element.
 *
 * @class WebPagination
 */
export class WebPagination extends BaseElement {


    #options;


    /**
     * Creates Pagination element.
     *
     * @param {import("@playwright/test").Page} page
     * @param {string} selector
     * @param {string} description
     * @param {object} options
     */
    constructor(
        page,
        selector,
        description = "Pagination",
        options = {}
    ){

        super(

            page.locator(selector),

            description,

            {
                page,
                selector
            }

        );


        this.#options = {

            nextText:
                /next/i,


            previousText:
                /previous|prev/i,


            firstText:
                /first/i,


            lastText:
                /last/i,


            ...options

        };

    }






    // ============================================================
    // Navigation
    // ============================================================


    /**
     * Navigate to page number.
     *
     * @param {number|string} pageNumber
     */
    async goToPage(pageNumber){


        const pagination =
            await this.getLocator();


        await pagination

            .getByRole(

                "link",

                {
                    name:
                        String(pageNumber)
                }

            )

            .click();

    }








    /**
     * Navigate next.
     */
    async next(){


        const pagination =
            await this.getLocator();



        await pagination

            .getByRole(

                "button",

                {
                    name:
                        this.#options.nextText
                }

            )

            .click();

    }








    /**
     * Navigate previous.
     */
    async previous(){


        const pagination =
            await this.getLocator();



        await pagination

            .getByRole(

                "button",

                {
                    name:
                        this.#options.previousText
                }

            )

            .click();

    }








    /**
     * Navigate first.
     */
    async first(){


        const pagination =
            await this.getLocator();



        await pagination

            .getByRole(

                "button",

                {
                    name:
                        this.#options.firstText
                }

            )

            .click();

    }








    /**
     * Navigate last.
     */
    async last(){


        const pagination =
            await this.getLocator();



        await pagination

            .getByRole(

                "button",

                {
                    name:
                        this.#options.lastText
                }

            )

            .click();

    }









    // ============================================================
    // Information
    // ============================================================


    /**
     * Returns active page.
     *
     * Supports:
     *
     * aria-current="page"
     *
     * @returns {Promise<number>}
     */
    async getCurrentPage(){


        const pagination =
            await this.getLocator();



        const current =
            pagination.locator(

                "[aria-current='page']"

            );



        return Number(

            (
                await current.innerText()
            )
            .trim()

        );

    }








    /**
     * Returns visible page count.
     *
     * @returns {Promise<number>}
     */
    async getPageCount(){


        const pagination =
            await this.getLocator();



        return await pagination

            .locator(

                "[role='link'],a"

            )

            .count();

    }








    /**
     * Returns visible pages.
     *
     * @returns {Promise<string[]>}
     */
    async getPages(){


        const pagination =
            await this.getLocator();



        return await pagination

            .locator(

                "a,[role='link']"

            )

            .allInnerTexts();

    }








    /**
     * Checks next page availability.
     *
     * @returns {Promise<boolean>}
     */
    async hasNextPage(){


        const pagination =
            await this.getLocator();



        return await pagination

            .getByRole(

                "button",

                {
                    name:
                        this.#options.nextText
                }

            )

            .isEnabled();

    }









    /**
     * Checks previous page availability.
     *
     * @returns {Promise<boolean>}
     */
    async hasPreviousPage(){


        const pagination =
            await this.getLocator();



        return await pagination

            .getByRole(

                "button",

                {
                    name:
                        this.#options.previousText
                }

            )

            .isEnabled();

    }








    // ============================================================
    // Enterprise Helpers
    // ============================================================


    /**
     * Navigate until last page.
     */
    async goToLastAvailablePage(){


        while(
            await this.hasNextPage()
        ){

            await this.next();

        }

    }








    /**
     * Navigate until first page.
     */
    async goToFirstAvailablePage(){


        while(
            await this.hasPreviousPage()
        ){

            await this.previous();

        }

    }









    // ============================================================
    // Wait
    // ============================================================


    /**
     * Wait until page becomes active.
     *
     * @param {number} page
     * @param {number} timeout
     */
    async waitUntilPage(
        page,
        timeout = 30000
    ){


        await expect

            .poll(

                async () =>

                    await this.getCurrentPage(),

                {
                    timeout
                }

            )

            .toBe(page);

    }










    // ============================================================
    // Assertions
    // ============================================================


    async verifyCurrentPage(expected){


        expect(

            await this.getCurrentPage()

        ).toBe(expected);

    }







    async verifyPageCount(expected){


        expect(

            await this.getPageCount()

        ).toBe(expected);

    }







    async verifyHasNextPage(){


        expect(

            await this.hasNextPage()

        ).toBeTruthy();

    }








    async verifyHasPreviousPage(){


        expect(

            await this.hasPreviousPage()

        ).toBeTruthy();

    }

}
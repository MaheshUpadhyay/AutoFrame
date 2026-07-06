/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebImage.js
 * Purpose : Enterprise Image wrapper with Self Healing support
 *
 * Supports:
 *
 * - Image validation
 * - Source verification
 * - Dimension checks
 * - Load status validation
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
 * Enterprise Image Element.
 *
 * @class WebImage
 */
export class WebImage extends BaseElement {


    /**
     * Creates Image element.
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
        description = "Image"
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
    // Information Methods
    // ============================================================


    /**
     * Returns image source URL.
     *
     * @returns {Promise<string|null>}
     */
    async getSource(){


        return await this.getAttribute(
            "src"
        );

    }






    /**
     * Returns alternative text.
     *
     * @returns {Promise<string|null>}
     */
    async getAltText(){


        return await this.getAttribute(
            "alt"
        );

    }






    /**
     * Returns image title.
     *
     * @returns {Promise<string|null>}
     */
    async getTitle(){


        return await this.getAttribute(
            "title"
        );

    }






    /**
     * Returns image natural width.
     *
     * @returns {Promise<number>}
     */
    async getWidth(){


        const image =
            await this.getLocator();



        return await image.evaluate(

            img =>
                img.naturalWidth

        );

    }







    /**
     * Returns image natural height.
     *
     * @returns {Promise<number>}
     */
    async getHeight(){


        const image =
            await this.getLocator();



        return await image.evaluate(

            img =>
                img.naturalHeight

        );

    }








    /**
     * Returns rendered image size.
     *
     * @returns {Promise<Object>}
     */
    async getRenderedSize(){


        const box =
            await this.boundingBox();



        return {

            width:
                box?.width || 0,


            height:
                box?.height || 0

        };

    }








    /**
     * Returns image loading status.
     *
     * @returns {Promise<boolean>}
     */
    async isLoaded(){


        const image =
            await this.getLocator();



        return await image.evaluate(

            img =>

                img.complete

                &&

                img.naturalWidth > 0

        );

    }








    /**
     * Returns true if image is broken.
     *
     * @returns {Promise<boolean>}
     */
    async isBroken(){


        return !(

            await this.isLoaded()

        );

    }









    // ============================================================
    // Assertions
    // ============================================================


    /**
     * Verify image source.
     *
     * @param {string|RegExp} expected
     */
    async verifySource(expected){


        await this.verifyAttribute(

            "src",

            expected

        );

    }







    /**
     * Verify alternative text.
     *
     * @param {string|RegExp} expected
     */
    async verifyAltText(expected){


        await this.verifyAttribute(

            "alt",

            expected

        );

    }







    /**
     * Verify title.
     *
     * @param {string|RegExp} expected
     */
    async verifyTitle(expected){


        await this.verifyAttribute(

            "title",

            expected

        );

    }








    /**
     * Verify image loaded.
     */
    async verifyLoaded(){


        expect(

            await this.isLoaded()

        ).toBeTruthy();

    }









    /**
     * Verify image broken.
     */
    async verifyBroken(){


        expect(

            await this.isBroken()

        ).toBeTruthy();

    }








    /**
     * Verify image dimensions.
     *
     * @param {number} width
     * @param {number} height
     */
    async verifyDimensions(
        width,
        height
    ){


        expect(

            await this.getWidth()

        ).toBe(width);



        expect(

            await this.getHeight()

        ).toBe(height);

    }

}
/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebFileUpload.js
 * Purpose : Enterprise File Upload wrapper with Self Healing support
 *
 * Supports:
 *
 * - Single file upload
 * - Multiple file upload
 * - Upload validation
 * - File information extraction
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
 * Enterprise File Upload Element.
 *
 * @class WebFileUpload
 */
export class WebFileUpload extends BaseElement {


    /**
     * Creates File Upload element.
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
        description = "File Upload"
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
    // Upload Actions
    // ============================================================


    /**
     * Upload single file.
     *
     * @param {string} filePath
     */
    async upload(filePath){


        if(!filePath){

            throw new Error(
                "File path cannot be empty."
            );

        }



        await this.waitForAttached();


        const locator =
            await this.getLocator();



        await locator.setInputFiles(
            filePath
        );

    }






    /**
     * Upload multiple files.
     *
     * @param {string[]} filePaths
     */
    async uploadMultiple(filePaths){


        if(
            !Array.isArray(filePaths)
            ||
            filePaths.length === 0
        ){

            throw new Error(
                "Please provide at least one file."
            );

        }



        await this.waitForAttached();


        const locator =
            await this.getLocator();



        await locator.setInputFiles(
            filePaths
        );

    }







    /**
     * Remove uploaded files.
     */
    async clear(){


        await this.waitForAttached();


        const locator =
            await this.getLocator();



        await locator.setInputFiles(
            []
        );

    }







    // ============================================================
    // Information Methods
    // ============================================================


    /**
     * Get first uploaded filename.
     *
     * @returns {Promise<string>}
     */
    async getFileName(){


        const locator =
            await this.getLocator();



        return await locator.evaluate(

            input => {


                if(
                    !input.files
                    ||
                    input.files.length === 0
                ){

                    return "";

                }


                return input.files[0].name;

            }

        );

    }








    /**
     * Get all uploaded filenames.
     *
     * @returns {Promise<string[]>}
     */
    async getFileNames(){


        const locator =
            await this.getLocator();



        return await locator.evaluate(

            input => {


                if(!input.files){

                    return [];

                }



                return Array
                    .from(input.files)
                    .map(

                        file =>
                            file.name

                    );

            }

        );

    }







    /**
     * Get uploaded file count.
     *
     * @returns {Promise<number>}
     */
    async getFileCount(){


        return (

            await this.getFileNames()

        ).length;

    }








    /**
     * Checks if file exists.
     *
     * @returns {Promise<boolean>}
     */
    async hasFile(){


        return (

            await this.getFileCount()

        ) > 0;

    }








    /**
     * Checks multiple upload support.
     *
     * @returns {Promise<boolean>}
     */
    async isMultiple(){


        const locator =
            await this.getLocator();



        return await locator.evaluate(

            input =>
                input.multiple

        );

    }








    // ============================================================
    // Enterprise Helpers
    // ============================================================


    /**
     * Verify extension exists.
     *
     * @param {string} extension
     */
    async hasExtension(extension){


        const files =
            await this.getFileNames();



        return files.some(

            file =>

                file.endsWith(extension)

        );

    }








    // ============================================================
    // Assertions
    // ============================================================


    /**
     * Verify uploaded filename.
     *
     * @param {string} expected
     */
    async verifyFileName(expected){


        expect(

            await this.getFileName()

        ).toBe(expected);

    }







    /**
     * Verify uploaded file count.
     *
     * @param {number} expected
     */
    async verifyFileCount(expected){


        expect(

            await this.getFileCount()

        ).toBe(expected);

    }







    /**
     * Verify file exists.
     */
    async verifyHasFile(){


        expect(

            await this.hasFile()

        ).toBeTruthy();

    }







    /**
     * Verify extension.
     *
     * @param {string} extension
     */
    async verifyExtension(extension){


        expect(

            await this.hasExtension(extension)

        ).toBeTruthy();

    }

}
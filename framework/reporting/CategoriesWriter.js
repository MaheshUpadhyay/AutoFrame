/**
 * ============================================================================
 * Enterprise Automation Framework
 * CategoriesWriter
 * ----------------------------------------------------------------------------
 * Creates Allure categories.json file.
 *
 * Responsibilities
 * ----------------
 * • Categorize failures
 * • Group automation issues
 * • Group product defects
 * • Improve stakeholder reporting
 *
 * Author : Automated Script
 * ============================================================================
 */


import fs from "fs";
import path from "path";
import { reportPath }
from "./ReportPathManager.js";

export class CategoriesWriter {


    static getAllureResultsDirectory(){
        return reportPath.getAllureResultsPath();
    }


    static categories = [];



    // ============================================================
    // Directory
    // ============================================================


    static createDirectory() {


        if (
            !fs.existsSync(
                this.getAllureResultsDirectory()
            )
        ) {


            fs.mkdirSync(
                this.getAllureResultsDirectory(),
                {
                    recursive: true
                }
            );


        }


    }



    // ============================================================
    // Add Category
    // ============================================================


    /**
     * Add custom category.
     *
     * @param {object} category
     */
    static add(
        category
    ) {


        this.categories.push(
            category
        );


    }



    // ============================================================
    // Default Categories
    // ============================================================


    static addDefaults() {


        this.categories = [


            {
                name:
                    "Assertion Failures",

                matchedStatuses:
                    [
                        "failed"
                    ],

                messageRegex:
                    ".*expect.*|.*AssertionError.*"
            },


            {
                name:
                    "Timeout Issues",

                matchedStatuses:
                    [
                        "broken",
                        "failed"
                    ],

                messageRegex:
                    ".*Timeout.*|.*timed out.*"
            },


            {
                name:
                    "Element Interaction Issues",

                matchedStatuses:
                    [
                        "broken"
                    ],

                traceRegex:
                    ".*locator.*|.*element.*"
            },


            {
                name:
                    "API Failures",

                matchedStatuses:
                    [
                        "failed"
                    ],

                messageRegex:
                    ".*API.*|.*HTTP.*|.*status.*"
            },


            {
                name:
                    "Environment Issues",

                matchedStatuses:
                    [
                        "broken"
                    ],

                messageRegex:
                    ".*ECONNREFUSED.*|.*network.*|.*connection.*"
            },


            {
                name:
                    "Automation Script Issues",

                matchedStatuses:
                    [
                        "broken"
                    ],

                traceRegex:
                    ".*TypeError.*|.*ReferenceError.*"
            },


            {
                name:
                    "Product Defects",

                matchedStatuses:
                    [
                        "failed"
                    ]
            }


        ];


    }



    // ============================================================
    // Write File
    // ============================================================


    /**
     * Generate categories.json
     */
    static write() {


        this.createDirectory();


        const filePath =
            path.join(

                this.getAllureResultsDirectory(),

                "categories.json"

            );


        fs.writeFileSync(

            filePath,

            JSON.stringify(
                this.categories,
                null,
                4
            ),

            "utf8"

        );


        return filePath;


    }



    // ============================================================
    // Generate
    // ============================================================


    static generate() {

        this.clear();
        this.addDefaults();


        return this.write();


    }



    // ============================================================
    // Clear
    // ============================================================


    static clear() {


        this.categories = [];


    }


}
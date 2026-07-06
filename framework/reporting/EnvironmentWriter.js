/**
 * ============================================================================
 * Enterprise Automation Framework
 * EnvironmentWriter
 * ----------------------------------------------------------------------------
 * Creates Allure environment.properties file.
 *
 * Responsibilities
 * ----------------
 * • Store execution environment details
 * • Browser information
 * • OS details
 * • Build details
 * • Framework metadata
 *
 * Author : Automated Script
 * ============================================================================
 */


import fs from "fs";
import path from "path";
import os from "os";
import { reportPath }
from "./ReportPathManager.js";

export class EnvironmentWriter {


    static getAllureResultsDirectory(){
        return reportPath.getAllureResultsPath();
    }


    static properties = new Map();



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
    // Add Property
    // ============================================================


    /**
     * Add environment property.
     *
     * @param {string} key
     * @param {string} value
     */
    static add(
        key,
        value
    ) {


        this.properties.set(
            key,
            value
        );


    }



    // ============================================================
    // Defaults
    // ============================================================


    /**
     * Add default framework information.
     */
    static addDefaults() {


        this.add(
            "Framework",
            "Automated Script Framework"
        );


        this.add(
            "Framework Version",
            "1.0.0"
        );


        this.add(
            "OS",
            `${os.type()} ${os.release()}`
        );


        this.add(
            "Platform",
            os.platform()
        );


        this.add(
            "Architecture",
            os.arch()
        );


        this.add(
            "Node Version",
            process.version
        );


        this.add(
            "Executed By",
            os.userInfo().username
        );


        this.add(
            "Execution Date",
            new Date().toISOString()
        );


    }



    // ============================================================
    // Browser Details
    // ============================================================


    static addBrowser(
        browserName
    ) {


        this.add(
            "Browser",
            browserName
        );


    }



    // ============================================================
    // Application Details
    // ============================================================


    static addApplication(

        name,

        version,

        environment,

        baseUrl

    ) {


        this.add(
            "Application",
            name
        );


        this.add(
            "Application Version",
            version
        );


        this.add(
            "Environment",
            environment
        );


        this.add(
            "Base URL",
            baseUrl
        );


    }



    // ============================================================
    // Write File
    // ============================================================


    /**
     * Write environment.properties
     */
    static write() {


        this.createDirectory();


        const filePath =
            path.join(

                this.getAllureResultsDirectory(),

                "environment.properties"

            );


        const content =
            Array.from(
                this.properties.entries()
            )
            .map(
                ([key,value]) =>
                    `${key}=${value}`
            )
            .join("\n");



        fs.writeFileSync(
            filePath,
            content,
            "utf8"
        );


        return filePath;


    }



    // ============================================================
    // Generate Everything
    // ============================================================


    static generate(

        options = {}

    ) {

        this.clear();
        this.addDefaults();



        if (options.browser) {

            this.addBrowser(
                options.browser
            );

        }



        if (options.application) {


            this.addApplication(

                options.application.name,

                options.application.version,

                options.application.environment,

                options.application.baseUrl

            );


        }



        return this.write();


    }



    // ============================================================
    // Clear
    // ============================================================


    static clear() {


        this.properties.clear();


    }


}
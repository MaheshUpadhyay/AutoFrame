/**
 * ============================================================================
 * Enterprise Automation Framework
 * ExecutorWriter
 * ----------------------------------------------------------------------------
 * Creates Allure executor.json file.
 *
 * Responsibilities
 * ----------------
 * • Store CI/CD execution details
 * • Jenkins integration metadata
 * • Azure DevOps metadata
 * • GitHub Actions metadata
 * • Build information
 * This class generates:

allure-results/
    executor.json

This gives stakeholders and teams visibility into:

CI/CD system
Build number
Build URL
Job name
Execution URL
Report URL

Allure automatically reads this file and shows Executor information.
 *
 * Author : Automated Script
 * ============================================================================
 */


import fs from "fs";
import path from "path";
import { reportPath }
from "./ReportPathManager.js";

export class ExecutorWriter {


    static getAllureResultsDirectory(){
        return reportPath.getAllureResultsPath();
    }


    static executor = {};



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
    // Set Executor
    // ============================================================


    /**
     * Configure executor information.
     *
     * @param {object} details
     */
    static set(
        details
    ) {


        this.executor = {

            ...this.executor,

            ...details

        };


    }



    // ============================================================
    // Jenkins
    // ============================================================


    static jenkins() {


        this.executor = {


            name:
                "Jenkins",


            type:
                "jenkins",


            buildName:
                process.env.BUILD_TAG
                ||
                process.env.JOB_NAME
                ||
                "Local Build",


            buildOrder:
                Number(
                    process.env.BUILD_NUMBER
                    ||
                    0
                ),


            buildUrl:
                process.env.BUILD_URL
                ||
                "",


            reportUrl:
                process.env.ALLURE_REPORT_URL
                ||
                ""


        };


    }



    // ============================================================
    // Azure DevOps
    // ============================================================


    static azureDevOps() {


        this.executor = {


            name:
                "Azure DevOps",


            type:
                "azure",


            buildName:
                process.env.BUILD_DEFINITIONNAME
                ||
                "Azure Build",


            buildOrder:
                Number(
                    process.env.BUILD_BUILDID
                    ||
                    0
                ),


            buildUrl:
                process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI
                ||
                "",


            reportUrl:
                process.env.ALLURE_REPORT_URL
                ||
                ""


        };


    }



    // ============================================================
    // GitHub Actions
    // ============================================================


    static githubActions() {


        this.executor = {


            name:
                "GitHub Actions",


            type:
                "github",


            buildName:
                process.env.GITHUB_WORKFLOW
                ||
                "GitHub Build",


            buildOrder:
                Number(
                    process.env.GITHUB_RUN_NUMBER
                    ||
                    0
                ),


            buildUrl:
                process.env.GITHUB_SERVER_URL
                ?
                `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
                :
                "",


            reportUrl:
                process.env.ALLURE_REPORT_URL
                ||
                ""


        };


    }



    // ============================================================
    // Local Execution
    // ============================================================


    static local() {


        this.executor = {


            name:
                "Local Execution",


            type:
                "local",


            buildName:
                "Developer Machine",


            buildOrder:
                1,


            reportUrl:
                ""


        };


    }



    // ============================================================
    // Auto Detect
    // ============================================================


    static autoDetect() {


        if (process.env.JENKINS_HOME) {


            this.jenkins();


        } else if (process.env.TF_BUILD) {


            this.azureDevOps();


        } else if (process.env.GITHUB_ACTIONS) {


            this.githubActions();


        } else {


            this.local();


        }


    }



    // ============================================================
    // Write File
    // ============================================================


    static write() {


        this.createDirectory();


        const filePath =
            path.join(

                this.getAllureResultsDirectory(),

                "executor.json"

            );



        fs.writeFileSync(

            filePath,

            JSON.stringify(
                this.executor,
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
        this.autoDetect();


        return this.write();


    }



    // ============================================================
    // Clear
    // ============================================================


    static clear() {


        this.executor = {};


    }


}
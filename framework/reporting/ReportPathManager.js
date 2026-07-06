/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 *
 * ReportPathManager
 *
 * Single source for execution paths
 *
 * Folder Structure:
 *
 * Projects
 *  └── project
 *      └── AutomationResults
 *          └── Allure
 *              └── env
 *                  └── type
 *                      └── timestamp
 *
 * Author : Automated Script
 * ============================================================================
 */


import path
from "path";


import fs
from "fs";





class ReportPathManager {




    constructor(){


        this.project =

            process.env.PROJECT;


        this.environment =

            process.env.ENV || "qa";


        this.type =

            process.env.TEST_TYPE || "ui";


    }








    // ============================================================
    // Project Root
    // ============================================================


    getProjectRoot(){


        return path.resolve(

            process.cwd(),

            "Projects",

            this.project

        );


    }








    // ============================================================
    // Current Execution Folder
    // ============================================================


    getCurrentExecutionPath(){


        if(

            !process.env.EXECUTION_PATH

        ){


            throw new Error(

                "EXECUTION_PATH missing. Run using TestRunner.js"

            );


        }



        return process.env.EXECUTION_PATH;


    }









    // ============================================================
    // Allure Results
    // ============================================================


    getAllureResultsPath(){


        if(

            process.env.ALLURE_RESULTS

        ){


            return process.env.ALLURE_RESULTS;


        }




        return path.join(

            this.getCurrentExecutionPath(),

            "allure-results"

        );


    }








    // ============================================================
    // Allure HTML Report
    // ============================================================


    getAllureReportPath(){


        return path.join(

            this.getCurrentExecutionPath(),

            "allure-report"

        );


    }









    // ============================================================
    // Test Artifacts
    // ============================================================


    getTestArtifactsPath(){



        return path.join(

            this.getCurrentExecutionPath(),

            "TestArtifacts"

        );



    }









    // ============================================================
    // Permanent History
    // ============================================================


    getHistoryPath(){



        return path.resolve(

            process.cwd(),

            "Projects",

            this.project,

            "AutomationResults",

            "Allure",

            this.environment,

            this.type,

            "history"

        );


    }









    // ============================================================
    // Create Required Folders
    // ============================================================


    createDirectories(){


        [

            this.getAllureResultsPath(),

            this.getAllureReportPath(),

            this.getTestArtifactsPath(),

            this.getHistoryPath()


        ]

        .forEach(

            folder=>{


                fs.mkdirSync(

                    folder,

                    {
                        recursive:true
                    }

                );


            }

        );


    }



}




export const reportPath =

    new ReportPathManager();
/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 *
 * Global Setup
 *
 * Executes once before Playwright execution.
 *
 * Responsibilities:
 *
 * - Load configuration
 * - Initialize test data
 * - Restore Allure history
 * - Create Allure metadata
 *
 * Author : Automated Script
 * ============================================================================
 */


import { ConfigManager }
from "../../framework/configuration/ConfigManager.js";


import { Logger }
from "../../framework/logging/Logger.js";


import { HistoryManager }
from "../../framework/reporting/HistoryManager.js";


import { EnvironmentWriter }
from "../../framework/reporting/EnvironmentWriter.js";


import { CategoriesWriter }
from "../../framework/reporting/CategoriesWriter.js";


import { ExecutorWriter }
from "../../framework/reporting/ExecutorWriter.js";


import { testData }
from "../../framework/data/TestDataManager.js";



async function globalSetup(){


    try{


        Logger.info(
            "===================================="
        );


        Logger.info(
            "Automated Script Execution Started"
        );


        Logger.info(
            "===================================="
        );





        // =====================================================
        // Runtime Values from TestRunner
        // =====================================================


        const project =

            process.env.PROJECT;


        const environment =

            process.env.ENV || "qa";


        const type =

            process.env.TEST_TYPE || "ui";


        const executionPath =

            process.env.EXECUTION_PATH;



        if(!project){

            throw new Error(
                "PROJECT environment variable missing"
            );

        }


        if(!executionPath){

            throw new Error(
                "EXECUTION_PATH environment variable missing"
            );

        }



        Logger.info(

            `Project : ${project}`

        );


        Logger.info(

            `Environment : ${environment}`

        );


        Logger.info(

            `Execution Type : ${type}`

        );


        Logger.info(

            `Execution Path : ${executionPath}`

        );








        // =====================================================
        // Load Configuration
        // =====================================================


        await ConfigManager.load(

            environment

        );









        // =====================================================
        // Restore Allure History
        // =====================================================


        Logger.info(

            "Restoring Allure History"

        );


        HistoryManager.copyHistory();









        // =====================================================
        // Initialize Test Data
        // =====================================================


        testData

            .setProject(
                project
            )

            .setEnvironment(
                environment
            );


        Logger.info(

            `Test Data Initialized : ${project} / ${environment}`

        );








        // =====================================================
        // Generate Allure Metadata
        // =====================================================


        EnvironmentWriter.generate({


            browser:

                process.env.BROWSER || "ALL",



            application:{


                name:

                    project,


                version:

                    "1.0.0",


                environment:

                    environment,


                baseUrl:

                    ConfigManager.get(

                        "application.baseUrl"

                    )


            }


        });






        CategoriesWriter.generate();



        ExecutorWriter.generate();








        Logger.info(

            "Global setup completed successfully"

        );



    }


    catch(error){


        Logger.exception(

            "Global setup failed",

            error

        );


        throw error;


    }


}




export default globalSetup;
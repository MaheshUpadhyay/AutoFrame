/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 *
 * Global Teardown
 *
 * Responsibilities:
 *
 * - Generate Allure HTML Report
 * - Preserve Allure History
 * - Maintain Trends
 *
 * Author : Automated Script
 * ============================================================================
 */


import { execSync }
from "child_process";


import path
from "path";


import { Logger }
from "../../framework/logging/Logger.js";


import { HistoryManager }
from "../../framework/reporting/HistoryManager.js";





async function globalTeardown(){


    try{


        Logger.info(
            "===================================="
        );


        Logger.info(
            "Automated Script Execution Completed"
        );


        Logger.info(
            "===================================="
        );





        const executionPath =

            process.env.EXECUTION_PATH;




        const allureResults =

            path.join(

                executionPath,

                "allure-results"

            );




        const allureReport =

            path.join(

                executionPath,

                "allure-report"

            );






        Logger.info(

            "Generating Allure Report"

        );





        execSync(

            `allure generate "${allureResults}" -o "${allureReport}" --clean`,

            {

                stdio:"inherit"

            }

        );








        /**
         * IMPORTANT:
         *
         * Save history AFTER report generation
         */


        HistoryManager.saveHistory();






        Logger.info(

            "Allure history saved successfully"

        );



        Logger.info(

            `Report Location : ${allureReport}`

        );



        Logger.info(

            "Global teardown completed successfully"

        );



    }


    catch(error){



        Logger.exception(

            "Global teardown failed",

            error

        );



    }


}




export default globalTeardown;
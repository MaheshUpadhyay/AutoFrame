// Projects/knowledgeware/playwright.config.js


import { defineConfig, devices }
from "@playwright/test";


import path
from "path";


import { ConfigManager }
from "../../framework/configuration/ConfigManager.js";



/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 *
 * Project Level Playwright Configuration
 *
 * Project:
 * KnowledgeWare
 *
 * ============================================================================
 */



const ENV =
    process.env.ENV || "qa";

const TEST_TYPE =

    process.env.TEST_TYPE || "ui";


const EXECUTION_PATH =

    process.env.EXECUTION_PATH;



const ALLURE_RESULTS =

    process.env.ALLURE_RESULTS;



if(!EXECUTION_PATH){


    throw new Error(

        "EXECUTION_PATH missing. Execute using TestRunner.js"

    );


}



if(!ALLURE_RESULTS){


    throw new Error(

        "ALLURE_RESULTS missing. Execute using TestRunner.js"

    );


}

/**
 * Load Project Configuration
 */

const PROJECT =

    process.env.PROJECT;



if(!PROJECT){


    throw new Error(

        "PROJECT environment variable missing"

    );


}



ConfigManager.setConfigDirectory(

    path.resolve(

        process.cwd(),

        "Projects",

        PROJECT,

        "config"

    )

);



await ConfigManager.load(
    ENV
);


const baseUrl =
    ConfigManager.get(
        "application.baseUrl"
    );



if(

    typeof baseUrl !== "string"

){

    throw new Error(

        `Invalid baseUrl configured for ENV=${ENV}. Check ${ENV}.json`

    );

}


export default defineConfig({



    // ============================================================
    // Test Location
    // ============================================================


    testDir:

        TEST_TYPE === "api"

        ?

        "./tests/api"

        :

        "./tests/ui",





    // ============================================================
    // Global Setup
    // ============================================================


    globalSetup:

        "./global-setup.js",


    globalTeardown:

        "./global-teardown.js",






    // ============================================================
    // Execution
    // ============================================================


    fullyParallel:

        true,



    workers:

        ConfigManager.get(

            "execution.workers"

        ) || 3,





    retries:

        process.env.CI

            ? 2

            : ConfigManager.get(

                "execution.retries"

            ) || 0,







    // ============================================================
    // Timeout
    // ============================================================


    timeout:

        ConfigManager.get(

            "timeout.test"

        ) || 60000,



    expect:{


        timeout:

            ConfigManager.get(

                "timeout.expect"

            ) || 10000


    },






    // ============================================================
    // Test Artifacts
    //
    // Screenshots
    // Videos
    // Traces
    // ============================================================


    outputDir:

    path.join(

        EXECUTION_PATH,

        "TestArtifacts"

    ),


    // ============================================================
    // Reporting
    //
    // Enterprise Standard:
    //
    // AutomationResults
    //      allure-results
    //      allure-report
    //
    // ============================================================


    /**
 * ============================================================
 * Allure Enterprise Reporting
 *
 * Structure:
 *
 * allure-results
 *   project
 *     environment
 *       test-type
 *         report_timestamp
 *           allure-results
 *
 * ============================================================
 */


    reporter:[


        [

            "allure-playwright",


            {


                resultsDir:

                    ALLURE_RESULTS,



                detail:

                    true,



                suiteTitle:

                    true


            }


        ]


    ],







    // ============================================================
    // Browser Defaults
    // ============================================================


    use:{



        baseURL:

            baseUrl,



        actionTimeout:

            ConfigManager.get(

                "timeout.action"

            ) || 30000,






        navigationTimeout:

            ConfigManager.get(

                "timeout.navigation"

            ) || 30000,








        screenshot:


            ConfigManager.isEnabled(

                "reporting.screenshot"

            )

            ?

            "only-on-failure"

            :

            "off",









        video:


            ConfigManager.isEnabled(

                "reporting.video"

            )

            ?

            "retain-on-failure"

            :

            "off",








        trace:


            ConfigManager.isEnabled(

                "reporting.trace"

            )

            ?

            "retain-on-failure"

            :

            "off"



    },









    // ============================================================
    // Browsers
    // ============================================================


    /**
     * Dynamic execution projects
     *
     * UI:
     *  - Chromium
     *  - Firefox
     *  - WebKit
     *
     * API:
     *  - Single API runner
     *
     * @author Mahesh Upadhyay
     */
    projects:

        TEST_TYPE === "api"

            ?

            [

                {

                    name:
                        "api"

                }

            ]


            :

            [

                {

                    name:
                        "chromium",

                    use:

                    {

                        ...devices["Desktop Chrome"]

                    }

                },


                {

                    name:
                        "firefox",

                    use:

                    {

                        ...devices["Desktop Firefox"]

                    }

                },


                {

                    name:
                        "webkit",

                    use:

                    {

                        ...devices["Desktop Safari"]

                    }

                }

            ]



});
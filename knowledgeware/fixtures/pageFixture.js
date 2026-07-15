// Projects/knowledgeware/fixtures/pageFixture.js


import { PageManager }
from "../../../framework/core/PageManager.js";


import { TestListener }
from "../../../framework/listeners/TestListener.js";


import { LoginPage }
from "../pages/LoginPage.js";


// import future pages here
// import { DashboardPage }
// from "../pages/DashboardPage.js";



/**
 * Page Fixture
 *
 * Handles page lifecycle.
 *
 * Responsibilities:
 *
 * - Initialize Test Listener
 * - Create Page Manager
 * - Register project pages
 * - Cleanup execution
 *
 */


export const pageFixture = {



    /**
     * Initialize page dependencies
     *
     * @param {Page} page
     * @param {TestInfo} testInfo
     */


    async initialize(page, testInfo){



        await TestListener.beforeTest(
            testInfo
        );



        /**
         * Create framework PageManager
         */

        const pageManager =
            new PageManager(page);




        /**
         * Register Project Pages
         *
         * Lazy loading:
         *
         * Object is created only when test asks.
         */


        pageManager.register(

            "LoginPage",

            () => new LoginPage(page)

        );




        /*
        pageManager.register(

            "DashboardPage",

            () => new DashboardPage(page)

        );
        */




        return {


            page,


            pageManager


        };


    },








    


    /**
     * Cleanup page execution
     *
     * @param {Page} page
     * @param {TestInfo} testInfo
     */

    async cleanup(page, testInfo){


        await TestListener.afterTest(

            page,

            testInfo

        );


    }



};
// Projects/knowledgeware/tests/ui/login.test.js

import { testData }
from "../../../../../framework/data/TestDataManager.js";

import { test }
from "../../../fixtures/testFixture.js";


import { StepLogger }
from "../../../../../framework/reporting/StepLogger.js";


import { ReportManager }
from "../../../../../framework/reporting/ReportManager.js";


import { Severity }
from "../../../../../framework/reporting/ReportConstants.js";



/**
 * Login Test Suite
 *
 * Demonstrates:
 *
 * - Custom Fixtures
 * - PageManager
 * - Page Object Model
 * - Framework Web Elements
 * - Step Logger
 * - Allure Reporting
 */


test.describe(

    "KnowledgeWare Login Tests",

    ()=>{


        test.beforeEach(

            async()=>{


                ReportManager.epic(
                    "KnowledgeWare Application"
                );


                ReportManager.feature(
                    "Authentication"
                );


                ReportManager.story(
                    "User Login"
                );


                ReportManager.owner(
                    "Mahesh"
                );


                ReportManager.severity(
                    Severity.CRITICAL
                );


            }

        );






        test(

            "Verify user can login successfully",

            async({app})=>{



                /**
                 * Get page from PageManager
                 *
                 * No direct page object creation
                 */


                const loginPage =

                    app.pageManager.get(

                        "LoginPage"

                    );







                await StepLogger.step(

                    "Open KnowledgeWare Application",

                    async()=>{


                        await loginPage.navigate();


                    }

                );







                await StepLogger.step(

                    "Login with valid credentials",

                    async()=>{


                        const data =
                        testData.get(

                            "ui/login.json",

                            "TC_LOGIN_001"

                        );


                        await loginPage.login(

                            data.username,

                            data.password

                        );


                    }

                );


            }

        );


    }

);
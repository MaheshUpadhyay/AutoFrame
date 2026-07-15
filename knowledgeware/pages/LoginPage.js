// Projects/project1/pages/LoginPage.js


import { BasePage }
from "../../../framework/core/BasePage.js";


import { WebTextBox }
from "../../../framework/ui/WebTextBox.js";


import { WebLink }
from "../../../framework/ui/WebLink.js";


import { StepLogger }
from "../../../framework/reporting/StepLogger.js";


import { ReportManager }
from "../../../framework/reporting/ReportManager.js";



/**
 * Login Page
 *
 * Page Object Model implementation
 *
 * Application specific page.
 *
 * Uses:
 * - BasePage
 * - Framework Web Elements
 * - Framework Reporting
 *
 */
export class LoginPage extends BasePage{


    /**
     * Create Login Page
     *
     * @param {Page} page
     */

    constructor(page){


        super(page);



        /**
         * Page Elements
         */


        this.usernameTextbox =
            new WebTextBox(

                page,

                "input[name='name']",

                "LoginPage.usernameTextbox"

            );




        this.passwordTextbox =
            new WebTextBox(

                page,

                "input[name='wrong']",

                "LoginPage.passwordTextbox"

            );




        this.loginButton =
            new WebLink(

                page,

                "a[href='reg.html']",

                "LoginPage.loginButton"

            );


    }





    /**
     * Navigate to Login page
     *
     */


    async navigate(){


        await StepLogger.step(

            "Navigate to Application",

            async()=>{


                await this.open(
                    ""
                );


                await ReportManager.parameter(

                    "Application",

                    "KnowledgeWare"

                );

            }

        );

    }






    /**
     * Enter Username
     *
     * @param {string} username
     */


    async enterUsername(username){


        await StepLogger.step(

            `Enter username : ${username}`,

            async()=>{


                await this.usernameTextbox.enterText(
                    username
                );


            }

        );


    }








    /**
     * Enter Password
     *
     * @param {string} password
     */


    async enterPassword(password){


        await StepLogger.step(

            "Enter password",

            async()=>{


                await this.passwordTextbox.enterText(
                    password
                );


            }

        );


    }








    /**
     * Click Login
     *
     */


    async clickLogin(){


        await StepLogger.step(

            "Click Login Button",

            async()=>{


                await this.loginButton.click();


            }

        );


    }








    /**
     * Complete Login Flow
     *
     * @param {string} username
     * @param {string} password
     */


    async login(
        username,
        password
    ){


        await StepLogger.step(

            "Login with valid credentials",

            async()=>{


                await this.enterUsername(
                    username
                );


                await this.enterPassword(
                    password
                );


                await this.clickLogin();


            }

        );


    }

}
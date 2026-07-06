/**
 * ============================================================================
 * Enterprise Automation Framework
 *
 * HistoryManager
 *
 * Maintains Allure history per:
 *
 * Project
 *  └── Environment
 *      └── Type(UI/API)
 *
 * Example:
 *
 * AutomationResults
 *   Allure
 *     knowledgeware
 *       qa
 *         ui
 *           history
 *
 * Author : Automated Script
 * ============================================================================
 */


import fs
from "fs";


import path
from "path";





export class HistoryManager {





    // ============================================================
    // Current Execution Path
    // ============================================================


    static getExecutionPath(){


        if(

            !process.env.EXECUTION_PATH

        ){


            throw new Error(

                "EXECUTION_PATH environment variable missing"

            );


        }


        return process.env.EXECUTION_PATH;


    }








    // ============================================================
    // Permanent History Path
    // ============================================================


    static getHistoryStorePath(){



        const project =

            process.env.PROJECT;



        const environment =

            process.env.ENV || "qa";



        const type =

            process.env.TEST_TYPE || "ui";






        return path.resolve(


            process.cwd(),


            "Projects",


            project,


            "AutomationResults",


            "Allure",


            environment,


            type,


            "History"


        );



    }








    // ============================================================
    // Restore Previous History Before Execution
    // ============================================================


    static copyHistory(){



        const source =

            this.getHistoryStorePath();




        const destination =

            path.join(

                this.getExecutionPath(),

                "allure-results",

                "history"

            );








        if(

    !fs.existsSync(source)

    ){


        console.log(

            "No previous Allure history found"

        );


        return;


    }







        fs.mkdirSync(

            destination,

            {

                recursive:true

            }

        );







        fs.cpSync(

            source,

            destination,

            {

                recursive:true

            }

        );



    }










    // ============================================================
    // Save Latest History After Report Generation
    // ============================================================


    static saveHistory(){



        const source =

            path.join(

                this.getExecutionPath(),

                "allure-report",

                "history"

            );




        const destination =

            this.getHistoryStorePath();








        if(

            !fs.existsSync(source)

        ){


            console.log(

                "Allure report history not generated yet"

            );


            return;


        }








        if(

            fs.existsSync(destination)

        ){


            fs.rmSync(

                destination,

                {

                    recursive:true,

                    force:true

                }

            );


        }








        fs.mkdirSync(

            destination,

            {

                recursive:true

            }

        );








        fs.cpSync(

            source,

            destination,

            {

                recursive:true

            }

        );



    }



}
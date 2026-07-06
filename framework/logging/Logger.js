/**
 * ============================================================================
 * Enterprise Automation Framework
 * Logger
 * ----------------------------------------------------------------------------
 * Centralized framework logger.
 *
 * Responsibilities
 * ----------------
 * • Console logging
 * • Project specific logs
 * • Environment specific logs
 * • Execution logs
 *
 * Author : Automated Script
 * ============================================================================
 */


import fs from "fs";
import path from "path";


import { reportPath }
from "../reporting/ReportPathManager.js";



export class Logger {


    static logDirectory = null;


    static logFile = null;


    static enabled = true;



    // ============================================================
    // Initialization
    // ============================================================


    static initialize(){


        if(!this.logDirectory){


            this.logDirectory =

                path.join(

                    reportPath.getCurrentExecutionPath(),

                    "Logs"

                );


            this.logFile =

                path.join(

                    this.logDirectory,

                    "execution.log"

                );


        }



        if(

            !fs.existsSync(
                this.logDirectory
            )

        ){


            fs.mkdirSync(

                this.logDirectory,

                {
                    recursive:true
                }

            );


        }


    }





    // ============================================================
    // Write Log
    // ============================================================


    static write(

        level,

        message

    ){


        if(!this.enabled){

            return;

        }


        this.initialize();



        const logMessage =

            `[${this.timestamp()}] [${level}] ${message}`;



        console.log(

            logMessage

        );



        fs.appendFileSync(

            this.logFile,

            logMessage + "\n",

            "utf8"

        );


    }







    // ============================================================
    // Levels
    // ============================================================


    static info(message){


        this.write(

            "INFO",

            message

        );


    }



    static pass(message){


        this.write(

            "PASS",

            message

        );


    }




    static warn(message){


        this.write(

            "WARN",

            message

        );


    }



    static error(message){


        this.write(

            "ERROR",

            message

        );


    }




    static debug(message){


        this.write(

            "DEBUG",

            message

        );


    }






    // ============================================================
    // Exception
    // ============================================================


    static exception(error){


        this.write(

            "EXCEPTION",

`
Message:
${error.message}

Stack:
${error.stack}
`

        );


    }







    // ============================================================
    // Object Logger
    // ============================================================


    static object(

        title,

        object

    ){



        this.write(

            "OBJECT",

`
${title}

${JSON.stringify(
    object,
    null,
    4
)}
`

        );


    }







    // ============================================================
    // Controls
    // ============================================================


    static enable(){


        this.enabled = true;


    }



    static disable(){


        this.enabled = false;


    }



    static clear(){


        if(

            this.logFile &&

            fs.existsSync(this.logFile)

        ){


            fs.unlinkSync(

                this.logFile

            );


        }


    }






    // ============================================================
    // Helpers
    // ============================================================


    static timestamp(){


        return new Date()

            .toISOString();


    }


}
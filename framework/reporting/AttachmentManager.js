/**
 * ============================================================================
 * Enterprise Automation Framework
 * AttachmentManager
 * ----------------------------------------------------------------------------
 * Centralized attachment handler.
 *
 * Author : Automated Script
 * ============================================================================
 */


import fs from "fs";
import path from "path";


import { AllureManager }
from "./AllureManager.js";


import { ReportConstants }
from "./ReportConstants.js";


import { reportPath }
from "./ReportPathManager.js";





export class AttachmentManager {


    static attachmentDirectory = null;





    // ============================================================
    // Directory
    // ============================================================


    static createDirectory(){


        if(!this.attachmentDirectory){


            this.attachmentDirectory =

                path.join(

                    reportPath.getCurrentExecutionPath(),

                    "Attachments"

                );


        }





        if(

            !fs.existsSync(

                this.attachmentDirectory

            )

        ){


            fs.mkdirSync(

                this.attachmentDirectory,

                {
                    recursive:true
                }

            );


        }


    }






    // ============================================================
    // Save Physical Attachment
    // ============================================================


    static save(

        name,

        content,

        extension

    ){


        this.createDirectory();




        const fileName =

            `${name}_${Date.now()}.${extension}`

            .replace(/\s+/g,"_")

            .replace(/[^\w.-]/g,"_");





        const filePath =

            path.join(

                this.attachmentDirectory,

                fileName

            );




        fs.writeFileSync(

            filePath,

            content,

            "utf8"

        );




        return filePath;


    }







    // ============================================================
    // Generic Attachment
    // ============================================================


    static async attach(

        name,

        content,

        type

    ){


        await AllureManager.addAttachment(

            name,

            content,

            type

        );


    }







    // ============================================================
    // Text
    // ============================================================


    static async attachText(

        name,

        text

    ){


        const content =

            String(text);




        this.save(

            name,

            content,

            "txt"

        );




        await this.attach(

            name,

            content,

            ReportConstants.AttachmentType.TEXT

        );


    }







    // ============================================================
    // JSON
    // ============================================================


    static async attachJson(

        name,

        object

    ){


        const json =

            JSON.stringify(

                object,

                null,

                4

            );




        this.save(

            name,

            json,

            "json"

        );




        await this.attach(

            name,

            json,

            ReportConstants.AttachmentType.JSON

        );


    }







    // ============================================================
    // XML
    // ============================================================


    static async attachXml(

        name,

        xml

    ){


        this.save(

            name,

            xml,

            "xml"

        );




        await this.attach(

            name,

            xml,

            ReportConstants.AttachmentType.XML

        );


    }







    // ============================================================
    // HTML
    // ============================================================


    static async attachHtml(

        name,

        html

    ){


        this.save(

            name,

            html,

            "html"

        );




        await this.attach(

            name,

            html,

            ReportConstants.AttachmentType.HTML

        );


    }







    // ============================================================
    // CSV
    // ============================================================


    static async attachCsv(

        name,

        csv

    ){


        this.save(

            name,

            csv,

            "csv"

        );




        await this.attach(

            name,

            csv,

            ReportConstants.AttachmentType.CSV

        );


    }








    // ============================================================
    // Physical File Attachment
    // ============================================================


    static async attachFile(

        name,

        filePath,

        type

    ){



        if(

            !fs.existsSync(filePath)

        ){


            throw new Error(

                `Attachment file not found : ${filePath}`

            );


        }





        const buffer =

            fs.readFileSync(

                filePath

            );





        await this.attach(

            name,

            buffer,

            type

        );


    }








    // ============================================================
    // API Helpers
    // ============================================================


    static async attachRequest(

        request

    ){


        await this.attachJson(

            "API Request",

            request

        );


    }




    static async attachResponse(

        response

    ){


        await this.attachJson(

            "API Response",

            response

        );


    }







    // ============================================================
    // Logs
    // ============================================================


    static async attachLog(

        message

    ){


        await this.attachText(

            "Execution Log",

            message

        );


    }








    // ============================================================
    // Errors
    // ============================================================


    static async attachError(

        error

    ){


        await this.attachJson(

            "Error Details",

            {

                message:error.message,

                stack:error.stack

            }

        );


    }








    // ============================================================
    // Reset
    // ============================================================


    static reset(){


        this.attachmentDirectory = null;


    }


}
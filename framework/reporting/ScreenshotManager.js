/**
 * ============================================================================
 * Enterprise Automation Framework
 * ScreenshotManager
 * ----------------------------------------------------------------------------
 * Handles screenshot capture and Allure attachment.
 *
 * Responsibilities
 * ----------------
 * • Capture page screenshots
 * • Capture element screenshots
 * • Attach screenshots to Allure
 * • Capture screenshots on failure
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





export class ScreenshotManager {


    static screenshotDirectory = null;




    // ============================================================
    // Directory
    // ============================================================


    static createDirectory(){


        if(!this.screenshotDirectory){


            this.screenshotDirectory =

                path.join(

                    reportPath.getCurrentExecutionPath(),

                    "Screenshots"

                );


        }




        if(

            !fs.existsSync(
                this.screenshotDirectory
            )

        ){


            fs.mkdirSync(

                this.screenshotDirectory,

                {
                    recursive:true
                }

            );


        }


    }






    // ============================================================
    // Page Screenshot
    // ============================================================


    static async capture(

        page,

        name = "Screenshot"

    ){


        this.createDirectory();



        const fileName =

            `${name}_${Date.now()}.png`

            .replace(/\s+/g,"_")

            .replace(/[^\w.-]/g,"_");





        const filePath =

            path.join(

                this.screenshotDirectory,

                fileName

            );





        await page.screenshot({

            path:filePath,

            fullPage:true

        });




        return filePath;


    }







    // ============================================================
    // Element Screenshot
    // ============================================================


    static async captureElement(

        locator,

        name = "Element"

    ){


        this.createDirectory();



        const fileName =

            `${name}_${Date.now()}.png`

            .replace(/\s+/g,"_")

            .replace(/[^\w.-]/g,"_");





        const filePath =

            path.join(

                this.screenshotDirectory,

                fileName

            );




        await locator.screenshot({

            path:filePath

        });




        return filePath;


    }







    // ============================================================
    // Attach Existing Screenshot
    // ============================================================


    static async attach(

        name,

        filePath

    ){


        const buffer =

            fs.readFileSync(

                filePath

            );




        await AllureManager.addAttachment(

            name,

            buffer,

            ReportConstants.AttachmentType.PNG

        );


    }








    // ============================================================
    // Failure Screenshot
    // ============================================================


    static async captureOnFailure(

        page,

        testName

    ){



        const screenshot =

            await this.capture(

                page,

                `${testName}_FAILED`

            );




        await this.attach(

            "Failure Screenshot",

            screenshot

        );



        return screenshot;


    }








    // ============================================================
    // Capture + Attach
    // ============================================================


    static async captureAndAttach(

        page,

        name

    ){



        const screenshot =

            await this.capture(

                page,

                name

            );




        await this.attach(

            name,

            screenshot

        );



        return screenshot;


    }




    // ============================================================
    // Reset (important for parallel runs)
    // ============================================================


    static reset(){


        this.screenshotDirectory = null;


    }


}
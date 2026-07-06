/**
 * ============================================================================
 * Enterprise Automation Framework
 * VideoManager
 * ----------------------------------------------------------------------------
 * Handles Playwright video artifacts and Allure attachments.
 *
 * Responsibilities
 * ----------------
 * • Attach videos to Allure
 * • Save videos
 * • Delete videos
 * • Failure video handling
 *
 * Author : Automated Script
 * ============================================================================
 */


import fs from "fs";
import path from "path";


import { Logger }
from "../logging/Logger.js";


import { AllureManager }
from "./AllureManager.js";


import { reportPath }
from "./ReportPathManager.js";





export class VideoManager {


    static videoDirectory = null;





    // ============================================================
    // Directory Management
    // ============================================================


    static createDirectory(){


        if(!this.videoDirectory){


            this.videoDirectory =

                path.join(

                    reportPath.getCurrentExecutionPath(),

                    "Videos"

                );


        }




        if(

            !fs.existsSync(
                this.videoDirectory
            )

        ){


            fs.mkdirSync(

                this.videoDirectory,

                {
                    recursive:true
                }

            );


        }


    }








    // ============================================================
    // Get Playwright Video
    // ============================================================


    static async getVideoPath(

        page

    ){


        const video =

            page.video();




        if(!video){


            return null;


        }




        return await video.path();


    }








    // ============================================================
    // Save Video
    // ============================================================


    static async save(

        page,

        name = "ExecutionVideo"

    ){



        this.createDirectory();




        const videoPath =

            await this.getVideoPath(

                page

            );




        if(!videoPath){


            return null;


        }




        const fileName =

            `${name}_${Date.now()}.webm`

            .replace(/\s+/g,"_")

            .replace(/[^\w.-]/g,"_");





        const destination =

            path.join(

                this.videoDirectory,

                fileName

            );





        if(

            !fs.existsSync(
                videoPath
            )

        ){


            Logger.warn(

                `Video not ready : ${videoPath}`

            );



            return null;


        }





        fs.copyFileSync(

            videoPath,

            destination

        );




        return destination;


    }










    // ============================================================
    // Attach Video
    // ============================================================


    static async attach(

        name,

        filePath

    ){



        if(

            !filePath ||

            !fs.existsSync(filePath)

        ){


            return;


        }





        const buffer =

            fs.readFileSync(

                filePath

            );




        await AllureManager.addAttachment(

            name,

            buffer,

            "video/webm"

        );


    }










    // ============================================================
    // Save + Attach
    // ============================================================


    static async saveAndAttach(

        page,

        name = "Execution Video"

    ){



        const savedVideo =

            await this.save(

                page,

                name

            );




        if(savedVideo){


            await this.attach(

                name,

                savedVideo

            );


        }




        return savedVideo;


    }








    // ============================================================
    // Failure Video
    // ============================================================


    static async attachOnFailure(

        page,

        testName

    ){


        return await this.saveAndAttach(

            page,

            `${testName}_FAILED`

        );


    }








    // ============================================================
    // Delete
    // ============================================================


    static delete(

        videoPath

    ){



        if(

            videoPath &&

            fs.existsSync(videoPath)

        ){


            fs.unlinkSync(

                videoPath

            );


        }


    }








    // ============================================================
    // Reset
    // ============================================================


    static reset(){


        this.videoDirectory = null;


    }


}
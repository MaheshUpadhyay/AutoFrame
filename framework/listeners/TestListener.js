/**
 * ============================================================================
 * Enterprise Automation Framework
 * TestListener
 * ----------------------------------------------------------------------------
 * Playwright lifecycle listener.
 *
 * Responsibilities
 * ----------------
 * • Test lifecycle handling
 * • Allure metadata
 * • Failure evidence
 * • Screenshot
 * • Video
 * • Error attachments
 *
 * Author : Automated Script
 * ============================================================================
 */


import { Logger }
from "../logging/Logger.js";


import { ScreenshotManager }
from "../reporting/ScreenshotManager.js";


import { VideoManager }
from "../reporting/VideoManager.js";


import { AttachmentManager }
from "../reporting/AttachmentManager.js";


import { ReportManager }
from "../reporting/ReportManager.js";





export class TestListener {





    // ============================================================
    // Before Test
    // ============================================================


    static async beforeTest(

        testInfo

    ){


        Logger.info(

            `Starting Test : ${testInfo.title}`

        );





        await ReportManager.parameter(

            "Test Name",

            testInfo.title

        );




        await ReportManager.parameter(

            "Project",

            process.env.PROJECT || "NA"

        );




        await ReportManager.parameter(

            "Environment",

            process.env.ENV || "NA"

        );




        await ReportManager.parameter(

            "Execution Type",

            process.env.TYPE || "ui"

        );





        await ReportManager.parameter(

            "Browser",

            testInfo.project.name

        );





        await ReportManager.parameter(

            "Worker",

            testInfo.workerIndex

        );





        await ReportManager.parameter(

            "Retry",

            testInfo.retry

        );


    }










    // ============================================================
    // After Test
    // ============================================================


    static async afterTest(

        page,

        testInfo

    ){



        if(

            testInfo.status === "skipped"

        ){


            await this.onSkip(

                testInfo

            );


            return;


        }






        const failed =

            testInfo.status

            !==

            testInfo.expectedStatus;






        if(failed){



            await this.onFailure(

                page,

                testInfo

            );


        }

        else{


            await this.onSuccess(

                testInfo

            );


        }






        Logger.info(

            `Completed Test : ${testInfo.title}`

        );


    }










    // ============================================================
    // Success
    // ============================================================


    static async onSuccess(

        testInfo

    ){


        Logger.pass(

            `PASSED : ${testInfo.title}`

        );



        await ReportManager.parameter(

            "Duration(ms)",

            testInfo.duration

        );


    }










    // ============================================================
    // Failure
    // ============================================================


    static async onFailure(

        page,

        testInfo

    ){



        Logger.error(

            `FAILED : ${testInfo.title}`

        );







        try{


            if(page){


                await ScreenshotManager

                    .captureOnFailure(

                        page,

                        testInfo.title

                    );


            }


        }

        catch(error){


            Logger.warn(

                `Screenshot capture failed : ${error.message}`

            );


        }








        try{


            if(page){


                await VideoManager

                    .attachOnFailure(

                        page,

                        testInfo.title

                    );


            }


        }

        catch(error){


            Logger.warn(

                `Video attachment failed : ${error.message}`

            );


        }








        try{


            if(testInfo.error){



                await AttachmentManager

                    .attachError(

                        testInfo.error

                    );




                Logger.exception(

                    testInfo.error

                );


            }



        }

        catch(error){


            Logger.warn(

                `Error attachment failed : ${error.message}`

            );


        }



    }










    // ============================================================
    // Skip
    // ============================================================


    static async onSkip(

        testInfo

    ){


        Logger.warn(

            `SKIPPED : ${testInfo.title}`

        );


    }









    // ============================================================
    // Retry
    // ============================================================


    static async onRetry(

        testInfo

    ){


        Logger.warn(

            `Retrying Test : ${testInfo.title}`

        );




        await ReportManager.parameter(

            "Retry Attempt",

            testInfo.retry

        );


    }



}
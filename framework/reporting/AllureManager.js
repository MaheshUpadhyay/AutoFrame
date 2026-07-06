/**
 * ============================================================================
 * Enterprise Automation Framework
 * AllureManager
 * ----------------------------------------------------------------------------
 * Centralized wrapper around allure-playwright.
 *
 * Only class allowed to communicate with Allure API directly.
 *
 * Author : Automated Script
 * ============================================================================
 */


import * as allure
from "allure-js-commons";



export class AllureManager {


    // ============================================================
    // Labels
    // ============================================================


    static async addLabel(

        name,

        value

    ){


        await allure.label(

            name,

            String(value)

        );


    }




    static async addOwner(owner){


        await allure.owner(

            String(owner)

        );


    }





    static async addSeverity(severity){


        await allure.severity(

            severity

        );


    }





    static async addEpic(epic){


        await allure.epic(

            epic

        );


    }





    static async addFeature(feature){


        await allure.feature(

            feature

        );


    }





    static async addStory(story){


        await allure.story(

            story

        );


    }





    static async addTag(tag){


        await allure.tag(

            tag

        );


    }






    // ============================================================
    // Suite Hierarchy
    // ============================================================


    static async parentSuite(name){


        await allure.parentSuite(

            name

        );


    }



    static async suite(name){


        await allure.suite(

            name

        );


    }




    static async subSuite(name){


        await allure.subSuite(

            name

        );


    }







    // ============================================================
    // Description
    // ============================================================


    static async addDescription(

        description

    ){


        await allure.description(

            description

        );


    }




    static async addDescriptionHtml(

        html

    ){


        await allure.descriptionHtml(

            html

        );


    }








    // ============================================================
    // Parameters
    // ============================================================


    static async addParameter(

        name,

        value

    ){


        await allure.parameter(

            name,

            value === undefined

                ? "undefined"

                : String(value)

        );


    }







    // ============================================================
    // Links
    // ============================================================


    static async addLink(

        url,

        name=url

    ){


        await allure.link(

            url,

            name

        );


    }




    static async addIssue(

        issue

    ){


        await allure.issue(

            issue

        );


    }




    static async addTms(

        testcase

    ){


        await allure.tms(

            testcase

        );


    }








    // ============================================================
    // Attachments
    // ============================================================


    static async addTextAttachment(

        name,

        text

    ){


        await this.addAttachment(

            name,

            String(text),

            "text/plain"

        );


    }






    static async addJsonAttachment(

        name,

        object

    ){


        await this.addAttachment(

            name,

            JSON.stringify(

                object,

                null,

                4

            ),

            "application/json"

        );


    }







    static async addAttachment(

        name,

        content,

        contentType

    ){


        if(

            content === undefined ||

            content === null

        ){


            content = "";


        }




        await allure.attachment(

            name,

            content,

            contentType

        );


    }








    // ============================================================
    // Steps
    // ============================================================


    static async step(

        name,

        body

    ){


        return await allure.step(

            name,

            body

        );


    }


}
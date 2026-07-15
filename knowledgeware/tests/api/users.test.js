/**
 * @file users.test.js
 * @description
 * User API automation tests.
 *
 * @author Mahesh Upadhyay
 */


import { test }
from "@playwright/test";


import { ApiClient }
from "../../../../framework/api/core/ApiClient.js";


import { ApiAssertions }
from "../../../../framework/api/assertions/ApiAssertions.js";


import { ApiSchemaValidator }
from "../../../../framework/api/schema/ApiSchemaValidator.js";


import { testData }
from "../../../../framework/data/TestDataManager.js";


import { ReportManager }
from "../../../../framework/reporting/ReportManager.js";




test.describe(
    "User API Tests",

    () => {



test(

"TC_GET_USER_001 - Verify get user API",

async () => {



    await ReportManager.epic(
        "API Automation"
    );


    await ReportManager.feature(
        "Users Service"
    );



    const data =
        testData.get(

            "api/users",

            "TC_GET_USER_001"

        );



    const response =
        await ApiClient.get(

            data.endpoint

        );




    ApiAssertions.shouldHaveStatus(

        response,

        data.expectedStatus

    );




    await ApiAssertions.shouldHaveField(

        response,

        "id"

    );


    await ApiAssertions.shouldHaveField(

        response,

        "name"

    );


    await ApiAssertions.shouldHaveField(

        response,

        "email"

    );




    await ApiAssertions.shouldHaveValue(

        response,


        "id",


        data.expectedId

    );




    await ApiSchemaValidator
        .validateResponseFile(

            response,


            "Projects/knowledgeware/schemas/api/users/get-user.schema.json"

        );



    });



});
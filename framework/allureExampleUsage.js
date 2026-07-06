//Example Usage - AllureManager.js
import { AllureManager } from "../framework/reporting/AllureManager.js";

await AllureManager.addEpic("Banking");

await AllureManager.addFeature("Fund Transfer");

await AllureManager.addStory("Transfer to Beneficiary");

await AllureManager.addOwner("Automated Script");

await AllureManager.addSeverity("critical");

await AllureManager.addParameter("Browser", "Chromium");

await AllureManager.addTextAttachment(
    "Request",
    JSON.stringify(requestBody, null, 2)
);

//Example - reportmanager.js
import { ReportManager } from "../framework/reporting/ReportManager.js";

await ReportManager.parentSuite("Enterprise Automation");

await ReportManager.suite("Login");

await ReportManager.subSuite("Positive Tests");

await ReportManager.epic("Authentication");

await ReportManager.feature("Login");

await ReportManager.story("Valid Login");

await ReportManager.owner("Automated Script");

await ReportManager.severity("critical");

await ReportManager.parameter(
    "Browser",
    "Chromium"
);

await ReportManager.attachJson(
    "Request",
    requestBody
);

//Usage Instead of - ReportConstants.js

await ReportManager.severity("critical");

//write

import { ReportConstants } from "./ReportConstants.js";

await ReportManager.severity(
    ReportConstants.Severity.CRITICAL
);

//Instead of

await AllureManager.addAttachment(
    "Request",
    json,
    "application/json"
);

//write

await AllureManager.addAttachment(
    "Request",
    json,
    ReportConstants.AttachmentType.JSON
);

//Instead of

await AllureManager.addLabel(
    "suite",
    "Login"
);

//write

await AllureManager.addLabel(
    ReportConstants.Labels.SUITE,
    "Login"
);

//This is how I'd write tests - ReportConstants.js
await StepLogger.step(
    "Login using valid credentials",
    async () => {

        await loginPage.login(
            "admin",
            "admin123"
        );

    }
);
await StepLogger.step(
    "Transfer money",
    async () => {

        await transfer.transferMoney();

    }
);

/*One recommendation for the entire framework

Since we're now standardizing on Allure, I recommend we don't call StepLogger from low-level framework classes like BaseElement.click() or WebTextBox.enterText().

Instead:

Low-level wrappers stay focused on interactions.
Page Objects define meaningful business actions.
Tests (or Page Object methods) wrap those business actions in StepLogger.step().

For example:

await StepLogger.step("Login with valid credentials", async () => {
    await loginPage.login("admin", "admin123");
});*/

//Example Usage Manual screenshot - screenshotManager.js
await ScreenshotManager.captureAndAttach(
    page,
    "After Login"
);
/*
Allure:

Attachments
    |
    └── After Login.png
Failure

Later our TestListener.js will call:
*/
if(testInfo.status !== testInfo.expectedStatus){

    await ScreenshotManager.captureOnFailure(
        page,
        testInfo.title
    );

}

// Usage Example Manual:video - videoManager.js

await VideoManager.saveAndAttach(
    page,
    "Login Test Video"
);

//Failure scenario:

await VideoManager.attachOnFailure(
    page,
    testInfo.title
);
//Required Playwright Config

//Enable video:

use: {

    video: "retain-on-failure"

}

//or:

use: {

    video: "on"

}

//Example API Usage Later Inside ApiClient.js:

await AttachmentManager.attachRequest({
    method : "POST",
    url,
    body
});


await AttachmentManager.attachResponse({
    status : response.status(),
    body : await response.json()
});

//Allure:

/*Login API Test

Attachments
    |
    ├── API Request.json
    |
    └── API Response.json
//Example Failure Listener Usage
catch(error){

    await AttachmentManager.attachError(
        error
    );

}*/

//Example Usage In global setup: EnvironementWriter.js

import { EnvironmentWriter } 
from "./framework/reporting/EnvironmentWriter.js";


EnvironmentWriter.generate({

    browser : "Chromium",


    application : {

        name : "Banking Application",

        version : "2.5.1",

        environment : "QA",

        baseUrl : "https://qa.bank.com"

    }

});
/*
Generated:

allure-results/environment.properties

Content:

Framework=Automated Script Framework
Framework Version=1.0.0
OS=Windows_NT 10
Platform=win32
Architecture=x64
Node Version=v22
Executed By=automation
Execution Date=2026-07-03

Browser=Chromium

Application=Banking Application
Application Version=2.5.1
Environment=QA
Base URL=https://qa.bank.com
*/

//Example Usage - In global setup: CategoriesWriter.js

import { CategoriesWriter } 
from "./framework/reporting/CategoriesWriter.js";


CategoriesWriter.generate();

//Generated:

allure-results/categories.json

//Example:

[
    {
        "name": "Assertion Failures",
        "matchedStatuses": [
            "failed"
        ],
        "messageRegex": ".*expect.*"
    },

    {
        "name": "Timeout Issues",
        "matchedStatuses": [
            "broken",
            "failed"
        ],
        "messageRegex": ".*Timeout.*"
    }
]
/*Final Allure View

Stakeholders see:

Categories

Assertion Failures
    12 Tests

Timeout Issues
    5 Tests

API Failures
    3 Tests

Environment Issues
    1 Test*/

//Usage In global setup: ExecutorWriter.js
import { ExecutorWriter } 
from "./framework/reporting/ExecutorWriter.js";


ExecutorWriter.generate();
//Generated File
allure-results/executor.json

//Example Jenkins:
/*
{
    "name": "Jenkins",
    "type": "jenkins",
    "buildName": "Automation Regression",
    "buildOrder": 105,
    "buildUrl": "https://jenkins/job/105",
    "reportUrl": "https://reports/allure"
}*/

//Usage Examples Framework classes - Example ApiClient.js -logger.js

Logger.info(
    "Sending GET request /users"
);

//Example BaseElement.js

Logger.info(
    `Clicking element: ${this.getDescription()}`
);

//Failures:

try {

    await button.click();

}
catch(error){

    Logger.exception(error);

    throw error;

}

//Objects:

Logger.object(
    "API Response",
    responseBody
);

/*Output:

[2026-07-03T05:10:11] [INFO] Opening browser

[2026-07-03T05:10:15] [PASS] Login completed

[2026-07-03T05:10:20] [ERROR] User not found*/

/*Example config: - configuration/EnvironmentResolver.js - configuration/ConfigManager.js

config/
├── default.json
└── qa.json

default.json

{
  "browser": "chromium",

  "timeout": {
    "default": 30000
  },

  "reporting": {
    "screenshots": true,
    "video": true
  }
}
*/
/*qa.json

{
  "application": {

    "baseUrl":
      "https://qa.demo.com"

  },

  "api": {

    "baseUrl":
      "https://api.qa.demo.com"

  }
}

//Usage:

ConfigManager.get(
    "application.baseUrl"
);


ConfigManager.get(
    "timeout.default"
);


ConfigManager.isEnabled(
    "reporting.video"
);
*/

//ASSERTIONS USAGE
//Example UI Test Usage - UIAssertions.js
await UiAssertions.visible(
    loginPage.username
);

await UiAssertions.textEquals(
    dashboard.title,
    "Dashboard"
);
//Example API Test Usage - APIAssertions.js
const response =
    await api.get("/users");


ApiAssertions.status(
    response,
    200
);


const body =
    await response.json();


ApiAssertions.containsField(
    body,
    "username"
);

//LISTNERS USAGE
/*Usage with Fixture

Later inside:

fixtures/
    testFixture.js

we connect:

test.beforeEach(async ({}, testInfo)=>{

    await TestListener.beforeTest(
        testInfo
    );

});


test.afterEach(async ({page}, testInfo)=>{

    await TestListener.afterTest(
        page,
        testInfo
    );

});
Example Execution Flow
PASS
Test Started

Login Test

    Login User
    Verify Dashboard

PASSED

Logs saved
FAIL
Login Test FAILED

Artifacts:

allure-results

    screenshot.png
    video.webm
    error.json

AutomationResults

    Logs
    Screenshots
    Videos
*/

//RETRY USAGE
/*RetryManager should not duplicate Playwright test retries:

retries: 2

Playwright already handles failed test retry.

Our RetryManager is for operation-level retries:

Examples:

Retry flaky API calls
Retry database checks
Retry external services
Retry file downloads
Retry async validations
Poll until condition is true*/

//Example 1 — Retry API Call - RetryManager.js
const response =
    await RetryManager.retry(

        async () => {

            return await apiClient.get(
                "/users"
            );

        },

        {
            name: "Get Users API",
            attempts: 5,
            delay: 2000
        }

    );

/*Output:

Get Users API - Attempt 1/5

Get Users API failed attempt 1

Get Users API - Attempt 2/5*/

//Success
//Example 2 — Wait Until Condition - RetryManager.js
await RetryManager.until(

    async ()=>{

        const status =
            await order.getStatus();


        return status === "COMPLETED";

    },

    {
        name:"Order Completion",
        timeout:60000,
        interval:5000
    }

);
//Example 3 — Retry Database Check - RetryManager.js
const user =
await RetryManager.retryUntilResult(

    async ()=>{

        return db.findUser(
            "john"
        );

    },


    result =>
        result !== null,


    {
        attempts:10,
        delay:3000
    }

);


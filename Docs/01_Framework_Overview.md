#   Enterprise Automation Framework

# 01 - Framework Overview


## Introduction

  Enterprise Automation Framework is a scalable test automation framework designed for modern enterprise applications.

The framework is built using:

- Playwright Test
- JavaScript ES Modules
- Node.js
- Allure Reporting


It provides a structured automation solution similar to large enterprise Selenium frameworks while taking advantage of Playwright's speed and reliability.


The framework supports:

- UI Automation
- API Automation
- Multi Browser Execution
- Multi Environment Testing
- Data Driven Testing
- Enterprise Reporting
- Screenshot and Video Evidence
- Retry Handling
- Self Healing Locators


---


# Framework Objective


The main objective of this framework is:


```
Write Simple Tests

        +

Centralize Complexity

        +

Increase Maintainability
```


Test developers should focus on:

- Business scenarios
- Test data
- Assertions


Framework handles:

- Browser management
- Locator handling
- Reporting
- Screenshots
- Logs
- Test lifecycle
- Healing failures


---


# Framework Design Principle


## Direct Playwright usage is avoided


Not Recommended:


```javascript
await page.locator("#username")
          .fill("admin");
```


Reason:

- Duplicate locators
- No centralized logging
- No reporting control
- No self healing


---


Recommended Framework Approach:


```javascript
this.username =
    new WebTextBox(

        page,

        "#username",

        "LoginPage.username"

    );


await this.username.enterText("admin");
```


Benefits:

- Common action handling
- Logging
- Reporting
- Screenshots
- Healing support


---


# High Level Architecture


```
Test Script


     |


Page Object


     |


Reusable Web Elements


     |


BaseElement


     |


Playwright Engine


     |


Browser/Application
```


---


# Framework Layers


## 1. Test Layer


Location:


```
Projects/

 project-name/

        tests/
```


Example:


```
tests/

 ui/

    login.test.js


 api/

    user-api.test.js
```


Responsibilities:


- Define test scenarios
- Call page actions
- Perform validations


Example:


```javascript
await loginPage.login(

    username,

    password

);
```


---


# 2. Page Object Layer


Location:


```
Projects/

 project-name/

        pages/
```


Responsibilities:


- Store page elements
- Maintain business actions
- Hide locator details


Example:


```javascript
export class LoginPage{


constructor(page){


this.username =
    new WebTextBox(

        page,

        "#username",

        "LoginPage.username"

    );

}


async login(user){

    await this.username.enterText(user);

}

}
```


---


# 3. Element Layer


Location:


```
framework/

 elements/
```


Available Components:


```
WebTextBox

WebButton

WebDropdown

WebTable

WebCalendar

WebFileUpload

WebGrid

WebTree
```


Purpose:


Provide reusable browser controls.


Example:


```javascript
await textbox.enterText("admin");


await button.click();
```


---


# 4. Core Layer


Location:


```
framework/

 core/
```


Components:


## BaseElement.js


Responsible for:


- Click handling
- Typing
- Waiting
- Assertions
- Screenshots
- Self Healing trigger


---


## BasePage.js


Responsible for:


- Page level actions
- Navigation
- Common browser operations


---


## PageManager.js


Responsible for:


- Page object creation
- Object reuse
- Central page access


---


# 5. Configuration Layer


Location:


```
framework/

 configuration/
```


Handles:


- Environment selection
- Browser configuration
- URLs
- Runtime settings


Example:


Command:


```
--env=qa
```


Loads:


```
configuration/

 qa.json
```


---


# 6. Test Data Layer


Location:


```
framework/data
```


Supports:


- JSON
- CSV
- Excel


Project data:


```
Projects/

 knowledgeware/

      test-data/

          qa/

          uat/
```


Example:


```javascript
testData.get(

    "ui/login",

    "TC_LOGIN_001"

);
```


---


# 7. Reporting Layer


Location:


```
framework/

 reporting/
```


Integrated with:


Allure Report


Provides:


- Test steps
- Screenshots
- Videos
- Environment details
- Executor details
- Categories
- History trends


---


# 8. Self Healing Layer


Location:


```
framework/

 selfhealing/
```


Components:


```
SelfHealingEngine.js

LocatorRepository.js

LocatorSnapshotManager.js

SimilarityMatcher.js

HealingResult.js
```


---


# Self Healing Flow


```
Element Action


      |


BaseElement


      |


Try Original Locator


      |


Locator Failed


      |


SelfHealingEngine


      |


Find Alternative Locator


      |


Continue Execution
```


---


# Healing Strategies


Priority:


```
1. Original Locator


2. Previous Successful Locator


3. Attribute Matching


4. Similarity Matching


5. XPath Recovery
```


---


# Locator Storage


Generated automatically:


```
Projects/

 knowledgeware/

      self-healing/

            locator-store.json
```


Example:


```json
{
    "LoginPage.username": {


        "primary":

        "#username",


        "successfulLocator":

        "input[name=username]"

    }
}
```


---


# Execution Lifecycle


Complete execution flow:


```
npm command


      |


TestRunner.js


      |


Create Result Directory


      |


Set Runtime Variables


      |


Playwright Execution


      |


global-setup.js


      |


Test Execution


      |


TestListener


      |


Allure Results


      |


global-teardown.js


      |


Generate Report


      |


Save History
```


---


# Runtime Command


Example:


```
npm run test -- \
--project=knowledgeware \
--env=qa \
--browser=chromium \
--type=ui
```


---


# Runtime Output


Generated:


```
AutomationResults/


    Allure/


        qa/


          ui/


            timestamp/


                allure-results/


                allure-report/


                Screenshots/


                Videos/


                Logs/
```


---


# Framework Advantages


## Maintainability


Common code exists once inside framework.


---


## Scalability


Multiple applications can use same framework.


Example:


```
Projects/


    banking/


    ecommerce/


    knowledgeware/
```


---


## Reliability


Provided by:


- Smart waits
- Retry logic
- Self healing
- Screenshots
- Traces


---


## Enterprise Reporting


Management friendly reports:


- Pass percentage
- Failure analysis
- Trends
- Execution history


---


# Summary


  Enterprise Automation Framework provides:


✔ Clean test design

✔ Reusable components

✔ Centralized configuration

✔ Enterprise reporting

✔ Self healing automation

✔ Multi project support


The goal is:


```
Less Maintenance

More Automation Stability
```


---

Author:

Mahesh Upadhyay

  Enterprise Automation Framework
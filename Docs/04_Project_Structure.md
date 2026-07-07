#  Enterprise Automation Framework

# 04 - Project Structure Guide


## Introduction

 Enterprise Automation Framework supports a multi-project architecture.

A single framework installation can automate multiple applications without duplicating framework code.


Example:

```
EnterpriseAutomationFramework


      |


      +---- Projects


                |


                +---- banking


                +---- ecommerce


                +---- crm
```


Each project contains only:

- Application pages
- Test scripts
- Test data
- Project configuration


The common automation engine remains inside:

```
framework/
```


---


# Framework vs Project Separation


## Framework Layer


Location:


```
framework/
```


Contains reusable automation components.


Examples:


```
core/

elements/

configuration/

reporting/

selfhealing/

data/

listeners/
```


Framework is shared by all projects.


---


## Project Layer


Location:


```
Projects/
```


Contains application specific automation.


Example:


```
Projects/

    knowledgeware/
```


Contains:


- Page Objects
- Test Cases
- Test Data
- Environment Files
- Project Configuration


---


# Complete Project Structure


Example:


```
Projects/


└── knowledgeware/


        │

        ├── pages/


        │       ├── LoginPage.js


        │       ├── DashboardPage.js


        │       └── UserPage.js


        │


        ├── tests/


        │       │


        │       ├── ui/


        │       │


        │       │     └── login.test.js


        │       │


        │       └── api/


        │


        │             └── user-api.test.js


        │


        ├── test-data/


        │


        │       ├── qa/


        │       │


        │       │     ├── ui/


        │       │     │


        │       │     │    └── login.json


        │       │     │


        │       │     └── api/


        │       │


        │       │          └── user.json


        │       │


        │       └── uat/


        │


        │             ├── ui/


        │             └── api/


        │


        ├── self-healing/


        │


        │       └── locator-store.json


        │


        ├── AutomationResults/


        │


        ├── playwright.config.js


        ├── global-setup.js


        └── global-teardown.js
```


---


# 1. Pages Folder


Location:


```
Projects/

 project-name/

      pages/
```


Purpose:


Store Page Object classes.


Example:


```
pages/


    LoginPage.js


    DashboardPage.js
```


---


# Page Object Rules


Pages should contain:


✔ Elements

✔ Business methods


Pages should NOT contain:


❌ Assertions logic

❌ Reporting logic

❌ Browser management


---


# Page Object Example


```javascript
import { WebTextBox }
from "../../../framework/ui/WebTextBox.js";


import { WebButton }
from "../../../framework/ui/WebButton.js";



export class LoginPage{


constructor(page){


this.username =
    new WebTextBox(

        page,

        "#username",

        "LoginPage.username"

    );



this.loginButton =
    new WebButton(

        page,

        "#login",

        "LoginPage.loginButton"

    );

}



async login(username){


    await this.username.enterText(

        username

    );


    await this.loginButton.click();

}


}
```


---


# 2. Tests Folder


Location:


```
Projects/

 project-name/

      tests/
```


Contains automation scripts.


Structure:


```
tests/


    ui/


    api/
```


---


# UI Tests


Example:


```
tests/ui/login.test.js
```


Purpose:


Validate browser scenarios.


Example:


```javascript
test(

"Verify login",

async ({pageManager})=>{


    await pageManager

        .loginPage()

        .login();


});
```


---


# API Tests


Location:


```
tests/api/
```


Example:


```
user-api.test.js
```


Used for:


- REST validation
- Backend testing
- Contract checks


---


# 3. Test Data Folder


Location:


```
test-data/
```


Supports environment based data.


Structure:


```
test-data/


    qa/


        ui/


        api/


    uat/


        ui/


        api/
```


---


# JSON Test Data Example


File:


```
qa/ui/login.json
```


Example:


```json
{
    "TC_LOGIN_001": {


        "username":

        "admin",


        "password":

        "admin123"

    }
}
```


---


# Access Test Data


Example:


```javascript
const data =

testData.get(

    "ui/login",

    "TC_LOGIN_001"

);
```


Framework automatically loads:


```
project + environment + file
```


---


# 4. Project Configuration


Each project contains:


```
playwright.config.js
```


Purpose:


Manage:


- Browser settings
- Timeout
- Report configuration
- Artifacts
- Project execution


---


# 5. Global Setup


File:


```
global-setup.js
```


Runs before tests.


Responsibilities:


- Load configuration
- Initialize test data
- Prepare reporting
- Restore history


---


# 6. Global Teardown


File:


```
global-teardown.js
```


Runs after tests.


Responsibilities:


- Generate report
- Save history
- Cleanup execution


---


# 7. Self Healing Folder


Generated automatically:


```
self-healing/


    locator-store.json
```


Stores successful locator history.


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


Do not manually update this file.


---


# 8. Automation Results Folder


Generated after execution.


Structure:


```
AutomationResults/


    Allure/


        qa/


          ui/


            timestamp/


                allure-results


                allure-report


                Screenshots


                Videos


                Logs
```


---


# Adding New Project


Example:


Need to automate:


```
Banking Application
```


Create:


```
Projects/


    banking/
```


Add:


```
banking/


    pages/


    tests/


    test-data/


    playwright.config.js
```


No framework changes required.


---


# Execute New Project


Example:


```bash
npm run test -- \
--project=banking \
--env=qa \
--browser=chromium \
--type=ui
```


Framework automatically uses:


```
Projects/banking
```


---


# Multiple Project Example


Same framework:


```
EnterpriseAutomationFramework


    framework/


    Projects/


        banking/


        ecommerce/


        insurance/


        crm/
```


Each project:


- Independent execution

- Independent reports

- Independent data

- Independent healing storage


---


# Project Isolation Benefits


## Separate Teams


Different teams can work independently.


---


## Common Framework


Bug fix once:


```
framework/BaseElement.js
```


Available everywhere.


---


## Easier Maintenance


Application changes affect only:


```
Projects/application
```


---


# Recommended Naming Standards


## Page Classes


Use:


```
LoginPage.js

HomePage.js

SearchPage.js
```


---


# Test Files


Use:


```
feature-name.test.js
```


Examples:


```
login.test.js

fund-transfer.test.js

checkout.test.js
```


---


# Locator Naming


Use:


```javascript
"PageName.elementName"
```


Example:


```javascript
"LoginPage.usernameTextbox"
```


Benefits:


- Better logs
- Better reports
- Self healing tracking


---


# Summary


Project structure provides:


✔ Multi application support

✔ Clean separation

✔ Easy onboarding

✔ Shared framework

✔ Independent execution

✔ Independent reporting

✔ Enterprise scalability


---


Author:

Mahesh Upadhyay

 Enterprise Automation Framework
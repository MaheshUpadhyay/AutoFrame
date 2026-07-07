#  Enterprise Automation Framework

# 11 - Add New Project Guide


## Introduction

 Enterprise Automation Framework supports multiple applications using a single reusable framework.

A new application can be automated without modifying the framework layer.


Example:


One framework:


```
EnterpriseAutomationFramework


        |

        +--- framework


        |

        +--- Projects


                |

                +--- banking


                |

                +--- ecommerce


                |

                +--- crm
```


Each project is independent.


---


# Objective


When adding a new project:


Create only:


```
Projects/

    new-project-name/
```


Do NOT modify:


```
framework/
```


Framework automatically provides:


- Browser handling
- Elements
- Reporting
- Test Data
- Screenshots
- Videos
- Self Healing


---


# New Project Creation Steps


Example application:


```
Banking Application
```


Project name:


```
banking
```


Create:


```
Projects/

    banking/
```


---


# Step 1 - Create Project Folder


Structure:


```
Projects/


└── banking/


        ├── pages/


        ├── tests/


        ├── test-data/


        ├── playwright.config.js


        ├── global-setup.js


        └── global-teardown.js
```


---


# Step 2 - Create Pages Folder


Location:


```
Projects/

 banking/

      pages/
```


Example:


```
pages/


    LoginPage.js


    DashboardPage.js
```


---


# Create Login Page


Example:


```javascript
import { WebTextBox }

from "../../../framework/ui/WebTextBox.js";


import { WebButton }

from "../../../framework/ui/WebButton.js";



export class LoginPage{


constructor(page){


this.usernameTextbox =

new WebTextBox(

    page,

    "#username",

    "LoginPage.usernameTextbox"

);



this.passwordTextbox =

new WebTextBox(

    page,

    "#password",

    "LoginPage.passwordTextbox"

);



this.loginButton =

new WebButton(

    page,

    "#login",

    "LoginPage.loginButton"

);

}



async login(
username,
password
){


await this.usernameTextbox

    .enterText(username);



await this.passwordTextbox

    .enterText(password);



await this.loginButton

    .click();

}


}
```


---


# Step 3 - Register Page Object


Update:


```
framework/core/PageManager.js
```


Add import:


```javascript
import { LoginPage }

from "../../Projects/banking/pages/LoginPage.js";
```


Add getter:


```javascript
get loginPage(){


if(!this.pages.loginPage){


this.pages.loginPage =

new LoginPage(

this.page

);

}


return this.pages.loginPage;

}
```


Now tests can access:


```javascript
pageManager.loginPage
```


---


# Step 4 - Create Tests Folder


Location:


```
Projects/

 banking/

      tests/
```


Structure:


```
tests/


    ui/


    api/
```


---


# Create UI Test


File:


```
tests/ui/login.test.js
```


Example:


```javascript
import { test }

from "@playwright/test";



test(

"Verify user login",

async({

pageManager,

testData

})=>{


const data =

testData.get(

"ui/login",

"TC_LOGIN_001"

);



await pageManager

.loginPage

.login(

data.username,

data.password

);


});
```


---


# Step 5 - Create Test Data


Location:


```
Projects/

 banking/

      test-data/
```


Create:


```
test-data/


    qa/


        ui/


          login.json


    uat/


        ui/


          login.json
```


---


# QA Test Data


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


# Step 6 - Add Configuration


Create:


```
Projects/

 banking/

      playwright.config.js
```


Responsibilities:


- Browser settings
- Report settings
- Timeouts
- Test folders


---


# Step 7 - Add Global Setup


Create:


```
global-setup.js
```


Executed before tests.


Handles:


- Configuration loading
- Test data initialization
- Allure setup
- History restore


---


# Step 8 - Add Global Teardown


Create:


```
global-teardown.js
```


Executed after tests.


Handles:


- Report generation
- History saving


---


# Step 9 - Execute New Project


Command:


```bash
npm run test -- --project=banking --env=qa --browser=chromium --type=ui
```


Framework resolves:


```
Projects/banking
```


automatically.


---


# Step 10 - Verify Result Folder


Generated:


```
Projects/


 banking/


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


# Step 11 - Open Report


Command:


```bash
npm run allure -- --project=banking --env=qa --type=ui
```


---


# Step 12 - Verify Self Healing


After first successful run:


Generated:


```
Projects/


 banking/


    self-healing/


        locator-store.json
```


Example:


```json
{
    "LoginPage.usernameTextbox": {


        "primary":

        "#username",


        "successfulLocator":

        "#username"

    }
}
```


---


# Adding Multiple Projects


Example:


```
Projects/


    banking/


    insurance/


    ecommerce/


    healthcare/
```


Same framework supports all.


---


# What Should Be Inside Project?


Allowed:


✔ Pages


✔ Tests


✔ Test Data


✔ Environment files


---


Not Allowed:


❌ Browser handling


❌ Reporting logic


❌ Screenshot logic


❌ Self healing code


Framework already handles these.


---


# Recommended Naming Standards


Project:


```
lowercase-name
```


Examples:


```
banking

crm

ecommerce
```


---


Pages:


```
LoginPage.js

DashboardPage.js
```


---


Tests:


```
login.test.js

payment.test.js
```


---


Element Names:


Format:


```
PageName.elementName
```


Example:


```javascript
"LoginPage.usernameTextbox"
```


---


# New Project Checklist


Before execution verify:


✔ Project folder created


✔ Pages created


✔ Tests added


✔ Test data available


✔ Config files available


✔ PageManager updated


✔ npm install completed


✔ Browsers installed


---


# Complete Flow


```
Create Project


       |


Create Pages


       |


Create Tests


       |


Add Test Data


       |


Execute Command


       |


Review Report

```


---


# Summary


Adding a new project provides:


✔ Zero framework changes


✔ Independent application testing


✔ Separate reports


✔ Separate data


✔ Separate healing repository


✔ Enterprise scalability


---

Author:

Mahesh Upadhyay

 Enterprise Automation Framework
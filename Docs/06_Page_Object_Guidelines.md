#  Enterprise Automation Framework

# 06 - Page Object Guidelines


## Introduction

This document explains the standards and best practices for creating Page Objects inside the  Enterprise Automation Framework.

The framework follows an enterprise Page Object Model design.

Page Objects act as a bridge between:

```
Test Cases

     |

Page Objects

     |

Framework Elements

     |

BaseElement

     |

Playwright
```


The goal is:

- Keep tests clean
- Remove duplicate locators
- Improve maintenance
- Enable self healing


---


# Page Object Location


All application pages should be created inside:


```
Projects/


    project-name/


        pages/
```


Example:


```
Projects/


    knowledgeware/


        pages/


            LoginPage.js


            DashboardPage.js
```


---


# Page Class Naming Standard


Use meaningful page names.


Recommended:


```
LoginPage.js

DashboardPage.js

UserProfilePage.js

PaymentPage.js
```


Avoid:


```
login.js

testpage.js

page1.js
```


---


# Page Class Structure


Standard template:


```javascript
/**
 * Login Page
 *
 * Contains:
 *
 * - Elements
 * - Business actions
 */


export class LoginPage{


    constructor(page){


        this.page =
            page;


        /*
         * Element declarations
         */


    }



    /*
     * Business methods
     */


}
```


---


# Import Framework Elements


Do not import Playwright locators directly.


Example:


```javascript
import { WebTextBox }

from "../../../framework/ui/WebTextBox.js";


import { WebButton }

from "../../../framework/ui/WebButton.js";
```


---


# Element Declaration Standard


Always use framework components.


Example:


```javascript
this.usernameTextbox =
    new WebTextBox(

        page,

        "input[name='username']",

        "LoginPage.usernameTextbox"

    );
```


---


# Element Constructor Format


All elements follow:


```javascript
new ElementType(

    page,

    locator,

    elementName

)
```


Example:


```javascript
new WebButton(

    page,

    "#login",

    "LoginPage.loginButton"

);
```


---


# Why Element Name Is Important


Element name:


```javascript
"LoginPage.usernameTextbox"
```


is used for:


- Logging
- Reporting
- Screenshots
- Self Healing Engine


Example:


Allure:


```
Enter text into LoginPage.usernameTextbox
```


Self healing:


```
locator-store.json


{

 "LoginPage.usernameTextbox":{


 }

}
```


---


# Avoid Direct Playwright Usage


Do NOT use:


```javascript
this.username =

    page.locator("#username");
```


Avoid:


```javascript
await page.click("#login");
```


Because it skips:


- Logging
- Screenshots
- Reporting
- Healing


---


# Correct Usage


Declare:


```javascript
this.username =

    new WebTextBox(

        page,

        "#username",

        "LoginPage.username"

    );
```


Use:


```javascript
await this.username.enterText(

    "admin"

);
```


---


# Supported UI Components


Available:


```
WebTextBox

WebButton

WebCheckBox

WebRadioButton

WebDropdown

WebTable

WebGrid

WebTree

WebCalendar

WebFileUpload

WebImage

WebLink

WebModal

WebToast

WebFrame

WebPagination

WebSlider

WebTab
```


---


# Business Method Guidelines


Page methods should represent user actions.


Good:


```javascript
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
```


---


Avoid:


```javascript
async clickButton(){

}


async enterText(){

}
```


Reason:


Methods should describe business flow.


---


# Test Case Usage


Test should look simple:


```javascript
test(

"Verify login",

async ({pageManager})=>{


    await pageManager

        .loginPage()

        .login(

            username,

            password

        );

});
```


No locators in tests.


---


# Page Object Responsibility


Allowed:


✔ Elements

✔ Business workflows

✔ Page validations


---


Not Allowed:


❌ Browser creation

❌ Report generation

❌ Test data loading

❌ Hard waits


---


# Wait Handling


Do not use:


```javascript
await page.waitForTimeout(5000);
```


Framework handles waits:


Example:


```javascript
await button.click();
```


Internally:


```
WebButton


   |


BaseElement


   |


Auto Wait

```


---


# Assertion Guidelines


Avoid:


```javascript
expect(

page.locator("#msg")

).toBeVisible();
```


Prefer framework assertion methods:


Example:


```javascript
await messageLabel

    .shouldBeVisible();
```


Benefits:


- Better logging
- Screenshots
- Reports


---


# Locator Guidelines


Use stable locators.


Priority:


## 1. Test Attributes


Recommended:


```html
data-testid="login-button"
```


Usage:


```javascript
"[data-testid='login-button']"
```


---


## 2. ID


Good:


```javascript
"#username"
```


---


## 3. Name Attribute


Good:


```javascript
"input[name='username']"
```


---


## 4. CSS


Allowed:


```javascript
".login-button"
```


---


Avoid:


Absolute XPath:


```xpath
/html/body/div[2]/div/input
```


---


# Self Healing Friendly Naming


Always use:


Format:


```
PageName.elementName
```


Examples:


Correct:


```
LoginPage.usernameTextbox

LoginPage.passwordTextbox

DashboardPage.profileIcon
```


Incorrect:


```
username

button1

textbox
```


---


# Self Healing Lifecycle


First successful execution:


```
Element Works


      |


Capture Locator


      |


locator-store.json

```


Future failure:


```
Locator Failed


      |


SelfHealingEngine


      |


Recover


      |


Continue Test
```


---


# Example Generated Snapshot


```json
{
    "LoginPage.usernameTextbox":{


        "primary":

        "#username",


        "successfulLocator":

        "#username",


        "attributes":{


            "id":"username",

            "name":"username"

        }
    }
}
```


---


# Step Logging In Pages


For important business actions:


Use:


```javascript
await StepLogger.step(

"Login into application",

async()=>{


    await this.loginButton.click();


});
```


This creates:


```
Allure Step
```


---


# Recommended Page Template


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


this.password =
    new WebTextBox(

        page,

        "#password",

        "LoginPage.password"

    );


}



async login(
    user,
    pass
){


await this.username.enterText(user);


await this.password.enterText(pass);


}


}
```


---


# Review Checklist Before Commit


Verify:


✔ No page.locator in tests


✔ All elements use framework classes


✔ Element names follow Page.Element format


✔ No hard waits


✔ No duplicated locators


✔ Business methods are meaningful


✔ Self healing names are unique


---


# Summary


Following these guidelines provides:


✔ Clean tests

✔ Better reporting

✔ Stable automation

✔ Easy maintenance

✔ Self healing support

✔ Enterprise scalability


---

Author:

Mahesh Upadhyay

 Enterprise Automation Framework
#  Enterprise Automation Framework

# 12 - Framework Extension Guide


## Introduction

This document explains how developers can safely extend the  Enterprise Automation Framework.

The framework is designed with reusable layers.

New capabilities should be added by extending existing framework modules instead of changing test code.


Goal:

```
Extend Framework Capability

          +

Maintain Backward Compatibility

          +

Avoid Breaking Existing Tests
```


---


# Framework Extension Rules


Before modifying framework:


Always follow:


✔ Keep existing public methods

✔ Maintain backward compatibility

✔ Follow ES Modules

✔ Add reusable components

✔ Keep project code separated

✔ Add documentation


Never:


❌ Remove existing APIs

❌ Add application logic into framework

❌ Add project-specific code

❌ Use CommonJS require/module.exports


---


# Framework Layer Overview


```
framework/


    core/


    ui/


    reporting/


    data/


    configuration/


    selfhealing/


    listeners/


    retry/


    utilities/
```


Each layer has a specific responsibility.


---


# 1. Adding New UI Element


All UI components extend:


```
BaseElement.js
```


Flow:


```
New Component


      |


BaseElement


      |


Playwright Locator
```


---


# Example Requirement


Add:


```
WebSearchBox.js
```


Create:


```
framework/ui/

      WebSearchBox.js
```


---


# Component Template


```javascript
import { BaseElement }

from "../core/BaseElement.js";



/**
 * WebSearchBox component
 *
 * @author Mahesh Upadhyay
 */


export class WebSearchBox

extends BaseElement{


constructor(
page,
selector,
description
){


super(

page,

selector,

description

);


}



async search(value){


await this.enterText(

value

);


await this.press(

"Enter"

);


}


}
```


---


# Benefits Automatically Available


Because it extends BaseElement:


It gets:


✔ Logging


✔ Wait Handling


✔ Screenshots


✔ Allure Steps


✔ Self Healing


---


# 2. Extending BaseElement


Location:


```
framework/core/

    BaseElement.js
```


BaseElement controls:


- Actions
- Assertions
- States
- Information methods


---


# Adding New Common Method


Example:


Need:


```
highlight()
```


Add:


```javascript
async highlight(){


const element =

await this.getLocator();


await element.evaluate(

element => {


element.style.border =

"2px solid red";


});

}
```


Now available:


```
WebButton

WebTextBox

WebDropdown

All Elements
```


---


# Important Rule


Before modifying BaseElement:


Check impact:


```
One change

      |

All UI Elements

      |

All Projects
```


Test carefully.


---


# 3. Adding New Data Provider


Current support:


```
JSON

CSV

Excel
```


Architecture:


```
TestDataManager


        |


Data Loader
```


---


# Example:


Add:


```
YamlDataLoader.js
```


Create:


```
framework/data/

YamlDataLoader.js
```


---


# Loader Template


```javascript
export class YamlDataLoader{


static load(filePath){


    //read yaml


    return data;


}


}
```


---


Register inside:


```
TestDataManager.js
```


Flow:


```
extension detected


       |


correct loader


       |


return data
```


---


# 4. Extending Reporting


Location:


```
framework/reporting/
```


Existing:


```
ReportManager

StepLogger

AttachmentManager

EnvironmentWriter

HistoryManager
```


---


# Add New Attachment Type


Example:


Need:


```
Network logs
```


Create:


```
NetworkAttachmentManager.js
```


Example:


```javascript
export class NetworkAttachmentManager{


static async attach(log){


    await allure.attachment(

        "Network Logs",

        log,

        "text/plain"

    );


}


}
```


---


# Reporting Rule


Tests should not directly call:


```javascript
allure.*
```


Always use:


```
ReportManager
```


or framework reporting utilities.


---


# 5. Extending Self Healing


Location:


```
framework/selfhealing/
```


Current:


```
SelfHealingEngine

LocatorRepository

LocatorSnapshotManager

SimilarityMatcher

HealingResult
```


---


# Add New Healing Strategy


Example:


Add AI based recovery:


Create:


```
AIHealingStrategy.js
```


Flow:


```
Locator Failed


      |


SelfHealingEngine


      |


Existing Strategies


      |


AI Strategy


      |


Recovered Locator
```


---


# Strategy Template


```javascript
export class AIHealingStrategy{


static async heal(context){


    return result;


}


}
```


Register inside:


```
SelfHealingEngine.js
```


---


# 6. Adding Utilities


Location:


```
framework/utilities/
```


Examples:


```
DateUtil.js

StringUtil.js

FileUtil.js

EncryptionUtil.js
```


---


# Utility Rules


Use static classes:


Example:


```javascript
export class DateUtil{


static currentDate(){


return new Date();


}


}
```


Usage:


```javascript
DateUtil.currentDate();
```


---


# 7. Adding Configuration


Location:


```
framework/configuration/
```


Configuration should be:


Environment based.


Example:


```
qa.json


uat.json


prod.json
```


Access only through:


```javascript
ConfigManager.get(

"key"

);
```


Avoid:


```javascript
process.env.VALUE
```


everywhere.


---


# 8. Adding Listeners


Location:


```
framework/listeners/
```


Current:


```
TestListener.js
```


Responsible:


- Before test
- After test
- Evidence collection


---


# Add Listener Feature


Example:


Need:


```
Slack notification
```


Create:


```
NotificationListener.js
```


Flow:


```
Execution Complete


        |


Listener


        |


Notification
```


---


# 9. Adding Retry Logic


Location:


```
framework/retry/
```


Component:


```
RetryManager.js
```


Extend for:


- Network retry
- API retry
- Browser retry


---


# 10. Adding New Project Support


Do not modify framework.


Create:


```
Projects/


    new-project/
```


Framework automatically supports:


- Reports

- Data

- Execution

- Healing


---


# Coding Standards


All files must use:


ES Modules:


Correct:


```javascript
export class Logger{


}
```


Import:


```javascript
import { Logger }

from "./Logger.js";
```


---


Incorrect:


```javascript
module.exports


require()
```


---


# Class Standards


Use:


```javascript
class

static managers

private methods

JSDoc
```


---


# Documentation Standard


Every framework class:


```javascript
/**
 *
 * Purpose:
 *
 * Author:
 *
 * Usage:
 *
 */
```


---


# Version Upgrade Rules


Before upgrading:


Examples:


```
Playwright

Allure

Node
```


Steps:


```
Upgrade Package


      |


Run Regression


      |


Validate Reports


      |


Validate Healing

```


---


# Pull Request Checklist


Before merging:


✔ Existing tests pass


✔ No API removed


✔ Documentation updated


✔ Reports validated


✔ Self healing validated


✔ Multi browser checked


---


# Framework Development Principles


Remember:


```
Framework owns complexity


Tests remain simple
```


Developers should write:


```javascript
await loginPage.login();
```


Not:


```javascript
wait

retry

screenshot

locator recovery
```


---


# Summary


Framework extension supports:


✔ New UI components

✔ New reports

✔ New data providers

✔ New healing strategies

✔ New utilities

✔ New integrations


Without breaking:


✔ Existing tests

✔ Existing projects

✔ Existing users


---

Author:

Mahesh Upadhyay

Enterprise Automation Framework
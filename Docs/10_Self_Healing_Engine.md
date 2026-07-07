#  Enterprise Automation Framework

# 10 - Self Healing Engine Guide


## Introduction

The Self Healing Engine is an intelligent locator recovery mechanism built inside the  Enterprise Automation Framework.

Its purpose is to reduce automation failures caused by minor UI locator changes.


Example:


Previously working locator:


```javascript
input[name='username']
```


Application changes:


```html
<input id="userName">
```


Traditional automation:


```
Locator Failed

      |

Test Failed
```


Self Healing Framework:


```
Locator Failed

      |

Find Alternative Locator

      |

Continue Execution

      |

Report Healing Details
```


---


# Why Self Healing?


Common automation failures:


- ID changed
- Name changed
- CSS updated
- Placeholder modified
- Minor DOM changes


Example:


Before:


```html
<input id="username">
```


After:


```html
<input id="user_name">
```


Self Healing Engine attempts recovery automatically.


---


# Self Healing Architecture


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


# High Level Flow


```
Test Execution


      |


Web Element


      |


BaseElement


      |


Try Primary Locator


      |


Success / Failure


      |

----------------------

|                    |

Success              Failure


|                    |


Capture              Self Healing

Snapshot             Engine


|                    |


Store                Recover


Locator              Locator

```


---


# Component Responsibilities


## SelfHealingEngine.js


Main controller.


Responsibilities:


- Start healing process
- Coordinate recovery strategies
- Return healed locator
- Trigger reporting


Flow:


```
BaseElement


      |


SelfHealingEngine


      |


LocatorRepository


      |


SimilarityMatcher
```


---


# LocatorSnapshotManager.js


Responsible for learning.


Whenever locator works successfully:


```
Successful Element Action


        |


Capture Metadata


        |


Store Snapshot
```


Captured information:


- Primary locator
- Successful locator
- Element tag
- ID
- Name
- Placeholder
- Text
- Attributes


---


# Example Snapshot


```json
{
    "LoginPage.usernameTextbox": {


        "primary":

        "input[name='username']",


        "successfulLocator":

        "input[name='username']",


        "attributes":{


            "tag":"input",

            "name":"username",

            "placeholder":"Enter Username"

        }

    }
}
```


---


# LocatorRepository.js


Storage manager.


Responsible for:


- Creating locator store
- Reading snapshots
- Updating healed locators
- Saving history


Storage location:


```
Projects/


 knowledgeware/


      self-healing/


            locator-store.json
```


---


# Environment Independent Design


Locator repository is stored:


Project wise:


```
Projects/project-name/self-healing
```


Not:


```
qa/

uat/
```


Reason:


Same application locators normally remain common across environments.


---


# SimilarityMatcher.js


Responsible for comparing elements.


Example:


Old:


```json
{
"id":"username",
"name":"username"
}
```


New:


```json
{
"id":"user_name",
"name":"loginUser"
}
```


Calculates similarity score.


Example:


```
Similarity : 85%
```


If confidence is acceptable:


```
Locator Healed
```


---


# HealingResult.js


Standard response object.


Example:


```json
{
    "healed":true,


    "oldLocator":

    "#username",


    "newLocator":

    "input[name='username']",


    "strategy":

    "ATTRIBUTE_MATCH"

}
```


---


# Healing Priority Order


The framework follows:


```
1

Original Locator


        |


2

Previous Successful Locator


        |


3

Attribute Matching


        |


4

Similarity Matching


        |


5

XPath Recovery
```


---


# Phase 1 - Original Locator


Example:


```javascript
#username
```


Framework checks:


```
Does element exist?
```


YES:


```
Continue Test
```


NO:


```
Start Healing
```


---


# Phase 2 - Previous Successful Locator


Reads:


```
locator-store.json
```


Example:


Primary failed:


```javascript
#user
```


Repository:


```javascript
input[name='username']
```


Framework retries:


```javascript
page.locator(
 "input[name='username']"
)
```


---


# Phase 3 - Attribute Healing


Uses stored attributes:


```json
{
"id":"username",

"name":"username",

"placeholder":"Enter Username"
}
```


Generates possible locators:


```javascript
#username


input[name='username']


[placeholder='Enter Username']
```


---


# Phase 4 - Similarity Matching


DOM scanning:


```
Current Page Elements


          |


Compare Attributes


          |


Calculate Score
```


Example:


```
90% Match

Recovered
```


---


# Phase 5 - XPath Recovery


Fallback strategy.


Example:


Generated:


```xpath
//input[contains(@name,'username')]
```


---


# BaseElement Integration


Self Healing is triggered automatically.


Flow:


```
click()

fill()

getText()


     |


getLocator()


     |


SelfHealingEngine
```


Tests do not change.


---


# Page Object Example


Normal page:


```javascript
this.username =

new WebTextBox(

    page,

    "input[name='username']",

    "LoginPage.username"

);
```


No healing code required.


---


# First Execution Flow


Successful run:


```
Execute Test


      |


Element Found


      |


Capture Snapshot


      |


Create locator-store.json
```


---


# Future Execution Flow


Locator changed:


```
Execute Test


      |


Locator Failed


      |


Self Healing


      |


Recovered


      |


Update Repository
```


---


# Example Recovery


Before:


```javascript
this.username =

"input[name='wrong']"
```


Repository:


```json
{
"successfulLocator":

"input[name='name']"
}
```


Execution:


```
input[name='wrong']

FAILED


input[name='name']

PASSED
```


---


# Allure Integration


Healing information appears in report.


Example:


```
SELF HEALED


Element:

LoginPage.usernameTextbox


Failed Locator:

input[name='wrong']


Recovered Locator:

input[name='name']
```


---


# Healing Evidence Attachment


Example:


```json
{
    "element":

    "LoginPage.usernameTextbox",


    "strategy":

    "PREVIOUS_LOCATOR",


    "status":

    "SUCCESS"
}
```


---


# Logging


Example:


```
[WARN]

Self healing started :

LoginPage.usernameTextbox


[INFO]

Locator recovered successfully
```


---


# Developer Rules


Always provide unique names:


Correct:


```javascript
"LoginPage.usernameTextbox"
```


Wrong:


```javascript
"username"
```


---


# Do Not Edit Manually


Avoid modifying:


```
locator-store.json
```


Framework maintains it automatically.


---


# Reset Healing Data


If required:


Delete:


```
self-healing/

    locator-store.json
```


Run tests again.


Framework recreates snapshots.


---


# Best Practices


Always:


✔ Use framework elements

✔ Provide meaningful element keys

✔ Allow first successful execution

✔ Review healing reports


---


Avoid:


❌ Direct page.locator usage


❌ Duplicate element names


❌ Manual locator-store updates


❌ Ignoring healing warnings


---


# Enterprise Benefits


Self Healing provides:


✔ Reduced maintenance


✔ Stable regression execution


✔ Faster UI change recovery


✔ Better reporting visibility


✔ Less false failures


---


# Summary


Self Healing Engine provides:


✔ Automatic locator learning

✔ Locator repository

✔ Attribute recovery

✔ Similarity matching

✔ Allure evidence

✔ Zero test changes


---

Author:

Mahesh Upadhyay

 Enterprise Automation Framework
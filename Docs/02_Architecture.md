#  Enterprise Automation Framework

# 02 - Framework Architecture


## Introduction

This document explains the internal architecture of the  Enterprise Automation Framework.

The framework follows a layered enterprise automation architecture.

The objective is:

```
Separate Test Logic

        from

Framework Implementation
```

Automation engineers write tests.

The framework manages:

- Execution
- Browser lifecycle
- Configuration
- Elements
- Reporting
- Test data
- Self healing


---


# High Level Architecture Diagram


```
                    Test Runner

                         |

                         v

                Playwright Test Engine

                         |

                         v

                    Test Layer


                         |

                         v


                  Page Object Layer


                         |

                         v


                 Framework Element Layer


                         |

                         v


                    Core Framework


                         |

        ---------------------------------

        |               |               |

 Reporting        Self Healing     Configuration


        |               |               |


     Allure       Locator Store     Environment


```


---


# Framework Directory Architecture


```
EnterpriseAutomationFramework


│

├── framework/


│      ├── core/


│      ├── elements/


│      ├── configuration/


│      ├── data/


│      ├── reporting/


│      ├── selfhealing/


│      ├── listeners/


│      └── retry/


│

├── runners/


│

└── Projects/

        |

        └── Application Projects

```


---


# 1. Runner Architecture


Location:


```
runners/
```


Components:


```
TestRunner.js

AllureRunner.js
```


---


# TestRunner.js


Entry point of framework execution.


Command:


```
npm run test -- \
--project=knowledgeware \
--env=qa \
--browser=chromium \
--type=ui
```


Responsibilities:


- Read command arguments
- Validate execution parameters
- Create execution directories
- Set environment variables
- Trigger Playwright execution


Runtime variables:


```
PROJECT

ENV

TEST_TYPE

BROWSER

EXECUTION_PATH

ALLURE_RESULTS
```


---


# Execution Folder Creation


Example:


```
Projects/


 knowledgeware/


    AutomationResults/


        Allure/


            qa/


              ui/


                2026-07-06_10-30-20/


                    allure-results


                    allure-report


                    Screenshots


                    Videos


                    Logs

```


---


# AllureRunner.js


Responsible for:


- Finding latest execution
- Ignoring History folder
- Opening latest report


Command:


```
npm run allure -- \
--project=knowledgeware \
--env=qa \
--type=ui
```


---


# 2. Configuration Architecture


Location:


```
framework/configuration/
```


Components:


```
ConfigManager.js

EnvironmentResolver.js
```


---


# EnvironmentResolver


Responsibility:


Detect active environment.


Example:


Input:


```
--env=qa
```


Output:


```
qa
```


---


# ConfigManager


Responsibilities:


- Load configuration files
- Merge default configuration
- Provide runtime values


Example:


```javascript
ConfigManager.get(
    "baseUrl"
);
```


---


# 3. Playwright Lifecycle Architecture


Lifecycle:


```
TestRunner


     |


global-setup.js


     |


Test Execution


     |


global-teardown.js

```


---


# global-setup.js


Executed before tests.


Responsibilities:


- Initialize configuration
- Initialize test data
- Restore Allure history
- Create metadata


Flow:


```
global setup


      |

ConfigManager


      |

TestDataManager


      |

AllureManager

```


---


# global-teardown.js


Executed after tests.


Responsibilities:


- Generate Allure report
- Copy history
- Final cleanup


---


# 4. Test Layer Architecture


Location:


```
Projects/


 project/


    tests/
```


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


Test layer only contains:


- Business scenario
- Verification


No locators.


No browser handling.


---


# 5. Page Object Architecture


Location:


```
Projects/project/pages/
```


Purpose:


Maintain application pages.


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


}
```


Page Objects contain:


- Elements
- Business actions


They do not contain:


- Reports
- Screenshots
- Healing logic


---


# 6. PageManager Architecture


Location:


```
framework/core/PageManager.js
```


Purpose:


Central page factory.


Flow:


```
Test


 |

PageManager


 |

LoginPage Object

```


Benefits:


- Single object creation point
- Lazy initialization
- Page reuse


---


# 7. Element Architecture


Location:


```
framework/elements/
```


Elements:


```
WebTextBox

WebButton

WebDropdown

WebTable

WebCalendar

WebFileUpload

WebGrid

WebTree

WebModal

WebToast

WebFrame
```


Purpose:


Convert:


```javascript
page.locator().fill()
```


Into:


```javascript
textbox.enterText()
```


---


# 8. BaseElement Architecture


Location:


```
framework/core/BaseElement.js
```


Most important framework class.


Responsibilities:


- Locator handling
- Wait management
- Actions
- Assertions
- Logging
- Screenshots
- Self healing trigger


Flow:


```
WebTextBox


     |


BaseElement


     |


Playwright Locator

```


---


# BaseElement Self Healing Flow


```
Action Requested


        |


getLocator()


        |


Check Locator


        |


Available?


     YES          NO


      |            |


Use Locator     SelfHealingEngine


                   |

              Find Replacement


                   |

              Continue Test

```


---


# 9. Reporting Architecture


Location:


```
framework/reporting/
```


Components:


```
ReportManager

StepLogger

AllureManager

AttachmentManager

EnvironmentWriter

ExecutorWriter

HistoryManager

HealingReporter

```


---


# Reporting Flow


```
Test


 |


StepLogger


 |


Allure Lifecycle


 |


allure-results


 |


allure-report

```


---


# Report Features


Supported:


- Test Steps
- Screenshots
- Videos
- Trace
- Environment
- Executor
- History Trend
- Failure Categories
- Self Healing Evidence


---


# 10. Test Data Architecture


Location:


```
framework/data/
```


Components:


```
TestDataManager

JsonDataLoader

CsvDataLoader

ExcelDataLoader

```


Supports:


```
JSON

CSV

Excel
```


---


# Data Flow


```
Test


 |


TestDataManager


 |


Environment Folder


 |


Data File

```


Example:


```
qa/ui/login.json
```


---


# 11. Self Healing Architecture


Location:


```
framework/selfhealing/
```


Components:


```
SelfHealingEngine


LocatorRepository


LocatorSnapshotManager


SimilarityMatcher


HealingResult

```


---


# Snapshot Flow


Successful execution:


```
Element Works


      |


Capture Metadata


      |


LocatorSnapshotManager


      |


locator-store.json

```


---


# Healing Flow


Failed execution:


```
Locator Failed


       |


SelfHealingEngine


       |


Locator Repository


       |


Alternative Locator


       |


Resume Test

```


---


# Healing Priority


```
1. Existing Locator


2. Previous Successful Locator


3. Attributes


4. Similarity Score


5. XPath

```


---


# 12. Listener Architecture


Location:


```
framework/listeners/
```


Component:


```
TestListener.js
```


Responsibilities:


Before Test:


- Start logging
- Initialize context


After Test:


- Capture failure evidence
- Attach artifacts
- Update report


---


# 13. Retry Architecture


Location:


```
framework/retry/
```


Component:


```
RetryManager.js
```


Purpose:


Handle unstable failures.


Examples:


- Network issue
- Temporary timeout
- Browser instability


---


# Complete Execution Flow


```
User Command


     |


TestRunner


     |


Playwright


     |


Global Setup


     |


Test


     |


PageManager


     |


Page Object


     |


Web Element


     |


BaseElement


     |


Browser


     |


Listener


     |


Allure


     |


Global Teardown


     |


Final Report

```


---


# Architecture Benefits


## Maintainability

Change once, reflect everywhere.


## Scalability

Multiple projects supported.


## Reliability

Self healing and retry handling.


## Visibility

Enterprise reporting.


## Reusability

Common components shared.


---


# Author

Mahesh Upadhyay

 Enterprise Automation Framework
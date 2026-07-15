#   Enterprise Automation Framework

## Overview

  Enterprise Automation Framework is a production-ready UI and API automation framework built using:

- Playwright
- JavaScript ES Modules
- Node.js
- Allure Reporting

The framework follows enterprise automation design principles inspired by Selenium-style frameworks while utilizing modern Playwright capabilities.

It is designed for:

- Web UI Automation
- API Automation
- Cross Browser Testing
- Multi Environment Testing
- Enterprise Reporting
- Self Healing Automation
- Scalable Test Development


---

# Technology Stack

## Language

JavaScript ES Modules

```
import
export
```

No CommonJS usage.

---

## Automation Engine

Playwright Test

Supported browsers:

- Chromium
- Firefox
- WebKit


---

## Reporting

Allure Report

Features:

- Execution Summary
- Test Steps
- Screenshots
- Videos
- Trace Files
- Environment Information
- Categories
- History Trends
- Self Healing Evidence


---

# Framework Philosophy


## Tests should never directly use Playwright locators


Avoid:

```javascript
await page.locator("#username").fill("admin");
```


Use framework elements:

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

- Centralized actions
- Logging
- Reporting
- Screenshots
- Self Healing


---

# High Level Architecture


```
Test Case

    |

Page Object

    |

Framework Elements

(WebTextBox, WebButton)

    |

BaseElement

    |

Playwright

    |

Browser
```


With Self Healing:


```
BaseElement

      |

SelfHealingEngine

      |

LocatorRepository

      |

locator-store.json
```


---

# Framework Structure


```
framework/

 core/
    BasePage.js
    BaseElement.js
    PageManager.js


 elements/

    WebTextBox.js
    WebButton.js
    WebDropdown.js
    WebTable.js


 configuration/

    ConfigManager.js
    EnvironmentResolver.js


 data/

    TestDataManager.js


 reporting/

    ReportManager.js
    StepLogger.js


 selfhealing/

    SelfHealingEngine.js
    LocatorRepository.js
    LocatorSnapshotManager.js


 listeners/

    TestListener.js


 retry/

    RetryManager.js
```


---

# Project Structure


Example:

```
Projects/

 knowledgeware/

      pages/

      tests/

          ui/

          api/


      test-data/

          qa/

          uat/


      playwright.config.js
```


Each application stays isolated.


---

# Installation


Install dependencies:


```
npm install
```


Install browsers:


```
npx playwright install
```


Verify:


```
npx playwright --version
```


---

# Execution


Dynamic runner:


```
npm run test -- --project=knowledgeware --env=qa --browser=chromium --type=ui
```


Parameters:


| Parameter | Example |
|---|---|
| project | knowledgeware |
| env | qa |
| browser | chromium |
| type | ui |


---

# Execution Output


Automatically generated:


```
Projects/

 knowledgeware/

    AutomationResults/

        Allure/

            qa/

              ui/

                timestamp/


                    allure-results/

                    allure-report/

                    Logs/

                    Screenshots/

                    Videos/
```


---

# Allure Report


Open latest report:


```
npm run allure -- --project=knowledgeware --env=qa --type=ui
```


---

# Test Data Management


Environment based:


```
test-data/

 qa/

    ui/

       login.json


 uat/

    ui/

       login.json
```


Usage:


```javascript
testData.get(
    "ui/login",
    "TC_LOGIN_001"
);
```


---

# Self Healing Engine


The framework automatically captures working locators.


Storage:


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

        "primary":"#username",

        "successfulLocator":
        "input[name='username']",

        "attributes":{

            "id":"username",

            "name":"username"
        }
    }
}
```


---

# Healing Strategy


When locator fails:


```
Original Locator

      |

Previous Successful Locator

      |

Attribute Matching

      |

Similarity Matching

      |

XPath Recovery
```


No test changes required.


---

# Reporting Integration


Self Healing appears in Allure:


```
SELF HEALED : LoginPage.username


Original:

#username


Recovered:

input[name=username]
```


---

# Adding New Page


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


---

# Framework Principles


- Keep tests clean
- No locator duplication
- No hardcoded waits
- Centralized reporting
- Centralized configuration
- Reusable components
- Enterprise scalability


---

# Author

Mahesh Upadhyay

  Enterprise Automation Framework
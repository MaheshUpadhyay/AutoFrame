#  Enterprise Automation Framework

# 03 - Installation and Setup Guide


## Introduction

This document explains how to setup  Enterprise Automation Framework on a new machine.

Follow this guide before executing automation tests.


The setup includes:

- Node.js installation
- Java configuration
- Allure setup
- Framework dependencies
- Playwright browsers
- Framework verification


---


# System Requirements


## Operating System


Supported:


```
Windows 10+

Windows 11

Linux

MacOS
```


---


# Required Software


| Software | Version |
|---|---|
| Node.js | 20 LTS or above |
| NPM | 10+ |
| Java JDK | 17 or above |
| Allure CLI | Latest |
| Browser | Chromium / Firefox / WebKit |


---


# 1. Install Node.js


Download Node.js LTS version.


Recommended:


```
Node.js 22 LTS
```


Install with default options.


---


# Verify Node Installation


Open command prompt:


```bash
node -v
```


Expected:


```text
v22.x.x
```


Verify npm:


```bash
npm -v
```


Expected:


```text
10.x.x
```


---


# 2. Install Java JDK


Allure Report requires Java runtime.


Install:


```
JDK 17+
```


Example installation:


```
C:\Program Files\Java\jdk-17
```


---


# Verify Java


Run:


```bash
java -version
```


Expected:


```text
java version "17.x.x"
```


or:


```text
openjdk version "21.x.x"
```


---


# Java Error Fix


If error:


```text
'java' is not recognized as an internal or external command
```


Java PATH is missing.


Configure:


## JAVA_HOME


Open:


```
System Properties

    |

Environment Variables
```


Create:


Variable:


```text
JAVA_HOME
```


Value:


```text
C:\Program Files\Java\jdk-17
```


Example:


```
JAVA_HOME

=

C:\Program Files\Java\jdk-17
```


Do not add:


```
\bin
```


---


# Update PATH


Edit:


```
System Variables

    |

Path
```


Add:


```text
%JAVA_HOME%\bin
```


Save.


Close all terminals.


Open new CMD.


Verify:


```bash
java -version
```


---


# 3. Install Allure Command Line


Install globally:


```bash
npm install -g allure-commandline
```


Verify:


```bash
allure --version
```


Expected:


```text
2.x.x
```


---


# 4. Download Framework


Clone repository:


```bash
git clone <repository-url>
```


Go inside framework:


```bash
cd EnterpriseAutomationFramework
```


Example:


```text
C:

 └── AutomatedScript

        └── EnterpriseAutomationFramework
```


---


# 5. Install Framework Dependencies


The framework already contains:


```
package.json
```


Do not install packages manually.


Run:


```bash
npm install
```


This installs:


```
@playwright/test

playwright

allure-playwright

allure-js-commons

dotenv

exceljs

csv-parse

fs-extra

winston

dayjs

cross-env
```


---


# 6. Install Playwright Browsers


Run:


```bash
npx playwright install
```


This installs:


```
Chromium

Firefox

WebKit
```


---


# Verify Playwright


Run:


```bash
npx playwright --version
```


Expected:


```text
Version 1.xx.x
```


---


# 7. Verify Framework Structure


After setup:


```text
EnterpriseAutomationFramework


│

├── framework


│      ├── core


│      ├── ui


│      ├── reporting


│      ├── selfhealing


│      └── data


│

├── Projects


│      └── knowledgeware


│

├── runners


│

├── package.json

```


---


# 8. Execute First Test


Command format:


```bash
npm run test -- \
--project=<project-name> \
--env=<environment> \
--browser=<browser> \
--type=<execution-type>
```


Example:


```bash
npm run test -- --project=knowledgeware --env=qa --browser=chromium --type=ui
```


---


# Browser Examples


## Chromium


```bash
npm run test -- --project=knowledgeware --env=qa --browser=chromium --type=ui
```


## Firefox


```bash
npm run test -- --project=knowledgeware --env=qa --browser=firefox --type=ui
```


## WebKit


```bash
npm run test -- --project=knowledgeware --env=qa --browser=webkit --type=ui
```


---


# Environment Execution


QA:


```bash
--env=qa
```


UAT:


```bash
--env=uat
```


---


# 9. Execution Output


After execution:


```text
Projects


 └── knowledgeware


        AutomationResults


            └── Allure


                  └── qa


                      └── ui


                          └── timestamp


                                ├── allure-results


                                ├── allure-report


                                ├── Screenshots


                                ├── Videos


                                └── Logs
```


---


# 10. Open Allure Report


Run:


```bash
npm run allure -- --project=knowledgeware --env=qa --type=ui
```


Framework automatically:


- Finds latest execution
- Opens latest report


---


# 11. Validate Self Healing Setup


After first successful execution:


Generated:


```text
Projects


 └── knowledgeware


        self-healing


              locator-store.json
```


Example:


```json
{
    "LoginPage.usernameTextbox": {


        "primary":

        "input[name='name']",


        "successfulLocator":

        "input[name='name']"
    }
}
```


---


# 12. Common Setup Issues


## Node command not found


Check:


```bash
node -v
```


Fix:


Restart terminal after installation.


---


# npm install fails


Clean cache:


```bash
npm cache clean --force
```


Install again:


```bash
npm install
```


---


# Browser Missing Error


Error:


```text
Executable doesn't exist
```


Fix:


```bash
npx playwright install
```


---


# Allure Not Recognized


Error:


```text
allure is not recognized
```


Fix:


Reinstall:


```bash
npm install -g allure-commandline
```


Verify:


```bash
allure --version
```


---


# Permission Issues


Run terminal:


```
Run As Administrator
```


Then retry installation.


---


# Complete Fresh Machine Commands


Execute in sequence:


```bash
node -v


npm -v


java -version


npm install -g allure-commandline


allure --version


git clone <repository-url>


cd EnterpriseAutomationFramework


npm install


npx playwright install


npm run test -- --project=knowledgeware --env=qa --browser=chromium --type=ui


npm run allure -- --project=knowledgeware --env=qa --type=ui
```


---


# Setup Completed


After completing this guide:

You can:

✔ Execute tests

✔ Generate reports

✔ Capture screenshots

✔ Record videos

✔ Use test data

✔ Use self healing locators


Framework is ready for automation development.


---

Author:

Mahesh Upadhyay

 Enterprise Automation Framework
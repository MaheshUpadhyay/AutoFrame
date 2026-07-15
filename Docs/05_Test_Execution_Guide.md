#  Enterprise Automation Framework

# 05 - Test Execution Guide


## Introduction

This document explains how to execute automation tests using the  Enterprise Automation Framework.

The framework provides a dynamic execution engine where users can control:

- Project
- Environment
- Browser
- Test Type

directly from command line.


No code changes are required for different executions.


---


# Execution Architecture


The framework execution starts from:


```
runners/

    TestRunner.js
```


Execution flow:


```
User Command


      |


npm script


      |


TestRunner.js


      |


Runtime Variables


      |


Playwright


      |


Tests


      |


Allure Report
```


---


# Basic Execution Command


Format:


```bash
npm run test -- \
--project=<project-name> \
--env=<environment> \
--browser=<browser-name> \
--type=<test-type>
```


Example:


```bash
npm run test -- --project=knowledgeware --env=qa --browser=chromium --type=ui
```


---


# Command Parameters


| Parameter | Purpose | Example |
|---|---|---|
| project | Application name | knowledgeware |
| env | Environment | qa |
| browser | Browser | chromium |
| type | Test category | ui |


---


# Project Parameter


Argument:


```bash
--project
```


Defines which application tests should run.


Example:


```bash
--project=knowledgeware
```


Framework resolves:


```
Projects/

    knowledgeware/
```


---


# Environment Parameter


Argument:


```bash
--env
```


Controls execution environment.


Examples:


QA:


```bash
--env=qa
```


UAT:


```bash
--env=uat
```


Environment controls:


- URLs
- Test Data
- Runtime Configuration


---


# Browser Parameter


Argument:


```bash
--browser
```


Supported:


```
chromium

firefox

webkit
```


---


# Chromium Execution


```bash
npm run test -- --project=knowledgeware --env=qa --browser=chromium --type=ui
```


---


# Firefox Execution


```bash
npm run test -- --project=knowledgeware --env=qa --browser=firefox --type=ui
```


---


# WebKit Execution


```bash
npm run test -- --project=knowledgeware --env=qa --browser=webkit --type=ui
```


---


# Test Type Parameter


Argument:


```bash
--type
```


Supported:


```
ui

api
```


---


# UI Execution


Runs:


```
tests/ui/
```


Command:


```bash
npm run test -- --project=knowledgeware --env=qa --browser=chromium --type=ui
```


---


# API Execution


Runs:


```
tests/api/
```


Command:


```bash
npm run test -- --project=knowledgeware --env=qa --type=api
```


---


# Runtime Variables


TestRunner creates:


```
PROJECT

ENV

TEST_TYPE

BROWSER

EXECUTION_PATH

ALLURE_RESULTS
```


These variables are used by:


- Configuration Manager
- Test Data Manager
- Reporting
- Self Healing Engine


---


# Execution Startup Flow


When command starts:


```
npm run test


      |


TestRunner


      |


Validate Parameters


      |


Create Result Folder


      |


Start Playwright

```


---


# Global Setup Execution


Before tests:


```
global-setup.js
```


Runs automatically.


Responsibilities:


- Load environment configuration
- Initialize test data
- Setup reporting
- Restore history


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


# Test Execution Flow


During test:


```
Test File


    |


Page Manager


    |


Page Object


    |


Framework Elements


    |


BaseElement


    |


Browser

```


---


# Test Listener Flow


During execution:


```
TestListener


      |


Before Test


      |


After Test

```


Handles:


- Logs
- Screenshots
- Videos
- Failures
- Attachments


---


# Global Teardown Flow


After tests:


```
global-teardown.js
```


Responsibilities:


- Generate Allure report
- Copy history
- Save trends


---


# Execution Result Folder


Generated automatically:


Example:


```
Projects/


 knowledgeware/


      AutomationResults/


          Allure/


              qa/


                ui/


                  2026-07-06_10-20-30/

```


---


# Execution Folder Content


```
2026-07-06_10-20-30/


        |


        ├── allure-results


        ├── allure-report


        ├── Logs


        ├── Screenshots


        ├── Videos


        └── TestArtifacts
```


---


# Allure Results


Raw execution data:


```
allure-results/
```


Contains:


- Test JSON files
- Attachments
- Screenshots
- Environment details


---


# Allure Report


Generated HTML:


```
allure-report/
```


Contains:


- Dashboard
- Test Results
- Graphs
- Trends


---


# Open Latest Allure Report


Command:


```bash
npm run allure -- --project=knowledgeware --env=qa --type=ui
```


Framework automatically:


- Finds latest execution
- Ignores History folder
- Opens latest report


---


# Multiple Environment Examples


## QA UI


```bash
npm run test -- --project=knowledgeware --env=qa --browser=chromium --type=ui
```


---


## UAT UI


```bash
npm run test -- --project=knowledgeware --env=uat --browser=chromium --type=ui
```


---


## QA API


```bash
npm run test -- --project=knowledgeware --env=qa --type=api
```


---


# Cross Browser Testing


Run same tests:


Chromium:


```bash
--browser=chromium
```


Firefox:


```bash
--browser=firefox
```


WebKit:


```bash
--browser=webkit
```


No test changes required.


---


# Parallel Execution


Configured inside:


```
playwright.config.js
```


Example:


```javascript
workers: 4
```


Execution:


```bash
npm run test -- --project=knowledgeware --env=qa --browser=chromium --type=ui
```


Playwright automatically distributes tests.


---


# Headless Execution


Controlled from configuration:


Example:


```javascript
headless:true
```


---


# Failed Test Handling


When test fails:


Framework captures:


```
Screenshot

Video

Trace

Logs

Error Context
```


Stored:


```
TestArtifacts/
```


Attached automatically:


```
Allure Report
```


---


# Self Healing During Execution


Runtime flow:


```
Element Action


     |


Locator Failed


     |


SelfHealingEngine


     |


Recover Locator


     |


Continue Test

```


Healing details stored:


```
self-healing/

    locator-store.json
```


---


# Common Execution Issues


## No Tests Found


Reason:


Wrong:


```
--type
```


or missing folder.


Check:


```
tests/ui

tests/api
```


---


# Browser Not Installed


Error:


```
Executable doesn't exist
```


Fix:


```bash
npx playwright install
```


---


# Allure Not Opening


Verify:


```bash
allure --version
```


If missing:


```bash
npm install -g allure-commandline
```


---


# Clean Execution


Remove old results:


Delete:


```
AutomationResults
```


Run again:


```bash
npm run test -- --project=knowledgeware --env=qa --browser=chromium --type=ui
```


---


# Recommended Execution Flow


Daily automation:


```
Pull latest code


        |


npm install


        |


Execute Tests


        |


Review Allure Report

```


---


# Summary


Framework execution provides:


✔ Dynamic project selection

✔ Dynamic environment selection

✔ Browser switching

✔ UI/API separation

✔ Automatic reports

✔ Screenshots/videos

✔ History tracking

✔ Self healing execution


---

Author:

Mahesh Upadhyay

 Enterprise Automation Framework
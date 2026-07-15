# Enterprise Automation Framework

# Test Execution Command Reference

---

## Overview

The Enterprise Automation Framework supports enterprise-grade dynamic execution using command-line parameters.

A single Test Runner supports:

- Project execution
- Environment execution
- UI execution
- API execution
- Browser execution
- Suite execution
- Single test execution
- Test filtering
- Dynamic Allure reporting

All executions are handled through:

```
npm run test
```

---

# General Syntax

```
npm run test -- --project=<project> --env=<environment> --type=<ui|api>
```

Example

```
npm run test -- --project=knowledgeware --env=qa --type=api
```

---

# Execution Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| --project | Yes | Project name |
| --env | No | Environment (Default: qa) |
| --type | No | ui / api (Default: ui) |
| --browser | No | Browser for UI execution |
| --suite | No | Execute a suite/folder |
| --test | No | Execute a single test |
| --grep | No | Execute matching Playwright test titles |

---

# UI Execution

## Execute All UI Tests

```
npm run test -- --project=knowledgeware --env=qa --type=ui
```

Runs

```
tests/ui/**
```

---

## Execute UI on Chromium

```
npm run test -- --project=knowledgeware --env=qa --type=ui --browser=chromium
```

---

## Execute UI on Firefox

```
npm run test -- --project=knowledgeware --env=qa --type=ui --browser=firefox
```

---

## Execute UI on WebKit

```
npm run test -- --project=knowledgeware --env=qa --type=ui --browser=webkit
```

---

## Execute UI Suite

Example folder

```
tests/

    ui/

        login/

            login.test.js
```

Execution

```
npm run test -- --project=knowledgeware --env=qa --type=ui --suite=login
```

Runs

```
tests/ui/login/**
```

---

## Execute Single UI Test

```
npm run test -- --project=knowledgeware --env=qa --type=ui --test=login/login.test.js
```

or simply

```
npm run test -- --project=knowledgeware --env=qa --type=ui --test=login.test.js
```

The framework automatically searches if only the file name is supplied.

---

## Execute UI Test using Grep

```
npm run test -- --project=knowledgeware --env=qa --type=ui --grep="Verify Login"
```

---

# API Execution

## Execute All API Tests

```
npm run test -- --project=knowledgeware --env=qa --type=api
```

Runs

```
tests/api/**
```

---

## Execute API Suite

Example

```
tests/

    api/

        authentication/

            auth.test.js
```

Execution

```
npm run test -- --project=knowledgeware --env=qa --type=api --suite=authentication
```

Runs

```
tests/api/authentication/**
```

---

## Execute API Chaining Suite

```
tests/

    api/

        chainexample/

            chaining.test.js
```

Execution

```
npm run test -- --project=knowledgeware --env=qa --type=api --suite=chainexample
```

Runs

```
tests/api/chainexample/**
```

---

## Execute Single API Test

```
npm run test -- --project=knowledgeware --env=qa --type=api --test=chainexample/chaining.test.js
```

or

```
npm run test -- --project=knowledgeware --env=qa --type=api --test=chaining.test.js
```

The framework automatically resolves the file if it exists uniquely.

---

## Execute API Test using Grep

```
npm run test -- --project=knowledgeware --env=qa --type=api --grep="TC_API_CHAIN_001"
```

---

# Browser Selection

UI Only

Supported values

```
chromium

firefox

webkit

all
```

Example

```
npm run test -- --project=knowledgeware --env=qa --type=ui --browser=chromium
```

API ignores browser selection.

---

# Test Resolution

The framework resolves execution in the following priority:

```
--test

↓

--suite

↓

--grep

↓

Run All Tests
```

---

# Directory Structure

```
Projects/

    knowledgeware/

        tests/

            ui/

                login/

                    login.test.js

                dashboard/

                    dashboard.test.js

            api/

                authentication/

                    auth.test.js

                chainexample/

                    chaining.test.js

                users.test.js
```

---

# Allure Reports

Every execution creates a unique report.

```
AutomationResults/

    Allure/

        qa/

            api/

                2026-07-14_18-45-22/

                    allure-results

                    allure-report
```

---

# Execution Banner

Example

```
====================================

 Runner

 Project      : knowledgeware
 Environment  : qa
 Type         : api
 Browser      : all
 Execution    : SUITE

 Suite        : chainexample
 Test         : -
 Grep         : -

 Result Path  :

 C:\AutomatedScript\EnterpriseAutomationFramework\Projects\knowledgeware\AutomationResults\Allure\qa\api\2026-07-14_18-45-22

====================================
```

---

# Best Practices

✔ Organize tests into suites.

✔ Keep one feature per suite.

✔ Use descriptive suite names.

✔ Prefer suite execution during development.

✔ Use single-test execution while debugging.

✔ Use grep for temporary execution only.

✔ Execute regression using suite or full execution.

---

# Current Supported Execution Modes

| Mode | Supported |
|-------|-----------|
| Project | ✅ |
| Environment | ✅ |
| UI | ✅ |
| API | ✅ |
| Browser | ✅ |
| Suite | ✅ |
| Single Test | ✅ |
| Grep | ✅ |
| Dynamic Allure | ✅ |
| Dynamic Result Folder | ✅ |
| History Preservation | ✅ |

---

Author

Mahesh Upadhyay

Enterprise Automation Framework
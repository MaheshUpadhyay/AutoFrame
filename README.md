our framework already has package.json, the user should not install packages one by one. Enterprise practice is:

Install Node
        ↓
Clone / Copy Framework
        ↓
npm install
        ↓
Install Browsers
        ↓
Verify Framework
        ↓
Execute Tests

Below is the complete step-by-step CLI flow.

Step 1 — Install Node.js

Download and install Node.js LTS:

Recommended:

Node.js 22 LTS

After installation, open new CMD:

node -v

Expected:

v22.x.x

Verify npm:

npm -v

Expected:

10.x.x
Step 2 — Install Java (Required for Allure)

Allure CLI requires Java.

Install:

JDK 17+

Verify:

java -version

Expected:

java version "17.x.x"
Step 3 — Install Allure Commandline Globally

Run:

npm install -g allure-commandline

Verify:

allure --version

Expected:

2.x.x
Step 4 — Get Framework Code

Example:

cd C:\Automation

Clone:

git clone <repository-url>

Go inside:

cd EnterpriseAutomationFramework

Example:

C:
 └── Automation
      └── EnterpriseAutomationFramework
Step 5 — Install Framework Dependencies

Only one command:

npm install

This installs everything from your package.json:

@playwright/test

playwright

allure-playwright

allure-js-commons

exceljs

csv-parse

dotenv

winston

dayjs

fs-extra

cross-env
Step 6 — Install Playwright Browsers

Install:

npx playwright install

This installs:

Chromium
Firefox
WebKit

If Windows dependencies required:

npx playwright install --with-deps
Step 7 — Verify Playwright

Run:

npx playwright --version

Expected:

Version 1.xx.x
Step 8 — Verify Project Structure

User should have:

EnterpriseAutomationFramework

framework/

Projects/

    knowledgeware/

        pages/

        tests/

        test-data/

        playwright.config.js


runners/

package.json
Step 9 — Execute First Test

Example QA Chrome:

npm run test -- --project=knowledgeware --env=qa --browser=chromium --type=ui

Firefox:

npm run test -- --project=knowledgeware --env=qa --browser=firefox --type=ui

UAT:

npm run test -- --project=knowledgeware --env=uat --browser=chromium --type=ui
Step 10 — Expected Runtime Folder

Automatically generated:

Projects
 └── knowledgeware

      AutomationResults

          Allure

             qa

              ui

               timestamp

                    allure-results

                    allure-report

                    Logs

                    Screenshots

                    Videos

                    TestArtifacts
Step 11 — Open Latest Allure Report

Run:

npm run allure -- --project=knowledgeware --env=qa --type=ui

Expected:

Opening latest allure-report
Step 12 — Verify Self Healing

First execution automatically creates:

Projects

 knowledgeware

    self-healing

        locator-store.json

Example:

{
    "LoginPage.usernameTextbox": {

        "primary":"input[name='name']",

        "successfulLocator":"input[name='name']"
    }
}
Complete Fresh Machine Setup Commands

For a new user, these are the only commands they need:

node -v

npm -v

java -version

npm install -g allure-commandline

allure --version


cd C:\Automation

git clone <repository-url>

cd EnterpriseAutomationFramework


npm install


npx playwright install


npm run test -- --project=knowledgeware --env=qa --browser=chromium --type=ui


npm run allure -- --project=knowledgeware --env=qa --type=ui

Your framework is now portable.

Before sharing, I would also recommend adding:

README.md
.env.example
.gitignore

and locking versions with:

package-lock.json

so every user gets exactly the same framework behavior.

/**
 * ============================================================================
 * Enterprise Automation Framework
 *
 * Dynamic Test Runner
 *
 *  Responsibilities:
 * - Execute any project
 * - Execute environment
 * - Execute UI/API
 * - Execute browser
 * - Create execution folder
 * - Pass runtime variables
 *
 * Author : Automated Script
 * ============================================================================
 */


import { execSync }
from "child_process";


import fs
from "fs";


import path
from "path";


import { ExecutionOptions }
from "../framework/execution/ExecutionOptions.js";



import { PlaywrightCommandBuilder }
from "../framework/execution/PlaywrightCommandBuilder.js";

import { TestFileResolver }
from "../framework/execution/TestFileResolver.js";


const options =
    ExecutionOptions.parse(
        process.argv.slice(2)
    );







// ============================================================
// Runtime Values
// ============================================================


const project =
    options.project;

const environment =
    options.environment;

const browser =
    options.browser;

const type =
    options.type;

const suite =
    options.suite;

const test =
    options.test;

const grep =
    options.grep;






if(!project){


    throw new Error(

        "Project required. Example: --project=knowledgeware"

    );


}







// ============================================================
// Project Paths
// ============================================================


const projectDirectory =

    path.resolve(

        process.cwd(),

        "Projects",

        project

    );

// ============================================================
// Resolve Execution Target
// ============================================================

const testsDirectory = path.join(
    projectDirectory,
    "tests",
    type
);

let targetPath = null;

if (test) {

    targetPath = TestFileResolver.resolveTest(
        testsDirectory,
        test
    );

}
else if (suite) {

    targetPath = TestFileResolver.resolveSuite(
        testsDirectory,
        suite
    );

}



const configPath =

    path.join(

        projectDirectory,

        "playwright.config.js"

    );





if(!fs.existsSync(configPath)){


    throw new Error(

        `Config missing : ${configPath}`

    );


}


// ============================================================
// Execution Timestamp
// ============================================================


const timestamp =

    new Date()

        .toISOString()

        .replace(/T/,"_")

        .replace(/:/g,"-")

        .split(".")[0];








// ============================================================
// Execution Folder
// ============================================================


const executionPath =

    path.join(

        projectDirectory,

        "AutomationResults",

        "Allure",

        environment,

        type,

        timestamp

    );





const allureResults =

    path.join(

        executionPath,

        "allure-results"

    );



fs.mkdirSync(

    allureResults,

    {
        recursive:true
    }

);



const executionMode =
    test
        ? "TEST"
        : suite
            ? "SUITE"
            : grep
                ? "GREP"
                : "ALL";

const suiteName =
    suite || "-";

const testName =
    test || "-";

const grepValue =
    grep || "-";





// ============================================================
// Console Banner
// ============================================================


console.log(`

====================================

 Runner

 Project      : ${project}
 Environment  : ${environment}
 Type         : ${type}
 Browser      : ${browser}
 Execution    : ${executionMode}

 Suite        : ${suiteName}
 Test         : ${testName}
 Grep         : ${grepValue}

 Result Path  :

 ${executionPath}

====================================

`);









// ============================================================
// Build Command
// ============================================================


 const playwrightCommand =
    PlaywrightCommandBuilder.build({

        configPath,

        browser,

        targetPath,

        grep

    });

let command =

`
cross-env
PROJECT=${project}
ENV=${environment}
TEST_TYPE=${type}
BROWSER=${browser}
EXECUTION_PATH="${executionPath}"
ALLURE_RESULTS="${allureResults}"
${playwrightCommand}
`;




command = command.replace(/\n/g," ");


// ============================================================
// Execute Tests
// ============================================================


try{


    execSync(

        command,

        {
            stdio:"inherit"
        }

    );



    console.log(`

====================================

 Execution Completed Successfully

 Project      : ${project}
 Environment  : ${environment}
 Type         : ${type}
 Browser      : ${browser}
 Execution    : ${executionMode}

 Suite        : ${suiteName}
 Test         : ${testName}
 Grep         : ${grepValue}

 Result Path  :

 ${executionPath}

====================================

`);



}
catch(error){


    console.error(

        "Test execution failed"

    );


    process.exit(

        error.status || 1

    );


}



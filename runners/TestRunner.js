/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
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



// ============================================================
// CLI Arguments
// ============================================================


const args =
    process.argv.slice(2);



const options = {};



args.forEach(arg=>{


    const [key,value] =
        arg.replace("--","").split("=");


    options[key]=value;


});







// ============================================================
// Runtime Values
// ============================================================


const project =
    options.project;


const environment =
    options.env || "qa";


const browser =
    options.browser || "all";


const type =
    options.type || "ui";






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









// ============================================================
// Console Banner
// ============================================================


console.log(`

====================================

 Automated Script Runner

 Project      : ${project}
 Environment  : ${environment}
 Type         : ${type}
 Browser      : ${browser}
 Result Path  : ${executionPath}

====================================

`);









// ============================================================
// Build Command
// ============================================================


let command =

`
cross-env
PROJECT=${project}
ENV=${environment}
TEST_TYPE=${type}
BROWSER=${browser}
EXECUTION_PATH="${executionPath}"
ALLURE_RESULTS="${allureResults}"
playwright test --config="${configPath}"
`;




command = command.replace(/\n/g," ");






if(

    browser.toLowerCase()

    !==

    "all"

){


    command +=

        ` --project ${browser}`;


}









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

 Result Path:

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



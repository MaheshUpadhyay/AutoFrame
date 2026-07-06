/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 *
 * Dynamic Allure Report Launcher
 * ============================================================================
 */


import { execSync } from "child_process";

import fs from "fs";

import path from "path";





const args = process.argv.slice(2);


const options = {};


args.forEach(arg => {


    const [

        key,

        value

    ] = arg.replace("--","").split("=");


    options[key] = value;


});





const project = options.project;

const environment = options.env || "qa";

const type = options.type || "ui";





if(!project){


    throw new Error(

        "Project required. Example: npm run allure -- --project=knowledgeware --env=qa --type=ui"

    );


}







const basePath =

    path.resolve(

        process.cwd(),

        "Projects",

        project,

        "AutomationResults",

        "Allure",

        environment,

        type

    );





if(!fs.existsSync(basePath)){


    throw new Error(

        `No report found : ${basePath}`

    );


}






const executions =

    fs.readdirSync(basePath)

        .filter(folder =>

            folder !== "History"

        )

        .filter(folder =>

            fs.statSync(

                path.join(

                    basePath,

                    folder

                )

            ).isDirectory()

        )

        .sort()

        .reverse();






if(

    executions.length === 0

){


    throw new Error(

        "No execution reports available"

    );


}






const latest =

    path.join(

        basePath,

        executions[0],

        "allure-report"

    );

if(

    !fs.existsSync(latest)

){


    throw new Error(

        `Allure report not generated : ${latest}`

    );


}




console.log(`

====================================

 Opening Allure Report

 Project      : ${project}
 Environment  : ${environment}
 Type         : ${type}

 Location:

 ${latest}

====================================

`);





execSync(

    `allure open "${latest}"`,

    {

        stdio:"inherit"

    }

);
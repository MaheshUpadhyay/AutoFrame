/**
 * ============================================================================
 * Enterprise Automation Framework
 * TestDataManager
 * ----------------------------------------------------------------------------
 *
 * Centralized Test Data Manager
 *
 * Supports:
 * - Multiple projects
 * - Multiple environments
 * - JSON
 * - CSV
 * - Excel
 *
 * Example:
 *
 * Projects/
 *   knowledgeware/
 *      test-data/
 *          qa/
 *             ui/login.json
 *
 * Usage:
 *
 * testData.get("ui/login","TC_LOGIN_001")
 *
 * ============================================================================
 */


import path from "path";

import { JsonDataLoader }
from "./JsonDataLoader.js";


import { CsvDataLoader }
from "./CsvDataLoader.js";


import { ExcelDataLoader }
from "./ExcelDataLoader.js";



class TestDataManager {


    #cache =
        new Map();


    #loaders =
        new Map();

    #project;

    #environment;



    constructor(){


        this.registerLoader(

            "json",

            new JsonDataLoader()

        );


        this.registerLoader(

            "csv",

            new CsvDataLoader()

        );


        this.registerLoader(

            "xlsx",

            new ExcelDataLoader()

        );


    }




    /**
     * Resolve data directory dynamically
     */

    getDataDirectory(){


        const project =

            this.#project ||

            process.env.PROJECT;



        const environment =

            this.#environment ||

            process.env.ENV ||

            "qa";



        if(

            !project

        ){


            throw new Error(

                "PROJECT is not initialized"

            );


        }



        return path.resolve(

            process.cwd(),

            "Projects",

            project,

            "test-data",

            environment

        );


    }







    registerLoader(

        extension,

        loader

    ){


        extension =
            extension
            .replace(".","")
            .toLowerCase();



        if(

            !loader ||
            typeof loader.load !== "function"

        ){


            console.log(
                "Invalid Loader:",
                loader
            );


            throw new Error(

                `Loader ${loader?.constructor?.name} must implement load(filePath)`

            );


        }



        this.#loaders.set(

            extension,

            loader

        );


    }




    // ============================================================
    // Project
    // ============================================================


    setProject(project){


        this.#project = project;


        return this;


    }



    // ============================================================
    // Environment
    // ============================================================


    setEnvironment(environment){


        this.#environment = environment;


        return this;


    }



    load(file){



        if(

            !path.extname(file)

        ){


            file += ".json";


        }




        const fullPath =

            path.join(

                this.getDataDirectory(),

                file

            );




        if(

            this.#cache.has(fullPath)

        ){


            return this.#cache.get(fullPath);


        }






        const extension =

            path.extname(file)

            .replace(".","")

            .toLowerCase();




        const loader =

            this.#loaders.get(

                extension

            );




        if(!loader){


            throw new Error(

                `No TestData loader registered for .${extension}`

            );


        }





        const data =

            loader.load(

                fullPath

            );




        this.#cache.set(

            fullPath,

            data

        );



        return data;


    }








    get(

        file,

        key

    ){


        const data =

            this.load(

                file

            );



        if(!key){

            return data;

        }



        return key

            .split(".")

            .reduce(

                (obj,item)=>

                    obj?.[item],

                data

            );


    }







    clearCache(){

        this.#cache.clear();

    }


}




export const testData =
    new TestDataManager();



export { TestDataManager };
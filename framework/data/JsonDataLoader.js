/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * JsonDataLoader
 * ============================================================================
 */


import fs from "fs";


export class JsonDataLoader {


    /**
     * Load JSON file
     *
     * @param {string} filePath
     */
      load(filePath){


        if(
            !fs.existsSync(filePath)
        ){

            throw new Error(
                `JSON test data file not found : ${filePath}`
            );

        }


        const content =
            fs.readFileSync(
                filePath,
                "utf8"
            );


        return JSON.parse(
            content
        );


    }


}
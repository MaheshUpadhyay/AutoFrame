/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * CsvDataLoader
 * ============================================================================
 */


import fs from "fs";


import { parse }
from "csv-parse/sync";



export class CsvDataLoader {


    /**
     * Load CSV file
     *
     * @param {string} filePath
     */
    load(filePath){


        if(
            !fs.existsSync(filePath)
        ){


            throw new Error(

                `CSV test data file not found : ${filePath}`

            );


        }



        const content =

            fs.readFileSync(

                filePath,

                "utf8"

            );



        return parse(

            content,

            {

                columns:true,

                skip_empty_lines:true

            }

        );


    }


}
/**
 * ================================================================
 * Automated Script Enterprise Automation Framework
 * ------------------------------------------------
 * Module  : Self Healing
 * File    : LocatorRepository.js
 * Purpose : Handles persistent locator storage operations
 * It will:

Create project-wise self-healing folder automatically
Maintain locator-store.json
Read existing locator snapshots
Save new successful locators
Update healed locators
Keep self-healing environment independent
Support current dynamic runner variables
 *
 * Author  : Mahesh Upadhyay
 * ================================================================
 */


import fs from "fs";
import path from "path";


/**
 * Manages locator repository storage.
 *
 * Responsibilities:
 *
 * - Load locator store
 * - Save locator snapshots
 * - Update healed locators
 * - Maintain project level repository
 *
 * @class LocatorRepository
 */
export class LocatorRepository {


    static repositoryCache = null;



    /**
     * Returns locator repository path.
     *
     * @returns {string}
     */
    static getRepositoryPath(){


        const project =
            process.env.PROJECT;


        if(!project){

            throw new Error(
                "PROJECT environment variable not found"
            );
        }


        return path.join(
            process.cwd(),
            "Projects",
            project,
            "self-healing",
            "locator-store.json"
        );

    }




    /**
     * Initializes repository.
     *
     * Creates folder and json file
     * if not available.
     *
     */
    static initialize(){


        const filePath =
            this.getRepositoryPath();


        const directory =
            path.dirname(filePath);



        if(!fs.existsSync(directory)){


            fs.mkdirSync(
                directory,
                {
                    recursive:true
                }
            );

        }



        if(!fs.existsSync(filePath)){


            fs.writeFileSync(
                filePath,
                JSON.stringify(
                    {},
                    null,
                    4
                )
            );

        }

    }





    /**
     * Loads locator repository.
     *
     * @returns {Object}
     */
    static load(){


        if(this.repositoryCache){

            return this.repositoryCache;

        }


        this.initialize();


        const filePath =
            this.getRepositoryPath();


        const content =
            fs.readFileSync(
                filePath,
                "utf-8"
            );


        this.repositoryCache =
            content
                ?
                JSON.parse(content)
                :
                {};


        return this.repositoryCache;

    }





    /**
     * Saves complete repository.
     *
     * @param {Object} data
     */
    static save(data){


        const filePath =
            this.getRepositoryPath();


        fs.writeFileSync(

            filePath,

            JSON.stringify(
                data,
                null,
                4
            )

        );


        this.repositoryCache =
            data;

    }






    /**
     * Gets locator information.
     *
     * Example key:
     *
     * LoginPage.username
     *
     * @param {string} locatorKey
     *
     * @returns {Object|null}
     */
    static get(locatorKey){


        const repository =
            this.load();


        return repository[locatorKey]
            ||
            null;

    }






    /**
     * Creates or updates locator data.
     *
     * @param {string} locatorKey
     * @param {Object} locatorData
     */
    static update(
        locatorKey,
        locatorData
    ){


        const repository =
            this.load();



        repository[locatorKey] = {


            ...(repository[locatorKey] || {}),


            ...locatorData,


            lastUpdated:
                new Date()
                    .toISOString()

        };



        this.save(repository);

    }







    /**
     * Updates only successful healed locator.
     *
     * Used after healing success.
     *
     * @param {string} locatorKey
     * @param {string} healedLocator
     */
    static updateSuccessfulLocator(
        locatorKey,
        healedLocator
    ){


        const existing =
            this.get(locatorKey);



        if(!existing){

            return;

        }



        this.update(
            locatorKey,
            {

                successfulLocator:
                    healedLocator

            }
        );

    }







    /**
     * Clears cache.
     *
     * Mostly used in tests/debugging.
     */
    static clearCache(){

        this.repositoryCache = null;

    }

}
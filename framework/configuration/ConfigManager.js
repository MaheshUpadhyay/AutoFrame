/**
 * ============================================================================
 * Enterprise Automation Framework
 * ConfigManager
 * ----------------------------------------------------------------------------
 * Centralized framework configuration manager.
 *
 * Responsibilities
 * ----------------
 * • Load environment configs
 * • Merge default + env configs
 * • Provide dot notation access
 * • Cache configuration
 *
 * Author : Automated Script
 * ============================================================================
 */


import fs from "fs";
import path from "path";

import { EnvironmentResolver } 
from "./EnvironmentResolver.js";


export class ConfigManager {


    static configDirectory = null;


    static configuration = null;


    // ============================================================
// Set Config Directory
// ============================================================


    static setConfigDirectory(directory){

        this.configDirectory =
            directory;


        this.configuration =
            null;

    }

    // ============================================================
    // Load
    // ============================================================


    static load() {


        if (this.configuration) {

            return this.configuration;

        }


        const environment =
            EnvironmentResolver
                .getEnvironment();



        const defaultConfig =
            this.loadFile(
                "default.json"
            );



        const envConfig =
            this.loadFile(
                `${environment}.json`
            );



        this.configuration =
            this.merge(

                defaultConfig,

                envConfig

            );



        return this.configuration;


    }



    // ============================================================
    // Load File
    // ============================================================


    static loadFile(
        file
    ) {


        const filePath = path.join(

            this.configDirectory
                ||
            path.resolve(
                process.cwd(),
                "config"
            ),

            file

        );


        if (
            !fs.existsSync(
                filePath
            )
        ) {


            return {};


        }



        return JSON.parse(

            fs.readFileSync(

                filePath,

                "utf8"

            )

        );


    }



    // ============================================================
    // Get Property
    // ============================================================


    static get(
        key,
        defaultValue = null
    ) {


        const config =
            this.load();



        const value =
            key
            .split(".")
            .reduce(

                (obj, prop) =>
                    obj?.[prop],

                config

            );



        return (

            value !== undefined

                ? value

                : defaultValue

        );


    }



    // ============================================================
    // Boolean Helper
    // ============================================================


    static isEnabled(
        key
    ) {


        return (

            this.get(key)

            === true

        );


    }



    // ============================================================
    // Merge Config
    // ============================================================


    static merge(
        target,
        source
    ) {


        const result = {
            ...target
        };



        for (
            const key
            of Object.keys(source)
        ) {


            if (

                typeof source[key]
                    === "object"

                &&

                !Array.isArray(
                    source[key]
                )

            ) {


                result[key] =
                    this.merge(

                        result[key] || {},

                        source[key]

                    );


            }
            else {


                result[key] =
                    source[key];


            }


        }



        return result;


    }



    // ============================================================
    // Utilities
    // ============================================================


    static reload() {


        this.configuration = null;


        return this.load();


    }



    static clear() {


        this.configuration = null;


    }


}
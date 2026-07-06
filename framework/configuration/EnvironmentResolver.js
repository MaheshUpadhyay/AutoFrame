/**
 * ============================================================================
 * Enterprise Automation Framework
 * EnvironmentResolver
 * ----------------------------------------------------------------------------
 * Resolves current execution environment.
 *
 * Priority:
 * 1. ENV variable
 * 2. NODE_ENV
 * 3. Default
 * 
 * Everything should eventually read from here:

BrowserFixture
ApiClient
Reporting
Logger
RetryManager
TestDataManager
BasePage

Architecture:

config/
│
├── default.json
├── qa.json
├── uat.json
└── prod.json


framework/configuration/

ConfigManager.js
        |
        |
EnvironmentResolver.js

Usage goal:

ConfigManager.get("browser");

ConfigManager.get("api.baseUrl");

ConfigManager.get("timeout.default");

ConfigManager.isEnabled("reporting.video");
 *
 * Author : Automated Script
 * ============================================================================
 */


export class EnvironmentResolver {


    static DEFAULT_ENV = "qa";


    /**
     * Returns current environment.
     *
     * Examples:
     *
     * ENV=uat npm test
     *
     * NODE_ENV=prod npm test
     *
     */
    static getEnvironment() {


        return (

            process.env.ENV ||

            process.env.NODE_ENV ||

            this.DEFAULT_ENV

        ).toLowerCase();


    }



    /**
     * Check environment.
     */
    static is(
        environment
    ) {


        return (

            this.getEnvironment()

            ===

            environment.toLowerCase()

        );


    }



    static isQA() {

        return this.is("qa");

    }



    static isUAT() {

        return this.is("uat");

    }



    static isPROD() {

        return this.is("prod");

    }


}
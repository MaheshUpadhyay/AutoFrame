/**
 * @file ApiRequest.js
 * @description
 * Enterprise API Request Executor.
 *
 * Responsibilities:
 * - Execute API requests
 * - Manage Playwright APIRequestContext
 * - Handle retry
 * - Handle authentication
 * - Attach API evidence into Allure
 *
 * @author Mahesh Upadhyay
 */


import { request }
from "@playwright/test";


import { ConfigManager }
from "../../configuration/ConfigManager.js";


import { ApiHeaders }
from "../headers/ApiHeaders.js";


import { ApiAuthentication }
from "../auth/ApiAuthentication.js";


import { ApiLogger }
from "../logging/ApiLogger.js";


import { ApiResponse }
from "./ApiResponse.js";


import { ApiRetryHandler }
from "../retry/ApiRetryHandler.js";


import { AttachmentManager }
from "../../reporting/AttachmentManager.js";

import { ApiContextStore }
from "../context/ApiContextStore.js";


export class ApiRequest {


    /**
     * Playwright API context
     */
    static context = null;



    /**
     * Initialize API context
     */
    static async initialize() {


        if (this.context) {

            return;

        }


        const baseURL =
            ConfigManager.get(
                "api.baseUrl"
            );


        if (!baseURL) {


            throw new Error(
                "api.baseUrl missing in configuration"
            );

        }


        ApiHeaders.initialize();


        this.context =
            await request.newContext({

                baseURL

            });

    }



    /**
     * Execute API call
     *
     * @param {string} method
     * @param {string} endpoint
     * @param {object} options
     *
     * @returns {ApiResponse}
     */
    static async execute(
        method,
        endpoint,
        options = {}
    ) {


        await this.initialize();

        /**
         * Resolve dynamic API context values
         *
         * Example:
         *
         * /users/{USER_ID}
         *
         * becomes
         *
         * /users/101
         */
        endpoint =
            ApiContextStore.resolve(
                endpoint
            );


        let headers =
            ApiHeaders.build(
                options.headers
            );



        headers =
            ApiAuthentication.apply(
                headers
            );



        const requestPayload =
        {

            method,

            url:
                endpoint,

            headers,

            body:

                this.resolveContext(

                    options.body || null

                )

        };



        ApiLogger.logRequest(
            requestPayload
        );



        await this.attachRequest(
            requestPayload
        );



        const start =
            Date.now();



        let playwrightResponse;



        try {


            playwrightResponse =
                await ApiRetryHandler.execute(

                    async () => {


                        return await this.context.fetch(

                            endpoint,


                            {

                                method,

                                headers,


                                data:

                                    this.resolveContext(

                                        options.body

                                    ),


                                params:
                                    options.params

                            }

                        );

                    }

                );


        }
        catch(error) {


            ApiLogger.logError(
                error
            );


            throw error;

        }



        const executionTime =
            Date.now() - start;



        const apiResponse =
            new ApiResponse(


                playwrightResponse,


                {

                    method,

                    url:
                        endpoint,


                    requestHeaders:
                        headers,


                    requestBody:
                        options.body,


                    executionTime

                }

            );



        await ApiLogger.logResponse(
            apiResponse
        );



        await this.attachResponse(
            apiResponse
        );



        return apiResponse;

    }




    /**
     * Attach API request into Allure
     *
     * @param {object} requestInfo
     */
    static async attachRequest(
        requestInfo
    ) {


        await AttachmentManager.attachJson(

            "API Request",

            {

                Method:
                    requestInfo.method,


                URL:
                    requestInfo.url,


                Headers:
                    requestInfo.headers,


                Body:
                    requestInfo.body

            }

        );

    }





    /**
     * Attach API response into Allure
     *
     * @param {ApiResponse} response
     */
    static async attachResponse(
        response
    ) {


        const responseInfo =
            await response.responseInfo();



        await AttachmentManager.attachJson(

            "API Response",


            {

                Status:
                    responseInfo.status,


                Headers:
                    responseInfo.headers,


                Body:
                    responseInfo.body,


                ExecutionTime:
                    `${responseInfo.executionTime} ms`

            }

        );

    }





    /**
     * Dispose API context
     */
    static async dispose() {


        if (this.context) {


            await this.context.dispose();


            this.context = null;

        }

    }

    /**
     * Resolve context placeholders inside object
     *
     * @param {*} value
     *
     * @returns {*}
     */
    static resolveContext(
        value
    ) {


        if (
            typeof value === "string"
        ) {


            return ApiContextStore.resolve(
                value
            );

        }



        if (
            Array.isArray(value)
        ) {


            return value.map(

                item =>

                    this.resolveContext(
                        item
                    )

            );

        }



        if (
            value &&
            typeof value === "object"
        ) {


            const resolved = {};


            for (
                const key
                of Object.keys(value)
            ) {


                resolved[key] =
                    this.resolveContext(

                        value[key]

                    );

            }


            return resolved;

        }



        return value;

    }

}
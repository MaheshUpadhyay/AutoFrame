/**
 * @file ApiLogger.js
 * @description
 * Enterprise API Logger.
 *
 * Responsibilities:
 * - Log API requests
 * - Log API responses
 * - Mask sensitive information
 * - Provide reporting ready API information
 *
 * @author Mahesh Upadhyay
 */


import { Logger }
from "../../logging/Logger.js";


export class ApiLogger {


    /**
     * Sensitive header keys
     */
    static sensitiveKeys = [

        "authorization",
        "token",
        "apikey",
        "api-key",
        "password"

    ];



    /**
     * Log API request
     *
     * @param {object} request
     */
    static logRequest(request) {


        Logger.info(
            "========== API REQUEST =========="
        );


        Logger.info(
            `METHOD : ${request.method}`
        );


        Logger.info(
            `URL    : ${request.url}`
        );


        Logger.info(
            "HEADERS: "
            +
            JSON.stringify(
                this.mask(
                    request.headers
                ),
                null,
                2
            )
        );


        if (request.body) {


            Logger.info(
                "BODY   : "
                +
                JSON.stringify(
                    request.body,
                    null,
                    2
                )
            );

        }


        Logger.info(
            "================================="
        );

    }



    /**
     * Log API response
     *
     * @param {ApiResponse} response
     */
    static async logResponse(response) {


        const info =
            await response.responseInfo();


        Logger.info(
            "========== API RESPONSE ========="
        );


        Logger.info(
            `STATUS : ${info.status}`
        );


        Logger.info(
            `TIME   : ${info.executionTime} ms`
        );


        Logger.info(
            "HEADERS: "
            +
            JSON.stringify(
                this.mask(
                    info.headers
                ),
                null,
                2
            )
        );


        Logger.info(
            "BODY   : "
            +
            JSON.stringify(
                info.body,
                null,
                2
            )
        );


        Logger.info(
            "================================="
        );

    }



    /**
     * Log API error
     *
     * @param {Error} error
     */
    static logError(error) {


        Logger.error(
            "========== API ERROR =========="
        );


        Logger.error(
            error.message
        );


        if (error.stack) {


            Logger.error(
                error.stack
            );

        }


        Logger.error(
            "==============================="
        );

    }



    /**
     * Mask sensitive data
     *
     * @param {object} data
     *
     * @returns {object}
     */
    static mask(data = {}) {


        const cloned =
            {
                ...data
            };


        for (
            const key
            of Object.keys(cloned)
        ) {


            if (
                this.sensitiveKeys.includes(
                    key.toLowerCase()
                )
            ) {


                cloned[key] =
                    "********";

            }

        }


        return cloned;

    }

}
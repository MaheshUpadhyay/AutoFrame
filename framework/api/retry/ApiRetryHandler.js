/**
 * @file ApiRetryHandler.js
 * @description
 * Enterprise API Retry Handler.
 *
 * Responsibilities:
 * - Retry failed API requests
 * - Handle transient failures
 * - Support configurable retry policy
 *
 * @author Mahesh Upadhyay
 */


import { ConfigManager }
from "../../configuration/ConfigManager.js";


import { Logger }
from "../../logging/Logger.js";



export class ApiRetryHandler {


    /**
     * Execute API action with retry
     *
     * @param {Function} action
     *
     * @returns {Promise<any>}
     */
    static async execute(action) {


        const retryConfig =
            ConfigManager.get(
                "api.retry"
            )
            ||
            {};


        const enabled =
            retryConfig.enabled ?? false;


        const retryCount =
            retryConfig.count ?? 0;


        const delay =
            retryConfig.delay ?? 1000;



        if (!enabled) {


            return await action();

        }



        let lastError;



        for (
            let attempt = 0;
            attempt <= retryCount;
            attempt++
        ) {


            try {


                const response =
                    await action();



                if (

                    !this.shouldRetryResponse(
                        response
                    )

                ) {


                    return response;

                }



                Logger.warn(

                    `API retry triggered.
                     Attempt ${attempt + 1}
                     Status ${response.status()}`

                );



            }
            catch(error) {


                lastError =
                    error;



                Logger.warn(

                    `API exception retry.
                     Attempt ${attempt + 1}
                     ${error.message}`

                );

            }



            if (
                attempt < retryCount
            ) {


                await this.wait(
                    delay
                );

            }

        }



        if (lastError) {

            throw lastError;

        }


        return await action();

    }



    /**
     * Check response retry eligibility
     *
     * @param {ApiResponse} response
     *
     * @returns {boolean}
     */
    static shouldRetryResponse(
        response
    ) {


        const retryStatusCodes =
            [

                500,
                502,
                503,
                504

            ];



        return retryStatusCodes.includes(

            response.status()

        );

    }



    /**
     * Wait before retry
     *
     * @param {number} milliseconds
     */
    static async wait(
        milliseconds
    ) {


        return new Promise(

            resolve =>

                setTimeout(
                    resolve,
                    milliseconds
                )

        );

    }

}
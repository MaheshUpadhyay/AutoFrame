/**
 * ============================================================================
 * Enterprise Automation Framework
 * RetryManager
 * ----------------------------------------------------------------------------
 * Generic retry and polling utility.
 *
 * Responsibilities
 * ----------------
 * • Retry failed operations
 * • Retry async actions
 * • Wait until condition succeeds
 * • Configurable attempts and intervals
 *
 * Author : Automated Script
 * ============================================================================
 */


import { Logger } 
from "../logging/Logger.js";


export class RetryManager {


    // ============================================================
    // Retry Operation
    // ============================================================


    /**
     * Retry async operation.
     *
     * @param {Function} action
     * @param {object} options
     */
    static async retry(

        action,

        options = {}

    ) {


        const attempts =
            options.attempts || 3;


        const delay =
            options.delay || 1000;


        const name =
            options.name || "Retry Operation";


        let lastError;



        for (
            let attempt = 1;
            attempt <= attempts;
            attempt++
        ) {


            try {


                Logger.info(

                    `${name} - Attempt ${attempt}/${attempts}`

                );


                return await action();


            }
            catch(error) {


                lastError = error;



                Logger.warn(

                    `${name} failed on attempt ${attempt}: ${error.message}`

                );



                if (
                    attempt < attempts
                ) {


                    await this.sleep(
                        delay
                    );


                }


            }


        }



        Logger.error(

            `${name} failed after ${attempts} attempts`

        );



        throw lastError;


    }




    // ============================================================
    // Retry Until Condition
    // ============================================================


    /**
     * Retry until condition returns true.
     *
     * @param {Function} condition
     * @param {object} options
     */
    static async until(

        condition,

        options = {}

    ) {


        const timeout =
            options.timeout || 30000;


        const interval =
            options.interval || 1000;


        const name =
            options.name || "Condition";



        const endTime =
            Date.now() + timeout;



        while (
            Date.now() < endTime
        ) {


            try {


                const result =
                    await condition();



                if (
                    result === true
                ) {


                    Logger.info(

                        `${name} satisfied`

                    );


                    return true;


                }


            }
            catch(error) {


                Logger.debug(

                    `${name}: ${error.message}`

                );


            }



            await this.sleep(
                interval
            );


        }



        throw new Error(

            `${name} not satisfied within ${timeout} ms`

        );


    }




    // ============================================================
    // Retry With Result Validation
    // ============================================================


    /**
     * Retry until validator passes.
     */
    static async retryUntilResult(

        action,

        validator,

        options = {}

    ) {


        return await this.retry(

            async () => {


                const result =
                    await action();



                if (

                    !validator(result)

                ) {


                    throw new Error(

                        "Validation failed"

                    );


                }



                return result;


            },


            options

        );


    }




    // ============================================================
    // Sleep
    // ============================================================


    static async sleep(
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
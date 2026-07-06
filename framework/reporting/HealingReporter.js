/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Reporting
 * File    : HealingReporter.js
 * Purpose : Attach Self Healing information into Allure Report
 *
 * Author  : Mahesh Upadhyay
 * ============================================================================
 */


import {
    allure
}
from "allure-playwright";



/**
 * Handles self healing reporting.
 *
 * Responsibilities:
 *
 * - Create Allure steps
 * - Attach healing metadata
 * - Store evidence
 *
 * @class HealingReporter
 */
export class HealingReporter {


    /**
     * Attach successful healing details.
     *
     * @param {HealingResult} result
     */
    static async attachHealingResult(
        result
    ){


        if(
            !result
            ||
            !result.isHealed()
        ){

            return;

        }




        const details = {


            status:
                "HEALED",


            element:
                result.elementName,


            originalLocator:
                result.originalLocator,


            healedLocator:
                result.resolvedLocator,


            strategy:
                result.strategy,


            confidence:
                result.confidence,


            timestamp:
                new Date()
                    .toISOString()

        };






        await allure.step(

            `SELF HEALED : ${details.element}`,

            async ()=>{


                await allure.attachment(

                    "Self Healing Details",

                    JSON.stringify(
                        details,
                        null,
                        4
                    ),

                    "application/json"

                );

            }

        );

    }









    /**
     * Attach failed healing attempt.
     *
     * @param {object} details
     */
    static async attachHealingFailure(
        details
    ){


        await allure.step(

            "SELF HEALING FAILED",

            async ()=>{


                await allure.attachment(

                    "Healing Failure",

                    JSON.stringify(
                        details,
                        null,
                        4
                    ),

                    "application/json"

                );

            }

        );

    }

}
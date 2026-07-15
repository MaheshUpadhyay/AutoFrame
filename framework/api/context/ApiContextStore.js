/**
 * @file ApiContextStore.js
 * @description
 * Enterprise API Runtime Context Store.
 *
 * Responsibilities:
 * - Store runtime API values
 * - Support API chaining
 * - Manage tokens and generated identifiers
 * - Share data between API workflow steps
 *
 * @author Mahesh Upadhyay
 */


import { Logger }
from "../../logging/Logger.js";



export class ApiContextStore {


    /**
     * Runtime context storage
     *
     * @type {Map<string, any>}
     */
    static context =
        new Map();



    /**
     * Save value into API context
     *
     * Example:
     *
     * ApiContextStore.save(
     *      "USER_ID",
     *      101
     * )
     *
     * @param {string} key
     * @param {*} value
     */
    static save(
        key,
        value
    ) {


        if (!key) {

            throw new Error(
                "API context key cannot be empty"
            );

        }


        this.context.set(
            key,
            value
        );


        Logger.info(

            `API Context saved : ${key}`

        );

    }




    /**
     * Get value from API context
     *
     * @param {string} key
     *
     * @returns {*}
     */
    static get(
        key
    ) {


        if (
            !this.context.has(
                key
            )
        ) {


            throw new Error(

                `API context value not found : ${key}`

            );

        }



        return this.context.get(
            key
        );

    }




    /**
     * Check key availability
     *
     * @param {string} key
     *
     * @returns {boolean}
     */
    static contains(
        key
    ) {


        return this.context.has(
            key
        );

    }




    /**
     * Remove single context value
     *
     * @param {string} key
     */
    static remove(
        key
    ) {


        this.context.delete(
            key
        );


        Logger.info(

            `API Context removed : ${key}`

        );

    }





    /**
     * Get all context values
     *
     * @returns {object}
     */
    static getAll() {


        return Object.fromEntries(

            this.context

        );

    }





    /**
     * Replace placeholders dynamically
     *
     * Example:
     *
     * /users/{USER_ID}
     *
     * becomes
     *
     * /users/101
     *
     * @param {string} value
     *
     * @returns {string}
     */
    static resolve(
        value
    ) {


        if (
            typeof value !== "string"
        ) {

            return value;

        }



        let resolved =
            value;



        for (
            const [
                key,
                contextValue
            ]
            of this.context.entries()
        ) {


            resolved =
                resolved.replaceAll(

                    `{${key}}`,

                    contextValue

                );

        }



        return resolved;

    }





    /**
     * Clear API context
     */
    static clear() {


        this.context.clear();



        Logger.info(

            "API Context cleared"

        );

    }

}
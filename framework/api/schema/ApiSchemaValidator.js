/**
 * @file ApiSchemaValidator.js
 * @description
 * Enterprise API Schema Validator.
 *
 * Responsibilities:
 * - Validate API JSON schema contracts
 * - Support request/response schema validation
 * - Provide detailed validation errors
 *
 * @author Mahesh Upadhyay
 */


import Ajv
from "ajv";


import fs
from "fs";


import path
from "path";


import { Logger }
from "../../logging/Logger.js";



export class ApiSchemaValidator {


    /**
     * AJV validator instance
     */
    static ajv =
        new Ajv({

            allErrors: true,

            strict: false

        });



    /**
     * Validate object against schema
     *
     * @param {object} data
     * @param {object} schema
     *
     * @returns {boolean}
     */
    static validate(
        data,
        schema
    ) {


        const validator =
            this.ajv.compile(
                schema
            );


        const valid =
            validator(
                data
            );



        if (!valid) {


            const errors =
                this.formatErrors(
                    validator.errors
                );


            Logger.error(
                errors
            );


            throw new Error(

                `API Schema validation failed:\n${errors}`

            );

        }



        Logger.info(
            "API Schema validation passed"
        );


        return true;

    }



    /**
     * Validate API response schema
     *
     * @param {ApiResponse} response
     * @param {object} schema
     */
    static async validateResponse(
        response,
        schema
    ) {


        const body =
            await response.json();


        return this.validate(
            body,
            schema
        );

    }



    /**
     * Validate schema from file
     *
     * @param {ApiResponse} response
     * @param {string} schemaPath
     */
    static async validateResponseFile(
        response,
        schemaPath
    ) {


        const schema =
            this.loadSchema(
                schemaPath
            );


        return await this.validateResponse(

            response,

            schema

        );

    }



    /**
     * Load schema JSON file
     *
     * @param {string} filePath
     *
     * @returns {object}
     */
    static loadSchema(
        filePath
    ) {


        if (
            !fs.existsSync(
                filePath
            )
        ) {


            throw new Error(

                `Schema file not found: ${filePath}`

            );

        }



        const content =
            fs.readFileSync(

                path.resolve(
                    filePath
                ),

                "utf-8"

            );



        return JSON.parse(
            content
        );

    }



    /**
     * Format AJV validation errors
     *
     * @param {Array} errors
     *
     * @returns {string}
     */
    static formatErrors(
        errors = []
    ) {


        return errors

            .map(

                error =>

                    `${error.instancePath}
                    ${error.message}`

            )

            .join(
                "\n"
            );

    }

}
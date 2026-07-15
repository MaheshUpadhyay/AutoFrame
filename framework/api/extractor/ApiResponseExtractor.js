/**
 * @file ApiResponseExtractor.js
 * @description
 * Enterprise API Response Extractor.
 *
 * Responsibilities:
 * - Extract values from API responses
 * - Save runtime values into ApiContextStore
 * - Support JSONPath expressions
 * - Support dot notation
 * - Support multiple extractions
 *
 * @author Mahesh Upadhyay
 */

import { JSONPath } from "jsonpath-plus";

import { ApiContextStore }
from "../context/ApiContextStore.js";

import { Logger }
from "../../logging/Logger.js";


export class ApiResponseExtractor {

    /**
     * Extract multiple values from response
     *
     * Example:
     *
     * {
     *     USER_ID : "$.id",
     *     EMAIL   : "$.email"
     * }
     *
     * @param {ApiResponse} response
     * @param {Object<string,string>} mappings
     */
    static async extract(
        response,
        mappings = {}
    ) {

        const body =
            await response.json();

        for (const [contextKey, expression] of Object.entries(mappings)) {

            const value =
                this.extractValue(
                    body,
                    expression
                );

            ApiContextStore.save(
                contextKey,
                value
            );

            Logger.info(
                `API Context Extracted : ${contextKey} = ${JSON.stringify(value)}`
            );
        }

    }

    /**
     * Extract single value
     *
     * @param {ApiResponse} response
     * @param {string} contextKey
     * @param {string} expression
     */
    static async extractOne(
        response,
        contextKey,
        expression
    ) {

        await this.extract(
            response,
            {
                [contextKey]: expression
            }
        );

    }

    /**
     * Extract value using JSONPath or dot notation
     *
     * @param {Object} body
     * @param {string} expression
     *
     * @returns {*}
     */
    static extractValue(
        body,
        expression
    ) {

        if (!expression) {

            throw new Error(
                "Extraction expression cannot be empty."
            );

        }

        // JSONPath
        if (expression.startsWith("$")) {

            const result =
                JSONPath({

                    path: expression,

                    json: body

                });

            if (!result.length) {

                throw new Error(
                    `Unable to extract value using JSONPath: ${expression}`
                );

            }

            return result.length === 1
                ? result[0]
                : result;

        }

        // Dot notation
        const value =
            expression
                .split(".")
                .reduce(
                    (current, key) => current?.[key],
                    body
                );

        if (value === undefined) {

            throw new Error(
                `Unable to extract value: ${expression}`
            );

        }

        return value;

    }

}
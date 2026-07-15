/**
 * @file ApiHeaders.js
 * @description
 * Enterprise API Header Manager.
 *
 * Responsibilities:
 * - Manage default API headers
 * - Merge runtime headers
 * - Support authentication headers
 * - Provide reusable header utilities
 *
 * @author Mahesh Upadhyay
 */


import { ConfigManager }
from "../../configuration/ConfigManager.js";


export class ApiHeaders {


    /**
     * Default headers cache
     *
     * @type {object}
     */
    static defaultHeaders = {};



    /**
     * Initialize headers from configuration
     *
     * Example config:
     *
     * api:
     * {
     *    headers:
     *    {
     *       Content-Type: application/json
     *    }
     * }
     *
     */
    static initialize() {


        const configuredHeaders =
            ConfigManager.get(
                "api.headers"
            );


        this.defaultHeaders =
            configuredHeaders || {};

    }



    /**
     * Builds final headers
     *
     * Priority:
     *
     * Runtime headers
     * override
     * Default headers
     *
     * @param {object} headers
     *
     * @returns {object}
     */
    static build(headers = {}) {


        return {

            ...this.defaultHeaders,

            ...headers

        };

    }



    /**
     * Add single header
     *
     * @param {string} key
     * @param {string} value
     */
    static add(key, value) {


        this.defaultHeaders[key] =
            value;

    }



    /**
     * Add multiple headers
     *
     * @param {object} headers
     */
    static addAll(headers = {}) {


        this.defaultHeaders = {

            ...this.defaultHeaders,

            ...headers

        };

    }



    /**
     * Remove header
     *
     * @param {string} key
     */
    static remove(key) {


        delete this.defaultHeaders[key];

    }



    /**
     * Clear all headers
     */
    static clear() {


        this.defaultHeaders = {};

    }



    /**
     * Check if header exists
     *
     * @param {string} key
     *
     * @returns {boolean}
     */
    static contains(key) {


        return Object.prototype
            .hasOwnProperty
            .call(
                this.defaultHeaders,
                key
            );

    }



    /**
     * Get header value
     *
     * @param {string} key
     *
     * @returns {string}
     */
    static get(key) {


        return this.defaultHeaders[key];

    }



    /**
     * Get all headers
     *
     * @returns {object}
     */
    static getAll() {


        return {

            ...this.defaultHeaders

        };

    }



    /**
     * Add content type
     *
     * @param {string} value
     */
    static contentType(
        value = "application/json"
    ) {


        this.add(
            "Content-Type",
            value
        );

    }



    /**
     * Add Accept header
     *
     * @param {string} value
     */
    static accept(
        value = "application/json"
    ) {


        this.add(
            "Accept",
            value
        );

    }

}
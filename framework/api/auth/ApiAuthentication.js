/**
 * @file ApiAuthentication.js
 * @description
 * Enterprise API Authentication Manager.
 *
 * Responsibilities:
 * - Manage API authentication
 * - Generate authentication headers
 * - Support Bearer Token
 * - Support Basic Authentication
 * - Support API Key authentication
 *
 * @author Mahesh Upadhyay
 */


import { Buffer }
from "node:buffer";


export class ApiAuthentication {


    /**
     * Authentication headers
     *
     * @type {object}
     */
    static authHeaders = {};



    /**
     * Apply Bearer token authentication
     *
     * @param {string} token
     */
    static bearerToken(token) {


        if (!token) {

            throw new Error(
                "Bearer token cannot be empty"
            );

        }


        this.authHeaders = {

            Authorization:
                `Bearer ${token}`

        };

    }



    /**
     * Apply Basic authentication
     *
     * @param {string} username
     * @param {string} password
     */
    static basicAuth(
        username,
        password
    ) {


        if (
            !username ||
            !password
        ) {

            throw new Error(
                "Username/password required for Basic Auth"
            );

        }


        const encoded =

            Buffer.from(
                `${username}:${password}`
            )
            .toString(
                "base64"
            );


        this.authHeaders = {

            Authorization:
                `Basic ${encoded}`

        };

    }



    /**
     * Apply API key authentication
     *
     * Example:
     *
     * x-api-key : abc123
     *
     * @param {string} key
     * @param {string} value
     */
    static apiKey(
        key,
        value
    ) {


        if (
            !key ||
            !value
        ) {

            throw new Error(
                "API key name/value required"
            );

        }


        this.authHeaders = {

            [key]:
                value

        };

    }



    /**
     * Apply custom authentication headers
     *
     * @param {object} headers
     */
    static custom(headers = {}) {


        this.authHeaders = {

            ...headers

        };

    }



    /**
     * Get authentication headers
     *
     * @returns {object}
     */
    static getHeaders() {


        return {

            ...this.authHeaders

        };

    }



    /**
     * Merge authentication with request headers
     *
     * Authentication headers override duplicates
     *
     * @param {object} headers
     *
     * @returns {object}
     */
    static apply(headers = {}) {


        return {

            ...headers,

            ...this.authHeaders

        };

    }



    /**
     * Remove authentication
     */
    static clear() {


        this.authHeaders = {};

    }



    /**
     * Checks authentication enabled
     *
     * @returns {boolean}
     */
    static hasAuthentication() {


        return (

            Object.keys(
                this.authHeaders
            )
            .length > 0

        );

    }

}
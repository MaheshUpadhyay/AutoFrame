/**
 * @file ApiClient.js
 * @description
 * Enterprise API Client facade.
 *
 * Responsibilities:
 * - Public entry point for API automation
 * - Provides HTTP methods
 * - Hides Playwright API implementation
 * - Maintains Selenium-style framework abstraction
 *
 * @author Mahesh Upadhyay
 */


import { ApiRequest }
from "./ApiRequest.js";



export class ApiClient {


    /**
     * Execute GET request
     *
     * @param {string} endpoint
     * @param {object} options
     *
     * @returns {Promise<ApiResponse>}
     */
    static async get(
        endpoint,
        options = {}
    ) {


        return await ApiRequest.execute(

            "GET",

            endpoint,

            options

        );

    }



    /**
     * Execute POST request
     *
     * @param {string} endpoint
     * @param {object} body
     * @param {object} options
     *
     * @returns {Promise<ApiResponse>}
     */
    static async post(
        endpoint,
        body = {},
        options = {}
    ) {


        return await ApiRequest.execute(

            "POST",

            endpoint,


            {

                ...options,

                body

            }

        );

    }



    /**
     * Execute PUT request
     *
     * @param {string} endpoint
     * @param {object} body
     * @param {object} options
     *
     * @returns {Promise<ApiResponse>}
     */
    static async put(
        endpoint,
        body = {},
        options = {}
    ) {


        return await ApiRequest.execute(

            "PUT",

            endpoint,


            {

                ...options,

                body

            }

        );

    }



    /**
     * Execute PATCH request
     *
     * @param {string} endpoint
     * @param {object} body
     * @param {object} options
     *
     * @returns {Promise<ApiResponse>}
     */
    static async patch(
        endpoint,
        body = {},
        options = {}
    ) {


        return await ApiRequest.execute(

            "PATCH",

            endpoint,


            {

                ...options,

                body

            }

        );

    }



    /**
     * Execute DELETE request
     *
     * @param {string} endpoint
     * @param {object} options
     *
     * @returns {Promise<ApiResponse>}
     */
    static async delete(
        endpoint,
        options = {}
    ) {


        return await ApiRequest.execute(

            "DELETE",

            endpoint,

            options

        );

    }



    /**
     * Cleanup API resources
     */
    static async dispose() {


        await ApiRequest.dispose();

    }

}
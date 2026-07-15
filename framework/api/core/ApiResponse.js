/**
 * @file ApiResponse.js
 * @description
 * Enterprise API Response wrapper.
 *
 * Responsibilities:
 * - Encapsulates Playwright APIResponse
 * - Provides reusable response utilities
 * - Stores API execution metadata
 * - Removes direct Playwright dependency from tests
 *
 * @author Mahesh Upadhyay
 */


export class ApiResponse {


    /**
     * Creates API response wrapper
     *
     * @param {APIResponse} response Playwright API response
     * @param {object} metadata API execution metadata
     */
    constructor(response, metadata = {}) {


        if (!response) {

            throw new Error(
                "API Response object cannot be null"
            );

        }


        this.response = response;


        this.metadata = {

            method:
                metadata.method || "",

            url:
                metadata.url || "",

            requestHeaders:
                metadata.requestHeaders || {},

            requestBody:
                metadata.requestBody || null,

            executionTime:
                metadata.executionTime || 0

        };


        this.cachedBody = null;

    }



    /**
     * Returns response status code
     *
     * @returns {number}
     */
    status() {

        return this.response.status();

    }



    /**
     * Returns status text
     *
     * @returns {string}
     */
    statusText() {

        return this.response.statusText();

    }



    /**
     * Returns response headers
     *
     * @returns {object}
     */
    headers() {

        return this.response.headers();

    }



    /**
     * Returns response body as JSON
     *
     * @returns {Promise<object>}
     */
    async json() {


        if (this.cachedBody) {

            return this.cachedBody;

        }


        this.cachedBody =
            await this.response.json();


        return this.cachedBody;

    }



    /**
     * Returns response as text
     *
     * @returns {Promise<string>}
     */
    async text() {

        return await this.response.text();

    }



    /**
     * Returns raw response buffer
     *
     * @returns {Promise<Buffer>}
     */
    async body() {

        return await this.response.body();

    }



    /**
     * Checks successful response
     *
     * @returns {boolean}
     */
    ok() {

        return this.response.ok();

    }



    /**
     * Checks client error
     *
     * @returns {boolean}
     */
    isClientError() {


        return (
            this.status() >= 400 &&
            this.status() < 500
        );

    }



    /**
     * Checks server error
     *
     * @returns {boolean}
     */
    isServerError() {


        return (
            this.status() >= 500
        );

    }



    /**
     * Returns API execution time
     *
     * @returns {number}
     */
    executionTime() {

        return this.metadata.executionTime;

    }



    /**
     * Returns request information
     *
     * @returns {object}
     */
    requestInfo() {


        return {

            method:
                this.metadata.method,

            url:
                this.metadata.url,

            headers:
                this.metadata.requestHeaders,

            body:
                this.metadata.requestBody

        };

    }



    /**
     * Returns complete response information
     *
     * Used for logging/reporting
     *
     * @returns {Promise<object>}
     */
    async responseInfo() {


        let body;


        try {

            body =
                await this.json();

        }
        catch {

            body =
                await this.text();

        }


        return {

            status:
                this.status(),

            statusText:
                this.statusText(),

            headers:
                this.headers(),

            body,

            executionTime:
                this.executionTime()

        };

    }

}
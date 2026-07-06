/**
 * ============================================================================
 * Enterprise Automation Framework
 * ApiClient
 * ----------------------------------------------------------------------------
 * Lightweight wrapper around Playwright APIRequestContext.
 *
 * Responsibilities
 * ----------------
 * • Execute HTTP requests
 * • Manage Base URL
 * • Manage Default Headers
 * • Manage Authentication
 *
 * No assertions.
 * No reporting.
 * No validation.
 *
 * Author : Automated Script
 * ============================================================================
 */

export class ApiClient {

    #request;

    #baseUrl = "";

    #defaultHeaders = {};

    /**
     * @param {import("@playwright/test").APIRequestContext} request
     */
    constructor(request) {

        if (!request) {
            throw new Error(
                "APIRequestContext cannot be null."
            );
        }

        this.#request = request;

    }

    // ============================================================
    // Configuration
    // ============================================================

    /**
     * Sets Base URL.
     *
     * @param {string} url
     */
    setBaseUrl(url) {

        this.#baseUrl = url;

    }

    /**
     * Returns Base URL.
     *
     * @returns {string}
     */
    getBaseUrl() {

        return this.#baseUrl;

    }

    /**
     * Adds default header.
     *
     * @param {string} name
     * @param {string} value
     */
    setDefaultHeader(name, value) {

        this.#defaultHeaders[name] = value;

    }

    /**
     * Removes default header.
     *
     * @param {string} name
     */
    removeDefaultHeader(name) {

        delete this.#defaultHeaders[name];

    }

    /**
     * Removes all default headers.
     */
    clearDefaultHeaders() {

        this.#defaultHeaders = {};

    }

    /**
     * Returns default headers.
     *
     * @returns {Object}
     */
    getDefaultHeaders() {

        return {
            ...this.#defaultHeaders
        };

    }

    // ============================================================
    // Authentication
    // ============================================================

    /**
     * Sets Bearer Token.
     *
     * @param {string} token
     */
    setBearerToken(token) {

        this.setDefaultHeader(
            "Authorization",
            `Bearer ${token}`
        );

    }

    /**
     * Sets Basic Authentication.
     *
     * @param {string} username
     * @param {string} password
     */
    setBasicAuthentication(username, password) {

        const encoded = Buffer
            .from(`${username}:${password}`)
            .toString("base64");

        this.setDefaultHeader(
            "Authorization",
            `Basic ${encoded}`
        );

    }

    /**
     * Sets API Key.
     *
     * @param {string} header
     * @param {string} key
     */
    setApiKey(header, key) {

        this.setDefaultHeader(
            header,
            key
        );

    }

    // ============================================================
    // Internal
    // ============================================================

    buildUrl(endpoint) {

        if (!this.#baseUrl) {
            return endpoint;
        }

        return `${this.#baseUrl}${endpoint}`;

    }

    buildOptions(options = {}) {

        return {

            ...options,

            headers: {

                ...this.#defaultHeaders,

                ...(options.headers || {})

            }

        };

    }

    // ============================================================
    // HTTP Methods
    // ============================================================

    async get(endpoint, options = {}) {

        return await this.#request.get(
            this.buildUrl(endpoint),
            this.buildOptions(options)
        );

    }

    async post(endpoint, data, options = {}) {

        return await this.#request.post(
            this.buildUrl(endpoint),
            {
                ...this.buildOptions(options),
                data
            }
        );

    }

    async put(endpoint, data, options = {}) {

        return await this.#request.put(
            this.buildUrl(endpoint),
            {
                ...this.buildOptions(options),
                data
            }
        );

    }

    async patch(endpoint, data, options = {}) {

        return await this.#request.patch(
            this.buildUrl(endpoint),
            {
                ...this.buildOptions(options),
                data
            }
        );

    }

    async delete(endpoint, options = {}) {

        return await this.#request.delete(
            this.buildUrl(endpoint),
            this.buildOptions(options)
        );

    }

    async head(endpoint, options = {}) {

        return await this.#request.head(
            this.buildUrl(endpoint),
            this.buildOptions(options)
        );

    }

    async options(endpoint, options = {}) {

        return await this.#request.fetch(
            this.buildUrl(endpoint),
            {
                ...this.buildOptions(options),
                method: "OPTIONS"
            }
        );

    }

}
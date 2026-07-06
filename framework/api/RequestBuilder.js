/**
 * ============================================================================
 * Enterprise Automation Framework
 * RequestBuilder
 * ----------------------------------------------------------------------------
 * Fluent builder for constructing HTTP requests.
 *
 * Responsibilities
 * ----------------
 * • Build endpoint
 * • Build headers
 * • Build query parameters
 * • Build path parameters
 * • Build request body
 * • Build multipart/form-data
 * • Build timeout
 *
 * Does NOT execute requests.
 *
 * Author : Automated Script
 * ============================================================================
 */

export class RequestBuilder {

    #endpoint = "";

    #method = "GET";

    #headers = {};

    #queryParameters = {};

    #pathParameters = {};

    #body = undefined;

    #multipart = undefined;

    #form = undefined;

    #timeout = undefined;

    // ============================================================
    // Request
    // ============================================================

    /**
     * Sets endpoint.
     *
     * @param {string} endpoint
     * @returns {RequestBuilder}
     */
    endpoint(endpoint) {

        this.#endpoint = endpoint;

        return this;

    }

    /**
     * Sets HTTP method.
     *
     * @param {string} method
     * @returns {RequestBuilder}
     */
    method(method) {

        this.#method = method.toUpperCase();

        return this;

    }

    // ============================================================
    // Headers
    // ============================================================

    /**
     * Adds a request header.
     *
     * @param {string} name
     * @param {string} value
     * @returns {RequestBuilder}
     */
    header(name, value) {

        this.#headers[name] = value;

        return this;

    }

    /**
     * Adds multiple headers.
     *
     * @param {Object} headers
     * @returns {RequestBuilder}
     */
    headers(headers) {

        Object.assign(this.#headers, headers);

        return this;

    }

    // ============================================================
    // Query Parameters
    // ============================================================

    /**
     * Adds query parameter.
     *
     * @param {string} name
     * @param {*} value
     * @returns {RequestBuilder}
     */
    query(name, value) {

        this.#queryParameters[name] = value;

        return this;

    }

    /**
     * Adds multiple query parameters.
     *
     * @param {Object} queries
     * @returns {RequestBuilder}
     */
    queries(queries) {

        Object.assign(this.#queryParameters, queries);

        return this;

    }

    // ============================================================
    // Path Parameters
    // ============================================================

    /**
     * Adds path parameter.
     *
     * @param {string} name
     * @param {*} value
     * @returns {RequestBuilder}
     */
    path(name, value) {

        this.#pathParameters[name] = value;

        return this;

    }

    /**
     * Adds multiple path parameters.
     *
     * @param {Object} params
     * @returns {RequestBuilder}
     */
    paths(params) {

        Object.assign(this.#pathParameters, params);

        return this;

    }

    // ============================================================
    // Body
    // ============================================================

    /**
     * Sets request body.
     *
     * @param {*} body
     * @returns {RequestBuilder}
     */
    body(body) {

        this.#body = body;

        return this;

    }

    /**
     * Alias for JSON body.
     *
     * @param {Object} body
     * @returns {RequestBuilder}
     */
    json(body) {

        this.#body = body;

        this.header("Content-Type", "application/json");

        return this;

    }

    /**
     * Sets multipart payload.
     *
     * @param {Object} multipart
     * @returns {RequestBuilder}
     */
    multipart(multipart) {

        this.#multipart = multipart;

        return this;

    }

    /**
     * Sets form-urlencoded payload.
     *
     * @param {Object} form
     * @returns {RequestBuilder}
     */
    form(form) {

        this.#form = form;

        return this;

    }

    /**
     * Sets timeout.
     *
     * @param {number} milliseconds
     * @returns {RequestBuilder}
     */
    timeout(milliseconds) {

        this.#timeout = milliseconds;

        return this;

    }

    // ============================================================
    // Utilities
    // ============================================================

    /**
     * Clears builder state.
     *
     * @returns {RequestBuilder}
     */
    reset() {

        this.#endpoint = "";
        this.#method = "GET";
        this.#headers = {};
        this.#queryParameters = {};
        this.#pathParameters = {};
        this.#body = undefined;
        this.#multipart = undefined;
        this.#form = undefined;
        this.#timeout = undefined;

        return this;

    }

    /**
     * Builds immutable request object.
     *
     * @returns {Object}
     */
    build() {

        return Object.freeze({

            endpoint: this.#endpoint,

            method: this.#method,

            headers: { ...this.#headers },

            queryParameters: { ...this.#queryParameters },

            pathParameters: { ...this.#pathParameters },

            body: this.#body,

            multipart: this.#multipart,

            form: this.#form,

            timeout: this.#timeout

        });

    }

}
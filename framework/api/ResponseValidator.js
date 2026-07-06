/**
 * ============================================================================
 * Enterprise Automation Framework
 * ResponseValidator
 * ----------------------------------------------------------------------------
 * Provides reusable assertions for validating Playwright API responses.
 *
 * Responsibilities
 * ----------------
 * • Status validation
 * • Header validation
 * • Response time validation
 * • JSON body validation
 * • JSON Path validation
 * • Text validation
 *
 * Does NOT execute requests.
 *
 * Author : Automated Script
 * ============================================================================
 */

import { expect } from "@playwright/test";

export class ResponseValidator {

    // ============================================================
    // Status Validation
    // ============================================================

    /**
     * Verify HTTP status code.
     *
     * @param {import("@playwright/test").APIResponse} response
     * @param {number} expected
     */
    async verifyStatus(response, expected) {

        expect(response.status()).toBe(expected);

    }

    /**
     * Verify successful response (2xx).
     *
     * @param {import("@playwright/test").APIResponse} response
     */
    async verifySuccess(response) {

        expect(response.ok()).toBe(true);

    }

    /**
     * Verify failure response.
     *
     * @param {import("@playwright/test").APIResponse} response
     */
    async verifyFailure(response) {

        expect(response.ok()).toBe(false);

    }

    // ============================================================
    // Header Validation
    // ============================================================

    /**
     * Verify response header.
     *
     * @param {import("@playwright/test").APIResponse} response
     * @param {string} name
     * @param {string|RegExp} expected
     */
    async verifyHeader(response, name, expected) {

        const actual = response.headers()[name.toLowerCase()];

        if (expected instanceof RegExp) {

            expect(actual).toMatch(expected);

        } else {

            expect(actual).toBe(expected);

        }

    }

    /**
     * Verify Content-Type header.
     *
     * @param {import("@playwright/test").APIResponse} response
     * @param {string} expected
     */
    async verifyContentType(response, expected) {

        await this.verifyHeader(
            response,
            "content-type",
            new RegExp(expected, "i")
        );

    }

    // ============================================================
    // JSON Validation
    // ============================================================

    /**
     * Verify JSON property.
     *
     * Example:
     * verifyJson(response, "name", "John")
     *
     * @param {import("@playwright/test").APIResponse} response
     * @param {string} property
     * @param {*} expected
     */
    async verifyJson(response, property, expected) {

        const json = await response.json();

        expect(json[property]).toEqual(expected);

    }

    /**
     * Verify complete JSON object.
     *
     * @param {import("@playwright/test").APIResponse} response
     * @param {Object} expected
     */
    async verifyJsonObject(response, expected) {

        const json = await response.json();

        expect(json).toEqual(expected);

    }

    /**
     * Verify JSON contains property.
     *
     * @param {import("@playwright/test").APIResponse} response
     * @param {string} property
     */
    async verifyJsonProperty(response, property) {

        const json = await response.json();

        expect(json).toHaveProperty(property);

    }

    // ============================================================
    // Text Validation
    // ============================================================

    /**
     * Verify response body contains text.
     *
     * @param {import("@playwright/test").APIResponse} response
     * @param {string} expected
     */
    async verifyContains(response, expected) {

        const text = await response.text();

        expect(text).toContain(expected);

    }

    /**
     * Verify exact response body.
     *
     * @param {import("@playwright/test").APIResponse} response
     * @param {string} expected
     */
    async verifyText(response, expected) {

        const text = await response.text();

        expect(text).toBe(expected);

    }

    // ============================================================
    // Response Time
    // ============================================================

    /**
     * Verify response completed within expected duration.
     *
     * NOTE:
     * Requires caller to provide measured duration.
     *
     * @param {number} duration
     * @param {number} maximum
     */
    verifyResponseTime(duration, maximum) {

        expect(duration).toBeLessThanOrEqual(maximum);

    }

}
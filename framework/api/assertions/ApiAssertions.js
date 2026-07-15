/**
 * @file ApiAssertions.js
 * @description
 * Enterprise API Assertion Library.
 *
 * Responsibilities:
 * - Provide reusable API validations
 * - Hide Playwright assertions
 * - Standardize assertion messages
 *
 * @author Mahesh Upadhyay
 */


import { expect }
from "@playwright/test";



export class ApiAssertions {


    /**
     * Validate response status code
     *
     * @param {ApiResponse} response
     * @param {number} expectedStatus
     */
    static shouldHaveStatus(
        response,
        expectedStatus
    ) {


        expect(

            response.status(),

            `Expected API status ${expectedStatus}
             but received ${response.status()}`

        )
        .toBe(
            expectedStatus
        );

    }



    /**
     * Validate successful response
     *
     * @param {ApiResponse} response
     */
    static shouldBeSuccess(response) {


        expect(

            response.ok(),

            "Expected API response to be successful"

        )
        .toBeTruthy();

    }



    /**
     * Validate response header
     *
     * @param {ApiResponse} response
     * @param {string} headerName
     * @param {string} expectedValue
     */
    static shouldHaveHeader(
        response,
        headerName,
        expectedValue
    ) {


        const headers =
            response.headers();


        expect(

            headers[headerName.toLowerCase()]

        )
        .toBe(
            expectedValue
        );

    }



    /**
     * Validate response contains field
     *
     * @param {ApiResponse} response
     * @param {string} field
     */
    static async shouldHaveField(
        response,
        field
    ) {


        const body =
            await response.json();


        expect(

            body,

            `Response does not contain field ${field}`

        )
        .toHaveProperty(
            field
        );

    }



    /**
     * Validate field value
     *
     * @param {ApiResponse} response
     * @param {string} field
     * @param {*} expectedValue
     */
    static async shouldHaveValue(
        response,
        field,
        expectedValue
    ) {


        const body =
            await response.json();


        expect(

            body[field]

        )
        .toBe(
            expectedValue
        );

    }



    /**
     * Validate response body contains value
     *
     * @param {ApiResponse} response
     * @param {string} value
     */
    static async shouldContain(
        response,
        value
    ) {


        const text =
            await response.text();


        expect(
            text
        )
        .toContain(
            value
        );

    }



    /**
     * Validate response time
     *
     * @param {ApiResponse} response
     * @param {number} maxMilliseconds
     */
    static shouldRespondWithin(
        response,
        maxMilliseconds
    ) {


        expect(

            response.executionTime(),

            `API response time exceeded ${maxMilliseconds} ms`

        )
        .toBeLessThanOrEqual(
            maxMilliseconds
        );

    }



    /**
     * Validate response is array
     *
     * @param {ApiResponse} response
     */
    static async shouldBeArray(
        response
    ) {


        const body =
            await response.json();


        expect(

            Array.isArray(body)

        )
        .toBeTruthy();

    }



    /**
     * Validate array size
     *
     * @param {ApiResponse} response
     * @param {number} size
     */
    static async shouldHaveArraySize(
        response,
        size
    ) {


        const body =
            await response.json();


        expect(
            body.length
        )
        .toBe(
            size
        );

    }



    /**
     * Validate response is not empty
     *
     * @param {ApiResponse} response
     */
    static async shouldNotBeEmpty(
        response
    ) {


        const body =
            await response.json();


        expect(

            Object.keys(body).length

        )
        .toBeGreaterThan(
            0
        );

    }

}
/**
 * ============================================================================
 * Enterprise Automation Framework
 * ApiAssertions
 * ----------------------------------------------------------------------------
 * Common API assertion wrapper.
 *
 * Author : Automated Script
 * ============================================================================
 */


import { expect } from "@playwright/test";


export class ApiAssertions {


    // ============================================================
    // Status
    // ============================================================


    static status(
        response,
        expected
    ) {


        expect(
            response.status()
        )
        .toBe(expected);


    }



    static success(
        response
    ) {


        expect(
            response.status()
        )
        .toBeGreaterThanOrEqual(200);


        expect(
            response.status()
        )
        .toBeLessThan(300);


    }



    static clientError(
        response
    ) {


        expect(
            response.status()
        )
        .toBeGreaterThanOrEqual(400);


        expect(
            response.status()
        )
        .toBeLessThan(500);


    }



    static serverError(
        response
    ) {


        expect(
            response.status()
        )
        .toBeGreaterThanOrEqual(500);


    }



    // ============================================================
    // Response Body
    // ============================================================


    static fieldEquals(
        body,
        field,
        expected
    ) {


        expect(
            body[field]
        )
        .toEqual(expected);


    }



    static containsField(
        body,
        field
    ) {


        expect(
            body
        )
        .toHaveProperty(field);


    }



    static containsValue(
        body,
        value
    ) {


        expect(
            JSON.stringify(body)
        )
        .toContain(value);


    }



    // ============================================================
    // Array
    // ============================================================


    static arraySize(
        array,
        size
    ) {


        expect(array.length)
            .toBe(size);


    }



    static arrayNotEmpty(
        array
    ) {


        expect(array.length)
            .toBeGreaterThan(0);


    }



    // ============================================================
    // Headers
    // ============================================================


    static headerExists(
        response,
        header
    ) {


        expect(
            response.headers()
        )
        .toHaveProperty(header);


    }



    static headerEquals(
        response,
        header,
        value
    ) {


        expect(
            response.headers()[header]
        )
        .toBe(value);


    }


}
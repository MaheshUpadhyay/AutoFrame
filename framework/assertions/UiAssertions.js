/**
 * ============================================================================
 * Enterprise Automation Framework
 * UiAssertions
 * ----------------------------------------------------------------------------
 * Common UI assertion wrapper on top of Playwright expect.
 *
 * Author : Automated Script
 * ============================================================================
 */


import { expect } from "@playwright/test";


export class UiAssertions {


    // ============================================================
    // Visibility
    // ============================================================


    static async visible(locator, message = "") {


        await expect(
            locator,
            message
        ).toBeVisible();


    }



    static async hidden(locator, message = "") {


        await expect(
            locator,
            message
        ).toBeHidden();


    }



    // ============================================================
    // Enable / Disable
    // ============================================================


    static async enabled(locator) {


        await expect(
            locator
        ).toBeEnabled();


    }



    static async disabled(locator) {


        await expect(
            locator
        ).toBeDisabled();


    }



    // ============================================================
    // Text Assertions
    // ============================================================


    static async textEquals(
        locator,
        expected
    ) {


        await expect(locator)
            .toHaveText(expected);


    }



    static async containsText(
        locator,
        expected
    ) {


        await expect(locator)
            .toContainText(expected);


    }



    // ============================================================
    // Value Assertions
    // ============================================================


    static async valueEquals(
        locator,
        expected
    ) {


        await expect(locator)
            .toHaveValue(expected);


    }



    // ============================================================
    // Attribute
    // ============================================================


    static async attributeEquals(
        locator,
        attribute,
        expected
    ) {


        await expect(locator)
            .toHaveAttribute(
                attribute,
                expected
            );


    }



    // ============================================================
    // URL / Title
    // ============================================================


    static async urlContains(
        page,
        value
    ) {


        await expect(page)
            .toHaveURL(
                new RegExp(value)
            );


    }



    static async titleEquals(
        page,
        title
    ) {


        await expect(page)
            .toHaveTitle(title);


    }



    // ============================================================
    // Generic Assertions
    // ============================================================


    static equals(
        actual,
        expected
    ) {


        expect(actual)
            .toEqual(expected);


    }



    static notEquals(
        actual,
        expected
    ) {


        expect(actual)
            .not
            .toEqual(expected);


    }



    static true(
        condition
    ) {


        expect(condition)
            .toBeTruthy();


    }



    static false(
        condition
    ) {


        expect(condition)
            .toBeFalsy();


    }


}
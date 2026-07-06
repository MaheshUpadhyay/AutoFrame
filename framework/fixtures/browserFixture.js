/**
 * ============================================================================
 * Enterprise Automation Framework
 * Browser Fixture
 * ----------------------------------------------------------------------------
 * Extends Playwright's built-in test fixture with enterprise browser settings.
 *
 * Responsibilities
 * ----------------
 * • Browser Context Creation
 * • Browser Configuration
 * • Trace Support
 * • Video Support
 * • Screenshot Support
 *
 * Author : Automated Script
 * ============================================================================
 */

import { test as base } from "@playwright/test";

export const test = base.extend({

    context: async ({ browser }, use) => {

        const context = await browser.newContext({

            viewport: {
                width: 1920,
                height: 1080
            },

            ignoreHTTPSErrors: true,

            acceptDownloads: true,

            javaScriptEnabled: true,

            locale: "en-US",

            timezoneId: "Asia/Kolkata"

        });

        await use(context);

        await context.close();

    },

    page: async ({ context }, use) => {

        const page = await context.newPage();

        await use(page);

        await page.close();

    }

});

export { expect } from "@playwright/test";
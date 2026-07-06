/**
 * ============================================================================
 * Enterprise Automation Framework
 * Page Fixture
 * ----------------------------------------------------------------------------
 * Provides a single PageManager instance to all tests.
 *
 * Responsibilities
 * ----------------
 * • Create PageManager
 * • Inject into Playwright fixture
 *
 * Author : Automated Script
 * ============================================================================
 */

import { test as base, expect } from "./browserFixture.js";
import { PageManager } from "../core/PageManager.js";

export const test = base.extend({

    pages: async ({ page }, use) => {

        const pageManager = new PageManager(page);

        await use(pageManager);

    }

});

export { expect };
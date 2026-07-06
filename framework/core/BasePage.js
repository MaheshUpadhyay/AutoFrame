/**
 * ============================================================================
 * Enterprise Automation Framework
 * BasePage
 * ----------------------------------------------------------------------------
 * Base class for all Page Objects.
 *
 * Responsibilities
 * ----------------
 * • Page Navigation
 * • Browser Navigation
 * • Wait Operations
 * • Screenshot
 * • Page Information
 * • Browser Utilities
 *
 * Every Page Object should extend this class.
 *
 * Author : Automated Script
 * ============================================================================
 */

export class BasePage {

    #page;

    /**
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {

        if (!page) {
            throw new Error("Page cannot be null.");
        }

        this.#page = page;

    }

    // ============================================================
    // Properties
    // ============================================================

    /**
     * Returns Playwright Page.
     *
     * @returns {import("@playwright/test").Page}
     */
    getPage() {

        return this.#page;

    }

    /**
     * Returns Browser Context.
     *
     * @returns {import("@playwright/test").BrowserContext}
     */
    getContext() {

        return this.#page.context();

    }

    /**
     * Returns Browser.
     *
     * @returns {Promise<import("@playwright/test").Browser>}
     */
    async getBrowser() {

        return this.#page.context().browser();

    }

    // ============================================================
    // Navigation
    // ============================================================

    /**
     * Navigate to URL.
     *
     * @param {string} url
     * @param {object} options
     */
    async navigate(url, options = {}) {

        await this.#page.goto(url, options);

    }

    /**
     * Reload current page.
     */
    async refresh() {

        await this.#page.reload();

    }

    /**
     * Navigate back.
     */
    async back() {

        await this.#page.goBack();

    }

    /**
     * Navigate forward.
     */
    async forward() {

        await this.#page.goForward();

    }

    // ============================================================
    // Wait Methods
    // ============================================================

    /**
     * Wait for page load.
     *
     * @param {"load"|"domcontentloaded"|"networkidle"} state
     */
    async waitForLoad(state = "load") {

        await this.#page.waitForLoadState(state);

    }

    /**
     * Wait for URL.
     *
     * @param {string|RegExp} url
     * @param {number} timeout
     */
    async waitForUrl(url, timeout = 30000) {

        await this.#page.waitForURL(url, {
            timeout
        });

    }

    /**
     * Wait for timeout.
     *
     * NOTE:
     * Use only when absolutely necessary.
     *
     * @param {number} milliseconds
     */
    async wait(milliseconds) {

        await this.#page.waitForTimeout(milliseconds);

    }

    // ============================================================
    // Page Information
    // ============================================================

    /**
     * Returns current URL.
     *
     * @returns {string}
     */
    getUrl() {

        return this.#page.url();

    }

    /**
     * Returns page title.
     *
     * @returns {Promise<string>}
     */
    async getTitle() {

        return await this.#page.title();

    }

    // ============================================================
    // Browser Utilities
    // ============================================================

    /**
     * Capture page screenshot.
     *
     * @param {object} options
     */
    async captureScreenshot(options = {}) {

        return await this.#page.screenshot(options);

    }

    /**
     * Returns page HTML.
     *
     * @returns {Promise<string>}
     */
    async getContent() {

        return await this.#page.content();

    }

    /**
     * Execute JavaScript.
     *
     * @param {Function} script
     * @param {*} arg
     */
    async execute(script, arg = undefined) {

        return await this.#page.evaluate(script, arg);

    }

    /**
     * Scroll to top of page.
     */
    async scrollToTop() {

        await this.execute(() => {

            window.scrollTo(0, 0);

        });

    }

    /**
     * Scroll to bottom of page.
     */
    async scrollToBottom() {

        await this.execute(() => {

            window.scrollTo(0, document.body.scrollHeight);

        });

    }

    // ============================================================
    // Window
    // ============================================================

    /**
     * Returns viewport size.
     *
     * @returns {{width:number,height:number}|null}
     */
    getViewportSize() {

        return this.#page.viewportSize();

    }

    /**
     * Set viewport size.
     *
     * @param {number} width
     * @param {number} height
     */
    async setViewportSize(width, height) {

        await this.#page.setViewportSize({
            width,
            height
        });

    }

    /**
     * Open application URL
     *
     * Supports:
     * - absolute URL
     * - Playwright baseURL relative path
     *
     * @param {string} url
     */
    async open(url = "/") {


        await this.#page.goto(

            url,

            {

                waitUntil: "domcontentloaded"

            }

        );


    }

}
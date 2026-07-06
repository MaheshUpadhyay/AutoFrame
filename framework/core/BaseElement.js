/**
 * ============================================================================
 * Enterprise Automation Framework
 * BaseElement
 * ----------------------------------------------------------------------------
 * Base class for all UI elements.
 *
 * Every UI wrapper (Button, TextBox, Dropdown, Table, etc.)
 * inherits from this class.
 *
 * Author : Mahesh Upadhyay
 * ============================================================================
 */

import { expect } from "@playwright/test";

import { SelfHealingEngine }
    from "../selfhealing/SelfHealingEngine.js";

import { ScreenshotManager }
    from "../reporting/ScreenshotManager.js";


import { Logger }
    from "../logging/Logger.js";

const DEFAULT_TIMEOUT = Object.freeze({
    ACTION: 30000,
    WAIT: 30000
});
export class BaseElement {
    
    #locator;

    #description;

    #page;

    #selector;

    #healed = false;

    #snapshotCaptured = false;

    /**
 * Creates BaseElement.
 *
 * Backward compatible constructor.
 *
 * Existing usage:
 *
 * new WebButton(locator,"Login")
 *
 * Self healing usage:
 *
 * new WebButton(
 *      locator,
 *      "Login",
 *      {
 *          page,
 *          selector:"#login"
 *      }
 * )
 *
 * @param {import("@playwright/test").Locator} locator
 * @param {string} description
 * @param {object} options
 */
/**
 * Creates BaseElement instance.
 *
 * Supports:
 *
 * OLD:
 * super(locator, description)
 *
 * NEW:
 * super(locator, description,{
 *      page,
 *      selector
 * })
 *
 * @param {*} locator
 * @param {string} description
 * @param {object} metadata
 */
    constructor(
        locator,
        description = "Element",
        metadata = {}
    ){


        if(!locator){

            throw new Error(
                "Locator cannot be null."
            );

        }


        this.#locator =
            locator;


        this.#description =
            description;


        this.#page =
            metadata.page ?? null;


        this.#selector =
            metadata.selector ?? null;


        this.#healed =
            false;

        this.#snapshotCaptured = false;

    }

    /**
     * Returns Playwright Locator.
     *
     * Automatically resolves healed locator
     * when metadata is available.
     *
     * @returns {Promise<import("@playwright/test").Locator>}
     */
    /**
 * Returns Playwright locator.
 *
 * Automatically performs
 * self healing when locator fails.
 *
 * @returns {Promise<Locator>}
 */
    async getLocator(){


        /*
        * Backward compatibility
        *
        * Old elements without metadata
        */
        if(
            !this.#page
            ||
            !this.#selector
        ){

            return this.#locator;

        }



        /*
        * If already healed once,
        * avoid repeated healing checks
        */
        if(this.#healed){

            return this.#locator;

        }



        try{


            const count =
                await this.#locator.count();


            if(count > 0){


                /*
                * Capture locator metadata once
                * per element instance.
                */
                if(
                    !this.#snapshotCaptured
                    &&
                    this.#page
                    &&
                    this.#selector
                ){


                    await SelfHealingEngine
                        .captureSnapshot(

                            this.#description,

                            this.#selector,

                            this.#locator

                        );



                    this.#snapshotCaptured =
                        true;

                }



                return this.#locator;

            }


            throw new Error(
                "Locator not found"
            );

        }
        catch(error){



            Logger.warn(

                `Self healing started : ${this.#description}`

            );



            const result =
                await SelfHealingEngine.heal(

                    this.#page,

                    this.#description,

                    this.#selector

                );




            if(
                result
                &&
                result.isHealed()
            ){


                this.#locator =
                    this.#page.locator(

                        result.resolvedLocator

                    );


                this.#healed =
                    true;




                Logger.info(

                    `Locator healed : 
    ${this.#selector}
    -->
    ${result.resolvedLocator}`

                );





                await ScreenshotManager.capture(

                    this.#page,

                    `healed-${this.#description}`

                );




                return this.#locator;

            }




            throw error;

        }

    }


    /**
     * Internal locator resolver.
     *
     * All BaseElement methods should use this.
     *
     * This allows:
     *
     * - normal locator
     * - healed locator
     *
     * @returns {Locator}
     */
    async #element(){

        return await this.getLocator();

    }

    /**
     * Returns element description.
     *
     * @returns {string}
     */
    getDescription() {
        return this.#description;
    }

    // ============================================================
    // Click Actions
    // ============================================================

    /**
     * Click element.
     *
     * @param {object} options
     */
    async click(options = {}) {


        const element =
            await this.#element();


        await this.waitForVisible();

        await this.scrollIntoView();


        await element.click(options);

    }

    /**
     * Double click element.
     *
     * @param {object} options
     */
    async doubleClick(options = {}) {

        await this.waitForVisible();
        await this.scrollIntoView();

        const element =
            await this.#element();


        await element.dblclick(options);

    }

    /**
     * Right click element.
     *
     * @param {object} options
     */
    async rightClick(options = {}) {

        await this.waitForVisible();
        await this.scrollIntoView();

        const element =
            await this.#element();


        await element.click({
            button: "right",
            ...options
        });

    }

    // ============================================================
    // Mouse Actions
    // ============================================================

    /**
     * Hover mouse over element.
     */
    async hover() {

        await this.waitForVisible();

        const element =
            await this.#element();

        await element.hover();

    }

    /**
     * Focus element.
     */
    async focus() {

        await this.waitForVisible();

        const element =
            await this.#element();

        await element.focus();

    }

    /**
     * Press keyboard key.
     *
     * @param {string} key
     */
    async press(key) {

        await this.waitForVisible();

        const element =
            await this.#element();

        await element.press(key);

    }

    /**
     * Drag current element to another element.
     *
     * @param {BaseElement} target
     */
    async dragTo(target) {

        await this.waitForVisible();

        await this.#locator.dragTo(
            target.getLocator()
        );

    }
    //part 2
        // ============================================================
    // Wait Methods
    // ============================================================

    /**
     * Wait until element becomes visible.
     *
     * @param {number} timeout
     */
    async waitForVisible(timeout = DEFAULT_TIMEOUT.WAIT) {


        const element =
            await this.#element();


        await element.waitFor({

            state: "visible",

            timeout

        });

    }

    /**
     * Wait until element becomes hidden.
     *
     * @param {number} timeout
     */
    async waitForHidden(timeout = DEFAULT_TIMEOUT.WAIT) {


        const element =
            await this.#element();


        await element.waitFor({

            state:"hidden",

            timeout

        });

    }

    /**
     * Wait until element becomes attached to DOM.
     *
     * @param {number} timeout
     */
    async waitForAttached(timeout = DEFAULT_TIMEOUT.WAIT) {


        const element =
            await this.#element();


        await element.waitFor({

            state:"attached",

            timeout

        });

    }

    /**
     * Wait until element is detached from DOM.
     *
     * @param {number} timeout
     */
    async waitForDetached(timeout = DEFAULT_TIMEOUT.WAIT) {


        const element =
            await this.#element();


        await element.waitFor({

            state:"detached",

            timeout

        });

    }

    /**
     * Wait until element is enabled.
     *
     * @param {number} timeout
     */
    async waitForEnabled(timeout = DEFAULT_TIMEOUT.WAIT) {


        const element =
            await this.#element();


        await expect(element)
            .toBeEnabled({

                timeout

            });

    }

    /**
     * Wait until element is disabled.
     *
     * @param {number} timeout
     */
    async waitForDisabled(timeout = DEFAULT_TIMEOUT.WAIT) {


        const element =
            await this.#element();


        await expect(element)
            .toBeDisabled({

                timeout

            });

    }

    /**
     * Wait until element becomes editable.
     *
     * @param {number} timeout
     */
    async waitForEditable(timeout = DEFAULT_TIMEOUT.WAIT) {


        const element =
            await this.#element();


        await expect(element)
            .toBeEditable({

                timeout

            });

    }

    // ============================================================
    // State Methods
    // ============================================================

    /**
     * Returns true if element is visible.
     *
     * @returns {Promise<boolean>}
     */
    async isVisible(){


        const element =
            await this.#element();


        return await element.isVisible();

    }

    /**
     * Returns true if element is hidden.
     *
     * @returns {Promise<boolean>}
     */
    async isHidden(){


        const element =
            await this.#element();


        return !(

            await element.isVisible()

        );

    }

    /**
     * Returns true if element is enabled.
     *
     * @returns {Promise<boolean>}
     */
    async isEnabled(){


        const element =
            await this.#element();


        return await element.isEnabled();

    }

    /**
     * Returns true if element is disabled.
     *
     * @returns {Promise<boolean>}
     */
    async isDisabled(){


        const element =
            await this.#element();


        return !(

            await element.isEnabled()

        );

    }

    /**
     * Returns true if element exists in DOM.
     *
     * @returns {Promise<boolean>}
     */
    async exists(){


        const element =
            await this.#element();


        return (

            await element.count()

        ) > 0;

    }

    /**
     * Returns number of matching elements.
     *
     * @returns {Promise<number>}
     */
    async count(){


        const element =
            await this.#element();


        return await element.count();

    }

    /**
     * Returns true if element is editable.
     *
     * @returns {Promise<boolean>}
     */
    async isEditable(){


        const element =
            await this.#element();


        return await element.isEditable();

    }

    /**
     * Returns true if element is checked.
     *
     * Works for Checkbox and RadioButton.
     *
     * @returns {Promise<boolean>}
     */
    async isChecked(){


        const element =
            await this.#element();


        return await element.isChecked();

    }
    //Next: Part 3 – Assertions (verifyVisible, verifyText, verifyAttribute, verifyCssValue, etc.).
        // ============================================================
    // Assertion Methods
    // ============================================================

    /**
     * Verify element is visible.
     */
    async verifyVisible() {


        const element =
            await this.#element();


        await expect(element)
            .toBeVisible();



    }

    /**
     * Verify element is hidden.
     */
    async verifyHidden() {

        const element =
            await this.#element();


        await expect(element).toBeHidden();

    }

    /**
     * Verify element is enabled.
     */
    async verifyEnabled() {

        const element =
            await this.#element();


        await expect(element).toBeEnabled();

    }

    /**
     * Verify element is disabled.
     */
    async verifyDisabled() {

        const element =
            await this.#element();


        await expect(element).toBeDisabled();

    }

    /**
     * Verify element is editable.
     */
    async verifyEditable() {

       const element =
            await this.#element();


        await expect(element).toBeEditable();

    }

    /**
     * Verify checkbox/radio is checked.
     */
    async verifyChecked() {

        const element =
            await this.#element();


        await expect(element).toBeChecked();

    }

    /**
     * Verify checkbox/radio is unchecked.
     */
    async verifyUnchecked() {

        const element =
            await this.#element();


        await expect(element).not.toBeChecked();

    }

    /**
     * Verify element text.
     *
     * @param {string|RegExp} expected
     */
    async verifyText(expected) {

        const element =
            await this.#element();


        await expect(element).toHaveText(expected);

    }

    /**
     * Verify element contains text.
     *
     * @param {string} expected
     */
    async verifyContainsText(expected) {

        const element =
            await this.#element();


        await expect(element).toContainText(expected);

    }

    /**
     * Verify input value.
     *
     * Mainly used by TextBox.
     *
     * @param {string|RegExp} expected
     */
    async verifyValue(expected) {

        const element =
            await this.#element();


        await expect(element).toHaveValue(expected);

    }

    /**
     * Verify attribute.
     *
     * @param {string} name
     * @param {string|RegExp} expected
     */
    async verifyAttribute(name, expected) {

        const element =
            await this.#element();


        await expect(element)
            .toHaveAttribute(name, expected);

    }

    /**
     * Verify element has CSS class.
     *
     * @param {string|RegExp} expected
     */
    async verifyClass(expected) {

        const element =
            await this.#element();


        await expect(element)
            .toHaveClass(expected);

    }

    /**
     * Verify element id.
     *
     * @param {string|RegExp} expected
     */
    async verifyId(expected) {

        await this.verifyAttribute("id", expected);

    }

    /**
     * Verify placeholder.
     *
     * @param {string|RegExp} expected
     */
    async verifyPlaceholder(expected) {

        await this.verifyAttribute("placeholder", expected);

    }

    /**
     * Verify CSS property.
     *
     * @param {string} property
     * @param {string} expected
     */
    async verifyCssValue(property, expected) {

        const actual = await this.getCssValue(property);

        expect(actual).toBe(expected);

    }

    /**
     * Verify element count.
     *
     * Useful for lists and tables.
     *
     * @param {number} expected
     */
    async verifyCount(expected) {

        const element =
            await this.#element();


        await expect(element).toHaveCount(expected);

    }
    //Next: Part 4 – Information & Utility Methods (the final section of BaseElement.js).
        // ============================================================
    // Information Methods
    // ============================================================
    /**
     * Returns original selector.
     */
    getSelector(){

        return this.#selector;

    }




    /**
     * Returns element name.
     */
    getDescription(){

        return this.#description;

    }




    /**
     * Returns healing status.
     */
    isHealed(){

        return this.#healed;

    }
    /**
     * Returns visible text.
     *
     * @returns {Promise<string>}
     */
    async getText(){


        const element =
            await this.#element();


        const text =
            await element.innerText();


        return text.trim();

    }

    /**
     * Returns inner text.
     *
     * @returns {Promise<string>}
     */
    async getInnerText(){


        const element =
            await this.#element();


        return await element.innerText();

    }

    /**
     * Returns input value.
     *
     * @returns {Promise<string>}
     */
    async getValue(){


        const element =
            await this.#element();


        return await element.inputValue();

    }

    /**
     * Returns attribute value.
     *
     * @param {string} name
     * @returns {Promise<string|null>}
     */
    async getAttribute(name){


        const element =
            await this.#element();


        return await element.getAttribute(
            name
        );

    }

    /**
     * Returns CSS property value.
     *
     * @param {string} property
     * @returns {Promise<string>}
     */
    async getCssValue(property){


        const element =
            await this.#element();


        return await element.evaluate(

            (element, propertyName)=>

                window
                .getComputedStyle(element)
                .getPropertyValue(propertyName),

            property

        );

    }

    /**
     * Returns element bounding box.
     *
     * @returns {Promise<import("@playwright/test").BoundingBox|null>}
     */
    async boundingBox(){


        const element =
            await this.#element();


        return await element.boundingBox();

    }

    /**
     * Returns element role.
     *
     * @returns {Promise<string|null>}
     */
    async getRole() {

        return await this.getAttribute("role");

    }

    /**
     * Returns aria-label.
     *
     * @returns {Promise<string|null>}
     */
    async getAriaLabel() {

        return await this.getAttribute("aria-label");

    }

    /**
     * Returns class attribute.
     *
     * @returns {Promise<string|null>}
     */
    async getClassName() {

        return await this.getAttribute("class");

    }

    /**
     * Returns element id.
     *
     * @returns {Promise<string|null>}
     */
    async getId() {

        return await this.getAttribute("id");

    }

    // ============================================================
    // Utility Methods
    // ============================================================

    /**
     * Scroll element into view.
     */
    async scrollIntoView(){


        const element =
            await this.#element();


        await element.scrollIntoViewIfNeeded();

    }

    /**
     * Highlight element for debugging.
     */
    async highlight() {

        await this.#locator.evaluate(element => {

            const previousOutline = element.style.outline;
            const previousTransition = element.style.transition;

            element.style.transition = "outline 0.2s ease";
            element.style.outline = "3px solid #ff0000";

            setTimeout(() => {
                element.style.outline = previousOutline;
                element.style.transition = previousTransition;
            }, 500);

        });

    }

    /**
     * Capture element screenshot.
     *
     * @param {object} options
     * @returns {Promise<Buffer>}
     */
    async captureScreenshot(options = {}){


        const element =
            await this.#element();


        return await element.screenshot(
            options
        );

    }

    /**
     * Returns underlying Playwright Locator.
     *
     * Use only when framework doesn't provide
     * the required functionality.
     *
     * @returns {import("@playwright/test").Locator}
     */
    async locator(){

        return await this.getLocator();

    }
}
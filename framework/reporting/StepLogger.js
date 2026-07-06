/**
 * ============================================================================
 * Enterprise Automation Framework
 * StepLogger
 * ----------------------------------------------------------------------------
 * Centralized step logger for Allure reporting.
 *
 * Every business action should be wrapped inside a step.
 *
 * Author : Automated Script
 * ============================================================================
 */

import * as allure from "allure-js-commons";
import { ReportManager } from "./ReportManager.js";

export class StepLogger {

    /**
     * Executes a reporting step.
     *
     * @param {string} title
     * @param {Function} action
     */
    static async step(title, action) {

        return await allure.step(
            title,
            async () => {

                return await action();

            }
        );

    }

    /**
     * Adds informational text.
     *
     * @param {string} message
     */
    static async info(message) {

        await ReportManager.attachText(
            "Info",
            message
        );

    }

    /**
     * Attach JSON.
     *
     * @param {string} name
     * @param {Object} object
     */
    static async json(name, object) {

        await ReportManager.attachJson(
            name,
            object
        );

    }

    /**
     * Attach plain text.
     *
     * @param {string} name
     * @param {string} text
     */
    static async text(name, text) {

        await ReportManager.attachText(
            name,
            text
        );

    }

    /**
     * Attach any object.
     *
     * @param {string} name
     * @param {*} object
     */
    static async object(name, object) {

        await ReportManager.attachJson(
            name,
            object
        );

    }

    /**
     * Attach debug information.
     *
     * @param {*} object
     */
    static async debug(object) {

        await ReportManager.attachJson(
            "Debug",
            object
        );

    }

    /**
     * Mark successful operation.
     *
     * Usually not needed because successful
     * completion of a step is already PASS.
     *
     * @param {string} message
     */
    static async pass(message) {

        await this.info(`PASS : ${message}`);

    }

    /**
     * Log failure and throw.
     *
     * @param {string} message
     */
    static async fail(message) {

        throw new Error(message);

    }

}
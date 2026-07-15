/**
 * @file PlaywrightCommandBuilder.js
 *
 * Enterprise Playwright Command Builder
 *
 * Responsibilities:
 * - Build Playwright CLI command
 * - Apply execution filters
 *
 * @author Mahesh Upadhyay
 */

export class PlaywrightCommandBuilder {

    /**
     * Build Playwright command
     *
     * @param {Object} options
     *
     * @returns {string}
     */
    static build(options) {

        let command = "playwright test";

        // Target path (suite or test)
        if (options.targetPath) {

            command += ` "${options.targetPath}"`;

        }

        // Config
        command += ` --config="${options.configPath}"`;

        // Grep
        if (options.grep) {

            command += ` --grep="${options.grep}"`;

        }

        // Browser
        if (
            options.browser &&
            options.browser !== "all"
        ) {

            command += ` --project=${options.browser}`;

        }

        return command;

    }

}
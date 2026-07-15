/**
 * @file TestFileResolver.js
 * @description
 * Enterprise Test File Resolver
 *
 * Responsibilities:
 * - Resolve test file path
 * - Resolve suite path
 * - Search recursively
 * - Detect duplicate test names
 *
 * @author Mahesh Upadhyay
 */

import fs from "fs";
import path from "path";

export class TestFileResolver {

    /**
     * Resolve a test file.
     *
     * Supports:
     *
     * --test=login.test.js
     *
     * --test=authentication/login.test.js
     *
     * @param {string} testsDirectory
     * @param {string} test
     *
     * @returns {string}
     */
    static resolveTest(testsDirectory, test) {

        // Relative path supplied
        const relativePath =
            path.join(
                testsDirectory,
                test
            );

        if (fs.existsSync(relativePath)) {

            return test.replace(/\\/g, "/");

        }

        // Search recursively
        const matches = [];

        this.search(
            testsDirectory,
            test,
            matches
        );

        if (matches.length === 0) {

            throw new Error(

                `Test not found : ${test}`

            );

        }

        if (matches.length > 1) {

            throw new Error(

`Multiple test files found.

${matches.join("\n")}

Please specify the relative path.

Example:

--test=authentication/login.test.js`

            );

        }

        return path.relative(

            testsDirectory,

            matches[0]

        ).replace(/\\/g, "/");

    }

    /**
     * Resolve suite.
     *
     * @param {string} testsDirectory
     * @param {string} suite
     *
     * @returns {string}
     */
    static resolveSuite(
        testsDirectory,
        suite
    ) {

        const suitePath =
            path.join(
                testsDirectory,
                suite
            );

        if (!fs.existsSync(suitePath)) {

            throw new Error(

                `Suite not found : ${suite}`

            );

        }

        return suite.replace(/\\/g, "/");

    }

    /**
     * Recursive search
     *
     * @private
     */
    static search(
        directory,
        fileName,
        matches
    ) {

        const files =
            fs.readdirSync(
                directory,
                {
                    withFileTypes: true
                }
            );

        for (const file of files) {

            const fullPath =
                path.join(
                    directory,
                    file.name
                );

            if (file.isDirectory()) {

                this.search(
                    fullPath,
                    fileName,
                    matches
                );

            }
            else if (file.name === fileName) {

                matches.push(
                    fullPath
                );

            }

        }

    }

}
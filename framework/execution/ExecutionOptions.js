/**
 * @file ExecutionOptions.js
 * @description
 * Enterprise execution options model.
 *
 * Responsibilities:
 * - Parse CLI arguments
 * - Validate execution options
 * - Hold execution configuration
 *
 * @author Mahesh Upadhyay
 */

export class ExecutionOptions {

    constructor() {

        this.project = null;

        this.environment = "qa";

        this.browser = "all";

        this.type = "ui";

        this.suite = null;

        this.test = null;

        this.grep = null;

    }

    /**
     * Parse command-line arguments.
     *
     * @param {string[]} args
     * @returns {ExecutionOptions}
     */
    static parse(args = []) {

        const options =
            new ExecutionOptions();

        args.forEach(argument => {

            if (!argument.startsWith("--")) {

                return;

            }

            const [key, value] =
                argument.substring(2).split("=");

            switch (key) {

                case "project":
                    options.project = value;
                    break;

                case "env":
                    options.environment = value;
                    break;

                case "browser":
                    options.browser = value;
                    break;

                case "type":
                    options.type = value;
                    break;

                case "suite":
                    options.suite = value;
                    break;

                case "test":
                    options.test = value;
                    break;

                case "grep":
                    options.grep = value;
                    break;

                default:
                    break;

            }

        });

        options.validate();

        return options;

    }

    /**
     * Validate execution options.
     */
    validate() {

        if (!this.project) {

            throw new Error(
                "--project is mandatory."
            );

        }

        if (!["ui", "api"].includes(this.type)) {

            throw new Error(
                `Unsupported execution type : ${this.type}`
            );

        }

    }

}
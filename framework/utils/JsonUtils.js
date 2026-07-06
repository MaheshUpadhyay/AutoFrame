/**
 * ============================================================================
 * Enterprise Automation Framework
 * JsonUtils
 * ----------------------------------------------------------------------------
 * Common JSON utility methods.
 *
 * Author : Automated Script
 * ============================================================================
 */

export class JsonUtils {

    static parse(text) {
        return JSON.parse(text);
    }

    static stringify(object, indent = 4) {
        return JSON.stringify(object, null, indent);
    }

    static clone(object) {
        return structuredClone(object);
    }

    static get(object, propertyPath) {

        if (!propertyPath) {
            return object;
        }

        return propertyPath
            .split(".")
            .reduce((obj, key) => obj?.[key], object);

    }

    static has(object, propertyPath) {

        return this.get(object, propertyPath) !== undefined;

    }

    static set(object, propertyPath, value) {

        const keys = propertyPath.split(".");
        let current = object;

        while (keys.length > 1) {

            const key = keys.shift();

            if (!(key in current)) {
                current[key] = {};
            }

            current = current[key];

        }

        current[keys[0]] = value;

        return object;

    }

    static remove(object, propertyPath) {

        const keys = propertyPath.split(".");
        const last = keys.pop();

        const parent = this.get(object, keys.join("."));

        if (parent && last in parent) {
            delete parent[last];
        }

    }

    static deepMerge(target, source) {

        const output = this.clone(target);

        for (const key of Object.keys(source)) {

            if (
                source[key] &&
                typeof source[key] === "object" &&
                !Array.isArray(source[key])
            ) {

                output[key] = this.deepMerge(
                    output[key] ?? {},
                    source[key]
                );

            } else {

                output[key] = source[key];

            }

        }

        return output;

    }

    static equals(first, second) {

        return this.stringify(first) === this.stringify(second);

    }

    static pretty(object) {

        return this.stringify(object, 4);

    }

}

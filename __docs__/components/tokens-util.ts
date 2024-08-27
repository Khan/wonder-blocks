/**
 * @fileoverview Utility functions for working with design tokens within the
 * Storybook context.
 */

/**
 * A recursive record type that allows for nested objects of strings.
 */
type RecursiveRecord<T> = {
    [P in keyof T]?: RecursiveRecord<T[P]> | string;
};

/**
 * Flattens a nested object of tokens into a flat object where the keys are
 * dot-separated paths to the values.
 *
 * @example
 * Input: {
 *    color: {
 *       primary: {
 *         default: "#000",
 *      },
 *   },
 * };
 *
 * Output: {"color.primary.default": "#000"}
 *
 */
export function flattenNestedTokens<T>(
    tokens: RecursiveRecord<T>,
    currentKey = "",
) {
    const result: Record<string, string> = {};

    for (const key in tokens) {
        if (!Object.prototype.hasOwnProperty.call(tokens, key)) {
            continue;
        }

        const nestedKey = currentKey !== "" ? currentKey + "." + key : key;
        const value = tokens[key];
        if (typeof value === "string") {
            result[nestedKey] = value;
        } else if (typeof value === "object") {
            Object.assign(result, flattenNestedTokens(value, nestedKey));
        }
    }

    return result;
}

/**
 * Gets the key that corresponds to a given value in a token object.
 *
 * @example
 * Input: {blue: "#00f", red: "#f00"}, "#00f"

 * Output: "blue"
 */
export function getTokenName(tokens: Record<string, string>, value: string) {
    for (const property in tokens) {
        // Check that we have a valid property.
        if (!Object.prototype.hasOwnProperty.call(tokens, property)) {
            continue;
        }

        if (tokens[property] === value) {
            return property;
        }
    }
}

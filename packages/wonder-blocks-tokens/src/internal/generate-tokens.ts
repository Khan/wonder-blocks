import {CSS_VAR_COLOR_PREFIX} from "../util/constants";
import {RecursivePartial} from "../util/types";

/**
 * Generate CSS variables from a valid theme object.
 *
 * @param root The root object containing the theme tokens.
 * @returns A record of CSS variables.
 */
export function generateTokens<T>(root: T): Record<string, string> {
    const tokens = {} as Record<string, string>;
    function generateCssVariables(
        obj: T | RecursivePartial<T>,
        prefix = CSS_VAR_COLOR_PREFIX,
    ) {
        for (const key in obj as RecursivePartial<T>) {
            if (typeof obj[key] === "object") {
                generateCssVariables(obj[key], `${prefix}${key}-`);
            } else {
                if (typeof obj[key] === "string") {
                    // preserve the original nested object structure
                    tokens[prefix + key] = obj[key];
                }
            }
        }
    }

    generateCssVariables(root);

    return tokens;
}

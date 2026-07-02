import {CSS_VAR_PREFIX} from "../util/constants";
import {RecursivePartial} from "../util/types";

/**
 * Generate CSS variables from a valid theme object.
 *
 * @param root The root object containing the theme tokens.
 * @returns A record of CSS variables.
 */
export function generateTokens<T>(
    root: T,
    prefix = CSS_VAR_PREFIX,
): Record<string, string | number> {
    const tokens = {} as Record<string, string | number>;
    function generateCssVariables(
        obj: T | RecursivePartial<T>,
        prefix = CSS_VAR_PREFIX,
    ) {
        for (const key in obj as RecursivePartial<T>) {
            if (typeof obj[key] === "object") {
                generateCssVariables(obj[key], `${prefix}${key}-`);
            } else {
                if (
                    typeof obj[key] === "string" ||
                    typeof obj[key] === "number"
                ) {
                    // preserve the original nested object structure
                    tokens[prefix + key] = obj[key];
                }
            }
        }
    }

    generateCssVariables(root, prefix);

    return tokens;
}

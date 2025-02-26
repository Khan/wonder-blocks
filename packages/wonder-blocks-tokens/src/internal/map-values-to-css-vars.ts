import {RecursivePartial} from "../types";

/**
 * From a given object, create a new object where each value is a CSS variable
 * reference to the original value.
 *
 * @param obj The source object containing the tokens.
 * @param prefix The prefix to use for the CSS variables.
 * @returns The same object structure as the input, but with the values replaced
 * with CSS variable references.
 *
 * @example
 * const obj = {
 *    color: {
 *      primary: "red",
 *     secondary: "blue",
 *  };
 *
 * const cssVars = mapValuesToCssVars(obj);
 * // cssVars = {
 * //    color: {
 * //      primary: "var(--wb-color-primary)",
 * //     secondary: "var(--wb-color-secondary)",
 * //    },
 * // };
 */
export function mapValuesToCssVars<T>(
    obj: T | RecursivePartial<T>,
    prefix = "--wb-",
) {
    const cssVars = {} as T | RecursivePartial<T>;
    for (const key in obj as RecursivePartial<T>) {
        if (typeof obj[key] === "object") {
            cssVars[key] = mapValuesToCssVars(obj[key], `${prefix}${key}-`);
        } else {
            cssVars[key] = `var(${prefix}${key})` as any;
        }
    }
    return cssVars as T;
}

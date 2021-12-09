// @flow
import {clone} from "@khanacademy/wonder-stuff-core";

/**
 * Combine two values.
 *
 * This method clones val2 before using any of its properties to try to ensure
 * the combined object is not linked back to the original.
 *
 * If the values are objects, it will merge them at the top level, with val2
 * overwriting val1 where there are conflicts.
 *
 * If the values are arrays, it will concatenate and dedupe them.
 * NOTE: duplicates in either val1 or val2 will also be deduped.
 *
 * If the values are any other type, or val2 has a different type to val1, val2
 * will be returned.
 */
export const combine = (val1: $ReadOnly<any>, val2: $ReadOnly<any>): any => {
    const obj2Clone = clone(val2);

    // Only merge if they're both arrays or both objects.
    // If not, we will just return val2.
    if (
        val1 !== null &&
        val2 !== null &&
        typeof val1 === "object" &&
        typeof val2 === "object"
    ) {
        const val1IsArray = Array.isArray(val1);
        const val2IsArray = Array.isArray(val2);

        if (val1IsArray && val2IsArray) {
            return Array.from(new Set([...val1, ...obj2Clone]));
        } else if (!val1IsArray && !val2IsArray) {
            return {...val1, ...obj2Clone};
        }
    }
    return obj2Clone;
};

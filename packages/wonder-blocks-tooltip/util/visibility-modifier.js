// @flow
/**
 * A modifier for use with popper.js or react-popper.
 * This looks at the scroll parents of the reference element to determine
 * overall visibility.
 */
import {default as PopperJS} from "popper.js";

import {getElementIntersection} from "@khanacademy/wonder-blocks-core";

import isObscured from "./is-obscured.js";

/**
 * The function that implements the modifier.
 */
function visibilityModifierFn(data: any) {
    const anchorElement = data.instance.reference;

    // First, we see how the element intersects with its scroll parents.
    // If it doesn't, then we should hide it.
    // Otherwise, we check to see if anything else obscures the component (like
    // a fixed or absolute positioned element).
    const {horizontal, vertical} = getElementIntersection(anchorElement);
    const hide =
        horizontal !== "within" ||
        vertical !== "within" ||
        isObscured(anchorElement);

    // If we're hidden, we mimic what the built-in hide method does,
    // and set the hide flag and the OOB attribute with appropriate
    // short-circuiting.
    if (hide) {
        if (data.hide) {
            return data;
        }
        data.hide = true;
        data.attributes["x-out-of-boundaries"] = "";
    } else {
        // Avoid unnecessary DOM access if visibility hasn't changed
        if (!data.hide) {
            return data;
        }
        data.hide = false;
        data.attributes["x-out-of-boundaries"] = false;
    }

    // Always have to return the data object to ensure the modifier chain
    // in popper.js is unbroken.
    return data;
}

/**
 * Default configuration that sets things up how usually want them.
 * Usage:
 * ```js
 *     import visibilityModifier from "visibility-modifier.js";
 *     const modifiers = [
 *         wbvisibility: visibilityModifier,
 *     ];
 * ```
 *
 * Where `wbvisibility` is a unique name to give the modifier entry,
 * and `modifiers` is the popper.js or react-popper modifiers array.
 */
export default {
    enabled: true,
    // We want this to run after the "hide" modifier, by default.
    order: PopperJS.Defaults.modifiers["hide"].order + 1,
    fn: visibilityModifierFn,
};

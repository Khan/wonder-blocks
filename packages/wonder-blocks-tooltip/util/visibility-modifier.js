// @flow
/**
 * A modifier for use with popper.js or react-popper.
 * This looks at the scroll parents of the reference element to determine
 * overall visibility.
 */
import {default as PopperJS} from "popper.js";

import {getElementIntersection} from "@khanacademy/wonder-blocks-core";

/**
 * The function that implements the modifier.
 */
function visibilityModifierFn(data: any) {
    const anchorElement = data.instance.reference;
    const {horizontal, vertical} = getElementIntersection(anchorElement);

    let hide = horizontal !== "within" && vertical !== "within";
    if (!hide) {
        // Before we assume we're visible let's check to see if something else
        // is obscuring us.  Here we make the assumption that if our topleft and
        // bottomright corners are covered by something, we're not visible.
        // There are ways that this can still not work, such as different
        // elements only covering those points and the remainder being visible,
        // or if some covering element has none for pointer-events style, but
        // those edge cases shouldn't bother the main usages for this method.

        // NOTE: If the anchor element has `pointer-events: none`, we're always
        // going to end up hiding, so, you know, probably don't do that.
        const intersectingRect = anchorElement.getBoundingClientRect();
        const topLeftElement = document.elementFromPoint(
            intersectingRect.left,
            intersectingRect.top,
        );
        // The bottom right corner is one less than the bounds, otherwise we
        // can end up getting the parent of the anchor, rather than the anchor
        // itself.
        const bottomRightElement = document.elementFromPoint(
            intersectingRect.right - 1,
            intersectingRect.bottom - 1,
        );
        if (
            topLeftElement !== anchorElement &&
            bottomRightElement !== anchorElement
        ) {
            // Are we before or after?
            hide = true;
        }
    }

    // If we're hidden, we mimic what the built-in hide method does,
    // and set the hide flag and the OOB attribute.
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

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
    // If something (such as the default hide modifier) already hid us against
    // the viewport, we don't have to do anything.
    if (!data.hide) {
        const anchorElement = data.instance.reference;
        const {horizontal, vertical} = getElementIntersection(anchorElement);

        // If we're hidden, we mimic what the built-in hide method does,
        // and set the hide flag and the OOB attribute.
        if (horizontal !== "within" || vertical !== "within") {
            data.hide = true;
            data.attributes['x-out-of-boundaries'] = '';
        } else {
            data.hide = false;
            data.attributes['x-out-of-boundaries'] = false;
        }
        // TODO(somewhatabstract): This is where we would look to do two things..
        // - Custom prevent overflowing based on remaining visibility the amount of the element clipped by any and all parents
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

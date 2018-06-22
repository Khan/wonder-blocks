// @flow
/**
 * A modifier for use with popper.js or react-popper.
 * This looks at the scroll parents of the reference element to determine
 * overall visibility.
 */
import {default as PopperJS} from "popper.js";

import {getElementIntersection} from "@khanacademy/wonder-blocks-core";

function isObscurred(anchorElement: any) {
    // TODO(somewhatabstract): We need to be smarter in this algorithm and
    // actually look at the intersection of the elements doing the obscurring
    // just as we already do with our scroll parent intersections.

    // Before we assume we're visible let's check to see if something else
    // is obscuring us.  Here we make the assumption that if our topleft and
    // bottomright corners are covered by something, we're not visible.
    // There are ways that this can still not work, such as different
    // elements only covering those points and the remainder being visible,
    // or if some covering element has none for pointer-events style, but
    // those edge cases shouldn't bother the main usages for this method.

    // NOTE: If the anchor element has `pointer-events: none`, we're always
    // going to end up hiding, so, you know, probably don't do that.
    const anchorRect = anchorElement.getBoundingClientRect();
    const style =
        anchorElement.currentStyle || window.getComputedStyle(anchorElement);
    const anchorLeft =
        anchorRect.left +
        parseFloat(style.marginLeft) +
        parseFloat(style.paddingLeft) +
        parseFloat(style.borderLeftWidth);
    const anchorTop =
        anchorRect.top +
        parseFloat(style.marginTop) +
        parseFloat(style.paddingTop) +
        parseFloat(style.borderTopWidth);
    const topLeftElement = document.elementFromPoint(anchorLeft, anchorTop);
    // The bottom right corner is one less than the bounds, otherwise we
    // can end up getting the parent of the anchor, rather than the anchor
    // itself.
    const anchorRight =
        anchorRect.right -
        parseFloat(style.marginRight) -
        parseFloat(style.paddingRight) -
        parseFloat(style.borderRightWidth);
    const anchorBottom =
        anchorRect.bottom -
        parseFloat(style.marginBottom) -
        parseFloat(style.paddingBottom) -
        parseFloat(style.borderBottomWidth);
    const bottomRightElement = document.elementFromPoint(
        anchorRight,
        anchorBottom,
    );
    // To cope with us hitting a child of our anchor or a parent due to
    // borders and things, we do some descendancy checks. We're ok with
    // saying that we're visible if we hit a parent because we already
    // checked them for visibility earlier.
    const topLeftVisible =
        topLeftElement &&
        (anchorElement.contains(topLeftElement) ||
            topLeftElement.contains(anchorElement));
    const bottomRightVisible =
        bottomRightElement &&
        (anchorElement.contains(bottomRightElement) ||
            bottomRightElement.contains(anchorElement));
    return !topLeftVisible && !bottomRightVisible;
}

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
        isObscurred(anchorElement);

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

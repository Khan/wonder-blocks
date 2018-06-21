// @flow
/**
 * A modifier for use with popper.js or react-popper.
 * This looks at the scroll parents of the reference element to determine
 * overall visibility.
 */
import {default as PopperJS} from "popper.js";

/**
 * The function that implements the modifier.
 */
export function visibilityModifierFn(data: any) {
    // If something (such as the default hide modifier) already hid us against
    // the viewport, we don't have to do anything.
    if (!data.hide) {
        //eslint-disable-next-line no-console
        console.log(data);
        // TODO(somewhatabstract): This is where we would look to do two things.
        // - Custom hiding based on visibility against any and all scroll parents.
        // - Custom prevent overflowing based on remaining visibility the amount of the element clipped by any and all parents
    }
    // Always have to return the data object to ensure the modifier chain
    // in popper.js is unbroken.
    return data;
}

export const visibilityModifierDefaultConfig = {
    enabled: true,
    // We want this to run after the "hide" modifier, by default.
    order: PopperJS.Defaults.modifiers["hide"].order + 1,
    fn: visibilityModifierFn,
};

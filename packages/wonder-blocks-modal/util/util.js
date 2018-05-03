// @flow
/**
 * A media query matching mobile-ish screens.
 *
 * TODO(mdr): What's our media query story in Wonder Blocks? For now, I just
 *     copied the `smOrSmaller` breakpoint from the Khan Academy webapp.
 */
export const smOrSmaller = "@media (max-width: 767px)";

/**
 * Creates a random unique ID string. Helpful for creating unique `id`
 * attributes for a11y purposes, while avoiding conflicts with other mounted
 * components.
 */
export function generateUniqueId() {
    // Generate a random float, output it to a base-36 string, and remove the
    // leading "0." characters.
    return Math.random()
        .toString(36)
        .substr(2);
}

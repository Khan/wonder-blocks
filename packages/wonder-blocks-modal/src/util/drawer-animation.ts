/**
 * Animation values for the drawer system, shared by `drawer-dialog` (the panel,
 * which slides and fades) and `drawer-backdrop` (which fades).
 *
 * Enter and exit run on an asymmetric clock: the entrance is longer and eases
 * out, the exit is quicker and eases in. Both layers use the same durations, so
 * they finish together.
 */

/** Duration in milliseconds of the enter (slide-in) animation. */
export const DRAWER_ENTER_DURATION_MS = 300;

/** Duration in milliseconds of the exit (slide-out) animation. */
export const DRAWER_EXIT_DURATION_MS = 150;

/** Easing for the entrance: a decisive arrival that settles gently. */
export const DRAWER_ENTER_EASING = "cubic-bezier(0.05, 0.7, 0.1, 1)";

/** Easing for the exit: eases in so the panel accelerates away. */
export const DRAWER_EXIT_EASING = "cubic-bezier(0.3, 0, 0.8, 0.15)";

/**
 * How far the panel sits from its resting position at the far end of the slide,
 * as a percentage of its own size. A partial distance, so the movement is
 * suggested rather than a full traverse of the panel's width; the panel's fade
 * covers the rest.
 */
export const DRAWER_SLIDE_OFFSET = "42%";

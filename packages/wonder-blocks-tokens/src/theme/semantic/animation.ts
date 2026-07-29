import {AnimationPreset} from "../../util/animation-utils";
import {duration, easing} from "../primitive/animation";
import {sizing} from "../primitive/sizing";

/**
 * Semantic animation presets.
 *
 * These are named by **archetype** (a reusable interaction pattern like
 * `floating` or `disclosure`) and **change** (`enter`/`exit`, `expand`/`collapse`,
 * …) rather than by specific component, so a preset can be reused wherever the
 * same kind of animation applies.
 *
 * Each preset is a single "clock" — one {@link AnimationPreset} of
 * `{duration, easing, delay}` shared by every property that animates together —
 * and, where it matters, the `from`/`to` visual states that give the animation
 * its character (how far it slides, whether it fades, how much it scales). Some
 * presets are timing-only clocks (`control.press`, `disclosure.*`, `fade.*`, …);
 * the `floating`/`docked` presets additionally carry states. Either way the preset owns
 * the opinion; the component decides only which element it binds to and — via the
 * `origin` option — the direction. This keeps presets implementation-agnostic:
 * the same one drives an Aphrodite `transition`, a `motion` React animation, or a
 * WAAPI call.
 *
 * NOTE: These are the raw values. They are formatted into CSS variables and a
 * JS-friendly tree in `src/index.ts`.
 */

/**
 * Micro-feedback for interactive controls (buttons, icon buttons). Uses
 * `xShort` (100ms) to match the snappy press feedback controls already use;
 * a slower press reads as laggy on the most-used components.
 */
const control = {
    press: {
        duration: duration.xShort,
        easing: easing.standard,
        delay: duration.none,
    },
} satisfies Record<string, AnimationPreset>;

/** Expanding/collapsing disclosure regions (e.g. accordions). */
const disclosure = {
    expand: {
        duration: duration.medium,
        easing: easing.standard,
        delay: duration.none,
    },
    collapse: {
        duration: duration.medium,
        easing: easing.standard,
        delay: duration.none,
    },
} satisfies Record<string, AnimationPreset>;

/**
 * In-place surfaces that float over the page (modals/dialogs, popovers, menus).
 * They *appear where they are* — a subtle rise + fade, with only a small
 * displacement (they do not travel in from an edge).
 *
 * These carry `from`/`to` states so the *whole animation* is baked in: a
 * consumer never hand-authors how far it rises or that it fades — applying the
 * preset does it. The `offset` is direction-neutral (a `sizing` magnitude); the
 * component chooses the edge via the `origin` option (defaults to `"bottom"`,
 * so the surface rises into place).
 *
 * Entrances run a touch longer; exits are quicker. Entrances ease-out with the
 * `emphasizedDecelerate` curve (decisive arrival, gentle settle); exits ease-in
 * with `emphasizedAccelerate` — never `linear`.
 */
const floating = {
    enter: {
        duration: duration.medium,
        easing: easing.emphasizedDecelerate,
        delay: duration.none,
        from: {opacity: 0, offset: sizing.size_120},
        to: {opacity: 1, offset: 0},
    },
    exit: {
        duration: duration.short,
        easing: easing.emphasizedAccelerate,
        delay: duration.none,
        from: {opacity: 1, offset: 0},
        to: {opacity: 0, offset: sizing.size_120},
    },
} satisfies Record<string, AnimationPreset>;

/**
 * Edge-docked surfaces that travel in from an edge (drawers, side & bottom
 * sheets). Unlike {@link floating}, a docked surface *slides* a larger
 * (still bounded, "suggested") distance and does **not** scale — scaling a
 * sheet that slides looks wrong. The `offset` is direction-neutral; the
 * component picks the edge via the `origin` option.
 *
 * Entrances run a touch longer; exits are quicker and travel less. Entrances
 * ease-out with `emphasizedDecelerate`; exits ease-in with
 * `emphasizedAccelerate`.
 */
const docked = {
    enter: {
        duration: duration.long,
        easing: easing.emphasizedDecelerate,
        delay: duration.none,
        from: {opacity: 0, offset: sizing.size_960},
        to: {opacity: 1, offset: 0},
    },
    exit: {
        duration: duration.short,
        easing: easing.emphasizedAccelerate,
        delay: duration.none,
        from: {opacity: 1, offset: 0},
        to: {opacity: 0, offset: sizing.size_320},
    },
} satisfies Record<string, AnimationPreset>;

/** A selection indicator moving between positions (e.g. the tab underline). */
const indicator = {
    move: {
        duration: duration.long,
        easing: easing.standard,
        delay: duration.none,
    },
} satisfies Record<string, AnimationPreset>;

/** Generic opacity transitions. */
const fade = {
    in: {
        duration: duration.short,
        easing: easing.linear,
        delay: duration.none,
    },
    out: {
        duration: duration.short,
        easing: easing.linear,
        delay: duration.none,
    },
} satisfies Record<string, AnimationPreset>;

/** Continuously looping animation (e.g. spinners). The component owns iteration. */
const loop = {
    spin: {
        duration: duration.xxLong,
        easing: easing.linear,
        delay: duration.none,
    },
} satisfies Record<string, AnimationPreset>;

/**
 * The complete raw animation token tree: primitive scales (`duration`, `easing`)
 * plus the semantic presets. This single object is the source of truth from
 * which both the CSS-variable form and the JS-friendly form are derived.
 */
export const animation = {
    duration,
    easing,
    control,
    disclosure,
    floating,
    docked,
    indicator,
    fade,
    loop,
};

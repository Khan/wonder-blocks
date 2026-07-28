import {AnimationPreset} from "../../util/animation-utils";
import {duration, easing} from "../primitive/animation";
import {sizing} from "../primitive/sizing";

/**
 * Semantic animation presets.
 *
 * These are named by **archetype** (a reusable interaction pattern like
 * `overlay` or `disclosure`) and **change** (`enter`/`exit`, `expand`/`collapse`,
 * …) rather than by specific component, so a preset can be reused wherever the
 * same kind of animation applies.
 *
 * Each preset is a single "clock" — one {@link AnimationPreset} of
 * `{duration, easing, delay}` shared by every property that animates together —
 * and, where it matters, the `from`/`to` visual states that give the animation
 * its character (how far it slides, whether it fades, how much it scales). Some
 * presets are timing-only clocks (`control.press`, `disclosure.*`, `fade.*`, …);
 * the `overlay` presets additionally carry states. Either way the preset owns
 * the opinion; the component decides only which element it binds to and — via the
 * `origin` option — the direction. This keeps presets implementation-agnostic:
 * the same one drives an Aphrodite `transition`, a `motion` React animation, or a
 * WAAPI call.
 *
 * NOTE: These are the raw values. They are formatted into CSS variables and a
 * JS-friendly tree in `src/index.ts`.
 */

/** Micro-feedback for interactive controls (buttons, icon buttons, switches). */
const control = {
    press: {
        duration: duration.short,
        easing: easing.standard,
        delay: duration.none,
    },
} satisfies Record<string, AnimationPreset>;

/** Expanding/collapsing disclosure regions (e.g. accordions). */
const disclosure = {
    expand: {
        duration: duration.long,
        easing: easing.standard,
        delay: duration.none,
    },
    collapse: {
        duration: duration.long,
        easing: easing.standard,
        delay: duration.none,
    },
} satisfies Record<string, AnimationPreset>;

/**
 * Overlays entering/leaving the screen (drawers, modals, backdrops). Entrances
 * decelerate and run a touch longer; exits accelerate and are shorter.
 *
 * These carry `from`/`to` states so the *whole animation* is baked in — an
 * overlay fades while sliding a bounded distance (it *suggests* a full slide
 * rather than travelling its entire width) and settles from a hair under full
 * size. A consumer never has to know an overlay should fade-with-slide; applying
 * the preset does it. The `offset` is direction-neutral (a `sizing` magnitude);
 * the component chooses the edge via the `origin` option on the preset adapters.
 */
const overlay = {
    enter: {
        duration: duration.xLong,
        easing: easing.emphasizedDecelerate,
        delay: duration.none,
        from: {opacity: 0, offset: sizing.size_960, scale: 0.99},
        to: {opacity: 1, offset: 0, scale: 1},
    },
    exit: {
        // Exits are quicker and travel less than entrances: the overlay is on
        // its way out, so it mostly fades with just a small drift rather than a
        // full "suggestion" slide. A linear curve keeps the fade-out calm rather
        // than snapping away like an accelerated curve.
        duration: duration.medium,
        easing: easing.linear,
        delay: duration.none,
        from: {opacity: 1, offset: 0, scale: 1},
        to: {opacity: 0, offset: sizing.size_320, scale: 0.99},
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
    overlay,
    indicator,
    fade,
    loop,
};

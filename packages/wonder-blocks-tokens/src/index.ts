// primitive tokens
// These re-exports are valid while we still have color and spacing token
// instances in consumers.
/* eslint-disable import/no-deprecated */
import {color} from "./tokens/color";
import {spacing} from "./tokens/spacing";

// media queries
import {breakpoint} from "./tokens/media-queries";

// utils
import {
    mix,
    fade,
    cssDuration,
    cssEasing,
    motionTransition,
    cssPreset,
    motionPreset,
    waapiPreset,
    pxToRem,
    remToPx,
    tokenValue,
} from "./util";

import {mapValuesToCssVars} from "./internal/map-values-to-css-vars";

// theme
import theme from "./tokens/theme";

// The raw (JS-friendly) animation tree: durations as millisecond numbers and
// easings as cubic-bézier arrays, for use with JS animation libraries.
import {animation as animationValue} from "./theme/semantic/animation";

const {border, boxShadow, semanticColor, sizing, font, animation} = theme;

export {
    /**
     * Primitive tokens for the Wonder Blocks design system.
     */
    border,
    boxShadow,
    // TODO(WB-1989): Remove this export once all consumers have migrated to
    // using semanticColor.
    color,
    font,
    pxToRem,
    remToPx,
    sizing,
    spacing,
    /**
     * Media query breakpoints.
     */
    breakpoint,
    /**
     * Semantic tokens.
     */
    semanticColor,
    /**
     * Animation tokens as CSS variable references (`var(--wb-animation-…)`), for
     * use in CSS / Aphrodite. Includes primitive scales (`animation.duration.*`,
     * `animation.easing.*`) and semantic presets (e.g. `animation.overlay.enter`).
     *
     * The `animation` namespace intentionally avoids colliding with the `motion`
     * React library, so a file can `import {motion} from "motion/react"` and
     * these tokens side by side without aliasing.
     */
    animation,
    /**
     * Animation tokens as raw JS values — durations as millisecond numbers and
     * easings as cubic-bézier arrays (plus `from`/`to` states on presets that
     * carry them) — for use with JS animation libraries (e.g. the
     * `motion`/framer-motion library, via `motionPreset`) and WAAPI. A superset
     * of `animation`: same timing shape, plus the preset states.
     */
    animationValue,
    /**
     * Utility functions for working with colors.
     */
    mix,
    fade,
    /**
     * Utility functions for working with animation tokens.
     * - `cssDuration` / `cssEasing` format raw values as CSS strings.
     * - `motionTransition` adapts a preset's *timing* for the `motion` library.
     * - `cssPreset` / `motionPreset` / `waapiPreset` adapt a full
     *   {@link AnimationPreset} (timing + `from`/`to` states) for CSS/Aphrodite,
     *   the `motion` React library, and WAAPI respectively. Pass `{origin}` to
     *   choose the edge a displacement comes from.
     */
    cssDuration,
    cssEasing,
    motionTransition,
    cssPreset,
    motionPreset,
    waapiPreset,
    /**
     * Allows converting regular JS tokens to CSS variables.
     */
    mapValuesToCssVars,
    /**
     * Resolves the raw value of a Wonder Blocks token at runtime by reading
     * the computed value of its underlying CSS custom property.
     */
    tokenValue,
};

export type {
    CubicBezier,
    AnimationToken,
    MotionLibraryTransition,
    AnimationState,
    AnimationPreset,
    AnimationOrigin,
    AnimationPresetOptions,
    CssPreset,
    MotionLibraryPreset,
} from "./util/animation-utils";

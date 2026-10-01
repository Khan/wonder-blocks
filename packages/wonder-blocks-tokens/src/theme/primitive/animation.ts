import {CubicBezier} from "../../util/animation-utils";

/**
 * Primitive duration tokens, in **milliseconds**.
 *
 * NOTE: Durations use fixed `ms` values (not `rem`) so that animation timing is
 * consistent regardless of the root font size — the same rationale used by the
 * `border` tokens.
 *
 * The scale is grounded in the durations already used across Wonder Blocks and
 * the wider Khan Academy frontend:
 * - `xShort`/`short`: micro-interactions (button/icon feedback, switch thumb)
 * - `medium`/`long`: expand/collapse, indicators
 * - `xLong`: overlays (drawers, modals)
 * - `xxLong`: looping animations (spinners)
 */
export const duration = {
    none: 0,
    xShort: 100,
    short: 150,
    medium: 200,
    long: 300,
    xLong: 400,
    xxLong: 1100,
} as const;

/**
 * Primitive easing tokens, expressed as cubic-bézier control points
 * (`[P1x, P1y, P2x, P2y]`, the W3C Design Tokens `cubicBezier` representation).
 *
 * Storing the raw control points — rather than a `cubic-bezier(…)` string —
 * lets a single token drive CSS (via `cssEasing`), the `motion` React library
 * (which consumes the array directly), and WAAPI without a runtime parser.
 *
 * These curves supersede the ad-hoc CSS keywords used today:
 * - `standard` replaces `ease` / `ease-in-out`
 * - `decelerate` replaces `ease-out` (entrances)
 * - `accelerate` replaces `ease-in` (exits)
 */
export const easing = {
    linear: [0, 0, 1, 1],
    standard: [0.4, 0, 0.2, 1],
    decelerate: [0, 0, 0.2, 1],
    accelerate: [0.4, 0, 1, 1],
    emphasizedDecelerate: [0.05, 0.7, 0.1, 1],
    emphasizedAccelerate: [0.3, 0, 0.8, 0.15],
} as const satisfies Record<string, CubicBezier>;

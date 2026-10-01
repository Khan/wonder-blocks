/**
 * Utilities for working with animation tokens.
 *
 * animation tokens are authored as raw, implementation-agnostic values: durations
 * as millisecond numbers and easings as cubic-bézier control-point arrays
 * (`[P1x, P1y, P2x, P2y]`, matching the W3C Design Tokens `cubicBezier` type).
 * These helpers format those raw values for a specific target (CSS strings, the
 * `motion` React library, WAAPI, …) so the same token can drive any of them.
 */

/**
 * A cubic-bézier easing curve expressed as its four control-point coordinates
 * `[P1x, P1y, P2x, P2y]`.
 *
 * This is the canonical, implementation-agnostic representation of an easing
 * curve: CSS consumes it via {@link cssEasing} as a `cubic-bezier(…)` string,
 * while the `motion` React library consumes the array directly.
 */
export type CubicBezier = readonly [number, number, number, number];

/**
 * A single animation "clock": how long an animation runs, the curve it follows,
 * and how long to wait before it starts.
 *
 * Durations are milliseconds. This mirrors the W3C Design Tokens `transition`
 * composite type (`{duration, delay, timingFunction}`). The token intentionally
 * does NOT describe *which* properties move — that is the component's job.
 */
export type AnimationToken = {
    /** Duration in milliseconds. */
    duration: number;
    /** Easing curve as cubic-bézier control points. */
    easing: CubicBezier;
    /** Delay before the animation starts, in milliseconds. */
    delay: number;
};

/**
 * Format a millisecond duration as a CSS time string.
 *
 * @example
 * cssDuration(300); // "300ms"
 */
export function cssDuration(ms: number): string {
    return `${ms}ms`;
}

/**
 * Format cubic-bézier control points as a CSS `cubic-bezier(…)` string.
 *
 * @example
 * cssEasing([0.4, 0, 0.2, 1]); // "cubic-bezier(0.4, 0, 0.2, 1)"
 */
export function cssEasing(easing: CubicBezier): string {
    return `cubic-bezier(${easing.join(", ")})`;
}

/**
 * The result of converting a {@link AnimationToken} into a value ready to spread
 * into the `motion` React library's `transition` prop (seconds + bézier array).
 */
export type MotionLibraryTransition = {
    duration: number;
    ease: [number, number, number, number];
    delay: number;
};

/**
 * Adapt a raw animation token for the `motion` React library, which expresses
 * duration in **seconds** and easing as a mutable 4-number array.
 *
 * @example
 * <motion.div transition={motionTransition(animationValue.floating.enter)} />
 * // transition = {duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0}
 */
export function motionTransition(
    token: AnimationToken,
): MotionLibraryTransition {
    return {
        duration: token.duration / 1000,
        ease: [...token.easing] as [number, number, number, number],
        delay: token.delay / 1000,
    };
}

/**
 * A declarative snapshot of the visual state at one end of a preset.
 *
 * This is pure data — no keyframe or CSS strings — so the same state can be
 * rendered into an Aphrodite keyframe, a `motion` React variant, or a WAAPI
 * keyframe. It carries the *magnitude* of the motion (how far, how much, how
 * opaque), which is a reusable design decision, just like duration and easing.
 *
 * `offset` is an **axis-agnostic displacement magnitude** — a CSS length string
 * (typically a `sizing` token like `"6rem"`) or a raw px number. The token stays
 * direction-neutral so one archetype can serve a drawer entering from any edge;
 * the consumer picks the edge via the `origin` option when the preset is
 * applied. `scale` is unitless (`0.99` = 99%); `opacity` is `0`–`1`.
 */
export type AnimationState = {
    /** Target opacity, `0`–`1`. */
    opacity?: number;
    /** Displacement magnitude (a CSS length string or px number). */
    offset?: number | string;
    /** Unitless scale factor (`1` = natural size). */
    scale?: number;
};

/**
 * A complete preset: a {@link AnimationToken} clock **plus** the `from`/`to`
 * visual states that give the motion its character (how far it slides, whether
 * it fades, how much it scales).
 *
 * This is the key difference from a bare {@link AnimationToken}: the token owns the
 * *full opinion* of the preset as declarative data. The component owns only
 * which element it binds to and — via the `origin` option — the direction. The
 * data stays implementation-agnostic (no compiled keyframes, no runtime), so
 * one preset drives {@link cssPreset}, {@link motionPreset}, and
 * {@link waapiPreset} identically.
 */
export type AnimationPreset = AnimationToken & {
    /** The visual state the element animates *from*. */
    from?: AnimationState;
    /** The visual state the element animates *to*. */
    to?: AnimationState;
};

/** The edge a preset's displacement originates from. */
export type AnimationOrigin = "top" | "bottom" | "left" | "right";

/** The CSS `animation-fill-mode` values a preset adapter can emit. */
export type AnimationFillMode = "backwards" | "forwards" | "both" | "none";

/** Options shared by every preset adapter. */
export type AnimationPresetOptions = {
    /**
     * Which edge the displacement comes from. Defaults to `"bottom"` (the
     * element starts below its resting place and rises up).
     */
    origin?: AnimationOrigin;
    /**
     * The `animation-fill-mode` to emit (CSS / WAAPI adapters only; ignored by
     * `motionPreset`). Defaults to `"backwards"`, which holds the `from` state
     * before the animation starts — correct for an **entrance** that mounts and
     * plays in. An **exit** should pass `"forwards"` so the element holds its
     * `to` state (e.g. `opacity: 0`) after the keyframe finishes, instead of
     * snapping back to its resting style and flashing visible before unmount.
     */
    fillMode?: AnimationFillMode;
};

/** Append a minus sign to a length (number or CSS string), leaving zero alone. */
function negateLength(length: number | string): number | string {
    if (typeof length === "number") {
        return length === 0 ? 0 : -length;
    }
    return length.startsWith("-") ? length.slice(1) : `-${length}`;
}

/** Resolve a `AnimationState`'s `offset` into a signed value on the origin's axis. */
function resolveOffset(
    offset: number | string,
    origin: AnimationOrigin,
): {axis: "x" | "y"; value: number | string} {
    const axis = origin === "left" || origin === "right" ? "x" : "y";
    // "top"/"left" start on the negative side of the axis, "bottom"/"right" on
    // the positive side.
    const value =
        origin === "top" || origin === "left" ? negateLength(offset) : offset;
    return {axis, value};
}

/** Render a `AnimationState` as `{opacity, transform}` (CSS / WAAPI form). */
function stateToCss(
    state: AnimationState | undefined,
    origin: AnimationOrigin,
): {opacity?: number; transform?: string} {
    if (!state) {
        return {};
    }
    const out: {opacity?: number; transform?: string} = {};
    if (state.opacity != null) {
        out.opacity = state.opacity;
    }
    const transforms: Array<string> = [];
    if (state.offset != null) {
        const {axis, value} = resolveOffset(state.offset, origin);
        const length = typeof value === "number" ? `${value}px` : value;
        transforms.push(`translate${axis.toUpperCase()}(${length})`);
    }
    if (state.scale != null) {
        transforms.push(`scale(${state.scale})`);
    }
    if (transforms.length > 0) {
        out.transform = transforms.join(" ");
    }
    return out;
}

/** Render a `AnimationState` as the `motion` library's per-property variant form. */
function stateToMotion(
    state: AnimationState | undefined,
    origin: AnimationOrigin,
): {
    opacity?: number;
    x?: number | string;
    y?: number | string;
    scale?: number;
} {
    if (!state) {
        return {};
    }
    const out: {
        opacity?: number;
        x?: number | string;
        y?: number | string;
        scale?: number;
    } = {};
    if (state.opacity != null) {
        out.opacity = state.opacity;
    }
    if (state.scale != null) {
        out.scale = state.scale;
    }
    if (state.offset != null) {
        const {axis, value} = resolveOffset(state.offset, origin);
        out[axis] = value;
    }
    return out;
}

/**
 * An Aphrodite-ready style object for a preset: the `from`/`to` keyframe plus
 * the timing pulled from the token.
 */
export type CssPreset = {
    animationName: {
        from: {opacity?: number; transform?: string};
        to: {opacity?: number; transform?: string};
    };
    animationDuration: string;
    animationTimingFunction: string;
    animationDelay: string;
    animationFillMode: AnimationFillMode;
};

/**
 * Adapt a {@link AnimationPreset} for CSS / Aphrodite: returns a style object with
 * an object `animationName` keyframe (`from`/`to`) and the timing from the
 * token. Spread it straight into `StyleSheet.create`.
 *
 * Pass `fillMode: "forwards"` for **exit** animations so the element holds its
 * `to` state after the keyframe finishes rather than snapping back to its
 * resting style (see {@link AnimationPresetOptions.fillMode}).
 *
 * @example
 * StyleSheet.create({
 *   drawerEnter: cssPreset(animationValue.docked.enter, {origin: "left"}),
 *   drawerExit: cssPreset(animationValue.docked.exit, {origin: "left", fillMode: "forwards"}),
 * });
 */
export function cssPreset(
    preset: AnimationPreset,
    {origin = "bottom", fillMode = "backwards"}: AnimationPresetOptions = {},
): CssPreset {
    return {
        animationName: {
            from: stateToCss(preset.from, origin),
            to: stateToCss(preset.to, origin),
        },
        animationDuration: cssDuration(preset.duration),
        animationTimingFunction: cssEasing(preset.easing),
        animationDelay: cssDuration(preset.delay),
        animationFillMode: fillMode,
    };
}

/**
 * An Aphrodite-ready style object for a CSS `transition`: the timing from a
 * token spread across the long-hand `transition-*` properties.
 */
export type CssTransition = {
    transitionProperty: string;
    transitionDuration: string;
    transitionTimingFunction: string;
    transitionDelay: string;
};

/**
 * Adapt a timing-only {@link AnimationToken} for a CSS `transition`: returns the
 * long-hand `transition-*` properties for the given property (or properties).
 * The counterpart to {@link cssPreset} for state-change transitions (hover,
 * expand/collapse, a moving indicator) rather than mount/unmount keyframes.
 *
 * Spread it straight into `StyleSheet.create`. Any `from`/`to` states on a
 * preset are ignored — a transition animates the element's own style changes,
 * not a baked-in keyframe.
 *
 * @example
 * StyleSheet.create({
 *   caret: cssTransition("transform", animationValue.disclosure.expand),
 *   indicator: cssTransition(["transform", "width"], animationValue.indicator.move),
 * });
 */
export function cssTransition(
    property: string | ReadonlyArray<string>,
    token: AnimationToken,
): CssTransition {
    return {
        transitionProperty: Array.isArray(property)
            ? property.join(", ")
            : (property as string),
        transitionDuration: cssDuration(token.duration),
        transitionTimingFunction: cssEasing(token.easing),
        transitionDelay: cssDuration(token.delay),
    };
}

/** The `initial`/`animate`/`transition` triple for the `motion` React library. */
export type MotionLibraryPreset = {
    initial: ReturnType<typeof stateToMotion>;
    animate: ReturnType<typeof stateToMotion>;
    transition: MotionLibraryTransition;
};

/**
 * Adapt a {@link AnimationPreset} for the `motion` React library: returns
 * `{initial, animate, transition}` using the library's per-property variant
 * form (`x`/`y`/`scale`/`opacity`) and seconds-based transition.
 *
 * @example
 * <motion.div {...motionPreset(animationValue.floating.enter, {origin: "bottom"})} />
 */
export function motionPreset(
    preset: AnimationPreset,
    {origin = "bottom"}: AnimationPresetOptions = {},
): MotionLibraryPreset {
    return {
        initial: stateToMotion(preset.from, origin),
        animate: stateToMotion(preset.to, origin),
        transition: motionTransition(preset),
    };
}

/** A single WAAPI keyframe (structurally compatible with the DOM `Keyframe`). */
export type WaapiKeyframe = {opacity?: number; transform?: string};

/**
 * WAAPI timing options (structurally compatible with the DOM
 * `KeyframeAnimationOptions`), ready to pass to `element.animate(...)`.
 */
export type WaapiOptions = {
    duration: number;
    easing: string;
    delay: number;
    fill: "backwards" | "forwards" | "both" | "none";
};

/**
 * Adapt a {@link AnimationPreset} for the Web Animations API: returns the
 * `[keyframes, options]` tuple for `element.animate(...)`.
 *
 * @example
 * el.animate(...waapiPreset(animationValue.floating.enter, {origin: "bottom"}));
 */
export function waapiPreset(
    preset: AnimationPreset,
    {origin = "bottom", fillMode = "backwards"}: AnimationPresetOptions = {},
): [Array<WaapiKeyframe>, WaapiOptions] {
    return [
        [stateToCss(preset.from, origin), stateToCss(preset.to, origin)],
        {
            duration: preset.duration,
            easing: cssEasing(preset.easing),
            delay: preset.delay,
            fill: fillMode,
        },
    ];
}

/**
 * The shape of a raw animation tree after being formatted into CSS strings: every
 * duration number becomes a `"…ms"` string and every easing array becomes a
 * `"cubic-bezier(…)"` string, preserving the nested object structure.
 *
 * The `from`/`to` preset states are dropped: they hold magnitude data
 * (opacity/scale/offset), not timing, and are consumed by the preset adapters
 * rather than emitted as CSS variables.
 */
export type AnimationCssValue<T> = T extends number
    ? string
    : T extends CubicBezier
      ? string
      : T extends object
        ? {
              [K in keyof T as K extends "from" | "to"
                  ? never
                  : K]: AnimationCssValue<T[K]>;
          }
        : T;

/**
 * Recursively format a raw animation tree (millisecond numbers + cubic-bézier
 * arrays) into a tree of CSS strings.
 *
 * This is what feeds the `--wb-animation-*` CSS variable pipeline: the resulting
 * tree contains only string leaves, so it flows through the existing
 * `generate-css-variables` build step (which cannot handle raw arrays).
 *
 * The `from`/`to` preset states are intentionally skipped — their numeric
 * values (opacity, scale) are not durations and must not be formatted as such.
 * They reach consumers only through {@link cssPreset} / {@link motionPreset} /
 * {@link waapiPreset}.
 */
export function toCssTree<T>(tree: T): AnimationCssValue<T> {
    if (typeof tree === "number") {
        return cssDuration(tree) as AnimationCssValue<T>;
    }
    if (Array.isArray(tree)) {
        return cssEasing(
            tree as unknown as CubicBezier,
        ) as AnimationCssValue<T>;
    }
    if (tree && typeof tree === "object") {
        const result: Record<string, unknown> = {};
        for (const key of Object.keys(tree)) {
            if (key === "from" || key === "to") {
                continue;
            }
            result[key] = toCssTree((tree as Record<string, unknown>)[key]);
        }
        return result as AnimationCssValue<T>;
    }
    return tree as AnimationCssValue<T>;
}

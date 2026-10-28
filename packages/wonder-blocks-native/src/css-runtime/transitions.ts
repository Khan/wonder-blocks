/**
 * CSS `transition` → data the native animation hook can drive.
 *
 * Only numeric RN style values are animated (e.g. `border-radius`, sizes,
 * opacity). Colour transitions would need `Animated` interpolation between
 * colour strings; WB CSS doesn't transition colours today, so they snap.
 */
import {convertDeclarations} from "./css-to-rn";

/** `cubic-bezier(x1, y1, x2, y2)` control points. */
export type CubicBezier = readonly [number, number, number, number];

export type NativeTransition = {
    /** RN style keys this transition drives (`border-radius` → 4 corners). */
    keys: ReadonlyArray<string>;
    durationMs: number;
    delayMs: number;
    easing: CubicBezier;
};

/** CSS named timing functions, as defined by the spec. */
const NAMED_EASINGS: Record<string, CubicBezier> = {
    linear: [0, 0, 1, 1],
    ease: [0.25, 0.1, 0.25, 1],
    "ease-in": [0.42, 0, 1, 1],
    "ease-out": [0, 0, 0.58, 1],
    "ease-in-out": [0.42, 0, 0.58, 1],
};

const parseTime = (token: string): number | null => {
    const match = /^(-?\d*\.?\d+)(m?s)$/.exec(token);
    if (!match) {
        return null;
    }
    const n = parseFloat(match[1]);
    return match[2] === "s" ? n * 1000 : n;
};

const parseEasing = (token: string): CubicBezier | null => {
    if (token in NAMED_EASINGS) {
        return NAMED_EASINGS[token];
    }
    const bezier = /^cubic-bezier\(([^)]*)\)$/.exec(token);
    if (bezier) {
        const points = bezier[1].split(",").map((p) => parseFloat(p));
        if (points.length === 4 && points.every(Number.isFinite)) {
            return points as unknown as CubicBezier;
        }
    }
    return null;
};

/**
 * The RN style keys a CSS property expands to, found by converting a dummy
 * value (so shorthands and logical properties map exactly as they do for
 * real declarations).
 */
const rnKeysForProperty = (property: string): Array<string> => {
    for (const probe of ["0", "transparent"]) {
        const {style} = convertDeclarations([[property, probe]]);
        const keys = Object.keys(style);
        if (keys.length) {
            return keys;
        }
    }
    return [];
};

/**
 * Parse a CSS `transition` shorthand, e.g.
 * `border-radius 0.1s ease-in-out, opacity 200ms`.
 *
 * `all` expands to `allKeys` (the element's resolved numeric style keys).
 */
export const parseTransitions = (
    value: string,
    allKeys: ReadonlyArray<string> = [],
): Array<NativeTransition> => {
    const transitions: Array<NativeTransition> = [];
    // Commas inside `cubic-bezier(…)` aren't list separators.
    for (const item of value.split(/,(?![^(]*\))/)) {
        const tokens = item.trim().match(/[^\s(]+(?:\([^)]*\))?/g) ?? [];
        let property = "all";
        const times: Array<number> = [];
        let easing: CubicBezier = NAMED_EASINGS.ease;
        for (const token of tokens) {
            const time = parseTime(token);
            const parsedEasing = time == null ? parseEasing(token) : null;
            if (time != null) {
                times.push(time);
            } else if (parsedEasing) {
                easing = parsedEasing;
            } else {
                property = token;
            }
        }
        const [durationMs = 0, delayMs = 0] = times;
        if (property === "none" || durationMs <= 0) {
            continue;
        }
        const keys =
            property === "all" ? [...allKeys] : rnKeysForProperty(property);
        if (keys.length) {
            transitions.push({keys, durationMs, delayMs, easing});
        }
    }
    return transitions;
};

/**
 * Convert resolved CSS declarations (no `var()` left) into a React Native
 * style object.
 *
 * `css-to-react-native` (the converter styled-components/native uses) does
 * the heavy lifting for shorthands (`padding`, `border`, `font`, …). Around
 * it we handle the things WB CSS relies on that it doesn't:
 *
 * - WB `rem` is 10px (`html {font-size: 62.5%}`), so `1.6rem` → `16`.
 * - Logical properties (`block-size`, `padding-inline`, …) → the RN
 *   equivalents (`height`, `paddingStart`/`paddingEnd`, …).
 * - CSS `display: flex` defaults to `row`; RN defaults to `column`.
 * - Properties with no RN equivalent on the old architecture (`outline`,
 *   `box-shadow`, `cursor`, `transition`, …) are dropped and reported.
 */
import transform from "css-to-react-native";

export type RNStyle = Record<string, unknown>;

/** WB's root font size: `html {font-size: 62.5%}` → 1rem = 10px. */
export const REM_BASE = 10;

/**
 * Properties we deliberately drop. Most are interaction chrome the platform
 * provides natively (focus rings, cursors, tap highlight) or are web-only
 * text layout. `outline*`/`box-shadow` *are* available in RN ≥0.76, but only
 * on the New Architecture, which mobile hasn't enabled yet.
 */
const DROPPED = new Set([
    "outline",
    "outline-offset",
    "outline-color",
    "outline-width",
    "outline-style",
    "box-shadow",
    "box-sizing",
    "cursor",
    "transition",
    "transition-property",
    "touch-action",
    "user-select",
    "white-space",
    "text-overflow",
    "text-underline-offset",
    "text-decoration-thickness",
    "overflow-wrap",
    "word-break",
    "hyphens",
    "vertical-align",
    "content",
    "-webkit-tap-highlight-color",
    "-webkit-font-smoothing",
    "-moz-osx-font-smoothing",
    "-webkit-box-orient",
    "-webkit-line-clamp",
]);

const LOGICAL: Record<string, string | ((value: string) => RNStyle)> = {
    "block-size": "height",
    "inline-size": "width",
    "min-block-size": "min-height",
    "max-block-size": "max-height",
    "min-inline-size": "min-width",
    "max-inline-size": "max-width",
    "inset-block-start": "top",
    "inset-block-end": "bottom",
    "inset-inline-start": "start",
    "inset-inline-end": "end",
    "margin-inline-start": "margin-start",
    "margin-inline-end": "margin-end",
    "padding-inline-start": "padding-start",
    "padding-inline-end": "padding-end",
    "margin-block-start": "margin-top",
    "margin-block-end": "margin-bottom",
    "padding-block-start": "padding-top",
    "padding-block-end": "padding-bottom",
};

/** `padding-inline: a b` → `{paddingStart: a, paddingEnd: b}` etc. */
const PAIRED_LOGICAL: Record<string, [string, string]> = {
    "padding-inline": ["paddingStart", "paddingEnd"],
    "margin-inline": ["marginStart", "marginEnd"],
    "padding-block": ["paddingTop", "paddingBottom"],
    "margin-block": ["marginTop", "marginBottom"],
    "inset-block": ["top", "bottom"],
    "inset-inline": ["start", "end"],
};

const toNumber = (value: string): number | string => {
    const trimmed = value.trim();
    const px = /^(-?\d*\.?\d+)(px)?$/.exec(trimmed);
    return px ? parseFloat(px[1]) : trimmed;
};

/** Replace every `Nrem` with its px equivalent. */
export const remToPx = (value: string): string =>
    value.replace(
        /(-?\d*\.?\d+)rem\b/g,
        (_, n: string) => `${parseFloat(n) * REM_BASE}px`,
    );

const splitTopLevel = (value: string): Array<string> =>
    value.match(/(?:[^\s()]+|\([^)]*\))+/g) ?? [];

/**
 * Convert one declaration. Returns `null` for dropped declarations.
 */
const convertDeclaration = (prop: string, rawValue: string): RNStyle | null => {
    if (DROPPED.has(prop)) {
        return null;
    }
    const value = remToPx(rawValue.replace(/\s*!important$/, ""));

    const paired = PAIRED_LOGICAL[prop];
    if (paired) {
        const [a, b = a] = splitTopLevel(value);
        return {[paired[0]]: toNumber(a), [paired[1]]: toNumber(b)};
    }

    if (prop === "display") {
        // RN supports `flex` and `none` only. CSS flex rows need an explicit
        // direction on native.
        if (value === "none") {
            return {display: "none"};
        }
        if (value === "flex" || value === "inline-flex") {
            return {display: "flex", flexDirection: "row"};
        }
        return {};
    }
    if (prop === "visibility") {
        return value === "hidden" ? {opacity: 0} : {};
    }
    if (prop === "place-self") {
        return {alignSelf: value.split(/\s+/)[0]};
    }
    if (prop === "font-family") {
        // RN takes one family. Mapping to the app's registered font files
        // (which often encode the weight, e.g. `PlusJakartaSans-Bold`) is
        // the job of `NativeThemeProvider`'s `fontFamily` option.
        return {fontFamily: value.split(",")[0].replace(/["']/g, "").trim()};
    }
    if (prop === "text-decoration") {
        const line = value.split(/\s+/)[0];
        return {textDecorationLine: line === "none" ? "none" : line};
    }
    if (prop === "background") {
        // WB only uses `background` for colours.
        return {backgroundColor: value};
    }

    const mapped = LOGICAL[prop];
    const cssProp = typeof mapped === "string" ? mapped : prop;

    try {
        return transform([[cssProp, value]]);
    } catch {
        return null;
    }
};

export type ConvertResult = {
    style: RNStyle;
    /** `prop: value` pairs that couldn't be represented on native. */
    dropped: Array<string>;
};

export const convertDeclarations = (
    declarations: ReadonlyArray<readonly [string, string]>,
): ConvertResult => {
    const style: RNStyle = {};
    const dropped: Array<string> = [];
    for (const [prop, value] of declarations) {
        const converted = convertDeclaration(prop, value);
        if (converted) {
            Object.assign(style, converted);
        } else {
            dropped.push(`${prop}: ${value}`);
        }
    }

    // CSS `line-height` may be unitless (a multiplier); RN needs points.
    if (
        typeof style.lineHeight === "number" &&
        style.lineHeight < 4 &&
        typeof style.fontSize === "number"
    ) {
        style.lineHeight = style.lineHeight * style.fontSize;
    }
    return {style, dropped};
};

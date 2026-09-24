/**
 * A tiny CSS cascade for React Native.
 *
 * Given compiled sheets, the classes an element "has", its interaction
 * states and the active theme's variables, return the RN style CSS would
 * have computed. The subset implemented is exactly what WB's CSS Modules
 * use: class matching, `:where()` (zero-specificity), state pseudo-classes,
 * `[aria-*]` attributes, descendant selectors, `(hover: hover)` media,
 * nested `@layer`s, and custom-property (`var()`) resolution.
 */
import {convertDeclarations} from "./css-to-rn";
import type {RNStyle} from "./css-to-rn";
import type {
    CompoundCondition,
    NativeRule,
    NativeState,
    NativeStyleSheet,
    NativeThemeVars,
} from "./types";

export type NativeStates = Partial<Record<NativeState, boolean>>;

export type ElementDescriptor = {
    classes: ReadonlyArray<string | false | null | undefined>;
    states?: NativeStates;
};

export type ResolveEnv = {
    themeVars: NativeThemeVars;
    /** Whether the device has a hover-capable pointer. Defaults to false. */
    hover?: boolean;
};

export type ResolveInput = ElementDescriptor & {
    /** Ancestors (nearest first) for descendant selectors. */
    ancestors?: ReadonlyArray<ElementDescriptor>;
    /**
     * Values inherited from the parent element: custom properties (which
     * always inherit in CSS) and inheritable text properties.
     */
    inherited?: Inherited;
};

export type Inherited = {
    vars: Readonly<Record<string, string>>;
    /** Raw CSS declarations for inherited text properties. */
    text: ReadonlyArray<readonly [string, string]>;
};

export type ResolvedStyle = {
    style: RNStyle;
    /** Pass to children as `inherited`. */
    inherited: Inherited;
    /** Declarations that couldn't be represented on native (for debugging). */
    dropped: Array<string>;
};

/**
 * CSS properties that inherit. RN `<Text>` only inherits from a parent
 * `<Text>`, not from a `<View>`, so we have to propagate these ourselves.
 */
const INHERITED_TEXT_PROPS = new Set([
    "color",
    "font",
    "font-family",
    "font-size",
    "font-style",
    "font-weight",
    "letter-spacing",
    "line-height",
    "text-align",
    "text-transform",
]);

const EMPTY_INHERITED: Inherited = {vars: {}, text: []};

const matchesCompound = (
    compound: CompoundCondition,
    classes: ReadonlySet<string>,
    states: NativeStates,
): boolean =>
    compound.classes.every((c) => classes.has(c)) &&
    compound.states.every((s) => !!states[s]) &&
    compound.notStates.every((s) => !states[s]);

const toClassSet = (d: ElementDescriptor): Set<string> =>
    new Set(d.classes.filter((c): c is string => !!c));

const VAR_RE = /var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*(?:\([^()]*\)[^()]*)*))?\)/g;

export const resolveVars = (
    value: string,
    lookup: (name: string) => string | undefined,
    depth = 0,
): string | null => {
    if (depth > 10) {
        return null;
    }
    let failed = false;
    const result = value.replace(VAR_RE, (_, name: string, fallback) => {
        const found = lookup(name) ?? fallback;
        if (found == null) {
            failed = true;
            return "";
        }
        const resolved = resolveVars(found, lookup, depth + 1);
        if (resolved == null) {
            failed = true;
            return "";
        }
        return resolved;
    });
    // Per spec, an unresolvable var() makes the declaration invalid at
    // computed-value time.
    return failed ? null : result;
};

type Candidate = {rule: NativeRule; sheetIndex: number};

const compareCandidates = (a: Candidate, b: Candidate) =>
    a.rule.layerRank - b.rule.layerRank ||
    a.rule.specificity - b.rule.specificity ||
    a.sheetIndex - b.sheetIndex ||
    a.rule.order - b.rule.order;

export const resolveStyle = (
    sheets: ReadonlyArray<NativeStyleSheet>,
    input: ResolveInput,
    env: ResolveEnv,
): ResolvedStyle => {
    const classes = toClassSet(input);
    const states = input.states ?? {};
    const ancestors = (input.ancestors ?? []).map((a) => ({
        classes: toClassSet(a),
        states: a.states ?? {},
    }));
    const inherited = input.inherited ?? EMPTY_INHERITED;

    const candidates: Array<Candidate> = [];
    sheets.forEach((sheet, sheetIndex) => {
        for (const rule of sheet.rules) {
            if (rule.media === "hover" && !env.hover) {
                continue;
            }
            if (rule.media === "no-hover" && env.hover) {
                continue;
            }
            if (!matchesCompound(rule.target, classes, states)) {
                continue;
            }
            if (
                !rule.ancestors.every((cond) =>
                    ancestors.some((a) =>
                        matchesCompound(cond, a.classes, a.states),
                    ),
                )
            ) {
                continue;
            }
            candidates.push({rule, sheetIndex});
        }
    });
    candidates.sort(compareCandidates);

    // Cascade: later (higher-priority) declarations win.
    const cascaded = new Map<string, string>();
    for (const [prop, value] of inherited.text) {
        cascaded.set(prop, value);
    }
    const vars: Record<string, string> = {...inherited.vars};
    for (const {rule} of candidates) {
        for (const [prop, value] of rule.declarations) {
            if (prop.startsWith("--")) {
                vars[prop] = value;
            } else {
                // Re-insert so Map order reflects cascade order (matters when
                // a shorthand and longhand both apply).
                cascaded.delete(prop);
                cascaded.set(prop, value);
            }
        }
    }

    const lookup = (name: string) => vars[name] ?? env.themeVars[name];

    // Custom properties are resolved against the element they're declared
    // on, then inherited as resolved values.
    const resolvedVars: Record<string, string> = {};
    for (const [name, value] of Object.entries(vars)) {
        const resolved = resolveVars(value, lookup);
        if (resolved != null) {
            resolvedVars[name] = resolved;
        }
    }

    const declarations: Array<[string, string]> = [];
    const dropped: Array<string> = [];
    const inheritedText: Array<[string, string]> = [];
    for (const [prop, value] of cascaded) {
        const resolved = resolveVars(value, lookup);
        if (resolved == null) {
            dropped.push(`${prop}: ${value} (unresolved var)`);
            continue;
        }
        declarations.push([prop, resolved]);
        if (INHERITED_TEXT_PROPS.has(prop)) {
            inheritedText.push([prop, resolved]);
        }
    }

    const converted = convertDeclarations(declarations);
    return {
        style: converted.style,
        inherited: {vars: resolvedVars, text: inheritedText},
        dropped: [...dropped, ...converted.dropped],
    };
};

/**
 * Split a resolved style into the parts that apply to a `<View>` container
 * and the parts that only make sense on `<Text>`. RN warns about text props
 * on views on some platforms.
 */
const TEXT_ONLY_STYLE_KEYS = new Set([
    "color",
    "fontFamily",
    "fontSize",
    "fontStyle",
    "fontWeight",
    "letterSpacing",
    "lineHeight",
    "textAlign",
    "textDecorationLine",
    "textDecorationColor",
    "textDecorationStyle",
    "textTransform",
]);

export const splitTextStyle = (
    style: RNStyle,
): {view: RNStyle; text: RNStyle} => {
    const view: RNStyle = {};
    const text: RNStyle = {};
    for (const [key, value] of Object.entries(style)) {
        (TEXT_ONLY_STYLE_KEYS.has(key) ? text : view)[key] = value;
    }
    return {view, text};
};

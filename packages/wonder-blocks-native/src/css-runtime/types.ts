/**
 * Data structures emitted by `build/compile-css-to-native.ts` and consumed by
 * the runtime resolver in `./resolve.ts`.
 *
 * A web `*.module.css` file is compiled into a flat, ordered list of rules.
 * Each rule says "when an element has these classes (and is in these
 * interaction states), apply these declarations". The runtime re-implements
 * the tiny part of the CSS cascade that WB's CSS Modules actually rely on:
 * class matching, specificity + source order, a few state pseudo-classes and
 * custom property (`var()`) resolution against a theme.
 */

/**
 * Interaction / ARIA states a selector can depend on.
 *
 * - `hover` ← `:hover`
 * - `press` ← `:active` (and the `.pressed` class, which WB uses for
 *   keyboard presses — the component passes that as a class, not a state)
 * - `focus` ← `:focus-visible` / `:focus`
 * - `disabled` ← `[aria-disabled="true"]`
 * - `current` ← `[aria-current="true"]`
 */
export type NativeState = "hover" | "press" | "focus" | "disabled" | "current";

/**
 * Conditions for a single "compound" selector, e.g.
 * `.button:where(.primary):hover` →
 * `{classes: ["button", "primary"], states: ["hover"]}`.
 */
export type CompoundCondition = {
    /** Class names (local, un-hashed) that must all be present. */
    classes: ReadonlyArray<string>;
    /** States that must all be active. */
    states: ReadonlyArray<NativeState>;
    /** States that must all be inactive (e.g. `[aria-disabled="false"]`). */
    notStates: ReadonlyArray<NativeState>;
};

/**
 * Environment media conditions WB CSS uses. Native has no hover-capable
 * pointer, so `(hover: hover)` rules are skipped by default.
 */
export type NativeMedia = "hover" | "no-hover";

export type NativeRule = {
    /** The element the declarations apply to. */
    target: CompoundCondition;
    /**
     * Descendant combinators (`.button:hover .box`): compounds that must match
     * some ancestor of the target. Resolved against the `ancestors` passed to
     * `resolveStyle`.
     */
    ancestors: ReadonlyArray<CompoundCondition>;
    media: NativeMedia | null;
    /**
     * Rules in a nested `@layer` (e.g. `@layer reset`) lose to un-nested
     * rules regardless of specificity. 0 = nested layer, 1 = direct.
     */
    layerRank: number;
    /** Specificity (classes + attributes + pseudo-classes; `:where` = 0). */
    specificity: number;
    /** Source order. */
    order: number;
    /** Raw CSS declarations, `var()` references intact. */
    declarations: ReadonlyArray<readonly [property: string, value: string]>;
};

export type NativeStyleSheet = {
    /** The source file this sheet was compiled from (for debugging). */
    source: string;
    rules: ReadonlyArray<NativeRule>;
};

/**
 * Fully-resolved custom property values for one theme, e.g.
 * `{"--wb-semanticColor-action-primary-progressive-default-background": "#5753FA"}`.
 */
export type NativeThemeVars = Readonly<Record<string, string>>;

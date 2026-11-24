import postcss from "postcss";

/**
 * At-rules that the PostCSS pipeline in `postcss.config.cjs` resolves at build
 * time: `postcss-import` inlines `@import`s and `@csstools/postcss-mixins`
 * expands `@apply` and removes `@mixin`/`@define-mixin` definitions. None of
 * them should be left in the published CSS.
 */
export const DISALLOWED_AT_RULES: ReadonlySet<string> = new Set([
    "apply",
    "mixin",
    "define-mixin",
    "import",
]);

export type UnexpandedAtRule = {
    /** The at-rule's name, without the `@` (e.g. `"apply"`). */
    name: string;
    /** The at-rule's params (e.g. `"--wb-focus-visible"`). */
    params: string;
    /** 1-based line of the at-rule in the CSS, if known. */
    line: number | undefined;
};

/**
 * Find at-rules in built CSS that should have been resolved at build time.
 *
 * The CSS is parsed, so only real at-rules count: the same names inside
 * comments (such as a mixin file's doc comment) are ignored. At-rules nested
 * in `@layer`, `@media` or style rules are found too.
 *
 * @param css The CSS to check.
 * @param from The file the CSS came from, used in parse errors.
 * @returns The disallowed at-rules, in source order.
 */
export const findUnexpandedAtRules = (
    css: string,
    from?: string,
): Array<UnexpandedAtRule> => {
    const found: Array<UnexpandedAtRule> = [];
    postcss.parse(css, {from}).walkAtRules((atRule) => {
        if (DISALLOWED_AT_RULES.has(atRule.name)) {
            found.push({
                name: atRule.name,
                params: atRule.params,
                line: atRule.source?.start?.line,
            });
        }
    });
    return found;
};

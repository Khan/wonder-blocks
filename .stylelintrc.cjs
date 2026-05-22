// Stylelint config for the CSS Modules migration (Phase 0.4 of WB-2324).
//
// Goals:
//   * Catch CSS-side typos / structural issues that don't show up in JSX.
//   * Enforce design-token usage for color/spacing/typography.
//   * Co-exist with the PostCSS pipeline declared in `postcss.config.cjs`
//     (postcss-import + @csstools/postcss-mixins).
//
// Phase 0 lands with permissive defaults; severity tightens to `error`
// once Phase 5 migrates the last component (per WB-2324 0.4 plan).
/** @type {import("stylelint").Config} */
module.exports = {
    extends: ["stylelint-config-standard", "stylelint-config-css-modules"],
    plugins: [
        "stylelint-declaration-strict-value",
        "stylelint-value-no-unknown-custom-properties",
    ],
    rules: {
        // PostCSS at-rules from our pipeline (and cascade-layer literals).
        // Without this allow-list stylelint flags every `@apply` / `@mixin`
        // expansion as an unknown at-rule.
        "at-rule-no-unknown": [
            true,
            {
                ignoreAtRules: [
                    "apply",
                    "mixin",
                    "define-mixin",
                    "include",
                    "layer",
                ],
            },
        ],

        // CSS Modules class names use camelCase. Matches the Aphrodite
        // convention authors already know and lets `styles.foo` work
        // without `localsConvention` conversion in Vite's CSS Modules
        // pass. Examples: `.root`, `.pill`, `.iconWrapper`.
        "selector-class-pattern": "^[a-z]+([A-Z][a-z0-9]+)*$",

        // Wonder Blocks tokens use a camelCase + underscore convention
        // (`--wb-semanticColor-core-background-base`,
        // `--wb-sizing-size_080`) that intentionally doesn't conform to
        // stylelint-standard's kebab-case default. The token codegen
        // owns the naming; authors should not invent new custom
        // properties without going through the tokens package.
        "custom-property-pattern": null,

        // Reject `var(--anything-not-in-tokens)`. The token codegen
        // emits the canonical set of `--wb-*` custom properties into
        // `packages/wonder-blocks-tokens/dist/css/index.css`; any
        // reference outside that set is either a typo or an attempt to
        // bypass the design system. Requires `pnpm build:css` (CI's
        // build step already runs first; locally the `prelint:css` hook
        // ensures the file is fresh).
        "csstools/value-no-unknown-custom-properties": [
            true,
            {
                importFrom: [
                    "./packages/wonder-blocks-tokens/dist/css/index.css",
                ],
            },
        ],

        // Token-required properties. WARN level during the migration so
        // un-migrated Aphrodite call-sites can still co-exist without
        // failing CI. Tighten to `error` once Phase 5 component waves
        // complete.
        "scale-unlimited/declaration-strict-value": [
            [
                "/color/",
                "background-color",
                "border-color",
                "padding",
                "margin",
                "font-size",
                "font-family",
            ],
            {
                ignoreValues: [
                    "transparent",
                    "currentColor",
                    "inherit",
                    "0",
                    "auto",
                    "none",
                ],
                severity: "warning",
            },
        ],
    },
};

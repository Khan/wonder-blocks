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
    plugins: ["stylelint-declaration-strict-value"],
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

        // Naming convention for CSS Modules classes is deliberately
        // deferred until 0.5+ picks a project-wide direction (kebab-case
        // vs camelCase). Leave the pattern unset for now.
        "selector-class-pattern": null,

        // Wonder Blocks tokens use a camelCase + underscore convention
        // (`--wb-semanticColor-core-background-base`,
        // `--wb-sizing-size_080`) that intentionally doesn't conform to
        // stylelint-standard's kebab-case default. The token codegen
        // owns the naming; authors should not invent new custom
        // properties without going through the tokens package.
        "custom-property-pattern": null,

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

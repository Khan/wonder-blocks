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
const path = require("node:path");

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

        // Forbid CSS Modules `@value`. Tokens from
        // `@khanacademy/wonder-blocks-tokens` are the single source of
        // truth for shared values — `@value` would create a second,
        // parallel variable system that bypasses the design system.
        "at-rule-disallowed-list": ["value"],

        // Forbid CSS Modules `composes`. Compositional inheritance
        // between modules is hard to trace at scale and conflicts with
        // our `@apply` mixin pattern from
        // `@khanacademy/wonder-blocks-styles`. Authors should compose
        // class names in JS or share styles via mixins instead.
        "property-disallowed-list": ["composes"],

        // CSS Modules class names use camelCase. Matches the Aphrodite
        // convention authors already know and lets `styles.foo` work
        // without `localsConvention` conversion in Vite's CSS Modules
        // pass. Examples: `.root`, `.pill`, `.iconWrapper`.
        "selector-class-pattern": "^[a-z]+([A-Z][a-z0-9]+)*$",

        // Keep CSS Modules shallow. Authors coming from Aphrodite have
        // no nesting today; the migration plan keeps it close to flat.
        // Limit `2` allows one level of `&`-nested state or descendant
        // selectors inside a class (e.g. `.root { &:hover { … } }`) but
        // blocks deeper Sass-style chains. `@layer`, `@media`, and
        // `@supports` are ignored so the conventional
        // `@layer shared { .root { … } }` shape doesn't trip the rule.
        "max-nesting-depth": [
            2,
            {ignoreAtRules: ["layer", "media", "supports"]},
        ],

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
                // Absolute path so the rule resolves the same regardless of
                // the cwd stylelint is invoked from (root `pnpm lint:css`,
                // editor / `vscode-stylelint`, or a package-scoped run).
                importFrom: [
                    path.resolve(
                        __dirname,
                        "packages/wonder-blocks-tokens/dist/css/index.css",
                    ),
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

        // Forbid hex literals (`#fff`, `#112233`). Pairs with
        // `declaration-strict-value` above by closing the side-channel:
        // a hex used in a property *not* on that list (e.g. `box-shadow`,
        // `outline`, `fill`) would otherwise still slip through. Authors
        // should reach for a `--wb-*` token via `var()` instead. WARN
        // during the migration; tightens to `error` in Phase 5 alongside
        // `declaration-strict-value`.
        "color-no-hex": [true, {severity: "warning"}],
    },
};

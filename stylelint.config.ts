// Stylelint config for the CSS Modules migration (Phase 0.4 of WB-2324).
//
// Goals:
//   * Catch CSS-side typos / structural issues that don't show up in JSX.
//   * Enforce design-token usage for color/spacing/typography.
//   * Co-exist with the PostCSS pipeline declared in `postcss.config.cjs`
//     (postcss-import + @csstools/postcss-mixins).
//
// Phase 0 landed these rules at `warning` severity so un-migrated components
// could co-exist. Every component is migrated now, so they're `error` (per the
// WB-2324 0.4 plan; done in WB-2684), and `pnpm lint:css` runs with
// `--max-warnings 0` so any new warning-level rule also fails CI.
//
// Every `stylelint-disable` comment must say why after `--`
// (`reportDescriptionlessDisables`), like `eslint-comments/require-description`.
import path from "node:path";
import {fileURLToPath} from "node:url";

import type {Config} from "stylelint";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// `graphicsPalette` colors (e.g. `var(--wb-graphicsPalette-blue_30)`) stay the
// same in every theme, so they're reported in every property; UI should use
// `semanticColor` tokens. To keep one (e.g. for an illustration), disable
// `declaration-property-value-disallowed-list` with a reason. Unlike the
// `prefer-semantic-color-over-graphics-palette` ESLint rule, `fill` and `stroke`
// aren't exempt: in CSS, a selector can match any SVG, including themed UI.
// eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color-over-graphics-palette -- This is the prefix the stylelint rule looks for
const GRAPHICS_PALETTE_CSS_VAR_PREFIX = "--wb-graphicsPalette-";

const isGraphicsPaletteValue = (value: string): boolean =>
    value.includes(GRAPHICS_PALETTE_CSS_VAR_PREFIX);

// Same message as the `prefer-semantic-color-over-graphics-palette` ESLint
// rule in `@khanacademy/eslint-plugin-wonder-blocks`, so the policy reads the
// same in JS and CSS.
const GRAPHICS_PALETTE_MESSAGE =
    "`graphicsPalette` colors stay the same in every theme. Prefer a `semanticColor` token, which adapts to the current theme. If this color must stay the same in every theme (e.g. illustrations), disable this rule with a comment explaining why.";

const VAR_FALLBACK_MESSAGE =
    "Avoid var() fallbacks — reference --wb-* tokens directly so typos are caught by csstools/value-no-unknown-custom-properties.";

const config: Config = {
    extends: ["stylelint-config-standard", "stylelint-config-css-modules"],
    ignoreFiles: ["**/dist/**", "**/node_modules/**"],
    reportDescriptionlessDisables: true,
    plugins: [
        "stylelint-declaration-strict-value",
        "stylelint-media-use-custom-media",
        "stylelint-use-logical",
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
                    "value",
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

        // Breakpoints: `@media (--wb-breakpoint-mediaQuery-*)` must name a
        // custom media query generated from `breakpoint.mediaQuery` in the
        // tokens package (expanded at build time by `postcss-custom-media`,
        // see `postcss.config.cjs`). Catches typos like
        // `--wb-breakpoint-mediaQuery-mdOrLargr`, which would otherwise be
        // left in the output as a query that never matches. `known` (not
        // `always-known`) so one-off, non-token queries such as
        // `prefers-reduced-motion` stay allowed.
        "csstools/media-use-custom-media": [
            "known",
            {
                importFrom: [
                    path.resolve(
                        __dirname,
                        "packages/wonder-blocks-tokens/src/css/custom-media.css",
                    ),
                ],
            },
        ],

        // Pairs with the rule above: `known` only validates custom media
        // names, so a hard-coded `@media (min-width: 682px)` would still pass.
        // Flag width-based media features so breakpoints go through the
        // `--wb-breakpoint-mediaQuery-*` custom media queries instead. Other
        // features (`hover`, `height`, `prefers-reduced-motion`, …) stay
        // allowed.
        "media-feature-name-disallowed-list": [
            ["width", "min-width", "max-width"],
            {
                message:
                    "Use a breakpoint custom media query (e.g. `@media (--wb-breakpoint-mediaQuery-mdOrLarger)`) instead of a hard-coded width.",
            },
        ],

        // Closes the gap left by `csstools/value-no-unknown-custom-properties`:
        // that rule intentionally skips `var()` calls with a fallback (the
        // fallback is treated as a safety net), so a typo like
        // `var(--wb-typoed-token, 10px)` slips through. Banning the
        // fallback form forces every custom-property reference to be
        // validated against the token set above.
        //
        // Also forbids `graphicsPalette` colors; see
        // `GRAPHICS_PALETTE_CSS_VAR_PREFIX`. A rule can only be configured
        // once, so the message is picked from the value being reported.
        "declaration-property-value-disallowed-list": [
            {
                "/.*/": [
                    "/var\\([^,)]+,[^)]+\\)/",
                    `/${GRAPHICS_PALETTE_CSS_VAR_PREFIX}/`,
                ],
            },
            {
                message: (_property: string, value: string) =>
                    isGraphicsPaletteValue(value)
                        ? GRAPHICS_PALETTE_MESSAGE
                        : VAR_FALLBACK_MESSAGE,
            },
        ],

        // Override the standard rule to allow importing css files with the
        // `@import` notation that our PostCSS pipeline uses.
        "import-notation": "string",

        // Token-required properties. Where a raw value is intentional (e.g.
        // the visually-hidden `margin: -1px`), disable the rule on that line
        // with a reason.
        "scale-unlimited/declaration-strict-value": [
            [
                /**
                 * WB semanticColor tokens
                 */
                "/color/",
                "background-color",
                "border-color",
                /**
                 * WB sizing tokens
                 */
                "padding",
                "margin",
                /**
                 * WB border tokens
                 */
                // radius
                "border-radius",
                // width
                "border",
                "border-width",
                "border-block-start-width",
                "border-block-end-width",
                "border-inline-start-width",
                "border-inline-end-width",
                /**
                 * WB font/typography tokens
                 */
                "font-weight",
                "line-height",
                "font-size",
                "font-family",
            ],
            {
                ignoreValues: [
                    "transparent",
                    // Lowercase: `value-keyword-case` (stylelint-config-standard)
                    // rejects `currentColor`, and this list is case-sensitive.
                    "currentcolor",
                    "inherit",
                    "0",
                    "auto",
                    "none",
                    //border-width: border-style values
                    "solid",
                    "dashed",
                    "dotted",
                ],
            },
        ],

        // Forbid hex literals (`#fff`, `#112233`). Pairs with
        // `declaration-strict-value` above by closing the side-channel:
        // a hex used in a property *not* on that list (e.g. `box-shadow`,
        // `outline`, `fill`) would otherwise still slip through. Authors
        // should reach for a `--wb-*` token via `var()` instead.
        "color-no-hex": true,

        // Require logical properties / values for inline-axis sizing,
        // positioning, and text alignment so styles work in RTL locales
        // without per-component flips. Mirrors the Aphrodite-side
        // `@khanacademy/wonder-blocks/require-logical-properties-for-rtl`
        // ESLint rule (CLASS-14218) for the CSS Modules pipeline.
        "csstools/use-logical": "always",
    },
};

export default config;

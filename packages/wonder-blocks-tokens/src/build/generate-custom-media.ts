#!/usr/bin/env -S node -r @swc-node/register
/**
 * Generate `src/css/custom-media.css`: one `@custom-media` definition per
 * `breakpoint.mediaQuery` entry, so CSS Modules can use the same breakpoints
 * as Aphrodite (`@media (--wb-breakpoint-mediaQuery-mdOrLarger) { … }`).
 *
 * The file is published as `@khanacademy/wonder-blocks-tokens/custom-media.css`
 * so consumers' own CSS can use the same breakpoints.
 *
 * Custom properties can't be used in a media query condition, so these are
 * resolved at build time by `postcss-custom-media` (see the root
 * `postcss.config.cjs`). The published CSS only contains the expanded
 * `@media screen and (min-width: …)` queries.
 *
 * The output file is checked in (it has to exist before Rollup, Vite and
 * stylelint run, all of which happen before `build:css`). A unit test fails
 * if it drifts from `media-queries.ts`; regenerate it with
 * `pnpm --filter @khanacademy/wonder-blocks-tokens build:custom-media`.
 */
import fs from "fs";
import path from "path";
import {generateTokens} from "../internal/generate-tokens";
import {breakpoint} from "../tokens/media-queries";

export const CUSTOM_MEDIA_FILE = path.resolve(
    __dirname,
    "../css/custom-media.css",
);

/**
 * Turn `@media screen and (min-width: 682px) /* comment *\/` into the bare
 * media query list (`screen and (min-width: 682px)`).
 */
export function toMediaQueryList(mediaQuery: string): string {
    return mediaQuery
        .replace(/^@media\s+/, "")
        .replace(/\/\*.*?\*\//g, "")
        .trim();
}

/**
 * The custom media name for a `breakpoint.mediaQuery` key, e.g.
 * `mdOrLarger` → `--wb-breakpoint-mediaQuery-mdOrLarger`.
 *
 * Built with `generateTokens`, the same helper that names the `--wb-*` CSS
 * variables, so the token path maps to the name the same way
 * (`breakpoint.mediaQuery.mdOrLarger` → `--wb-breakpoint-mediaQuery-mdOrLarger`).
 */
export function toCustomMediaName(name: string): string {
    const [customMediaName] = Object.keys(
        generateTokens({breakpoint: {mediaQuery: {[name]: ""}}}),
    );
    return customMediaName;
}

/**
 * Build the contents of `custom-media.css` from `breakpoint.mediaQuery`.
 */
export function generateCustomMedia(
    mediaQueries: Record<string, string> = breakpoint.mediaQuery,
): string {
    const definitions = Object.entries(mediaQueries).map(
        ([name, query]) =>
            `@custom-media ${toCustomMediaName(name)} ${toMediaQueryList(query)};`,
    );

    return [
        "/**",
        " * GENERATED FILE — do not edit by hand.",
        " * Source: packages/wonder-blocks-tokens/src/tokens/media-queries.ts",
        " * Regenerate: pnpm --filter @khanacademy/wonder-blocks-tokens build:custom-media",
        " *",
        " * Breakpoint custom media queries (CSS Media Queries Level 5). Use them as:",
        " *",
        " *     @media (--wb-breakpoint-mediaQuery-mdOrLarger) { … }",
        " *",
        " * Browsers don't support `@custom-media` natively yet, so these must be",
        " * expanded at build time with `postcss-custom-media`, which needs the",
        " * definitions in the same PostCSS pass. Recommended (works with any",
        " * bundler, e.g. rspack + `postcss-loader`): inject this file into every",
        " * CSS file with `@csstools/postcss-global-data`:",
        " *",
        ' *     require("@csstools/postcss-global-data")({',
        " *         files: [",
        " *             require.resolve(",
        ' *                 "@khanacademy/wonder-blocks-tokens/custom-media.css",',
        " *             ),",
        " *         ],",
        " *     }),",
        ' *     require("postcss-custom-media")(),',
        " *",
        " * This is what Wonder Blocks' own `postcss.config.cjs` does. Alternatively,",
        ' * `@import "@khanacademy/wonder-blocks-tokens/custom-media.css";` works only',
        " * if the import is inlined inside PostCSS by a resolver that honors",
        " * package `exports`: Vite, or `postcss-import` with a Node-based `resolve`",
        " * option (its default resolver ignores `exports`). A plain `@import` left",
        " * to rspack/webpack's `css-loader` is resolved after PostCSS runs, so the",
        " * queries would not be expanded.",
        " */",
        ...definitions,
        "",
    ].join("\n");
}

if (require.main === module) {
    fs.mkdirSync(path.dirname(CUSTOM_MEDIA_FILE), {recursive: true});
    fs.writeFileSync(CUSTOM_MEDIA_FILE, generateCustomMedia());
    // eslint-disable-next-line no-console
    console.log("✅ Custom media generated in:", CUSTOM_MEDIA_FILE);
}

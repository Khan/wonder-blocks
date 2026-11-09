#!/usr/bin/env -S node -r @swc-node/register
/**
 * Generate `src/css/custom-media.css`: one `@custom-media` definition per
 * `breakpoint.mediaQuery` entry, so CSS Modules can use the same breakpoints
 * as Aphrodite (`@media (--wb-breakpoint-mediaQuery-mdOrLarger) { … }`).
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
import {breakpoint} from "../tokens/media-queries";
import {CSS_VAR_PREFIX} from "../util/constants";

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
 * Build the contents of `custom-media.css` from `breakpoint.mediaQuery`.
 */
export function generateCustomMedia(
    mediaQueries: Record<string, string> = breakpoint.mediaQuery,
): string {
    const definitions = Object.entries(mediaQueries).map(
        ([name, query]) =>
            `@custom-media ${CSS_VAR_PREFIX}breakpoint-mediaQuery-${name} ${toMediaQueryList(query)};`,
    );

    return [
        "/**",
        " * GENERATED FILE — do not edit by hand.",
        " * Source: packages/wonder-blocks-tokens/src/tokens/media-queries.ts",
        " * Regenerate: pnpm --filter @khanacademy/wonder-blocks-tokens build:custom-media",
        " *",
        " * Breakpoint custom media queries for CSS Modules. These are injected into",
        " * every CSS file by the root `postcss.config.cjs` and expanded at build",
        " * time, so they don't need to be imported:",
        " *",
        " *     @media (--wb-breakpoint-mediaQuery-mdOrLarger) { … }",
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

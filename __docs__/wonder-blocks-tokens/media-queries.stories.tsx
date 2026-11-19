import * as React from "react";
import {
    Title,
    Subtitle,
    Description,
    Stories,
} from "@storybook/addon-docs/blocks";
import {Meta} from "@storybook/react-vite";
import TokenTable from "../components/token-table";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tokens/package.json";
import * as tokens from "@khanacademy/wonder-blocks-tokens";
import {Code} from "../components/code";

/**
 * All the available media query breakpoint values and pure widths that can be
 * used for min-width, max-width, width, etc.
 */
export default {
    title: "Packages /Tokens / Media Query Breakpoints",
    parameters: {
        docs: {
            // Use a custom page so the SB <Primary> component is not rendered
            // <Primary> renders the first story as part of the description,
            // which isn't necessary for the token pages.
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Stories title="Tokens" />
                </>
            ),
        },
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    tags: [
        "!dev",
        "!manifest", // Remove from manifest in favour of static reference token docs
    ],
} as Meta;

type Row = {label: string; css: string; value: string};

/**
 *
 * You can use mediaQuery conditions by importing `breakpoint` from the
 * `wonder-blocks-tokens` package and accessing its object properties for sizing
 * like so: `breakpoint.mediaQuery.sm`.
 *
 * ```js
 * import {breakpoint} from "@khanacademy/wonder-blocks-tokens";
 * const styles = {
 *     [breakpoint.mediaQuery.sm]: {
 *         flexDirection: "column",
 *     },
 * };
 * ```
 *
 * In CSS (e.g. CSS Modules), use the matching custom media query instead:
 *
 * ```css
 * @media (--wb-breakpoint-mediaQuery-sm) {
 *     .root {
 *         flex-direction: column;
 *     }
 * }
 * ```
 *
 * Browsers don't support `@custom-media` natively yet, so the queries are
 * expanded at build time by `postcss-custom-media`. The definitions are
 * published as `@khanacademy/wonder-blocks-tokens/custom-media.css`; inject
 * them into every CSS file with `@csstools/postcss-global-data` (this works
 * with any bundler, e.g. rspack + `postcss-loader`):
 *
 * ```js
 * // postcss.config.cjs
 * module.exports = {
 *     plugins: [
 *         require("@csstools/postcss-global-data")({
 *             files: [
 *                 require.resolve(
 *                     "@khanacademy/wonder-blocks-tokens/custom-media.css",
 *                 ),
 *             ],
 *         }),
 *         require("postcss-custom-media")(),
 *     ],
 * };
 * ```
 *
 * An `@import` of the definitions only works when it's inlined inside PostCSS
 * by a resolver that honors package `exports` (Vite, or `postcss-import` with
 * a Node-based `resolve` option). Left to rspack/webpack's `css-loader`, the
 * import is resolved after PostCSS runs and the queries aren't expanded.
 */
export const BreakpointMediaQueries = () => (
    <TokenTable
        columns={[
            {
                label: "Media Query Token",
                cell: (row: Row) => (
                    <Code>{`breakpoint.mediaQuery.${row.label}`}</Code>
                ),
            },
            {
                label: "CSS Custom Media",
                cell: (row: Row) => (
                    <Code>{`--wb-breakpoint-mediaQuery-${row.label}`}</Code>
                ),
            },
            {
                label: "Value",
                cell: "value",
            },
        ]}
        tokens={tokens.breakpoint.mediaQuery}
    />
);

/**
 * You can also use pure width values by importing `breakpoint` from the
 * `wonder-blocks-tokens` package and accessing the `width` object:
 * `breakpoint.width.sm`. These can be useful for tooling or in CSS where a number value
 * is needed. Therefore, pixel values are returned without a unit. You can
 * interpolate a string to add the `px` unit like so:
 *
 * ```js
 * import {breakpoint} from "@khanacademy/wonder-blocks-tokens";
 * const styles = {
 *     element: {
 *         maxWidth: `${breakpoint.width.lg}px`,
 *     },
 * };
 * ```
 *
 * In CSS (e.g. CSS Modules), use the matching CSS variable, which already
 * includes the `px` unit. CSS variables can't be used in media query
 * conditions, so use these for property values only:
 *
 * ```css
 * .element {
 *     max-inline-size: var(--wb-breakpoint-width-lgMax);
 * }
 * ```
 */
export const BreakpointWidths = () => (
    <TokenTable
        columns={[
            {
                label: "Width Token",
                cell: (row: Row) => (
                    <Code>{`breakpoint.width.${row.label}`}</Code>
                ),
            },
            {
                label: "CSS Variable",
                cell: (row: Row) => (
                    <Code>{`--wb-breakpoint-width-${row.label}`}</Code>
                ),
            },
            {
                label: "Value (px)",
                cell: "value",
            },
        ]}
        tokens={tokens.breakpoint.width}
    />
);

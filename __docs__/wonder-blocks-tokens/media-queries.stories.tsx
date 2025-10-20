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
    tags: ["!dev"],
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
                label: "Value (px)",
                cell: "value",
            },
        ]}
        tokens={tokens.breakpoint.width}
    />
);

export const BreakpointHeights = () => (
    <TokenTable
        columns={[
            {
                label: "Height Token",
                cell: (row: Row) => (
                    <Code>{`breakpoint.height.${row.label}`}</Code>
                ),
            },
            {
                label: "Value (px)",
                cell: "value",
            },
        ]}
        tokens={tokens.breakpoint.height}
    />
);

import * as React from "react";
import {
    Title,
    Subtitle,
    Description,
    Stories,
} from "@storybook/addon-docs/blocks";
import {Meta} from "@storybook/react-vite";
import Banner from "@khanacademy/wonder-blocks-banner";
import {graphicsPalette} from "@khanacademy/wonder-blocks-tokens";
import TokenTable from "../components/token-table";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tokens/package.json";
import {Code} from "../components/code";
import {ColorSwatch} from "../components/color-swatch";

/**
 * The graphics palette contains the colors used for illustrations and other
 * graphic assets.
 *
 * These tokens map to the `5 - Graphics / Palette` tokens in Figma (e.g.
 * `Palette/Red/30` -> `graphicsPalette.red_30`).
 *
 * Unlike `semanticColor`, these colors are static hex values that don't change
 * based on the theme.
 *
 * ## Usage
 *
 * ```tsx
 * import {graphicsPalette} from "@khanacademy/wonder-blocks-tokens";
 *
 * const Illustration = () => (
 *     <svg viewBox="0 0 24 24">
 *         <circle cx="12" cy="12" r="10" fill={graphicsPalette.blue_30} />
 *     </svg>
 * );
 * ```
 */
export default {
    title: "Packages / Tokens / Graphics Palette",
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        docs: {
            // Use a custom page so the SB <Primary> component is not rendered
            // <Primary> renders the first story as part of the description,
            // which isn't necessary for the token pages.
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Banner
                        kind="warning"
                        text={
                            <>
                                Only use <code>graphicsPalette</code> tokens in
                                illustrations and other graphic assets. For
                                component styles, use <code>semanticColor</code>{" "}
                                tokens instead.
                            </>
                        }
                    />
                    <Description />
                    <Stories title="Tokens" />
                </>
            ),
            toc: false,
        },
        chromatic: {
            // Token tables don't need visual regression snapshots.
            disableSnapshot: true,
        },
    },
    tags: [
        "!dev",
        "!manifest", // Remove from manifest in favour of static reference token docs
    ],
} as Meta;

type Row = {label: string; css: string; value: string};

export const Default = {
    render: () => (
        <TokenTable
            columns={[
                {
                    label: "Token",
                    cell: (row: Row) => (
                        <Code>{`graphicsPalette.${row.label}`}</Code>
                    ),
                },
                {
                    label: "Value",
                    cell: "value",
                },
                {
                    label: "Example",
                    cell: (row) => <ColorSwatch backgroundColor={row.value} />,
                },
            ]}
            tokens={graphicsPalette}
        />
    ),
};

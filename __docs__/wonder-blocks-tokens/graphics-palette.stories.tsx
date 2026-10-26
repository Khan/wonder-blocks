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
import {GraphicsPaletteGrid} from "../components/graphics-palette-grid";

/**
 * The graphics palette contains colors that don't change based on the theme,
 * for cases like illustrations.
 *
 * These tokens map to the `5 - Graphics / Palette` tokens in Figma (e.g.
 * `Palette/Red/30` -> `graphicsPalette.red_30`).
 *
 * Like `semanticColor`, these tokens are CSS variables (e.g.
 * `var(--wb-graphicsPalette-red_30)`). Unlike `semanticColor`, the variables
 * are defined once on `:root`, so their values are the same in every theme.
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
 *
 * In CSS, use the variable directly:
 *
 * ```css
 * .illustration {
 *     fill: var(--wb-graphicsPalette-blue_30);
 * }
 * ```
 *
 * When a literal color value is needed (e.g. drawing on a canvas), resolve the
 * token with `tokenValue()` when it's used, not at module scope:
 *
 * ```ts
 * import {graphicsPalette, tokenValue} from "@khanacademy/wonder-blocks-tokens";
 *
 * context.fillStyle = tokenValue(graphicsPalette.blue_30);
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
                                Prefer <code>semanticColor</code> tokens, which
                                support themes. Only use{" "}
                                <code>graphicsPalette</code> tokens when a color
                                must stay the same in every theme (e.g.
                                illustrations), and explain why.
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

/**
 * The palette by hue and step, matching its layout in Figma. Use the copy
 * button on a swatch to copy its token name.
 */
export const Palette = {
    render: () => <GraphicsPaletteGrid />,
};

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

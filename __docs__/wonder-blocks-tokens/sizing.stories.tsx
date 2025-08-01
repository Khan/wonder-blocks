import * as React from "react";
import {Title, Subtitle, Description, Stories} from "@storybook/blocks";
import {Meta} from "@storybook/react";
import {View} from "@khanacademy/wonder-blocks-core";
import TokenTable from "../components/token-table";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tokens/package.json";
import * as tokens from "@khanacademy/wonder-blocks-tokens";
import {Code} from "../components/code";

/**
 * All the available sizing values that can be used for margin, padding, width,
 * height, border-width, font-size, line-height, etc.
 *
 * Note that these values are represented in `rem` units. Using rem units allows
 * the sizes to scale with the font size of the root element, which is set to
 * 62.5%/10px in our Design System. This means that the sizes will scale with
 * the user's browser settings.
 *
 * ## Usage
 *
 * You can use these sizes directly by importing `sizing` from the
 * `wonder-blocks-tokens` package and accessing the named property like so:
 * `sizing.size_160`.
 *
 * ```js
 * import {sizing} from "@khanacademy/wonder-blocks-tokens";
 * const styles = {padding: sizing.size_160};
 * ```
 */
export default {
    title: "Packages /Tokens / Sizing",
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
            toc: false,
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
export const Sizing = () => (
    <TokenTable
        columns={[
            {
                label: "Token",
                cell: (row: Row) => <Code>{`sizing.${row.label}`}</Code>,
            },
            {
                label: "CSS Variable",
                cell: (row) => <Code>{row.css}</Code>,
            },
            {
                label: "Base unit multiplier",
                cell: (row) => row.value.replace("rem", "x"),
            },
            {
                label: "Value",
                cell: "value",
            },
            {
                label: "Pixels (equivalent)",
                cell: (row) => parseFloat(row.value.replace("rem", "") * 10),
            },
            {
                label: "Example",
                cell: (row) => (
                    <View
                        style={{
                            backgroundColor: tokens.color.purple,
                            height: row.value,
                        }}
                    >
                        &nbsp;
                    </View>
                ),
            },
        ]}
        tokens={tokens.sizing}
    />
);

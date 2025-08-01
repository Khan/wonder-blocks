import * as React from "react";
import {Title, Subtitle, Description, Stories} from "@storybook/blocks";
import {Meta} from "@storybook/react";
import {View} from "@khanacademy/wonder-blocks-core";
import TokenTable from "../components/token-table";
import {semanticColor, sizing, color} from "@khanacademy/wonder-blocks-tokens";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tokens/package.json";

/**
 * The color palette containing all the primitive Wonder Blocks colors.
 *
 * `color` is deprecated! We recommend using [semantic colors](/?path=/docs/packages-tokens-semantic-color--docs) whenever possible,
 * but if you need a color that doesn't fit into any of the categories, please
 * reach out to your designer or the Wonder Blocks team!
 *
 * ## Usage
 *
 * `wonder-blocks-tokens` exports a set of colors that can be used in your
 * components. The colors are exported as constants and can be used like so:
 *
 * ```ts
 * import {color} from "@khanacademy/wonder-blocks-tokens";
 * const styles = {background: color.darkBlue};
 * ```
 */
export default {
    title: "Tokens / Deprecated / Color (deprecated)",
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

export const Default = {
    render: () => (
        <TokenTable
            columns={[
                {
                    label: "Token",
                    cell: (row: Row) => <code>color.{row.label}</code>,
                },
                {
                    label: "Value",
                    cell: "value",
                },
                {
                    label: "Example",
                    cell: (row) => (
                        <View
                            style={{
                                background:
                                    semanticColor.core.background.neutral
                                        .subtle,
                                padding: sizing.size_060,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: row.value,
                                    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                &nbsp;
                            </View>
                        </View>
                    ),
                },
            ]}
            tokens={color}
        />
    ),
};

import * as React from "react";
import {Title, Subtitle, Description, Stories} from "@storybook/blocks";
import {Meta} from "@storybook/react";
import {View} from "@khanacademy/wonder-blocks-core";
import TokenTable from "../components/token-table";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tokens/package.json";
import * as tokens from "@khanacademy/wonder-blocks-tokens";

/**
 * All the available spacing values that can be used for margin, padding, width,
 * height, border-width, etc.
 *
 * ## Usage
 *
 * You can use these sizes directly by importing `spacing` from the
 * `wonder-blocks-tokens` package and accessing the named property like so:
 * `spacing.xxSmall_6`.
 *
 * ```js
 * import {spacing} from "@khanacademy/wonder-blocks-tokens";
 * const styles = {padding: spacing.xxSmall_6};
 * ```
 */
export default {
    title: "Tokens / Deprecated / Spacing",
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
export const Spacing = () => (
    <TokenTable
        columns={[
            {
                label: "Token",
                cell: (row: Row) => <code>spacing.{row.label}</code>,
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
                            backgroundColor: tokens.color.purple,
                            height: row.value,
                        }}
                    >
                        &nbsp;
                    </View>
                ),
            },
        ]}
        tokens={tokens.spacing}
    />
);

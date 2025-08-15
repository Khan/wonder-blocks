import * as React from "react";
import {Title, Subtitle, Description, Stories} from "@storybook/blocks";
import {Meta} from "@storybook/react";
import {View} from "@khanacademy/wonder-blocks-core";
import TokenTable from "../components/token-table";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {themeModes} from "../../.storybook/modes";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tokens/package.json";
import {flattenNestedTokens} from "../components/tokens-util";
import {Code} from "../components/code";

/**
 * The color palette containing all the semantic Wonder Blocks colors.
 *
 * This is the recommended approach. If you need a color that doesn't fit into
 * any of the categories, please reach out to your designer or the Wonder Blocks
 * team.
 *
 * Please avoid using primitive colors or hardcoded hex values since these won't
 * be themable!
 *
 * ## Usage
 *
 * `wonder-blocks-tokens` exports a set of semantic colors that can be used in your
 * components. The colors are exported as constants and can be used like so:
 *
 * ```ts
 * import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
 *
 * const styles = {
 *     background: semanticColor.surface.secondary,
 *     border: semanticColor.core.border.neutral.default,
 *     color: semanticColor.core.foreground.neutral.strong,
 * };
 * ```
 */
export default {
    title: "Packages / Tokens / Semantic Color",
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
        chromatic: {
            modes: themeModes,
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

export const SemanticColors = () => (
    <TokenTable
        columns={[
            {
                label: "Token",
                cell: (row: Row) => <Code>{`semanticColor.${row.label}`}</Code>,
            },
            {
                label: "CSS Variable",
                cell: (row) => <Code>{row.css}</Code>,
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
        tokens={flattenNestedTokens(semanticColor)}
    />
);

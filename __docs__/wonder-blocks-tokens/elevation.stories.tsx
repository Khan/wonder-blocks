import * as React from "react";
import {Title, Subtitle, Description, Stories} from "@storybook/blocks";
import {Meta} from "@storybook/react";
import {View} from "@khanacademy/wonder-blocks-core";
import TokenTable from "../components/token-table";
import {
    elevation,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tokens/package.json";
import {Code} from "../components/code";

/**
 * The `elevation` tokens are used to define the box-shadow of an element.
 *
 * Note: We don't define box-shadow colors here, and instead we recommend you to
 * rely on the `semanticColor.core.shadow` tokens to build on top of that.
 *
 * ## Usage
 *
 * ```ts
 *   import {elevation} from "@khanacademy/wonder-blocks-tokens";
 *   const styles = {
 *       elevatedContainer: {
 *           boxShadow: `{elevation.low} ${semanticColor.core.shadow.transparent.low}`,
 *       },
 *   };
 * ```
 */
export default {
    title: "Packages /Tokens / Elevation",
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
const baseColumns = (kind: string) => [
    {
        label: "Token",
        cell: (row: Row) => <Code>{`elevation.${row.label}`}</Code>,
    },
    {
        label: "CSS Variable",
        cell: (row: Row) => <Code>{row.css}</Code>,
    },
    {
        label: "Value",
        cell: "value",
    },
];

export const Elevation = {
    render: () => (
        <TokenTable
            columns={[
                ...baseColumns("elevation"),
                {
                    label: "Example",
                    cell: (row) => (
                        <View
                            style={{
                                backgroundColor:
                                    semanticColor.core.background.instructive
                                        .default,
                                boxShadow: `var(${row.css}) ${semanticColor.core.shadow.transparent.low}`,
                                width: sizing.size_480,
                                height: sizing.size_480,
                            }}
                        >
                            &nbsp;
                        </View>
                    ),
                },
            ]}
            tokens={elevation}
        />
    ),
};

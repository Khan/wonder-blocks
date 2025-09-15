import * as React from "react";
import {Title, Subtitle, Description, Stories} from "@storybook/blocks";
import {Meta} from "@storybook/react";
import {View} from "@khanacademy/wonder-blocks-core";
import TokenTable from "../components/token-table";
import {
    boxShadow,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tokens/package.json";
import {Code} from "../components/code";

/**
 * The `boxS` tokens are used to define the box-shadow of an element. This
 * includes both the elevation and the shadow color of it.
 *
 * ## Usage
 *
 * ```ts
 *   import {boxShadow} from "@khanacademy/wonder-blocks-tokens";
 *   const styles = {
 *       elevatedContainer: {
 *           boxShadow: boxShadow.low,
 *       },
 *   };
 * ```
 */
export default {
    title: "Packages /Tokens / boxShadow",
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

export const Elevation = {
    render: () => (
        <TokenTable
            columns={[
                {
                    label: "Token",
                    cell: (row: Row) => <Code>{`boxShadow.${row.label}`}</Code>,
                },
                {
                    label: "CSS Variable",
                    cell: (row: Row) => <Code>{row.css}</Code>,
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
                                backgroundColor:
                                    semanticColor.core.background.base.default,
                                boxShadow: `var(${row.css})`,
                                width: sizing.size_480,
                                height: sizing.size_480,
                            }}
                        >
                            &nbsp;
                        </View>
                    ),
                },
            ]}
            tokens={boxShadow}
        />
    ),
};

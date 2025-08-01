import * as React from "react";
import {Title, Subtitle, Description, Stories} from "@storybook/blocks";
import {Meta} from "@storybook/react";
import {View} from "@khanacademy/wonder-blocks-core";
import TokenTable from "../components/token-table";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tokens/package.json";

/**
 * The `border` tokens are used to define the border properties of an element.
 * The border tokens are broken down into two categories: `radius` and `width`.
 *
 * Note: We don't define border colors here, and instead we recommend you to rely on the `color` token primitives to build on top of that.
 *
 * ## Usage
 *
 * ```ts
 *   import {border} from "@khanacademy/wonder-blocks-tokens";
 *   const styles = {
 *       borderedContainer: {
 *           borderRadius: border.radius.radius_040,
 *           borderWidth: border.width.thin,
 *       },
 *   };
 * ```
 */
export default {
    title: "Packages /Tokens / Border",
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
        cell: (row: Row) => (
            <code>
                border.{kind}.{row.label}
            </code>
        ),
    },
    {
        label: "CSS Variable",
        cell: (row: Row) => <code>{row.css}</code>,
    },
    {
        label: "Value",
        cell: "value",
    },
];

export const BorderRadius = {
    render: () => (
        <TokenTable
            columns={[
                ...baseColumns("radius"),
                {
                    label: "Example",
                    cell: (row) => (
                        <View
                            style={{
                                backgroundColor:
                                    semanticColor.core.background.instructive
                                        .default,
                                borderRadius: row.value,
                                width: sizing.size_480,
                                height: sizing.size_480,
                            }}
                        >
                            &nbsp;
                        </View>
                    ),
                },
            ]}
            tokens={border.radius}
        />
    ),
};

export const BorderWidth = {
    render: () => (
        <TokenTable
            columns={[
                ...baseColumns("width"),
                {
                    label: "Example",
                    cell: (row) => (
                        <View
                            style={{
                                borderColor:
                                    semanticColor.core.border.instructive
                                        .default,
                                borderWidth: row.value,
                                width: sizing.size_480,
                                height: sizing.size_480,
                            }}
                        >
                            &nbsp;
                        </View>
                    ),
                },
            ]}
            tokens={border.width}
        />
    ),
};

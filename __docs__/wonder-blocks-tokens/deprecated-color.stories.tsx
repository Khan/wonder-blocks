import * as React from "react";
import {
    Title,
    Subtitle,
    Description,
    Stories,
} from "@storybook/addon-docs/blocks";
import {Meta} from "@storybook/react-vite";
import {View} from "@khanacademy/wonder-blocks-core";
import TokenTable from "../components/token-table";
import Banner from "@khanacademy/wonder-blocks-banner";
import {color, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {Code} from "../components/code";

/**
 * The color palette containing all the primitive Wonder Blocks colors.
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
    title: "Packages / Tokens / Deprecated / Color",
    parameters: {
        docs: {
            // Use a custom page so the SB <Primary> component is not rendered
            // <Primary> renders the first story as part of the description,
            // which isn't necessary for the token pages.
            page: () => (
                <>
                    <Title />
                    <Banner
                        kind="warning"
                        text={
                            <>
                                color is deprecated! We recommend using{" "}
                                <code>semanticColor</code> whenever possible,
                                but if you need a color that doesn&apos;t fit
                                into any of the categories, please reach out to
                                your designer or the Wonder Blocks team!
                            </>
                        }
                        actions={[
                            {
                                type: "custom",
                                node: (
                                    <a href="./?path=/docs/packages-tokens-semantic-color--docs">
                                        View semanticColor tokens
                                    </a>
                                ),
                            },
                        ]}
                    />
                    <Subtitle />
                    <Description />

                    <Stories title="Tokens" />
                </>
            ),
            toc: false,
            chromatic: {
                disableSnapshot: true,
            },
        },
    },
    tags: ["!dev", "deprecated"],
} as Meta;

type Row = {label: string; css: string; value: string};

export const Default = {
    render: () => (
        <TokenTable
            columns={[
                {
                    label: "Token",
                    cell: (row: Row) => <Code>{`color.${row.label}`}</Code>,
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

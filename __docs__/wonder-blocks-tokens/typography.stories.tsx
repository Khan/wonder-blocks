import * as React from "react";
import {Title, Subtitle, Description, Stories} from "@storybook/blocks";
import {Meta} from "@storybook/react";
import {View} from "@khanacademy/wonder-blocks-core";
import TokenTable from "../components/token-table";
import * as tokens from "@khanacademy/wonder-blocks-tokens";
import {themeModes} from "../../.storybook/modes";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tokens/package.json";
import {Code} from "../components/code";

/**
 * Text sizes, weights and font families used across Wonder Blocks.
 *
 * We recommend using the WB Typography components to ensure consistent
 * typography across your app. These tokens are provided for advanced use cases
 * and should be used with caution. See
 * [Typography components](../?path=/docs/packages-typography--docs) for more
 * details.
 *
 * ## Usage
 *
 * The typography tokens are used to define the font family, size, line height
 * and weight of text elements in our components.
 *
 * ```tsx
 * import {font} from "@khanacademy/wonder-blocks-tokens";
 * const styles = {
 *     fontSize: font.heading.size.large,
 *     lineHeight: font.heading.lineHeight.large,
 *     fontWeight: font.weight.medium,
 *     fontFamily: font.family.serif,
 * };
 * ```
 */
export default {
    title: "Packages / Tokens / Typography",
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

const sampleTextUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const sampleTextLower = "abcdefghijklmnopqrstuvwxyz";

type Row = {label: string; css: string; value: string};

const baseColumns = (property: string) => [
    {
        label: "Token",
        cell: (row: Row) => (
            <Code>
                font.{property}.{row.label}
            </Code>
        ),
    },
    {
        label: "Value",
        cell: "value",
    },
];

/**
 *
The available font families in our system.
 */
export const FontFamily = {
    render: () => (
        <TokenTable
            columns={[
                ...baseColumns("family"),
                {
                    label: "Example",
                    cell: (row) => (
                        <View
                            style={{
                                fontFamily: row.value,
                            }}
                        >
                            <View className="sb-unstyled">
                                {sampleTextUpper}
                            </View>
                            <View className="sb-unstyled">
                                {sampleTextLower}
                            </View>
                        </View>
                    ),
                },
            ]}
            tokens={tokens.font.family}
        />
    ),
};

/**
 * The list of possible font sizes that can be used with our components.
 *
 * Sizes are categorized by `Body` and `Heading`, such as `font.body.size.small` and `font.heading.size.large`.
 *
 * **Note:** the legacy font token API will be deprecated in the future (e.g. `font.size.small`) to support
 * both Classic and Thunderblocks with the same theme structure.
 */
export const BodyFontSize = {
    name: "Font Size (Body)",
    render: () => (
        <TokenTable
            columns={[
                ...baseColumns("body.size"),
                {
                    label: "Example",
                    cell: (row) => (
                        <View
                            style={{
                                fontSize: row.value,
                                lineHeight: 1,
                            }}
                        >
                            <View className="sb-unstyled">
                                {sampleTextUpper}
                            </View>
                            <View className="sb-unstyled">
                                {sampleTextLower}
                            </View>
                        </View>
                    ),
                },
            ]}
            tokens={tokens.font.body.size}
        />
    ),
};

export const HeadingFontSize = {
    name: "Font Size (Heading)",
    render: () => (
        <TokenTable
            columns={[
                ...baseColumns("heading.size"),
                {
                    label: "Example",
                    cell: (row) => (
                        <View
                            style={{
                                fontSize: row.value,
                                lineHeight: 1,
                            }}
                        >
                            <View className="sb-unstyled">
                                {sampleTextUpper}
                            </View>
                            <View className="sb-unstyled">
                                {sampleTextLower}
                            </View>
                        </View>
                    ),
                },
            ]}
            tokens={tokens.font.heading.size}
        />
    ),
};

/**
 * The vertical space associated to a given font size.
 *
 * Line-heights are categorized by `Body` and `Heading`.
 */
export const BodyLineHeight = {
    name: "Line Height (Body)",
    render: () => (
        <TokenTable
            columns={[
                ...baseColumns("body.lineHeight"),
                {
                    label: "Example",
                    cell: (row) => (
                        <View
                            style={{
                                backgroundColor: tokens.color.offBlack8,
                                lineHeight: row.value,
                            }}
                        >
                            <View className="sb-unstyled">
                                {sampleTextUpper}
                            </View>
                            <View className="sb-unstyled">
                                {sampleTextLower}
                            </View>
                        </View>
                    ),
                },
            ]}
            tokens={tokens.font.body.lineHeight}
        />
    ),
};

export const HeadingLineHeight = {
    name: "Line Height (Heading)",
    render: () => (
        <TokenTable
            columns={[
                ...baseColumns("heading.lineHeight"),
                {
                    label: "Example",
                    cell: (row) => (
                        <View
                            style={{
                                backgroundColor: tokens.color.offBlack8,
                                lineHeight: row.value,
                            }}
                        >
                            <View className="sb-unstyled">
                                {sampleTextUpper}
                            </View>
                            <View className="sb-unstyled">
                                {sampleTextLower}
                            </View>
                        </View>
                    ),
                },
            ]}
            tokens={tokens.font.heading.lineHeight}
        />
    ),
};

/**
 * Font weight options for Lato (Classic) include `light`, `medium` and `bold`.
 * Font weight options for Plus Jakarta Sans (Classroom) include `light`, `medium`, `semi`, `bold`, and `black`.
 */
export const FontWeight = {
    render: () => (
        <TokenTable
            columns={[
                ...baseColumns("weight"),
                {
                    label: "Example",
                    cell: (row) => (
                        <View
                            style={{
                                fontWeight: row.value,
                            }}
                        >
                            <View className="sb-unstyled">
                                {sampleTextUpper}
                            </View>
                            <View className="sb-unstyled">
                                {sampleTextLower}
                            </View>
                        </View>
                    ),
                },
            ]}
            tokens={tokens.font.weight}
        />
    ),
};

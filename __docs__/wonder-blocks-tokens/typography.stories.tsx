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
import {semanticColor, font} from "@khanacademy/wonder-blocks-tokens";
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
        cell: (row: Row) => <Code>{`font.${property}.${row.label}`}</Code>,
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
            tokens={font.family}
        />
    ),
};

/**
 * The list of possible font sizes that can be used with our components.
 *
 * Sizes are categorized by `Body` and `Heading`, such as `font.body.size.small` and `font.heading.size.large`.
 *
 * When using the `font.body.size.*` tokens, also use the corresponding
 * `font.body.lineHeight.*` token for the line height. As an alternative, the
 * WB `BodyText` component can be used instead, which will apply all the needed
 * font properties by default.
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
            tokens={font.body.size}
        />
    ),
};

/**
 * When using the `font.heading.size.*` tokens, also use the corresponding
 * `font.heading.lineHeight.*` token for the line height. As an alternative, the
 * WB `Heading` component can be used instead, which will apply all the needed
 * font properties by default.
 */
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
            tokens={font.heading.size}
        />
    ),
};

/**
 * The vertical space associated to a given font size.
 *
 * Line-heights are categorized by `Body` and `Heading`.
 *
 * When using the `font.body.lineHeight.*` tokens, also use the corresponding
 * `font.body.size.*` token for the font size. As an alternative, the
 * WB `BodyText` component can be used instead, which will apply all the needed
 * font properties by default.
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
                                backgroundColor:
                                    semanticColor.core.background.neutral
                                        .subtle,
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
            tokens={font.body.lineHeight}
        />
    ),
};

/**
 * When using the `font.heading.lineHeight.*` tokens, also use the corresponding
 * `font.heading.size.*` token for the font size. As an alternative, the
 * WB `Heading` component can be used instead, which will apply all the needed
 * font properties by default.
 */
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
                                backgroundColor:
                                    semanticColor.core.background.neutral
                                        .subtle,
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
            tokens={font.heading.lineHeight}
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
            tokens={font.weight}
        />
    ),
};

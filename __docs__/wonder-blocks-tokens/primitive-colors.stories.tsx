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
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tokens/package.json";
import {Code} from "../components/code";

// eslint-disable-next-line import/no-deprecated -- intentionally using deprecated tokens for this page
import {color as defaultPrimitives} from "../../packages/wonder-blocks-tokens/src/tokens/color";
import {color as thunderblocksPrimitives} from "../../packages/wonder-blocks-tokens/src/theme/semantic/internal/primitive-color-thunderblocks";

/**
 * Internal primitive color tokens used by the Wonder Blocks themes.
 *
 * These tokens are **not intended for direct use** in components.
 * Use `semanticColor` from `@khanacademy/wonder-blocks-tokens` instead.
 *
 * This page shows the raw color values for both the **Default (Classic)** and
 * **Thunderblocks** themes.
 */
export default {
    title: "Packages / Tokens / Internal / Primitive Colors",
    parameters: {
        docs: {
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

const columns = [
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
        cell: (row: Row) => (
            <View
                style={{
                    backgroundImage: `radial-gradient(${semanticColor.core.foreground.neutral.default} ${sizing.size_010}, ${semanticColor.core.background.base.subtle} ${sizing.size_010})`,
                    backgroundSize: `${sizing.size_160} ${sizing.size_160}`,
                    boxShadow: `0 0 1px 0 ${semanticColor.core.border.neutral.subtle}`,
                }}
            >
                <View
                    style={{
                        backgroundColor: row.value,
                        boxShadow: `inset 0 0 1px 0 ${semanticColor.core.border.neutral.subtle}`,
                        padding: sizing.size_080,
                    }}
                >
                    &nbsp;
                </View>
            </View>
        ),
    },
];
/**
 * The default (Classic) theme primitive colors. These are the original
 * Wonder Blocks color values.
 */
export const Default = {
    name: "Default (Classic)",
    render: () => (
        <TokenTable
            columns={columns}
            // eslint-disable-next-line import/no-deprecated -- Using primitive tokens directly so we can easily see the primitive values
            tokens={defaultPrimitives}
        />
    ),
};

/**
 * The Thunderblocks theme primitive colors. These follow a systematic
 * naming convention with shade levels from 01 (darkest) to 90/100
 * (lightest).
 */
export const Thunderblocks = {
    render: () => (
        <TokenTable columns={columns} tokens={thunderblocksPrimitives} />
    ),
};

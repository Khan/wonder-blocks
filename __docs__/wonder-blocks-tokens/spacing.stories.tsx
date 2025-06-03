import * as React from "react";
import {Title, Subtitle, Description, Stories} from "@storybook/blocks";
import {Meta} from "@storybook/react-vite";
import {View} from "@khanacademy/wonder-blocks-core";
import TokenTable from "../components/token-table";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tokens/package.json";
import * as tokens from "@khanacademy/wonder-blocks-tokens";
import {Code} from "../components/code";

/**
 * All the available spacing values that can be used for margin, padding, width,
 * height, border-width, etc.
 *
 * Note: `spacing` is deprecated! We recommend using [sizing tokens](../?path=/docs/packages-tokens-sizing--docs)
 * instead.
 *
 * ## Migrating from `spacing` to `sizing`
 *
 * In the past, we had a `spacing` object that contained all the sizing tokens
 * define in pixels. This object has been deprecated in favor of the `sizing`
 * object, which now uses `rem` units. If you were using `spacing` before, you
 * can easily migrate to `sizing` by replacing the following tokens:
 *
 * ```ts
 * // Before
 * import {spacing} from "@khanacademy/wonder-blocks-tokens";
 *
 * {
 *     padding: `${spacing.medium_16}px ${spacing.large_24}px`,
 * }
 *
 * // After
 * import {sizing} from "@khanacademy/wonder-blocks-tokens";
 *
 * // Now you don't need to add the unit here as it's already included in the token
 * {
 *     padding: `${sizing.size_160} ${sizing.size_240}`,
 * }
 * ```

 * The mapping of the tokens is as follows:
 *
 * | Spacing (old)         | Sizing (new)      |
 * | --------------------- | ----------------- |
 * | `spacing.xxxxSmall_2` | `sizing.size_020` |
 * | `spacing.xxxSmall_4`  | `sizing.size_040` |
 * | `spacing.xxSmall_6`   | `sizing.size_060` |
 * | `spacing.xSmall_8`    | `sizing.size_080` |
 * | `spacing.small_12`    | `sizing.size_120` |
 * | `spacing.medium_16`   | `sizing.size_160` |
 * | `spacing.large_24`    | `sizing.size_240` |
 * | `spacing.xLarge_32`   | `sizing.size_320` |
 * | `spacing.xxLarge_48`  | `sizing.size_480` |
 * | `spacing.xxxLarge_64` | `sizing.size_640` |
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
    title: "Packages /Tokens / Deprecated / Spacing (deprecated)",
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
                cell: (row: Row) => <Code>{`spacing.${row.label}`}</Code>,
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

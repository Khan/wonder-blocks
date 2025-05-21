import * as React from "react";
import {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import packageConfig from "../../packages/wonder-blocks-typography/package.json";

import ComponentInfo from "../components/component-info";
import TypographyArgTypes from "./typography.argtypes";

import {View} from "@khanacademy/wonder-blocks-core";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {allModes} from "../../.storybook/modes";

/**
New component for Thunderblocks headings.

When wrapped in `<ThemeSwitcher theme="classroom">`, this component will use the
Plus Jakarta Sans font family.

The `size` prop will select a font size token based on our
[REM font sizing scale](/?path=/docs/packages-tokens-typography--docs&globals=theme:thunderblocks#size).
A corresponding line-height token will be automatically selected from our
[line-height scale](/?path=/docs/packages-tokens-typography--docs&globals=theme:thunderblocks#lineHeight).

The `weight` prop will match a font weight token based on the available
[font weights](/?path=/docs/packages-tokens-typography--docs&globals=theme:thunderblocks#weight).
Only `h1` through `h6` are allowed as tagNames for accessibility purposes.

Other content should utilize `BodyText`, primarily in `p` tags.
**/

export default {
    title: "Packages / Typography / Heading (New)",
    component: Heading,
    globals: {theme: "thunderblocks"},
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: TypographyArgTypes,
} as Meta<typeof Heading>;

/**
 * A dynamic example of the `Heading` component where you can select a size and
 * weight via props. Defaults to `size="large"` and `weight="bold"`.
 */
export const Default: StoryObj<typeof Heading> = {
    render: (args) => <Heading {...args} />,
    args: {
        children: "Heading",
        size: "large",
        weight: "bold",
    },
    parameters: {
        chromatic: {
            // Disabling because all typography components are covered together
            // in the Typography stories
            disableSnapshot: true,
        },
    },
};

/**
 * An example of the `Heading` component's `size` and `weight` prop combinations,
 * mimicking the ones found in Figma Foundation specs.
 */
export const SizesAndWeights = {
    parameters: {
        chromatic: {
            modes: {
                default: allModes.themeDefault,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
    render: () => (
        <View style={styles.grid}>
            <View style={styles.row}>
                <Heading size="small" weight="bold">
                    Small bold
                </Heading>
                <Heading size="small" weight="semi">
                    Small semibold
                </Heading>
            </View>
            <View style={styles.row}>
                <Heading size="medium" weight="bold">
                    Medium bold
                </Heading>
                <Heading size="medium" weight="semi">
                    Medium semibold
                </Heading>
            </View>
            <View style={styles.row}>
                <Heading size="large" weight="bold">
                    Large bold
                </Heading>
                <Heading size="large" weight="semi">
                    Large semibold
                </Heading>
            </View>
            <View style={styles.row}>
                <Heading size="xlarge" weight="bold">
                    xLarge bold
                </Heading>
                <Heading size="xlarge" weight="semi">
                    xLarge semibold
                </Heading>
            </View>
            <View style={styles.row}>
                <Heading size="xxlarge" weight="bold">
                    xxLarge bold
                </Heading>
            </View>
        </View>
    ),

    name: "Sizes and weights",
};

const styles = StyleSheet.create({
    grid: {
        display: "grid",
        gridTemplateColumns: "max-content max-content",
        rowGap: spacing.medium_16,
        columnGap: spacing.large_24,
    },
    row: {
        display: "contents",
    },
});

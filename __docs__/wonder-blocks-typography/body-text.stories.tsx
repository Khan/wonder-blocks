import * as React from "react";
import {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import packageConfig from "../../packages/wonder-blocks-typography/package.json";

import ComponentInfo from "../components/component-info";
import TypographyArgTypes from "./typography.argtypes";

import {View} from "@khanacademy/wonder-blocks-core";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {spacing} from "@khanacademy/wonder-blocks-tokens";

/**
New component for Thunderblocks body text.

When wrapped in `<ThemeSwitcher theme="classroom">`, this component will use the
Plus Jakarta Sans font family.

The `size` prop will select a font size token based on our
[REM font sizing scale](/?path=/docs/packages-tokens-typography--docs&globals=theme:thunderblocks#size).
A corresponding line-height token will be automatically selected from our
[line-height scale](/?path=/docs/packages-tokens-typography--docs&globals=theme:thunderblocks#lineHeight).

The `weight` prop will match a font weight token based on the available
[font weights](/?path=/docs/packages-tokens-typography--docs&globals=theme:thunderblocks#weight).

Heading text should utilize the `Heading` component.
**/

export default {
    title: "Packages / Typography / BodyText (New)",
    component: BodyText,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    globals: {theme: "thunderblocks"},
    argTypes: TypographyArgTypes,
} as Meta<typeof BodyText>;

/**
 * A dynamic example of the `BodyText` component where you can select a size and
 * weight via props. Defaults to `size="medium"` and `weight="medium"`.
 */
export const Default: StoryObj<typeof BodyText> = {
    render: (args) => <BodyText {...args} />,
    args: {
        children: "BodyText",
        size: "medium",
        weight: "medium",
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
 * An example of the `BodyText` component's `size` and `weight` prop combinations,
 * mimicking the ones found in Figma Foundation specs.
 */
export const SizesAndWeights = {
    render: () => (
        <View style={styles.grid}>
            <View style={styles.row}>
                <BodyText size="xsmall" weight="bold">
                    xSmall bold
                </BodyText>
                <BodyText size="xsmall" weight="medium">
                    xSmall medium
                </BodyText>
                <div />
            </View>
            <View style={styles.row}>
                <BodyText size="small" weight="semi">
                    Small semibold
                </BodyText>
                <div />
                <div />
            </View>
            <View style={styles.row}>
                <BodyText size="medium" weight="medium">
                    Medium medium
                </BodyText>
                <BodyText size="medium" weight="semi">
                    Medium semibold
                </BodyText>
                <BodyText size="medium" weight="bold">
                    Medium bold
                </BodyText>
            </View>
        </View>
    ),

    name: "Sizes and weights",
};

const styles = StyleSheet.create({
    grid: {
        display: "grid",
        gridAutoFlow: "row",
        gridTemplateColumns: "max-content max-content max-content",
        rowGap: spacing.medium_16,
        columnGap: spacing.large_24,
    },
    row: {
        display: "contents",
    },
});

import * as React from "react";
import {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import packageConfig from "../../packages/wonder-blocks-typography/package.json";

import ComponentInfo from "../components/component-info";
import TypographyArgTypes from "./typography.argtypes";

import {View} from "@khanacademy/wonder-blocks-core";
import {ThemeSwitcher} from "@khanacademy/wonder-blocks-theming";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import {spacing} from "@khanacademy/wonder-blocks-tokens";

const headingDescription = `New component for Thunderblocks headings.

When wrapped in \`<ThemeSwitcher theme="classroom">\`, this component will use the Plus Jakarta Sans font family.

The \`size\` prop will select a font size token based on our [REM font sizing scale](/?path=/docs/packages-tokens-typography--docs&globals=theme:thunderblocks#size). A corresponding line-height token will be automatically selected from our [line-height scale](/?path=/docs/packages-tokens-typography--docs&globals=theme:thunderblocks#lineHeight).

The \`weight\` prop will match a font weight token based on the available [font weights](/?path=/docs/packages-tokens-typography--docs&globals=theme:thunderblocks#weight).
Only \`h1\` through \`h6\` are allowed as tagNames for accessibility purposes.

Other content should utilize \`BodyText\`, primarily in \`p\` tags.`;

export default {
    title: "Packages / Typography / Heading",
    component: Heading,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        docs: {
            description: {
                component: headingDescription,
            },
        },
        chromatic: {
            // Disabling because all typography components are covered together
            // in the Typography stories
            disableSnapshot: true,
        },
    },
    argTypes: TypographyArgTypes,
} as Meta<typeof Heading>;

export const Default: StoryObj<typeof Heading> = {
    render: (args) => (
        <ThemeSwitcher theme="thunderblocks">
            <Heading {...args} />
        </ThemeSwitcher>
    ),
    args: {
        children: "Heading",
        size: "large",
        weight: "bold",
    },
};

export const SizesAndWeights = {
    render: () => (
        <View>
            <View style={styles.twoUp}>
                <Heading size="small" weight="semi">
                    Small semibold
                </Heading>
                <Heading size="small" weight="bold">
                    Small bold
                </Heading>
            </View>
            <View style={styles.twoUp}>
                <Heading size="medium" weight="semi">
                    Medium semibold
                </Heading>
                <Heading size="medium" weight="bold">
                    Medium bold
                </Heading>
            </View>
            <View style={styles.twoUp}>
                <Heading size="large" weight="semi">
                    Large semibold
                </Heading>
                <Heading size="large" weight="bold">
                    Large bold
                </Heading>
            </View>
            <View style={styles.twoUp}>
                <Heading size="xLarge" weight="semi">
                    xLarge semibold
                </Heading>
                <Heading size="xLarge" weight="bold">
                    xLarge bold
                </Heading>
            </View>
            <View style={styles.twoUp}>
                <Heading size="xxLarge" weight="semi">
                    xxLarge semibold
                </Heading>
                <Heading size="xxLarge" weight="bold">
                    xxLarge bold
                </Heading>
            </View>
        </View>
    ),

    name: "Sizes and weights",
};

const styles = StyleSheet.create({
    twoUp: {
        display: "flex",
        flexDirection: "row",
        gap: spacing.large_24,
        marginBottom: spacing.large_24,
    },
});

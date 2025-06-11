import * as React from "react";
import {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import packageConfig from "../../packages/wonder-blocks-typography/package.json";

import ComponentInfo from "../components/component-info";
import TypographyArgTypes from "./typography.argtypes";

import {View} from "@khanacademy/wonder-blocks-core";
import {
    Heading,
    HeadingLarge,
    HeadingMedium,
    HeadingSmall,
    HeadingXSmall,
    Tagline,
    Title,
} from "@khanacademy/wonder-blocks-typography";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {allModes} from "../../.storybook/modes";

/**
New component for Thunderblocks headings.

When wrapped in `<ThemeSwitcher theme="classroom">`, `Heading` will use the
Plus Jakarta Sans font family.

## Props

### `size`

The `size` prop will select a font size token based on our
[REM font sizing scale](/?path=/docs/packages-tokens-typography--docs&globals=theme:thunderblocks#size).
A corresponding line-height token will be automatically selected from our
[line-height scale](/?path=/docs/packages-tokens-typography--docs&globals=theme:thunderblocks#lineHeight).

Each size resolves to the following font-size and automatic line-height using `font.heading` tokens:

- small: `sizing.size_160` / `sizing.size_200` (`HeadingXSmall`)
- medium: `sizing.size_180` / `sizing.size_240` (`HeadingSmall`)
- large (default): `sizing.size_200` / `sizing.size_280` (`HeadingMedium`, `Tagline`)
- xlarge: `sizing.size_240` / `sizing.size_320` (`HeadingLarge`)
- xxlarge: `sizing.size_320` / `sizing.size_400` (`Title`)

With no `size` prop set, `Heading` will default to `large` font-size and line-height.

With no `size` or `tag` props set, `Heading` will default to `h2`.

### `weight`

The `weight` prop will match a font weight token for Jakarta based on the available
[font weights](/?path=/docs/packages-tokens-typography--docs&globals=theme:thunderblocks#weight).

- medium: `500`
- semi: `600`
- bold (default): `700`

With no `weight` prop set, `Heading` will default to `bold` weight.

### `tag`

You can override the heading level for a given content hierarchy with the `tag` prop,
such as `<Heading size="xlarge" tag="h3">`.

For each `size`, `Heading` will automatically set a heading `tagName` with a default level:

- xxlarge: `"h1"`
- xlarge: `"h2"`
- large: `"h3"`
- medium: `"h4"`
- small: `"h4"`

If `tag` is specified, that `h1`-`h6` value will be used in favor of the automatic algorithm.

Note: only `h1` through `h6` tags are allowed for accessibility purposes. For other
use cases, talk to us in the `#wonder-blocks` channel in Slack or raise an issue.

Other content should utilize `BodyText`, primarily in `p` tags.
**/

export default {
    title: "Packages / Typography / Heading (New)",
    component: Heading,
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
                <Heading size="small" weight="medium">
                    Small medium
                </Heading>
            </View>
            <View style={styles.row}>
                <Heading size="medium" weight="bold">
                    Medium bold
                </Heading>
                <Heading size="medium" weight="semi">
                    Medium semibold
                </Heading>
                <Heading size="medium" weight="medium">
                    Medium medium
                </Heading>
            </View>
            <View style={styles.row}>
                <Heading size="large" weight="bold">
                    Large bold
                </Heading>
                <Heading size="large" weight="semi">
                    Large semibold
                </Heading>
                <Heading size="large" weight="medium">
                    Large medium
                </Heading>
            </View>
            <View style={styles.row}>
                <Heading size="xlarge" weight="bold">
                    xLarge bold
                </Heading>
                <Heading size="xlarge" weight="semi">
                    xLarge semibold
                </Heading>
                <Heading size="xlarge" weight="medium">
                    xLarge medium
                </Heading>
            </View>
            <View style={styles.row}>
                <Heading size="xxlarge" weight="bold">
                    xxLarge bold
                </Heading>
                <Heading size="xxlarge" weight="semi">
                    xxLarge semibold
                </Heading>
                <div />
            </View>
        </View>
    ),

    name: "Sizes and weights",
};

/**
 * A table showing the conversion from Classic Typography components to Heading.
 */
export const ClassicConversionGuide = {
    parameters: {
        chromatic: {
            // Disabling because all typography components are covered together
            // in the Typography stories
            disableSnapshot: true,
        },
    },
    render: () => (
        <View style={[styles.grid, styles.conversionGuide]}>
            <View style={styles.row}>
                <HeadingXSmall>HeadingXSmall</HeadingXSmall>
                <Heading size="small">Heading size=small</Heading>
            </View>
            <View style={styles.row}>
                <HeadingSmall>HeadingSmall</HeadingSmall>
                <Heading size="medium">Heading size=medium</Heading>
            </View>
            <View style={styles.row}>
                <HeadingMedium>HeadingMedium</HeadingMedium>
                <Heading size="large">Heading size=large</Heading>
            </View>
            <View style={styles.row}>
                <Tagline>Tagline</Tagline>
                <Heading size="large" weight="medium">
                    Heading size=large, weight=medium
                </Heading>
            </View>
            <View style={styles.row}>
                <HeadingLarge>HeadingLarge</HeadingLarge>
                <Heading size="xlarge">Heading size=xlarge</Heading>
            </View>
            <View style={styles.row}>
                <Title>Title</Title>
                <Heading size="xxlarge">Heading size=xxlarge</Heading>
            </View>
        </View>
    ),
};

/**
 * An example of overriding `Heading` component's styling.
 */
export const CustomStyling = {
    parameters: {
        chromatic: {
            modes: {
                default: allModes.themeDefault,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
    render: () => (
        <View>
            <Heading>
                Text to show the default styling based on props. If we add more
                text here, it will run on multiple lines.
            </Heading>
            <Heading style={styles.customStyle}>
                A lot of text that runs on multiple lines, with custom styling.
                We really like ice cream. What flavor is your favorite? That’s
                not ice cream, it’s sorbet!
            </Heading>
        </View>
    ),
};

const styles = StyleSheet.create({
    grid: {
        display: "grid",
        gridTemplateColumns: "max-content max-content max-content",
        rowGap: spacing.medium_16,
        columnGap: spacing.large_24,
    },
    conversionGuide: {
        justifyContent: "flex-start",
        gridTemplateColumns: "max-content max-content",
    },
    row: {
        display: "contents",
    },
    customStyle: {
        lineHeight: "4rem",
        marginTop: "2rem",
    },
});

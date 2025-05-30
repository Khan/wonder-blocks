import * as React from "react";
import {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import packageConfig from "../../packages/wonder-blocks-typography/package.json";

import ComponentInfo from "../components/component-info";
import TypographyArgTypes from "./typography.argtypes";

import {View} from "@khanacademy/wonder-blocks-core";
import {
    BodyText,
    LabelXSmall,
    LabelSmall,
    LabelMedium,
    LabelLarge,
    Body,
} from "@khanacademy/wonder-blocks-typography";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {allModes} from "../../.storybook/modes";

/**
New component for Thunderblocks body text.

When wrapped in `<ThemeSwitcher theme="classroom">`, `BodyText` will use the
Plus Jakarta Sans font family.

## Props

### `size`

The `size` prop will select a font size token based on our
[REM font sizing scale](/?path=/docs/packages-tokens-typography--docs&globals=theme:thunderblocks#size).
A corresponding line-height token will be automatically selected from our
[line-height scale](/?path=/docs/packages-tokens-typography--docs&globals=theme:thunderblocks#lineHeight).

Each size resolves to the following font-size and automatic line-height using `font.body` tokens:

- xsmall: `sizing.size_120` / `sizing.size_160` (`LabelXSmall`)
- small: `sizing.size_140` / `sizing.size_180` (`LabelSmall`)
- medium (default): `sizing.size_160` / `sizing.size_200` (`LabelMedium`, `LabelLarge`, `Body`)

With no `size` prop set, `BodyText` will default to `medium` font size and line height.

### `weight`

The `weight` prop will match a font weight token for Jakarta based on the available
[font weights](/?path=/docs/packages-tokens-typography--docs&globals=theme:thunderblocks#weight).

- medium (default): `500`
- semi: `600`
- bold: `700`

With no `weight` prop set, `BodyText` will default to `medium` weight.

### `tag`

The `tag` prop will set a tagName, such as `tag="span"`.

`BodyText` renders with a `p` tag with `margin: 0` and block-level styling by default.

For nested components or non-paragraph content, set the `tag` prop (e.g. `tag="span"`, `tag="div"`, `tag="label"`).
The default `p` tag was selected based on historical usage and necessary semantics.

> Note: Heading text should utilize the `Heading` component. If the size or weight you're
looking for doesn't exist in `BodyText`, consider making it a `Heading`!
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

/**
 * A table showing the conversion from Classic Typography components to BodyText.
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
                <LabelXSmall tag="p">LabelXSmall</LabelXSmall>
                <BodyText size="xsmall">BodyText size=xsmall</BodyText>
            </View>
            <View style={styles.row}>
                <LabelSmall tag="p">LabelSmall</LabelSmall>
                <BodyText size="small">BodyText size=small</BodyText>
            </View>
            <View style={styles.row}>
                <LabelMedium tag="p">LabelMedium</LabelMedium>
                <BodyText>BodyText</BodyText>
            </View>
            <View style={styles.row}>
                <LabelLarge tag="p">LabelLarge</LabelLarge>
                <BodyText weight="bold">BodyText weight=bold</BodyText>
            </View>
            <View style={styles.row}>
                <Body tag="p">Body</Body>
                <BodyText>BodyText</BodyText>
            </View>
        </View>
    ),
};

const styles = StyleSheet.create({
    grid: {
        display: "grid",
        gridAutoFlow: "row",
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
});

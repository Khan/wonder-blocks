import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon/package.json";
import {GemIcon, Icon, StreakIcon} from "@khanacademy/wonder-blocks-icon";
import {View} from "@khanacademy/wonder-blocks-core";
import {border, sizing} from "@khanacademy/wonder-blocks-tokens";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {
    multiColoredIcon,
    singleColoredIcon,
} from "../components/icons-for-testing";
import {allModes} from "../../.storybook/modes";

export default {
    title: "Packages / Icon / Icon",
    component: Icon,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            modes: {
                default: allModes.themeDefault,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
} as Meta<typeof Icon>;

type StoryComponentType = StoryObj<typeof Icon>;

export const Default: StoryComponentType = {
    args: {
        children: <img src="/logo.svg" alt="Wonder Blocks" />,
    },
    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
    },
};

/**
 * The different sizes supported by the Icon component.
 */
export const Sizes: StoryComponentType = {
    render: () => {
        return (
            <View style={styles.container}>
                {(["small", "medium", "large", "xlarge"] as const).map(
                    (size) => (
                        <View style={styles.iconContainer} key={size}>
                            <LabelSmall>{size}</LabelSmall>
                            <Icon size={size}>
                                <img src="/logo.svg" alt="Wonder Blocks" />
                            </Icon>
                        </View>
                    ),
                )}
            </View>
        );
    },
};

/**
 * Custom styles can be applied to the icon using the `style` prop.
 */
export const CustomStyles: StoryComponentType = {
    args: {
        children: <img src="/logo.svg" alt="Wonder Blocks" />,
        size: "xlarge",
        style: {
            borderRadius: border.radius.radius_full,
            overflow: "hidden",
        },
    },
};

/**
 * The Icon component can be used with:
 * - `img` elements
 * - Inline svg elements
 * - Custom icon components from the Wonder Blocks Icon package
 */
export const CompatibleElements: StoryComponentType = {
    render: (args) => {
        return (
            <View style={{gap: sizing.size_160}}>
                <LabelSmall>Img element with .svg src</LabelSmall>
                <Icon {...args}>
                    <img src="logo.svg" alt="Wonder Blocks" />
                </Icon>
                <LabelSmall>Img element with .png src</LabelSmall>
                <Icon {...args}>
                    <img src="avatar.png" alt="Example avatar" />
                </Icon>
                <LabelSmall>Inline single-colored svg</LabelSmall>
                <Icon {...args}>{singleColoredIcon}</Icon>
                <LabelSmall>Inline multi-colored svg</LabelSmall>
                <Icon {...args}>{multiColoredIcon}</Icon>
                <LabelSmall>Custom Icon Components</LabelSmall>
                <View style={{gap: sizing.size_080, flexDirection: "row"}}>
                    <Icon {...args}>
                        <GemIcon aria-label="Gem" />
                    </Icon>
                    <Icon {...args}>
                        <StreakIcon aria-label="Streak" />
                    </Icon>
                </View>
            </View>
        );
    },
    args: {size: "large"},
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: sizing.size_360,
    },
    iconContainer: {
        alignItems: "center",
        gap: sizing.size_080,
    },
});

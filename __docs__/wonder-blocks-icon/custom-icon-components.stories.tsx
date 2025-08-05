import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon/package.json";
import {GemIcon, Icon, StreakIcon} from "@khanacademy/wonder-blocks-icon";
import {View} from "@khanacademy/wonder-blocks-core";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {themeModes} from "../../.storybook/modes";

/**
 * Custom icon components that render an inline svg. Use with the `Icon`
 * component to display the icon.
 *
 * Custom icon components use semantic color tokens for the different parts of
 * the icon so they will respond to the current theme.
 */
export default {
    title: "Packages / Icon / Custom Icon Components",
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            disableSnapshot: true,
            modes: themeModes,
        },
    },
    component: GemIcon,
    argTypes: {
        style: {
            table: {
                type: {
                    summary: "StyleType",
                },
            },
        },
    },
    decorators: [
        (Story) => (
            // Set a fixed size for the custom icons since they expand to the
            // size of its parent container.
            <View
                style={{
                    height: sizing.size_400,
                    width: "100%",
                }}
            >
                <Story />
            </View>
        ),
    ],
} as Meta<typeof GemIcon>;

type StoryComponentType = StoryObj<typeof GemIcon>;

export const AllCustomIcons: StoryComponentType = {
    render: (args) => (
        <View
            style={{
                gap: sizing.size_240,
                flexDirection: "row",
            }}
        >
            <GemIcon {...args} />
            <StreakIcon {...args} />
            {/* Add other custom icons here */}
        </View>
    ),
    parameters: {
        chromatic: {
            // Include snapshots for all the custom icons
            disableSnapshot: false,
        },
    },
};

/**
 * Use the `Icon` component to display the custom icon components.
 */
export const WithIconComponent: StoryComponentType = {
    render: (args) => (
        <View
            style={{
                gap: sizing.size_240,
                flexDirection: "row",
            }}
        >
            <Icon size="large">
                <GemIcon {...args} />
            </Icon>
            <Icon size="large">
                <StreakIcon {...args} />
            </Icon>
        </View>
    ),
};
/**
 * Custom icons can be styled using the `style` prop.
 */
export const CustomIconsWithCustomStyle: StoryComponentType = {
    ...AllCustomIcons,
    args: {
        style: {
            backgroundColor: semanticColor.surface.secondary,
            padding: sizing.size_040,
            borderRadius: border.radius.radius_040,
            border: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        },
    },
};

/**
 * Use the `GemIcon` component to represent gems.
 */
export const Gem: StoryComponentType = {
    name: "GemIcon",
    render: (args) => <GemIcon {...args} />,
    args: {
        "aria-label": "Gem",
    },
};

/**
 * Use the `StreakIcon` component to represent a streak.
 */
export const Streak: StoryComponentType = {
    name: "StreakIcon",
    render: (args) => <StreakIcon {...args} />,
    args: {
        "aria-label": "Streak",
    },
};

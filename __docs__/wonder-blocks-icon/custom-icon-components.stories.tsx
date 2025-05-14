import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon/package.json";
import {GemIcon} from "@khanacademy/wonder-blocks-icon";
import {View} from "@khanacademy/wonder-blocks-core";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

/**
 * Custom icon components that render an inline svg. Use with the `Icon`
 * component to display the icon.
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
            <View style={{width: sizing.size_400, height: sizing.size_400}}>
                <Story />
            </View>
        ),
    ],
} as Meta<typeof GemIcon>;

type StoryComponentType = StoryObj<typeof GemIcon>;

export const AllCustomIcons: StoryComponentType = {
    render: (args) => (
        <View style={{gap: sizing.size_160}}>
            <GemIcon {...args} />
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
 * Custom icons can be styled using the `style` prop.
 */
export const CustomIconsWithCustomStyle: StoryComponentType = {
    ...AllCustomIcons,
    args: {
        style: {
            backgroundColor: semanticColor.surface.secondary,
            padding: sizing.size_040,
            borderRadius: border.radius.radius_040,
            border: `${border.width.thin} solid ${semanticColor.border.subtle}`,
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

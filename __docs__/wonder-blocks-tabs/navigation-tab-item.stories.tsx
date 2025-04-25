import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tabs/package.json";
import {NavigationTabItem} from "@khanacademy/wonder-blocks-tabs";
import Link from "@khanacademy/wonder-blocks-link";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import argTypes from "./navigation-tab-item.argtypes";

const StyledUl = addStyle("ul", {
    margin: sizing.size_0,
    padding: sizing.size_0,
});

export default {
    title: "Packages / Tabs / NavigationTabs / Subcomponents / NavigationTabItem",
    component: NavigationTabItem,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    decorators: [
        (Story) => (
            // Wrap in a ul to address a11y warnings since NavigationTabItem
            // renders a li element and should be used within a NavigationTabs
            // component (which provides the ul element).
            <StyledUl>
                <Story />
            </StyledUl>
        ),
    ],
    argTypes,
} as Meta<typeof NavigationTabItem>;

type StoryComponentType = StoryObj<typeof NavigationTabItem>;

export const Default: StoryComponentType = {
    args: {
        children: <Link href="#link">Navigation tab item</Link>,
    },
    parameters: {
        chromatic: {
            // Disabling because it's covered by All Variants
            disableSnapshot: true,
        },
    },
};

/**
 * When a `Link` component is passed in for the `children` prop,
 * `NavigationTabItem` will inject props for the `Link`.
 *
 * For specific use cases where the `Link` component is wrapped by another
 * component (like a `Tooltip` or `Popover`), a render function can be used
 * instead. The render function provides the Link props that should be applied
 * to the Link component. The Link props contains styles and attributes for
 * accessibility like `aria-current`.
 */
export const ChildrenRenderFunction: StoryComponentType = {
    render() {
        return (
            <div
                style={{
                    // Need to set the height so tooltip/popover are captured in chromatic
                    minHeight: 200,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        gap: sizing.size_800,
                    }}
                >
                    <NavigationTabItem current={true}>
                        {(linkProps) => (
                            <Tooltip
                                content="Contents for the tooltip"
                                opened={true}
                            >
                                <Link href="#link-1" {...linkProps}>
                                    Link with Tooltip
                                </Link>
                            </Tooltip>
                        )}
                    </NavigationTabItem>
                    <NavigationTabItem current={true}>
                        {(linkProps) => (
                            <Popover
                                content={
                                    <PopoverContent
                                        title="Title"
                                        content="The popover content."
                                    />
                                }
                                opened={true}
                            >
                                <Link href="#link-1" {...linkProps}>
                                    Link with Popover
                                </Link>
                            </Popover>
                        )}
                    </NavigationTabItem>
                </View>
            </div>
        );
    },
    parameters: {
        // Added to ensure that the popover/tooltip is rendered using PopperJS.
        chromatic: {delay: 500},
    },
};

/**
 * Custom styles can be set for the NavigationTabItem.
 *
 * For custom link styling, prefer applying the styles to the `Link` component.
 * Note: The `NavigationTabItem` will also set styles to the `Link` child
 * component.
 *
 * If there is a specific use case where the styling needs to be
 * overridden, please reach out to the Wonder Blocks team!
 */
export const CustomStyle: StoryComponentType = {
    args: {
        children: <Link href="#link">Navigation tab item</Link>,
        style: {
            backgroundColor: semanticColor.surface.secondary,
        },
    },
};

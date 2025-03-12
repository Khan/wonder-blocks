import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tabs/package.json";
import {NavigationTabItem} from "@khanacademy/wonder-blocks-tabs";
import Link from "@khanacademy/wonder-blocks-link";
import {View} from "@khanacademy/wonder-blocks-core";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import argTypes from "./navigation-tab-item.argtypes";

export default {
    title: "Packages / Tabs / NavigationTabs / NavigationTabItem",
    component: NavigationTabItem,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        a11y: {
            config: {
                rules: [
                    // Disabling warning: "List item does not have a <ul>, <ol> parent element"
                    // This is intentional because NavigationTabs provides the ul element and it
                    // is outside of this component
                    {id: "listitem", enabled: false},
                ],
            },
        },
    },
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
export const ChildrenRenderFunction = () => {
    return (
        <View style={{flexDirection: "row", gap: sizing.size_1000}}>
            <NavigationTabItem current={true}>
                {(linkProps) => (
                    <Tooltip content="Tooltip" opened={true}>
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
    );
};

import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tabs/package.json";
import {
    NavigationTabItem,
    NavigationTabs,
} from "@khanacademy/wonder-blocks-tabs";
import Link from "@khanacademy/wonder-blocks-link";
import argTypes from "./navigation-tabs.argtypes";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

export default {
    title: "Packages / Tabs / NavigationTabs / NavigationTabs",
    component: NavigationTabs,
    subcomponents: {NavigationTabItem},
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes,
} as Meta<typeof NavigationTabs>;

type StoryComponentType = StoryObj<typeof NavigationTabs>;

const navigationTabItems = [
    <NavigationTabItem current={true}>
        <Link href="#link-1">Navigation tab item 1</Link>
    </NavigationTabItem>,
    <NavigationTabItem>
        <Link href="#link-2">Navigation tab item 2</Link>
    </NavigationTabItem>,
    <NavigationTabItem>
        <Link href="#link-3">Navigation tab item 3</Link>
    </NavigationTabItem>,
];

export const Default: StoryComponentType = {
    args: {
        children: navigationTabItems,
    },
    parameters: {
        chromatic: {
            // Disabling because it's covered by All Variants
            disableSnapshot: true,
        },
    },
};

/**
 * Custom styles can be set for the elements in NavigationTabs using the
 * `styles` prop.
 *
 * If there is a specific use case where the styling needs to be
 * overridden, please reach out to the Wonder Blocks team!
 */
export const CustomStyles: StoryComponentType = {
    args: {
        children: navigationTabItems,
        styles: {
            root: {
                padding: sizing.size_200,
            },
            list: {
                gap: sizing.size_500,
            },
        },
    },
};

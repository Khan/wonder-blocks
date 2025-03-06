import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-form/package.json";
import {
    NavigationTabItem,
    NavigationTabs,
} from "@khanacademy/wonder-blocks-tabs";
import Link from "@khanacademy/wonder-blocks-link";

/**
 * The NavigationTabs component is a tabbed interface for link navigation.
 * The tabs are links and keyboard users can change tabs using tab.
 * The NavigationTabs component is used with NavigationTabItem and Link
 * components. If the tabs should not be links, see the Tabs component,
 * which implements different semantics and keyboard interactions.
 */
export default {
    title: "Packages / Tabs / NavigationTabs / NavigationTabs",
    component: NavigationTabs,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
} as Meta<typeof NavigationTabs>;

type StoryComponentType = StoryObj<typeof NavigationTabs>;

const navigationTabItems = [
    <NavigationTabItem>
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
};

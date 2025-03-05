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
 *
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
        <Link href="#link-1">Nav tab item 1</Link>
    </NavigationTabItem>,
    <NavigationTabItem>
        <Link href="#link-2">Nav tab item 2</Link>
    </NavigationTabItem>,
];

export const Default: StoryComponentType = {
    args: {
        children: navigationTabItems,
    },
};

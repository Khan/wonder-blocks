import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-form/package.json";
import {NavigationTabItem} from "@khanacademy/wonder-blocks-tabs";

/**
 *
 */
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
    },
} as Meta<typeof NavigationTabItem>;

type StoryComponentType = StoryObj<typeof NavigationTabItem>;

export const Default: StoryComponentType = {
    args: {},
};

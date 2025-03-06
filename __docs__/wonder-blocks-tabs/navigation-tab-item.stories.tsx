import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-form/package.json";
import {NavigationTabItem} from "@khanacademy/wonder-blocks-tabs";
import Link from "@khanacademy/wonder-blocks-link";

/**
 * A component for a tab item in NavigationTabs. It is used with a Link
 * component.
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
} as Meta<typeof NavigationTabItem>;

type StoryComponentType = StoryObj<typeof NavigationTabItem>;

export const Default: StoryComponentType = {
    args: {
        children: <Link href="#link">Navigation tab item</Link>,
    },
};

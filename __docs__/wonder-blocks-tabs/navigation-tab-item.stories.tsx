import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tabs/package.json";
import {NavigationTabItem} from "@khanacademy/wonder-blocks-tabs";
import Link from "@khanacademy/wonder-blocks-link";
import {addStyle} from "@khanacademy/wonder-blocks-core";
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

import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {ResponsiveNavigationTabs} from "@khanacademy/wonder-blocks-tabs";

export default {
    title: "Packages / Tabs / ResponsiveNavigationTabs",
    component: ResponsiveNavigationTabs,
    parameters: {
        chromatic: {
            // Disabling snapshots in favour of snapshot stories
            disableSnapshot: true,
        },
    },
} as Meta<typeof ResponsiveNavigationTabs>;

type Story = StoryObj<typeof ResponsiveNavigationTabs>;

/**
 * ResponsiveNavigationTabs will switch between the NavigationTabs and
 * NavigationTabsDropdown layouts based on if there is enough horizontal space
 * to display the tabs.
 *
 * Some things that can affect this are:
 * - the length of tab labels, especially with translated text
 * - the number of tabs
 * - the width of the container or screen
 * - the zoom level
 */
export const Default: Story = {
    render: function Render(args) {
        // TODO: Implement interactive story in subsequent steps
        return <div>ResponsiveNavigationTabs - Coming soon</div>;
    },
};

import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {ResponsiveNavigationTabs} from "@khanacademy/wonder-blocks-tabs";
import {PropsFor} from "@khanacademy/wonder-blocks-core";

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

const ControledResponsiveNavigationTabs = (
    args: PropsFor<typeof ResponsiveNavigationTabs>,
) => {
    const [selectedTabId, setSelectedTabId] = React.useState(
        args.selectedTabId,
    );
    return (
        <ResponsiveNavigationTabs
            {...args}
            selectedTabId={selectedTabId}
            onTabSelected={setSelectedTabId}
        />
    );
};
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
    render: ControledResponsiveNavigationTabs,
    args: {
        tabs: [
            {
                id: "tab-1",
                label: "Tab 1",
                href: "#tab-1",
            },
            {
                id: "tab-2",
                label: "Tab 2",
                href: "#tab-2",
            },
            {
                id: "tab-3",
                label: "Tab 3",
                href: "#tab-3",
            },
        ],
        selectedTabId: "tab-1",
    },
};

import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {NavigationTabsDropdown} from "../../packages/wonder-blocks-tabs/src/components/navigation-tabs-dropdown";
import {PropsFor} from "@khanacademy/wonder-blocks-core";

export default {
    title: "Packages / Tabs / NavigationTabs / Subcomponents / NavigationTabsDropdown",
    component: NavigationTabsDropdown,
    parameters: {
        chromatic: {
            // Visual regression testing is done in the testing snapshots stories
            disableSnapshot: true,
        },
    },
    args: {
        "aria-label": "Tabs Dropdown Component",
    },
} as Meta<typeof NavigationTabsDropdown>;

type Story = StoryObj<typeof NavigationTabsDropdown>;

const ControlledNavigationTabsDropdown = (
    props: PropsFor<typeof NavigationTabsDropdown>,
) => {
    const {selectedTabId: initialSelectedTabId, ...restProps} = props;
    const [selectedTabId, setSelectedTabId] =
        React.useState(initialSelectedTabId);

    return (
        <NavigationTabsDropdown
            {...restProps}
            selectedTabId={selectedTabId}
            onTabSelected={setSelectedTabId}
        />
    );
};

export const Default: Story = {
    args: {
        tabs: [
            {
                id: "tab-1",
                label: "Tab Dropdown Item 1",
                href: "#tab-1",
            },
            {
                id: "tab-2",
                label: "Tab Dropdown Item 2",
                href: "#tab-2",
            },
            {
                id: "tab-3",
                label: "Tab Dropdown Item 3",
                href: "#tab-3",
            },
        ],
        selectedTabId: "tab-1",
    },
    render: ControlledNavigationTabsDropdown,
};

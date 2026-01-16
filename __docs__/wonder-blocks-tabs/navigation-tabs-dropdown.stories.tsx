import {Meta, StoryObj} from "@storybook/react-vite";
import {NavigationTabsDropdown} from "../../packages/wonder-blocks-tabs/src/components/navigation-tabs-dropdown";

export default {
    title: "Packages / Tabs / NavigationTabs / Subcomponents / TabsDropdown",
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

export const Default: Story = {
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
    },
};

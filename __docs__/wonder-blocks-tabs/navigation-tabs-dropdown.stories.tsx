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
        tabs: [],
        selectedTabId: "tab-1",
        opened: true,
    },
};

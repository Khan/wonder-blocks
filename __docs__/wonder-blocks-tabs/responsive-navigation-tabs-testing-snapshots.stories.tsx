import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {ResponsiveNavigationTabs} from "@khanacademy/wonder-blocks-tabs";
import {allModes, themeModes} from "../../.storybook/modes";

export default {
    title: "Packages / Tabs / ResponsiveNavigationTabs / Testing / ResponsiveNavigationTabs - Snapshots",
    component: ResponsiveNavigationTabs,
    tags: ["!autodocs"],
    parameters: {
        chromatic: {
            modes: {...themeModes, small: allModes.small},
        },
    },
} as Meta<typeof ResponsiveNavigationTabs>;

type Story = StoryObj<typeof ResponsiveNavigationTabs>;

export const Scenarios: Story = {
    render: function render() {
        // TODO: Implement snapshot scenarios in subsequent steps
        return <div>ResponsiveNavigationTabs Snapshots - Coming soon</div>;
    },
};

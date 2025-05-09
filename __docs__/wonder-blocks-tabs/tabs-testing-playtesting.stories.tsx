import * as React from "react";
import {Meta, StoryObj} from "@storybook/react";
import {Tabs} from "@khanacademy/wonder-blocks-tabs";
import {Placeholder} from "../components/placeholder";
import {ControlledTabs} from "./tabs-utils";
import {PropsFor} from "@khanacademy/wonder-blocks-core";

export default {
    title: "Packages / Tabs / Tabs / Testing / Tabs - Playtesting",
} as Meta<typeof Tabs>;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
    // We include a base default story so that the docs page can include the story
    // description properly.
    render: (args) => {
        return <Tabs {...args} />;
    },
    args: {
        tabs: [
            {
                id: "tab-1",
                label: "Tab 1",
                panel: <Placeholder>Tab contents 1</Placeholder>,
            },
            {
                id: "tab-2",
                label: "Tab 2",
                panel: <Placeholder>Tab contents 2</Placeholder>,
            },
        ],
        selectedTabId: "tab-1",
    },
    parameters: {
        chromatic: {disableSnapshot: true},
    },
};

/**
 * This is what the Tabs look like when the panel contents are long so the page
 * is scrollable. When a tab is selected using `Space` or `Enter`, the page
 * should not scroll down.
 */
export const ScrollingPage: Story = {
    render: (args: PropsFor<typeof ControlledTabs>) => {
        return <ControlledTabs {...args} />;
    },
    args: {
        tabs: [
            {
                label: "Tab 1",
                id: "tab-1",
                panel: (
                    <Placeholder>
                        <div style={{height: "200vh"}}>Tab contents 1</div>
                    </Placeholder>
                ),
            },
            {
                label: "Tab 2",
                id: "tab-2",
                panel: (
                    <Placeholder>
                        <div style={{height: "200vh"}}>Tab contents 2</div>
                    </Placeholder>
                ),
            },
            {
                label: "Tab 3",
                id: "tab-3",
                panel: (
                    <Placeholder>
                        <div style={{height: "200vh"}}>Tab contents 3</div>
                    </Placeholder>
                ),
            },
        ],
        selectedTabId: "tab-1",
    },
    parameters: {
        /** This story is used for testing purposes only so we disable snapshots */
        chromatic: {disableSnapshot: true},
    },
};

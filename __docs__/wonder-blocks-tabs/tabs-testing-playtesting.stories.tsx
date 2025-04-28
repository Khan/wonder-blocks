import * as React from "react";
import {Meta, StoryObj} from "@storybook/react";
import {PopoverContent, Popover} from "@khanacademy/wonder-blocks-popover";
import {Tab, Tabs} from "@khanacademy/wonder-blocks-tabs";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {Placeholder} from "../components/placeholder";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

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
 * For specific use cases where the underlying tab element is wrapped
 * by another component (like a `Tooltip` or `Popover`), a render function
 * can be used with the `Tab` component instead. The render function
 * provides the tab props that should be applied to the `Tab` component.
 * You will also need to set a `key` on the root element of the render function
 * since the tabs are rendered in a loop.
 *
 * This story demonstrates how to use a render function to wrap a `Tab`
 * component in a `Tooltip` and a `Popover`. Please test the accessibility for
 * your use case, especially focus management and keyboard interactions!
 */
export const TabLabelRenderFunction: Story = {
    render: (args) => {
        return <Tabs {...args} />;
    },
    args: {
        selectedTabId: "tab-1",
        tabs: [
            {
                label(tabProps) {
                    return (
                        <Tooltip
                            content="Contents for the tooltip"
                            key={tabProps.id}
                        >
                            <Tab {...tabProps}>Tab with a tooltip on it</Tab>
                        </Tooltip>
                    );
                },
                id: "tab-1",
                panel: <Placeholder>Tab contents 1</Placeholder>,
            },
            {
                label(tabProps) {
                    return (
                        <Popover
                            content={
                                <PopoverContent
                                    title="Title"
                                    content="The popover content."
                                    closeButtonVisible
                                />
                            }
                            key={tabProps.id}
                        >
                            <Tab {...tabProps}>Tab with a Popover on it</Tab>
                        </Popover>
                    );
                },
                id: "tab-2",
                panel: (
                    <Placeholder>
                        <View style={{padding: sizing.size_960}}>
                            Tab contents 2. Pressing `Enter` on the tab will
                            select the tab instead of triggering the popover.
                        </View>
                    </Placeholder>
                ),
            },
            {
                label(tabProps) {
                    return (
                        <Tooltip
                            content="Contents for the tooltip"
                            opened={true}
                            key={tabProps.id}
                        >
                            <Tab {...tabProps}>Tab with an opened tooltip</Tab>
                        </Tooltip>
                    );
                },
                id: "tab-3",
                panel: <Placeholder>Tab contents 3</Placeholder>,
            },
            {
                label(tabProps) {
                    return (
                        <Popover
                            content={
                                <PopoverContent
                                    title="Title"
                                    content="The popover content."
                                    closeButtonVisible
                                />
                            }
                            opened={true}
                            key={tabProps.id}
                        >
                            <Tab {...tabProps}>Tab with an opened Popover</Tab>
                        </Popover>
                    );
                },
                id: "tab-4",
                panel: <Placeholder>Tab contents 4</Placeholder>,
            },
        ],
    },
};

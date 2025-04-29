import * as React from "react";
import {Meta, StoryObj} from "@storybook/react";
import {PopoverContent, Popover} from "@khanacademy/wonder-blocks-popover";
import {Tab, TabRenderProps, Tabs} from "@khanacademy/wonder-blocks-tabs";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {Placeholder} from "../components/placeholder";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {ControlledTabs} from "./tabs-utils";

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
 * This story demonstrates how a render function could be used to wrap a `Tab`
 * component in a `Tooltip` and a `Popover`. Please test the accessibility for
 * your use case, especially around focus management, keyboard interactions, and
 * screenreader support!
 *
 * #### Current screenreader behaviour
 *
 * ##### Tooltips
 *
 * ###### ** Expected behaviour: ** The tooltip content is announced when the tab is focused.
 *
 * - Chrome + NVDA, Firefox + NVDA: Works as expected - the tooltip content is
 * announced when the tab is focused (both when a tooltip is already opened and
 * when it is not yet opened)
 * - Safari + VoiceOver: Only announces the tooltip content if the tooltip on
 * the tab was already opened. It does not announce the tooltip content when
 * focusing on a tab that opens a tooltip.
 *
 * ##### Popovers
 *
 * ###### ** Expected behaviour: ** Focusing on a tab with a popover will announce that it is expanded or collapsed.
 *
 * - Chrome + NVDA,Firefox + NVDA, Safari + VoiceOver: Works as expected - it is
 * announced that the tab is expanded or collapsed when it is focused.
 *
 * ###### ** Expected behaviour: ** A popover that is already opened is in the tab order
 *
 * - Chrome + NVDA, Firefox + NVDA, Safari + VoiceOver: The popover contents can
 * be tabbed to.
 * - The popover focus management is handled by the `Popover` component, see the
 * `Popover Accessibility` docs for more details.
 *
 * ###### ** Expected behaviour: ** Selecting a tab with a popover (using `Space` or `Enter`) will open the popover and update the selected tab.
 *
 * - Chrome + NVDA, Firefox + NVDA, Safari + VoiceOver: Works as expected - the
 * popover is opened and the selected tab is updated. The popover contents are
 * announced and can be interacted with.
 * - The popoverfocus management is handled by the `Popover` component, see the
 * `Popover Accessibility` docs for more details.
 */
export const TabLabelRenderFunction: Story = {
    render: function TestComponent() {
        const tabs = [
            {
                label(tabProps: TabRenderProps) {
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
                label(tabProps: TabRenderProps) {
                    return (
                        <Popover
                            initialFocusId="action-button"
                            content={
                                <PopoverContent
                                    title="Title"
                                    content="The popover content."
                                    closeButtonVisible
                                />
                            }
                            key={tabProps.id}
                            initialFocusDelay={100}
                        >
                            <Tab {...tabProps}>Tab with a Popover on it</Tab>
                        </Popover>
                    );
                },
                id: "tab-2",
                panel: <Placeholder>Tab contents 2</Placeholder>,
            },
            {
                label(tabProps: TabRenderProps) {
                    return (
                        <Tooltip
                            content="Contents for the tooltip"
                            opened={true}
                            key={tabProps.id}
                            placement="top"
                        >
                            <Tab {...tabProps}>Tab with an opened tooltip</Tab>
                        </Tooltip>
                    );
                },
                id: "tab-3",
                panel: <Placeholder>Tab contents 3</Placeholder>,
            },
            {
                label(tabProps: TabRenderProps) {
                    return (
                        <Popover
                            initialFocusId="action-button"
                            content={
                                <PopoverContent
                                    title="Title"
                                    content="The popover content."
                                    closeButtonVisible
                                />
                            }
                            opened={true}
                            key={tabProps.id}
                            placement="top"
                            initialFocusDelay={100}
                        >
                            <Tab {...tabProps}>Tab with an opened Popover</Tab>
                        </Popover>
                    );
                },
                id: "tab-4",
                panel: <Placeholder>Tab contents 4</Placeholder>,
            },
        ];
        return (
            <ControlledTabs
                aria-label="Test"
                tabs={tabs}
                selectedTabId={"tab-1"}
                styles={{
                    root: {
                        paddingBlock: sizing.size_960,
                        marginBlock: sizing.size_960,
                    },
                }}
            />
        );
    },
};

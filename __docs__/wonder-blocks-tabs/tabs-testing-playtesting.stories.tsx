import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import iceCreamBold from "@phosphor-icons/core/bold/ice-cream-bold.svg";
import {Tabs} from "@khanacademy/wonder-blocks-tabs";
import {Placeholder} from "../components/placeholder";
import {ControlledTabs} from "./tabs-utils";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Button from "@khanacademy/wonder-blocks-button";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";

export default {
    title: "Packages / Tabs / Testing / Tabs - Playtesting",
    parameters: {
        /** These stories are used for testing purposes only so we disable snapshots */
        chromatic: {disableSnapshot: true},
    },
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
};

/**
 * This is a story to test to make sure the active tab indicator is updated when
 * an icon is dynamically added to the tab label.
 */
export const DynamicIcon: Story = {
    render: function Example() {
        const [showIcon, setShowIcon] = React.useState(false);
        const [selectedTabId, setSelectedTabId] = React.useState("tab-1");
        return (
            <View>
                <Tabs
                    animated={true}
                    selectedTabId={selectedTabId}
                    onTabSelected={setSelectedTabId}
                    aria-label="Dynamic icon example"
                    tabs={[
                        {
                            label: "Tab 1",
                            id: "tab-1",
                            panel: <Placeholder>Tab contents 1</Placeholder>,
                            icon: showIcon ? (
                                <PhosphorIcon icon={iceCreamBold} />
                            ) : undefined,
                        },
                        {
                            label: "Tab 2",
                            id: "tab-2",
                            panel: <Placeholder>Tab contents 2</Placeholder>,
                        },
                        {
                            label: "Tab 3",
                            id: "tab-3",
                            panel: <Placeholder>Tab contents 3</Placeholder>,
                        },
                    ]}
                />
                <Button onClick={() => setShowIcon(!showIcon)}>
                    Toggle icon
                </Button>
            </View>
        );
    },
};

const TabsWrapperComponent = () => {
    const [selectedTab, setSelectedTab] = React.useState("tab-1");
    return (
        <Tabs
            aria-label="tabs"
            selectedTabId={selectedTab}
            onTabSelected={setSelectedTab}
            tabs={[
                {
                    label: "Tab 1",
                    id: "tab-1",
                    panel: (
                        <div>
                            Tab 1{" "}
                            <Button kind="secondary" size="small">
                                Focusable element
                            </Button>
                        </div>
                    ),
                },
                {
                    label: "Tab 2",
                    id: "tab-2",
                    panel: (
                        <div>
                            Tab 2
                            <Button kind="secondary" size="small">
                                Focusable element
                            </Button>
                        </div>
                    ),
                },
                {
                    label: "Tab 3",
                    id: "tab-3",
                    panel: <div>Tab 3</div>,
                },
            ]}
        />
    );
};
/**
 * An example of a popover that has tabs inside of it.
 */
export const PopoverWithTabs = {
    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
    },
    render: function Example() {
        const [selectedTab, setSelectedTab] = React.useState("tab-1");
        return (
            <View style={{alignItems: "center", gap: sizing.size_960}}>
                <Popover
                    content={() => (
                        <PopoverContentCore closeButtonVisible={true}>
                            <TabsWrapperComponent />
                        </PopoverContentCore>
                    )}
                >
                    {({open}) => (
                        <Button onClick={open}>
                            Popover with wrapped tabs
                        </Button>
                    )}
                </Popover>
                <Popover
                    content={() => (
                        <PopoverContentCore closeButtonVisible={true}>
                            <Tabs
                                aria-label="tabs"
                                selectedTabId={selectedTab}
                                onTabSelected={setSelectedTab}
                                tabs={[
                                    {
                                        label: "Tab 1",
                                        id: "tab-1",
                                        panel: (
                                            <div>
                                                Tab 1{" "}
                                                <Button
                                                    kind="secondary"
                                                    size="small"
                                                >
                                                    Focusable element
                                                </Button>
                                            </div>
                                        ),
                                    },
                                    {
                                        label: "Tab 2",
                                        id: "tab-2",
                                        panel: (
                                            <div>
                                                Tab 2
                                                <Button
                                                    kind="secondary"
                                                    size="small"
                                                >
                                                    Focusable element
                                                </Button>
                                            </div>
                                        ),
                                    },
                                    {
                                        label: "Tab 3",
                                        id: "tab-3",
                                        panel: <div>Tab 3</div>,
                                    },
                                ]}
                            />
                        </PopoverContentCore>
                    )}
                >
                    {({open}) => (
                        <Button onClick={open}>
                            Popover with tabs as direct children
                        </Button>
                    )}
                </Popover>
            </View>
        );
    },
};

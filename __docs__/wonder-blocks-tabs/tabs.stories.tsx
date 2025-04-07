import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-form/package.json";
import {Tab, TabItem, Tabs} from "@khanacademy/wonder-blocks-tabs";
import argTypes from "./tabs.argtypes";
import Button from "@khanacademy/wonder-blocks-button";
import Link from "@khanacademy/wonder-blocks-link";
import {TextField} from "@khanacademy/wonder-blocks-form";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";

const tabs: TabItem[] = [
    {label: "Tab 1", id: "tab-1", panel: <div>Tab contents 1</div>},
    {label: "Tab 2", id: "tab-2", panel: <div>Tab contents 2</div>},
    {label: "Tab 3", id: "tab-3", panel: <div>Tab contents 3</div>},
];

export default {
    title: "Packages / Tabs / Tabs",
    component: Tabs,
    subcomponents: {Tab},
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    args: {
        tabs,
        selectedTabId: tabs[0].id,
        "aria-label": "Tabs Example",
    },
    argTypes,
    render: function Controlled(args) {
        const [selectedTabId, setSelectedTabId] = React.useState(
            args.selectedTabId || tabs[0].id,
        );

        return (
            <Tabs
                {...args}
                selectedTabId={selectedTabId}
                onTabSelected={setSelectedTabId}
                tabs={args.tabs || tabs}
            />
        );
    },
} as Meta<typeof Tabs>;

type StoryComponentType = StoryObj<typeof Tabs>;

export const Default: StoryComponentType = {
    args: {},
};

/**
 * When `activationMode` is set to `manual`, the tab will only be activated
 * via keyboard when a tab receives focus and is selected by pressing `Space`
 * or `Enter`.
 */
export const ManualActivation: StoryComponentType = {
    args: {
        activationMode: "manual",
    },
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
};

/**
 * When `activationMode` is set to `automatic`, the tab will be activated via
 * keyboard when a tab receives focus.
 */
export const AutomaticActivation: StoryComponentType = {
    args: {
        activationMode: "automatic",
    },
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
};

/**
 * When a tab panel has focusable elements, pressing `Tab` from the tablist
 * will move focus to the first focusable element in the tab panel. If there
 * are no focusable elements in the active tab panel, the tab panel will be
 * focused instead.
 */
export const WithFocusableContent: StoryComponentType = {
    args: {
        selectedTabId: "tab-wb-button",
        tabs: [
            {
                label: "Content with WB Button",
                id: "tab-wb-button",
                panel: (
                    <div>
                        Tab contents with button{" "}
                        <Button>Focusable Button</Button>
                    </div>
                ),
            },
            {
                label: "Content with WB Link",
                id: "tab-wb-link",
                panel: (
                    <div>
                        Tab contents with link{" "}
                        <Link href="#link">Focusable Link</Link>
                    </div>
                ),
            },
            {
                label: "Content with WB TextField",
                id: "tab-wb-textfield",
                panel: (
                    <div>
                        Tab contents with WB TextField{" "}
                        <TextField
                            value=""
                            onChange={() => {}}
                            aria-label="Focusable TextField"
                        />
                    </div>
                ),
            },
            {
                label: "Content with button",
                id: "tab-button",
                panel: (
                    <div>
                        Tab contents with button{" "}
                        <button>Focusable Button</button>
                    </div>
                ),
            },
            {
                label: "Content with link",
                id: "tab-link",
                panel: (
                    <div>
                        Tab contents with link{" "}
                        <a href="#link">Focusable Link</a>
                    </div>
                ),
            },
            {
                label: "Content with input",
                id: "tab-input",
                panel: (
                    <div>
                        Tab contents with input{" "}
                        <input type="text" aria-label="Focusable input" />
                    </div>
                ),
            },
            {
                label: "Content with no focusable elements",
                id: "tab-no-focusable-elements",
                panel: <div>No focusable elements. Tab panel is focusable</div>,
            },
        ],
    },
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
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
export const TabLabelRenderFunction: StoryComponentType = {
    args: {
        tabs: [
            {
                label(tabProps) {
                    return (
                        <Tooltip
                            content="Tooltip"
                            opened={true}
                            key={tabProps.id}
                        >
                            <Tab {...tabProps}>Tab with a tooltip on it</Tab>
                        </Tooltip>
                    );
                },
                id: "tab-1",
                panel: <div>Tab contents 1</div>,
            },
            {
                label(tabProps) {
                    return (
                        <Popover
                            content={
                                <PopoverContent
                                    title="Title"
                                    content="The popover content."
                                />
                            }
                            opened={true}
                            key={tabProps.id}
                        >
                            <Tab {...tabProps}>Tab With a Popover on it</Tab>
                        </Popover>
                    );
                },
                id: "tab-2",
                panel: <div>Tab contents 2</div>,
            },
        ],
    },
};

const PanelExample = ({label}: {label: string}) => {
    React.useEffect(() => {
        action(`Panel mounted`)(label);
    }, [label]);

    return <div>{label}</div>;
};

/**
 * The tab panels are cached and only mounted once a tab is selected to prevent
 * unnecessary mounting/unmounting of tab panel contents.
 *
 * In this example, the panels contain components that print out a message in
 * the Storybook actions panel whenever it is mounted. Notice that a panel is
 * only mounted when it is selected the first time. Visiting a tab that has
 * already been selected will not cause the tab panel to be mounted again.
 */
export const PanelCaching: StoryComponentType = {
    args: {
        tabs: [
            {
                label: "Tab 1",
                id: "tab-1",
                panel: <PanelExample label="Tab 1" />,
            },
            {
                label: "Tab 2",
                id: "tab-2",
                panel: <PanelExample label="Tab 2" />,
            },
            {
                label: "Tab 3",
                id: "tab-3",
                panel: <PanelExample label="Tab 3" />,
            },
        ],
    },
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
};

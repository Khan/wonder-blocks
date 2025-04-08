import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {expect, within} from "@storybook/test";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-form/package.json";
import {Tab, TabItem, Tabs} from "@khanacademy/wonder-blocks-tabs";
import argTypes from "./tabs.argtypes";
import Button from "@khanacademy/wonder-blocks-button";
import Link from "@khanacademy/wonder-blocks-link";
import {TextField} from "@khanacademy/wonder-blocks-form";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";
import {ScenariosLayout} from "../components/scenarios-layout";
import {
    longText,
    longTextWithNoWordBreak,
} from "../components/text-for-testing";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {Placeholder} from "../components/placeholder";

const generateTabs = (
    count: number,
    tabContent: string = "Tab",
    withIcons: boolean = false,
) => {
    return new Array(count).fill(0).map((_, index) => ({
        label: (
            <View
                style={{
                    gap: sizing.size_080,
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                {withIcons && <PhosphorIcon icon={IconMappings.cookie} />}
                {`${tabContent} ${index + 1}`}
                {withIcons && <PhosphorIcon icon={IconMappings.iceCream} />}
            </View>
        ),
        id: `tab-${index + 1}`,
        panel: <Placeholder>Tab contents {index + 1}</Placeholder>,
    }));
};

const tabs: TabItem[] = [
    {
        label: "Tab 1",
        id: "tab-1",
        panel: <Placeholder>Tab contents 1</Placeholder>,
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
];

function ControlledTabs(props: PropsFor<typeof Tabs>) {
    const [selectedTabId, setSelectedTabId] = React.useState(
        props.selectedTabId,
    );

    return (
        <Tabs
            {...props}
            selectedTabId={selectedTabId}
            onTabSelected={setSelectedTabId}
            tabs={props.tabs}
        />
    );
}

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
    render: ControlledTabs,
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
 * The tab label can be customized to include icons.
 */
export const WithIcons: StoryComponentType = {
    args: {
        tabs: generateTabs(3, "Tab", true),
        selectedTabId: "tab-1",
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
                panel: <Placeholder>Tab contents 2</Placeholder>,
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
 * The `animated` prop can be set to `true` to animate the current underline
 * indicator. By default, `animated` is set to `false`.
 */
export const Animated: StoryComponentType = {
    args: {
        animated: true,
    },
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
    play: async ({canvasElement}) => {
        // Arrange
        const canvas = within(canvasElement.ownerDocument.body);

        // Act
        const currentIndicator = await canvas.findByRole("presentation");
        const style = window.getComputedStyle(currentIndicator);

        // Assert
        await expect(style.transitionProperty).toMatch(/transform/);
    },
};

/**
 * When the `animated` prop is `false`, there is no animation when the current
 * tab changes.  By default, `animated` is set to `false`.
 */
export const AnimationsDisabled: StoryComponentType = {
    args: {
        animated: false,
    },
    play: async ({canvasElement}) => {
        // Arrange
        const canvas = within(canvasElement.ownerDocument.body);

        // Act
        const currentIndicator = await canvas.findByRole("presentation");
        const style = window.getComputedStyle(currentIndicator);

        // Assert
        await expect(style.transitionProperty).not.toMatch(/transform/);
    },
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

/**
 * The following example shows how the `styles` prop can be used to apply
 * custom styles to different elements in the `Tabs` component.
 */
export const CustomStyles: StoryComponentType = {
    args: {
        // These styles are for demo purposes only. We use this story in the
        // visual regression tests to ensure that the custom styles are applied
        // correctly.
        styles: {
            root: {border: "2px solid lightpink"},
            tablist: {backgroundColor: "lavender"},
            tabPanel: {backgroundColor: "lavenderblush"},
            tab: {backgroundColor: "lightcyan"},
        },
        tabs: [
            {
                label: "Tab 1",
                id: "tab-1",
                panel: <div>Tab contents 1</div>,
            },
            {
                label: "Tab 2",
                id: "tab-2",
                panel: <div>Tab contents 2</div>,
            },
            {
                label: (
                    <View
                        style={{
                            backgroundColor: "honeydew",
                            fontStyle: "italic",
                        }}
                    >
                        Tab with custom style
                    </View>
                ),
                id: "tab-3",
                panel: (
                    <View
                        style={{
                            backgroundColor: "honeydew",
                            fontStyle: "italic",
                        }}
                    >
                        Tab contents with custom style
                    </View>
                ),
            },
        ],
    },
};

const scenarios = [
    {
        name: "Zero items",
        props: {
            tabs: [],
        },
    },
    {
        name: "Many Items",
        props: {
            tabs: generateTabs(30),
            selectedTabId: "tab-1",
        },
    },
    {
        name: "No item selected",
        props: {
            tabs: generateTabs(3),
            selectedTabId: "",
        },
    },
    {
        name: "Long text",
        props: {
            tabs: generateTabs(3, longText),
            selectedTabId: "tab-1",
        },
    },
    {
        name: "Long text with no word break",
        props: {
            tabs: generateTabs(3, longTextWithNoWordBreak),
            selectedTabId: "tab-1",
        },
    },
    {
        name: "Long text (with icons)",
        props: {
            tabs: generateTabs(3, longText, true),
            selectedTabId: "tab-1",
        },
    },
    {
        name: "Long text with no word break (with icons)",
        props: {
            tabs: generateTabs(3, longTextWithNoWordBreak, true),
            selectedTabId: "tab-1",
        },
    },
    {
        name: "Varying lengths",
        props: {
            tabs: [
                {
                    label: longText,
                    id: "tab-1",
                    panel: <div>Tab contents 1</div>,
                },
                {
                    label: "Short text",
                    id: "tab-2",
                    panel: <div>Tab contents 2</div>,
                },
                {
                    label: longText,
                    id: "tab-3",
                    panel: <div>Tab contents 3</div>,
                },
                {
                    label: "Short text",
                    id: "tab-4",
                    panel: <div>Tab contents 4</div>,
                },
            ],
            selectedTabId: "tab-1",
        },
    },
    {
        name: "With icons only",
        props: {
            tabs: [
                {
                    label: (
                        <PhosphorIcon
                            icon={IconMappings.cookie}
                            size="medium"
                            aria-label="Tab 1"
                        />
                    ),
                    id: "tab-1",
                    panel: <div>Tab contents 1</div>,
                },
                {
                    label: (
                        <PhosphorIcon
                            icon={IconMappings.iceCream}
                            size="medium"
                            aria-label="Tab 2"
                        />
                    ),
                    id: "tab-2",
                    panel: <div>Tab contents 2</div>,
                },
            ],
            selectedTabId: "tab-1",
        },
    },
];

export const Scenarios: StoryComponentType = {
    render: (args) => {
        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props) => <ControlledTabs {...args} {...props} />}
            </ScenariosLayout>
        );
    },
    args: {
        animated: true,
    },
};

import type {Meta, StoryObj} from "@storybook/react";
import * as React from "react";

import {Tabs} from "@khanacademy/wonder-blocks-tabs";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {addStyle, PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {
    rtlText,
    longText,
    longTextWithNoWordBreak,
} from "../components/text-for-testing";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {ScenariosLayout} from "../components/scenarios-layout";
import {ControlledTabs, generateTabs} from "./tabs-utils";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";

const StyledDiv = addStyle("div");

const generateRows = (rtl: boolean = false) => [
    {
        name: "Default",
        props: {
            tabs: [
                {
                    label: rtl ? rtlText : "Tab 1",
                    id: "tab-1",
                    panel: rtl ? rtlText : "Tab 1 Contents",
                },
                {
                    label: rtl ? rtlText : "Tab 2",
                    id: "tab-2",
                    panel: rtl ? rtlText : "Tab 2 Contents",
                },
                {
                    label: rtl ? rtlText : "Tab 3",
                    id: "tab-3",
                    panel: rtl ? rtlText : "Tab 3 Contents",
                },
            ],
            selectedTabId: "tab-1",
        },
    },
    {
        name: "With Icons",
        props: {
            tabs: [
                {
                    label: (
                        <StyledDiv
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: sizing.size_040,
                            }}
                        >
                            <PhosphorIcon icon={IconMappings.cookie} />
                            {rtl ? rtlText : "Tab 1"}
                            <PhosphorIcon icon={IconMappings.iceCream} />
                        </StyledDiv>
                    ),
                    id: "tab-1",
                    panel: rtl ? rtlText : "Tab 1 Contents",
                },
                {
                    label: (
                        <StyledDiv
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: sizing.size_040,
                            }}
                        >
                            <PhosphorIcon icon={IconMappings.cookie} />
                            {rtl ? rtlText : "Tab 2"}
                            <PhosphorIcon icon={IconMappings.iceCream} />
                        </StyledDiv>
                    ),
                    id: "tab-2",
                    panel: rtl ? rtlText : "Tab 2 Contents",
                },
                {
                    label: (
                        <StyledDiv
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: sizing.size_040,
                            }}
                        >
                            <PhosphorIcon icon={IconMappings.cookie} />
                            {rtl ? rtlText : "Tab 3"}
                            <PhosphorIcon icon={IconMappings.iceCream} />
                        </StyledDiv>
                    ),
                    id: "tab-3",
                    panel: rtl ? rtlText : "Tab 3 Contents",
                },
            ],
            selectedTabId: "tab-1",
        },
    },
    {
        name: "Icon Only",
        props: {
            tabs: [
                {
                    label: (
                        <PhosphorIcon
                            icon={IconMappings.iceCream}
                            size="medium"
                        />
                    ),
                    id: "tab-1",
                    panel: rtl ? rtlText : "Tab 1 Contents",
                    "aria-label": "Tab 1",
                },
                {
                    label: (
                        <PhosphorIcon
                            icon={IconMappings.cookie}
                            size="medium"
                        />
                    ),
                    id: "tab-2",
                    panel: rtl ? rtlText : "Tab 2 Contents",
                    "aria-label": "Tab 2",
                },
            ],
            selectedTabId: "tab-1",
        },
    },
];

const rows = generateRows();
const rtlRows = generateRows(true);

const columns = [
    {
        name: "Default",
        props: {},
    },
];

type Story = StoryObj<typeof Tabs>;

/**
 * The following stories are used to generate the pseudo states for the Switch
 * component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Tabs / Tabs / Testing / Tabs - Snapshots",
    component: Tabs,
    args: {
        tabs: [],
    },
    tags: ["!autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;

const generateStateSheet = (
    args: Partial<PropsFor<typeof Tabs>>,
    layout: "responsive" | "list",
) => {
    return (
        <View>
            <StateSheet rows={rows} columns={columns} title="" layout={layout}>
                {({props, name, className}) => (
                    <View className={className}>
                        <Tabs {...args} {...props} key={name} />
                    </View>
                )}
            </StateSheet>
            <div dir="rtl">
                <StateSheet
                    rows={rtlRows}
                    columns={columns}
                    title=""
                    layout={layout}
                >
                    {({props, name, className}) => (
                        <View className={className}>
                            <Tabs {...args} {...props} key={name} />
                        </View>
                    )}
                </StateSheet>
            </div>
        </View>
    );
};

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => {
        return generateStateSheet(args, "responsive");
    },
    parameters: {
        pseudo: defaultPseudoStates,
        chromatic: {
            delay: 1500,
        },
    },
};

export const Zoom: Story = {
    render: (args) => {
        return generateStateSheet(args, "list");
    },
    globals: {
        zoom: "400%",
    },
    parameters: {
        pseudo: defaultPseudoStates,
        chromatic: {
            delay: 500,
        },
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

export const Scenarios: Story = {
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

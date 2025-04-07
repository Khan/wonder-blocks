import type {Meta, StoryObj} from "@storybook/react";
import * as React from "react";

import {Tabs} from "@khanacademy/wonder-blocks-tabs";
import {AllVariants} from "../components/all-variants";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {rtlText} from "../components/text-for-testing";

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
                                // TODO: Update to use spacing tokens
                                gap: "4px",
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
                                // TODO: Update to use spacing tokens
                                gap: "4px",
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
                                // TODO: Update to use spacing tokens
                                gap: "4px",
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
    title: "Packages / Tabs / Tabs / Tabs - All Variants",
    component: Tabs,
    render: (args) => (
        <>
            <AllVariants rows={rows} columns={columns}>
                {(props) => (
                    <View>
                        <Tabs {...args} {...props} />
                    </View>
                )}
            </AllVariants>
            <div dir="rtl">
                <AllVariants rows={rtlRows} columns={columns}>
                    {(props) => (
                        <View>
                            <Tabs {...args} {...props} />
                        </View>
                    )}
                </AllVariants>
            </div>
        </>
    ),
    args: {},
    tags: ["!autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;

export const Default: Story = {};

export const Hover: Story = {
    parameters: {pseudo: {hover: true}},
};

export const Focus: Story = {
    parameters: {pseudo: {focusVisible: true}},
};

export const HoverFocus: Story = {
    name: "Hover + Focus",
    parameters: {pseudo: {hover: true, focusVisible: true}},
};

export const Press: Story = {
    parameters: {pseudo: {hover: true, active: true}},
};

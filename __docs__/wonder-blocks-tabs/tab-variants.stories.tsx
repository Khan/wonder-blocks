import type {Meta, StoryObj} from "@storybook/react";
import * as React from "react";

import {Tab} from "@khanacademy/wonder-blocks-tabs";
import {AllVariants} from "../components/all-variants";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {rtlText} from "../components/text-for-testing";

const StyledDiv = addStyle("div");

const generateRows = (rtl: boolean = false) => [
    {
        name: "Default",
        props: {
            children: rtl ? rtlText : "Tab",
        },
    },
    {
        name: "With Icons",
        props: {
            children: (
                <StyledDiv
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: sizing.size_040,
                    }}
                >
                    <PhosphorIcon icon={IconMappings.cookie} />
                    {rtl ? rtlText : "Tab"}
                    <PhosphorIcon icon={IconMappings.iceCream} />
                </StyledDiv>
            ),
            ariaLabel: "Tab with icons",
        },
    },
    {
        name: "Icon Only",
        props: {
            children: (
                <PhosphorIcon icon={IconMappings.iceCream} size="medium" />
            ),
            ariaLabel: "Tab with icon",
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
    {
        name: "Selected",
        props: {
            selected: true,
        },
    },
];

type Story = StoryObj<typeof Tab>;

/**
 * The following stories are used to generate the pseudo states for the Switch
 * component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Tabs / Tabs / Subcomponents /Tab - All Variants",
    component: Tab,
    render: (args) => (
        <>
            <AllVariants rows={rows} columns={columns}>
                {(props) => (
                    <div role="tablist">
                        <Tab {...args} {...props} />
                    </div>
                )}
            </AllVariants>
            <div dir="rtl">
                <AllVariants rows={rtlRows} columns={columns}>
                    {(props) => (
                        <div role="tablist">
                            <Tab {...args} {...props} />
                        </div>
                    )}
                </AllVariants>
            </div>
        </>
    ),
    args: {},
    tags: ["!autodocs"],
} satisfies Meta<typeof Tab>;

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

export const PressFocus: Story = {
    parameters: {pseudo: {focusVisible: true, active: true}},
};

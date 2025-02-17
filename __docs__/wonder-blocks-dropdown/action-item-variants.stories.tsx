import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {AllVariants} from "../components/all-variants";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {ActionItem} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

const rows = [
    {name: "Unchecked", props: {checked: false}},
    {name: "Checked", props: {checked: true}},
    {name: "Indeterminate", props: {checked: null}},
];

const columns = [
    {
        name: "Default",
        props: {},
    },
    {
        name: "Disabled",
        props: {disabled: true},
    },
    {
        name: "Custon label",
        props: {
            label: "Action Item",
            onClick: () => {},
            leftAccessory: (
                <PhosphorIcon icon={IconMappings.calendar} size="medium" />
            ),
            rightAccessory: (
                <PhosphorIcon icon={IconMappings.caretRight} size="medium" />
            ),
        },
    },
];

type Story = StoryObj<typeof ActionItem>;

/**
 * The following stories are used to generate the pseudo states for the
 * ActionItem component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Dropdown / ActionItem / ActionItem - All Variants",
    component: ActionItem,
    render: (args) => (
        <AllVariants rows={rows} columns={columns}>
            {(props) => <ActionItem {...args} {...props} />}
        </AllVariants>
    ),
    args: {
        label: "Action Item",
        onClick: () => {},
        disabled: false,
        testId: "",
        lang: "",
        role: "menuitem",
        style: {},
        horizontalRule: "none",
        leftAccessory: null,
        rightAccessory: null,
    },
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View
                style={{
                    background: semanticColor.surface.secondary,
                    width: 800,
                }}
            >
                <Story />
            </View>
        ),
    ],
    tags: ["!autodocs"],
} satisfies Meta<typeof ActionItem>;

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

export const Active: Story = {
    parameters: {pseudo: {active: true, focusVisible: true}},
};

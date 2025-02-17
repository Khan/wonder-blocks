import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {AllVariants} from "../components/all-variants";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {AccessoryMappings} from "./option-item.argtypes";

const rows = [
    {name: "Unselected", props: {checked: false}},
    {name: "Selected (single)", props: {selected: true, variant: "check"}},
    {name: "Selected (multi)", props: {selected: true, variant: "checkbox"}},
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
            label: "Option Item",
            onClick: () => {},
            subtitle1: AccessoryMappings.pill,
            subtitle2: "Subtitle 2",
            leftAccessory: (
                <PhosphorIcon icon={IconMappings.calendar} size="medium" />
            ),
            rightAccessory: (
                <PhosphorIcon icon={IconMappings.caretRight} size="medium" />
            ),
        },
    },
];

type Story = StoryObj<typeof OptionItem>;

/**
 * The following stories are used to generate the pseudo states for the
 * OptionItem component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Dropdown / OptionItem / OptionItem - All Variants",
    component: OptionItem,
    render: (args) => (
        <AllVariants rows={rows} columns={columns}>
            {(props) => <OptionItem {...args} {...props} />}
        </AllVariants>
    ),
    args: {
        label: "Option Item",
        onClick: () => {},
        disabled: false,
        testId: "",
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
} satisfies Meta<typeof OptionItem>;

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

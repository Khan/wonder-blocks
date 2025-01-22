import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

// NOTE: Radio is an internal component and should not be used directly. Use
// RadioGroup instead. This import is only used for visual testing in Chromatic.
import Radio from "../../packages/wonder-blocks-form/src/components/radio";

import {AllVariants} from "../components/all-variants";

const rows = [
    {name: "Unchecked", props: {checked: false}},
    {name: "Checked", props: {checked: true}},
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
        name: "Error",
        props: {error: true},
    },
];

type Story = StoryObj<typeof Radio>;

/**
 * The following stories are used to generate the pseudo states for the Radio
 * component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Form / Radio (internal) / Radio - All Variants",
    component: Radio,
    render: (args) => (
        <AllVariants rows={rows} columns={columns}>
            {(props) => <Radio {...args} {...props} />}
        </AllVariants>
    ),
    args: {
        label: "Label",
        description: "Description",
    },
    tags: ["!autodocs"],
} satisfies Meta<typeof Radio>;

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
    parameters: {pseudo: {active: true}},
};

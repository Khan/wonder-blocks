import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {Checkbox} from "@khanacademy/wonder-blocks-form";

import {AllVariants} from "../components/all-variants";

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
        name: "Error",
        props: {error: true},
    },
];

type Story = StoryObj<typeof Checkbox>;

/**
 * The following stories are used to generate the pseudo states for the Checkbox
 * component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Form / Checkbox / Checkbox - All Variants",
    component: Checkbox,
    render: (args) => (
        <AllVariants rows={rows} columns={columns}>
            {(props) => <Checkbox {...args} {...props} />}
        </AllVariants>
    ),
    args: {
        label: "Label",
        description: "Description",
    },
    tags: ["!autodocs"],
} satisfies Meta<typeof Checkbox>;

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

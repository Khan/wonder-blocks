import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {Checkbox} from "@khanacademy/wonder-blocks-form";

import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {themeModes} from "../../.storybook/modes";

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
    title: "Packages / Form / Testing / Snapshots / Checkbox",
    component: Checkbox,
    args: {
        label: "Label",
        description: "Description",
    },
    parameters: {
        chromatic: {
            modes: themeModes,
        },
    },
    tags: ["!autodocs", "!manifest"],
} satisfies Meta<typeof Checkbox>;

export default meta;

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => {
        return (
            <StateSheet rows={rows} columns={columns}>
                {({props, className, name}) => (
                    <Checkbox
                        {...args}
                        {...props}
                        className={className}
                        key={name}
                    />
                )}
            </StateSheet>
        );
    },
    parameters: {
        pseudo: defaultPseudoStates,
    },
};

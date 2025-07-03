import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

// NOTE: Radio is an internal component and should not be used directly. Use
// RadioGroup instead. This import is only used for visual testing in Chromatic.
import Radio from "../../packages/wonder-blocks-form/src/components/radio";

import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {allModes} from "../../.storybook/modes";

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
    title: "Packages / Form / Testing / Snapshots / Radio (internal)",
    component: Radio,
    args: {
        label: "Label",
        description: "Description",
    },
    parameters: {
        chromatic: {
            modes: {
                default: allModes.themeDefault,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
    tags: ["!autodocs"],
} satisfies Meta<typeof Radio>;

export default meta;

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => {
        return (
            <StateSheet rows={rows} columns={columns}>
                {({props, className, name}) => (
                    <Radio
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

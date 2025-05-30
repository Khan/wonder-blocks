import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {MultiSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {allModes} from "../../.storybook/modes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";

/**
 * The following stories are used to generate the pseudo states for the
 * multi select component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Dropdown / Testing / Snapshots / MultiSelect",
    parameters: {
        chromatic: {
            modes: {
                default: allModes.themeDefault,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
    args: {
        children: [
            <OptionItem label="item 1" value="1" key="1" />,
            <OptionItem label="item 2" value="2" key="2" />,
            <OptionItem label="item 3" value="3" key="3" />,
        ],
        onChange: () => {},
    },
    tags: ["!autodocs"],
} as Meta;

type Story = StoryObj<typeof MultiSelect>;

const rows = [{name: "Default", props: {}}];

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
    {
        name: "With selection (1 selected)",
        props: {selectedValues: ["1"]},
    },
    {
        name: "With selection (2 selected)",
        props: {selectedValues: ["1", "2"]},
    },
    {
        name: "With selection (All selected)",
        props: {selectedValues: ["1", "2", "3"]},
    },
];

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => {
        return (
            <StateSheet rows={rows} columns={columns}>
                {({props, className, name}) => (
                    <MultiSelect
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

import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {SingleSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {allModes} from "../../.storybook/modes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";

/**
 * The following stories are used to generate the pseudo states for the
 * single select component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Dropdown / Testing / Snapshots / SingleSelect",
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
        placeholder: "Placeholder",
    },
    tags: ["!autodocs"],
} as Meta;

type Story = StoryObj<typeof SingleSelect>;

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
        name: "With selection",
        props: {selectedValue: "1"},
    },
];

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => {
        return (
            <StateSheet rows={rows} columns={columns}>
                {({props, className, name}) => (
                    <SingleSelect
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

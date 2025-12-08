import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {MultiSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {themeModes} from "../../.storybook/modes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {
    longText,
    longTextWithNoWordBreak,
} from "../components/text-for-testing";
import {ScenariosLayout} from "../components/scenarios-layout";
import {PropsFor} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

/**
 * The following stories are used to generate the pseudo states for the
 * multi select component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Dropdown / Testing / Snapshots / MultiSelect",
    parameters: {
        chromatic: {
            modes: themeModes,
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

const rows = [{name: "Default", props: {"aria-label": "Example"}}];

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
        name: "Readonly",
        props: {readOnly: true},
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
    {
        name: "With selection (All selected) + Disabled",
        props: {selectedValues: ["1", "2", "3"], disabled: true},
    },
    {
        name: "With selection (All selected) + Readonly",
        props: {selectedValues: ["1", "2", "3"], readOnly: true},
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
        pseudo: {
            ...defaultPseudoStates,
            // Using the focus selector instead so that the focus outline is shown
            // when the select opener is clicked
            focus: [...defaultPseudoStates.focusVisible],
        },
    },
};

const ControlledMultiSelect = (props: PropsFor<typeof MultiSelect>) => {
    const [selectedValues, setSelectedValues] = React.useState(
        props.selectedValues,
    );
    return (
        <MultiSelect
            {...props}
            selectedValues={selectedValues}
            onChange={setSelectedValues}
        />
    );
};

export const Scenarios: Story = {
    render: () => {
        const scenarios = [
            {
                name: "Long option item label",
                props: {
                    children: [
                        <OptionItem label={longText} value="1" key="1" />,
                    ],
                    opened: true,
                    style: {paddingBlockEnd: sizing.size_560},
                },
            },
            {
                name: "Long option item label with no word break",
                props: {
                    children: [
                        <OptionItem
                            label={longTextWithNoWordBreak}
                            value="1"
                            key="1"
                        />,
                    ],
                    opened: true,
                    style: {marginBlockEnd: sizing.size_560},
                },
            },
            {
                name: "Long selected option label",
                props: {
                    children: [
                        <OptionItem label={longText} value="1" key="1" />,
                        <OptionItem label={longText} value="2" key="2" />,
                        <OptionItem label={longText} value="3" key="3" />,
                    ],
                    selectedValues: ["1"],
                },
            },
            {
                name: "Long selected option label with no word break",
                props: {
                    children: [
                        <OptionItem
                            label={longTextWithNoWordBreak}
                            value="1"
                            key="1"
                        />,
                        <OptionItem
                            label={longTextWithNoWordBreak}
                            value="2"
                            key="2"
                        />,
                        <OptionItem
                            label={longTextWithNoWordBreak}
                            value="3"
                            key="3"
                        />,
                    ],
                    selectedValues: ["1"],
                },
            },
        ];
        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props, name) => (
                    <ControlledMultiSelect {...props} aria-label={name} />
                )}
            </ScenariosLayout>
        );
    },
    globals: {
        viewport: {
            value: "small",
        },
    },
};

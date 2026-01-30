import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {SingleSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {themeModes} from "../../.storybook/modes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {ScenariosLayout} from "../components/scenarios-layout";
import {
    longText,
    longTextWithNoWordBreak,
} from "../components/text-for-testing";
import {PropsFor} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

/**
 * The following stories are used to generate the pseudo states for the
 * single select component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Dropdown / Testing / Snapshots / SingleSelect",
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
        placeholder: "Placeholder",
    },
    tags: ["!autodocs"],
} as Meta;

type Story = StoryObj<typeof SingleSelect>;

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
        name: "With selection",
        props: {selectedValue: "1"},
    },
    {
        name: "With selection + Disabled",
        props: {selectedValue: "1", disabled: true},
    },
    {
        name: "With selection + Readonly",
        props: {selectedValue: "1", readOnly: true},
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
        pseudo: {
            ...defaultPseudoStates,
            // Using the focus selector instead so that the focus outline is shown
            // when the select opener is clicked
            focus: [...defaultPseudoStates.focusVisible],
        },
    },
};

const children = [
    <OptionItem label="item 1" value="1" key="1" />,
    <OptionItem label="item 2" value="2" key="2" />,
    <OptionItem label="item 3" value="3" key="3" />,
];

const ControlledSingleSelect = (props: PropsFor<typeof SingleSelect>) => {
    const [value, setValue] = React.useState(props.selectedValue);

    return (
        <SingleSelect {...props} selectedValue={value} onChange={setValue}>
            {props.children}
        </SingleSelect>
    );
};
export const Scenarios: Story = {
    render: () => {
        const scenarios = [
            {
                name: "Long option item label",
                props: {
                    placeholder: "Placeholder",
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
                    placeholder: "Placeholder",
                    children: [
                        <OptionItem
                            label={longTextWithNoWordBreak}
                            value="1"
                            key="1"
                        />,
                    ],
                    opened: true,
                    style: {paddingBlockEnd: sizing.size_560},
                },
            },
            {
                name: "Long placeholder",
                props: {
                    placeholder: longText,
                    children,
                },
            },
            {
                name: "Long placeholder with no word break",
                props: {
                    placeholder: longTextWithNoWordBreak,
                    children,
                },
            },
            {
                name: "Long selected option label",
                props: {
                    placeholder: "Placeholder",
                    children: [
                        <OptionItem label={longText} value="1" key="1" />,
                        <OptionItem label={longText} value="2" key="2" />,
                        <OptionItem label={longText} value="3" key="3" />,
                    ],
                    selectedValue: "1",
                },
            },
            {
                name: "Long selected option label with no word break",
                props: {
                    placeholder: "Placeholder",
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
                    selectedValue: "1",
                },
            },
        ];
        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props, name) => (
                    <ControlledSingleSelect
                        {...props}
                        key={name}
                        aria-label={name}
                    />
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

import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {Combobox, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {PropsFor} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {themeModes} from "../../.storybook/modes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {ScenariosLayout} from "../components/scenarios-layout";
import {
    longText,
    longTextWithNoWordBreak,
} from "../components/text-for-testing";

/**
 * The following stories are used to generate the pseudo states for the
 * combobox component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Dropdown / Testing / Snapshots / Combobox",
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
        selectionType: "single",
        value: "",
        onChange: () => {},
    },
    tags: ["!autodocs", "!manifest"],
} as Meta<typeof Combobox>;

type Story = StoryObj<typeof Combobox>;

const rows = [
    {
        name: "Default",
        props: {"aria-label": "Example", style: {minInlineSize: 200}},
    },
    {
        name: "Placeholder",
        props: {"aria-label": "Example", placeholder: "Placeholder", value: ""},
    },
    {
        name: "With Value",
        props: {"aria-label": "Example", value: "1"},
    },
    {
        name: "Multiple (2 selected)",
        props: {
            "aria-label": "Example",
            selectionType: "multiple" as const,
            value: ["1", "2"],
        },
    },
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

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => {
        return (
            <StateSheet rows={rows} columns={columns}>
                {({props, name}) => (
                    <Combobox {...args} {...props} key={name} />
                )}
            </StateSheet>
        );
    },
    parameters: {
        pseudo: {
            ...defaultPseudoStates,
            // Using the focus selector instead so that the focus outline is
            // shown when the combobox is clicked
            focus: [...defaultPseudoStates.focusVisible],
        },
    },
};

const ControlledCombobox = (props: PropsFor<typeof Combobox>) => {
    const [value, setValue] = React.useState(props.value);

    return <Combobox {...props} value={value} onChange={setValue} />;
};

// A larger set of options used for the multiple-selection scenarios.
const manyItems = Array.from({length: 10}, (_, index) => {
    const value = `${index + 1}`;
    return <OptionItem label={`item ${value}`} value={value} key={value} />;
});

export const Scenarios: Story = {
    render: () => {
        const scenarios = [
            {
                name: "Long option item label",
                props: {
                    selectionType: "single" as const,
                    value: "",
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
                    selectionType: "single" as const,
                    value: "",
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
                    selectionType: "single",
                    value: "",
                    placeholder: longText,
                    children: [],
                },
            },
            {
                name: "Long placeholder with no word break",
                props: {
                    selectionType: "single" as const,
                    value: "",
                    placeholder: longTextWithNoWordBreak,
                    children: [],
                },
            },
            {
                name: "Long selected option label",
                props: {
                    selectionType: "single" as const,
                    placeholder: "Placeholder",
                    children: [
                        <OptionItem label={longText} value="1" key="1" />,
                        <OptionItem label={longText} value="2" key="2" />,
                        <OptionItem label={longText} value="3" key="3" />,
                    ],
                    value: "1",
                },
            },
            {
                name: "Long selected option label with no word break",
                props: {
                    selectionType: "single" as const,
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
                    value: "1",
                },
            },
            {
                name: "0 selected",
                props: {
                    selectionType: "multiple" as const,
                    placeholder: "Placeholder",
                    children: manyItems,
                    value: [],
                },
            },
            {
                name: "1 selected",
                props: {
                    selectionType: "multiple" as const,
                    placeholder: "Placeholder",
                    children: manyItems,
                    value: ["1"],
                },
            },
            {
                name: "2 selected",
                props: {
                    selectionType: "multiple" as const,
                    placeholder: "Placeholder",
                    children: manyItems,
                    value: ["1", "2"],
                },
            },
            {
                name: "4 selected",
                props: {
                    selectionType: "multiple" as const,
                    placeholder: "Placeholder",
                    children: manyItems,
                    value: ["1", "2", "3", "4"],
                },
            },
            {
                name: "10 selected",
                props: {
                    selectionType: "multiple" as const,
                    placeholder: "Placeholder",
                    children: manyItems,
                    value: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                },
            },
        ];
        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props, name) => (
                    <ControlledCombobox
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

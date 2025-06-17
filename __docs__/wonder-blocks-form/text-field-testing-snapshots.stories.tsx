import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {TextField} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {allModes} from "../../.storybook/modes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {ScenariosLayout} from "../components/scenarios-layout";
import {
    longText,
    longTextWithNoWordBreak,
} from "../components/text-for-testing";

/**
 * The following stories are used to generate the pseudo states for the
 * TextField component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Form / Testing / Snapshots / TextField",
    parameters: {
        chromatic: {
            modes: {
                default: allModes.themeDefault,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
    tags: ["!autodocs"],
} as Meta;

type Story = StoryObj<typeof TextField>;

const rows = [
    {name: "Default", props: {}},
    {name: "With Value", props: {value: "Value"}},
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
                {({props, className, name}) => (
                    <LabeledField
                        label="Text Field"
                        field={
                            <TextField
                                {...args}
                                {...props}
                                className={className}
                                key={name}
                            />
                        }
                    />
                )}
            </StateSheet>
        );
    },
    parameters: {
        pseudo: defaultPseudoStates,
    },
};

/**
 * The following story shows how the component handles specific scenarios.
 */
export const Scenarios: Story = {
    render() {
        const scenarios = [
            {
                name: "Default",
                props: {},
            },
            {
                name: "With Value",
                props: {value: "Text"},
            },
            {
                name: "With Value (long)",
                props: {value: longText},
            },
            {
                name: "With Value (long, no word breaks)",
                props: {value: longTextWithNoWordBreak},
            },
            {
                name: "With Placeholder",
                props: {placeholder: "Placeholder text"},
            },
            {
                name: "With Placeholder (long)",
                props: {placeholder: longText},
            },
            {
                name: "With Placeholder (long, no word breaks)",
                props: {placeholder: longTextWithNoWordBreak},
            },
        ];
        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props, name) => (
                    <LabeledField
                        label="Text Field"
                        field={<TextField {...props} aria-label={name} />}
                    />
                )}
            </ScenariosLayout>
        );
    },
};

import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {TextField} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {allThemeModes} from "../../.storybook/modes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {ScenariosLayout} from "../components/scenarios-layout";
import {
    longText,
    longTextWithNoWordBreak,
} from "../components/text-for-testing";
import {AllVariants} from "../components/all-variants";

/**
 * The following stories are used to generate the pseudo states for the
 * TextField component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Form / Testing / Snapshots / TextField",
    parameters: {
        chromatic: {
            modes: allThemeModes,
        },
    },
    tags: ["!autodocs", "!manifest"],
} as Meta;

type Story = StoryObj<typeof TextField>;

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
        name: "Readonly",
        props: {readOnly: true},
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
 * What the component looks like at rest with different combinations of props.
 */
export const Combinations: Story = {
    render: (args) => {
        return (
            <AllVariants
                rows={[
                    {name: "Default", props: {}},
                    {name: "With Value", props: {value: "Value"}},
                    {
                        name: "With Placeholder",
                        props: {placeholder: "Placeholder"},
                    },
                ]}
                columns={columns}
            >
                {({props, className, name}) => (
                    <LabeledField
                        label="Text Area"
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
            </AllVariants>
        );
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
            {
                name: "Type: number",
                props: {type: "number", value: "1234.5"},
            },
            {
                name: "Type: whole-number",
                props: {type: "whole-number", value: "1234"},
            },
            {
                name: "Type: password",
                props: {type: "password", value: "password"},
            },
            {
                name: "Type: email",
                props: {type: "email", value: "email@example.com"},
            },
            {
                name: "Type: tel",
                props: {type: "tel", value: "123-456-7890"},
            },
            {
                name: "Custom style",
                props: {style: styles.customField, value: "Custom style"},
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

const styles = StyleSheet.create({
    customField: {
        backgroundColor: semanticColor.status.notice.background,
        color: semanticColor.status.notice.foreground,
        border: "none",
        maxInlineSize: 250,
        "::placeholder": {
            color: semanticColor.core.foreground.neutral.default,
        },
    },
});

import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {StyleSheet} from "aphrodite";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {themeModes} from "../../.storybook/modes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {ScenariosLayout} from "../components/scenarios-layout";
import {
    longText,
    longTextWithNoWordBreak,
    reallyLongText,
    repeatText,
} from "../components/text-for-testing";
import {AllVariants} from "../components/all-variants";

/**
 * The following stories are used to generate the pseudo states for the
 * TextArea component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Form / Testing / Snapshots / TextArea",
    parameters: {
        chromatic: {
            modes: themeModes,
        },
    },
    tags: ["!autodocs"],
} as Meta;

type Story = StoryObj<typeof TextArea>;

const rows = [{name: "Default", props: {}}];

const styles = StyleSheet.create({
    fixedWidth: {
        width: "500px",
    },
});

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
                        label="Text Area"
                        field={
                            <TextArea
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
                            <TextArea
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
                name: "With rows = 10",
                props: {rows: 10},
            },
            {
                name: "With rows = 10 and value",
                props: {rows: 10, value: repeatText(longText, 3)},
            },
            {
                name: "Empty and auto resize is false",
                props: {autoResize: false, style: styles.fixedWidth},
            },
            {
                name: "With value and auto resize is false",
                props: {
                    autoResize: false,
                    style: styles.fixedWidth,
                    value: repeatText(longText, 3),
                },
            },
            {
                name: "Auto resize is true with default maxRows of 6",
                props: {
                    autoResize: true,
                    value: repeatText(reallyLongText, 3),
                    style: styles.fixedWidth,
                },
            },
            {
                name: "Auto resize is true with maxRows = 10",
                props: {
                    autoResize: true,
                    value: repeatText(reallyLongText, 3),
                    maxRows: 10,
                    style: styles.fixedWidth,
                },
            },
            {
                name: "Auto resize is true with rows = 30",
                props: {
                    autoResize: true,
                    value: repeatText(reallyLongText, 3),
                    rows: 30,
                    style: styles.fixedWidth,
                },
            },
            {
                name: "Auto-resize is true with rows = 4 and maxRows = 2 (rows > maxRows)",
                props: {
                    autoResize: true,
                    value: repeatText(reallyLongText, 3),
                    rows: 4,
                    maxRows: 2,
                    style: styles.fixedWidth,
                },
            },
        ];
        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props, name) => (
                    <LabeledField
                        label="Text Area"
                        field={<TextArea {...props} aria-label={name} />}
                    />
                )}
            </ScenariosLayout>
        );
    },
};

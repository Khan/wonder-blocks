import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {CompactCell} from "@khanacademy/wonder-blocks-cell";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {
    longText,
    longTextWithNoWordBreak,
} from "../components/text-for-testing";
import {ScenariosLayout} from "../components/scenarios-layout";
import {themeModes} from "../../.storybook/modes";

const defaultProps = {
    title: "Title for article item",
    leftAccessory: <PhosphorIcon icon={IconMappings.calendarBold} />,
    rightAccessory: <PhosphorIcon icon={IconMappings.caretRightBold} />,
};

/**
 * The following stories are used to generate the pseudo states for the
 * CompactCell component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Cell / Testing / Snapshots / CompactCell",
    component: CompactCell,
    args: {
        title: defaultProps.title,
    },
    parameters: {
        backgrounds: {
            default: "subtle",
        },
        chromatic: {
            modes: themeModes,
        },
    },
    tags: ["!autodocs"],
} as Meta<typeof CompactCell>;

type Story = StoryObj<typeof CompactCell>;

const rows = [{name: "Clickable", props: {onClick: () => {}}}];

const columns = [
    {
        name: "Default",
        props: defaultProps,
    },
    {
        name: "Disabled",
        props: {...defaultProps, disabled: true},
    },
    {
        name: "Selected using active: true",
        props: {...defaultProps, active: true},
    },
];

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => {
        return (
            <StateSheet rows={rows} columns={columns} title="Status / Variant">
                {({props, className}) => (
                    <CompactCell {...args} {...props} className={className} />
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
                props: defaultProps,
            },
            {
                name: "No Icons",
                props: {
                    ...defaultProps,
                    leftAccessory: undefined,
                    rightAccessory: undefined,
                },
            },
            {
                name: "Left Icon Only",
                props: {
                    ...defaultProps,
                    rightAccessory: undefined,
                },
            },
            {
                name: "Right Icon Only",
                props: {
                    ...defaultProps,
                    leftAccessory: undefined,
                },
            },
            {
                name: "Long Text",
                props: {
                    ...defaultProps,
                    title: longText,
                },
            },
            {
                name: "Long Text No Word Break",
                props: {
                    ...defaultProps,
                    title: longTextWithNoWordBreak,
                },
            },
            {
                name: "Long Text (no icons)",
                props: {
                    ...defaultProps,
                    title: longText,
                    leftAccessory: undefined,
                    rightAccessory: undefined,
                },
            },
            {
                name: "Long Text No Word Break (no icons)",
                props: {
                    ...defaultProps,
                    title: longTextWithNoWordBreak,
                    leftAccessory: undefined,
                    rightAccessory: undefined,
                },
            },
        ];

        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props) => <CompactCell {...props} />}
            </ScenariosLayout>
        );
    },
};

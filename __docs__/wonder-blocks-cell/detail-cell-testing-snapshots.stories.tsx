import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {AccessoryMappings} from "./compact-cell.argtypes";
import {ScenariosLayout} from "../components/scenarios-layout";
import {
    longText,
    longTextWithNoWordBreak,
} from "../components/text-for-testing";
import {themeModes} from "../../.storybook/modes";

const defaultProps = {
    title: "Title for article item",
    subtitle1: "Subtitle 1 for article item",
    subtitle2: "Subtitle 2 for article item",
    leftAccessory: AccessoryMappings.withImage,
    rightAccessory: <PhosphorIcon icon={IconMappings.caretRightBold} />,
};

/**
 * The following stories are used to generate the pseudo states for the
 * DetailCell component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Cell / Testing / Snapshots / DetailCell",
    component: DetailCell,
    args: {
        title: defaultProps.title,
        subtitle1: defaultProps.subtitle1,
        subtitle2: defaultProps.subtitle2,
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
} as Meta<typeof DetailCell>;

type Story = StoryObj<typeof DetailCell>;

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
                    <DetailCell {...args} {...props} className={className} />
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
                name: "No Subtitles",
                props: {
                    ...defaultProps,
                    subtitle1: undefined,
                    subtitle2: undefined,
                },
            },
            {
                name: "Subtitle 1 only",
                props: {
                    ...defaultProps,
                    subtitle2: undefined,
                },
            },
            {
                name: "Subtitle 2 only",
                props: {
                    ...defaultProps,
                    subtitle1: undefined,
                },
            },
            {
                name: "Title only",
                props: {
                    title: defaultProps.title,
                },
            },
            {
                name: "Long Text",
                props: {
                    ...defaultProps,
                    title: longText,
                    subtitle1: longText,
                    subtitle2: longText,
                },
            },
            {
                name: "Long Text No Word Break",
                props: {
                    ...defaultProps,
                    title: longTextWithNoWordBreak,
                    subtitle1: longTextWithNoWordBreak,
                    subtitle2: longTextWithNoWordBreak,
                },
            },
            {
                name: "Long Text (no icons)",
                props: {
                    ...defaultProps,
                    title: longText,
                    subtitle1: longText,
                    subtitle2: longText,
                    leftAccessory: undefined,
                    rightAccessory: undefined,
                },
            },
            {
                name: "Long Text No Word Break (no icons)",
                props: {
                    ...defaultProps,
                    title: longTextWithNoWordBreak,
                    subtitle1: longTextWithNoWordBreak,
                    subtitle2: longTextWithNoWordBreak,
                    leftAccessory: undefined,
                    rightAccessory: undefined,
                },
            },
        ];

        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props) => <DetailCell {...props} />}
            </ScenariosLayout>
        );
    },
};

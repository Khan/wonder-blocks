import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {CompactCell} from "@khanacademy/wonder-blocks-cell";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";

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
            default: "offWhite",
        },
    },
    tags: ["!autodocs"],
} as Meta<typeof CompactCell>;

type Story = StoryObj<typeof CompactCell>;

const rows = [
    {name: "Clickable", props: {onClick: () => {}}},
    {name: "Link", props: {href: "/"}},
];

const columns = [
    {
        name: "Left accessory",
        props: {
            leftAccessory: defaultProps.leftAccessory,
        },
    },
    {
        name: "Right accessory",
        props: {
            rightAccessory: defaultProps.rightAccessory,
        },
    },
    {
        name: "Both",
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

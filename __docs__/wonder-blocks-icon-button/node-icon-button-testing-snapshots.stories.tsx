import * as React from "react";
import {action} from "storybook/actions";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {NodeIconButton} from "@khanacademy/wonder-blocks-icon-button";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {themeModes} from "../../.storybook/modes";

import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import assignmentPracticeIcon from "./images/assignment-practice.svg";
import {Icon} from "@khanacademy/wonder-blocks-icon";

/**
 * The following stories are used to generate the pseudo states for the
 * NodeIconButton component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / IconButton / Testing / Snapshots / NodeIconButton",
    tags: ["!autodocs"],
    args: {
        "aria-label": "Send",
        icon: IconMappings.iceCream,
        onClick: action("clicked"),
        actionType: "progressive",
        size: "medium",
    },
    parameters: {
        chromatic: {
            modes: themeModes,
        },
    },
} as Meta;

type Story = StoryObj<typeof NodeIconButton>;

const sizes = [
    {name: "Small", props: {size: "small"}},
    {name: "Medium", props: {size: "medium"}},
];

const actionTypes = [
    {name: "Not Started", props: {actionType: "notStarted"}},
    {name: "Attempted", props: {actionType: "attempted"}},
    {name: "Complete", props: {actionType: "complete"}},
    {name: "Disabled", props: {disabled: true}},
    {
        name: "With custom icon",
        props: {
            icon: (
                <Icon>
                    <img alt="" src={assignmentPracticeIcon} />
                </Icon>
            ),
        },
    },
];

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => {
        return (
            <StateSheet
                rows={sizes}
                columns={actionTypes}
                title="Size / Action Type"
            >
                {({props, className, name}) => (
                    <NodeIconButton
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

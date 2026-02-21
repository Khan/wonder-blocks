import * as React from "react";
import {action} from "storybook/actions";
import type {Meta, StoryObj} from "@storybook/react-vite";

import paperPlaneIcon from "@phosphor-icons/core/fill/paper-plane-tilt-fill.svg";
import {ConversationIconButton} from "@khanacademy/wonder-blocks-icon-button";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {themeModes} from "../../.storybook/modes";
import {ScenariosLayout} from "../components/scenarios-layout";
import {Icon} from "@khanacademy/wonder-blocks-icon";

/**
 * The following stories are used to generate the pseudo states for the
 * ConversationIconButton component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / IconButton / Testing / Snapshots / ConversationIconButton",
    tags: ["!autodocs", "!manifest"],
    args: {
        "aria-label": "Send",
        icon: paperPlaneIcon,
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

type StoryComponentType = StoryObj<typeof ConversationIconButton>;

const kinds = [
    {name: "Primary", props: {kind: "primary"}},
    {name: "Secondary", props: {kind: "secondary"}},
    {name: "Tertiary", props: {kind: "tertiary"}},
];

const actionTypes = [
    {name: "Progressive", props: {actionType: "progressive"}},
    {name: "Neutral", props: {actionType: "neutral"}},
    {name: "Disabled", props: {disabled: true}},
];

export const StateSheetStory: StoryComponentType = {
    name: "StateSheet",
    render: (args) => {
        return (
            <StateSheet
                rows={kinds}
                columns={actionTypes}
                title="Kind / Action Type"
            >
                {({props, className, name}) => (
                    <ConversationIconButton
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

export const Scenarios: StoryComponentType = {
    render: () => {
        const scenarios = [
            {
                name: "With custom icon",
                props: {
                    icon: (
                        <Icon>
                            <img src="logo.svg" alt="" />
                        </Icon>
                    ),
                    "aria-label": "Wonder Blocks",
                    kind: "secondary",
                },
            },
        ];

        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props) => <ConversationIconButton {...props} />}
            </ScenariosLayout>
        );
    },
};

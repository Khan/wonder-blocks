import * as React from "react";
import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";

import paperPlaneIcon from "@phosphor-icons/core/fill/paper-plane-tilt-fill.svg";
import {ActivityIconButton} from "@khanacademy/wonder-blocks-icon-button";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {themeModes} from "../../.storybook/modes";
import {ScenariosLayout} from "../components/scenarios-layout";
import {longTextWithNoWordBreak} from "../components/text-for-testing";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {Icon} from "@khanacademy/wonder-blocks-icon";
import khanmigoIcon from "./images/mini-khanmigo.svg";

/**
 * The following stories are used to generate the pseudo states for the
 * ActivityIconButton component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / IconButton / Testing / Snapshots / ActivityIconButton",
    tags: ["!autodocs"],
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

type Story = StoryObj<typeof ActivityIconButton>;

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

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => {
        return (
            <StateSheet
                rows={kinds}
                columns={actionTypes}
                title="Kind / Action Type"
            >
                {({props, className, name}) => (
                    <ActivityIconButton
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

const actionTypesWithLabel = [
    {
        name: "Progressive",
        props: {actionType: "progressive", label: "Send"},
    },
    {name: "Neutral", props: {actionType: "neutral", label: "Send"}},
    {name: "Disabled", props: {disabled: true, label: "Send"}},
];

export const StateSheetVisibleLabelStory: Story = {
    name: "StateSheet (Visible Label)",
    render: (args) => {
        return (
            <StateSheet
                rows={kinds}
                columns={actionTypesWithLabel}
                title="Kind / Action Type"
            >
                {({props, className, name}) => (
                    <ActivityIconButton
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

/**
 * The following story shows how the component handles specific scenarios.
 */
export const Scenarios: Story = {
    render() {
        const scenarios = [
            {
                name: "Long label with multiple words",
                props: {
                    children: (
                        <ActivityIconButton
                            label="Send with a very long text"
                            icon={paperPlaneIcon}
                        />
                    ),
                },
            },
            {
                name: "Long label with single word in more than two lines",
                props: {
                    children: (
                        <ActivityIconButton
                            label={longTextWithNoWordBreak}
                            icon={paperPlaneIcon}
                        />
                    ),
                },
            },
            {
                name: "Long label with single word in two lines",
                props: {
                    children: (
                        <ActivityIconButton
                            label="Conversation"
                            icon={paperPlaneIcon}
                        />
                    ),
                },
            },
            {
                name: "Horizontally stacked buttons",
                props: {
                    children: (
                        <View
                            style={{
                                flexDirection: "row",
                                background:
                                    semanticColor.core.background.base.subtle,
                                gap: sizing.size_160,
                                padding: sizing.size_160,
                            }}
                        >
                            <ActivityIconButton
                                label="Label"
                                icon={paperPlaneIcon}
                            />
                            <ActivityIconButton
                                icon={paperPlaneIcon}
                                aria-label="Send"
                            />
                        </View>
                    ),
                },
            },
            {
                name: "With custom icon",
                props: {
                    children: (
                        <ActivityIconButton
                            icon={
                                <Icon size="medium">
                                    <img alt="" src={khanmigoIcon} />
                                </Icon>
                            }
                            aria-label="Khanmigo"
                            kind="secondary"
                        />
                    ),
                },
            },
        ];
        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props) => props.children}
            </ScenariosLayout>
        );
    },
};

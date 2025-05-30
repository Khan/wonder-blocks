import * as React from "react";

import type {Meta, StoryObj} from "@storybook/react";

import microphone from "@phosphor-icons/core/bold/microphone-bold.svg";

import {action} from "@storybook/addon-actions";
import {View} from "@khanacademy/wonder-blocks-core";
import {ConversationIconButton} from "@khanacademy/wonder-blocks-icon-button";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon-button/package.json";
import IconButtonArgtypes from "./icon-button.argtypes";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

export default {
    title: "Packages / IconButton / ConversationIconButton",
    component: ConversationIconButton,
    decorators: [(Story): React.ReactElement => <View>{Story()}</View>],
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // Disabling all snapshots because we are testing all the variants
            // in `activity-icon-button-testing-snapshots.stories.tsx`.
            disableSnapshot: true,
        },
        docs: {
            source: {
                type: "code",
            },
        },
    },
    argTypes: IconButtonArgtypes,
    args: {
        "aria-label": "Search",
    },
} as Meta<typeof ConversationIconButton>;

type StoryComponentType = StoryObj<typeof ConversationIconButton>;

/**
 * Minimal activity icon button. The only props specified in this example are
 * `icon` and `onClick`.
 */
export const Default: StoryComponentType = {
    args: {
        icon: microphone,
        actionType: "progressive",
        disabled: false,
        kind: "primary",
        onClick: (e: React.SyntheticEvent) => {
            action("clicked")(e);
        },
    },
};

/**
 * In this example, we have `primary`, `secondary`, `tertiary` and disabled
 * `ConversationIconButton`s from left to right.
 */
export const Kinds: StoryComponentType = {
    render: () => {
        return (
            <View style={{gap: sizing.size_160, flexDirection: "row"}}>
                <ConversationIconButton
                    icon={microphone}
                    aria-label="search"
                    onClick={(e) => action("clicked")(e)}
                />
                <ConversationIconButton
                    icon={microphone}
                    aria-label="search"
                    kind="secondary"
                    onClick={(e) => action("clicked")(e)}
                />
                <ConversationIconButton
                    icon={microphone}
                    aria-label="search"
                    kind="tertiary"
                    onClick={(e) => action("clicked")(e)}
                />
                <ConversationIconButton
                    disabled={true}
                    icon={microphone}
                    aria-label="search"
                    onClick={(e) => action("clicked")(e)}
                />
            </View>
        );
    },
};

const kinds = ["primary", "secondary", "tertiary"] as const;
const actionTypes = ["progressive", "neutral"] as const;

/**
 * ConversationIconButton has an `actionType` prop that is either `progressive`
 * (the default, as shown above) or `neutral`:
 */
export const ActionType: StoryComponentType = {
    name: "ActionType",
    render: (args) => (
        <View style={{gap: sizing.size_160}}>
            {actionTypes.map((actionType, index) => (
                <View
                    key={index}
                    style={{gap: sizing.size_160, flexDirection: "row"}}
                >
                    {kinds.map((kind, index) => (
                        <ConversationIconButton
                            icon={IconMappings.arrowUpBold}
                            aria-label="navigate up progressive"
                            onClick={() => {}}
                            actionType={actionType}
                            kind={kind}
                            key={`${kind}-${actionType}-${index}`}
                        />
                    ))}
                    <ConversationIconButton
                        disabled={true}
                        icon={IconMappings.arrowUpBold}
                        aria-label="navigate up neutral"
                        onClick={(e) => action("clicked")(e)}
                        actionType={actionType}
                        key={`disabled-${actionType}-${index}`}
                    />
                </View>
            ))}
        </View>
    ),
};

/**
 * Conversation icon buttons need to have accessible names. The `aria-label`
 * prop must be used to explain the function of the button. Remember to keep the
 * description concise but understandable.
 */
export const WithAriaLabel: StoryComponentType = {
    render: () => {
        return (
            <View style={{gap: sizing.size_080, flexDirection: "row"}}>
                <ConversationIconButton
                    icon={microphone}
                    kind="secondary"
                    actionType="neutral"
                    onClick={(e) => action("clicked")(e)}
                    aria-label="Turn on microphone"
                />
                <ConversationIconButton
                    icon={IconMappings.arrowUpBold}
                    onClick={(e) => action("clicked")(e)}
                    aria-label="Send message"
                />
            </View>
        );
    },
};

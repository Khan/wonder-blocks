import * as React from "react";

import type {Meta, StoryObj} from "@storybook/react";

import microphone from "@phosphor-icons/core/bold/microphone-bold.svg";
import plus from "@phosphor-icons/core/bold/plus-bold.svg";
import microphoneFill from "@phosphor-icons/core/fill/microphone-fill.svg";
import plusFill from "@phosphor-icons/core/fill/plus-fill.svg";

import {action} from "@storybook/addon-actions";
import {View} from "@khanacademy/wonder-blocks-core";
import {ConversationIconButton} from "@khanacademy/wonder-blocks-icon-button";

import {ActionItem, ActionMenu} from "@khanacademy/wonder-blocks-dropdown";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import packageConfig from "../../packages/wonder-blocks-icon-button/package.json";
import ComponentInfo from "../components/component-info";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import iconButtonSharedArgtypes from "./icon-button-shared.argtypes";

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
    argTypes: iconButtonSharedArgtypes,
    args: {
        "aria-label": "Search",
    },
} as Meta<typeof ConversationIconButton>;

type Story = StoryObj<typeof ConversationIconButton>;

/**
 * Minimal conversation icon button. The only props specified in this example
 * are `icon` and `onClick`.
 *
 * Note that the `aria-label` prop is required for accessibility, as it
 * provides a text alternative for the icon button. This is important for
 * screen readers and other assistive technologies to understand the purpose
 * of the button.
 */
export const Default: Story = {
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
 * In this example, we have `primary` (default), `secondary`, `tertiary` and
 * disabled `ConversationIconButton`'s from left to right.
 */
export const Kinds: Story = {
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
 * (default) or `neutral`:
 */
export const ActionType: Story = {
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
                            aria-label="navigate"
                            onClick={() => {}}
                            actionType={actionType}
                            kind={kind}
                            key={`${kind}-${actionType}-${index}`}
                        />
                    ))}
                    <ConversationIconButton
                        disabled={true}
                        icon={IconMappings.arrowUpBold}
                        aria-label="search"
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
 * ConversationIconButton can be configured to be toggleable. This is useful for
 * features like toggling a microphone on and off.
 *
 * Note that the `aria-pressed` attribute is used to indicate the toggle state
 * of the button. This is important for accessibility, as it allows screen
 * readers to announce the current state of the button to users.
 */
export const Toggleable: Story = {
    render: function Render() {
        const [on, setOn] = React.useState(false);
        return (
            <View style={{gap: sizing.size_080, placeItems: "center"}}>
                <ConversationIconButton
                    icon={on ? microphoneFill : microphone}
                    onClick={(e) => {
                        setOn(!on);
                        action("clicked")(e);
                    }}
                    aria-label="Toggle microphone"
                    aria-pressed={on}
                />
                <BodyText>The microphone is {on ? "ON" : "OFF"}</BodyText>
            </View>
        );
    },
};

/**
 * This example shows how to use the `ConversationIconButton` in an `ActionMenu`.
 * The `ConversationIconButton` is used as the opener for the menu, which allows
 * the button to be used in its "expanded" state.
 */
export const Expanded: Story = {
    render: function Render() {
        return (
            <ActionMenu
                aria-label="Conversation options"
                menuText=""
                opener={({opened}) => (
                    <ConversationIconButton
                        kind="secondary"
                        icon={opened ? plusFill : plus}
                        aria-label="Open menu"
                    />
                )}
            >
                <ActionItem
                    label="Add to calendar"
                    leftAccessory={
                        <PhosphorIcon
                            size="medium"
                            icon={IconMappings.calendar}
                        />
                    }
                />
                <ActionItem
                    label="Add to contacts"
                    leftAccessory={
                        <PhosphorIcon size="medium" icon={IconMappings.gear} />
                    }
                />
            </ActionMenu>
        );
    },
};

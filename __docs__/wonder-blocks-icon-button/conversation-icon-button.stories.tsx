import * as React from "react";

import type {Meta, StoryObj} from "@storybook/react";

import microphone from "@phosphor-icons/core/bold/microphone-bold.svg";
import microphoneFill from "@phosphor-icons/core/fill/microphone-fill.svg";
import plus from "@phosphor-icons/core/bold/plus-bold.svg";
import plusFill from "@phosphor-icons/core/fill/plus-fill.svg";

import {action} from "@storybook/addon-actions";
import {View} from "@khanacademy/wonder-blocks-core";
import {ConversationIconButton} from "@khanacademy/wonder-blocks-icon-button";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon-button/package.json";
import IconButtonArgtypes from "./icon-button.argtypes";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {ActionItem, ActionMenu} from "@khanacademy/wonder-blocks-dropdown";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

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

type Story = StoryObj<typeof ConversationIconButton>;

/**
 * Minimal activity icon button. The only props specified in this example are
 * `icon` and `onClick`.
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
 * In this example, we have `primary`, `secondary`, `tertiary` and disabled
 * `ConversationIconButton`s from left to right.
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

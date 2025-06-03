import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {ActionItem} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {themeModes} from "../../.storybook/modes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";

const rows = [{name: "Unselected", props: {}}];

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
        name: "Custom label",
        props: {
            label: "Action Item",
            onClick: () => {},
            leftAccessory: (
                <PhosphorIcon icon={IconMappings.calendar} size="medium" />
            ),
            rightAccessory: (
                <PhosphorIcon icon={IconMappings.caretRight} size="medium" />
            ),
            subtitle1: "Subtitle 1",
            subtitle2: "Subtitle 2",
        },
    },
];

type Story = StoryObj<typeof ActionItem>;

/**
 * The following stories are used to generate the pseudo states for the
 * ActionItem component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Dropdown / Testing / Snapshots / ActionItem",
    component: ActionItem,
    args: {
        label: "Action Item",
        onClick: () => {},
        disabled: false,
        testId: "",
        lang: "",
        role: "menuitem",
        style: {},
        horizontalRule: "none",
        leftAccessory: null,
        rightAccessory: null,
    },
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={{width: 800}}>
                <Story />
            </View>
        ),
    ],
    parameters: {
        backgrounds: {
            default: "baseSubtle",
        },
        chromatic: {
            modes: themeModes,
        },
    },
    tags: ["!autodocs"],
} satisfies Meta<typeof ActionItem>;

export default meta;

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => {
        return (
            <StateSheet rows={rows} columns={columns}>
                {({props, className, name}) => (
                    <ActionItem
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

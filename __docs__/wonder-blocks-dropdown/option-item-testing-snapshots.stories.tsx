import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {allModes} from "../../.storybook/modes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {AccessoryMappings} from "./option-item.argtypes";

const rows = [
    {name: "Unselected", props: {checked: false}},
    {name: "Selected (single)", props: {selected: true, variant: "check"}},
    {name: "Selected (multi)", props: {selected: true, variant: "checkbox"}},
];

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
            label: "Option Item",
            onClick: () => {},
            subtitle1: AccessoryMappings.pill,
            subtitle2: "Subtitle 2",
            leftAccessory: (
                <PhosphorIcon icon={IconMappings.calendar} size="medium" />
            ),
            rightAccessory: (
                <PhosphorIcon icon={IconMappings.caretRight} size="medium" />
            ),
        },
    },
];

type Story = StoryObj<typeof OptionItem>;

/**
 * The following stories are used to generate the pseudo states for the
 * OptionItem component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Dropdown / Testing / Snapshots / OptionItem",
    component: OptionItem,
    args: {
        label: "Option Item",
        onClick: () => {},
        disabled: false,
        testId: "",
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
            default: "offWhite",
        },
        chromatic: {
            modes: {
                default: allModes.themeDefault,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
    tags: ["!autodocs"],
} satisfies Meta<typeof OptionItem>;

export default meta;

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => {
        return (
            <StateSheet rows={rows} columns={columns}>
                {({props, className, name}) => (
                    <OptionItem
                        {...args}
                        {...props}
                        className={className}
                        key={name}
                        aria-label={name}
                    />
                )}
            </StateSheet>
        );
    },
    parameters: {
        pseudo: defaultPseudoStates,
    },
};

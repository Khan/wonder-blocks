import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import magnifyingGlassIcon from "@phosphor-icons/core/bold/magnifying-glass-bold.svg";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Switch from "@khanacademy/wonder-blocks-switch";

import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {allModes} from "../../.storybook/modes";

const rows = [
    {name: "Off", props: {checked: false}},
    {name: "On", props: {checked: true}},
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
        name: "With icon",
        props: {icon: <PhosphorIcon icon={magnifyingGlassIcon} />},
    },
    {
        name: "Disabled (with icon)",
        props: {
            disabled: true,
            icon: <PhosphorIcon icon={magnifyingGlassIcon} />,
        },
    },
];

type Story = StoryObj<typeof Switch>;

/**
 * The following stories are used to generate the pseudo states for the Switch
 * component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Switch / Testing / Snapshots / Switch",
    component: Switch,
    args: {
        onChange: () => {},
        "aria-label": "Switch",
    },
    parameters: {
        chromatic: {
            modes: {
                default: allModes.themeDefault,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
    tags: ["!autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => {
        return (
            <StateSheet rows={rows} columns={columns} title="Status / Variant">
                {({props, className, name}) => (
                    <View
                        key={name}
                        style={{
                            height: sizing.size_400,
                            justifyContent: "center",
                        }}
                    >
                        <Switch {...args} {...props} className={className} />
                    </View>
                )}
            </StateSheet>
        );
    },
    parameters: {
        pseudo: defaultPseudoStates,
    },
};

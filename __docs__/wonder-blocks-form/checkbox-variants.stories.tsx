import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {Caption, LabelLarge} from "@khanacademy/wonder-blocks-typography";

/**
 * The following stories are used to generate the pseudo states for the Checkbox
 * component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Form / Checkbox / Checkbox Variants",
    component: Checkbox,
} as Meta<typeof Checkbox>;

type StoryComponentType = StoryObj<typeof Checkbox>;

const checkedStates = [
    {name: "Unchecked", value: false},
    {name: "Checked", value: true},
    {name: "Indeterminate", value: null},
];

function AllVariants(args: PropsFor<typeof Checkbox>) {
    return (
        <View
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(50px, 100px))",
                gap: spacing.large_24,
            }}
        >
            <LabelLarge>Type / State</LabelLarge>
            <Caption>Default</Caption>
            <Caption>Disabled</Caption>
            <Caption>Error</Caption>

            {checkedStates.map((state) => (
                <>
                    <Caption>{state.name}</Caption>
                    <Checkbox
                        {...args}
                        checked={state.value}
                        error={false}
                        disabled={false}
                        onChange={() => {}}
                    />
                    <Checkbox
                        {...args}
                        checked={state.value}
                        disabled={true}
                        error={false}
                        onChange={() => {}}
                    />
                    <Checkbox
                        {...args}
                        checked={state.value}
                        disabled={false}
                        error={true}
                        onChange={() => {}}
                    />
                </>
            ))}
        </View>
    );
}

export const Default: StoryComponentType = {
    render: AllVariants,
    args: {
        label: "Label",
        description: "Description",
    },
};

export const Hover: StoryComponentType = {
    ...Default,
    parameters: {pseudo: {hover: true}},
};

export const Focus: StoryComponentType = {
    ...Default,
    parameters: {pseudo: {focusVisible: true}},
};

export const HoverFocus: StoryComponentType = {
    name: "Hover + Focus",
    ...Default,
    parameters: {pseudo: {hover: true, focusVisible: true}},
};

export const Active: StoryComponentType = {
    ...Default,
    parameters: {pseudo: {active: true}},
};

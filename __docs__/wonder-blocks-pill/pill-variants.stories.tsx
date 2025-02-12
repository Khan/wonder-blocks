import type {Meta, StoryObj} from "@storybook/react";
import * as React from "react";

import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import Pill from "@khanacademy/wonder-blocks-pill";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {AllVariants} from "../components/all-variants";
import {PillKind} from "../../packages/wonder-blocks-pill/src/components/pill";

const rows = [
    {name: "Static", props: {}},
    {name: "Clickable", props: {onClick: () => {}}},
];

const columns = [
    {
        name: "Small",
        props: {size: "small"},
    },
    {
        name: "Medium",
        props: {size: "medium"},
    },
    {
        name: "Large",
        props: {size: "large"},
    },
];

type Story = StoryObj<typeof Pill>;

const kinds: Array<PillKind> = [
    "neutral",
    "accent",
    "info",
    "success",
    "warning",
    "critical",
    "transparent",
];

/**
 * The following stories are used to generate the pseudo states for the Switch
 * component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Pill / Pill - All Variants",
    component: Pill,
    render: (args) => (
        <AllVariants rows={rows} columns={columns}>
            {(props) => (
                <View style={styles.container}>
                    {kinds.map((kind) => (
                        <Pill {...args} {...props} kind={kind}>
                            {kind}, {props.size}
                        </Pill>
                    ))}
                </View>
            )}
        </AllVariants>
    ),
    args: {
        children: "This is some text!",
    },
    tags: ["!autodocs"],
} satisfies Meta<typeof Pill>;

export default meta;

export const Default: Story = {};

export const Hover: Story = {
    parameters: {pseudo: {hover: true}},
};

export const Focus: Story = {
    parameters: {pseudo: {focusVisible: true}},
};

export const HoverFocus: Story = {
    name: "Hover + Focus",
    parameters: {pseudo: {hover: true, focusVisible: true}},
};

export const Active: Story = {
    parameters: {pseudo: {hover: true, active: true}},
};

const styles = StyleSheet.create({
    container: {
        gap: spacing.medium_16,
    },
});

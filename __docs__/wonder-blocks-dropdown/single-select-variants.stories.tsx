import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";
import {SingleSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";

/**
 * The following stories are used to generate the pseudo states for the
 * single select component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Dropdown / SingleSelect / All Variants",
    render: () => <AllVariants />,
    tags: ["!autodocs"],
} as Meta;

type StoryComponentType = StoryObj<typeof SingleSelect>;

const defaultProps = {
    placeholder: "Placeholder",
    onChange: () => {},
};

const selectItems = [
    <OptionItem label="item 1" value="1" />,
    <OptionItem label="item 2" value="2" />,
    <OptionItem label="item 3" value="3" />,
];

const AllVariants = ({themeName = "Default"}: {themeName?: string}) => (
    <View style={{marginBottom: spacing.large_24}}>
        <HeadingLarge>{themeName} theme</HeadingLarge>
        <View style={styles.grid}>
            <View style={[styles.gridRow]}>
                <LabeledField
                    label="Default"
                    field={
                        <SingleSelect {...defaultProps}>
                            {selectItems}
                        </SingleSelect>
                    }
                />
            </View>
            <View style={[styles.gridRow]}>
                <LabeledField
                    label="Disabled"
                    field={
                        <SingleSelect {...defaultProps} disabled={true}>
                            {selectItems}
                        </SingleSelect>
                    }
                />
            </View>
            <View style={[styles.gridRow]}>
                <LabeledField
                    label="Error"
                    field={
                        <SingleSelect {...defaultProps} error={true}>
                            {selectItems}
                        </SingleSelect>
                    }
                />
            </View>
        </View>
    </View>
);

export const Default: StoryComponentType = {};

export const Hover: StoryComponentType = {
    parameters: {pseudo: {hover: true}},
};

export const Focus: StoryComponentType = {
    parameters: {pseudo: {focusVisible: true}},
};

export const HoverFocus: StoryComponentType = {
    name: "Hover + Focus",
    parameters: {pseudo: {hover: true, focusVisible: true}},
};

export const Active: StoryComponentType = {
    parameters: {pseudo: {active: true}},
};

const styles = StyleSheet.create({
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 250px)",
        gap: spacing.large_24,
    },
    gridRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.medium_16,
        justifyContent: "space-between",
        padding: spacing.medium_16,
    },
});

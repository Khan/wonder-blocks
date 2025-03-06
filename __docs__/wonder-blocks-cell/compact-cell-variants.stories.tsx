import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {CompactCell} from "@khanacademy/wonder-blocks-cell";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";

/**
 * The following stories are used to generate the pseudo states for the
 * CompactCell component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Cell / CompactCell / All Variants",
    parameters: {
        docs: {
            autodocs: false,
        },
        backgrounds: {
            default: "offWhite",
        },
    },
} as Meta;

type StoryComponentType = StoryObj<typeof CompactCell>;

const states = [
    {
        label: "Default",
        props: {},
    },
    {
        label: "Disabled",
        props: {disabled: true},
    },
    {
        label: "Selected using active: true",
        props: {active: true},
    },
];

const defaultProps = {
    title: "Title for article item",
    leftAccessory: (
        <PhosphorIcon icon={IconMappings.playCircle} size="medium" />
    ),
    rightAccessory: <PhosphorIcon icon={IconMappings.caretRight} />,
};

const States = (props: {label: string} & PropsFor<typeof CompactCell>) => {
    return (
        <View>
            <View style={[styles.scenarios]}>
                {states.map((scenario) => {
                    return (
                        <View style={styles.scenario} key={scenario.label}>
                            <LabelSmall>
                                {props.label} ({scenario.label})
                            </LabelSmall>
                            <CompactCell {...props} {...scenario.props} />
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const AllVariants = () => (
    <View style={{gap: spacing.large_24}}>
        <States label="Default" {...defaultProps} />
        <States label="Clickable" {...defaultProps} onClick={() => {}} />
        <States label="Link" {...defaultProps} href="/" />
    </View>
);

export const Default: StoryComponentType = {
    render: AllVariants,
};

export const Hover: StoryComponentType = {
    render: AllVariants,
    parameters: {pseudo: {hover: true}},
};

export const Focus: StoryComponentType = {
    render: AllVariants,
    parameters: {pseudo: {focusVisible: true}},
};

export const HoverFocus: StoryComponentType = {
    name: "Hover + Focus",
    render: AllVariants,
    parameters: {pseudo: {hover: true, focusVisible: true}},
};

export const Active: StoryComponentType = {
    render: AllVariants,
    parameters: {pseudo: {active: true}},
};

const styles = StyleSheet.create({
    statesContainer: {
        padding: spacing.medium_16,
    },
    scenarios: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xxxLarge_64,
        flexWrap: "wrap",
    },
    scenario: {
        gap: spacing.small_12,
        overflow: "hidden",
    },
});

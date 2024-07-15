import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {TextArea} from "@khanacademy/wonder-blocks-form";

/**
 * The following stories are used to generate the pseudo states for the
 * TextArea component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Form / TextArea / All Variants",
    parameters: {
        docs: {
            autodocs: false,
        },
    },
} as Meta;

type StoryComponentType = StoryObj<typeof TextArea>;

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
        label: "Error",
        props: {validate: () => "Error"},
    },
];
const States = (props: {
    light: boolean;
    label: string;
    value?: string;
    placeholder?: string;
}) => {
    return (
        <View
            style={[props.light && styles.darkDefault, styles.statesContainer]}
        >
            <LabelLarge style={props.light && {color: color.white}}>
                {props.label}
            </LabelLarge>
            <View style={[styles.scenarios]}>
                {states.map((scenario) => {
                    return (
                        <View style={styles.scenario} key={scenario.label}>
                            <LabelMedium
                                style={props.light && {color: color.white}}
                            >
                                {scenario.label}
                            </LabelMedium>
                            <TextArea {...props} {...scenario.props} />
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const AllVariants = () => (
    <View>
        {[false, true].map((light) => {
            return (
                <React.Fragment key={`light-${light}`}>
                    <States light={light} label="Default" />
                    <States light={light} label="With Value" value="Text" />
                    <States
                        light={light}
                        label="With Placeholder"
                        placeholder="Placeholder text"
                    />
                </React.Fragment>
            );
        })}
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
    darkDefault: {
        backgroundColor: color.darkBlue,
    },
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
    },
});

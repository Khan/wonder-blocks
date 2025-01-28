import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import SearchField from "@khanacademy/wonder-blocks-search-field";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";

/**
 * The following stories are used to generate the pseudo states for the
 * SearchField component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / SearchField / All Variants",
    parameters: {
        docs: {
            autodocs: false,
        },
    },
} as Meta;

type StoryComponentType = StoryObj<typeof SearchField>;

const longText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
const longTextWithNoWordBreak =
    "Loremipsumdolorsitametconsecteturadipiscingelitseddoeiusmodtemporincididuntutlaboreetdoloremagnaaliqua";

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
        props: {error: true},
    },
];
const States = (props: {
    label: string;
    value?: string;
    placeholder?: string;
}) => {
    return (
        <View style={styles.statesContainer}>
            <LabelLarge>{props.label}</LabelLarge>
            <View style={[styles.scenarios]}>
                {states.map((scenario) => {
                    return (
                        <View style={styles.scenario} key={scenario.label}>
                            <LabeledField
                                label={scenario.label}
                                field={
                                    <SearchField
                                        value=""
                                        onChange={() => {}}
                                        {...props}
                                        {...scenario.props}
                                    />
                                }
                            />
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const AllVariants = () => (
    <View>
        <States label="Default" />
        <States label="With Value" value="Text" />
        <States label="With Value (long)" value={longText} />
        <States
            label="With Value (long, no word breaks)"
            value={longTextWithNoWordBreak}
        />
        <States label="With Placeholder" placeholder="Placeholder text" />
        <States label="With Placeholder (long)" placeholder={longText} />
        <States
            label="With Placeholder (long, no word breaks)"
            placeholder={longTextWithNoWordBreak}
        />
    </View>
);

export const Default: StoryComponentType = {
    render: AllVariants,
};

/**
 * There are currently only hover styles on the clear button.
 */
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

/**
 * There are currently no active styles.
 */
export const Active: StoryComponentType = {
    render: AllVariants,
    parameters: {pseudo: {active: true}},
};

const styles = StyleSheet.create({
    statesContainer: {
        padding: spacing.medium_16,
    },
    scenarios: {
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

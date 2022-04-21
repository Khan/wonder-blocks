// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import type {StoryComponentType} from "@storybook/react";

import Checkbox from "../checkbox.js";

import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";

export default {
    title: "Form / Checkbox",
    component: Checkbox,
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
    },
};

export const CheckboxDefault: StoryComponentType = (args) => (
    <Checkbox {...args} />
);

CheckboxDefault.args = {
    checked: false,
    onChange: () => {},
};

export const CheckboxBasic: StoryComponentType = () => {
    const [checked, setChecked] = React.useState(false);
    return <Checkbox checked={checked} onChange={setChecked} />;
};

CheckboxBasic.parameters = {
    docs: {
        storyDescription:
            "Use state to keep track of whether the checkbox is checked or not",
    },
};

export const CheckboxVariations: StoryComponentType = () => (
    <View style={styles.row}>
        <Checkbox
            error={false}
            checked={false}
            style={styles.marginRight}
            onChange={() => {}}
        />
        <Checkbox
            error={false}
            checked={true}
            style={styles.marginRight}
            onChange={() => {}}
        />
        <Checkbox
            error={true}
            checked={false}
            style={styles.marginRight}
            onChange={() => {}}
        />
        <Checkbox
            error={true}
            checked={true}
            style={styles.marginRight}
            onChange={() => {}}
        />
        <Checkbox
            disabled={true}
            checked={false}
            style={styles.marginRight}
            onChange={() => {}}
        />
        <Checkbox
            disabled={true}
            checked={true}
            style={styles.marginRight}
            onChange={() => {}}
        />
    </View>
);

CheckboxVariations.parameters = {
    docs: {
        storyDescription:
            "The checkbox has various styles for clickable states. Here are sets of default checkboxes, checkboxes in an error state, and disabled checkboxes.",
    },
};

export const CheckboxLabel: StoryComponentType = () => {
    const [checked, setChecked] = React.useState(false);

    return (
        <Checkbox
            label="Receive assignment reminders for Algebra"
            description="You will receive a reminder 24 hours before each deadline"
            checked={checked}
            onChange={setChecked}
        />
    );
};

CheckboxLabel.parameters = {
    docs: {
        storyDescription:
            "The checkbox can have a optional label and description. This allows it to be used as a settings-like item. The user of this component is responsible for keeping track of checked state and providing an onChange callback.",
    },
};

export const CheckboxContext: StoryComponentType = () => {
    const [checked, setChecked] = React.useState(false);
    const headingText = "Functions";
    const descriptionText = `A great cook knows how to take basic
        ingredients and prepare a delicious meal. In this topic, you will
        become function-chefs! You will learn how to combine functions
        with arithmetic operations and how to compose functions.`;

    return (
        <View style={styles.wrapper}>
            <View style={styles.topic}>
                <label htmlFor="topic-123">
                    <LabelMedium>{headingText}</LabelMedium>
                </label>
                <LabelSmall>{descriptionText}</LabelSmall>
            </View>
            <Checkbox checked={checked} id="topic-123" onChange={setChecked} />
        </View>
    );
};

CheckboxContext.parameters = {
    docs: {
        storyDescription:
            "Sometimes one may wish to use a checkbox in a different context (label may not be right next to the checkbox), like in this example content item. Use a `<label htmlFor={id}>` element where the id matches the `id` prop of the Checkbox. This is for accessibility purposes, and doing this also automatically makes the label a click target for the checkbox.",
    },
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    marginRight: {
        marginRight: 16,
    },
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    topic: {
        maxWidth: 600,
    },
});

import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {StoryComponentType} from "@storybook/react";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
// @ts-expect-error [FEI-5019] - TS2305 - Module '"@storybook/react"' has no exported member 'StoryComponentType'.

import ComponentInfo from "../../.storybook/components/component-info";
import {name, version} from "../../packages/wonder-blocks-form/package.json";

import Radio from "../../packages/wonder-blocks-form/src/components/radio";

export default {
    title: "Form / Radio (internal)",
    component: Radio,
    parameters: {
        componentSubtitle: (
            <ComponentInfo name={name} version={version} />
        ) as any,
    },
};

// @ts-expect-error [FEI-5019] - TS7006 - Parameter 'args' implicitly has an 'any' type.
export const Default: StoryComponentType = (args) => <Radio {...args} />;

Default.args = {
    checked: false,
    onChange: () => {},
};

Default.parameters = {
    chromatic: {
        // We already have screenshots of another story that covers
        // this and more cases.
        disableSnapshot: true,
    },
};

export const Controlled: StoryComponentType = () => {
    const [checked, setChecked] = React.useState(false);
    return <Radio checked={checked} onChange={setChecked} />;
};

Controlled.parameters = {
    chromatic: {
        // Disabling because this doesn't test visuals, it tests
        // that the `checked` state works as expected.
        disableSnapshot: true,
    },
    docs: {
        storyDescription: `Use state to keep track of whether
        the radio button has been checked. A radio button cannot be unchecked
        by the user once it has been checked. It would become unchecked if a
        different radio button is selected as part of a radio group.`,
    },
};

export const Variants: StoryComponentType = () => (
    <View style={styles.row}>
        <Radio checked={false} style={styles.marginRight} onChange={() => {}} />
        <Radio checked={true} style={styles.marginRight} onChange={() => {}} />
        <Radio
            error={true}
            checked={false}
            style={styles.marginRight}
            onChange={() => {}}
        />
        <Radio
            error={true}
            checked={true}
            style={styles.marginRight}
            onChange={() => {}}
        />
        <Radio
            disabled={true}
            checked={false}
            style={styles.marginRight}
            onChange={() => {}}
        />
        <Radio disabled={true} checked={true} onChange={() => {}} />
    </View>
);

Variants.parameters = {
    docs: {
        storyDescription: `The radio button has various styles for
        clickable states. Here are sets of default radio buttons,
        radio buttons in an error state, and disabled radio buttons.`,
    },
};

export const WithLabel: StoryComponentType = () => {
    const [checked, setChecked] = React.useState(false);

    return (
        <Radio
            label="Easy"
            description="Opt for a less difficult exercise set."
            checked={checked}
            onChange={setChecked}
        />
    );
};

WithLabel.parameters = {
    docs: {
        storyDescription: `The radio button can have an optional label
            and description. This allows it to be used as a settings-like item,
            as opposed to its usage in a radio grid.`,
    },
};

export const AdditionalClickTarget: StoryComponentType = () => {
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
            <Radio checked={checked} id="topic-123" onChange={setChecked} />
        </View>
    );
};

AdditionalClickTarget.parameters = {
    docs: {
        storyDescription: `Sometimes one may wish to use a radio button
            in a different context (label may not be right next to the
            radio button), like in this example content item. Use a
            \`<label htmlFor={id}>\` element where the id matches the \`id\`
            prop of the Radio. This is for accessibility purposes,
            and doing this also automatically makes the label a click target
            for the radio button.`,
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

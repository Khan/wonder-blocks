import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {ComponentStory, ComponentMeta} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {Checkbox, CheckboxGroup, Choice} from "@khanacademy/wonder-blocks-form";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import {name, version} from "../../packages/wonder-blocks-form/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import Strut from "../../packages/wonder-blocks-layout/src/components/strut";

export default {
    title: "Form / Checkbox",
    component: Checkbox,
    parameters: {
        componentSubtitle: <ComponentInfo name={name} version={version} />,
    },
} as ComponentMeta<typeof Checkbox>;

type StoryComponentType = ComponentStory<typeof Checkbox>;

export const Default: StoryComponentType = (args) => <Checkbox {...args} />;

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
    const [checked, setChecked] = React.useState<boolean | null>(null);

    const handleChange = () => {
        if (checked === false) {
            setChecked(true);
        } else {
            // If `checked` is true OR null/undefined,
            // we want to change it to false
            setChecked(false);
        }
    };

    return <Checkbox checked={checked} onChange={handleChange} />;
};

Controlled.parameters = {
    chromatic: {
        // Disabling because this doesn't test visuals, its for testing
        // that `state` works as expected.
        disableSnapshot: true,
    },
    docs: {
        storyDescription:
            "Use state to keep track of whether the checkbox is checked or not",
    },
};

export const Indeterminate: StoryComponentType = () => {
    return (
        <View style={styles.row}>
            <Checkbox
                checked={null}
                disabled={false}
                error={false}
                onChange={() => {}}
            />
            <Strut size={8} />
            <Checkbox
                checked={undefined}
                disabled={true}
                error={false}
                onChange={() => {}}
            />
            <Strut size={8} />
            <Checkbox
                checked={null}
                disabled={false}
                error={true}
                onChange={() => {}}
            />
        </View>
    );
};

Indeterminate.parameters = {
    docs: {
        storyDescription: `The checkbox has a third state for when the checkbox
        is neither \`checked\` (true) nor \`unchecked\` (false). Set the
        \`checked\` prop to \`null\` or \`undefined\` to use the indeterminate checkbox.`,
    },
};

export const IndeterminateWithGroup: StoryComponentType = () => {
    const [allSelected, setAllSelected] = React.useState<boolean | null>(false);
    const [selectedValues, setSelectedValues] = React.useState<Array<string>>(
        [],
    );
    const choices = [
        {label: "Pepperoni", value: "pepperoni"},
        {label: "Sausage", value: "sausage"},
        {label: "Extra cheese", value: "cheese"},
        {label: "Green pepper", value: "pepper"},
        {label: "Mushroom", value: "mushroom"},
    ];

    const handleSelectAll = () => {
        if (allSelected || allSelected === null) {
            setSelectedValues([]);
            setAllSelected(false);
        } else {
            const allValues = choices.map((choice) => choice.value);
            setSelectedValues(allValues);
            setAllSelected(true);
        }
    };

    const handleCheckboxGroupSelect = (values: Array<string>) => {
        setSelectedValues(values);
        if (values.length === choices.length) {
            setAllSelected(true);
        } else if (values.length) {
            setAllSelected(null);
        } else {
            setAllSelected(false);
        }
    };

    return (
        <View>
            <Checkbox
                checked={allSelected}
                label={"Topping(s)"}
                onChange={handleSelectAll}
            />
            <Strut size={Spacing.small_12} />
            <View style={{marginInlineStart: Spacing.large_24}}>
                <CheckboxGroup
                    groupName="toppings"
                    onChange={handleCheckboxGroupSelect}
                    selectedValues={selectedValues}
                >
                    {choices.map((choice) => (
                        <Choice
                            key={choice.label}
                            label={choice.label}
                            value={choice.value}
                        />
                    ))}
                </CheckboxGroup>
            </View>
        </View>
    );
};

IndeterminateWithGroup.parameters = {
    docs: {
        storyDescription: `Here is an example of how you can use the
            indeterminate checkbox to select all or deselect all options
            in a checkbox group. If only some of the options are selected,
            the indeterminate checkbox will be in the indeterminate state.`,
    },
};

export const Variants: StoryComponentType = () => (
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

Variants.parameters = {
    docs: {
        storyDescription:
            "The checkbox has various styles for clickable states. Here are sets of default checkboxes, checkboxes in an error state, and disabled checkboxes.",
    },
};

export const VariantsControlled: StoryComponentType = () => {
    const [defaultChecked, defaultSetChecked] = React.useState(false);
    const [errorChecked, errorSetChecked] = React.useState(false);
    const [disabledChecked, disabledSetChecked] = React.useState(false);

    return (
        <View style={styles.row}>
            <Checkbox
                checked={defaultChecked}
                onChange={defaultSetChecked}
                style={styles.marginRight}
            />
            <Checkbox
                error={true}
                checked={errorChecked}
                onChange={errorSetChecked}
                style={styles.marginRight}
            />
            <Checkbox
                checked={disabledChecked}
                disabled={true}
                onChange={disabledSetChecked}
                style={styles.marginRight}
            />
        </View>
    );
};

VariantsControlled.parameters = {
    chromatic: {
        // Disabling because this doesn't test visuals, its for testing
        // that `state` works as expected.
        disableSnapshot: true,
    },
    docs: {
        storyDescription: `A demo of the different kinds of checkboxes
            when they have their \`checked\` and \`onChange\` props set
            to make them toggle on click.`,
    },
};

export const WithLabel: StoryComponentType = () => {
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

WithLabel.parameters = {
    docs: {
        storyDescription:
            "The checkbox can have an optional label and description. This allows it to be used as a settings-like item. The user of this component is responsible for keeping track of checked state and providing an onChange callback.",
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
            <Checkbox checked={checked} id="topic-123" onChange={setChecked} />
        </View>
    );
};

AdditionalClickTarget.parameters = {
    docs: {
        storyDescription:
            "Sometimes one may wish to use a checkbox in a different context (label may not be right next to the checkbox), like in this example content item. Use a `<label htmlFor={id}>` element where the id matches the `id` prop of the Checkbox. This is for accessibility purposes, and doing this also automatically makes the label a click target for the checkbox.",
    },
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    marginLeft: {
        marginLeft: 16,
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

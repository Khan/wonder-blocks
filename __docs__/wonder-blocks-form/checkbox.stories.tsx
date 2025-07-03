import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {Checkbox, CheckboxGroup, Choice} from "@khanacademy/wonder-blocks-form";
import {sizing, spacing, font} from "@khanacademy/wonder-blocks-tokens";

import packageConfig from "../../packages/wonder-blocks-form/package.json";
import ComponentInfo from "../components/component-info";
import Strut from "../../packages/wonder-blocks-layout/src/components/strut";

export default {
    title: "Packages / Form / Checkbox",
    component: Checkbox,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // These stories are being tested in checkbox-variants.stories.tsx
            disableSnapshot: true,
        },
    },
} as Meta<typeof Checkbox>;

type StoryComponentType = StoryObj<typeof Checkbox>;

export const Default: StoryComponentType = {
    args: {
        checked: false,
        onChange: () => {},
        "aria-label": "Example",
    },
};

export const Controlled: StoryComponentType = () => {
    const [checked, setChecked] = React.useState<boolean | null>(null);

    const handleChange = () => {
        // If `checked` is true (checked) OR null/undefined (indeterminate),
        // we want to change it to false (unchecked). We only change it back
        // to true if it the value is explicitly false.
        setChecked(checked === false);
    };

    return (
        <Checkbox
            aria-label="Example"
            checked={checked}
            onChange={handleChange}
        />
    );
};

Controlled.parameters = {
    docs: {
        description: {
            story: `Use state to keep track of whether the checkbox
            is checked or not. This is in the indeterminate (null)
            state by default. Clicking it will uncheck it, and clicking it
            again will check it.`,
        },
    },
};

export const Indeterminate: StoryComponentType = () => {
    return (
        <View style={[styles.row, styles.gap]}>
            <Checkbox
                aria-label="Default example"
                checked={null}
                disabled={false}
                error={false}
                onChange={() => {}}
            />
            <Checkbox
                aria-label="Disabled example"
                checked={undefined}
                disabled={true}
                error={false}
                onChange={() => {}}
            />
            <Checkbox
                aria-label="Error example"
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
        description: {
            story: `The checkbox has a third state for when the checkbox
        is neither \`checked\` (true) nor \`unchecked\` (false). Set the
        \`checked\` prop to \`null\` or \`undefined\` to use the indeterminate checkbox.`,
        },
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
            <Strut size={spacing.small_12} />
            <View style={{marginInlineStart: spacing.large_24}}>
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
        description: {
            story: `Here is an example of how you can use the
            indeterminate checkbox to select all or deselect all options
            in a checkbox group. If only some of the options are selected,
            the indeterminate checkbox will be in the indeterminate state.`,
        },
    },
};

export const Variants: StoryComponentType = () => (
    <View style={[styles.row, styles.gap_240]}>
        <Checkbox
            aria-label="Default example"
            error={false}
            checked={false}
            onChange={() => {}}
        />
        <Checkbox
            aria-label="Checked example"
            error={false}
            checked={true}
            onChange={() => {}}
        />
        <Checkbox
            aria-label="Error example"
            error={true}
            checked={false}
            onChange={() => {}}
        />
        <Checkbox
            aria-label="Error checked example"
            error={true}
            checked={true}
            onChange={() => {}}
        />
        <Checkbox
            aria-label="Disabled example"
            disabled={true}
            checked={false}
            onChange={() => {}}
        />
        <Checkbox
            aria-label="Disabled checked example"
            disabled={true}
            checked={true}
            onChange={() => {}}
        />
    </View>
);

Variants.parameters = {
    docs: {
        description: {
            story: "The checkbox has various styles for clickable states. Here are sets of default checkboxes, checkboxes in an error state, and disabled checkboxes.",
        },
    },
};

export const VariantsControlled: StoryComponentType = () => {
    const [defaultChecked, defaultSetChecked] = React.useState(false);
    const [errorChecked, errorSetChecked] = React.useState(false);
    const [disabledChecked, disabledSetChecked] = React.useState(false);

    return (
        <View style={[styles.row, styles.gap_240]}>
            <Checkbox
                aria-label="Checked example"
                checked={defaultChecked}
                onChange={defaultSetChecked}
                style={styles.marginRight}
            />
            <Checkbox
                aria-label="Error example"
                error={true}
                checked={errorChecked}
                onChange={errorSetChecked}
                style={styles.marginRight}
            />
            <Checkbox
                aria-label="Disabled checked example"
                checked={disabledChecked}
                disabled={true}
                onChange={disabledSetChecked}
                style={styles.marginRight}
            />
        </View>
    );
};

VariantsControlled.parameters = {
    docs: {
        description: {
            story: `A demo of the different kinds of checkboxes
            when they have their \`checked\` and \`onChange\` props set
            to make them toggle on click.`,
        },
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
        description: {
            story: "The checkbox can have an optional label and description. This allows it to be used as a settings-like item. The user of this component is responsible for keeping track of checked state and providing an onChange callback.",
        },
    },
};

export const WithStyledLabel: StoryComponentType = () => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <Checkbox
            label={
                <BodyText
                    weight="bold"
                    tag="span"
                    style={{lineHeight: font.body.lineHeight.small}}
                >
                    Receive assignment reminders for Algebra
                </BodyText>
            }
            description="You will receive a reminder 24 hours before each deadline"
            checked={checked}
            onChange={() => handleChange()}
        />
    );
};

WithStyledLabel.parameters = {
    docs: {
        description: {
            story: "The checkbox can have an optional label and description. This allows it to be used as a settings-like item. The user of this component is responsible for keeping track of checked state and providing an onChange callback.",
        },
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
                    <BodyText tag="span">{headingText}</BodyText>
                </label>
                <BodyText size="small">{descriptionText}</BodyText>
            </View>
            <Checkbox checked={checked} id="topic-123" onChange={setChecked} />
        </View>
    );
};

AdditionalClickTarget.parameters = {
    docs: {
        description: {
            story: "Sometimes one may wish to use a checkbox in a different context (label may not be right next to the checkbox), like in this example content item. Use a `<label htmlFor={id}>` element where the id matches the `id` prop of the Checkbox. This is for accessibility purposes, and doing this also automatically makes the label a click target for the checkbox.",
        },
    },
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    gap: {
        gap: sizing.size_160,
    },
    gap_240: {
        gap: sizing.size_240,
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

import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelXSmall} from "@khanacademy/wonder-blocks-typography";

import {Choice, CheckboxGroup} from "@khanacademy/wonder-blocks-form";
import packageConfig from "../../packages/wonder-blocks-form/package.json";

import ComponentInfo from "../components/component-info";

export default {
    title: "Packages / Form / CheckboxGroup",
    component: CheckboxGroup,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
} as Meta<typeof CheckboxGroup>;

type StoryComponentType = StoryObj<typeof CheckboxGroup>;

/**
 * `CheckboxGroup` is a component that groups multiple `Choice` components
 * together. It is used to allow users to select multiple options from a list.
 *
 * Note that by using a `label` prop, the `CheckboxGroup` component will render
 * a `legend` as the first child of the `fieldset` element. This is important to
 * include as it ensures that Screen Readers can correctly identify and announce
 * the group of checkboxes.
 */
export const Default: StoryComponentType = {
    render: (args) => {
        return (
            <CheckboxGroup {...args}>
                <Choice label="Pepperoni" value="pepperoni-1" />
                <Choice
                    label="Sausage"
                    value="sausage-1"
                    description="Imported from Italy"
                />
                <Choice label="Extra cheese" value="cheese-1" />
                <Choice label="Green pepper" value="pepper-1" />
                <Choice label="Mushroom" value="mushroom-1" />
            </CheckboxGroup>
        );
    },
    args: {
        // Required
        groupName: "toppings",
        selectedValues: ["pepperoni-1", "sausage-1"],
        onChange: () => {},
        // Optional
        label: "Pizza toppings",
        description: "Choose as many toppings as you would like.",
    },
};

export const Basic: StoryComponentType = () => {
    const [selectedValues, setSelectedValues] = React.useState<Array<string>>(
        [],
    );

    return (
        <CheckboxGroup
            groupName="toppings"
            onChange={setSelectedValues}
            selectedValues={selectedValues}
        >
            <Choice label="Pepperoni" value="pepperoni-2" />
            <Choice
                label="Sausage"
                value="sausage-2"
                description="Imported from Italy"
            />
            <Choice label="Extra cheese" value="cheese-2" />
            <Choice label="Green pepper" value="pepper-2" />
            <Choice label="Mushroom" value="mushroom-2" />
        </CheckboxGroup>
    );
};

Basic.parameters = {
    docs: {
        description: {
            story: `This is a basic example of a checkbox group.
        The Wonder Blocks \`CheckboxGroup\` component takes \`Choice\`
        components as children. One of the \`Choice\` components here
        includes a description.`,
        },
    },
};

export const Error: StoryComponentType = () => {
    const toppingsError = "You have selected too many toppings";
    const [selectedValues, setSelectedValues] = React.useState([
        "pepperoni-3",
        "sausage-3",
        "cheese-3",
        "pepper-3",
    ]);
    const [error, setError] = React.useState<string | undefined>(toppingsError);

    // Returns an error message if more than 3 items are selected,
    // and it returns undefined otherwise. We use undefined instead of
    // null here because null would result in a type error, whereas
    // undefined would be the same as not passing in anything to the
    // checkbox group's `errorMessage` prop.
    const checkForError = (input: Array<string>) => {
        if (input.length > 3) {
            return toppingsError;
        }
    };

    const handleChange = (input: Array<string>) => {
        const errorMessage = checkForError(input);
        setSelectedValues(input);
        setError(errorMessage);
    };

    return (
        <CheckboxGroup
            label="Pizza order"
            groupName="toppings"
            description="You may choose at most three toppings"
            onChange={handleChange}
            errorMessage={error}
            selectedValues={selectedValues}
        >
            <Choice label="Pepperoni" value="pepperoni-3" />
            <Choice
                label="Sausage"
                value="sausage-3"
                description="Imported from Italy"
            />
            <Choice label="Extra cheese" value="cheese-3" />
            <Choice label="Green pepper" value="pepper-3" />
            <Choice label="Mushroom" value="mushroom-3" />
        </CheckboxGroup>
    );
};

Error.parameters = {
    docs: {
        storyDescription: `This is what a checkbox group looks like
        if it has an error. It displays the error that is passed into the
        \`errorMessage\` prop, provided the error is not null. It also
        uses the error styling for all the checkboxes. Here, the error
        message is saved as a state, updated in the change handler, and then
        passed in as the \`errorMessage\` prop.`,
    },
};

export const RowStyling: StoryComponentType = () => {
    const [selectedValues, setSelectedValues] = React.useState<Array<string>>(
        [],
    );

    return (
        <View style={styles.wrapper}>
            <LabelLarge style={styles.title}>Science</LabelLarge>
            <CheckboxGroup
                groupName="science-classes"
                onChange={setSelectedValues}
                selectedValues={selectedValues}
                style={styles.group}
            >
                <Choice label="Biology" value="1" style={styles.choice} />
                <Choice label="AP®︎ Biology" value="2" style={styles.choice} />
                <Choice
                    label="High school biology"
                    value="3"
                    style={styles.choice}
                />
                <Choice
                    label="Cosmology and astronomy"
                    value="4"
                    style={styles.choice}
                />
                <Choice
                    label="Electrical engineering"
                    value="5"
                    style={styles.choice}
                />
                <Choice
                    label="Health and medicine"
                    value="6"
                    style={styles.choice}
                />
            </CheckboxGroup>
        </View>
    );
};

RowStyling.parameters = {
    docs: {
        description: {
            story: `This example shows how one can add custom styles
        to the checkbox group and to each component to achieve desired custom
        layouts. The context in this example is inspired by the class selector
        modal. The label is created separately because we are reflowing all
        the elements in the group to row. The checkboxes render
        horizontally when the style on the \`CheckboxGroup\` is set to
        \`{flexDirection: "row"}\`. Here, \`{flexWrap: "wrap"}\` is also
        used so the options continue on the next line.`,
        },
    },
};

export const MultipleChoiceStyling: StoryComponentType = () => {
    const [selectedValues, setSelectedValues] = React.useState<Array<string>>(
        [],
    );

    return (
        <CheckboxGroup
            label={<LabelLarge>Select all prime numbers</LabelLarge>}
            description={
                <LabelXSmall style={styles.description}>
                    Hint: There is at least one prime number
                </LabelXSmall>
            }
            groupName="science-classes"
            onChange={setSelectedValues}
            selectedValues={selectedValues}
        >
            <Choice
                label="1"
                value="1-mc-styling"
                style={styles.multipleChoice}
            />
            <Choice
                label="2"
                value="2-mc-styling"
                style={styles.multipleChoice}
            />
            <Choice
                label="3"
                value="3-mc-styling"
                style={styles.multipleChoice}
            />
            <Choice
                label="4"
                value="4-mc-styling"
                style={styles.multipleChoice}
            />
            <Choice
                label="5"
                value="5-mc-styling"
                style={[styles.multipleChoice, styles.last]}
            />
        </CheckboxGroup>
    );
};

MultipleChoiceStyling.parameters = {
    docs: {
        description: {
            story: `This example shows how to use custom styling
        to change the appearance of the checkbox group to look more like
        a multiple choice question. You may also provide custom typography
        to the label and description. Here, there is a line in
        between each question, which is achieved using the
        \`{borderTop: "solid 1px #CCC"}\` style on each \`Choice\`
        component.`,
        },
    },
};

export const FiltersOutFalsyChildren: StoryComponentType = () => {
    const [selectedValues, setSelectedValues] = React.useState<Array<string>>([
        "pepperoni-4",
        "sausage-4",
    ]);
    return (
        <CheckboxGroup
            groupName="pizza"
            onChange={setSelectedValues}
            selectedValues={selectedValues}
            label="Pizza toppings"
        >
            <Choice label="Pepperoni" value="pepperoni-4" />
            <Choice
                label="Sausage"
                value="sausage-4"
                description="Imported from Italy"
            />
            <Choice label="Extra cheese" value="cheese-4" />
            <Choice label="Green pepper" value="pepper-4" />
            {/* eslint-disable-next-line no-constant-condition */}
            {false ? <Choice label="Mushroom" value="mushroom-4" /> : null}
        </CheckboxGroup>
    );
};

FiltersOutFalsyChildren.parameters = {
    docs: {
        description: {
            story: `This example shows that children can be falsy values and
        that those falsy values are filtered out when rendering children.  In this
        case, one of the children is \`{false && <Choice .../>}\` which results in
        that choice (Mushroom) being filtered out.`,
        },
    },
    chromatic: {
        // The unit tests already verify that false-y children aren't rendered.
        disableSnapshot: true,
    },
};

const styles = StyleSheet.create({
    // Row styling
    wrapper: {
        width: 650,
    },
    group: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    choice: {
        marginTop: spacing.xSmall_8,
        width: 200,
    },
    title: {
        paddingBottom: spacing.xSmall_8,
        borderBottom: `1px solid ${semanticColor.border.strong}`,
    },
    // Multiple choice styling
    multipleChoice: {
        margin: 0,
        height: 48,
        borderTop: "solid 1px #CCC",
        justifyContent: "center",
    },
    description: {
        color: semanticColor.text.secondary,
    },
    last: {
        borderBottom: "solid 1px #CCC",
    },
});

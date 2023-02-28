import * as React from "react";
import {StyleSheet} from "aphrodite";
// @ts-expect-error [FEI-5019] - TS2305 - Module '"@storybook/react"' has no exported member 'StoryComponentType'.
import type {StoryComponentType} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelLarge, LabelXSmall} from "@khanacademy/wonder-blocks-typography";

import {Choice, CheckboxGroup} from "@khanacademy/wonder-blocks-form";
import {name, version} from "@khanacademy/wonder-blocks-form/package.json";

import ComponentInfo from "../../.storybook/components/component-info";

export default {
    title: "Form / CheckboxGroup",
    component: CheckboxGroup,
    parameters: {
        componentSubtitle: (
            <ComponentInfo name={name} version={version} />
        ) as any,
    },
};

// @ts-expect-error [FEI-5019] - TS7006 - Parameter 'args' implicitly has an 'any' type.
export const Default: StoryComponentType = (args) => {
    return (
        <CheckboxGroup {...args}>
            <Choice label="Pepperoni" value="pepperoni" />
            <Choice
                label="Sausage"
                value="sausage"
                description="Imported from Italy"
            />
            <Choice label="Extra cheese" value="cheese" />
            <Choice label="Green pepper" value="pepper" />
            <Choice label="Mushroom" value="mushroom" />
        </CheckboxGroup>
    );
};

Default.args = {
    // Required
    groupName: "toppings",
    selectedValues: ["pepperoni", "sausage"],
    onChange: () => {},
    // Optional
    label: "Pizza toppings",
    description: "Choose as many toppings as you would like.",
};

export const Basic: StoryComponentType = () => {
    const [selectedValues, setSelectedValues] = React.useState([]);

    return (
        <CheckboxGroup
            groupName="toppings"
            // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
            onChange={setSelectedValues}
            selectedValues={selectedValues}
        >
            <Choice label="Pepperoni" value="pepperoni" />
            <Choice
                label="Sausage"
                value="sausage"
                description="Imported from Italy"
            />
            <Choice label="Extra cheese" value="cheese" />
            <Choice label="Green pepper" value="pepper" />
            <Choice label="Mushroom" value="mushroom" />
        </CheckboxGroup>
    );
};

Basic.parameters = {
    docs: {
        storyDescription: `This is a basic example of a checkbox group.
        The Wonder Blocks \`CheckboxGroup\` component takes \`Choice\`
        components as children. One of the \`Choice\` components here
        includes a description.`,
    },
};

export const Error: StoryComponentType = () => {
    const toppingsError = "You have selected too many toppings";
    const [selectedValues, setSelectedValues] = React.useState([
        "pepperoni",
        "sausage",
        "cheese",
        "pepper",
    ]);
    const [error, setError] = React.useState(toppingsError);

    // Returns an error message if more than 3 items are selected,
    // and it returns undefined otherwise. We use undefined instead of
    // null here because null would result in a flow error, whereas
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
        // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'string | undefined' is not assignable to parameter of type 'SetStateAction<string>'.
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
            <Choice label="Pepperoni" value="pepperoni" />
            <Choice
                label="Sausage"
                value="sausage"
                description="Imported from Italy"
            />
            <Choice label="Extra cheese" value="cheese" />
            <Choice label="Green pepper" value="pepper" />
            <Choice label="Mushroom" value="mushroom" />
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
    const [selectedValues, setSelectedValues] = React.useState([]);

    return (
        <View style={styles.wrapper}>
            <LabelLarge style={styles.title}>Science</LabelLarge>
            <CheckboxGroup
                groupName="science-classes"
                // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
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
        storyDescription: `This example shows how one can add custom styles
        to the checkbox group and to each component to achieve desired custom
        layouts. The context in this example is inspired by the class selector
        modal. The label is created separately because we are reflowing all
        the elements in the group to row. The checkboxes render
        horizontally when the style on the \`CheckboxGroup\` is set to
        \`{flexDirection: "row"}\`. Here, \`{flexWrap: "wrap"}\` is also
        used so the options continue on the next line.`,
    },
};

export const MultipleChoiceStyling: StoryComponentType = () => {
    const [selectedValues, setSelectedValues] = React.useState([]);

    return (
        <CheckboxGroup
            label={<LabelLarge>Select all prime numbers</LabelLarge>}
            description={
                <LabelXSmall style={styles.description}>
                    Hint: There is at least one prime number
                </LabelXSmall>
            }
            groupName="science-classes"
            // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
            onChange={setSelectedValues}
            selectedValues={selectedValues}
        >
            <Choice label="1" value="1" style={styles.multipleChoice} />
            <Choice label="2" value="2" style={styles.multipleChoice} />
            <Choice label="3" value="3" style={styles.multipleChoice} />
            <Choice label="4" value="4" style={styles.multipleChoice} />
            <Choice
                label="5"
                value="5"
                style={[styles.multipleChoice, styles.last]}
            />
        </CheckboxGroup>
    );
};

MultipleChoiceStyling.parameters = {
    docs: {
        storyDescription: `This example shows how to use custom styling
        to change the appearance of the checkbox group to look more like
        a multiple choice question. You may also provide custom typography
        to the label and description. Here, there is a line in
        between each question, which is achieved using the
        \`{borderTop: "solid 1px #CCC"}\` style on each \`Choice\`
        component.`,
    },
};

export const FiltersOutFalsyChildren: StoryComponentType = () => {
    return (
        <CheckboxGroup
            groupName="pokemon"
            selectedValues={["pepperoni", "sausage"]}
            onChange={() => {}}
            label="Pokemon"
            description="Your first Pokemon."
        >
            <Choice label="Pepperoni" value="pepperoni" />
            <Choice
                label="Sausage"
                value="sausage"
                description="Imported from Italy"
            />
            <Choice label="Extra cheese" value="cheese" />
            <Choice label="Green pepper" value="pepper" />
            {/* eslint-disable-next-line no-constant-condition */}
            {false ? <Choice label="Mushroom" value="mushroom" /> : null}
        </CheckboxGroup>
    );
};

FiltersOutFalsyChildren.parameters = {
    docs: {
        storyDescription: `This example shows that children can be falsy values and
        that those falsy values are filtered out when rendering children.  In this
        case, one of the children is \`{false && <Choice .../>}\` which results in
        that choice being filtered out.`,
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
        marginTop: Spacing.xSmall_8,
        width: 200,
    },
    title: {
        paddingBottom: Spacing.xSmall_8,
        borderBottom: `1px solid ${Color.offBlack64}`,
    },
    // Multiple choice styling
    multipleChoice: {
        margin: 0,
        height: 48,
        borderTop: "solid 1px #CCC",
        justifyContent: "center",
    },
    description: {
        color: Color.offBlack64,
    },
    last: {
        borderBottom: "solid 1px #CCC",
    },
});

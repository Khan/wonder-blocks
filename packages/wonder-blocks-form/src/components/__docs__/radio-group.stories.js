// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {Choice, RadioGroup} from "@khanacademy/wonder-blocks-form";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

import type {StoryComponentType} from "@storybook/react";

import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";

export default {
    title: "Form / RadioGroup",
    component: RadioGroup,
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
    },
};

export const Default: StoryComponentType = (args) => {
    return (
        <RadioGroup {...args}>
            <Choice label="Bulbasaur" value="bulbasaur" />
            <Choice
                label="Charmander"
                value="charmander"
                description="Oops, we ran out of Charmanders"
                disabled
            />
            <Choice label="Squirtle" value="squirtle" />
            <Choice label="Pikachu" value="pikachu" />
        </RadioGroup>
    );
};

Default.args = {
    // Required
    groupName: "pokemon",
    selectedValue: "bulbasaur",
    onChange: () => {},
    // Optional
    label: "Pokemon",
    description: "Your first Pokemon.",
};

export const Basic: StoryComponentType = () => {
    const [selectedValue, setSelectedValue] = React.useState("");

    return (
        <RadioGroup
            groupName="pokemon"
            label="Pokemon"
            description="Your first Pokemon."
            onChange={setSelectedValue}
            selectedValue={selectedValue}
        >
            <Choice label="Bulbasaur" value="bulbasaur" />
            <Choice
                label="Charmander"
                value="charmander"
                description="Oops, we ran out of Charmanders"
                disabled
            />
            <Choice label="Squirtle" value="squirtle" />
            <Choice label="Pikachu" value="pikachu" />
        </RadioGroup>
    );
};

Basic.parameters = {
    docs: {
        storyDescription: `This is a basic example of a radio group.
        The Wonder Blocks \`RadioGroup\` component takes \`Choice\`
        components as children. One of the \`Choice\` components here
        includes a description.`,
    },
};

export const Error: StoryComponentType = () => {
    const emptyError = "You must select an option to continue.";
    const [selectedValue, setSelectedValue] = React.useState("");
    const [error, setError] = React.useState(emptyError);

    // This returns an error message if no option is selected,
    // and it returns undefined otherwise. We use undefined instead of
    // null here because null would result in a flow error, whereas
    // undefined would be the same as not passing in anything to the
    // radio group's `errorMessage` prop.
    const checkForError = (input) => {
        if (!input) {
            return emptyError;
        }
    };

    const handleChange = (input) => {
        const errorMessage = checkForError(input);
        setSelectedValue(input);
        setError(errorMessage);
    };

    return (
        <RadioGroup
            groupName="pokemon"
            label="Pokemon"
            description="Your first Pokemon."
            onChange={handleChange}
            selectedValue={selectedValue}
            errorMessage={error}
        >
            <Choice label="Bulbasaur" value="bulbasaur" />
            <Choice label="Charmander" value="charmander" />
            <Choice label="Squirtle" value="squirtle" />
            <Choice label="Pikachu" value="pikachu" />
        </RadioGroup>
    );
};

Error.parameters = {
    docs: {
        storyDescription: `This is what a radio group looks like
        if it has an error. It displays the error that is passed into the
        \`errorMessage\` prop, provided the error is not null. It also
        uses the error styling for all the radio buttons. Here, the error
        message is saved as a state, updated in the change handler, and then
        passed in as the \`errorMessage\` prop.`,
    },
};

export const MultipleChoiceStyling: StoryComponentType = () => {
    const [selectedValue, setSelectedValue] = React.useState("");

    return (
        <>
            <LabelLarge style={styles.prompt}>
                Select your blood type
            </LabelLarge>
            <RadioGroup
                groupName="science-classes"
                onChange={setSelectedValue}
                selectedValue={selectedValue}
            >
                <Choice label="A" value="1" style={styles.choice} />
                <Choice label="B" value="2" style={styles.choice} />
                <Choice label="AB" value="3" style={styles.choice} />
                <Choice
                    label="O"
                    value="4"
                    style={[styles.choice, styles.lastChoice]}
                />
            </RadioGroup>
        </>
    );
};

MultipleChoiceStyling.parameters = {
    docs: {
        storyDescription: `This example shows how to use custom styling
        to change the appearance of the radio group to look more like
        a multiple choice question. Here, there is a line in
        between each question, which is achieved using the
        \`{borderTop: "solid 1px #CCC"}\` style on each \`Choice\`
        component.`,
    },
};

const styles = StyleSheet.create({
    choice: {
        margin: 0,
        height: 48,
        borderTop: "solid 1px #CCC",
        justifyContent: "center",
    },
    lastChoice: {
        borderBottom: "solid 1px #CCC",
    },
    prompt: {
        marginBottom: 16,
    },
});

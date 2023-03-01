import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {ComponentStory, ComponentMeta} from "@storybook/react";

import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

import {Choice, RadioGroup} from "@khanacademy/wonder-blocks-form";
import {name, version} from "../../packages/wonder-blocks-form/package.json";

import ComponentInfo from "../../.storybook/components/component-info";

export default {
    title: "Form / RadioGroup",
    component: RadioGroup,
    parameters: {
        componentSubtitle: <ComponentInfo name={name} version={version} />,
    },
} as ComponentMeta<typeof RadioGroup>;

type StoryComponentType = ComponentStory<typeof RadioGroup>;

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
    const checkForError = (input: string) => {
        if (!input) {
            return emptyError;
        }
    };

    const handleChange = (input: string) => {
        const errorMessage = checkForError(input);
        setSelectedValue(input);
        // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'string | undefined' is not assignable to parameter of type 'SetStateAction<string>'.
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

export const FiltersOutFalsyChildren: StoryComponentType = () => {
    return (
        <RadioGroup
            groupName="pokemon"
            selectedValue="bulbasaur"
            onChange={() => {}}
            label="Pokemon"
            description="Your first Pokemon."
        >
            <Choice label="Bulbasaur" value="bulbasaur" />
            <Choice
                label="Charmander"
                value="charmander"
                description="Oops, we ran out of Charmanders"
                disabled
            />
            <Choice label="Squirtle" value="squirtle" />
            {/* eslint-disable-next-line no-constant-condition */}
            {false ? <Choice label="Pikachu" value="pikachu" /> : null}
        </RadioGroup>
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

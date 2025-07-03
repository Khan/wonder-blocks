import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import {Choice, RadioGroup} from "@khanacademy/wonder-blocks-form";
import packageConfig from "../../packages/wonder-blocks-form/package.json";

import ComponentInfo from "../components/component-info";

export default {
    title: "Packages / Form / RadioGroup",
    component: RadioGroup,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
} as Meta<typeof RadioGroup>;

type StoryComponentType = StoryObj<typeof RadioGroup>;

/**
 * `RadioGroup` is a component that groups multiple `Choice` components
 * together. It is used to allow users to select a single option from a list.
 *
 * Note that by using a `label` prop, the `RadioGroup` component will render
 * a `legend` as the first child of the `fieldset` element. This is important to
 * include as it ensures that Screen Readers can correctly identify and announce
 * the group of radio buttons.
 */
export const Default: StoryComponentType = {
    render: (args) => {
        return (
            <RadioGroup {...args}>
                <Choice label="Bulbasaur" value="bulbasaur-1" />
                <Choice
                    label="Charmander"
                    value="charmander-1"
                    description="Oops, we ran out of Charmanders"
                    disabled
                />
                <Choice label="Squirtle" value="squirtle-1" />
                <Choice label="Pikachu" value="pikachu-1" />
            </RadioGroup>
        );
    },
    args: {
        // Required
        groupName: "pokemon",
        selectedValue: "bulbasaur-1",
        onChange: () => {},
        // Optional
        label: "Pokemon",
        description: "Your first Pokemon.",
    },
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
            <Choice label="Bulbasaur" value="bulbasaur-2" />
            <Choice
                label="Charmander"
                value="charmander-2"
                description="Oops, we ran out of Charmanders"
                disabled
            />
            <Choice label="Squirtle" value="squirtle-2" />
            <Choice label="Pikachu" value="pikachu-2" />
        </RadioGroup>
    );
};

Basic.parameters = {
    docs: {
        description: {
            story: `This is a basic example of a radio group.
        The Wonder Blocks \`RadioGroup\` component takes \`Choice\`
        components as children. One of the \`Choice\` components here
        includes a description.`,
        },
    },
};

export const Error: StoryComponentType = () => {
    const emptyError = "You must select an option to continue.";
    const [selectedValue, setSelectedValue] = React.useState("");
    const [error, setError] = React.useState<string | undefined>(emptyError);

    // This returns an error message if no option is selected,
    // and it returns undefined otherwise. We use undefined instead of
    // null here because null would result in a type error, whereas
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
            <Choice label="Bulbasaur" value="bulbasaur-3" />
            <Choice label="Charmander" value="charmander-3" />
            <Choice label="Squirtle" value="squirtle-3" />
            <Choice label="Pikachu" value="pikachu-3" />
        </RadioGroup>
    );
};

Error.parameters = {
    docs: {
        description: {
            story: `This is what a radio group looks like
        if it has an error. It displays the error that is passed into the
        \`errorMessage\` prop, provided the error is not null. It also
        uses the error styling for all the radio buttons. Here, the error
        message is saved as a state, updated in the change handler, and then
        passed in as the \`errorMessage\` prop.`,
        },
    },
};

export const MultipleChoiceStyling: StoryComponentType = () => {
    const [selectedValue, setSelectedValue] = React.useState("");

    return (
        <>
            <BodyText weight="bold" tag="span" style={styles.prompt}>
                Select your blood type
            </BodyText>
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
        description: {
            story: `This example shows how to use custom styling
        to change the appearance of the radio group to look more like
        a multiple choice question. Here, there is a line in
        between each question, which is achieved using the
        \`{borderTop: "solid 1px #CCC"}\` style on each \`Choice\`
        component.`,
        },
    },
};

export const FiltersOutFalsyChildren: StoryComponentType = () => {
    const [selectedValue, setSelectedValue] = React.useState("bulbasaur-4");

    return (
        <RadioGroup
            groupName="pokemon"
            onChange={setSelectedValue}
            selectedValue={selectedValue}
            label="Pokemon"
            description="Your first Pokemon."
        >
            <Choice label="Bulbasaur" value="bulbasaur-4" />
            <Choice
                label="Charmander"
                value="charmander-4"
                description="Oops, we ran out of Charmanders"
                disabled
            />
            <Choice label="Squirtle" value="squirtle-4" />
            {/* eslint-disable-next-line no-constant-condition */}
            {false ? <Choice label="Pikachu" value="pikachu-4" /> : null}
        </RadioGroup>
    );
};

FiltersOutFalsyChildren.parameters = {
    docs: {
        description: {
            story: `This example shows that children can be falsy values and
        that those falsy values are filtered out when rendering children.  In this
        case, one of the children is \`{false && <Choice .../>}\` which results in
        that choice (Pikachu) being filtered out.`,
        },
    },
    chromatic: {
        // The unit tests already verify that false-y children aren't rendered.
        disableSnapshot: true,
    },
};

/**
 * There are specific situations where you might want to use a custom label
 * component. This example demonstrates how to use a custom label component
 * that can be passed in as a prop to the `RadioGroup` component.
 */
export const CustomLabel: StoryComponentType = {
    ...Default,
    args: {
        style: {
            // Adding an arbitrary width to the radio group to demonstrate how
            // the custom label component expands to fill the available space.
            width: 400,
        },
        label: (
            <View
                style={{
                    border: `1px dashed ${semanticColor.core.border.neutral.default}`,
                    padding: spacing.medium_16,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <BodyText weight="bold" tag="span">
                    Pokemon
                </BodyText>
                <BodyText tag="span">(optional)</BodyText>
            </View>
        ),
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

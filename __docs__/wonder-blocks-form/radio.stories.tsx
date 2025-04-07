import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {Meta, StoryObj} from "@storybook/react";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-form/package.json";

import Radio from "../../packages/wonder-blocks-form/src/components/radio";

type StoryComponentType = StoryObj<typeof Radio>;

export default {
    title: "Packages / Form / Radio (internal)",
    component: Radio,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // These stories are being tested in radio-variants.stories.tsx
            disableSnapshot: true,
        },
    },
} as Meta<typeof Radio>;

export const Default: StoryComponentType = {
    args: {
        "aria-label": "Example",
        checked: false,
        onChange: () => {},
    },
};

export const Controlled: StoryComponentType = () => {
    const [checked, setChecked] = React.useState(false);
    return (
        <Radio aria-label="Example" checked={checked} onChange={setChecked} />
    );
};

Controlled.parameters = {
    docs: {
        description: {
            story: `Use state to keep track of whether
        the radio button has been checked. A radio button cannot be unchecked
        by the user once it has been checked. It would become unchecked if a
        different radio button is selected as part of a radio group.`,
        },
    },
};

export const Variants: StoryComponentType = () => (
    <View style={styles.row}>
        <Radio
            aria-label="Example"
            checked={false}
            style={styles.marginRight}
            onChange={() => {}}
        />
        <Radio
            aria-label="Checked Example"
            checked={true}
            style={styles.marginRight}
            onChange={() => {}}
        />
        <Radio
            aria-label="Error Example"
            error={true}
            checked={false}
            style={styles.marginRight}
            onChange={() => {}}
        />
        <Radio
            aria-label="Checked Error Example"
            error={true}
            checked={true}
            style={styles.marginRight}
            onChange={() => {}}
        />
        <Radio
            aria-label="Disabled Example"
            disabled={true}
            checked={false}
            style={styles.marginRight}
            onChange={() => {}}
        />
        <Radio
            aria-label="Disabled Checked Example"
            disabled={true}
            checked={true}
            onChange={() => {}}
        />
    </View>
);

Variants.parameters = {
    docs: {
        description: {
            story: `The radio button has various styles for
        clickable states. Here are sets of default radio buttons,
        radio buttons in an error state, and disabled radio buttons.`,
        },
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
        description: {
            story: `The radio button can have an optional label
            and description. This allows it to be used as a settings-like item,
            as opposed to its usage in a radio grid.`,
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
        description: {
            story: `Sometimes one may wish to use a radio button
            in a different context (label may not be right next to the
            radio button), like in this example content item. Use a
            \`<label htmlFor={id}>\` element where the id matches the \`id\`
            prop of the Radio. This is for accessibility purposes,
            and doing this also automatically makes the label a click target
            for the radio button.`,
        },
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

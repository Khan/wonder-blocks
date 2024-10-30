import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {Meta} from "@storybook/react";
import {fade, spacing, color} from "@khanacademy/wonder-blocks-tokens";
import {makeStyled, View} from "@khanacademy/wonder-blocks-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";

const styles = StyleSheet.create({
    input: {
        // default style for all instances of StyledInput
        background: color.white,
        border: `1px solid ${color.offBlack16}`,
        borderRadius: spacing.xxxSmall_4,
        fontSize: spacing.medium_16,
        padding: spacing.xSmall_8,
    },
    error: {
        background: fade(color.red, 0.16),
        borderColor: color.red,
    },
});

const {StyledInput} = makeStyled("input", styles.input);

export default {
    title: "Packages / Core / makeStyled",
    component: StyledInput,
} satisfies Meta;

export const WithDefaultStyle = {
    args: {
        type: "text",
        placeholder: "This is a styled input",
    },
};

export const OverrideStyles = {
    args: {
        type: "text",
        placeholder: "With an error style",
        style: styles.error,
    },
};

const DynamicStyledInput = () => {
    const [error, setError] = React.useState(false);
    const {StyledInput} = makeStyled("input", styles.input);
    return (
        <View>
            <Checkbox
                label="Click here to add the error style to the input"
                checked={error}
                onChange={() => setError(!error)}
            />
            <StyledInput
                style={[styles.input, error && styles.error]}
                type="text"
                placeholder="Lorem ipsum"
            />
        </View>
    );
};

export const AddingStylesDynamically = {
    render: () => <DynamicStyledInput />,
    name: "Adding styles dynamically",
};

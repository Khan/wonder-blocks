import * as React from "react";
import {StyleSheet} from "aphrodite";

import {spacing, color, border} from "@khanacademy/wonder-blocks-tokens";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";

const styles = StyleSheet.create({
    input: {
        // default style for all instances of StyledInput
        background: color.white,
        border: `1px solid ${color.offBlack16}`,
        borderRadius: border.radius.radius_040,
        fontSize: spacing.medium_16,
        padding: spacing.xSmall_8,
    },
    error: {
        background: color.fadedRed16,
        borderColor: color.red,
    },
});

const StyledInput = addStyle("input", styles.input);

const DynamicStyledInput = () => {
    const [error, setError] = React.useState(false);
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

export default {
    title: "Packages / Core / addStyle",
};

export const WithDefaultStyle = {
    render: () => (
        <StyledInput type="text" placeholder="This is a styled input" />
    ),
    name: "With default style",
};

export const OverrideStyles = {
    render: () => (
        <StyledInput
            style={styles.error}
            type="text"
            placeholder="With an error style"
        />
    ),
    name: "Override styles",
};

export const AddingStylesDynamically = {
    render: DynamicStyledInput.bind({}),
    name: "Adding styles dynamically",
};

import * as React from "react";
import {StyleSheet} from "aphrodite";

import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

type CheckboxProps = PropsFor<typeof Checkbox>;

const ErrorTemplate = (args: CheckboxProps) => {
    const [checked, setChecked] = React.useState(false);
    const errorId = React.useId();
    const errorState = !checked;
    return (
        <View>
            <Checkbox
                error={errorState}
                aria-describedby={errorState ? errorId : undefined}
                aria-required={true}
                {...args}
                checked={checked}
                onChange={setChecked}
            />
            {errorState && (
                <LabelSmall style={styles.error} id={errorId}>
                    You must agree to the terms to continue
                </LabelSmall>
            )}
        </View>
    );
};

const DisabledTemplate = (args: CheckboxProps) => {
    const [checked, setChecked] = React.useState(false);
    return (
        <Checkbox
            checked={checked}
            onChange={setChecked}
            label="Some setting"
            description="You do not have permission to change this setting"
            disabled={true}
        />
    );
};

const styles = StyleSheet.create({
    error: {
        color: semanticColor.status.critical.foreground,
    },
});

export default {
    title: "Packages / Form / Checkbox / Accessibility",
    component: Checkbox,

    // Disables chromatic testing for these stories.
    parameters: {
        previewTabs: {
            canvas: {
                hidden: true,
            },
        },

        viewMode: "docs",

        chromatic: {
            disableSnapshot: true,
        },
    },
};

export const ErrorState = {
    render: ErrorTemplate.bind({}),
    name: "Error state",

    args: {
        label: "I accept the terms and conditions",
    },
};

export const DisabledState = {
    render: DisabledTemplate.bind({}),
    name: "Disabled state",
};

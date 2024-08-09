import * as React from "react";
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {spacing} from "@khanacademy/wonder-blocks-tokens";

export default {
    title: "Packages / Form / Accessibility",
    parameters: {
        chromatic: {
            // Disabling because this is used for documentation purposes
            disableSnapshot: true,
        },
    },
    tags: [
        "!dev", // Hide individual stories from sidebar so they are only shown in the docs page.
    ],
};

/**
 * <h2>Form Field Labels</h2>
 * Form fields should have an associated `<label>` element that has the `htmlFor`
 * prop set to the `id` of the form field element. This is helpful for
 * screenreaders so that it can communicate the relationship between the label and
 * the form field.
 *
 * Guidelines:
 * - Make sure the id of the form field element is unique to the page
 * - Consider using the `LabeledTextField` component if you are using `TextField`.
 * This will automatically wire up the label and text input. (Note: we will have
 * a more generic `LabelField` component later on to provide this functionality
 * for other form fields.)
 * - If you are using the `CheckboxGroup` or `RadioGroup` components, the accessible
 * label for the field is already built-in when the `label` prop is used. This
 * uses `<fieldset>` and `<legend>` elements instead of a `<label>` since the label
 * is for a group of related controls. See
 * [Grouping Controls](https://www.w3.org/WAI/tutorials/forms/grouping/)
 * for more details!
 *
 * When using Wonder Blocks typography components for form labels, the `tag`
 * prop can be set to `label` to change the underlying element to render.
 * Here is an example of a form field label using Wonder Blocks components
 * `LabelMedium` and `TextArea`:
 */
export const FormLabelExample = () => {
    const [value, setValue] = React.useState("");
    return (
        <View style={styles.container}>
            <LabelMedium tag="label" htmlFor="description-field">
                Description
            </LabelMedium>
            <TextArea
                value={value}
                onChange={(value) => setValue(value)}
                id="description-field"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: spacing.xSmall_8,
    },
});

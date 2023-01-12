// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import {
    useUniqueIdWithMock,
    type StyleType,
} from "@khanacademy/wonder-blocks-core";

import FieldHeading from "./field-heading.js";

type Props = {|
    /**
     * An optional unique identifier for the TextField.
     * If no id is specified, a unique id will be auto-generated.
     */
    id?: string,

    /**
     * The form field to render (e.g. `Checkbox`, `SingleSelect`, `SearchField`,
     * etc).
     */
    field: React.Element<any>,

    /**
     * Provide a label for the TextField.
     */
    label: React.Node,

    /**
     * Whether the label should be visually hidden.
     */
    isLabelHidden?: boolean,

    /**
     * Provide a description for the form field.
     */
    description?: React.Node,

    /**
     * Include an error message with the field.
     */
    error?: React.Node,

    /**
     * Whether this field is required to to continue, or the error message to
     * render if this field is left blank.
     *
     * This can be a boolean or a string.
     *
     * String:
     * Please pass in a translated string to use as the error message that will
     * render if the user leaves this field blank. If this field is required,
     * and a string is not passed in, a default untranslated string will render
     * upon error.
     * Note: The string will not be used if a `validate` prop is passed in.
     *
     * Example message: i18n._("A password is required to log in.")
     *
     * Boolean:
     * True/false indicating whether this field is required. Please do not pass
     * in `true` if possible - pass in the error string instead.
     * If `true` is passed, and a `validate` prop is not passed, that means
     * there is no corresponding message and the default untranlsated message
     * will be used.
     */
    required?: boolean | string,

    /**
     * Identifies the element or elements that describes this form field.
     */
    ariaDescribedby?: string | Array<string>,

    /**
     * Custom styles for the container.
     *
     * Note: This style is passed to the field heading container
     * due to scenarios where we would like to set a specific
     * width for the text field. If we apply the style directly
     * to the text field, the container would not be affected.
     * For example, setting text field to "width: 50%" would not
     * affect the container since text field is a child of the container.
     * In this case, the container would maintain its width ocuppying
     * unnecessary space when the text field is smaller.
     */
    style?: StyleType,

    /**
     * Optional test ID for e2e testing.
     */
    testId?: string,
|};

/**
 * A LabeledField is an element used to accept a single line of text
 * from the user paired with a label, description, and error field elements.
 *
 * ### Usage
 *
 * ```jsx
 * import {LabeledField} from "@khanacademy/wonder-blocks-form";
 *
 * const [value, setValue] = React.useState("");
 *
 * <LabeledField
 *     label="Label"
 *     description="Hello, this is the description for this field"
 *     field={<SingleSelect onChange={setValue} value={value} />}
 *     error="Please select an option"
 * />
 * ```
 */
const LabeledField: React.AbstractComponent<Props, HTMLElement> =
    React.forwardRef<Props, HTMLElement>(function LabeledField(
        props: Props,
        ref,
    ) {
        const {
            id,
            field,
            label,
            description,
            error,
            required,
            style,
            testId,
            ariaDescribedby,
        } = props;

        const ids = useUniqueIdWithMock("labeled-field");
        const uniqueId = id ?? ids.get("labeled-field-id");

        const Field = React.cloneElement(field, {
            ...field.props,
            id: `${uniqueId}-field`,
            "aria-describedby": ariaDescribedby
                ? ariaDescribedby
                : `${uniqueId}-error`,
            "aria-invalid": error ? "true" : "false",
            "aria-required": required ? "true" : "false",
            testId: testId && `${testId}-field`,
            ref: ref,
        });

        return (
            <FieldHeading
                id={uniqueId}
                testId={testId}
                style={style}
                field={Field}
                label={label}
                description={description}
                required={!!required}
                error={error || ""}
            />
        );
    });

const styles = StyleSheet.create({
    error: {
        // ":focus-within": {
        background: "pink",
        // boxShadow: `0 0 0 2px ${Color.red}`,
        border: `2px solid ${Color.red}`,
        boxSizing: "border-box",
        borderRadius: 4,
        color: Color.offBlack,
        // },
    },
});

export default LabeledField;

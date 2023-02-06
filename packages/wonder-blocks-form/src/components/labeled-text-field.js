// @flow
import * as React from "react";

import {type StyleType} from "@khanacademy/wonder-blocks-core";

import TextField, {type TextFieldType} from "./text-field.js";
import LabeledField from "./labeled-field.js";

type WithForwardRef = {|forwardedRef: React.Ref<"input">|};

type Props = {|
    /**
     * An optional unique identifier for the TextField.
     * If no id is specified, a unique id will be auto-generated.
     */
    id?: string,

    /**
     * Determines the type of input. Defaults to text.
     */
    type: TextFieldType,

    /**
     * Provide a label for the TextField.
     */
    label: React.Node,

    /**
     * Provide a description for the TextField.
     */
    description?: React.Node,

    /**
     * The input value.
     */
    value: string,

    /**
     * Makes a read-only input field that cannot be focused. Defaults to false.
     */
    disabled: boolean,

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
     * Identifies the element or elements that describes this text field.
     */
    ariaDescribedby?: string | Array<string>,

    /**
     * Provide a validation for the input value.
     * Return a string error message or null | void for a valid input.
     */
    validate?: (value: string) => ?string,

    /**
     * Called when the TextField input is validated.
     */
    onValidate?: (errorMessage: ?string) => mixed,

    /**
     * Called when the value has changed.
     */
    onChange: (newValue: string) => mixed,

    /**
     * Called when a key is pressed.
     */
    onKeyDown?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => mixed,

    /**
     * Called when the element has been focused.
     */
    onFocus?: (event: SyntheticFocusEvent<HTMLInputElement>) => mixed,

    /**
     * Called when the element has been blurred.
     */
    onBlur?: (event: SyntheticFocusEvent<HTMLInputElement>) => mixed,

    /**
     * Provide hints or examples of what to enter.
     */
    placeholder?: string,

    /**
     * Change the field’s sub-components to fit a dark background.
     */
    light: boolean,

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

    /**
     * Specifies if the TextField is read-only.
     */
    readOnly?: boolean,

    /**
     * Specifies if the TextField allows autocomplete.
     */
    autoComplete?: string,
|};

type PropsWithForwardRef = {|
    ...Props,
    ...WithForwardRef,
|};

type DefaultProps = {|
    type: $PropertyType<PropsWithForwardRef, "type">,
    disabled: $PropertyType<PropsWithForwardRef, "disabled">,
    light: $PropertyType<PropsWithForwardRef, "light">,
|};

/**
 * A LabeledTextField is an element used to accept a single line of text
 * from the user paired with a label, description, and error field elements.
 */
class LabeledTextField extends React.Component<PropsWithForwardRef> {
    static defaultProps: DefaultProps = {
        type: "text",
        disabled: false,
        light: false,
    };

    render(): React.Node {
        const {
            id,
            type,
            label,
            description,
            value,
            disabled,
            required,
            validate,
            onChange,
            onKeyDown,
            placeholder,
            light,
            style,
            testId,
            readOnly,
            autoComplete,
            forwardedRef,
            ariaDescribedby,
        } = this.props;

        return (
            <LabeledField
                id={id}
                label={label}
                description={description}
                required={required}
                ariaDescribedby={ariaDescribedby}
                validate={validate}
                onValidate={this.props.onValidate}
                instantValidation={false}
                testId={testId}
                field={
                    <TextField
                        id={(id ?? "") + "-field"}
                        type={type}
                        value={value}
                        placeholder={placeholder}
                        disabled={disabled}
                        onChange={onChange}
                        onFocus={this.props.onFocus}
                        onBlur={this.props.onBlur}
                        onKeyDown={onKeyDown}
                        light={light}
                        readOnly={readOnly}
                        autoComplete={autoComplete}
                        ref={forwardedRef}
                    />
                }
                style={style}
            />
        );
    }
}

type ExportProps = $Diff<
    React.ElementConfig<typeof LabeledTextField>,
    WithForwardRef,
>;

/**
 * A LabeledTextField is an element used to accept a single line of text
 * from the user paired with a label, description, and error field elements.
 *
 * ### Usage
 *
 * ```jsx
 * import {LabeledTextField} from "@khanacademy/wonder-blocks-form";
 *
 * const [value, setValue] = React.useState("");
 *
 * <LabeledTextField
 *     label="Label"
 *     description="Hello, this is the description for this field"
 *     placeholder="Placeholder"
 *     value={value}
 *     onChange={setValue}
 * />
 * ```
 */

export default (React.forwardRef<ExportProps, HTMLInputElement>(
    (props, ref) => <LabeledTextField {...props} forwardedRef={ref} />,
): React.AbstractComponent<ExportProps, HTMLInputElement>);

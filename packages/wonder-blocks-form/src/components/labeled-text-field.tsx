import * as React from "react";

import {Id, StyleType} from "@khanacademy/wonder-blocks-core";

import FieldHeading from "./field-heading";
import TextField from "./text-field";
import type {NumericInputProps} from "./text-field";
import {OmitConstrained} from "../util/types";

type WithForwardRef = {
    forwardedRef: React.ForwardedRef<HTMLInputElement>;
};

type CommonProps = {
    /**
     * An optional unique identifier for the TextField.
     * If no id is specified, a unique id will be auto-generated.
     */
    id?: string;
    /**
     * Provide a label for the TextField.
     */
    label: React.ReactNode;
    /**
     * Provide a description for the TextField.
     */
    description?: React.ReactNode;
    /**
     * The input value.
     */
    value: string;
    /**
     * Whether the input should be disabled. Defaults to false.
     * If the disabled prop is set to `true`, LabeledTextField will have disabled
     * styling and will not be interactable.
     *
     * Note: The `disabled` prop sets the `aria-disabled` attribute to `true`
     * instead of setting the `disabled` attribute. This is so that the component
     * remains focusable while communicating to screen readers that it is disabled.
     * This `disabled` prop will also set the `readonly` attribute to prevent
     * typing in the field.
     */
    disabled: boolean;
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
    required?: boolean | string;
    /**
     * Identifies the element or elements that describes this text field.
     */
    ariaDescribedby?: string | undefined;
    /**
     * Provide a validation for the input value.
     * Return a string error message or null | void for a valid input.
     */
    validate?: (value: string) => string | null | undefined;
    /**
     * Called when the TextField input is validated.
     */
    onValidate?: (errorMessage?: string | null | undefined) => unknown;
    /**
     * Called when the value has changed.
     */
    onChange: (newValue: string) => unknown;
    /**
     * Called when a key is pressed.
     */
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => unknown;
    /**
     * Called when the element has been focused.
     */
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => unknown;
    /**
     * Called when the element has been blurred.
     */
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => unknown;
    /**
     * Provide hints or examples of what to enter.
     */
    placeholder?: string;
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
    style?: StyleType;
    /**
     * Optional test ID for e2e testing.
     */
    testId?: string;
    /**
     * Specifies if the TextField is read-only.
     */
    readOnly?: boolean;
    /**
     * Specifies if the TextField allows autocomplete.
     */
    autoComplete?: string;
    /**
     * Provide a name for the TextField.
     */
    name?: string;
};

type OtherInputProps = CommonProps & {
    /**
     * Determines the type of input. Defaults to text.
     */
    type: "text" | "password" | "email" | "tel";
};

type FullNumericInputProps = NumericInputProps & CommonProps;
type Props = OtherInputProps | FullNumericInputProps;
type PropsWithForwardRef = Props & WithForwardRef;

type DefaultProps = {
    type: PropsWithForwardRef["type"];
    disabled: PropsWithForwardRef["disabled"];
};

type State = {
    /**
     * Displayed when the validation fails.
     */
    error: string | null | undefined;
    /**
     * The user focuses on the textfield.
     */
    focused: boolean;
};

/**
 * A LabeledTextField is an element used to accept a single line of text
 * from the user paired with a label, description, and error field elements.
 */
class LabeledTextField extends React.Component<PropsWithForwardRef, State> {
    static defaultProps: DefaultProps = {
        type: "text",
        disabled: false,
    };

    constructor(props: PropsWithForwardRef) {
        super(props);
        this.state = {
            error: null,
            focused: false,
        };
    }

    handleValidate: (errorMessage?: string | null | undefined) => unknown = (
        errorMessage,
    ) => {
        const {onValidate} = this.props;
        this.setState({error: errorMessage}, () => {
            if (onValidate) {
                onValidate(errorMessage);
            }
        });
    };

    handleFocus: (event: React.FocusEvent<HTMLInputElement>) => unknown = (
        event,
    ) => {
        const {onFocus} = this.props;
        this.setState({focused: true}, () => {
            if (onFocus) {
                onFocus(event);
            }
        });
    };

    handleBlur: (event: React.FocusEvent<HTMLInputElement>) => unknown = (
        event,
    ) => {
        const {onBlur} = this.props;
        this.setState({focused: false}, () => {
            if (onBlur) {
                onBlur(event);
            }
        });
    };

    render(): React.ReactNode {
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
            style,
            testId,
            readOnly,
            autoComplete,
            forwardedRef,
            ariaDescribedby,
            name,
            // NOTE: We are not using this prop, but we need to remove it from
            // `otherProps` so it doesn't override the `handleValidate` function
            // call. We use `otherProps` due to a limitation in TypeScript where
            // we can't easily extract the props when using a discriminated
            // union.
            /* eslint-disable @typescript-eslint/no-unused-vars */
            onValidate,
            onFocus,
            onBlur,
            /* eslint-enable @typescript-eslint/no-unused-vars */
            // numeric input props
            ...otherProps
        } = this.props;

        return (
            <Id id={id}>
                {(uniqueId) => (
                    <FieldHeading
                        id={uniqueId}
                        testId={testId}
                        style={style}
                        field={
                            <TextField
                                id={`${uniqueId}-field`}
                                aria-describedby={
                                    ariaDescribedby
                                        ? ariaDescribedby
                                        : `${uniqueId}-error`
                                }
                                aria-required={required ? "true" : "false"}
                                required={required}
                                testId={testId && `${testId}-field`}
                                type={type}
                                value={value}
                                placeholder={placeholder}
                                disabled={disabled}
                                validate={validate}
                                onValidate={this.handleValidate}
                                onChange={onChange}
                                onKeyDown={onKeyDown}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                readOnly={readOnly}
                                autoComplete={autoComplete}
                                ref={forwardedRef}
                                name={name}
                                {...otherProps}
                            />
                        }
                        label={label}
                        description={description}
                        required={!!required}
                        error={(!this.state.focused && this.state.error) || ""}
                    />
                )}
            </Id>
        );
    }
}

type ExportProps = OmitConstrained<
    JSX.LibraryManagedAttributes<
        typeof LabeledTextField,
        React.ComponentProps<typeof LabeledTextField>
    >,
    "forwardedRef"
>;

/**
 * **DEPRECATED**: Please use `LabeledField` with `TextField` instead.
 *
 * A LabeledTextField is an element used to accept a single line of text
 * from the user paired with a label, description, and error field elements.
 *
 * @deprecated
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

export default React.forwardRef<HTMLInputElement, ExportProps>((props, ref) => (
    <LabeledTextField {...props} forwardedRef={ref} />
)) as React.ForwardRefExoticComponent<
    ExportProps & React.RefAttributes<HTMLInputElement>
>;

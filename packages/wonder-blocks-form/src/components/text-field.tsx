import * as React from "react";
import {StyleSheet} from "aphrodite";

import {IDProvider, addStyle} from "@khanacademy/wonder-blocks-core";
import {border, color, mix, spacing} from "@khanacademy/wonder-blocks-tokens";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";

import type {StyleType, AriaProps} from "@khanacademy/wonder-blocks-core";
import {OmitConstrained} from "../util/types";

export type TextFieldType = "text" | "password" | "email" | "number" | "tel";

type WithForwardRef = {
    forwardedRef: React.ForwardedRef<HTMLInputElement>;
};

const defaultErrorMessage = "This field is required.";

const StyledInput = addStyle("input");

type CommonProps = AriaProps & {
    /**
     * An optional unique identifier for the TextField.
     * If no id is specified, a unique id will be auto-generated.
     */
    id?: string;
    /**
     * The input value.
     */
    value: string;
    /**
     * The name for the input control. This is submitted along with
     * the form data.
     */
    name?: string;
    /**
     * Makes a read-only input field that cannot be focused. Defaults to false.
     */
    disabled: boolean;
    /**
     * Provide a validation for the input value.
     * Return a string error message or null | void for a valid input.
     */
    validate?: (value: string) => string | null | void;
    /**
     * Called right after the TextField input is validated.
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
     * Change the default focus ring color to fit a dark background.
     */
    light: boolean;
    /**
     * Custom styles for the input.
     */
    style?: StyleType;
    /**
     * Optional test ID for e2e testing.
     */
    testId?: string;
    /**
     * Specifies if the input field is read-only.
     */
    readOnly?: boolean;
    /**
     * Whether this field should autofocus on page load.
     */
    autoFocus?: boolean;
    /**
     * Specifies if the input field allows autocomplete.
     */
    autoComplete?: string;
};

type OtherInputProps = CommonProps & {
    type: "text" | "password" | "email" | "tel";
};

// Props that are only available for inputs of type "number".
export type NumericInputProps = {
    type: "number";
    /**
     * The minimum numeric value for the input.
     */
    min?: number;
    /**
     * The maximum numeric value for the input.
     */
    max?: number;
    /**
     * The numeric value to increment or decrement by.
     * Requires the input to be multiples of this value.
     */
    step?: number;
};

type FullNumericInputProps = CommonProps & NumericInputProps;
type Props = OtherInputProps | FullNumericInputProps;
type PropsWithForwardRef = Props & WithForwardRef;

type DefaultProps = {
    type: PropsWithForwardRef["type"];
    disabled: PropsWithForwardRef["disabled"];
    light: PropsWithForwardRef["light"];
};

type State = {
    /**
     * Displayed when the validation fails.
     */
    error: string | null | undefined;
};

/**
 * A TextField is an element used to accept a single line of text from the user.
 */
class TextField extends React.Component<PropsWithForwardRef, State> {
    static defaultProps: DefaultProps = {
        type: "text",
        disabled: false,
        light: false,
    };

    constructor(props: PropsWithForwardRef) {
        super(props);
        if (props.validate && props.value !== "") {
            // Ensures error is updated on unmounted server-side renders
            this.state.error = props.validate(props.value) || null;
        }
    }

    state: State = {
        error: null,
    };

    componentDidMount() {
        if (this.props.value !== "") {
            this.maybeValidate(this.props.value);
        }
    }

    maybeValidate: (newValue: string) => void = (newValue) => {
        const {validate, onValidate, required} = this.props;

        if (validate) {
            const maybeError = validate(newValue) || null;
            this.setState({error: maybeError}, () => {
                if (onValidate) {
                    onValidate(maybeError);
                }
            });
        } else if (required) {
            const requiredString =
                typeof required === "string" ? required : defaultErrorMessage;
            const maybeError = newValue ? null : requiredString;
            this.setState({error: maybeError}, () => {
                if (onValidate) {
                    onValidate(maybeError);
                }
            });
        }
    };

    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => unknown = (
        event,
    ) => {
        const {onChange} = this.props;
        const newValue = event.target.value;
        this.maybeValidate(newValue);
        onChange(newValue);
    };

    handleFocus: (event: React.FocusEvent<HTMLInputElement>) => unknown = (
        event,
    ) => {
        const {onFocus} = this.props;
        if (onFocus) {
            onFocus(event);
        }
    };

    handleBlur: (event: React.FocusEvent<HTMLInputElement>) => unknown = (
        event,
    ) => {
        const {onBlur} = this.props;
        if (onBlur) {
            onBlur(event);
        }
    };

    getStyles = (): StyleType => {
        const {disabled, light} = this.props;
        const {error} = this.state;
        // Base styles are the styles that apply regardless of light mode
        const baseStyles = [styles.input, typographyStyles.LabelMedium];
        const defaultStyles = [
            styles.default,
            !disabled && styles.defaultFocus,
            disabled && styles.disabled,
            !!error && styles.error,
        ];
        const lightStyles = [
            styles.light,
            !disabled && styles.lightFocus,
            disabled && styles.lightDisabled,
            !!error && styles.lightError,
        ];
        return [...baseStyles, ...(light ? lightStyles : defaultStyles)];
    };

    render(): React.ReactNode {
        const {
            id,
            type,
            value,
            name,
            disabled,
            onKeyDown,
            placeholder,
            style,
            testId,
            readOnly,
            autoFocus,
            autoComplete,
            forwardedRef,
            // The following props are being included here to avoid
            // passing them down to the otherProps spread
            /* eslint-disable @typescript-eslint/no-unused-vars */
            light,
            onFocus,
            onBlur,
            onValidate,
            validate,
            onChange,
            required,
            /* eslint-enable @typescript-eslint/no-unused-vars */
            // Should only include Aria related props
            ...otherProps
        } = this.props;

        return (
            <IDProvider id={id} scope="text-field">
                {(uniqueId) => (
                    <StyledInput
                        style={[this.getStyles(), style]}
                        id={uniqueId}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        name={name}
                        aria-disabled={disabled}
                        onChange={this.handleChange}
                        onKeyDown={disabled ? undefined : onKeyDown}
                        onFocus={this.handleFocus} // TextField can be focused if disabled
                        onBlur={this.handleBlur} // TextField can be blurred if disabled
                        data-testid={testId}
                        readOnly={readOnly || disabled} // Set readOnly also if it is disabled, otherwise users can type in the field
                        autoFocus={autoFocus}
                        autoComplete={autoComplete}
                        ref={forwardedRef}
                        {...otherProps}
                        aria-invalid={this.state.error ? "true" : "false"}
                    />
                )}
            </IDProvider>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 40,
        borderRadius: border.radius.medium_4,
        boxSizing: "border-box",
        paddingLeft: spacing.medium_16,
        margin: 0,
    },
    default: {
        background: color.white,
        border: `1px solid ${color.offBlack50}`,
        color: color.offBlack,
        "::placeholder": {
            color: color.offBlack64,
        },
    },
    defaultFocus: {
        ":focus-visible": {
            borderColor: color.blue,
            outline: `1px solid ${color.blue}`,
            // Negative outline offset so it focus outline is not cropped off if
            // an ancestor element has overflow: hidden
            outlineOffset: "-2px",
        },
    },
    error: {
        background: color.fadedRed8,
        border: `1px solid ${color.red}`,
        color: color.offBlack,
        "::placeholder": {
            color: color.offBlack64,
        },
        ":focus-visible": {
            outlineColor: color.red,
            borderColor: color.red,
        },
    },
    disabled: {
        background: color.offWhite,
        border: `1px solid ${color.offBlack16}`,
        color: color.offBlack64,
        "::placeholder": {
            color: color.offBlack64,
        },
        cursor: "not-allowed",
        ":focus-visible": {
            outline: `2px solid ${color.offBlack32}`,
            outlineOffset: "-3px",
        },
    },
    light: {
        background: color.white,
        border: `1px solid ${color.offBlack16}`,
        color: color.offBlack,
        "::placeholder": {
            color: color.offBlack64,
        },
    },
    lightFocus: {
        ":focus-visible": {
            outline: `3px solid ${color.blue}`,
            outlineOffset: "-4px",
            borderColor: color.white,
        },
    },
    lightDisabled: {
        backgroundColor: "transparent",
        border: `1px solid ${color.white32}`,
        color: color.white64,
        "::placeholder": {
            color: color.white64,
        },
        cursor: "not-allowed",
        ":focus-visible": {
            borderColor: mix(color.white32, color.blue),
            outline: `3px solid ${color.fadedBlue}`,
            outlineOffset: "-4px",
        },
    },
    lightError: {
        background: color.fadedRed8,
        border: `1px solid ${color.white}`,
        outline: `2px solid ${color.red}`,
        outlineOffset: "-3px",
        color: color.offBlack,
        "::placeholder": {
            color: color.offBlack64,
        },
        ":focus-visible": {
            outline: `3px solid ${color.red}`,
            outlineOffset: "-4px",
        },
    },
});

type ExportProps = OmitConstrained<
    JSX.LibraryManagedAttributes<
        typeof TextField,
        React.ComponentProps<typeof TextField>
    >,
    "forwardedRef"
>;

/**
 * A TextField is an element used to accept a single line of text from the user.
 *
 * ### Usage
 *
 * ```jsx
 * import {TextField} from "@khanacademy/wonder-blocks-form";
 *
 * const [value, setValue] = React.useState("");
 *
 * <TextField
 *     id="some-unique-text-field-id"
 *     value={value}
 *     onChange={setValue}
 * />
 * ```
 */
export default React.forwardRef<HTMLInputElement, ExportProps>((props, ref) => (
    <TextField {...props} forwardedRef={ref} />
)) as React.ForwardRefExoticComponent<
    ExportProps & React.RefAttributes<HTMLInputElement>
>;

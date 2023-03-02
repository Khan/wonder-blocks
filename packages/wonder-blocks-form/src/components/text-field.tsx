import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import type {StyleType, AriaProps} from "@khanacademy/wonder-blocks-core";

export type TextFieldType = "text" | "password" | "email" | "number" | "tel";

type WithForwardRef = {
    forwardedRef: React.ForwardedRef<HTMLInputElement>;
};

const defaultErrorMessage = "This field is required.";

type Props = AriaProps & {
    /**
     * The unique identifier for the input.
     */
    id: string;
    /**
     * Determines the type of input. Defaults to text.
     */
    type: TextFieldType;
    /**
     * The input value.
     */
    value: string;
    /**
     * Makes a read-only input field that cannot be focused. Defaults to false.
     */
    disabled: boolean;
    /**
     * Provide a validation for the input value.
     * Return a string error message or null | void for a valid input.
     */
    validate?: (value: string) => string | null | undefined;
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
     * Specifies if the input field allows autocomplete.
     */
    autoComplete?: string;
};

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
    /**
     * The user focuses on this field.
     */
    focused: boolean;
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
        focused: false,
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

    render(): React.ReactElement {
        const {
            id,
            type,
            value,
            disabled,
            onKeyDown,
            placeholder,
            light,
            style,
            testId,
            readOnly,
            autoComplete,
            forwardedRef,
            // The following props are being included here to avoid
            // passing them down to the otherProps spread
            /* eslint-disable @typescript-eslint/no-unused-vars */
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
            <input
                // @ts-expect-error: we shouldn't be passing `style` to `css()`
                // here b/c `style` allows nested arrays of styles, but `css()`
                // only allows a flat array.
                className={css([
                    styles.input,
                    typographyStyles.LabelMedium,
                    styles.default,
                    // Prioritizes disabled, then focused, then error (if any)
                    disabled
                        ? styles.disabled
                        : this.state.focused
                        ? [styles.focused, light && styles.defaultLight]
                        : this.state.error && [
                              styles.error,
                              light && styles.errorLight,
                          ],
                    style && style,
                ])}
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={this.handleChange}
                onKeyDown={onKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                data-test-id={testId}
                readOnly={readOnly}
                autoComplete={autoComplete}
                ref={forwardedRef}
                {...otherProps}
            />
        );
    }
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 40,
        borderRadius: 4,
        boxSizing: "border-box",
        paddingLeft: Spacing.medium_16,
        margin: 0,
        outline: "none",
        boxShadow: "none",
    },
    default: {
        background: Color.white,
        border: `1px solid ${Color.offBlack16}`,
        color: Color.offBlack,
        "::placeholder": {
            color: Color.offBlack64,
        },
    },
    error: {
        background: `${mix(fade(Color.red, 0.06), Color.white)}`,
        border: `1px solid ${Color.red}`,
        color: Color.offBlack,
        "::placeholder": {
            color: Color.offBlack64,
        },
    },
    disabled: {
        background: Color.offWhite,
        border: `1px solid ${Color.offBlack16}`,
        color: Color.offBlack64,
        "::placeholder": {
            color: Color.offBlack32,
        },
    },
    focused: {
        background: Color.white,
        border: `1px solid ${Color.blue}`,
        color: Color.offBlack,
        "::placeholder": {
            color: Color.offBlack64,
        },
    },
    defaultLight: {
        boxShadow: `0px 0px 0px 1px ${Color.blue}, 0px 0px 0px 2px ${Color.white}`,
    },
    errorLight: {
        boxShadow: `0px 0px 0px 1px ${Color.red}, 0px 0px 0px 2px ${Color.white}`,
    },
});

type ExportProps = Omit<
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

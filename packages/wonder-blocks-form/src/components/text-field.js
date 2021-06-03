// @flow

import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import type {StyleType, AriaProps} from "@khanacademy/wonder-blocks-core";

type TextFieldType = "text" | "password" | "email" | "number" | "tel";

type Props = {|
    ...AriaProps,

    /**
     * The unique identifier for the input.
     */
    id: string,

    /**
     * Determines the type of input. Defaults to text.
     */
    type: TextFieldType,

    /**
     * The input value.
     */
    value: string,

    /**
     * Makes a read-only input field that cannot be focused. Defaults to false.
     */
    disabled: boolean,

    /**
     * Provide a validation for the input value.
     * Return a string error message or null | void for a valid input.
     */
    validation?: (value: string) => ?string,

    /**
     * Called right after the TextField input is validated.
     */
    onValidation?: (errorMessage: ?string) => mixed,

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
     * Whether this component is required.
     */
    required?: boolean,

    /**
     * Change the default focus ring color to fit a dark background.
     */
    light: boolean,

    /**
     * Custom styles for the input.
     */
    style?: StyleType,

    /**
     * Optional test ID for e2e testing.
     */
    testId?: string,
|};

type DefaultProps = {|
    type: $PropertyType<Props, "type">,
    disabled: $PropertyType<Props, "disabled">,
    light: $PropertyType<Props, "light">,
|};

type State = {|
    /**
     * Displayed when the validation fails.
     */
    error: ?string,

    /**
     * The user focuses on this field.
     */
    focused: boolean,
|};

/**
 * A TextField is an element used to accept a single line of text from the user.
 */
export default class TextField extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        type: "text",
        disabled: false,
        light: false,
    };

    constructor(props: Props) {
        super(props);
        if (props.validation) {
            // Ensures error is updated on unmounted server-side renders
            this.state.error = props.validation(props.value) || null;
        }
    }

    state: State = {
        error: null,
        focused: false,
    };

    componentDidMount() {
        this.maybeValidate(this.props.value);
    }

    maybeValidate: (newValue: string) => void = (newValue) => {
        const {validation, onValidation} = this.props;
        if (validation) {
            const maybeError = validation(newValue) || null;
            this.setState({error: maybeError});
            if (onValidation) {
                onValidation(maybeError);
            }
        }
    };

    handleOnChange: (event: SyntheticInputEvent<HTMLInputElement>) => mixed = (
        event,
    ) => {
        const {onChange} = this.props;
        const newValue = event.target.value;
        this.maybeValidate(newValue);
        onChange(newValue);
    };

    handleOnFocus: (event: SyntheticFocusEvent<HTMLInputElement>) => mixed = (
        event,
    ) => {
        const {onFocus} = this.props;
        this.setState({
            focused: true,
        });
        if (onFocus) {
            onFocus(event);
        }
    };

    handleOnBlur: (event: SyntheticFocusEvent<HTMLInputElement>) => mixed = (
        event,
    ) => {
        const {onBlur} = this.props;
        this.setState({
            focused: false,
        });
        if (onBlur) {
            onBlur(event);
        }
    };

    render(): React.Node {
        const {
            id,
            type,
            value,
            disabled,
            onKeyDown,
            placeholder,
            required,
            light,
            style,
            testId,
            // The following props are being included here to avoid
            // passing them down to the otherProps spread
            /* eslint-disable no-unused-vars */
            onFocus,
            onBlur,
            onValidation,
            validation,
            onChange,
            /* eslint-enable no-unused-vars */
            // Should only include Aria related props
            ...otherProps
        } = this.props;
        return (
            <input
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
                onChange={this.handleOnChange}
                onKeyDown={onKeyDown}
                onFocus={this.handleOnFocus}
                onBlur={this.handleOnBlur}
                required={required}
                data-test-id={testId}
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

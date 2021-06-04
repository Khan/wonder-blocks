// @flow

import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";

type TextFieldType = "text" | "password" | "email" | "number" | "tel";

type Props = {|
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
     * Called when the value has changed.
     */
    onChange: (newValue: string) => mixed,
|};

type DefaultProps = {|
    type: $PropertyType<Props, "type">,
    disabled: $PropertyType<Props, "disabled">,
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
    };

    state: State = {
        error: null,
        focused: false,
    };

    handleOnChange: (event: SyntheticInputEvent<HTMLInputElement>) => mixed = (
        event,
    ) => {
        const {onChange} = this.props;
        onChange(event.target.value);
    };

    handleOnFocus: (
        event: SyntheticFocusEvent<HTMLInputElement>,
    ) => mixed = () => {
        this.setState({
            focused: true,
        });
    };

    handleOnBlur: (
        event: SyntheticFocusEvent<HTMLInputElement>,
    ) => mixed = () => {
        this.setState({
            focused: false,
        });
    };

    render(): React.Node {
        const {id, type, value, disabled} = this.props;
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
                        ? styles.focused
                        : this.state.error && styles.error,
                ])}
                id={id}
                type={type}
                placeholder="Placeholder"
                value={value}
                disabled={disabled}
                onChange={this.handleOnChange}
                onFocus={this.handleOnFocus}
                onBlur={this.handleOnBlur}
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
        background: "rgba(217, 41, 22, 0.06)",
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
});

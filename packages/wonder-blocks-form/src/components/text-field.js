// @flow

import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";

type Props = {|
    /**
     * Makes a read-only input field that cannot be focused.
     */
    disabled: boolean,
|};

type DefaultProps = {|
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
        disabled: false,
    };

    state: State = {
        error: null,
        focused: false,
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
        const {disabled} = this.props;
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
                placeholder="Placeholder"
                disabled={disabled}
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

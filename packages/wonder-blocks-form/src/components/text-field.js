// @flow

import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";

type State = {|
    enabled: boolean,
    disabled: boolean,
    error: ?string,
    focused: boolean,
|};

export default class TextField extends React.Component<{||}, State> {
    state: State = {
        enabled: true,
        disabled: false,
        error: null,
        focused: false,
    };

    handleOnFocus: () => void = () => {
        this.setState({
            focused: true,
        });
    };

    handleOnBlur: () => void = () => {
        this.setState({
            focused: false,
        });
    };

    render(): React.Node {
        return (
            <input
                className={css([
                    styles.input,
                    typographyStyles.LabelMedium,
                    this.state.enabled && styles.default,
                    this.state.disabled && styles.disabled,
                    this.state.error && styles.error,
                    this.state.focused && styles.focused,
                ])}
                placeholder="Placeholder"
                disabled={this.state.disabled}
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

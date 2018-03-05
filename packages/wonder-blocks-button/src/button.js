// @flow
import React, {Component} from "react";
import {StyleSheet, css} from "aphrodite";

import Color from "wonder-blocks-color";
import {LabelLarge} from "wonder-blocks-typography";

type Props = {
    color?: "blue" | "green" | "gold" | "red",
    onClick?: (e: SyntheticEvent) => void,
};

export default class Button extends Component {
    props: Props;

    render() {
        return (
            <a
                className={css(
                    styles.button,
                    styles[this.props.color || "blue"],
                )}
                onClick={this.props.onClick}
            >
                <LabelLarge>Hello, world!</LabelLarge>
            </a>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        display: "inline-block",
        minHeight: 40,
        maxHeight: 40,
        color: Color.white,
        padding: "10px 16px",
        boxSizing: "border-box",
        borderRadius: 4,
        cursor: "pointer",
    },
    blue: {
        backgroundColor: Color.blue,
    },
    green: {
        backgroundColor: Color.green,
    },
    gold: {
        backgroundColor: Color.gold,
    },
    red: {
        backgroundColor: Color.red,
    },
});

// @flow
import React, {Component} from "react";
import {StyleSheet, css} from "aphrodite";

import Color from "wonder-blocks-color";
import {Label} from "wonder-blocks-typography";

type Props = {
    color?: "blue" | "green" | "gold" | "red",
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
            >
                <Label.Large>Hello, world!</Label.Large>
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

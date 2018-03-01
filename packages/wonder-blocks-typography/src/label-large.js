// @flow
import React, {Component} from "react";
import {css} from "aphrodite";

import styles from "./styles.js";

import type {Props} from "./types.js";

export default class LabelLarge extends Component {
    props: Props;

    render() {
        return (
            <span className={css(styles.LabelLarge)}>
                {this.props.children}
            </span>
        );
    }
}

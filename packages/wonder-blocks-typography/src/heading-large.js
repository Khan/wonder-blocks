// @flow
import React, {Component} from "react";
import {css} from "aphrodite";

import styles from "./styles.js";

import type {Props} from "./types.js";

export default class HeadingLarge extends Component {
    props: Props;

    render() {
        return (
            <h1 className={css(styles.HeadingLarge)}>{this.props.children}</h1>
        );
    }
}

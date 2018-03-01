// @flow
import React, {Component} from "react";
import {css} from "aphrodite";

import styles from "./styles.js";

import type {Props} from "./types.js";

export default class Title extends Component {
    props: Props;

    render() {
        return <h1 className={css(styles.Title)}>{this.props.children}</h1>;
    }
}

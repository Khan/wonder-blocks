// @flow
import React, {Component} from "react";
import {Text} from "wonder-blocks-core";

import styles from "../util/styles.js";

import type {Props} from "../util/types.js";

export default class Caption extends Component<Props> {
    static defaultProps = {
        tag: "span",
    };

    render() {
        const {style, children, ...otherProps} = this.props;
        return (
            <Text {...otherProps} style={[styles.Caption, style]}>
                {children}
            </Text>
        );
    }
}

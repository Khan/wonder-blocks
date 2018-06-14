// @flow
import React, {Component} from "react";
import {Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles.js";

import type {Props} from "../util/types.js";

export default class HeadingLarge extends Component<Props> {
    static defaultProps = {
        tag: "h2",
    };

    render() {
        const {style, children, ...otherProps} = this.props;
        return (
            <Text {...otherProps} style={[styles.HeadingLarge, style]}>
                {children}
            </Text>
        );
    }
}

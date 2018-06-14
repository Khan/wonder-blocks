// @flow
import React, {Component} from "react";
import {Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles.js";

import type {Props} from "../util/types.js";

export default class HeadingSmall extends Component<Props> {
    static defaultProps = {
        tag: "h4",
    };

    render() {
        const {style, children, ...otherProps} = this.props;
        return (
            <Text {...otherProps} style={[styles.HeadingSmall, style]}>
                {children}
            </Text>
        );
    }
}

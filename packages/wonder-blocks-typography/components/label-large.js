// @flow
import React, {Component} from "react";
import {Text} from "wonder-blocks-core";

import styles from "../util/styles.js";

import type {Props} from "../util/types.js";

export default class LabelLarge extends Component<Props> {
    static defaultProps = {
        tag: "span",
    };

    render() {
        const {tag, style, children} = this.props;
        return (
            <Text tag={tag} style={[styles.LabelLarge, style]}>
                {children}
            </Text>
        );
    }
}

// @flow
import React, {Component} from "react";
import {Text} from "wonder-blocks-core";

import styles from "../util/styles.js";

import type {Props} from "../util/types.js";

export default class HeadingMedium extends Component<Props> {
    static defaultProps = {
        tag: "h3",
    };

    render() {
        const {id, tag, style, children} = this.props;
        return (
            <Text id={id} tag={tag} style={[styles.HeadingMedium, style]}>
                {children}
            </Text>
        );
    }
}

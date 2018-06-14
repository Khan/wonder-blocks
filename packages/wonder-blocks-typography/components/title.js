// @flow
import React, {Component} from "react";
import {Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles.js";

import type {Props} from "../util/types.js";

// TODO(alex): Once style prop validation works, if all of the style prop flow
//             types are the same then switch to using functional components.
export default class Title extends Component<Props> {
    static defaultProps = {
        tag: "h1",
    };

    render() {
        const {style, children, ...otherProps} = this.props;
        return (
            <Text {...otherProps} style={[styles.Title, style]}>
                {children}
            </Text>
        );
    }
}

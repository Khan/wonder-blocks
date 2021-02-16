// @flow
import * as React from "react";
import {Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles.js";

import type {Props} from "../util/types.js";

type DefaultProps = {|
    tag: $PropertyType<Props, "tag">,
|};

export default class HeadingMedium extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        tag: "h3",
    };

    render(): React.Node {
        const {style, children, ...otherProps} = this.props;
        return (
            <Text {...otherProps} style={[styles.HeadingMedium, style]}>
                {children}
            </Text>
        );
    }
}

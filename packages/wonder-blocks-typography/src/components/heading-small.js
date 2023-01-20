// @flow
import * as React from "react";
import {Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

import type {Props} from "../util/types";

type DefaultProps = {|
    tag: $PropertyType<Props, "tag">,
|};

export default class HeadingSmall extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        tag: "h4",
    };

    render(): React.Node {
        const {style, children, ...otherProps} = this.props;
        return (
            <Text {...otherProps} style={[styles.HeadingSmall, style]}>
                {children}
            </Text>
        );
    }
}

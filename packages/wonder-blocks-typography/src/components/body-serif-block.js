// @flow
import * as React from "react";
import {Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

import type {Props} from "../util/types";

type DefaultProps = {|
    tag: $PropertyType<Props, "tag">,
|};

export default class BodySerifBlock extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        tag: "span",
    };

    render(): React.Node {
        const {style, children, ...otherProps} = this.props;
        return (
            <Text {...otherProps} style={[styles.BodySerifBlock, style]}>
                {children}
            </Text>
        );
    }
}

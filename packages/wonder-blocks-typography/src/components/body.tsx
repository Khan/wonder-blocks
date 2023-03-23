import * as React from "react";
import {Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

import type {Props} from "../util/types";

type DefaultProps = {
    tag: Props["tag"];
};

export default class Body extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        tag: "span",
    };

    render(): React.ReactNode {
        const {style, children, ...otherProps} = this.props;
        return (
            <Text {...otherProps} style={[styles.Body, style]}>
                {children}
            </Text>
        );
    }
}

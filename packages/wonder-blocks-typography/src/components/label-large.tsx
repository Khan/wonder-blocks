import * as React from "react";
import {Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

import type {Props} from "../util/types";

type DefaultProps = {
    tag: Props["tag"];
};

export default class LabelLarge extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        tag: "span",
    };

    render(): React.ReactElement {
        const {style, children, ...otherProps} = this.props;
        return (
            <Text {...otherProps} style={[styles.LabelLarge, style]}>
                {children}
            </Text>
        );
    }
}

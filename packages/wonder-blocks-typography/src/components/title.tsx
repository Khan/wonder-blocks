import * as React from "react";
import {Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

import type {Props} from "../util/types";

type DefaultProps = {
    tag: Props["tag"];
};

// TODO(alex): Once style prop validation works, if all of the style prop TypeScript
//             types are the same then switch to using functional components.
export default class Title extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        tag: "h1",
    };

    render(): React.ReactNode {
        const {style, children, ...otherProps} = this.props;
        return (
            <Text {...otherProps} style={[styles.Title, style]}>
                {children}
            </Text>
        );
    }
}

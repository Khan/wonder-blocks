// @flow
import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {|
    size: number,
    style?: StyleType,
|};

/**
 * A component for inserting fixed space between components.
 *
 * Assumes parent is a View.
 */
export default class Strut extends React.Component<Props> {
    render(): React.Node {
        const {size, style} = this.props;
        return (
            <View style={style}>
                <View aria-hidden="true" style={strutStyle(size)} />
            </View>
        );
    }
}

const strutStyle = (size) => {
    return {
        width: size,
        MsFlexBasis: size,
        MsFlexPreferredSize: size,
        WebkitFlexBasis: size,
        flexBasis: size,
        flexShrink: 0,
    };
};

// @flow
import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";

type Props = {|
    size: number,
|};

/**
 * A component for inserting fixed space between components.
 *
 * Assumes parent is a View.
 */
export default class Strut extends React.Component<Props> {
    render(): React.Node {
        return <View aria-hidden="true" style={strutStyle(this.props.size)} />;
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

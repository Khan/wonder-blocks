// @flow
/**
 * A component for inserting fixed space between components.
 *
 * Assumes parent is a View.
 */
import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";

type Props = {
    size: number,
};

export default class Strut extends React.Component<Props> {
    render() {
        return <View style={flexBasis(this.props.size)} />;
    }
}

const flexBasis = (size) => {
    return {
        MsFlexBasis: size,
        MsFlexPreferredSize: size,
        WebkitFlexBasis: size,
        flexBasis: size,
        flexShrink: 0,
    };
};

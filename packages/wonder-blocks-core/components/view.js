// @flow
import React from "react";

import {processStyleList} from "../util/util.js";

import type {Props} from "../util/types.js";

export default class View extends React.Component<Props> {
    props: Props;

    render() {
        const {children, style, ...otherProps} = this.props;
        const styleAttributes = processStyleList(style);

        return (
            <div
                {...otherProps}
                style={styleAttributes.style}
                className={styleAttributes.className}
            >
                {children}
            </div>
        );
    }
}

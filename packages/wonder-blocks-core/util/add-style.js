// @flow
import * as React from "react";

import {processStyleList} from "./util.js";

export function addStyle<T: Object>(
    Component: React.ComponentType<T> | string,
): React.ComponentType<T & {style: any}> {
    return function WrapperComponent(props: T & {style: any}) {
        const {style, ...otherProps} = props;
        const {className, style: inlineStyles} = processStyleList(style);
        return (
            <Component
                {...otherProps}
                className={className}
                style={inlineStyles}
            />
        );
    };
}

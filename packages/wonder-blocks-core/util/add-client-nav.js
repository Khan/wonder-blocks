// @flow
import * as React from "react";

export default function addClientNav<T: Object, U: Object>(
    Component: React.ComponentType<T>,
    Link: React.ComponentType<U>,
): React.ComponentType<T & {clientNav?: any}> {
    function ClientNavWrapper(props: T & {clientNav?: any}) {
        const {clientNav, ...otherProps} = props;
        if (clientNav) {
            return <Component {...otherProps} tag={Link} />;
        } else {
            return <Component {...otherProps} />;
        }
    }

    return ClientNavWrapper;
}

import * as React from "react";
import {NavigationTabsProps} from "./types";
import {NavigationTabs} from "./navigation-tabs";

export const ResponsiveNavigationTabs = React.forwardRef(
    function ResponsiveNavigationTabs(
        props: NavigationTabsProps,
        ref: React.ForwardedRef<HTMLElement>,
    ) {
        return (
            <NavigationTabs {...props} ref={ref}>
                {props.children}
            </NavigationTabs>
        );
    },
);

import * as React from "react";
import {NavigationTabItemProps} from "./types";
import {NavigationTabItem} from "./navigation-tab-item";

export const ResponsiveNavigationTabItem = React.forwardRef(
    function ResponsiveNavigationTabItem(
        props: NavigationTabItemProps,
        ref: React.ForwardedRef<HTMLLIElement>,
    ) {
        return <NavigationTabItem {...props} ref={ref} />;
    },
);

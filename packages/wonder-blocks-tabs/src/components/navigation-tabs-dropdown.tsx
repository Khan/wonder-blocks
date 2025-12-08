import * as React from "react";
import {ActionItem, ActionMenu} from "@khanacademy/wonder-blocks-dropdown";
import {NavigationTabsProps} from "./types";

function getLabelFromNavigationTabItem(navTabItem: React.ReactElement): string {
    const link = navTabItem.props.children;
    const label = link.props.children;
    return label;
}

function getHrefFromNavigationTabItem(navTabItem: React.ReactElement): string {
    const link = navTabItem.props.children;
    const href = link.props.href;
    return href;
}

export const NavigationTabsDropdown = React.forwardRef(
    function NavigationTabsDropdown(
        props: NavigationTabsProps,
        ref: React.ForwardedRef<HTMLElement>,
    ) {
        const children = Array.isArray(props.children)
            ? props.children
            : [props.children];
        return (
            <ActionMenu menuText="Navigation Tabs" {...props}>
                {children.map((navTabItem: React.ReactElement) => {
                    return (
                        <ActionItem
                            label={getLabelFromNavigationTabItem(navTabItem)}
                            href={getHrefFromNavigationTabItem(navTabItem)}
                            active={navTabItem.props.current}
                        />
                    );
                })}
            </ActionMenu>
        );
    },
);

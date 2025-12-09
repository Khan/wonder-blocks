import {addStyle} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import {
    border,
    breakpoint,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";
import {NavigationTabItemLinkProps, NavigationTabItemProps} from "./types";

const StyledLi = addStyle("li");

/**
 * A component for a tab item in NavigationTabs. It is used with a Link
 * component.
 *
 * ## Usage
 *
 * ```jsx
 * import {NavigationTab, NavigationTabItem} from "@khanacademy/wonder-blocks-tabs";
 * import Link from "@khanacademy/wonder-blocks-link";
 *
 * <NavigationTabs>
 *  <NavigationTabItem>
 *    <Link href="/link-1">Link 1</Link>
 *  </NavigationTabItem>
 *  <NavigationTabItem>
 *    <Link href="/link-2">Link 2</Link>
 *  </NavigationTabItem>
 * </NavigationTabs>
 * ```
 */
export const NavigationTabItem = React.forwardRef(function NavigationTabItem(
    props: NavigationTabItemProps,
    ref: React.ForwardedRef<HTMLLIElement>,
) {
    const {children, id, testId, current, style, ...otherProps} = props;

    function renderChildren() {
        const linkProps: NavigationTabItemLinkProps = {
            style: [
                typographyStyles.Body,
                styles.link,
                current && styles.currentLink,
            ],
            "aria-current": current ? "page" : undefined,
        };

        if (typeof children === "function") {
            return children(linkProps);
        }

        return React.cloneElement(children, linkProps);
    }

    return (
        <StyledLi
            id={id}
            data-testid={testId}
            style={[styles.root, current && styles.current, style]}
            ref={ref}
            {...otherProps}
        >
            {renderChildren()}
        </StyledLi>
    );
});

const styles = StyleSheet.create({
    root: {
        listStyle: "none",
        display: "inline-flex",
        [":has(a:hover)" as any]: {
            boxShadow: `inset 0 calc(${sizing.size_020}*-1) 0 0 ${semanticColor.core.border.instructive.default}`,
        },
        [":has(a:active)" as any]: {
            boxShadow: `inset 0 calc(${sizing.size_060}*-1) 0 0 ${semanticColor.core.border.instructive.strong}`,
        },
        paddingBlockStart: sizing.size_080,
        paddingBlockEnd: sizing.size_180,
        [breakpoint.mediaQuery.mdOrLarger]: {
            paddingBlockStart: sizing.size_200,
            paddingBlockEnd: sizing.size_240,
        },
    },
    current: {
        // Note: The current tab item underline style is provided by NavigationTabs.
        [":has(a:hover)" as any]: {
            // If it is current, remove hover underline since the tab is already
            // selected.
            boxShadow: "none",
        },
        [":has(a:active):not([aria-disabled=true])" as any]: {
            // If it is current, make sure there is no box shadow
            boxShadow: "none",
        },
    },
    currentLink: {
        color: semanticColor.link.rest,
        [":active:not([aria-disabled=true])" as any]: {
            // Make sure the current link doesn't change color when pressed
            color: semanticColor.link.rest,
        },
    },
    link: {
        display: "flex",
        margin: 0,
        color: semanticColor.core.foreground.neutral.subtle,
        paddingInline: 0,
        position: "relative",
        whiteSpace: "nowrap",
        textDecoration: "none",
        // NOTE: We use :not[aria-disabled] to avoid the hover styles to be
        // applied when the interactive element is disabled.
        [":hover:not([aria-disabled=true])" as any]: {
            textDecoration: "none",
            border: "none",
            outline: "none",
            color: semanticColor.link.hover,
            backgroundColor: "transparent",
        },
        // NOTE: We use :not[aria-disabled] to avoid the hover styles to be
        // applied when the interactive element is disabled.
        [":active:not([aria-disabled=true])" as any]: {
            textDecoration: "none",
            border: "none",
            outline: "none",
            color: semanticColor.link.press,
        },
        ":focus-visible": {
            color: semanticColor.link.rest,
            border: "none",
            outline: "none",
            boxShadow: `0 0 0 ${sizing.size_020} ${semanticColor.focus.inner}, 0 0 0 ${sizing.size_040} ${semanticColor.focus.outer}`,
            borderRadius: border.radius.radius_0,
        },
    },
});

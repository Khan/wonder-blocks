import {addStyle, AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import {
    border,
    breakpoint,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";

type NavigationTabItemLinkProps = {style: StyleType; "aria-current"?: "page"};

type Props = AriaProps & {
    /**
     * The `Link` to render for the navigation tab item.
     *
     * When a `Link` component is passed in for the `children` prop,
     * `NavigationTabItem` will inject props for the `Link`. For specific use
     * cases where the `Link` component is wrapped by another component (like a
     * `Tooltip` or `Popover`), a render function can be used instead. The
     * render function provides the Link props that should be applied to the
     * Link component. See example in the docs for more details.
     */
    children:
        | React.ReactElement
        | ((linkProps: NavigationTabItemLinkProps) => React.ReactElement);
    /**
     * An id for the root element.
     */
    id?: string;
    /**
     * Optional test ID for e2e testing.
     */
    testId?: string;
    /**
     * If the `NavigationTabItem` is the current page. If `true`, current
     * styling and aria-current=page will be applied to the Link.
     *
     * Note: NavigationTabs provides the styling for the current tab item.
     */
    current?: boolean;
    /**
     * Custom styles for overriding default styles. For custom link styling,
     * prefer applying the styles to the `Link` component. Note: The
     * `NavigationTabItem` will also set styles to the `Link` child component.
     */
    style?: StyleType;
};

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
    props: Props,
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
            boxShadow: `inset 0 calc(${sizing.size_020}*-1) 0 0 ${semanticColor.action.secondary.progressive.hover.foreground}`,
        },
        [":has(a:active)" as any]: {
            boxShadow: `inset 0 calc(${sizing.size_060}*-1) 0 0 ${semanticColor.action.secondary.progressive.press.foreground}`,
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
        color: semanticColor.action.secondary.progressive.default.foreground,
        [":active:not([aria-disabled=true])" as any]: {
            // Make sure the current link doesn't change color when pressed
            color: semanticColor.action.secondary.progressive.default
                .foreground,
        },
    },
    link: {
        display: "flex",
        margin: 0,
        color: semanticColor.text.primary,
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
            color: semanticColor.action.secondary.progressive.default
                .foreground,
            backgroundColor: "transparent",
        },
        // NOTE: We use :not[aria-disabled] to avoid the hover styles to be
        // applied when the interactive element is disabled.
        [":active:not([aria-disabled=true])" as any]: {
            textDecoration: "none",
            border: "none",
            outline: "none",
            color: semanticColor.action.secondary.progressive.press.foreground,
        },
        ":focus-visible": {
            color: semanticColor.action.secondary.progressive.default
                .foreground,
            border: "none",
            outline: "none",
            boxShadow: `0 0 0 ${sizing.size_020} ${semanticColor.focus.inner}, 0 0 0 ${sizing.size_040} ${semanticColor.focus.outer}`,
            borderRadius: border.radius.radius_0,
        },
    },
});

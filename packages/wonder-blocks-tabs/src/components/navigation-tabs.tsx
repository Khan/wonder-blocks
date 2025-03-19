import {addStyle, AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = AriaProps & {
    /**
     * The NavigationTabItem components to render.
     */
    children: React.ReactElement | Array<React.ReactElement>;
    /**
     * An id for the navigation element.
     */
    id?: string;
    /**
     * Optional test ID for e2e testing.
     */
    testId?: string;
    /**
     * Accessible label for the navigation element.
     *
     * It is important to provide a unique aria-label if there are multiple
     * navigation elements on the page.
     *
     * If there is a visual label for the navigation tabs already, use
     * `aria-labelledby` instead.
     */
    "aria-label"?: string;
    /**
     * If there is a visual label for the navigation tabs already, set
     * `aria-labelledby` to the `id` of the element that labels the navigation
     * tabs.
     */
    "aria-labelledby"?: string;
    /**
     * Custom styles for the elements in NavigationTabs.
     */
    styles?: {
        root?: StyleType;
        list?: StyleType;
    };
};

const StyledNav = addStyle("nav");
const StyledUl = addStyle("ul");

/**
 * The `NavigationTabs` component is a tabbed interface for link navigation.
 * The tabs are links and keyboard users can change tabs using tab.
 * The `NavigationTabs` component is used with `NavigationTabItem` and `Link`
 * components. If the tabs should not be links, see the `Tabs` component,
 * which implements different semantics and keyboard interactions.
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
export const NavigationTabs = React.forwardRef(function NavigationTabs(
    props: Props,
    ref: React.ForwardedRef<HTMLElement>,
) {
    const {
        id,
        testId,
        children,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        styles: stylesProp,
        ...otherProps
    } = props;
    return (
        <StyledNav
            id={id}
            data-testid={testId}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            ref={ref}
            style={[styles.nav, stylesProp?.root]}
            {...otherProps}
        >
            <StyledUl style={[styles.list, stylesProp?.list]}>
                {children}
            </StyledUl>
        </StyledNav>
    );
});

const styles = StyleSheet.create({
    nav: {
        overflowX: "auto",
    },
    list: {
        padding: 0,
        margin: 0,
        display: "flex",
        gap: sizing.size_200,
        flexWrap: "nowrap",
    },
});

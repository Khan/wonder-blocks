import {addStyle, AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {useTabIndicator} from "../hooks/use-tab-indicator";

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
     * - `root`: Styles the root `nav` element.
     * - `list`: Styles the underlying `ul` element that wraps the
     * `NavigationTabItem` components
     */
    styles?: {
        root?: StyleType;
        list?: StyleType;
    };

    /**
     * Whether to include animation in the `NavigationTabs`. This should be false
     * if the user has `prefers-reduced-motion` opted in. Defaults to `false`.
     */
    animated?: boolean;

    /**
     * The HTML tag to render. Defaults to `nav`.
     */
    tag?: keyof JSX.IntrinsicElements;
};

const StyledUl = addStyle("ul");
const StyledDiv = addStyle("div");

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
        animated = false,
        tag = "nav",
        ...otherProps
    } = props;

    const StyledTag = React.useMemo(() => addStyle(tag), [tag]);

    /**
     * Ref for the list element so we can observe when the size of the children
     * changes. This is necessary to update the underline position. We watch the
     * list instead of the nav element because the nav element is styled with
     * overflow-x: auto so if the list is wider than the nav, the nav won't
     * change size, but the list will.
     */
    const listRef = React.useRef<HTMLUListElement>(null);

    const isTabActive = React.useCallback(
        (navTabItemElement: Element): boolean => {
            // Check the link inside the NavigationTabItem to see if it has aria-current="page"
            return navTabItemElement.children[0]?.ariaCurrent === "page";
        },
        [],
    );

    const {indicatorProps} = useTabIndicator({
        animated,
        tabsContainerRef: listRef,
        isTabActive,
    });

    return (
        <StyledTag
            id={id}
            data-testid={testId}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            ref={ref}
            style={[styles.nav, stylesProp?.root]}
            {...otherProps}
        >
            {/* Wrap the contents so that any custom styles (like padding) set
            on the root doesn't affect the positioning of the underline indicator. */}
            <StyledDiv style={styles.contents}>
                <StyledUl style={[styles.list, stylesProp?.list]} ref={listRef}>
                    {children}
                </StyledUl>
                {/* Underline indicator for the current tab item. It is a sibling of
            the list so that it can slide between tab items. */}
                {<div {...indicatorProps} />}
            </StyledDiv>
        </StyledTag>
    );
});

const styles = StyleSheet.create({
    nav: {
        overflowX: "auto",
    },
    contents: {
        position: "relative",
    },
    list: {
        // Add horizontal padding for focus outline of first/last elements
        paddingInline: sizing.size_040,
        paddingBlock: sizing.size_0,
        margin: sizing.size_0,
        display: "flex",
        gap: sizing.size_160,
        flexWrap: "nowrap",
    },
});

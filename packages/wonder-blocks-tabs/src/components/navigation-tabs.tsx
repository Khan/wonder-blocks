import {
    addStyle,
    AriaProps,
    StyleType,
    useOnMountEffect,
    View,
} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
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
     * - `root`: Styles the root `nav` element.
     * - `list`: Styles the underlying `ul` element that wraps the
     * `NavigationTabItem` components
     */
    styles?: {
        root?: StyleType;
        list?: StyleType;
    };

    /**
     * Whether to include animation in the NavigationTabs. This should be false
     * if the user has `prefers-reduced-motion` opted in. Defaults to false.
     */
    animated?: boolean;
};

const StyledNav = addStyle("nav");
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
        ...otherProps
    } = props;

    /**
     * Ref for the list element so we can observe when the size of the children
     * changes. This is necessary to update the underline position. We watch the
     * list instead of the nav element because the nav element is styled with
     * overflow-x: auto so if the list is wider than the nav, the nav won't
     * change size, but the list will.
     */
    const listRef = React.useRef<HTMLUListElement>(null);

    /**
     * Determines if we should show the underline current indicator. We only
     * want to show it if the list has been measured at least once after the
     * initial aphrodite styles have loaded.
     */
    const indicatorIsReady = React.useRef(false);

    /**
     * The styles for the underline current indicator.
     */
    const [underlineStyle, setUnderlineStyle] = React.useState({
        left: 0,
        width: 0,
    });

    const updateUnderlineStyle = React.useCallback(() => {
        if (!listRef.current) {
            return;
        }

        // Find the active tab based on which link (child of NavigationTabItem) has
        // the aria-current set
        const activeTab = Array.from(listRef.current.children).find(
            (child) => child.children[0]?.ariaCurrent,
        );

        if (activeTab) {
            const tabRect = activeTab.getBoundingClientRect();
            const parentRect = listRef.current.getBoundingClientRect();
            const zoomFactor = parentRect.width / listRef.current.offsetWidth;

            // When calculating, we divide by the zoom factor so the underline
            // is proportional to the rest of the component
            const left = (tabRect.left - parentRect.left) / zoomFactor; // Get position relative to parent
            const width = tabRect.width / zoomFactor; // Use bounding width

            setUnderlineStyle({
                left,
                width,
            });
        }
    }, [setUnderlineStyle, listRef]);

    /**
     * On mount, set up the resize observer to watch the list element. We
     * recalculate the underline style when the list size changes.
     */
    useOnMountEffect(() => {
        if (!listRef.current) {
            return;
        }
        const observer = new ResizeObserver(([entry]) => {
            if (entry) {
                // Update underline style when the list size changes
                updateUnderlineStyle();
                if (!indicatorIsReady.current) {
                    // Mark indicator as ready to show
                    indicatorIsReady.current = true;
                }
            }
        });

        observer.observe(listRef.current);

        return () => {
            observer.disconnect();
        };
    });

    React.useEffect(() => {
        // Update the underline style when children change
        updateUnderlineStyle();
    }, [children, updateUnderlineStyle]);

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
            {/* Wrap the contents so that any custom styles (like padding) set
            on the root doesn't affect the positioning of the underline. */}
            <StyledDiv style={styles.contents}>
                <StyledUl style={[styles.list, stylesProp?.list]} ref={listRef}>
                    {children}
                </StyledUl>
                {/* Underline indicator for the current tab item. It is a sibling of
            the list so that it can slide between tab items. We only show it
            once it is ready so that we don't show the indicator re-positioning
            itself after aphrodite styles are first loaded in */}
                {indicatorIsReady.current && (
                    <View
                        style={[
                            {
                                left: `${underlineStyle.left}px`,
                                width: `${underlineStyle.width}px`,
                            },
                            styles.currentUnderline,
                            animated && styles.underlineTransition,
                        ]}
                        role="presentation"
                    />
                )}
            </StyledDiv>
        </StyledNav>
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
        paddingInline: sizing.size_050,
        paddingBlock: sizing.size_0,
        margin: sizing.size_0,
        display: "flex",
        gap: sizing.size_200,
        flexWrap: "nowrap",
    },
    currentUnderline: {
        position: "absolute",
        bottom: 0,
        height: sizing.size_050,
        backgroundColor:
            semanticColor.action.secondary.progressive.default.foreground,
    },
    underlineTransition: {
        transition: "left 0.3s ease, width 0.3s ease",
    },
});

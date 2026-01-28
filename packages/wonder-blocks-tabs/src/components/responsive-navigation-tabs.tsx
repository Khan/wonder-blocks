import * as React from "react";
import {StyleSheet} from "aphrodite";
import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import {
    NavigationTabsDropdown,
    type NavigationTabsDropdownProps,
} from "./navigation-tabs-dropdown";
import {NavigationTabs, type NavigationTabsProps} from "./navigation-tabs";
import {NavigationTabItem} from "./navigation-tab-item";
import {useResponsiveLayout} from "../hooks/use-responsive-layout";

export type ResponsiveNavigationTabItem = {
    /**
     * The label of the navigation tab.
     */
    label: string;
    /**
     * The id of the navigation tab.
     */
    id: string;
    /**
     * The URL to navigate to.
     */
    href: string;
    /**
     * Optional icon to display in the navigation tab. Should be a PhosphorIcon
     * or Icon component.
     */
    icon?: React.ReactElement;
    /**
     * Optional aria-label for the navigation tab. This will be used as the
     * accessible label for the tab link or menu item.
     */
    "aria-label"?: string;
    /**
     * Optional test ID for e2e testing of the tab link or menu item.
     */
    testId?: string;
};

type Props = {
    /**
     * A unique id for the component.
     *
     * Here is how the id is used for the different elements in the component:
     * - The root will have an id of `${id}`
     *
     * To set the id of the navigation tabs or dropdown, set the `id` prop in
     * the props: `tabsProps` or `dropdownProps`.
     */
    id?: string;

    /**
     * Optional test ID for e2e testing.
     *
     * Here is how the test id is used for the different elements in the component:
     * - The root will have a testId of `${testId}`
     *
     * To set the test id of the navigation tabs or dropdown, set the `testId`
     * prop in the props: `tabsProps` or `dropdownProps`.
     */
    testId?: string;

    /**
     * The navigation tabs to render.
     */
    tabs: ResponsiveNavigationTabItem[];

    /**
     * The id of the tab that is selected (current page).
     */
    selectedTabId: string;

    /**
     * Called when a navigation tab is selected.
     */
    onTabSelected?: (id: string) => void;

    /**
     * Called when the layout changes between NavigationTabs and
     * NavigationTabsDropdown.
     */
    onLayoutChange?: (layout: "tabs" | "dropdown") => void;

    /**
     * Additional props to pass to the NavigationTabs component when it is used.
     *
     * Note: This prop doesn't include the props that are available on the
     * ResponsiveNavigationTabs component already.
     */
    tabsProps?: Omit<
        NavigationTabsProps,
        "children" | "aria-label" | "aria-labelledby" | "tag"
    >;

    /**
     * Additional props to pass to the NavigationTabsDropdown component when it
     * is used.
     *
     * Note: This prop doesn't include the props that are available on the
     * ResponsiveNavigationTabs component already.
     */
    dropdownProps?: Omit<
        NavigationTabsDropdownProps,
        | "tabs"
        | "selectedTabId"
        | "onTabSelected"
        | "aria-label"
        | "aria-labelledby"
        | "tag"
    >;

    /**
     * Custom styles for the ResponsiveNavigationTabs component.
     * - `root`: Styles the root container element.
     *
     * To customize the styles of the navigation tabs or dropdown, set the
     * `styles` prop on the `tabsProps` or `dropdownProps` props. See the
     * `NavigationTabs` and `NavigationTabsDropdown` docs for more details.
     */
    styles?: {
        root?: StyleType;
    };

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
     * The HTML tag to use. Defaults to `nav` in both layouts.
     */
    tag?: keyof JSX.IntrinsicElements;

    /**
     * Whether to show a divider under the tabs. Defaults to `false`.
     */
    showDivider?: boolean;
};

/**
 * Renders NavigationTabs when there is enough horizontal space to display the
 * tabs. When there is not enough space, it renders NavigationTabsDropdown.
 *
 * Note: This component switches layouts depending on factors like the container
 * width, the number of tabs, the length of tab labels, zoom level, etc. Once the
 * horizontal NavigationTabs need to start scrolling horizontally, the component
 * will switch to the dropdown.
 *
 * For cases where the tabs should always be in a horizontal layout, use the
 * NavigationTabs component directly.
 */
export const ResponsiveNavigationTabs = (props: Props) => {
    const {
        tabs,
        selectedTabId,
        onTabSelected,
        onLayoutChange,
        id,
        testId,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        tag,
        tabsProps,
        dropdownProps,
        styles: stylesProp,
        showDivider = false,
    } = props;

    const navigationTabsRef = React.useRef<HTMLElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const {showDropdown} = useResponsiveLayout({
        tabs,
        elementWithOverflowRef: navigationTabsRef, // The navigation tabs root element has overflow-x: auto set
        containerRef,
        onLayoutChange,
    });

    const processedTabs = React.useMemo(() => {
        return tabs.map((tab) => ({
            ...tab,
            startIcon: tab.icon
                ? React.cloneElement(tab.icon, {
                      size: tab.icon.props.size ?? "medium",
                  })
                : undefined,
            handleClick: onTabSelected
                ? () => onTabSelected(tab.id)
                : undefined,
        }));
    }, [tabs, onTabSelected]);

    return (
        <View
            ref={containerRef}
            style={[styles.container, stylesProp?.root]}
            id={id}
            testId={testId}
        >
            {showDropdown ? (
                <NavigationTabsDropdown
                    {...dropdownProps}
                    key="dropdown"
                    tabs={tabs}
                    selectedTabId={selectedTabId}
                    onTabSelected={onTabSelected}
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledby}
                    tag={tag}
                    styles={{
                        ...dropdownProps?.styles,
                        root: [styles.fadeIn, dropdownProps?.styles?.root],
                    }}
                    showDivider={showDivider}
                />
            ) : (
                <NavigationTabs
                    {...tabsProps}
                    key="tabs"
                    ref={navigationTabsRef}
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledby}
                    tag={tag}
                    styles={{
                        ...tabsProps?.styles,
                        root: [styles.fadeIn, tabsProps?.styles?.root],
                    }}
                    showDivider={showDivider}
                >
                    {processedTabs.map((tab) => (
                        <NavigationTabItem
                            key={tab.id}
                            current={tab.id === selectedTabId}
                        >
                            <Link
                                href={tab.href}
                                onClick={tab.handleClick}
                                startIcon={tab.startIcon}
                                aria-label={tab["aria-label"]}
                                testId={tab.testId}
                            >
                                {tab.label}
                            </Link>
                        </NavigationTabItem>
                    ))}
                </NavigationTabs>
            )}
        </View>
    );
};

const fadeInKeyframes = {
    from: {opacity: 0},
    to: {opacity: 1},
};

const styles = StyleSheet.create({
    // Apply fade in animation to NavigationTabs and NavigationTabsDropdown to
    // ease into the transition between the two layouts. Since this is a fade
    // animation to smoothen the transition, we apply it always, even if prefers
    // reduced motion is enabled
    fadeIn: {
        // @ts-expect-error [FEI-5019]: `animationName` expects a string not an object.
        animationName: fadeInKeyframes,
        animationDuration: "150ms",
        animationTimingFunction: "ease-in-out",
    },
    container: {
        width: "100%",
        minHeight: "auto", // override setting the min height: 0 style
    },
});

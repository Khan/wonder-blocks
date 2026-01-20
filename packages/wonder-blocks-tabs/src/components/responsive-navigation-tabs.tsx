import * as React from "react";
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import {NavigationTabsDropdown} from "./navigation-tabs-dropdown";
import {NavigationTabs} from "./navigation-tabs";
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
};

type Props = {
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
    onTabSelected: (id: string) => void;

    /**
     * Called when the layout changes between NavigationTabs and
     * NavigationTabsDropdown.
     */
    onLayoutChange?: (layout: "tabs" | "dropdown") => void;
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
    const {tabs, selectedTabId, onTabSelected, onLayoutChange} = props;

    const navigationTabsRef = React.useRef<HTMLElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const {showDropdown} = useResponsiveLayout({
        tabs,
        horizontalLayoutRef: navigationTabsRef,
        containerRef,
        onLayoutChange,
    });

    return (
        <View ref={containerRef} style={styles.container}>
            {showDropdown ? (
                <NavigationTabsDropdown
                    key="dropdown"
                    tabs={tabs}
                    selectedTabId={selectedTabId}
                    onTabSelected={onTabSelected}
                    styles={{root: styles.fadeIn}}
                />
            ) : (
                <NavigationTabs
                    key="tabs"
                    ref={navigationTabsRef}
                    styles={{root: styles.fadeIn}}
                >
                    {tabs.map((tab) => (
                        <NavigationTabItem
                            key={tab.id}
                            current={tab.id === selectedTabId}
                        >
                            <Link
                                href={tab.href}
                                onClick={() => onTabSelected(tab.id)}
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

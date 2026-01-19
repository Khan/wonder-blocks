import * as React from "react";
import {NavigationTabsDropdown} from "./navigation-tabs-dropdown";

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
    const {tabs, selectedTabId, onTabSelected} = props;

    return (
        <NavigationTabsDropdown
            tabs={tabs}
            selectedTabId={selectedTabId}
            onTabSelected={onTabSelected}
        />
    );
};

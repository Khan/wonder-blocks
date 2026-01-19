import * as React from "react";

export type ResponsiveNavigationTabItem = {};

type Props = {};

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
    // TODO: Implement in subsequent steps
    return <div>ResponsiveNavigationTabs</div>;
};

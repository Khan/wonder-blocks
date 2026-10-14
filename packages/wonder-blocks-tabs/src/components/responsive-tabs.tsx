import * as React from "react";
import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import {Tabs, TabsProps} from "./tabs";
import {TabsDropdown, TabsDropdownProps} from "./tabs-dropdown";
import {AriaLabelOrAriaLabelledby} from "./types";
import {useResponsiveLayout} from "../hooks/use-responsive-layout";
import styles from "./responsive.module.css";

export type ResponsiveTabItem = {
    /**
     * The label of the tab.
     */
    label: string;
    /**
     * The id of the tab.
     */
    id: string;
    /**
     * The panel of the tab.
     */
    panel: React.ReactNode;
    /**
     * Optional test ID for e2e testing of the tab.
     */
    testId?: string;
    /**
     * Optional aria-label for the tab.
     */
    "aria-label"?: string;

    /**
     * Optional icon to display in the tab. Should be a PhosphorIcon or Icon
     * component.
     */
    icon?: React.ReactElement;
};

type Props = AriaLabelOrAriaLabelledby & {
    /**
     * A unique id for the component.
     *
     * Here is how the id is used for the different elements in the component:
     * - The root will have an id of `${id}`
     *
     * To set the id of the tabs or dropdown, set the `id` prop in the props:
     * `tabsProps` or `dropdownProps`.
     */
    id?: string;

    /**
     * Optional test ID for e2e testing.
     *
     * Here is how the test id is used for the different elements in the component:
     * - The root will have a testId of `${testId}`
     *
     * To set the test id of the tabs or dropdown, set the `testId` prop in the props:
     * `tabsProps` or `dropdownProps`.
     */
    testId?: string;
    /**
     * The tabs to render.
     */
    tabs: ResponsiveTabItem[];
    /**
     * The id of the tab that is selected.
     */
    selectedTabId: string;
    /**
     * Called when a tab is selected.
     */
    onTabSelected: (id: string) => void;

    /**
     * Called when the layout changes.
     */
    onLayoutChange?: (layout: "tabs" | "dropdown") => void;

    /**
     * Additional props to pass to the Tabs component when it is used.
     *
     * Note: This prop doesn't include the props that are available on the
     * ResponsiveTabs component already.
     */
    tabsProps?: Omit<
        TabsProps,
        | "tabs"
        | "selectedTabId"
        | "onTabSelected"
        | "aria-label"
        | "aria-labelledby"
    >;
    /**
     * Additional props to pass to the TabsDropdown component when it is used.
     *
     * Note: This prop doesn't include the props that are available on the
     * ResponsiveTabs component already.
     */
    dropdownProps?: Omit<
        TabsDropdownProps,
        | "tabs"
        | "selectedTabId"
        | "onTabSelected"
        | "aria-label"
        | "aria-labelledby"
    >;

    /**
     * Custom styles for the ResponsiveTabs component.
     * - `root`: Styles the root `div` element.
     *
     * To customize the styles of the tabs or dropdown, set the `styles` prop on
     * the `tabsProps` or `dropdownProps` props. See the `Tabs` and `TabsDropdown`
     * docs for more details.
     */
    styles?: {
        root?: StyleType;
    };
};

/**
 * Renders the Tabs component when there is enough space to display the tabs as
 * a horizontal layout. When there is not enough space, it renders the
 * tabs as a dropdown. If the tabs are links, use ResponsiveNavigationTabs instead.
 *
 * Prefer using ResponsiveTabs instead of Tabs. For cases where the tabs should
 * always be in a horizontal layout, use the Tabs component directly.
 *
 * Note: This component switches layouts depending on factors like the container
 * width, the number of tabs, the length of tab labels, zoom level, etc. Once the
 * horizontal Tabs need to start scrolling horizontally, the component will
 * switch to the dropdown.
 */
export const ResponsiveTabs = (props: Props) => {
    const {
        tabs,
        selectedTabId,
        onTabSelected,
        onLayoutChange,
        id,
        testId,
        tabsProps,
        dropdownProps,
        styles: stylesProp,
        ...ariaProps
    } = props;

    const tabsRef = React.useRef<HTMLDivElement>(null);
    const scrollableTabsRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const {showDropdown} = useResponsiveLayout({
        tabs,
        elementWithOverflowRef: scrollableTabsRef, // scrollableTabsRef is set on the element in Tabs with overflow-x: auto set
        containerRef,
        onLayoutChange,
    });

    return (
        <View
            ref={containerRef}
            style={[styles.root, styles.container, stylesProp?.root]}
            id={id}
            testId={testId}
        >
            {showDropdown ? (
                <TabsDropdown
                    {...dropdownProps}
                    {...ariaProps}
                    key="dropdown"
                    tabs={tabs}
                    selectedTabId={selectedTabId}
                    onTabSelected={onTabSelected}
                    styles={{
                        ...dropdownProps?.styles,
                        root: [styles.fadeIn, dropdownProps?.styles?.root],
                    }}
                />
            ) : (
                <Tabs
                    {...tabsProps}
                    {...ariaProps}
                    key="tabs"
                    ref={tabsRef}
                    scrollableElementRef={scrollableTabsRef}
                    tabs={tabs}
                    selectedTabId={selectedTabId}
                    onTabSelected={onTabSelected}
                    styles={{
                        ...tabsProps?.styles,
                        root: [styles.fadeIn, tabsProps?.styles?.root],
                    }}
                />
            )}
        </View>
    );
};

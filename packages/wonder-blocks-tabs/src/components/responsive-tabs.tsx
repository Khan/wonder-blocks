import * as React from "react";
import {StyleSheet} from "aphrodite";
import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import {Tabs, TabsProps} from "./tabs";
import {TabsDropdown, TabsDropdownProps} from "./tabs-dropdown";
import {AriaLabelOrAriaLabelledby} from "./types";

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
    icon?: React.ReactNode;
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
 * tabs as a dropdown.
 *
 * Note: This component switches layouts depending on factors like the container
 * width, the number of tabs, the length of tab labels, zoom level, etc. Once the
 * horizontal Tabs need to start scrolling horizontally, the component will
 * switch to the dropdown.
 *
 * For cases where the tabs should always be in a horizontal layout, use the
 * Tabs component directly.
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

    const [showDropdown, setShowDropdown] = React.useState(false);
    const tabsRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Store the width needed for tabs to display without scrolling. This is so
    // we can switch back to the tabs view when the container width is wide enough.
    const tabsWidthRef = React.useRef<number | null>(null);

    // Create a signature of the tabs to detect changes (tab added/removed, label changed)
    const tabsSignature = React.useMemo(
        () => tabs.map((t) => `${t.id}:${t.label}`).join("|"),
        [tabs],
    );

    const checkOverflow = React.useCallback(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }
        if (!showDropdown && tabsRef.current) {
            // Currently showing tabs - check for overflow
            // The tablist wrapper is the first child of the tabs root
            const tablistWrapper = tabsRef.current.firstElementChild;

            if (tablistWrapper) {
                const hasOverflow =
                    tablistWrapper.scrollWidth > tablistWrapper.clientWidth;

                if (hasOverflow) {
                    // Store the width before switching
                    tabsWidthRef.current = tablistWrapper.scrollWidth;
                    setShowDropdown(true);
                }
            }
        } else if (showDropdown && tabsWidthRef.current) {
            // Currently showing dropdown - check if we have enough space
            const containerWidth = container.clientWidth;

            // Switch back to tabs if container is wide enough
            if (containerWidth >= tabsWidthRef.current) {
                setShowDropdown(false);
            }
        }
    }, [showDropdown, containerRef]);

    React.useEffect(() => {
        // This effect handles the case where the length of tabs or the tabs
        // labels change. This determines whether to switch to the dropdown or
        // tabs view.
        if (showDropdown) {
            // When tabsSignature changes and dropdown is shown, reset to tabs
            // view so we can re-measure and see if we can switch back to tabs
            tabsWidthRef.current = null;
            setShowDropdown(false);
        } else {
            // When tabsSignature changes and tabs view is shown, check for
            // overflow
            checkOverflow();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- explicitly only depend on tabsSignature. We don't need this to respond to changes in showDropdown or checkOverflow
    }, [tabsSignature]);

    React.useEffect(() => {
        const container = containerRef.current;
        // ResizeObserver is supported in browsers we support, but not in jsdom
        if (!container || !window.ResizeObserver) {
            return;
        }

        const resizeObserver = new ResizeObserver(() => {
            checkOverflow();
        });

        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
        };
    }, [checkOverflow]);

    React.useEffect(() => {
        onLayoutChange?.(showDropdown ? "dropdown" : "tabs");
    }, [showDropdown, onLayoutChange]);

    return (
        <View
            ref={containerRef}
            style={[styles.container, stylesProp?.root]}
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

const fadeInKeyframes = {
    from: {opacity: 0},
    to: {opacity: 1},
};

const styles = StyleSheet.create({
    // Apply fade in animation to Tabs and TabsDropdown to ease into the
    // transition between the two layouts. Since this is a fade animation to
    // smoothen the transition, we apply it always, even if prefers reduced motion
    // is enabled
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

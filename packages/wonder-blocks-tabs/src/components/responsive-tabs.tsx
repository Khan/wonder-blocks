import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Tabs} from "./tabs";
import {TabsDropdown} from "./tabs-dropdown";

type ResponsiveTabItem = {
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
};

type Props = {
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
    const {tabs, selectedTabId, onTabSelected} = props;

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

    React.useEffect(() => {
        // When the tabs signature change, reset to tabs view so we can re-measure
        if (showDropdown) {
            tabsWidthRef.current = null;
            setShowDropdown(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- explicitly only depend on tabsSignature. We don't need this to respond to changes in showDropdown
    }, [tabsSignature]);

    React.useEffect(() => {
        const container = containerRef.current;
        // ResizeObserver is supported in browsers we support, but not in jsdom
        if (!container || !window.ResizeObserver) {
            return;
        }

        const checkOverflow = () => {
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
            } else if (showDropdown && tabsWidthRef.current !== null) {
                // Currently showing dropdown - check if we have enough space
                const containerWidth = container.clientWidth;

                // Switch back to tabs if container is wide enough
                if (containerWidth >= tabsWidthRef.current) {
                    setShowDropdown(false);
                }
            }
        };

        const resizeObserver = new ResizeObserver(() => {
            checkOverflow();
        });

        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
        };
    }, [showDropdown]);

    return (
        <div ref={containerRef} style={{width: "100%"}}>
            {showDropdown ? (
                <TabsDropdown
                    key="dropdown"
                    tabs={tabs}
                    selectedTabId={selectedTabId}
                    onTabSelected={onTabSelected}
                    styles={{
                        root: styles.fadeIn,
                    }}
                />
            ) : (
                <Tabs
                    key="tabs"
                    ref={tabsRef}
                    aria-label="Responsive Tabs"
                    tabs={tabs}
                    selectedTabId={selectedTabId}
                    onTabSelected={onTabSelected}
                    styles={{
                        // Constrain tabs to container width so overflow can be detected
                        root: [
                            styles.fadeIn,
                            {maxWidth: "100%", width: "100%"},
                        ],
                    }}
                />
            )}
        </div>
    );
};

const fadeInKeyframes = {
    from: {opacity: 0},
    to: {opacity: 1},
};

const styles = StyleSheet.create({
    fadeIn: {
        // @ts-expect-error [FEI-5019]: `animationName` expects a string not an object.
        animationName: fadeInKeyframes,
        animationDuration: "150ms",
        animationTimingFunction: "ease-in-out",
    },
});

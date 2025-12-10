import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Tabs} from "./tabs";
import {TabsDropdown} from "./tabs-dropdown";

type ResponsiveTabItem = {
    label: string;
    id: string;
    panel: React.ReactNode;
};

type Props = {
    tabs: ResponsiveTabItem[];
    selectedTabId: string;
    onTabSelected: (id: string) => void;
};

export const ResponsiveTabs = (props: Props) => {
    const {tabs, selectedTabId, onTabSelected} = props;

    const [showDropdown, setShowDropdown] = React.useState(false);
    const tabsRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Store the natural width needed for tabs to display without scrolling
    const tabsNaturalWidthRef = React.useRef<number | null>(null);

    // Create a signature of the tabs to detect changes (tab added/removed, label changed)
    const tabsSignature = React.useMemo(
        () => tabs.map((t) => `${t.id}:${t.label}`).join("|"),
        [tabs],
    );

    // Reset to tabs view when tabs change so we can re-measure
    React.useEffect(() => {
        if (showDropdown) {
            tabsNaturalWidthRef.current = null;
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
                        // Store the natural width before switching
                        tabsNaturalWidthRef.current =
                            tablistWrapper.scrollWidth;
                        setShowDropdown(true);
                    }
                }
            } else if (showDropdown && tabsNaturalWidthRef.current !== null) {
                // Currently showing dropdown - check if we have enough space
                const containerWidth = container.clientWidth;

                // Switch back to tabs if container is wide enough
                if (containerWidth >= tabsNaturalWidthRef.current) {
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

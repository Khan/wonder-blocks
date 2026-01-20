import * as React from "react";

type TabItem = {
    id: string;
    label: string;
    icon?: React.ReactElement;
};

type UseResponsiveLayoutOptions = {
    /**
     * The tabs to display. Used to create a signature for detecting changes.
     */
    tabs: TabItem[];
    /**
     * Reference to the tabs layout element (e.g., Tabs or NavigationTabs).
     */
    horizontalLayoutRef: React.RefObject<HTMLElement>;
    /**
     * Reference to the container element that wraps both layouts.
     */
    containerRef: React.RefObject<HTMLDivElement>;
    /**
     * Optional callback that is called when the layout changes between
     * tabs and dropdown layouts.
     */
    onLayoutChange?: (layout: "tabs" | "dropdown") => void;
};

type UseResponsiveLayoutResult = {
    /**
     * Whether to show the dropdown layout instead of the horizontal layout.
     */
    showDropdown: boolean;
};

/**
 * Custom hook that manages the responsive layout logic for switching between
 * a horizontal tabs layout and a dropdown layout based on available space.
 *
 * This hook handles:
 * - Detecting overflow in the horizontal tabs  layout
 * - Switching to dropdown when overflow is detected
 * - Switching back to horizontal tabs layout when space is available
 * - Re-measuring when tabs change
 * - Observing container resize events
 */
export function useResponsiveLayout(
    options: UseResponsiveLayoutOptions,
): UseResponsiveLayoutResult {
    const {tabs, horizontalLayoutRef, containerRef, onLayoutChange} = options;

    const [showDropdown, setShowDropdown] = React.useState(false);

    // Store the width needed for tabs to display without scrolling. This is so
    // we can switch back to the tabs view when the container width is wide enough.
    const tabsWidthRef = React.useRef<number | null>(null);

    // Create a signature of the tabs to detect changes (tab added/removed, label changed)
    const tabsSignature = React.useMemo(
        () =>
            tabs
                .map(
                    (t) =>
                        `${t.id}:${t.label}-${t.icon ? "with-icon" : "without-icon"}`,
                )
                .join("|"),
        [tabs],
    );

    const checkOverflow = React.useCallback(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }
        if (!showDropdown && horizontalLayoutRef.current) {
            // Currently showing horizontal layout - check for overflow
            // Get the first child which is the scrollable wrapper
            const scrollableWrapper = horizontalLayoutRef.current;

            if (scrollableWrapper) {
                const hasOverflow =
                    scrollableWrapper.scrollWidth >
                    scrollableWrapper.clientWidth;

                if (hasOverflow) {
                    // Store the width before switching
                    tabsWidthRef.current = scrollableWrapper.scrollWidth;
                    setShowDropdown(true);
                }
            }
        } else if (showDropdown && tabsWidthRef.current) {
            // Currently showing dropdown - check if we have enough space
            const containerWidth = container.clientWidth;

            // Switch back to tabs layout if container is wide enough
            if (containerWidth >= tabsWidthRef.current) {
                setShowDropdown(false);
            }
        }
    }, [showDropdown, horizontalLayoutRef, containerRef]);

    React.useEffect(() => {
        // This effect handles the case where the length of tabs or the tabs
        // labels change. This determines whether to switch to the dropdown or
        // tabs layout.
        if (showDropdown) {
            // When tabsSignature changes and dropdown is shown, reset to
            // tabs layout so we can re-measure and see if we can switch
            // back
            tabsWidthRef.current = null;
            setShowDropdown(false);
        } else {
            // When tabsSignature changes and tabs layout is shown, check
            // for overflow
            checkOverflow();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- explicitly only depend on tabsSignature
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
    }, [checkOverflow, containerRef]);

    React.useEffect(() => {
        onLayoutChange?.(showDropdown ? "dropdown" : "tabs");
    }, [showDropdown, onLayoutChange]);

    return {
        showDropdown,
    };
}

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
     * Reference to the element with horizontal scroll (element with `overflow-x: auto` set).
     * This ref is used to check for horizontal overflow to determine if the
     * layout should be switched.
     */
    elementWithOverflowRef: React.RefObject<HTMLElement>;
    /**
     * Reference to the container element that wraps both layouts.
     *
     * Used for determining if there is enough space in the container to
     * display the tabs in a horizontal layout. Also used to observe resize
     * events.
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
 * Changes that can trigger a layout change:
 * - The number of tabs
 * - The length of the tab labels
 * - The width of the container
 * - The zoom level
 * - The presence of icons in the tabs
 */
export function useResponsiveLayout(
    options: UseResponsiveLayoutOptions,
): UseResponsiveLayoutResult {
    const {tabs, elementWithOverflowRef, containerRef, onLayoutChange} =
        options;

    const [showDropdown, setShowDropdown] = React.useState(false);

    // Store the width needed for tabs to display without scrolling. This is so
    // we can switch back to the tabs view when the container width is wide enough.
    const tabsWidthRef = React.useRef<number | null>(null);

    // Create a signature of the tabs to detect changes (tab added/removed, label changed, presence of tab icon)
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
        if (!showDropdown && elementWithOverflowRef.current) {
            // Currently showing horizontal layout - check for overflow
            const scrollableWrapper = elementWithOverflowRef.current;

            if (scrollableWrapper) {
                const hasOverflow =
                    scrollableWrapper.scrollWidth >
                    scrollableWrapper.clientWidth;

                if (hasOverflow) {
                    // Store the container width needed to show tabs without
                    // overflow. Accounts for any gap (padding/margin) between
                    // the container and the scrollable element.
                    tabsWidthRef.current =
                        scrollableWrapper.scrollWidth +
                        (container.clientWidth - scrollableWrapper.clientWidth);
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
    }, [showDropdown, elementWithOverflowRef, containerRef]);

    React.useEffect(() => {
        // When tabsSignature changes and dropdown is shown, reset to horizontal tabs
        // layout so we can re-measure with the new content (label, icon, number of tabs, etc).
        // The MutationObserver handles checking for overflow once the new content
        // is rendered.
        if (showDropdown) {
            tabsWidthRef.current = null;
            setShowDropdown(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- explicitly only depend on tabsSignature
    }, [tabsSignature]);

    React.useEffect(() => {
        const container = containerRef.current;
        // ResizeObserver is supported in browsers we support, but not in jsdom
        if (!container || !window.ResizeObserver) {
            return;
        }

        // Check for overflow when the container size changes (screen size change, width change, etc)
        const resizeObserver = new ResizeObserver(() => {
            checkOverflow();
        });

        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
        };
    }, [checkOverflow, containerRef]);

    React.useEffect(() => {
        const element = elementWithOverflowRef.current;
        if (!element) {
            return;
        }

        // Check for overflow when elementWithOverflow is there (ie. horizontal tabs layout is used)
        checkOverflow();

        // Set up a MutationObserver to detect when the tab content changes (tabs added/removed,
        // icons mounted, labels changed) in the horizontal tabs layout.
        const mutationObserver = new MutationObserver(() => {
            checkOverflow();
        });

        mutationObserver.observe(element, {
            childList: true,
            subtree: true,
            characterData: true,
        });

        return () => {
            mutationObserver.disconnect();
        };
    }, [checkOverflow, elementWithOverflowRef]);

    React.useEffect(() => {
        onLayoutChange?.(showDropdown ? "dropdown" : "tabs");
    }, [showDropdown, onLayoutChange]);

    return {
        showDropdown,
    };
}

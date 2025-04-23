import {AriaRole, useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import {border, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

type IndicatorProps = {
    style: React.CSSProperties;
    role: AriaRole;
};

type Props = {
    /**
     * Whether to include animation.
     */
    animated: boolean;
    /**
     * Ref for the container of the tabs so we can observe when the size of the
     * children changes. This is necessary to update the underline position.
     */
    tabsContainerRef: React.RefObject<HTMLElement>;
    /**
     * Function that determines if a tab is active. The `childElement` argument
     * is the child element of the `tabsContainerRef` prop
     */
    isTabActive(childElement: Element): boolean;
};

/**
 * A hook that is used to manage the underline current indicator for tabs.
 * It returns:
 * - `indicatorProps`: The props to apply to the underline current indicator
 * - `updateUnderlineStyle`: A function that updates the underline style. Use
 * this function when the component detects a change in the tabs
 */
export const useTabIndicator = (props: Props) => {
    const {animated, tabsContainerRef, isTabActive} = props;

    /**
     * Determines if we should show the underline current indicator. We only
     * want to show it if the tabs container has been measured at least once
     * after the initial aphrodite styles have loaded.
     */
    const indicatorIsReady = React.useRef(false);

    /**
     * The styles for the underline current indicator.
     */
    const [underlineStyle, setUnderlineStyle] = React.useState({
        left: 0,
        width: 0,
    });

    const updateUnderlineStyle = React.useCallback(() => {
        if (!tabsContainerRef.current) {
            return;
        }

        // Find the active tab
        const activeTab = Array.from(tabsContainerRef.current.children).find(
            isTabActive,
        );

        if (activeTab) {
            const tabRect = activeTab.getBoundingClientRect();
            const parentRect = tabsContainerRef.current.getBoundingClientRect();
            const zoomFactor =
                parentRect.width / tabsContainerRef.current.offsetWidth;

            // When calculating, we divide by the zoom factor so the underline
            // is proportional to the rest of the component
            const left = (tabRect.left - parentRect.left) / zoomFactor; // Get position relative to parent
            const width = tabRect.width / zoomFactor; // Use bounding width

            setUnderlineStyle({
                left,
                width,
            });
        }
    }, [setUnderlineStyle, tabsContainerRef, isTabActive]);

    /**
     * On mount, set up the resize observer to watch the tabs container element.
     * We recalculate the underline style when the tabs container size changes.
     */
    useOnMountEffect(() => {
        // If the ref is not set or if the ResizeObserver is not available,
        // don't set up a resize observer. Note: ResizeObserver is supported in
        // the browsers we support, but not in jsdom for tests
        // https://github.com/jsdom/jsdom/issues/3368
        if (!tabsContainerRef.current || !window?.ResizeObserver) {
            return;
        }
        const observer = new window.ResizeObserver(([entry]) => {
            if (entry) {
                // Update underline style when the ref size changes
                updateUnderlineStyle();
                if (!indicatorIsReady.current) {
                    // Mark indicator as ready to show
                    indicatorIsReady.current = true;
                }
            }
        });

        observer.observe(tabsContainerRef.current);

        return () => {
            observer.disconnect();
        };
    });

    const positioningStyle = {
        // Translate x position instead of setting the
        // left position so layout doesn't need to be
        // recalculated each time
        transform: `translateX(${underlineStyle.left}px)`,
        width: `${underlineStyle.width}px`,
    };

    const indicatorProps: IndicatorProps = {
        style: {
            ...positioningStyle,
            ...styles.currentUnderline,
            ...(animated ? styles.underlineTransition : {}),
            ...(!indicatorIsReady.current ? {display: "none"} : {}),
        },
        role: "presentation",
    };

    return {indicatorProps, updateUnderlineStyle};
};

const styles = {
    currentUnderline: {
        position: "absolute" as const,
        bottom: 0,
        left: 0,
        height: border.width.thick,
        backgroundColor:
            semanticColor.action.secondary.progressive.default.foreground,
    },
    underlineTransition: {
        transition: "transform 0.3s ease, width 0.3s ease",
    },
};

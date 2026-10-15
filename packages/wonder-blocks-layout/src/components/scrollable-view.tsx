import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";

import {useScrollOverflow} from "../hooks/use-scroll-overflow";

type Props = AriaProps & {
    /**
     * The content to render inside the scrollable view.
     *
     * NOTE: The children should keep their natural size (e.g. with
     * `flexShrink: 0`) so the content overflows and scrolls, instead of being
     * squashed to fit the view.
     */
    children: React.ReactNode;
    /**
     * Custom styles applied to the scrollable view.
     *
     * The fades at the edges inherit the view's border radius, so setting a
     * `borderRadius` here also rounds the fades.
     */
    style?: StyleType;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
};

/**
 * A view that scrolls its content vertically when it doesn't fit in the
 * available space (e.g. on small screens or at high zoom levels).
 *
 * When its content overflows:
 * - The content fades out at the top and/or bottom edges to hint that there's
 *   more content to scroll to in that direction.
 * - The view becomes keyboard focusable, so keyboard users can scroll it too.
 *   It doesn't add an extra tab stop when everything fits.
 *
 * The fades blend the content into the default background color
 * (`semanticColor.core.background.base.default`), so the view should be
 * placed on that background.
 *
 * ### Usage
 *
 * ```tsx
 * import {ScrollableView} from "@khanacademy/wonder-blocks-layout";
 *
 * <ScrollableView style={{maxBlockSize: 200}}>
 *     <View style={{flexShrink: 0}}>Some long content</View>
 * </ScrollableView>
 * ```
 */
const ScrollableView = React.forwardRef<HTMLElement, Props>(
    function ScrollableView(
        {children, style, testId, ...ariaProps}: Props,
        forwardedRef,
    ) {
        const ref = React.useRef<HTMLElement | null>(null);
        const {isOverflowing, hasContentAbove, hasContentBelow} =
            useScrollOverflow(ref);

        // Keep both the internal ref (used to track the scroll position) and
        // the forwarded one in sync.
        const handleRef = React.useCallback(
            (node: HTMLElement | null) => {
                ref.current = node;
                if (typeof forwardedRef === "function") {
                    forwardedRef(node);
                } else if (forwardedRef) {
                    forwardedRef.current = node;
                }
            },
            [forwardedRef],
        );

        // Toggle the fades by setting their opacity custom properties directly
        // on the element. This avoids adding/removing elements or generating
        // new styles (as passing them via `style` would) in the middle of a
        // scroll, which can make it glitch.
        React.useLayoutEffect(() => {
            const element = ref.current;
            element?.style.setProperty(
                FADE_TOP_OPACITY,
                hasContentAbove ? "1" : "0",
            );
            element?.style.setProperty(
                FADE_BOTTOM_OPACITY,
                hasContentBelow ? "1" : "0",
            );
        }, [hasContentAbove, hasContentBelow]);

        return (
            <View
                {...ariaProps}
                ref={handleRef}
                testId={testId}
                style={[
                    styles.scrollableView,
                    // Render the fades as soon as the content overflows, and
                    // only toggle their opacity while scrolling (see above).
                    isOverflowing && styles.fades,
                    style,
                ]}
                // Make the view keyboard scrollable only when it actually
                // overflows, so it doesn't add an extra tab stop otherwise.
                tabIndex={isOverflowing ? 0 : undefined}
            >
                {children}
            </View>
        );
    },
);

ScrollableView.displayName = "ScrollableView";

export default ScrollableView;

// CSS custom properties used to show/hide each fade.
const FADE_TOP_OPACITY = "--wb-scrollable-view-fade-top-opacity";
const FADE_BOTTOM_OPACITY = "--wb-scrollable-view-fade-bottom-opacity";

// The fades blend the content into the background.
const fadeColor = semanticColor.core.background.base.default;
const fadeSize = sizing.size_480;

/**
 * A fade overlay that sticks to the top or bottom edge of the scrollable
 * view. It's drawn with a pseudo-element that doesn't take up space (its
 * negative margin cancels out its size) and doesn't capture clicks.
 */
const fadeOverlay = {
    content: "''",
    display: "block",
    position: "sticky",
    flexShrink: 0,
    blockSize: fadeSize,
    pointerEvents: "none",
    // Render the fade above the content.
    zIndex: 1,
} as const;

const styles = StyleSheet.create({
    scrollableView: {
        // Scroll the content when it doesn't fit in the available space
        // (e.g. on small screens or at high zoom levels).
        overflowY: "auto",
        // Don't let the browser adjust the scroll position when the content
        // changes (e.g. when the fades are rendered).
        overflowAnchor: "none",
        ...focusStyles.focus,
    },
    /**
     * Fades at the top and bottom edges that hint that there's more content
     * to scroll to. Each fade is only visible (via its opacity custom
     * property) when there's content past that edge.
     */
    fades: {
        "::before": {
            ...fadeOverlay,
            insetBlockStart: 0,
            marginBlockEnd: `calc(-1 * ${fadeSize})`,
            background: `linear-gradient(to bottom, ${fadeColor}, transparent)`,
            // Match the view's rounded corners (if any).
            borderStartStartRadius: "inherit",
            borderStartEndRadius: "inherit",
            opacity: `var(${FADE_TOP_OPACITY}, 0)`,
        },
        "::after": {
            ...fadeOverlay,
            insetBlockEnd: 0,
            marginBlockStart: `calc(-1 * ${fadeSize})`,
            background: `linear-gradient(to top, ${fadeColor}, transparent)`,
            // Match the view's rounded corners (if any).
            borderEndStartRadius: "inherit",
            borderEndEndRadius: "inherit",
            opacity: `var(${FADE_BOTTOM_OPACITY}, 0)`,
        },
    },
});

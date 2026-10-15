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
     *
     * NOTE: Avoid setting `gap` on the view itself, since the fades are laid
     * out as its first and last children while the content overflows. Put the
     * layout styles (e.g. `gap`) on a child that wraps the content instead.
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
        {children, role, style, testId, ...ariaProps}: Props,
        forwardedRef,
    ) {
        // Store the element in state (instead of a ref) so the overflow
        // tracking re-attaches if the element changes.
        const [element, setElement] = React.useState<HTMLElement | null>(null);
        const {isOverflowing, hasContentAbove, hasContentBelow} =
            useScrollOverflow(element);

        // Whether the view itself (not one of its children) has focus.
        const [isFocused, setIsFocused] = React.useState(false);

        // Keep both the internal element (used to track the scroll position)
        // and the forwarded ref in sync.
        const handleRef = React.useCallback(
            (node: HTMLElement | null) => {
                setElement(node);
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
        // The view is only keyboard focusable (and needs a name) while its
        // content overflows, or while it has focus.
        const isFocusable = isOverflowing || isFocused;

        React.useLayoutEffect(() => {
            element?.style.setProperty(
                FADE_TOP_OPACITY,
                hasContentAbove ? "1" : "0",
            );
            element?.style.setProperty(
                FADE_BOTTOM_OPACITY,
                hasContentBelow ? "1" : "0",
            );
        }, [element, hasContentAbove, hasContentBelow]);

        return (
            <View
                {...ariaProps}
                // Expose a labeled view as a region while it's focusable, so
                // screen readers announce its name when it's focused (an
                // `aria-label` on an element without a role isn't reliably
                // announced). When its content fits, it isn't a tab stop, so
                // it doesn't add an extra landmark either.
                role={
                    role ??
                    (isFocusable &&
                    (ariaProps["aria-label"] || ariaProps["aria-labelledby"])
                        ? "region"
                        : undefined)
                }
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
                // While the view itself has focus, keep it focusable even if
                // it stops overflowing (e.g. after zooming out), so focus isn't
                // lost to the page.
                tabIndex={isFocusable ? 0 : undefined}
                onFocus={(event: React.FocusEvent) => {
                    if (event.target === event.currentTarget) {
                        setIsFocused(true);
                    }
                }}
                onBlur={(event: React.FocusEvent) => {
                    if (event.target === event.currentTarget) {
                        setIsFocused(false);
                    }
                }}
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
        // Keep focused elements (and anything scrolled into view) clear of the
        // fades, so they aren't hidden under them.
        scrollPaddingBlock: fadeSize,
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

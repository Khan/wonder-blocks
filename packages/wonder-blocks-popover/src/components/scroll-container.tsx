import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";

import {useScrollOverflow} from "../hooks/use-scroll-overflow";

type Props = {
    /**
     * The content to render inside the scroll container.
     *
     * NOTE: The children should keep their natural size (e.g. with
     * `flexShrink: 0`) so the content overflows and scrolls, instead of being
     * squashed to fit the container.
     */
    children: React.ReactNode;
    /**
     * Custom styles applied to the scroll container.
     */
    style?: StyleType;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
};

/**
 * A vertical scroll container for content that might not fit in the
 * available space (e.g. on small screens or at high zoom levels).
 *
 * When its content overflows:
 * - The content fades out at the top and/or bottom edges to hint that there's
 *   more content to scroll to in that direction.
 * - The container becomes keyboard focusable, so keyboard users can scroll it
 *   too. It doesn't add an extra tab stop when everything fits.
 *
 * NOTE: This is only used by Popover for now. If another component needs it,
 * consider moving it (along with `useScrollOverflow`) to a shared package.
 */
export default function ScrollContainer({children, style, testId}: Props) {
    const ref = React.useRef<HTMLElement | null>(null);
    const {isOverflowing, hasContentAbove, hasContentBelow} =
        useScrollOverflow(ref);

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
            ref={ref}
            testId={testId}
            style={[
                styles.scrollContainer,
                // Render the fades as soon as the content overflows, and only
                // toggle their opacity while scrolling (see above).
                isOverflowing && styles.fades,
                style,
            ]}
            // Make the region keyboard scrollable only when it actually
            // overflows, so it doesn't add an extra tab stop otherwise.
            tabIndex={isOverflowing ? 0 : undefined}
        >
            {children}
        </View>
    );
}

// CSS custom properties used to show/hide each fade.
const FADE_TOP_OPACITY = "--wb-scroll-container-fade-top-opacity";
const FADE_BOTTOM_OPACITY = "--wb-scroll-container-fade-bottom-opacity";

// The fades blend the content into the container background.
const fadeColor = semanticColor.core.background.base.default;
const fadeSize = sizing.size_480;
// The fades sit at the edges of the floating element (the popover "bubble"),
// so their outer corners match its inner border radius (its border radius
// minus its border width).
const fadeRadius = `calc(${border.radius.radius_040} - ${border.width.thin})`;

/**
 * A fade overlay that sticks to the top or bottom edge of the scroll
 * container. It's drawn with a pseudo-element that doesn't take up space
 * (its negative margin cancels out its size) and doesn't capture clicks.
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
    scrollContainer: {
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
            borderStartStartRadius: fadeRadius,
            borderStartEndRadius: fadeRadius,
            opacity: `var(${FADE_TOP_OPACITY}, 0)`,
        },
        "::after": {
            ...fadeOverlay,
            insetBlockEnd: 0,
            marginBlockStart: `calc(-1 * ${fadeSize})`,
            background: `linear-gradient(to top, ${fadeColor}, transparent)`,
            borderEndStartRadius: fadeRadius,
            borderEndEndRadius: fadeRadius,
            opacity: `var(${FADE_BOTTOM_OPACITY}, 0)`,
        },
    },
});

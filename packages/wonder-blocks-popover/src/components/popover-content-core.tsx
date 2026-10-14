import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

import {actionStyles, focusStyles} from "@khanacademy/wonder-blocks-styles";
import CloseButton from "./close-button";
import {useScrollOverflow} from "../hooks/use-scroll-overflow";

type Props = AriaProps & {
    /**
     * The content to render inside the popover.
     */
    children: React.ReactNode;
    /**
     * Close button color
     */
    closeButtonLight?: boolean;
    /**
     * Close button label for use in screen readers
     */
    closeButtonLabel?: string;
    /**
     * When true, the close button is shown; otherwise, the close button is not shown.
     */
    closeButtonVisible?: boolean;
    /**
     * Custom styles applied to the content container
     */
    style?: StyleType;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
};

/**
 * This is the base popover container. It’s used internally by all the variants.
 * Also, it can be used to create flexible popovers.
 *
 * ### Presentation
 *
 * `PopoverContentCore` only lays out the popover's contents (max width,
 * padding and the optional close button). The popover "bubble" chrome —
 * background, border, border radius, shadow and the tail — is drawn by the
 * `Floating` component that `Popover` renders it inside.
 *
 * This means that when `PopoverContentCore` is rendered **standalone**, outside
 * of a `Popover` — which is how the examples on this page are rendered — it has
 * no bubble around it and you need to supply your own container styling. Inside
 * a `Popover` it looks like a popover with no extra work.
 *
 * ### Overflow
 *
 * Inside a `Popover`, the content is constrained to the space available in the
 * viewport (or document). When it doesn't fit (e.g. on small screens or at
 * high zoom levels), the content (including the close button) scrolls, and
 * it fades out at the edges to hint that there's more content to scroll to.
 * The scrollable area becomes keyboard focusable while it overflows, so
 * keyboard users can scroll it too.
 *
 * ### Usage
 *
 * ```jsx
 * import {PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
 *
 * <PopoverContentCore>
 *  <>
 *      Some custom layout
 *  </>
 * </PopoverContentCore>
 * ```
 */
const PopoverContentCore = React.forwardRef<HTMLElement, Props>(
    function PopoverContentCore(
        {
            "aria-label": ariaLabel,
            children,
            closeButtonLight = false,
            closeButtonLabel,
            closeButtonVisible = false,
            style,
            testId,
        }: Props,
        ref,
    ): React.ReactElement {
        const scrollContainerRef = React.useRef<HTMLElement | null>(null);
        const {isOverflowing, hasContentAbove, hasContentBelow} =
            useScrollOverflow(scrollContainerRef);

        return (
            <View
                ref={scrollContainerRef}
                style={[
                    styles.scrollContainer,
                    hasContentAbove && styles.fadeTop,
                    hasContentBelow && styles.fadeBottom,
                ]}
                // Make the region keyboard scrollable only when it actually
                // overflows, so it doesn't add an extra tab stop otherwise.
                tabIndex={isOverflowing ? 0 : undefined}
            >
                {closeButtonVisible && (
                    <CloseButton
                        aria-label={closeButtonLabel}
                        style={[
                            styles.closeButton,
                            closeButtonLight && actionStyles.inverse,
                        ]}
                        testId={`${testId || "popover"}-close-btn`}
                    />
                )}
                <View
                    testId={testId}
                    style={[styles.content, style]}
                    aria-label={ariaLabel}
                    ref={ref}
                >
                    {children}
                </View>
            </View>
        );
    },
);

PopoverContentCore.displayName = "PopoverContentCore";

export default PopoverContentCore;

// The fades blend the content into the popover background.
const fadeColor = semanticColor.core.background.base.default;
const fadeSize = sizing.size_480;

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
        ...focusStyles.focus,
    },
    /**
     * Fades at the top and/or bottom edges that hint that there's more content
     * to scroll to. Each fade only shows when there's content past that edge.
     */
    fadeTop: {
        "::before": {
            ...fadeOverlay,
            insetBlockStart: 0,
            marginBlockEnd: `calc(-1 * ${fadeSize})`,
            background: `linear-gradient(to bottom, ${fadeColor}, transparent)`,
        },
    },
    fadeBottom: {
        "::after": {
            ...fadeOverlay,
            insetBlockEnd: 0,
            marginBlockStart: `calc(-1 * ${fadeSize})`,
            background: `linear-gradient(to top, ${fadeColor}, transparent)`,
        },
    },
    content: {
        margin: 0,
        maxInlineSize: `calc(${sizing.size_160} * 18)`, // 288px
        padding: sizing.size_240,
        overflow: "hidden",
        justifyContent: "center",
        // Keep the content at its natural size so it overflows (and scrolls)
        // inside the scroll container instead of being squashed.
        flexShrink: 0,
    },

    /**
     * elements
     */
    closeButton: {
        margin: 0,
        position: "absolute",
        insetInlineEnd: sizing.size_040,
        insetBlockStart: sizing.size_040,
        // Allows the button to be above the title and/or custom content
        zIndex: 1,
    },
});

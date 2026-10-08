import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

import {actionStyles, focusStyles} from "@khanacademy/wonder-blocks-styles";
import CloseButton from "./close-button";

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
 * high zoom levels), the content scrolls while the close button stays in
 * place. The scrollable area becomes keyboard focusable while it overflows, so
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
        const isOverflowing = useIsOverflowing(scrollContainerRef);

        return (
            // The close button lives outside of the scrollable area so it
            // stays in place when the content scrolls.
            <View>
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
                    ref={scrollContainerRef}
                    style={styles.scrollContainer}
                    // Make the region keyboard scrollable only when it
                    // actually overflows, so it doesn't add an extra tab stop
                    // otherwise.
                    tabIndex={isOverflowing ? 0 : undefined}
                >
                    <View
                        testId={testId}
                        style={[styles.content, style]}
                        aria-label={ariaLabel}
                        ref={ref}
                    >
                        {children}
                    </View>
                </View>
            </View>
        );
    },
);

/**
 * Tracks whether the element's content overflows its block size (i.e. whether
 * it can be scrolled).
 */
function useIsOverflowing(ref: React.RefObject<HTMLElement | null>): boolean {
    const [isOverflowing, setIsOverflowing] = React.useState(false);

    React.useEffect(() => {
        const element = ref.current;
        // ResizeObserver is supported in browsers we support, but not in jsdom
        if (!element || !window.ResizeObserver) {
            return;
        }

        const checkOverflow = () => {
            setIsOverflowing(element.scrollHeight > element.clientHeight);
        };

        // Check when either the container (e.g. it gets constrained by the
        // viewport) or its children (e.g. content changes) are resized.
        const resizeObserver = new ResizeObserver(checkOverflow);
        resizeObserver.observe(element);
        Array.from(element.children).forEach((child) =>
            resizeObserver.observe(child),
        );

        return () => {
            resizeObserver.disconnect();
        };
    }, [ref]);

    return isOverflowing;
}

PopoverContentCore.displayName = "PopoverContentCore";

export default PopoverContentCore;

const styles = StyleSheet.create({
    scrollContainer: {
        // Scroll the content when it doesn't fit in the available space
        // (e.g. on small screens or at high zoom levels).
        overflowY: "auto",
        ...focusStyles.focus,
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

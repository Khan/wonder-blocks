import * as React from "react";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {ScrollableView} from "@khanacademy/wonder-blocks-layout";

import {actionStyles} from "@khanacademy/wonder-blocks-styles";
import CloseButton from "./close-button";
import PopoverContext from "./popover-context";
import styles from "./popover-content-core.module.css";

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
 * keyboard users can scroll it too. It's named after the popover (via its
 * title or `aria-label`), so screen readers announce it when it's focused.
 * Pass an `aria-label` to `PopoverContentCore` to use a different name.
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
        // Name the scrollable area, since it can receive focus while its
        // content overflows. A custom `aria-label` takes precedence over the
        // popover's name.
        const popoverContext = React.useContext(PopoverContext);
        const labelProps = ariaLabel
            ? {"aria-label": ariaLabel}
            : {
                  "aria-label": popoverContext["aria-label"],
                  "aria-labelledby": popoverContext["aria-labelledby"],
              };

        return (
            <ScrollableView {...labelProps} style={styles.root}>
                <View testId={testId} style={[styles.content, style]} ref={ref}>
                    {/* The close button is part of the content (inside the
                    scroll container), so it scrolls with it. */}
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
                    {children}
                </View>
            </ScrollableView>
        );
    },
);

PopoverContentCore.displayName = "PopoverContentCore";

export default PopoverContentCore;

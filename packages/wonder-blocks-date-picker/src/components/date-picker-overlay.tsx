import * as React from "react";
import {createPortal} from "react-dom";
import {Popper} from "react-popper";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {maybeGetPortalMountedModalHostElement} from "@khanacademy/wonder-blocks-modal";
import {
    border,
    boxShadow,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";

import FocusManager from "./focus-manager";

// Custom styles to display the calendar popup correctly.
const DEFAULT_STYLE = {
    background: semanticColor.core.background.base.default,
    padding: `calc(${sizing.size_120} - ${sizing.size_120})`,
    borderRadius: border.radius.radius_040,
    border: `solid ${border.width.thin} ${semanticColor.core.border.neutral.subtle}`,
    boxShadow: boxShadow.mid,
} as const;

interface Props {
    /**
     * The children that will be wrapped by PopperJS.
     */
    children: React.ReactNode;
    /**
     * Called when the popper should be closed/hidden.
     */
    onClose: () => unknown;
    /**
     * The reference element used to position the popper.
     */
    referenceElement: HTMLElement | null | undefined;
    /**
     * Styles that will be applied to the children.
     */
    style?: StyleType;
}

/**
 * The custom overlay wrapper that will be used to render the calendar popup
 * component (DayPicker) using PopperJS + React.Portal.
 *
 * NOTE: We use this approach to prevent any z-index issues when displaying the
 * calendar popup in the current view. This includes using it inside a normal
 * page or inside a Modal component.
 */
const DatePickerOverlay = ({
    children,
    referenceElement,
    onClose,
    style = DEFAULT_STYLE,
}: Props): React.ReactElement | null => {
    if (!referenceElement) {
        return null;
    }
    const modalHost =
        maybeGetPortalMountedModalHostElement(referenceElement) ||
        document.querySelector("body");

    if (!modalHost) {
        return null;
    }

    // 1. Portal: Used to append the child element to the document (or a modal
    //    if exists). This way we prevent having issues with any stacking
    //    context generated in DOM tree associated to the parent component.
    // 2. FocusManager: Used to steal focus, then return focus to the next
    //    element after the overlay.
    // 3. Popper: Automatically calculates the position based on the
    //    referenceElement and applies the required styles to the child element.
    return createPortal(
        <FocusManager
            referenceElement={referenceElement}
            onEndFocused={onClose}
        >
            <Popper
                referenceElement={referenceElement}
                placement="bottom-start"
                strategy="fixed"
                modifiers={[
                    {
                        name: "preventOverflow",
                        options: {
                            rootBoundary: "viewport",
                        },
                    },
                ]}
            >
                {({
                    placement,
                    ref,
                    style: popperStyle,
                    isReferenceHidden,
                    hasPopperEscaped,
                }) => {
                    // In test environments (JSDOM), Popper.js can't properly
                    // calculate boundaries and may incorrectly report elements
                    // as out of bounds without shims. We skip the visibility logic in tests
                    // as this will be overhauled with WB Floating.
                    const isTestEnvironment =
                        typeof window !== "undefined" &&
                        window.navigator.userAgent.includes("jsdom");
                    const outOfBoundaries =
                        !isTestEnvironment &&
                        (isReferenceHidden || hasPopperEscaped);
                    const styles = {
                        ...popperStyle,
                        ...style,
                        ...(outOfBoundaries
                            ? {
                                  pointerEvents: "none",
                                  visibility: "hidden",
                              }
                            : {}),
                    } as React.CSSProperties;

                    return (
                        <div
                            ref={ref}
                            style={styles}
                            data-placement={placement}
                        >
                            {children}
                        </div>
                    );
                }}
            </Popper>
        </FocusManager>,
        modalHost,
    );
};

export default DatePickerOverlay;

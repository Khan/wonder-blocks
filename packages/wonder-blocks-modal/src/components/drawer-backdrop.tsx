import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import {StyleSheet} from "aphrodite";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {ModalLauncherPortalAttributeName} from "../util/constants";
import {findFocusableNodes} from "../util/find-focusable-nodes";
import type {ModalElement} from "../util/types";
import {useDrawerContext} from "../util/drawer-context";
import {
    DRAWER_ENTER_DURATION_MS,
    DRAWER_EXIT_DURATION_MS,
} from "../util/drawer-animation";

type Props = {
    children: ModalElement;
    onCloseModal: () => unknown;
    /**
     * The selector for the element that will be focused when the dialog shows.
     * When not set, the first tabbable element within the dialog will be used,
     * which usually is the dismiss button (X).
     */
    initialFocusId?: string;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    /**
     * Optional custom styles, applied last so they override the backdrop's own
     * styles — including its opacity animation.
     */
    style?: StyleType;
};

/**
 * A private component used by DrawerLauncher. This is the fixed-position
 * container element that gets mounted outside the DOM. It overlays the modal
 * content (provided as `children`) over the content, with a gray backdrop
 * behind it.
 *
 * This component is also responsible for cloning the provided modal `children`,
 * and adding an `onClose` prop that will call `onCloseModal`. If an
 * `onClose` prop is already provided, the two are merged.
 */
const DrawerBackdrop = ({
    children,
    testId,
    initialFocusId,
    onCloseModal,
    style,
}: Props) => {
    // Get drawer configuration from context
    const {alignment, animated, timingDuration, isExiting} = useDrawerContext();
    const [mousePressedOutside, setMousePressedOutside] = React.useState(false);
    const backdropRef = React.useRef<HTMLDivElement>(null);

    // If dialog opens with animation, handle focus management after specified duration.
    // If no animation, immediately handle focus management.
    // An enter-side timer, so it tracks the enter duration.
    const computedTimingDuration = animated
        ? (timingDuration ?? DRAWER_ENTER_DURATION_MS)
        : 0;

    const fadeStyles = getFadeStyles(isExiting ?? false, timingDuration);

    /**
     * Returns an element specified by the user
     */
    const getInitialFocusElement = React.useCallback(
        (container: HTMLElement): HTMLElement | null => {
            if (!initialFocusId) {
                return null;
            }

            return container.querySelector(
                `#${initialFocusId}`,
            ) as HTMLElement | null;
        },
        [initialFocusId],
    );

    /**
     * Returns the first focusable element found inside the Dialog
     */
    const getFirstFocusableElement = React.useCallback(
        (container: HTMLElement): HTMLElement | null => {
            // get a collection of elements that can be focused
            const focusableElements = findFocusableNodes(container);

            if (!focusableElements) {
                return null;
            }

            // if found, return the first focusable element
            return focusableElements[0];
        },
        [],
    );

    /**
     * Returns the dialog element
     */
    const getDialogElement = React.useCallback(
        (container: HTMLElement): HTMLElement | null => {
            // If no focusable elements are found,
            // the dialog content element itself will receive focus.
            const dialogElement = container.querySelector(
                '[role="dialog"]',
            ) as HTMLElement | null;

            if (dialogElement) {
                // add tabIndex to make the Dialog focusable
                dialogElement.tabIndex = -1;
            }

            return dialogElement;
        },
        [],
    );

    React.useEffect(() => {
        const container = backdropRef.current;
        if (!container) {
            return;
        }

        const firstFocusableElement =
            // 1. try to get element specified by the user
            getInitialFocusElement(container) ||
            // 2. get first occurence from list of focusable elements
            getFirstFocusableElement(container) ||
            // 3. get the dialog itself
            getDialogElement(container);

        // wait for styles to be applied
        if (firstFocusableElement) {
            setTimeout(() => {
                firstFocusableElement.focus();
            }, computedTimingDuration);
        }
    }, [
        getInitialFocusElement,
        getFirstFocusableElement,
        getDialogElement,
        computedTimingDuration,
    ]);

    /**
     * When the user clicks on the gray backdrop area (i.e., the click came
     * _directly_ from the positioner, not bubbled up from its children), close
     * the modal.
     */
    const handleMouseDown = (e: React.SyntheticEvent) => {
        // Confirm that it is the backdrop that is being clicked, not the child
        if (e.target === e.currentTarget) {
            setMousePressedOutside(true);
        }
    };

    const handleMouseUp = (e: React.SyntheticEvent) => {
        // Confirm that it is the backdrop that is being clicked, not the child
        // and that the mouse was pressed in the backdrop first.
        if (e.target === e.currentTarget && mousePressedOutside) {
            onCloseModal();
        }
        setMousePressedOutside(false);
    };

    const backdropProps = {
        [ModalLauncherPortalAttributeName]: true,
    } as const;

    return (
        <View
            ref={backdropRef}
            style={[
                styles.drawerPositioner,
                alignment && styles[alignment],
                animated && fadeStyles.fade,
                // Last, so it overrides the styles above.
                style,
            ].filter(Boolean)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            testId={testId}
            {...backdropProps}
        >
            {children}
        </View>
    );
};

const keyframes = {
    fadeIn: {
        "0%": {
            opacity: 0,
        },
        "100%": {
            opacity: 1,
        },
    },
    fadeOut: {
        "0%": {
            opacity: 1,
        },
        "100%": {
            opacity: 0,
        },
    },
} as const;

const styles = StyleSheet.create({
    drawerPositioner: {
        position: "fixed",
        insetInlineStart: 0,
        insetBlockStart: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        overflow: "hidden",
        background: semanticColor.core.background.overlay.default,
    },
    inlineStart: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    inlineEnd: {
        alignItems: "flex-end",
        justifyContent: "flex-start",
    },
    blockEnd: {
        alignItems: "center",
        justifyContent: "flex-end",
    },
});

/**
 * The backdrop's fade. It shares the panel's durations so the two finish
 * together, and stays linear.
 */
const getFadeStyles = (
    isExiting: boolean,
    timingDuration: number | undefined,
) =>
    StyleSheet.create({
        fade: {
            // @ts-expect-error [FEI-5019] - `animationName` expects a string not an object
            animationName: isExiting ? keyframes.fadeOut : keyframes.fadeIn,
            animationDuration: `${
                timingDuration ??
                (isExiting ? DRAWER_EXIT_DURATION_MS : DRAWER_ENTER_DURATION_MS)
            }ms`,
            animationTimingFunction: "linear",
            animationFillMode: "forwards",
        },
    });

export default DrawerBackdrop;

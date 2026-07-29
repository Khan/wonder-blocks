import * as React from "react";
import * as ReactDOM from "react-dom";

import {View} from "@khanacademy/wonder-blocks-core";

import {StyleSheet} from "aphrodite";
import {
    semanticColor,
    animationValue,
    cssDuration,
    cssEasing,
} from "@khanacademy/wonder-blocks-tokens";
import {ModalLauncherPortalAttributeName} from "../util/constants";
import {findFocusableNodes} from "../util/find-focusable-nodes";
import type {ModalElement} from "../util/types";
import ModalContext from "./modal-context";

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
};

/**
 * A private component used by ModalLauncher. This is the fixed-position
 * container element that gets mounted outside the DOM. It overlays the modal
 * content (provided as `children`) over the content, with a gray backdrop
 * behind it.
 *
 * This component is also responsible for cloning the provided modal `children`,
 * and adding an `onClose` prop that will call `onCloseModal`. If an
 * `onClose` prop is already provided, the two are merged.
 */
/**
 * Returns an element specified by the user
 */
const getInitialFocusElement = (
    node: HTMLElement,
    initialFocusId: string | undefined,
): HTMLElement | null => {
    if (!initialFocusId) {
        return null;
    }

    // eslint-disable-next-line import/no-deprecated
    return ReactDOM.findDOMNode(
        node.querySelector(`#${initialFocusId}`),
    ) as HTMLElement | null;
};

/**
 * Returns the first focusable element found inside the Dialog
 */
const getFirstFocusableElement = (node: HTMLElement): HTMLElement | null => {
    // get a collection of elements that can be focused
    const focusableElements = findFocusableNodes(node);

    if (!focusableElements) {
        return null;
    }

    // if found, return the first focusable element
    return focusableElements[0];
};

/**
 * Returns the dialog element
 */
const getDialogElement = (node: HTMLElement): HTMLElement | null => {
    // If no focusable elements are found,
    // the dialog content element itself will receive focus.
    // eslint-disable-next-line import/no-deprecated
    const dialogElement = ReactDOM.findDOMNode(
        node.querySelector('[role="dialog"]'),
    ) as HTMLElement | null;
    // add tabIndex to make the Dialog focusable
    dialogElement?.setAttribute("tabindex", "-1");

    return dialogElement;
};

const ModalBackdrop = ({
    children,
    initialFocusId,
    onCloseModal,
    testId,
}: Props): React.ReactElement => {
    const backdropRef = React.useRef<HTMLElement | null>(null);
    const [mousePressedOutside, setMousePressedOutside] = React.useState(false);

    // Animation state comes from ModalLauncher via context (undefined → no
    // animation), and drives both the scrim fade and the focus timing.
    const {animated, isExiting} = React.useContext(ModalContext);

    // When animated, defer initial focus until the enter animation finishes so
    // focus lands on a settled dialog; otherwise focus on the next tick.
    const focusDelay = animated ? animationValue.floating.enter.duration : 0;

    React.useEffect(() => {
        // eslint-disable-next-line import/no-deprecated
        const node = ReactDOM.findDOMNode(backdropRef.current) as HTMLElement;
        if (!node) {
            return;
        }

        const firstFocusableElement =
            // 1. try to get element specified by the user
            getInitialFocusElement(node, initialFocusId) ||
            // 2. get first occurrence from list of focusable elements
            getFirstFocusableElement(node) ||
            // 3. get the dialog itself
            getDialogElement(node);

        // wait for styles (and any enter animation) to be applied. Clear the
        // timer on unmount so we never focus a detached node if the modal
        // closes mid-enter.
        const timeoutId = setTimeout(() => {
            firstFocusableElement?.focus();
        }, focusDelay);
        return () => clearTimeout(timeoutId);
    }, [initialFocusId, focusDelay]);

    /**
     * When the user clicks on the gray backdrop area (i.e., the click came
     * _directly_ from the positioner or the padding layer, not bubbled up
     * from the modal content), close the modal.
     */
    const handleMouseDown = React.useCallback((e: React.SyntheticEvent) => {
        const target = e.target as HTMLElement;
        // Confirm that it is the backdrop or the padding layer being clicked
        const isBackdropClick = e.target === e.currentTarget;
        const isPaddingLayerClick = target?.hasAttribute?.(
            "data-modal-padding-layer",
        );
        setMousePressedOutside(isBackdropClick || isPaddingLayerClick);
    }, []);

    const handleMouseUp = React.useCallback(
        (e: React.SyntheticEvent) => {
            const target = e.target as HTMLElement;
            // Confirm that it is the backdrop or padding layer being clicked
            // and that the mouse was pressed outside the modal content first.
            const isBackdropClick = e.target === e.currentTarget;
            const isPaddingLayerClick = target?.hasAttribute?.(
                "data-modal-padding-layer",
            );
            if (
                (isBackdropClick || isPaddingLayerClick) &&
                mousePressedOutside
            ) {
                onCloseModal();
            }
            setMousePressedOutside(false);
        },
        [mousePressedOutside, onCloseModal],
    );

    const backdropProps = {
        [ModalLauncherPortalAttributeName]: true,
    } as const;

    return (
        <View
            ref={backdropRef}
            style={[
                styles.modalPositioner,
                animated && (isExiting ? styles.fadeOut : styles.fadeIn),
            ]}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            testId={testId}
            {...backdropProps}
        >
            {children}
        </View>
    );
};

export default ModalBackdrop;

const fadeKeyframes = {
    fadeIn: {
        "0%": {opacity: 0},
        "100%": {opacity: 1},
    },
    fadeOut: {
        "0%": {opacity: 1},
        "100%": {opacity: 0},
    },
} as const;

const styles = StyleSheet.create({
    modalPositioner: {
        position: "fixed",
        insetInlineStart: 0,
        insetBlockStart: 0,

        width: "100%",
        height: "100%",

        alignItems: "center",
        justifyContent: "center",

        // If the modal ends up being too big for the viewport (e.g., the min
        // height is triggered), add another scrollbar specifically for
        // scrolling modal content.
        overflow: "auto",

        background: semanticColor.core.background.overlay.default,
    },
    // The backdrop only fades, but shares the dialog's `floating` *clock* so the
    // two finish together — enter on the floating enter duration, exit on the
    // (shorter) floating exit duration. A fade uses a linear curve.
    fadeIn: {
        // @ts-expect-error [FEI-5019]: aphrodite types `animationName` as a string.
        animationName: fadeKeyframes.fadeIn,
        animationDuration: cssDuration(animationValue.floating.enter.duration),
        animationTimingFunction: cssEasing(animationValue.easing.linear),
        animationFillMode: "forwards",
    },
    fadeOut: {
        // @ts-expect-error [FEI-5019]: aphrodite types `animationName` as a string.
        animationName: fadeKeyframes.fadeOut,
        animationDuration: cssDuration(animationValue.floating.exit.duration),
        animationTimingFunction: cssEasing(animationValue.easing.linear),
        animationFillMode: "forwards",
    },
});

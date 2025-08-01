import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";

import {StyleSheet} from "aphrodite";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {ModalLauncherPortalAttributeName} from "../util/constants";
import {findFocusableNodes} from "../util/find-focusable-nodes";
import type {DrawerAlignment, ModalElement} from "../util/types";

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
     * Positioning of the drawer. Uses logical properties to support
     * different writing modes:
     * - `inline-block-start` / left in Left-To-Right
     * - `inline-block-end` / right in Left-To-Right
     * - `inset-block-end` / bottom
     */
    alignment: DrawerAlignment;
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
    alignment,
}: Props) => {
    const [mousePressedOutside, setMousePressedOutside] = React.useState(false);
    const backdropRef = React.useRef<HTMLDivElement>(null);


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
            }, 0);
        }
    }, [getInitialFocusElement, getFirstFocusableElement, getDialogElement]);

    /**
     * When the user clicks on the gray backdrop area (i.e., the click came
     * _directly_ from the positioner, not bubbled up from its children), close
     * the modal.
     */
    const handleMouseDown = (e: React.SyntheticEvent) => {
        // Confirm that it is the backdrop that is being clicked, not the child
        setMousePressedOutside(e.target === e.currentTarget);
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
            style={[styles.drawerPositioner, alignmentStyles[alignment]]}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            testId={testId}
            {...backdropProps}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    drawerPositioner: {
        position: "fixed",
        left: 0,
        top: 0,

        width: "100%",
        height: "100%",

        // If the modal ends up being too big for the viewport (e.g., the min
        // height is triggered), add another scrollbar specifically for
        // scrolling modal content.
        //
        // TODO(mdr): The specified behavior is that the modal should scroll
        //     with the rest of the page, rather than separately, if overflow
        //     turns out to be necessary. That sounds hard to do; punting for
        //     now!
        overflow: "auto",

        background: semanticColor.surface.overlay,
    },
    insetInlineStartAligned: {
        alignItems: "flex-start",
        justifyContent: "center",
    },
    insetInlineEndAligned: {
        alignItems: "flex-end",
        justifyContent: "center",
    },
    insetBlockEndAligned: {
        alignItems: "center",
        justifyContent: "flex-end",
    },
});

export default DrawerBackdrop;

import * as React from "react";

import {findFocusableNodes} from "@khanacademy/wonder-blocks-core";

interface Props {
    /**
     * The container where we will apply the focus management logic.
     */
    children: React.ReactNode;
    /**
     * A reference to the element that is used to trigger the container.
     */
    referenceElement: HTMLElement | null | undefined;
    /**
     * Called when we reach the beginning of the container
     */
    onStartFocused?: () => unknown;
    /**
     * Called when we reach the end of the container
     */
    onEndFocused?: () => unknown;
}

/**
 * This component ensures that focus flows correctly within the children
 * component (container).
 *
 * ╔═══════════╗   ╔════════════╗
 * ║ reference ║   ║ next focus ║
 * ╚═══════════╝   ╚════════════╝
 *     ▲              ▲
 *     │              │
 *     ▼              │
 *  ┌┄┄┄┄┄┄┄┄┄┄┄┄┐    │
 *  ┊ container  ┊    │
 *  ┊            ┊    │
 *  ┊  1 ↔ 2 ↔ 3 ┊◄───┘
 *  └┄┄┄┄┄┄┄┄┄┄┄┄┘
 *
 * Inside the container:
 * - `tab`: Moves focus to the next focusable element.
 * - `shift + tab`: Moves focus to the previous focusable element.
 *
 * After the focus reaches the start/end of the container, then we handle two
 * different scenarios:
 *
 * 1. If the focus has reached the last focusable element inside the container,
 *    the next tab will set focus on the next focusable element that exists
 *    after the reference element.
 * 2. If the focus is set to the first focusable element inside the container,
 *    the next shift + tab will set focus on the reference element.
 *
 */
export default function FocusManager(props: Props) {
    const {children, referenceElement, onStartFocused, onEndFocused} = props;

    const rootNodeRef = React.useRef<HTMLElement | null>(null);
    const focusableElementsRef = React.useRef<Array<HTMLElement>>([]);
    const focusableElementsInsideRef = React.useRef<Array<HTMLElement>>([]);
    const nextFocusableElementRef = React.useRef<
        HTMLElement | null | undefined
    >(null);

    // Helper to get all focusable elements in the document
    const getFocusableElements = React.useCallback(() => {
        return findFocusableNodes(document);
    }, []);

    // Helper to get index of reference element
    const getReferenceIndex = React.useCallback(() => {
        if (!referenceElement) {
            return -1;
        }
        return focusableElementsRef.current.indexOf(referenceElement);
    }, [referenceElement]);

    // Helper to get next focusable element after reference
    const getNextFocusableElement = React.useCallback(() => {
        const referenceIndex = getReferenceIndex();
        if (referenceIndex >= 0) {
            const nextElementIndex =
                referenceIndex < focusableElementsRef.current.length - 1
                    ? referenceIndex + 1
                    : 0;
            return focusableElementsRef.current[nextElementIndex];
        }
        return undefined;
    }, [getReferenceIndex]);

    // Set up focusable elements and listeners
    React.useEffect(() => {
        focusableElementsRef.current = getFocusableElements();
        nextFocusableElementRef.current = getNextFocusableElement();

        const handleKeydownReferenceElement = (e: KeyboardEvent) => {
            if (e.key === "Tab" && !e.shiftKey) {
                e.preventDefault();
                focusableElementsInsideRef.current[0]?.focus();
            }
        };

        const handleKeydownNextFocusableElement = (e: KeyboardEvent) => {
            if (e.key === "Tab" && e.shiftKey) {
                e.preventDefault();
                const lastIndex = focusableElementsInsideRef.current.length - 1;
                focusableElementsInsideRef.current[lastIndex]?.focus();
            }
        };

        if (referenceElement) {
            referenceElement.addEventListener(
                "keydown",
                handleKeydownReferenceElement,
                true,
            );
        }
        if (nextFocusableElementRef.current) {
            nextFocusableElementRef.current.addEventListener(
                "keydown",
                handleKeydownNextFocusableElement,
                true,
            );
        }

        return () => {
            if (referenceElement) {
                referenceElement.removeEventListener(
                    "keydown",
                    handleKeydownReferenceElement,
                    true,
                );
            }
            if (nextFocusableElementRef.current) {
                nextFocusableElementRef.current.removeEventListener(
                    "keydown",
                    handleKeydownNextFocusableElement,
                    true,
                );
            }
        };
    }, [referenceElement, getNextFocusableElement, getFocusableElements]);

    // Set up focusable elements inside the container
    const setComponentRootNode = React.useCallback(
        (node: HTMLElement | null) => {
            if (!node) {
                return;
            }
            rootNodeRef.current = node;
            focusableElementsInsideRef.current = findFocusableNodes(node);
        },
        [],
    );

    // Focus sentinels handlers
    const handleFocusPreviousFocusableElement = React.useCallback(() => {
        if (referenceElement) {
            referenceElement.focus();
        }
        if (onStartFocused) {
            onStartFocused();
        }
    }, [referenceElement, onStartFocused]);

    const handleFocusNextFocusableElement = React.useCallback(() => {
        if (nextFocusableElementRef.current) {
            nextFocusableElementRef.current.focus();
        }
        if (onEndFocused) {
            onEndFocused();
        }
    }, [onEndFocused]);

    return (
        <React.Fragment>
            {/* First sentinel */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions
                --
                We are deliberately capturing focus with these divs.
            */}
            <div
                /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                   --
                   We are deliberately using this to capture focus.
                 */
                tabIndex={0}
                data-testid="focus-sentinel-prev"
                onFocus={handleFocusPreviousFocusableElement}
                style={{position: "fixed"}}
            />
            <div data-testid="date-picker-overlay" ref={setComponentRootNode}>
                {children}
            </div>
            {/* Last sentinel */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions
                --
                We are deliberately capturing focus with these divs.
            */}
            <div
                /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                   --
                   We are deliberately using this to capture focus.
                 */
                tabIndex={0}
                data-testid="focus-sentinel-next"
                onFocus={handleFocusNextFocusableElement}
                style={{position: "fixed"}}
            />
        </React.Fragment>
    );
}

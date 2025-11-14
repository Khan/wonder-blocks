/**
 * This component turns the given content into an accessible anchor for
 * positioning and displaying tooltips.
 */
import * as React from "react";

import {Text as WBText} from "@khanacademy/wonder-blocks-core";

import ActiveTracker from "../util/active-tracker";
import {
    TooltipAppearanceDelay,
    TooltipDisappearanceDelay,
} from "../util/constants";

import type {IActiveTrackerSubscriber} from "../util/active-tracker";

type Props = {
    /**
     * The content for anchoring the tooltip.
     * This element will be used to position the tooltip.
     * If a string is passed as children we wrap it in a Text element.
     * We allow children to be a string so that we can add tooltips to
     * words within a large block of text easily.
     */
    children: React.ReactElement<any> | string;
    /**
     * Callback to be invoked when the anchored content is mounted.
     * This provides a reference to the anchored content, which can then be
     * used for calculating tooltip bubble positioning.
     */
    anchorRef: (arg1?: Element | null | undefined) => unknown;
    /**
     * When true, if a tabindex attribute is not already present on the element
     * wrapped by the anchor, the element will be given tabindex=0 to make it
     * keyboard focusable; otherwise, does not attempt to change the ability to
     * focus the anchor element.
     *
     * Defaults to true.
     *
     * One might set this to false in circumstances where the wrapped component
     * already can receive focus or contains an element that can.
     * Use good judgement when overriding this value, the tooltip content should
     * be accessible via keyboard in all circumstances where the tooltip would
     * appear using the mouse, so verify those use-cases.
     */
    forceAnchorFocusivity?: boolean;
    /**
     * Callback to pass active state back to Tooltip.
     *
     * `active` will be true whenever the anchor is hovered or focused and false
     * otherwise.
     */
    onActiveChanged: (active: boolean) => unknown;
    /**
     * Required aria-describedby id.
     * This ID will reference the text in the tooltip bubble.
     * It should only be set to `undefined` when the tooltip bubble
     * is not visible.
     */
    "aria-describedby": string | undefined;
};

const TRACKER = new ActiveTracker();

const TooltipAnchor = React.forwardRef<Element, Props>(
    (
        {
            children,
            anchorRef,
            forceAnchorFocusivity = true,
            onActiveChanged,
            "aria-describedby": ariaDescribedBy,
        },
        ref,
    ): React.ReactElement<any> => {
        const [active, setActive] = React.useState(false);

        const weSetFocusivityRef = React.useRef<boolean | null | undefined>();
        const anchorNodeRef = React.useRef<Element | null | undefined>();
        const focusedRef = React.useRef(false);
        const hoveredRef = React.useRef(false);
        const stolenFromUsRef = React.useRef(false);
        const unsubscribeFromTrackerRef = React.useRef<
            (() => void | null | undefined) | null
        >();
        const timeoutIDRef = React.useRef<number | null | undefined>();

        const clearPendingAction = React.useCallback(() => {
            if (timeoutIDRef.current) {
                clearTimeout(timeoutIDRef.current);
                timeoutIDRef.current = null;
            }
        }, []);

        const updateFocusivity = React.useCallback(() => {
            const anchorNode = anchorNodeRef.current;
            if (!anchorNode) {
                return;
            }
            const currentTabIndex = anchorNode.getAttribute("tabindex");

            if (forceAnchorFocusivity && !currentTabIndex) {
                // Ensure that the anchor point is keyboard focusable so that
                // we can show the tooltip for visually impaired users that don't
                // use pointer devices nor assistive technology like screen readers.
                anchorNode.setAttribute("tabindex", "0");
                weSetFocusivityRef.current = true;
            } else if (!forceAnchorFocusivity && currentTabIndex) {
                // We may not be forcing it, but we also want to ensure that if we
                // did before, we remove it.
                if (weSetFocusivityRef.current) {
                    anchorNode.removeAttribute("tabindex");
                    weSetFocusivityRef.current = false;
                }
            }
        }, [forceAnchorFocusivity]);

        const setActiveState = React.useCallback(
            (newActive: boolean, instant?: boolean) => {
                if (
                    stolenFromUsRef.current ||
                    newActive !== active ||
                    (!active && timeoutIDRef.current)
                ) {
                    // If we are about to lose active state or change it, we need to
                    // cancel any pending action to show ourselves.
                    // So, if active is stolen from us, we are changing active state,
                    // or we are inactive and have a timer, clear the action.
                    clearPendingAction();
                } else if (newActive === active) {
                    if (timeoutIDRef.current) {
                        // Cancel pending action if the current `active` is
                        // already the value we want to set it to (ie. the `newActive` arg).
                        // This is okay to cancel because:
                        // - if the pending action was to set `active` to the
                        // same value, it is not needed because it already is up to date
                        // - if the pending action was to set `active` to the
                        // opposite value, it is not needed because there is a more recent
                        // event that triggered this function with an `newActive` arg that is
                        // the same value as the current state.
                        clearPendingAction();
                    }
                    // Nothing else to do if active state is up to date.
                    return;
                }

                // Determine if we are doing things immediately or not.
                const subscriber: IActiveTrackerSubscriber = {
                    activeStateStolen: () => {
                        // This will be called by the tracker
                    },
                };
                instant = instant || (newActive && TRACKER.steal(subscriber));

                if (instant) {
                    setActive(newActive);
                    onActiveChanged(newActive);
                    if (!stolenFromUsRef.current && !newActive) {
                        // Only the very last thing going inactive will giveup
                        // the stolen active state.
                        TRACKER.giveup();
                    }
                    stolenFromUsRef.current = false;
                } else {
                    const delay = newActive
                        ? TooltipAppearanceDelay
                        : TooltipDisappearanceDelay;
                    // @ts-expect-error [FEI-5019] - TS2322 - Type 'Timeout' is not assignable to type 'number'.
                    timeoutIDRef.current = setTimeout(() => {
                        timeoutIDRef.current = null;
                        setActiveState(newActive, true);
                    }, delay);
                }
            },
            [active, onActiveChanged, clearPendingAction],
        );

        const updateActiveState = React.useCallback(
            (hovered: boolean, focused: boolean) => {
                // Update our stored values.
                hoveredRef.current = hovered;
                focusedRef.current = focused;

                setActiveState(hovered || focused);
            },
            [setActiveState],
        );

        const handleKeyUp = React.useCallback(
            (e: KeyboardEvent) => {
                // We check the key as that's keyboard layout agnostic and also avoids
                // the minefield of deprecated number type properties like keyCode and
                // which, with the replacement code, which uses a string instead.
                if (e.key === "Escape" && active) {
                    // Stop the event going any further.
                    // For cancellation events, like the Escape key, we generally should
                    // air on the side of caution and only allow it to cancel one thing.
                    // So, it's polite for us to stop propagation of the event.
                    // Otherwise, we end up with UX where one Escape key press
                    // unexpectedly cancels multiple things.
                    //
                    // For example, using Escape to close a tooltip or a dropdown while
                    // displaying a modal and having the modal close as well. This would
                    // be annoyingly bad UX.
                    e.preventDefault();
                    e.stopPropagation();
                    updateActiveState(false, false);
                }
            },
            [active, updateActiveState],
        );

        const handleFocusIn = React.useCallback(() => {
            updateActiveState(hoveredRef.current, true);
        }, [updateActiveState]);

        const handleFocusOut = React.useCallback(() => {
            updateActiveState(hoveredRef.current, false);
        }, [updateActiveState]);

        const handleMouseEnter = React.useCallback(() => {
            updateActiveState(true, focusedRef.current);
        }, [updateActiveState]);

        const handleMouseLeave = React.useCallback(() => {
            updateActiveState(false, focusedRef.current);
        }, [updateActiveState]);

        // Handle active state updates with keyup listener
        React.useEffect(() => {
            if (active) {
                document.addEventListener("keyup", handleKeyUp);
            } else {
                document.removeEventListener("keyup", handleKeyUp);
            }

            return () => {
                document.removeEventListener("keyup", handleKeyUp);
            };
        }, [active, handleKeyUp]);

        // Update focusivity when anchor node or props change
        React.useEffect(() => {
            updateFocusivity();
        }, [forceAnchorFocusivity, children, updateFocusivity]);

        // Setup/cleanup event listeners and tracker subscription
        React.useEffect(() => {
            const anchorNode = anchorNodeRef.current;

            const subscriber: IActiveTrackerSubscriber = {
                activeStateStolen: () => {
                    // Something wants the active state.
                    // Do we have it? If so, let's remember that.
                    // If we are already active, or we're inactive but have a timeoutID,
                    // then it was stolen from us.
                    stolenFromUsRef.current = active || !!timeoutIDRef.current;
                    // Let's first tell ourselves we're not focused (otherwise the tooltip
                    // will be sticky on the next hover of this anchor and that just looks
                    // weird).
                    focusedRef.current = false;
                    // Now update our actual state.
                    setActiveState(false, true);
                },
            };

            unsubscribeFromTrackerRef.current = TRACKER.subscribe(subscriber);

            if (anchorNode) {
                /**
                 * TODO(somewhatabstract): Work out how to allow pointer to go over
                 * the tooltip content to keep it active. This likely requires
                 * pointer events but that would break the obscurement checks we do.
                 * So, careful consideration required. See WB-302.
                 */
                anchorNode.addEventListener("focusin", handleFocusIn);
                anchorNode.addEventListener("focusout", handleFocusOut);
                anchorNode.addEventListener("mouseenter", handleMouseEnter);
                anchorNode.addEventListener("mouseleave", handleMouseLeave);
            }

            return () => {
                if (unsubscribeFromTrackerRef.current) {
                    unsubscribeFromTrackerRef.current();
                }
                clearPendingAction();

                if (anchorNode) {
                    anchorNode.removeEventListener("focusin", handleFocusIn);
                    anchorNode.removeEventListener("focusout", handleFocusOut);
                    anchorNode.removeEventListener(
                        "mouseenter",
                        handleMouseEnter,
                    );
                    anchorNode.removeEventListener(
                        "mouseleave",
                        handleMouseLeave,
                    );
                }
            };
        }, [
            handleFocusIn,
            handleFocusOut,
            handleMouseEnter,
            handleMouseLeave,
            clearPendingAction,
            active,
            setActiveState,
        ]);

        // Callback ref to capture the anchor node and forward it
        const handleRefCallback = React.useCallback(
            (node: Element | null) => {
                // This should never happen, but we have this check here to make TypeScript
                // happy and ensure that if this does happen, we'll know about it.
                if (node instanceof Text) {
                    throw new Error(
                        "TooltipAnchor must be applied to an Element. Text content is not supported.",
                    );
                }

                if (node && node !== anchorNodeRef.current) {
                    anchorNodeRef.current = node;
                    updateFocusivity();
                    anchorRef(node);
                }

                // Forward the ref
                if (typeof ref === "function") {
                    ref(node);
                } else if (ref) {
                    (ref as React.MutableRefObject<Element | null>).current =
                        node;
                }
            },
            [anchorRef, updateFocusivity, ref],
        );

        const renderAnchorableChildren = (): React.ReactElement<any> => {
            return typeof children === "string" ? (
                <WBText>{children}</WBText>
            ) : (
                children
            );
        };

        const anchorableChildren = renderAnchorableChildren();

        return React.cloneElement(anchorableChildren, {
            "aria-describedby": ariaDescribedBy,
            ref: handleRefCallback,
        });
    },
);

TooltipAnchor.displayName = "TooltipAnchor";

export default TooltipAnchor;

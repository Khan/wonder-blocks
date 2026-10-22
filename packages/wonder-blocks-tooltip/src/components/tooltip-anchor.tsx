/**
 * This component turns the given content into an accessible anchor for
 * positioning and displaying tooltips.
 */
import * as React from "react";

import {Text as WBText} from "@khanacademy/wonder-blocks-core";
import {
    canAcceptRef,
    getElementRef,
    useMergeRefs,
} from "@khanacademy/wonder-blocks-floating";

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

/**
 * The attribute that identifies the markers rendered around anchored content
 * that can't receive a ref.
 */
const MarkerAttributeName = "data-tooltip-anchor-marker";

/**
 * Finds the first element rendered between the start and end markers. The
 * markers of nested anchors (e.g. a tooltip inside the anchored content) are
 * skipped. Returns `null` when the anchored content renders no element.
 */
function findMarkedElement(
    startMarker: Element | null,
    endMarker: Element | null,
): Element | null {
    let node = startMarker?.nextElementSibling ?? null;

    while (node && node !== endMarker) {
        if (!node.hasAttribute(MarkerAttributeName)) {
            return node;
        }
        node = node.nextElementSibling;
    }

    return null;
}

type ActiveStateManager = {
    /**
     * Subscribed to the tracker so that this anchor is notified when another
     * anchor steals the active state.
     */
    subscriber: IActiveTrackerSubscriber;
    handleFocusIn: () => void;
    handleFocusOut: () => void;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    /**
     * Cancels any pending action and stops listening for the escape key.
     */
    dispose: () => void;
};

/**
 * Creates the state machine that decides when the anchor is active (hovered
 * or focused), applying the appearance/disappearance delays and coordinating
 * with the other anchors through the tracker, so that only one tooltip is
 * active at any one time.
 *
 * The state lives in this closure (rather than in React state) because it
 * doesn't affect what the anchor renders, and the event handlers need to read
 * and update it synchronously.
 */
function createActiveStateManager(
    onActiveChanged: (active: boolean) => unknown,
): ActiveStateManager {
    let active = false;
    let focused = false;
    let hovered = false;
    let stolenFromUs = false;
    let timeoutID: ReturnType<typeof setTimeout> | null = null;

    const clearPendingAction = () => {
        if (timeoutID) {
            clearTimeout(timeoutID);
            timeoutID = null;
        }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
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
    };

    const subscriber: IActiveTrackerSubscriber = {
        activeStateStolen: () => {
            // Something wants the active state.
            // Do we have it? If so, let's remember that.
            // If we are already active, or we're inactive but have a timeoutID,
            // then it was stolen from us.
            stolenFromUs = active || !!timeoutID;
            // Let's first tell ourselves we're not focused (otherwise the
            // tooltip will be sticky on the next hover of this anchor and that
            // just looks weird).
            focused = false;
            // Now update our actual state.
            setActiveState(false, true);
        },
    };

    function setActiveState(nextActive: boolean, instant?: boolean) {
        if (stolenFromUs || nextActive !== active || (!active && timeoutID)) {
            // If we are about to lose active state or change it, we need to
            // cancel any pending action to show ourselves.
            // So, if active is stolen from us, we are changing active state,
            // or we are inactive and have a timer, clear the action.
            clearPendingAction();
        } else if (nextActive === active) {
            if (timeoutID) {
                // Cancel pending action if the current `active` state is
                // already the value we want to set it to (ie. the `nextActive`
                // arg).
                // This is okay to cancel because:
                // - if the pending action was to set `active` to the same
                // value, it is not needed because it already is up to date
                // - if the pending action was to set `active` to the opposite
                // value, it is not needed because there is a more recent event
                // that triggered this function with a `nextActive` arg that is
                // the same value as the current state.
                clearPendingAction();
            }
            // Nothing else to do if active state is up to date.
            return;
        }

        // Determine if we are doing things immediately or not.
        const isInstant = instant || (nextActive && TRACKER.steal(subscriber));

        if (isInstant) {
            if (nextActive) {
                document.addEventListener("keyup", handleKeyUp);
            } else {
                document.removeEventListener("keyup", handleKeyUp);
            }
            active = nextActive;
            onActiveChanged(nextActive);
            if (!stolenFromUs && !nextActive) {
                // Only the very last thing going inactive will giveup
                // the stolen active state.
                TRACKER.giveup();
            }
            stolenFromUs = false;
        } else {
            const delay = nextActive
                ? TooltipAppearanceDelay
                : TooltipDisappearanceDelay;
            timeoutID = setTimeout(() => {
                timeoutID = null;
                setActiveState(nextActive, true);
            }, delay);
        }
    }

    function updateActiveState(nextHovered: boolean, nextFocused: boolean) {
        // Update our stored values.
        hovered = nextHovered;
        focused = nextFocused;

        setActiveState(hovered || focused);
    }

    return {
        subscriber,
        handleFocusIn: () => updateActiveState(hovered, true),
        handleFocusOut: () => updateActiveState(hovered, false),
        handleMouseEnter: () => updateActiveState(true, focused),
        handleMouseLeave: () => updateActiveState(false, focused),
        dispose: () => {
            clearPendingAction();
            if (active) {
                document.removeEventListener("keyup", handleKeyUp);
            }
        },
    };
}

/**
 * Tracks whether the anchor is active (hovered or focused) and reports changes
 * through `onActiveChanged`. Returns the handlers to attach to the anchor's
 * element.
 */
function useActiveState(
    onActiveChanged: (active: boolean) => unknown,
): ActiveStateManager {
    // Keep the latest callback around so the (stable) state machine always
    // reports to it.
    const onActiveChangedRef = React.useRef(onActiveChanged);
    React.useLayoutEffect(() => {
        onActiveChangedRef.current = onActiveChanged;
    });

    const [manager] = React.useState(() =>
        createActiveStateManager((active) =>
            onActiveChangedRef.current(active),
        ),
    );

    // Subscribe to the tracker while mounted. This effect has no dependencies
    // that change, so its cleanup only runs on unmount.
    React.useEffect(() => {
        const unsubscribe = TRACKER.subscribe(manager.subscriber);

        return () => {
            // NOTE: The tracker is mocked in some tests, so the unsubscribe
            // function might not exist.
            unsubscribe?.();
            manager.dispose();
        };
    }, [manager]);

    return manager;
}

/**
 * Makes the anchored content keyboard focusable (when `forceAnchorFocusivity`
 * is enabled) so that the tooltip can also be shown with the keyboard.
 */
function useAnchorFocusivity(
    anchorNode: Element | null,
    forceAnchorFocusivity: boolean,
    children: Props["children"],
) {
    // Whether we were the ones that added the tabindex attribute.
    const weSetFocusivityRef = React.useRef(false);

    React.useEffect(() => {
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
        // NOTE: `children` is included so that the tabindex is re-applied if
        // the anchored content re-renders without it.
    }, [anchorNode, forceAnchorFocusivity, children]);
}

/**
 * The anchored content of a tooltip. It shows the tooltip when the content is
 * hovered or focused.
 *
 * The ref it receives is set to the anchored content's DOM element, which is
 * the element the tooltip is positioned against. No wrapper element is
 * rendered around the content, so the DOM hierarchy stays as the consumer
 * wrote it:
 *
 * - Content that can receive a ref (host elements and `React.forwardRef`
 *   components) is given one. Its own ref (if any) is kept.
 * - Content that can't (e.g. plain function components), or that doesn't
 *   attach the ref to a DOM element, is resolved from the DOM instead, as the
 *   first element rendered between two marker elements. This way, it doesn't
 *   need to attach a ref or pass props along to its element.
 *
 * NOTE: The markers are `<template>` elements, which are never displayed and
 * are valid in any context (e.g. inside a `<tbody>`). They still count as
 * siblings for selectors like `:first-child` or `:nth-child()`.
 */
const TooltipAnchor = React.forwardRef(function TooltipAnchor(
    props: Props,
    ref: React.ForwardedRef<Element>,
) {
    const {
        children,
        forceAnchorFocusivity = true,
        onActiveChanged,
        "aria-describedby": ariaDescribedBy,
    } = props;

    const anchorableChildren =
        typeof children === "string" ? <WBText>{children}</WBText> : children;

    // The DOM element of the anchored content. The hover and focus listeners
    // are attached to it.
    const [anchorNode, setAnchorNode] = React.useState<Element | null>(null);

    // Reports the anchored element to the ref this component was given. Only
    // DOM elements (or `null`) are reported.
    const reportAnchor = useMergeRefs<Element>([ref, setAnchorNode]);

    // Whether the anchored content was given a ref that didn't resolve to a
    // DOM element (e.g. a `forwardRef` component that exposes an imperative
    // handle instead). Such content is resolved from the DOM instead.
    const [refYieldedNoElement, setRefYieldedNoElement] = React.useState(false);
    const resolveFromMarkers =
        !canAcceptRef(anchorableChildren) || refYieldedNoElement;

    // The element the anchored content attached the ref to, if any.
    const anchorFromRef = React.useRef<Element | null>(null);

    const handleContentRef = React.useCallback(
        (node: unknown) => {
            const element = node instanceof Element ? node : null;

            anchorFromRef.current = element;
            reportAnchor?.(element);
        },
        [reportAnchor],
    );

    // Give the anchored content's own ref (if it has one) back to its owner,
    // so that injecting ours doesn't take it away. It always gets the raw
    // value (e.g. an imperative handle).
    const contentRef = useMergeRefs([
        getElementRef(anchorableChildren),
        handleContentRef,
    ]);

    // Fall back to the markers when the ref didn't resolve a DOM element.
    // Refs are attached before this effect runs.
    React.useLayoutEffect(() => {
        if (!resolveFromMarkers && !anchorFromRef.current) {
            setRefYieldedNoElement(true);
        }
    }, [resolveFromMarkers, anchorNode]);

    // The markers rendered around content that is resolved from the DOM, and
    // the element that was last resolved between them.
    const startMarkerRef = React.useRef<HTMLTemplateElement | null>(null);
    const endMarkerRef = React.useRef<HTMLTemplateElement | null>(null);
    const markedNodeRef = React.useRef<Element | null>(null);

    /**
     * Resolves the anchored element once the end marker is attached. Refs are
     * attached in order and after all of the elements are in the DOM, so the
     * start marker and the anchored content are already there.
     */
    const handleEndMarkerRef = React.useCallback(
        (endMarker: HTMLTemplateElement | null) => {
            const node = endMarker
                ? findMarkedElement(startMarkerRef.current, endMarker)
                : null;

            endMarkerRef.current = endMarker;
            markedNodeRef.current = node;
            reportAnchor?.(node);
        },
        [reportAnchor],
    );

    // Keep the marked element in sync if the anchored content renders a
    // different DOM element (the markers' refs aren't attached again then).
    //
    // NOTE: This runs after every render (no dependency array). The element is
    // only reported when it changes, so this can't loop.
    React.useLayoutEffect(() => {
        if (!endMarkerRef.current) {
            return;
        }

        const node = findMarkedElement(
            startMarkerRef.current,
            endMarkerRef.current,
        );
        if (node !== markedNodeRef.current) {
            markedNodeRef.current = node;
            reportAnchor?.(node);
        }
    });

    const {handleFocusIn, handleFocusOut, handleMouseEnter, handleMouseLeave} =
        useActiveState(onActiveChanged);

    useAnchorFocusivity(anchorNode, forceAnchorFocusivity, children);

    // NOTE: We use native listeners (instead of React event props) so that
    // they work for any anchored content, even content that doesn't pass
    // event props along to its element.
    React.useEffect(() => {
        if (!anchorNode) {
            return;
        }
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

        return () => {
            anchorNode.removeEventListener("focusin", handleFocusIn);
            anchorNode.removeEventListener("focusout", handleFocusOut);
            anchorNode.removeEventListener("mouseenter", handleMouseEnter);
            anchorNode.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [
        anchorNode,
        handleFocusIn,
        handleFocusOut,
        handleMouseEnter,
        handleMouseLeave,
    ]);

    if (!resolveFromMarkers) {
        return React.cloneElement(anchorableChildren, {
            "aria-describedby": ariaDescribedBy,
            ref: contentRef,
        });
    }

    // NOTE: The anchored content keeps its own ref (if any), which React
    // attaches as usual.
    return (
        <>
            <template
                ref={startMarkerRef}
                {...{[MarkerAttributeName]: "start"}}
            />
            {React.cloneElement(anchorableChildren, {
                "aria-describedby": ariaDescribedBy,
            })}
            <template
                ref={handleEndMarkerRef}
                {...{[MarkerAttributeName]: "end"}}
            />
        </>
    );
});

TooltipAnchor.displayName = "TooltipAnchor";

export default TooltipAnchor;

/**
 * This component turns the given content into an accessible anchor for
 * positioning and displaying tooltips.
 */
import * as React from "react";

import {
    FloatingReferenceAttributeName,
    Text as WBText,
} from "@khanacademy/wonder-blocks-core";
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
import type {TooltipAnchorProps} from "../util/types";

type Props = {
    /**
     * The content for anchoring the tooltip.
     * This element will be used to position the tooltip.
     * If a string is passed as children we wrap it in a Text element.
     * We allow children to be a string so that we can add tooltips to
     * words within a large block of text easily.
     */
    children: React.ReactElement<TooltipAnchorProps> | string;
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
 * wrote it.
 *
 * The anchored content has to do one of two things for the tooltip to find
 * that element (the same contract as `Floating`'s trigger):
 *
 * - Pass the props it is given (`TooltipAnchorProps`, which it needs to do
 *   anyway for `aria-describedby`) along to its element. The element that receives the
 *   injected `FloatingReferenceAttributeName` attribute is preferred, so a
 *   component can point the tooltip at its root element even when its ref
 *   points at an inner element (e.g. `Switch`).
 * - Attach the ref it is given (host elements and `React.forwardRef`
 *   components). Its own ref is kept.
 *
 * In development, a warning is logged when neither resolves an element.
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

    // Identifies the anchored element in the DOM. `React.useId` values are
    // unique for every component instance, so anchors (including nested ones)
    // never resolve each other's element.
    const referenceId = React.useId();

    // The DOM element of the anchored content. The hover and focus listeners
    // are attached to it.
    const [anchorNode, setAnchorNode] = React.useState<Element | null>(null);

    // Reports the anchored element to the ref this component was given. Only
    // DOM elements (or `null`) are reported.
    const reportAnchor = useMergeRefs<Element>([ref, setAnchorNode]);

    // The element the anchored content attached the ref to, if any.
    const anchorFromRef = React.useRef<Element | null>(null);

    const setAnchorFromRef = React.useCallback((node: unknown) => {
        anchorFromRef.current = node instanceof Element ? node : null;
    }, []);

    // Give the anchored content's own ref (if it has one) back to its owner,
    // so that injecting ours doesn't take it away. It always gets the raw
    // value (e.g. an imperative handle).
    const contentRef = useMergeRefs([
        getElementRef(anchorableChildren),
        setAnchorFromRef,
    ]);

    // The element that was last reported, and whether we already warned about
    // not finding one.
    const reportedNodeRef = React.useRef<Element | null>(null);
    const warnedRef = React.useRef(false);

    // Resolve the anchored element: the element that received the attribute
    // (preferred), or the element the ref resolved.
    //
    // NOTE: This runs after every render (no dependency array) so that the
    // element stays in sync if the anchored content renders a different DOM
    // element. Refs are attached before this effect runs, and the element is
    // only reported when it changes, so this can't loop.
    React.useLayoutEffect(() => {
        const node =
            document.querySelector(
                `[${FloatingReferenceAttributeName}="${referenceId}"]`,
            ) ?? anchorFromRef.current;

        if (node !== reportedNodeRef.current) {
            reportedNodeRef.current = node;
            reportAnchor?.(node);
        }

        if (process.env.NODE_ENV !== "production" && !node) {
            if (!warnedRef.current) {
                warnedRef.current = true;
                // eslint-disable-next-line no-console
                console.warn(
                    "Tooltip: could not find the anchored element in the DOM, " +
                        "so the tooltip can't be shown. Make sure the " +
                        "anchored content either passes the props it is " +
                        "given (`TooltipAnchorProps`) along to its root " +
                        "element, or attaches the ref it is given to it " +
                        "(e.g. with `React.forwardRef`). " +
                        "Alternatively, wrap it in a `View`.",
                );
            }
        } else {
            warnedRef.current = false;
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

    return React.cloneElement(anchorableChildren, {
        "aria-describedby": ariaDescribedBy,
        // Passed along so that the anchored element can be found in the DOM.
        // This is why anchored content that doesn't attach the ref below has
        // to spread the props it is given.
        [FloatingReferenceAttributeName]: referenceId,
        // Only injected when the anchored content can receive a ref: giving
        // one to a plain function component would log a React error.
        ...(canAcceptRef(anchorableChildren) ? {ref: contentRef} : undefined),
    });
});

TooltipAnchor.displayName = "TooltipAnchor";

export default TooltipAnchor;

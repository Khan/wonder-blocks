/**
 * This component is a light wrapper for @floating-ui/react-dom, allowing us to
 * position and control the tooltip bubble location and visibility as we need.
 */
import * as React from "react";
import {
    useFloating,
    autoUpdate as floatingAutoUpdate,
    flip,
    shift,
    arrow,
    hide,
    // offset,
} from "@floating-ui/react-dom";
import type {
    Placement as FloatingPlacement,
    Middleware,
} from "@floating-ui/react-dom";

import {spacing} from "@khanacademy/wonder-blocks-tokens";
import type {
    Placement,
    PopperElementProps,
    PopperUpdateFn,
} from "../util/types";
import RefTracker from "../util/ref-tracker";

type Props = {
    /**
     * This uses the children-as-a-function approach, mirroring floating-ui's
     * implementation.
     *
     * TODO(WB-624): figure out to only allow TooltipBubble and PopoverDialog
     */
    children: (arg1: PopperElementProps) => React.ReactNode;
    /**
     * The element that anchors the tooltip bubble.
     * This is used to position the bubble.
     */
    anchorElement?: HTMLElement;
    /** Where should the bubble try to go with respect to its anchor. */
    placement: Placement;
    /**
     * Whether the tooltip should automatically update its position when the
     * anchor element changes.
     */
    autoUpdate?: boolean;
    /**
     * Optional property to set what the root boundary is for the popper behavior.
     * This is set to "viewport" by default, causing the popper to be positioned based
     * on the user's viewport. If set to "document", it will position itself based
     * on where there is available room within the document body.
     */
    rootBoundary?: "viewport" | "document";
    /**
     * If `rootBoundary` is `viewport`, this padding value is used to provide
     * spacing between the popper and the viewport. If not provided, default
     * spacing of 12px is applied.
     */
    viewportPadding?: number;
};

const filterFloatingPlacement = (placement: FloatingPlacement): Placement => {
    if (placement.startsWith("top")) {
        return "top";
    } else if (placement.startsWith("bottom")) {
        return "bottom";
    } else if (placement.startsWith("right")) {
        return "right";
    } else if (placement.startsWith("left")) {
        return "left";
    }
    // If we reach here, placement is not one of the expected values
    // Return a default value instead of throwing
    return "top";
};

/**
 * Custom middleware that calculates the height of the floating element
 * vs. the height of the viewport. If the floating element is larger
 * than the viewport, it ensures the element stays visible even if
 * the reference is no longer in view.
 */
const smallViewportMiddleware: Middleware = {
    name: "smallViewport",
    fn({rects, middlewareData}) {
        const floatingHeight = rects.floating.height + rects.reference.height;
        const minHeight = document.documentElement.clientHeight;

        // If the floating element is larger than the viewport,
        // override the hide middleware to keep it visible
        if (minHeight < floatingHeight && middlewareData.hide) {
            return {
                data: {
                    referenceHidden: false,
                },
            };
        }

        return {};
    },
};

/**
 * A component that wraps @floating-ui/react-dom to provide a
 * consistent interface for positioning floating elements.
 */
function TooltipPopper({
    children,
    anchorElement,
    placement,
    autoUpdate = true,
    rootBoundary = "viewport",
    viewportPadding = spacing.small_12,
}: Props): React.ReactElement {
    const arrowRef = React.useRef<HTMLElement | null>(null);
    const [isReady, setIsReady] = React.useState(false);

    React.useEffect(() => {
        setIsReady(true);
    }, []);

    // Create ref trackers for managing refs
    const bubbleRefTracker = React.useRef(new RefTracker());
    const tailRefTracker = React.useRef(new RefTracker());

    // Build middleware array based on configuration
    const middleware: Middleware[] = React.useMemo(() => {
        const middlewares: Middleware[] = [
            // Add spacing between reference and floating element
            // offset(8),
            // Add hide middleware to detect when reference is hidden
            hide(),
            // Add custom small viewport middleware
            smallViewportMiddleware,
        ];

        if (rootBoundary === "viewport") {
            // Shift within viewport with padding
            middlewares.push(
                shift({
                    rootBoundary: "viewport",
                }),
                flip(),
            );
        } else {
            // Flip when overflowing document
            middlewares.push(
                flip({
                    rootBoundary: "document",
                }),
            );
        }

        // Arrow needs to be added toward the end of the middleware array
        // @see https://floating-ui.com/docs/arrow#order
        middlewares.push(
            arrow({
                element: arrowRef,
            }),
        );

        return middlewares;
    }, [rootBoundary]);

    // Use floating-ui hook for positioning
    const {
        x,
        y,
        strategy,
        refs,
        placement: floatingPlacement,
        middlewareData,
        update,
    } = useFloating({
        placement: placement as FloatingPlacement,
        strategy: "fixed",
        middleware,
        elements: {
            reference: anchorElement,
        },
        whileElementsMounted: autoUpdate ? floatingAutoUpdate : undefined,
    });

    // Update ref trackers with floating refs
    React.useEffect(() => {
        bubbleRefTracker.current.setCallback(refs.setFloating);
    }, [refs.setFloating]);

    React.useEffect(() => {
        tailRefTracker.current.setCallback((element) => {
            arrowRef.current = element as HTMLElement | null;
        });
    }, []);

    // Get the simplified placement
    const simplifiedPlacement: Placement =
        filterFloatingPlacement(floatingPlacement);

    // Calculate arrow positioning
    const arrowX = middlewareData.arrow?.x;
    const arrowY = middlewareData.arrow?.y;

    // Determine if reference is hidden
    const isReferenceHidden = middlewareData.hide?.referenceHidden || false;

    // Build the popper element props
    const bubbleProps: PopperElementProps = {
        placement: simplifiedPlacement,
        style: {
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            // while it re-positions itself
            visibility: !isReady ? "hidden" : undefined,
        },
        updateBubbleRef: bubbleRefTracker.current.updateRef,
        tailOffset: {
            top: arrowY != null ? `${arrowY}px` : undefined,
            left: arrowX != null ? `${arrowX}px` : undefined,
            right: undefined,
            bottom: undefined,
            transform: undefined,
        },
        updateTailRef: tailRefTracker.current.updateRef,
        isReferenceHidden,
        update: update as PopperUpdateFn,
    };

    return <>{children(bubbleProps)}</>;
}

export default TooltipPopper;

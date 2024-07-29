/**
 * This component is a light wrapper for react-popper, allowing us to position
 * and control the tooltip bubble location and visibility as we need.
 */
import * as React from "react";
import {Popper} from "react-popper";
import type {PopperChildrenProps} from "react-popper";

import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import RefTracker from "../util/ref-tracker";
import type {
    Placement,
    PopperElementProps,
    PopperUpdateFn,
} from "../util/types";
import {
    autoUpdate,
    computePosition,
    flip,
    limitShift,
    offset,
    ReferenceElement,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useRole,
} from "@floating-ui/react";
import {useState} from "react";

type Props = {
    /**
     * This uses the children-as-a-function approach, mirroring react-popper's
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
};

const filterPopperPlacement = (
    placement: PopperChildrenProps["placement"],
): Placement => {
    switch (placement) {
        case "auto":
        case "auto-start":
        case "auto-end":
        case "top":
        case "top-start":
        case "top-end":
            return "top";
        case "bottom":
        case "bottom-start":
        case "bottom-end":
            return "bottom";
        case "right":
        case "right-start":
        case "right-end":
            return "right";
        case "left":
        case "left-start":
        case "left-end":
            return "left";
        default:
            throw new UnreachableCaseError(placement);
    }
};

/**
 * A component that wraps react-popper's Popper component to provide a
 * consistent interface for positioning floating elements.
 */
export default function TooltipPopper(props: Props) {
    const {anchorElement} = props;
    const bubbleRefTracker: RefTracker = new RefTracker();
    const tailRefTracker: RefTracker = new RefTracker();
    const [popperUpdate, setPopperUpdate] = useState<PopperUpdateFn | null>(
        null,
    );

    const renderPositionedContent = (popperProps: PopperChildrenProps) => {
        const {children} = props;

        // We'll hide some complexity from the children here and ensure
        // that our placement always has a value.
        const placement: Placement =
            filterPopperPlacement(popperProps.placement) || props.placement;

        // Just in case the callbacks have changed, let's update our reference
        // trackers.
        bubbleRefTracker.setCallback(popperProps.ref);
        tailRefTracker.setCallback(popperProps.arrowProps.ref);

        // Store a reference to the update function so that we can call it
        // later if needed.
        setPopperUpdate(popperProps.update);

        // Here we translate from the react-popper's PropperChildrenProps
        // to our own TooltipBubbleProps.
        const bubbleProps = {
            placement,
            style: {
                // NOTE(jeresig): We can't just use `popperProps.style` here
                // as the TypeScript type doesn't match Aphrodite's CSS TypeScript
                // props (as it doesn't camelCase props). So we just copy over the
                // props that we need, instead.
                top: popperProps.style.top,
                left: popperProps.style.left,
                bottom: popperProps.style.bottom,
                right: popperProps.style.right,
                position: popperProps.style.position,
                transform: popperProps.style.transform,
            },
            updateBubbleRef: bubbleRefTracker.updateRef,
            tailOffset: {
                bottom: popperProps.arrowProps.style.bottom,
                right: popperProps.arrowProps.style.right,
                top: popperProps.arrowProps.style.top,
                left: popperProps.arrowProps.style.left,
                transform: popperProps.arrowProps.style.transform,
            },
            updateTailRef: tailRefTracker.updateRef,
            isReferenceHidden: popperProps.isReferenceHidden,
        } as const;
        return children(bubbleProps);
    };

    const [isOpen, setIsOpen] = useState(false);

    const {refs, floatingStyles, context} = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(10), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    computePosition(
        refs.reference.current as ReferenceElement,
        refs.floating.current as HTMLElement,
        {
            placement: "top",
            middleware: [flip(), shift({limiter: limitShift()})],
        },
    ).then(({x, y}) => {
        // ...
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);

    // Merge all the interactions into prop getters
    const {getReferenceProps, getFloatingProps} = useInteractions([
        click,
        dismiss,
        role,
    ]);

    // return (
    //     <Popper
    //         referenceElement={anchorElement}
    //         strategy="fixed"
    //         placement={placement}
    //         modifiers={[
    //             {
    //                 name: "preventOverflow",
    //                 options: {
    //                     rootBoundary: "viewport",
    //                 },
    //             },
    //         ]}
    //     >
    //         {(props) => renderPositionedContent(props)}
    //     </Popper>
    // );

    return (
        <>
            <button ref={refs.setReference} {...getReferenceProps()}>
                Reference element
            </button>
            <div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
            >
                {(props: PopperChildrenProps) => renderPositionedContent(props)}
            </div>
        </>
    );
}

/**
 * This component is a light wrapper for react-popper, allowing us to position
 * and control the tooltip bubble location and visibility as we need.
 */
import * as React from "react";
import {Popper} from "react-popper";
import type {PopperChildrenProps} from "react-popper";

import RefTracker from "../util/ref-tracker";
import type {
    Placement,
    PopperElementProps,
    PopperUpdateFn,
} from "../util/types";

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

/**
 * A component that wraps react-popper's Popper component to provide a
 * consistent interface for positioning floating elements.
 */
export default class TooltipPopper extends React.Component<Props> {
    /**
     * Automatically updates the position of the floating element when necessary
     * to ensure it stays anchored.
     *
     * NOTE: This is a temporary solution that checks for changes in the anchor
     * element's DOM. This is not a perfect solution and may not work in all
     * cases. It is recommended to use the autoUpdate prop only when necessary.
     *
     * TODO(WB-1680): Replace this with floating-ui's autoUpdate feature.
     * @see https://floating-ui.com/docs/autoupdate
     */
    componentDidMount() {
        const {anchorElement, autoUpdate} = this.props;
        if (!anchorElement || !autoUpdate) {
            return;
        }

        this._observer = new MutationObserver(() => {
            // Update the popper when the anchor element changes.
            this._popperUpdate?.();
        });

        // Check for DOM changes to the anchor element.
        this._observer.observe(anchorElement, {
            attributes: true,
            childList: true,
            subtree: true,
        });
    }

    componentWillUnmount() {
        this._observer?.disconnect();
    }

    /**
     * A ref tracker for the bubble element.
     */
    _bubbleRefTracker: RefTracker = new RefTracker();
    /**
     * A ref tracker for the tail element.
     */
    _tailRefTracker: RefTracker = new RefTracker();
    /**
     * A MutationObserver that watches for changes to the anchor element.
     */
    _observer: MutationObserver | null = null;
    /**
     * A function that can be called to update the popper.
     * @see https://popper.js.org/docs/v2/lifecycle/#manual-update
     */
    _popperUpdate: PopperUpdateFn | null = null;

    _renderPositionedContent(
        popperProps: PopperChildrenProps,
    ): React.ReactNode {
        const {children} = this.props;

        // We'll hide some complexity from the children here and ensure
        // that our placement always has a value.
        const placement: Placement =
            popperProps.placement || this.props.placement;

        // Just in case the callbacks have changed, let's update our reference
        // trackers.
        this._bubbleRefTracker.setCallback(popperProps.ref);
        this._tailRefTracker.setCallback(popperProps.arrowProps.ref);

        // Store a reference to the update function so that we can call it
        // later if needed.
        this._popperUpdate = popperProps.update;

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
            updateBubbleRef: this._bubbleRefTracker.updateRef,
            tailOffset: {
                bottom: popperProps.arrowProps.style.bottom,
                right: popperProps.arrowProps.style.right,
                top: popperProps.arrowProps.style.top,
                left: popperProps.arrowProps.style.left,
                transform: popperProps.arrowProps.style.transform,
            },
            updateTailRef: this._tailRefTracker.updateRef,
            isReferenceHidden: popperProps.isReferenceHidden,
        } as const;
        return children(bubbleProps);
    }

    render(): React.ReactNode {
        const {anchorElement, placement} = this.props;

        return (
            <Popper
                referenceElement={anchorElement}
                strategy="fixed"
                placement={placement}
                modifiers={[
                    {
                        name: "preventOverflow",
                        options: {
                            rootBoundary: "viewport",
                        },
                    },
                ]}
            >
                {(props) => this._renderPositionedContent(props)}
            </Popper>
        );
    }
}

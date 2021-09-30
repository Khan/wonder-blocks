// @flow
/**
 * This component is a light wrapper for react-popper, allowing us to position
 * and control the tooltip bubble location and visibility as we need.
 */
import * as React from "react";
import {Popper} from "react-popper";
import type {PopperChildrenProps} from "react-popper";

// eslint-disable-line import/no-restricted-paths
import RefTracker from "../util/ref-tracker.js";
import type {Placement} from "../util/types.js";
import type {PopperElementProps} from "./tooltip-bubble.js";

type Props = {|
    /**
     * This uses the children-as-a-function approach, mirroring react-popper's
     * implementation.
     *
     * TODO(WB-624): figure out to only allow TooltipBubble and PopoverDialog
     */
    children: (PopperElementProps) => React.Element<any>,

    /**
     * The element that anchors the tooltip bubble.
     * This is used to position the bubble.
     */
    anchorElement: ?HTMLElement,

    /** Where should the bubble try to go with respect to its anchor. */
    placement: Placement,
|};

export default class TooltipPopper extends React.Component<Props> {
    _bubbleRefTracker: RefTracker = new RefTracker();
    _tailRefTracker: RefTracker = new RefTracker();

    _renderPositionedContent(popperProps: PopperChildrenProps): React.Node {
        const {children} = this.props;

        // We'll hide some complexity from the children here and ensure
        // that our placement always has a value.
        const placement: Placement =
            // We know that popperProps.placement will only be one of our
            // supported values, so just cast it.
            (popperProps.placement: any) || this.props.placement;

        // Just in case the callbacks have changed, let's update our reference
        // trackers.
        this._bubbleRefTracker.setCallback(popperProps.ref);
        this._tailRefTracker.setCallback(popperProps.arrowProps.ref);

        // Here we translate from the react-popper's PropperChildrenProps
        // to our own TooltipBubbleProps.
        const bubbleProps = {
            placement,
            style: {
                // NOTE(jeresig): We can't just use `popperProps.style` here
                // as the Flow type doesn't match Aphrodite's CSS flow props
                // (as it doesn't camelCase props). So we just copy over the
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
        };
        return children(bubbleProps);
    }

    render(): React.Node {
        const {anchorElement, placement} = this.props;
        return (
            <Popper
                referenceElement={anchorElement}
                placement={placement}
                modifiers={[
                    {
                        name: "preventOverflow",
                        options: {
                            rootBoundary: "document",
                        },
                    },
                ]}
            >
                {(props) => this._renderPositionedContent(props)}
            </Popper>
        );
    }
}

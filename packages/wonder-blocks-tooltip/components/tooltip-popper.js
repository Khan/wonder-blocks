// @flow
/**
 * This component is a light wrapper for react-popper, allowing us to position
 * and control the tooltip bubble location and visibility as we need.
 */
import * as React from "react";
import {Popper} from "react-popper";

import TooltipBubble from "./tooltip-bubble.js";
import visibilityModifierDefaultConfig from "../util/visibility-modifier.js";
import RefTracker from "../util/ref-tracker.js";

import type {PopperChildrenProps} from "react-popper";
import type {Placement} from "../util/types.js";
import type {TooltipBubbleProps} from "./tooltip-bubble.js";

type Props = {|
    /**
     * This uses the children-as-a-function approach, mirroring react-popper's
     * implementation, except we enforce the return type to be our TooltipBubble
     * component.
     */
    children: (TooltipBubbleProps) => React.Element<typeof TooltipBubble>,

    /**
     * The element that anchors the tooltip bubble.
     * This is used to position the bubble.
     */
    anchorElement: ?HTMLElement,

    /** Where should the bubble try to go with respect to its anchor. */
    placement: Placement,
|};

export default class TooltipPopper extends React.Component<Props> {
    _bubbleRefTracker = new RefTracker();
    _tailRefTracker = new RefTracker();

    _renderPositionedContent(popperProps: PopperChildrenProps) {
        const {children} = this.props;

        // We'll hide some complexity from the children here and ensure
        // that our placement always has a value.
        const placement = popperProps.placement || this.props.placement;

        // Just in case the callbacks have changed, let's update our reference
        // trackers.
        this._bubbleRefTracker.setCallback(popperProps.ref);
        this._tailRefTracker.setCallback(popperProps.arrowProps.ref);

        // Here we translate from the react-popper's PropperChildrenProps
        // to our own TooltipBubbleProps.
        const bubbleProps = {
            placement: placement,
            style: popperProps.style,
            updateBubbleRef: this._bubbleRefTracker.updateRef,
            tailOffset: {
                top: popperProps.arrowProps.style.top,
                left: popperProps.arrowProps.style.left,
            },
            updateTailRef: this._tailRefTracker.updateRef,
            outOfBoundaries: popperProps.outOfBoundaries,
        };
        return children(bubbleProps);
    }

    render() {
        const {anchorElement, placement} = this.props;
        return (
            <Popper
                referenceElement={anchorElement}
                placement={placement}
                modifiers={{
                    wbVisibility: visibilityModifierDefaultConfig,
                    preventOverflow: {boundariesElement: "viewport"},
                }}
            >
                {(props) => this._renderPositionedContent(props)}
            </Popper>
        );
    }
}

// @flow
/**
 * This component is a light wrapper for react-popper, allowing us to position
 * and control the tooltip bubble location and visibility as we need.
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Popper} from "react-popper";

import TooltipBubble from "./tooltip-bubble.js";
import visibilityModifierDefaultConfig from "../util/visibility-modifier.js";

import type {PopperChildrenProps} from "react-popper";
import type {Placement, getRefFn} from "../util/types.js";

import type {TooltipBubbleProps} from "./tooltip-bubble.js";

type Props = {|
    // This uses the children-as-a-function approach, mirroring react-popper's
    // implementation, except we enforce the return type to be our TooltipBubble
    // component.
    children: (TooltipBubbleProps) => React.Element<typeof TooltipBubble>,

    // The element that anchors the tooltip bubble.
    // This is used to position the bubble.
    anchorElement: ?HTMLElement,

    // Where should the bubble try to go with respect to its anchor.
    placement: Placement,
|};

/**
 * This is a little helper function that wraps the react-popper reference
 * update methods so that we can convert a regular React ref into a DOM node
 * as react-popper expects, and so we can ensure we only update react-popper
 * on actual changes, and not just renders of the same thing.
 */
function createRefTracker() {
    let _lastRef: ?HTMLElement;
    let _targetFn: (?HTMLElement) => void;

    const updateRef = (ref: ?(React.Component<*> | Element)) => {
        if (_targetFn && ref) {
            // We only want to update the reference if it is
            // actually changed. Otherwise, we can trigger another render that
            // would then update the reference again and just keep looping.
            const domNode = ReactDOM.findDOMNode(ref);
            if (domNode instanceof HTMLElement && domNode !== _lastRef) {
                _lastRef = domNode;
                _targetFn(domNode);
            }
        }
    };

    const setCallback = (targetFn: (?HTMLElement) => void) => {
        if (_targetFn !== targetFn) {
            _targetFn = targetFn;
            if (_lastRef) {
                _targetFn(_lastRef);
            }
        }
    };
    updateRef.setCallback = setCallback;

    return updateRef;
}

export default class TooltipPopper extends React.Component<Props> {
    _bubbleRefTracker: getRefFn;
    _tailRefTracker: getRefFn;

    _getUpdatedBubbleRefTracker(targetRefFn: (?HTMLElement) => void) {
        this._bubbleRefTracker = this._bubbleRefTracker || createRefTracker();
        this._bubbleRefTracker.setCallback(targetRefFn);
        return this._bubbleRefTracker;
    }

    _getUpdatedTailRefTracker(targetRefFn: (?HTMLElement) => void) {
        this._tailRefTracker = this._tailRefTracker || createRefTracker();
        this._tailRefTracker.setCallback(targetRefFn);
        return this._tailRefTracker;
    }

    _renderPositionedContent(popperProps: PopperChildrenProps) {
        const {children} = this.props;

        // We'll hide some complexity from the children here and ensure
        // that our placement always has a value.
        const placement = popperProps.placement || this.props.placement;
        const bubbleRefTracker = this._getUpdatedBubbleRefTracker(
            popperProps.ref,
        );
        const tailRefTracker = this._getUpdatedTailRefTracker(
            popperProps.arrowProps.ref,
        );

        const bubbleProps = {
            placement: placement,
            style: popperProps.style,
            updateBubbleRef: bubbleRefTracker,
            tailOffset: {
                top: popperProps.arrowProps.style.top,
                left: popperProps.arrowProps.style.left,
            },
            updateTailRef: tailRefTracker,
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

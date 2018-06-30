// @flow
/**
 * This component is a light wrapper for react-popper, allowing us to position
 * and control the tooltip bubble location and visibility as we need.
 */
import * as React from "react";
import {Popper} from "react-popper";

import TooltipBubble from "./tooltip-bubble.js";
import visibilityModifierDefaultConfig from "../util/visibility-modifier.js";

import type {PopperChildrenProps as PopperJSChildrenProps} from "react-popper";
import type {Placement} from "../util/types.js";

/**
 * Equivalent to PopperChildrenProps from the react-popper package but provided
 * as our own type to abstract away react-popper so we can isolate it's
 * inclusion to this file.
 *
 * TODO(somewhatabstract): More carefully curate the props so that we can have
 * idiomatic wonderblocks styles, for example.
 */
export type PopperChildrenProps = PopperJSChildrenProps;

type Props = {|
    // This uses the children-as-a-function approach, mirroring react-popper's
    // implementation, except we enforce the return type to be our TooltipBubble
    // component.
    children: (PopperChildrenProps) => React.Element<typeof TooltipBubble>,

    // The element that anchors the tooltip bubble.
    // This is used to position the bubble.
    anchorElement: ?HTMLElement,

    // Where should the bubble try to go with respect to its anchor.
    placement: Placement,
|};

export default class TooltipPopper extends React.Component<Props> {
    _renderPositionedContent(childrenProps: PopperJSChildrenProps) {
        const {children, placement} = this.props;

        // We'll hide some complexity from the children here and ensure
        // that our placement always has a value.
        childrenProps.placement = childrenProps.placement || placement;

        return children(childrenProps);
    }

    render() {
        const {anchorElement, placement} = this.props;
        return (
            <Popper
                referenceElement={anchorElement}
                placement={placement}
                modifiers={{
                    wbVisibility: visibilityModifierDefaultConfig,
                    preventOverflow: {boundariesElement: "window"},
                }}
            >
                {(props) => this._renderPositionedContent(props)}
            </Popper>
        );
    }
}

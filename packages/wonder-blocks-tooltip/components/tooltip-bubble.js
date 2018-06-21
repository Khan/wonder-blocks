// @flow
import * as React from "react";
import {Popper} from "react-popper";
import {visibilityModifierDefaultConfig} from "../util/visibility-modifier.js";

import type {PopperChildrenProps} from "react-popper";

type Props = {|
    // The content to be shown in the bubble.
    // TODO(somewhatabstract): Make this the TooltipContent type.
    children: string,

    // The element that anchors the tooltip bubble.
    // This is used to position the bubble.
    anchorElement: ?HTMLElement,
|};

export default class TooltipBubble extends React.Component<Props> {
    _renderContent(childrenProps: PopperChildrenProps) {
        const {children} = this.props;
        const {
            ref,
            outOfBoundaries,
            style,
            placement,
            //  arrowProps,
        } = childrenProps;

        return (
            <div
                data-placement={placement}
                ref={ref}
                style={{
                    ...style,
                    pointerEvents: "none",
                    ...(outOfBoundaries ? {display: "none"} : {}),
                }}
            >
                {children}
            </div>
        );
    }

    render() {
        const {anchorElement} = this.props;
        return (
            <Popper
                referenceElement={anchorElement}
                placement="left"
                modifiers={{
                    preventOverflow: {boundariesElement: "viewport"},
                    wbVisibility: visibilityModifierDefaultConfig,
                }}
            >
                {(p) => this._renderContent(p)}
            </Popper>
        );
    }
}

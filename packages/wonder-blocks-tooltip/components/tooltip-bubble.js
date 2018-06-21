// @flow
import * as React from "react";
import {Popper} from "react-popper";
import type {PopperChildrenProps} from "react-popper";

type Props = {|
    // The content to be shown in the bubble.
    // TODO(somewhatabstract): Make this the TooltipContent type.
    children: string,
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

        if (outOfBoundaries) {
            return null;
        }
        return (
            <div
                data-placement={placement}
                ref={ref}
                style={{
                    ...style,
                    pointerEvents: "none",
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
                    // kacustom: {
                    //     enabled: true,
                    //     fn: (data) => this.kacustom(data),
                    // },
                }}
            >
                {(p) => this._renderContent(p)}
            </Popper>
        );
    }
}

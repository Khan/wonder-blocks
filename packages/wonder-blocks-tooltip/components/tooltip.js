// @flow
import * as React from "react";

import {Text as WbText} from "@khanacademy/wonder-blocks-core";

import TooltipPortalMounter from "./tooltip-portal-mounter";
import TooltipAnchor from "./tooltip-anchor.js";
import TooltipBubble from "./tooltip-bubble.js";

type Props = {|
    // The content for anchoring the tooltip.
    // This component will be used to position the tooltip.
    children: React.Element<any> | string,

    // The content to render in the tooltip.
    // TODO(somewhatabstract): Update to allow TooltipContent or string
    content: string,

    // When true, the child element will be given tabindex=0
    // to make it keyboard focusable. This value defaults to true. One might set
    // this to false in circumstances where the wrapped component already can
    // receive focus or contains an element that can.
    // Use good judgement when overriding this value, the tooltip content should
    // be accessible via keyboard in all circumstances where the tooltip would
    // appear using the mouse, so very those use-cases.
    forceAnchorFocusivity?: boolean,

    // TODO(somewhatabstract): Add other props per spec
|};

type State = {|
    anchorElement: ?HTMLElement,
|};

export default class Tooltip extends React.Component<Props, State> {
    static defaultProps = {
        forceAnchorFocusivity: true,
    };

    state = {anchorElement: null};

    _updateAnchorElement(ref: ?Element) {
        if (ref && ref !== this.state.anchorElement) {
            this.setState({anchorElement: ((ref: any): HTMLElement)});
        }
    }

    _renderAnchorElement() {
        const {children} = this.props;
        if (typeof children === "string") {
            return <WbText>{children}</WbText>;
        } else {
            return children;
        }
    }

    _renderBubble(active: boolean): ?React.Element<typeof TooltipBubble> {
        if (!active) {
            return null;
        }
        return (
            <TooltipBubble anchorElement={this.state.anchorElement}>
                {this.props.content}
            </TooltipBubble>
        );
    }

    render() {
        const {forceAnchorFocusivity} = this.props;
        return (
            <TooltipAnchor
                forceAnchorFocusivity={forceAnchorFocusivity}
                anchorRef={(r) => this._updateAnchorElement(r)}
            >
                {(active) => (
                    <TooltipPortalMounter bubble={this._renderBubble(active)}>
                        {this._renderAnchorElement()}
                    </TooltipPortalMounter>
                )}
            </TooltipAnchor>
        );
    }
}

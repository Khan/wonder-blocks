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

    // TODO(somewhatabstract): Add other props per spec
|};

type State = {|
    anchorElement: ?HTMLElement,
|};

export default class Tooltip extends React.Component<Props, State> {
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
        return (
            <TooltipAnchor anchorRef={(r) => this._updateAnchorElement(r)}>
                {(active) => (
                    <TooltipPortalMounter bubble={this._renderBubble(active)}>
                        {this._renderAnchorElement()}
                    </TooltipPortalMounter>
                )}
            </TooltipAnchor>
        );
    }
}

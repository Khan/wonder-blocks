// @flow
/**
 * The Tooltip component provides the means to anchor some additional
 * information to some content. The additional information is shown in a
 * callout that hovers above the page content. This additional information is
 * invoked by hovering over the anchored content, or focusing all or part of the
 * anchored content.
 *
 * This component is structured as follows:
 *
 * Tooltip (this component)
 * - TooltipAnchor (provides hover/focus behaviors on anchored content)
 *   - TooltipPortalMounter (creates portal into which the callout is rendered)
 * --------------------------- [PORTAL BOUNDARY] ------------------------------
 * - TooltipPopper (provides positioning for the callout using react-popper)
 *   - TooltipBubble (renders the callout borders, background and shadow)
 *     - TooltipContent (renders the callout content; the actual information)
 *     - TooltipTail (renders the callout tail and shadow that points from the
 *                     callout to the anchor content)
 */
import * as React from "react";

import {Text} from "@khanacademy/wonder-blocks-core";

import TooltipPortalMounter from "./tooltip-portal-mounter";
import TooltipAnchor from "./tooltip-anchor.js";
import TooltipBubble from "./tooltip-bubble.js";
import TooltipContent from "./tooltip-content.js";
import TooltipPopper from "./tooltip-popper.js";

import type {Placement} from "../util/types.js";
import type {Typography} from "@khanacademy/wonder-blocks-typography";

type Props = {|
    // The content for anchoring the tooltip.
    // This component will be used to position the tooltip.
    children: React.Element<any> | string,

    // The title of the tooltip.
    // Optional.
    title?: string | React.Element<Typography>,

    // The content to render in the tooltip.
    content: string | React.Element<typeof TooltipContent>,

    // When true, the child element will be given tabindex=0
    // to make it keyboard focusable. This value defaults to true. One might set
    // this to false in circumstances where the wrapped component already can
    // receive focus or contains an element that can.
    // Use good judgement when overriding this value, the tooltip content should
    // be accessible via keyboard in all circumstances where the tooltip would
    // appear using the mouse, so very those use-cases.
    forceAnchorFocusivity?: boolean,

    // Where the tooltip should appear in relation to the anchor element.
    placement?: Placement,

    // TODO(somewhatabstract): Add other props per spec
|};

type State = {|
    anchorElement: ?HTMLElement,
|};

export default class Tooltip extends React.Component<Props, State> {
    static defaultProps = {
        forceAnchorFocusivity: true,
        placement: "top",
    };

    state = {anchorElement: null};

    _updateAnchorElement(ref: ?Element) {
        if (ref && ref !== this.state.anchorElement) {
            this.setState({anchorElement: ((ref: any): HTMLElement)});
        }
    }

    _renderAnchorElement() {
        // We need to make sure we can anchor on our content.
        // If the content is just a string, we wrap it in a Text element
        // so as not to affect styling or layout but still have an element
        // to anchor to.
        const {children} = this.props;
        if (typeof children === "string") {
            return <Text>{children}</Text>;
        } else {
            return children;
        }
    }

    _renderBubbleContent() {
        const {title, content} = this.props;
        if (typeof content === "string") {
            return <TooltipContent title={title}>{content}</TooltipContent>;
        } else if (title) {
            return React.cloneElement(content, {title});
        } else {
            return content;
        }
    }

    _renderPopper(active: boolean) {
        if (!active) {
            return null;
        }

        const {placement} = this.props;
        return (
            <TooltipPopper
                anchorElement={this.state.anchorElement}
                placement={placement || Tooltip.defaultProps.placement}
            >
                {(props) => (
                    <TooltipBubble
                        style={props.style}
                        tailOffset={props.tailOffset}
                        outOfBoundaries={props.outOfBoundaries}
                        placement={props.placement}
                        updateTailRef={props.updateTailRef}
                        updateBubbleRef={props.updateBubbleRef}
                    >
                        {this._renderBubbleContent()}
                    </TooltipBubble>
                )}
            </TooltipPopper>
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
                    <TooltipPortalMounter anchor={this._renderAnchorElement()}>
                        {this._renderPopper(active)}
                    </TooltipPortalMounter>
                )}
            </TooltipAnchor>
        );
    }
}

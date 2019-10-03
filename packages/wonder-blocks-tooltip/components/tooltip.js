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
import * as ReactDOM from "react-dom";

import {
    UniqueIDProvider,
    type IIdentifierFactory,
} from "@khanacademy/wonder-blocks-core";
import {maybeGetPortalMountedModalHostElement} from "@khanacademy/wonder-blocks-modal";
import type {Typography} from "@khanacademy/wonder-blocks-typography";
import type {AriaProps} from "@khanacademy/wonder-blocks-core";

import TooltipAnchor from "./tooltip-anchor.js";
import TooltipBubble from "./tooltip-bubble.js";
import TooltipContent from "./tooltip-content.js";
import TooltipPopper from "./tooltip-popper.js";
import type {Placement} from "../util/types.js";

type Props = {|
    ...AriaProps,

    /**
     * The content for anchoring the tooltip.
     * This component will be used to position the tooltip.
     */
    children: React.Element<any> | string,

    /**
     * The title of the tooltip.
     * Optional.
     */
    title?: string | React.Element<Typography>,

    /**
     * The content to render in the tooltip.
     */
    content: string | React.Element<typeof TooltipContent>,

    /**
     * The unique identifier to give to the tooltip. Provide this in cases where
     * you want to override the default accessibility solution. This identifier
     * will be applied to the tooltip bubble content.
     *
     * By providing this identifier, the children that this tooltip anchors to
     * will not be automatically given the aria-desribedby attribute. Instead,
     * the accessibility solution is the responsibility of the caller.
     *
     * If this is not provided, the aria-describedby attribute will be added
     * to the children with a unique identifier pointing to the tooltip bubble
     * content.
     */
    id?: string,

    /**
     * When true, if a tabindex attribute is not already present on the element
     * wrapped by the anchor, the element will be given tabindex=0 to make it
     * keyboard focusable; otherwise, does not attempt to change the ability to
     * focus the anchor element.
     *
     * Defaults to true.
     *
     * One might set this to false in circumstances where the wrapped component
     * already can receive focus or contains an element that can.
     * Use good judgement when overriding this value, the tooltip content should
     * be accessible via keyboard in all circumstances where the tooltip would
     * appear using the mouse, so verify those use-cases.
     *
     * Also, note that the aria-describedby attribute is attached to the root
     * anchor element, so you may need to implement an additional accessibility
     * solution when overriding anchor focusivity.
     */
    forceAnchorFocusivity?: boolean,

    /**
     * Where the tooltip should appear in relation to the anchor element.
     * Defaults to "top".
     */
    placement: Placement,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,
|};

type State = {|
    active: boolean,
    anchorElement: ?HTMLElement,
    timeoutID: ?TimeoutID,
|};

export default class Tooltip extends React.Component<Props, State> {
    static defaultProps = {
        forceAnchorFocusivity: true,
        placement: "top",
    };

    state = {
        active: false,
        anchorElement: null,
        timeoutID: null,
    };
    static ariaContentId = "aria-content";

    _updateAnchorElement(ref: ?Element) {
        if (ref && ref !== this.state.anchorElement) {
            this.setState({anchorElement: ((ref: any): HTMLElement)});
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

    _renderPopper(ids?: IIdentifierFactory) {
        const {id} = this.props;
        const bubbleId = ids ? ids.get(Tooltip.ariaContentId) : id;
        if (!bubbleId) {
            throw new Error("Did not get an identifier factory nor a id prop");
        }

        const {placement} = this.props;
        return (
            <TooltipPopper
                anchorElement={this.state.anchorElement}
                placement={placement}
            >
                {(props) => (
                    <TooltipBubble
                        id={bubbleId}
                        style={props.style}
                        tailOffset={props.tailOffset}
                        outOfBoundaries={props.outOfBoundaries}
                        placement={props.placement}
                        updateTailRef={props.updateTailRef}
                        updateBubbleRef={props.updateBubbleRef}
                        onActiveChanged={(active) => this.setState({active})}
                        anchorTimeoutID={this.state.timeoutID}
                        onTimeoutChanged={(timeoutID) =>
                            this.setState({timeoutID})
                        }
                    >
                        {this._renderBubbleContent()}
                    </TooltipBubble>
                )}
            </TooltipPopper>
        );
    }

    _getHost() {
        const {anchorElement} = this.state;

        return (
            maybeGetPortalMountedModalHostElement(anchorElement) ||
            document.body
        );
    }

    _renderTooltipAnchor(ids?: IIdentifierFactory) {
        const {children, forceAnchorFocusivity} = this.props;
        const {active} = this.state;

        const popperHost = this._getHost();

        // TODO(kevinb): update to use ReactPopper's React 16-friendly syntax
        return (
            <React.Fragment>
                <TooltipAnchor
                    forceAnchorFocusivity={forceAnchorFocusivity}
                    anchorRef={(r) => this._updateAnchorElement(r)}
                    onActiveChanged={(active) => this.setState({active})}
                    onTimeoutChanged={(timeoutID) => this.setState({timeoutID})}
                    ids={ids}
                >
                    {children}
                </TooltipAnchor>
                {popperHost &&
                    active &&
                    ReactDOM.createPortal(this._renderPopper(ids), popperHost)}
            </React.Fragment>
        );
    }

    render() {
        const {id} = this.props;
        if (id) {
            // Let's bypass the extra weight of an id provider since we don't
            // need it.
            return this._renderTooltipAnchor();
        } else {
            return (
                <UniqueIDProvider scope="tooltip" mockOnFirstRender={true}>
                    {(ids) => this._renderTooltipAnchor(ids)}
                </UniqueIDProvider>
            );
        }
    }
}

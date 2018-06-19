// @flow
/**
 * This component turns the given content into an accessible anchor for
 * positioning and displaying tooltips.
 */
import * as React from "react";
import * as ReactDOM from "react-dom";

import TooltipPortalMounter from "./tooltip-portal-mounter.js";

// NOTE(somewhatabstract): Jest snapshots don't like findDOMNode, so we need to
// detect that.
const _isJest = typeof jest !== "undefined";

type Props = {|
    // The content for anchoring the tooltip.
    // This must be a single element or string.
    children: React.Element<typeof TooltipPortalMounter>,

    // Callback to be invoked whenever the anchor changes state from active to
    // inactive or vice-versa.
    onStateChanged: (active: boolean) => mixed,

    // Callback to be invoked when the anchored content is mounted.
    // This provides a reference to the anchored content, which can then be
    // used for calculating tooltip bubble positioning.
    anchorRef: (?Element) => mixed,

    // When true, the element wrapped by the anchor will be given tabindex=0
    // to make it keyboard focusable. This value defaults to true. One might set
    // this to false in circumstances where the wrapped component already can
    // receive focus or contains an element that can.
    // Use good judgement when overriding this value, the tooltip content should
    // be accessible via keyboard in all circumstances where the tooltip would
    // appear using the mouse, so very those use-cases.
    forceAnchorFocusivity?: boolean,
|};

export default class TooltipAnchor extends React.Component<Props> {
    _anchorNode: ?Element;
    _focused: boolean;
    _hovered: boolean;

    static defaultProps = {
        forceAnchorFocusivity: true,
    };

    componentDidMount() {
        // NOTE(somewhatabstract): Jest doesn't like ReactDOM.findDOMNode so if
        // our snapshot tests are running, let's just not get the reference.
        // This isn't ideal; I wonder if we should return a newly created DOM
        // element just for jest.
        const anchorNode = _isJest ? null : ReactDOM.findDOMNode(this);

        // This should never happen, but we have this check here to make flow
        // happy and ensure that if this does happen, we'll know about it.
        if (anchorNode instanceof Text) {
            throw new Error(
                "TooltipAnchor must be applied to an Element. Text content is not supported.",
            );
        }

        this._anchorNode = anchorNode;
        this._updateFocusivity();
        if (anchorNode) {
            anchorNode.addEventListener("focusin", () => this._handleFocusIn());
            anchorNode.addEventListener("focusout", () =>
                this._handleFocusOut(),
            );
            anchorNode.addEventListener("mouseenter", () =>
                this._handleMouseEnter(),
            );
            anchorNode.addEventListener("mouseleave", () =>
                this._handleMouseLeave(),
            );

            this.props.anchorRef(this._anchorNode);
        }
    }

    componentDidUpdate() {
        this._updateFocusivity();
    }

    componentWillUnmount() {
        const anchorNode = this._anchorNode;
        if (anchorNode) {
            anchorNode.removeEventListener("focusin", () =>
                this._handleFocusIn(),
            );
            anchorNode.removeEventListener("focusout", () =>
                this._handleFocusOut(),
            );
            anchorNode.removeEventListener("mouseenter", () =>
                this._handleMouseEnter(),
            );
            anchorNode.removeEventListener("mouseleave", () =>
                this._handleMouseLeave(),
            );
        }
    }

    _updateFocusivity() {
        const anchorNode = this._anchorNode;
        if (!anchorNode) {
            return;
        }
        const {forceAnchorFocusivity} = this.props;
        const currentTabIndex = anchorNode.getAttribute("tabindex");

        if (forceAnchorFocusivity && !currentTabIndex) {
            // Ensure that the anchor point is keyboard focusable so that
            // we can show the tooltip for visually impaired users that don't
            // use pointer devices nor assistive technology like screen readers.
            anchorNode.setAttribute("tabindex", "0");
        } else if (currentTabIndex) {
            anchorNode.removeAttribute("tabindex");
        }
    }

    _updateActiveState(hovered: boolean, focused: boolean) {
        // Take a snapshot of the old and new state.
        const oldState = !!(this._hovered || this._focused);
        const newState = !!(hovered || focused);

        // Update our stored values.
        this._hovered = hovered;
        this._focused = focused;

        // If we changed state, call our subscriber and let them know.
        if (oldState !== newState) {
            this.props.onStateChanged(newState);
        }
    }

    _handleFocusIn() {
        this._updateActiveState(this._hovered, true);
    }

    _handleFocusOut() {
        this._updateActiveState(this._hovered, false);
    }

    _handleMouseEnter() {
        this._updateActiveState(true, this._focused);
    }

    _handleMouseLeave() {
        this._updateActiveState(false, this._focused);
    }

    render() {
        return this.props.children;
    }
}

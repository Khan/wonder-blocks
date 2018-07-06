// @flow
/**
 * This component turns the given content into an accessible anchor for
 * positioning and displaying tooltips.
 */
import * as React from "react";
import * as ReactDOM from "react-dom";

import TooltipPortalMounter from "./tooltip-portal-mounter.js";
import ActiveTracker from "../util/active-tracker.js";
import {
    TooltipAppearanceDelay,
    TooltipDisappearanceDelay,
} from "../util/constants.js";

import type {IActiveTrackerSubscriber} from "../util/active-tracker.js";

type Props = {|
    /**
     * A method that renders the content for anchoring the tooltip.
     * This must return a TooltipPortalMounter component.
     */
    children: (active: boolean) => React.Element<typeof TooltipPortalMounter>,

    /**
     * Callback to be invoked when the anchored content is mounted.
     * This provides a reference to the anchored content, which can then be
     * used for calculating tooltip bubble positioning.
     */
    anchorRef: (?Element) => mixed,

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
     */
    forceAnchorFocusivity?: boolean,
|};

type State = {|
    /** Is the anchor active or not? */
    active: boolean,
|};

const TRACKER = new ActiveTracker();

export default class TooltipAnchor extends React.Component<Props, State>
    implements IActiveTrackerSubscriber {
    _weSetFocusivity: ?boolean;
    _anchorNode: ?Element;
    _focused: boolean;
    _hovered: boolean;
    _stolenFromUs: boolean;
    _unsubscribeFromTracker: ?() => void;
    _timeoutID: ?TimeoutID;

    static defaultProps = {
        forceAnchorFocusivity: true,
    };

    state = {
        active: false,
    };

    componentDidMount() {
        const anchorNode = ReactDOM.findDOMNode(this);

        // This should never happen, but we have this check here to make flow
        // happy and ensure that if this does happen, we'll know about it.
        if (anchorNode instanceof Text) {
            throw new Error(
                "TooltipAnchor must be applied to an Element. Text content is not supported.",
            );
        }

        this._unsubscribeFromTracker = TRACKER.subscribe(this);
        this._anchorNode = anchorNode;
        this._updateFocusivity();
        if (anchorNode) {
            /**
             * TODO(somewhatabstract): Work out how to allow pointer to go over
             * the tooltip content to keep it active. This likely requires
             * pointer events but that would break the obscurement checks we do.
             * So, careful consideration required. See
             */
            anchorNode.addEventListener("focusin", this._handleFocusIn);
            anchorNode.addEventListener("focusout", this._handleFocusOut);
            anchorNode.addEventListener("mouseenter", this._handleMouseEnter);
            anchorNode.addEventListener("mouseleave", this._handleMouseLeave);

            this.props.anchorRef(this._anchorNode);
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (
            prevProps.forceAnchorFocusivity !==
                this.props.forceAnchorFocusivity ||
            prevProps.children !== this.props.children
        ) {
            this._updateFocusivity();
        }
    }

    componentWillUnmount() {
        this._unsubscribeFromTracker && this._unsubscribeFromTracker();
        this._clearPendingAction();

        const anchorNode = this._anchorNode;
        if (anchorNode) {
            anchorNode.removeEventListener("focusin", this._handleFocusIn);
            anchorNode.removeEventListener("focusout", this._handleFocusOut);
            anchorNode.removeEventListener(
                "mouseenter",
                this._handleMouseEnter,
            );
            anchorNode.removeEventListener(
                "mouseleave",
                this._handleMouseLeave,
            );
        }
        if (this.state.active) {
            document.removeEventListener("keyup", this._handleKeyUp);
        }
    }

    activeStateStolen = () => {
        // Something wants the active state.
        // Do we have it? If so, let's remember that.
        // If we are already active, or we're inactive but have a timeoutID,
        // then it was stolen from us.
        this._stolenFromUs = this.state.active || !!this._timeoutID;
        // Let's first tell ourselves we're not focused (otherwise the tooltip
        // will be sticky on the next hover of this anchor and that just looks
        // weird).
        this._focused = false;
        // Now update our actual state.
        this._setActiveState(false, true);
    };

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
            this._weSetFocusivity = true;
        } else if (!forceAnchorFocusivity && currentTabIndex) {
            // We may not be forcing it, but we also want to ensure that if we
            // did before, we remove it.
            if (this._weSetFocusivity) {
                anchorNode.removeAttribute("tabindex");
                this._weSetFocusivity = false;
            }
        }
    }

    _updateActiveState(hovered: boolean, focused: boolean) {
        // Update our stored values.
        this._hovered = hovered;
        this._focused = focused;

        this._setActiveState(hovered || focused);
    }

    _clearPendingAction() {
        if (this._timeoutID) {
            clearTimeout(this._timeoutID);
            this._timeoutID = null;
        }
    }

    _setActiveState(active: boolean, instant?: boolean) {
        if (
            this._stolenFromUs ||
            active !== this.state.active ||
            (!this.state.active && this._timeoutID)
        ) {
            // If we are about to lose active state or change it, we need to
            // cancel any pending action to show ourselves.
            // So, if active is stolen from us, we are changing active state,
            // or we are inactive and have a timer, clear the action.
            this._clearPendingAction();
        } else if (active === this.state.active) {
            // Nothing to do if we're already active.
            return;
        }

        // Determine if we are doing things immediately or not.
        instant = instant || (active && TRACKER.steal(this));
        if (instant) {
            if (active) {
                document.addEventListener("keyup", this._handleKeyUp);
            } else {
                document.removeEventListener("keyup", this._handleKeyUp);
            }
            this.setState({active});
            if (!this._stolenFromUs && !active) {
                // Only the very last thing going inactive will giveup
                // the stolen active state.
                TRACKER.giveup();
            }
            this._stolenFromUs = false;
        } else {
            const delay = active
                ? TooltipAppearanceDelay
                : TooltipDisappearanceDelay;
            this._timeoutID = setTimeout(() => {
                this._timeoutID = null;
                this._setActiveState(active, true);
            }, delay);
        }
    }

    _handleFocusIn = () => {
        this._updateActiveState(this._hovered, true);
    };

    _handleFocusOut = () => {
        this._updateActiveState(this._hovered, false);
    };

    _handleMouseEnter = () => {
        this._updateActiveState(true, this._focused);
    };

    _handleMouseLeave = () => {
        this._updateActiveState(false, this._focused);
    };

    _handleKeyUp = (e: KeyboardEvent) => {
        // We check the key as that's keyboard layout agnostic and also avoids
        // the minefield of deprecated number type properties like keyCode and
        // which, with the replacement code, which uses a string instead.
        if (e.key === "Escape" && this.state.active) {
            // Stop the event going any further.
            // For cancellation events, like the Escape key, we generally should
            // air on the side of caution and only allow it to cancel one thing.
            // So, it's polite for us to stop propagation of the event.
            // Otherwise, we end up with UX where one Escape key press
            // unexpectedly cancels multiple things.
            //
            // For example, using Escape to close a tooltip or a dropdown while
            // displaying a modal and having the modal close as well. This would
            // be annoyingly bad UX.
            e.preventDefault();
            e.stopPropagation();
            this._updateActiveState(false, false);
        }
    };

    render() {
        return this.props.children(this.state.active);
    }
}

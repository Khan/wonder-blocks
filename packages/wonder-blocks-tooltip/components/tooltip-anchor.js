// @flow
/**
 * This component turns the given content into an accessible anchor for
 * positioning and displaying tooltips.
 */
import * as React from "react";
import * as ReactDOM from "react-dom";

import TooltipPortalMounter from "./tooltip-portal-mounter.js";

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

export default class TooltipAnchor extends React.Component<Props, State> {
    _weSetFocusivity: ?boolean;
    _anchorNode: ?Element;
    _focused: boolean;
    _hovered: boolean;

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

        this._anchorNode = anchorNode;
        this._updateFocusivity();
        if (anchorNode) {
            // TODO(somewhatabstract): Detect ESC key to deactivate
            /**
             * TODO(somewhatabstract): Work out how to allow pointer to go over
             * the tooltip content to keep it active. This likely requires
             * pointer events but that would break the obscurement checks we do.
             * So, careful consideration required.
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
        // Take a snapshot of the old and new state.
        const oldState = this.state.active;
        const newState = hovered || focused;

        // Update our stored values.
        this._hovered = hovered;
        this._focused = focused;

        // If we changed state, call our subscriber and let them know.
        if (oldState !== newState) {
            this.setState({active: newState});

            if (newState) {
                document.addEventListener("keyup", this._handleKeyUp);
            } else {
                document.removeEventListener("keyup", this._handleKeyUp);
            }
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
        const escape = 27;
        const keyCode = e.which || e.keyCode;
        if (keyCode === escape && this.state.active) {
            e.preventDefault();
            e.stopImmediatePropagation();
            this._updateActiveState(false, false);
        }
    };

    render() {
        return this.props.children(this.state.active);
    }
}

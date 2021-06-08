// @flow

import * as React from "react";
import ReactDOM from "react-dom";

import typeof PopoverContent from "./popover-content.js";
import typeof PopoverContentCore from "./popover-content-core.js";

type Props = {|
    /**
     * Called when `esc` is pressed
     */
    onClose: () => mixed,

    /**
     * Popover Content ref.
     * Will close the popover when clicking outside this element.
     */
    contentRef?: RefObject<PopoverContentCore | PopoverContent>,
|};

type State = {|
    /**
     * Tracks the first click triggered by the click event listener.
     */
    isFirstClick: boolean,
|};

/**
 * A component that, when mounted, calls `onClose` when Escape is pressed.
 * @see @khanacademy/wonder-blocks-modal/components/modal-launcher.js
 */
export default class PopoverKeypressListener extends React.Component<
    Props,
    State,
> {
    state: State = {
        isFirstClick: true,
    };

    componentDidMount() {
        window.addEventListener("keyup", this._handleKeyup);
        window.addEventListener("click", this._handleClick);
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this._handleKeyup);
        window.removeEventListener("click", this._handleClick);
    }

    _handleKeyup: (e: KeyboardEvent) => void = (e) => {
        // We check the key as that's keyboard layout agnostic and also avoids
        // the minefield of deprecated number type properties like keyCode and
        // which, with the replacement code, which uses a string instead.
        if (e.key === "Escape") {
            // Stop the event going any further.
            // For cancellation events, like the Escape key, we generally should
            // air on the side of caution and only allow it to cancel one thing.
            // So, it's polite for us to stop propagation of the event.
            // Otherwise, we end up with UX where one Escape key press
            // unexpectedly cancels multiple things.
            e.preventDefault();
            e.stopPropagation();
            this.props.onClose();
        }
    };

    _handleClick: (e: KeyboardEvent) => void = (e) => {
        // Prevents the problem where clicking the trigger button
        // triggers a click event and immediately closes the popover.
        if (this.state.isFirstClick) {
            this.setState({isFirstClick: false});
            return;
        }

        const node = ReactDOM.findDOMNode(this.props.contentRef?.current);
        if (node && !node.contains((e.target: any))) {
            // Stop the event going any further.
            // Only allow click to cancel one thing at a time.
            e.preventDefault();
            e.stopPropagation();
            this.props.onClose();
        }
    };

    render(): React.Node {
        return null;
    }
}

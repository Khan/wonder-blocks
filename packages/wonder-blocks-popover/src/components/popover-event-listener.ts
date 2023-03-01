import * as React from "react";
import ReactDOM from "react-dom";

import PopoverContent from "./popover-content";
import PopoverContentCore from "./popover-content-core";

type Props = {
    /**
     * Called when `esc` is pressed
     */
    onClose: () => unknown;
    /**
     * Popover Content ref.
     * Will close the popover when clicking outside this element.
     */
    contentRef?: React.RefObject<PopoverContentCore | PopoverContent>;
};

type State = {
    /**
     * Tracks the first click triggered by the click event listener.
     */
    isFirstClick: boolean;
};

/**
 * A component that, when mounted, calls `onClose` when certain events occur.
 * This includes when pressing Escape or clicking outside the Popover.
 * @see @khanacademy/wonder-blocks-modal/components/modal-launcher.js
 */
export default class PopoverEventListener extends React.Component<
    Props,
    State
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

    _handleClick: (e: MouseEvent) => void = (e) => {
        // Prevents the problem where clicking the trigger button
        // triggers a click event and immediately closes the popover.
        if (this.state.isFirstClick) {
            this.setState({isFirstClick: false});
            return;
        }

        const node = ReactDOM.findDOMNode(this.props.contentRef?.current);
        if (node && !node.contains(e.target as any)) {
            // Stop the event going any further.
            // Only allow click to cancel one thing at a time.
            e.preventDefault();
            e.stopPropagation();
            this.props.onClose();
        }
    };

    render(): React.ReactElement | null {
        return null;
    }
}

// @flow

import * as React from "react";

type Props = {|
    /**
     * Called when `esc` is pressed
     */
    onClose: () => mixed,
|};

/**
 * A component that, when mounted, calls `onClose` when Escape is pressed.
 * @see @khanacademy/wonder-blocks-modal/components/modal-launcher.js
 */
export default class PopoverKeypressListener extends React.Component<Props> {
    componentDidMount() {
        window.addEventListener("keyup", this._handleKeyup);
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this._handleKeyup);
    }

    _handleKeyup = (e: KeyboardEvent) => {
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

    render() {
        return null;
    }
}

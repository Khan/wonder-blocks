// @flow
import * as React from "react";
import {icons} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";

import ModalContext from "./modal-context.js";

type Props = {|
    /**
     * Whether the button is on a dark/colored background.
     *
     * Sets primary button background color to white, and secondary and
     * tertiary button title to color.
     */
    light: boolean,

    /**
     * Called when the close button is clicked.
     */
    onClick?: () => mixed,
|};

/**
 * Context aware close button.
 *
 * If this button is rendered within a modal that was launched using ModalLauncher
 * then it will call the `closeModal` function provided by ModalContext.Consumer.
 * Otherwise, it calls the `onClick` method provided.
 */
export default class CloseButton extends React.Component<Props> {
    render() {
        const {light, onClick} = this.props;
        return (
            <ModalContext.Consumer>
                {({closeModal}) => {
                    if (closeModal && onClick) {
                        throw new Error(
                            "You've specified 'onClose' on a modal when using ModalLauncher.  Please specify 'onClose' on the ModalLauncher instead",
                        );
                    }
                    return (
                        <IconButton
                            icon={icons.dismiss}
                            // TODO(mdr): Translate this string for i18n.
                            aria-label="Close modal"
                            onClick={closeModal || onClick}
                            kind={light ? "primary" : "tertiary"}
                            light={light}
                        />
                    );
                }}
            </ModalContext.Consumer>
        );
    }
}

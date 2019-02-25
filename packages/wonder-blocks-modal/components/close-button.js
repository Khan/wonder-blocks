// @flow
import * as React from "react";
import {icons} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import ModalContext from "./modal-context.js";

type Props = {|
    light?: boolean,
    onClose?: () => void,
    style?: StyleType,
|};

export default class CloseButton extends React.Component<Props> {
    render() {
        const {light, onClose, style} = this.props;

        return (
            <ModalContext.Consumer>
                {({closeModal}) => {
                    if (closeModal && onClose) {
                        throw new Error(
                            "You've specified 'onClose' on a modal when using ModalLauncher.  Please specify 'onClose' on the ModalLauncher instead",
                        );
                    }

                    return (
                        <IconButton
                            icon={icons.dismiss}
                            // TODO(mdr): Translate this string for i18n.
                            // TODO(kevinb): provide a way to set this label
                            aria-label="Close modal"
                            onClick={onClose || closeModal}
                            kind={light ? "primary" : "tertiary"}
                            light={light}
                            style={style}
                        />
                    );
                }}
            </ModalContext.Consumer>
        );
    }
}

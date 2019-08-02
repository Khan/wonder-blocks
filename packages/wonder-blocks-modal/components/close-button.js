// @flow
import * as React from "react";
import {icons} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import ModalContext from "./modal-context.js";

type Props = {|
    /**
     * Whether the button is on a dark/colored background.
     *
     * Sets primary button background color to white, and secondary and
     * tertiary button title to color.
     */
    light?: boolean,

    /** Optional click handler */
    onClick?: () => mixed,

    /** Optional custom styles. */
    style?: StyleType,

    /**
     * Test ID used for e2e testing.
     *
     * In this case, this component is internal, so `testId` is composed with
     * the `testId` passed down from the Dialog variant + a suffix to scope it
     * to this component.
     *
     * @example
     * For testId="some-random-id"
     * The result will be: `some-random-id-modal-panel`
     */
    testId?: string,
|};

export default class CloseButton extends React.Component<Props> {
    render() {
        const {light, onClick, style, testId} = this.props;

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
                            // TODO(kevinb): provide a way to set this label
                            aria-label="Close modal"
                            onClick={onClick || closeModal}
                            kind={light ? "primary" : "tertiary"}
                            light={light}
                            style={style}
                            testId={testId}
                        />
                    );
                }}
            </ModalContext.Consumer>
        );
    }
}

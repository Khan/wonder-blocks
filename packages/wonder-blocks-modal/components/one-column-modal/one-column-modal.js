// @flow
import * as React from "react";
import {MediaLayout} from "@khanacademy/wonder-blocks-layout";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import LargeOneColumnModal from "./large-one-column-modal.js";
import SmallOneColumnModal from "./small-one-column-modal.js";

export type Props = {|
    ...AriaProps,

    /** The modal's content. */
    content: React.Node,

    /** The optional footer to display beneath the contents. */
    footer?: React.Node,

    /**
     * Called when the close button is clicked.
     *
     * If you're using `ModalLauncher`, you probably shouldn't use this prop!
     * Instead, to listen for when the modal closes, add an `onClose` handler
     * to the `ModalLauncher`.  Doing so will result in a console.warn().
     */
    onClose?: () => void,

    /**
     * Optional custom styles.
     */
    style?: StyleType,
|};

/**
 * A one-column modal layout.
 */
export default class OneColumnModal extends React.Component<Props> {
    render() {
        return (
            <MediaLayout>
                {({mediaSize}) =>
                    mediaSize === "small" ? (
                        <SmallOneColumnModal {...this.props} />
                    ) : (
                        <LargeOneColumnModal {...this.props} />
                    )
                }
            </MediaLayout>
        );
    }
}

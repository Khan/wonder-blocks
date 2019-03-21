// @flow
import * as React from "react";
import {MediaLayout} from "@khanacademy/wonder-blocks-layout";
import type {AriaProps} from "@khanacademy/wonder-blocks-core";

import LargeTwoColumnModal from "./large-two-column-modal.js";
import SmallTwoColumnModal from "./small-two-column-modal.js";

export type Props = {|
    ...AriaProps,

    /** Whether to allow the sidebar contents to be fullbleed. */
    fullBleedSidebar: boolean,

    /** The sidebar contents (which becomes the header on mobile screens). */
    sidebar: React.Node,

    /** The main contents. */
    content: React.Node,

    /** The optional footer to display beneath the content. */
    footer?: React.Node,

    /**
     * Called when the close button is clicked.
     *
     * If you're using `ModalLauncher`, you probably shouldn't use this prop!
     * Instead, to listen for when the modal closes, add an `onClose` handler
     * to the `ModalLauncher`.  Doing so will result in a console.warn().
     */
    onClose?: () => void,
|};

/**
 * A two-column modal layout.
 */
export default class TwoColumnModal extends React.Component<Props> {
    static defaultProps = {
        fullBleedSidebar: true,
    };

    render() {
        return (
            <MediaLayout>
                {({mediaSize}) =>
                    mediaSize === "small" ? (
                        <SmallTwoColumnModal {...this.props} />
                    ) : (
                        <LargeTwoColumnModal {...this.props} />
                    )
                }
            </MediaLayout>
        );
    }
}

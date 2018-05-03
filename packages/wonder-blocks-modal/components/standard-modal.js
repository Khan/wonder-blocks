// @flow
import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import Color from "wonder-blocks-color";
import {View} from "wonder-blocks-core";
import {
    HeadingMedium,
    HeadingSmall,
    LabelSmall,
} from "wonder-blocks-typography";

import ModalCloseButton from "./modal-close-button.js";
import {smOrSmaller, generateUniqueId} from "../util/util.js";

type Props = {
    /**
     * The content of the modal, appearing between the titlebar and footer.
     */
    content: React.Node,

    /**
     * The title of the modal, appearing in the titlebar.
     *
     * If a subtitle is also present, this becomes smaller to accommodate both
     * within the title bar.
     */
    title: string,

    /**
     * The subtitle of the modal, appearing in the titlebar, below the title.
     */
    subtitle?: string,

    /**
     * The content of the modal's footer. A great place for buttons!
     *
     * Content is right-aligned by default. To control alignment yourself,
     * provide a container element with 100% width.
     */
    footer: React.Node,

    /**
     * Called when the close button is clicked.
     *
     * If you're using `ModalLauncher`, you probably shouldn't use this prop!
     * Instead, to listen for when the modal closes, add an `onClose` handler
     * to the `ModalLauncher`.
     *
     * This defaults to a no-op via `defaultProps`. (When used in a
     * `ModalLauncher`, we'll automatically add an extra listener here via
     * `cloneElement`, so that the `ModalLauncher` can listen for close button
     * clicks too.)
     */
    onClickCloseButton: () => void,
};

/**
 * The "standard" modal layout: a titlebar, a content area, and a footer.
 */
export default class StandardModal extends React.Component<Props> {
    /** A unique HTML ID for the title element. */
    _titleId: string;

    /** A unique HTML ID for the subtitle element. */
    _subtitleId: string;

    static defaultProps = {
        onClickCloseButton: () => {},
    };

    constructor(props: Props) {
        super(props);

        // Generate a unique ID for this modal.
        //
        // TODO(mdr): Once we add snapshot tests for modals, we'll need to
        //     ensure that this function is deterministic, perhaps by mocking
        //     it during the snapshot test.
        const modalId = generateUniqueId();

        // Use that unique ID number to generate unique ID strings for this
        // modal's elements.
        const idPrefix = `wonder-blocks-standard-modal-${modalId}`;
        this._titleId = `${idPrefix}-title`;
        this._subtitleId = `${idPrefix}-title`;
    }

    _renderTitleAndSubtitle() {
        const {title, subtitle} = this.props;

        if (subtitle) {
            return (
                <View>
                    <HeadingSmall id={this._titleId}>{title}</HeadingSmall>
                    <LabelSmall id={this._subtitleId}>{subtitle}</LabelSmall>
                </View>
            );
        } else {
            return <HeadingMedium id={this._titleId}>{title}</HeadingMedium>;
        }
    }

    render() {
        return (
            <View
                style={styles.container}
                role="dialog"
                aria-labelledby={this._titleId}
                // TODO(mdr): Is the subtitle a reliable "description" of the
                //     modal? Or is it often used to convey more specific
                //     information?
                aria-describedby={this._subtitleId}
            >
                <View style={styles.titlebar}>
                    <View style={styles.closeButton}>
                        <ModalCloseButton
                            color="dark"
                            onClick={this.props.onClickCloseButton}
                        />
                    </View>
                    <View style={styles.titleAndSubtitle}>
                        {this._renderTitleAndSubtitle()}
                    </View>
                    <View style={styles.titleBarSpacer} />
                </View>
                <View style={styles.content}>{this.props.content}</View>
                <View style={styles.footer}>{this.props.footer}</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",

        width: "93.75%",
        maxWidth: 960,
        height: "81.25%",
        minHeight: 200,
        maxHeight: 624,

        background: Color.white,
        borderRadius: 4,
        overflow: "hidden",

        // On mobile, we consume the full screen size.
        [smOrSmaller]: {
            width: "100%",
            height: "100%",
            maxWidth: "none",
            maxHeight: "none",
            borderRadius: 0,
        },
    },

    titlebar: {
        flex: "0 0 auto",
        boxSizing: "border-box",
        minHeight: 64,
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 8,
        paddingBottom: 8,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",

        borderBottomStyle: "solid",
        borderBottomColor: Color.offBlack16,
        borderBottomWidth: 1,

        // On mobile, the titlebar is more compact.
        [smOrSmaller]: {
            minHeight: 56,
            paddingTop: 4,
            paddingBottom: 4,
        },
    },

    content: {
        flex: "1 1 auto",
        overflow: "auto",
    },

    footer: {
        flex: "0 0 auto",
        boxSizing: "border-box",
        minHeight: 64,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",

        borderTopStyle: "solid",
        borderTopColor: Color.offBlack16,
        borderTopWidth: 1,
    },

    // This element is centered within the titlebar, despite the presence of
    // the close button, because there's an additional right-hand spacer
    // element that grows at the same rate.
    titleAndSubtitle: {
        flex: "0 1 auto",
        textAlign: "center",
    },

    closeButton: {
        flex: "1 0 0",
    },

    titleBarSpacer: {
        flex: "1 0 0",

        // When the modal gets small, provide some minimal space here, to
        // prevent the text from running up against the edge.
        minWidth: 16,
    },
});

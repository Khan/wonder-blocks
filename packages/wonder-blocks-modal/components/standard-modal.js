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
     * This defaults to a no-op via `defaultProps`.
     */
    onClickCloseButton: () => void,
};

/**
 * The "standard" modal layout: a titlebar, a content area, and a footer.
 */
export default class StandardModal extends React.Component<Props> {
    static defaultProps = {
        onClickCloseButton: () => {},
    };

    _renderTitleAndSubtitle() {
        const {title, subtitle} = this.props;

        if (subtitle) {
            return (
                <View>
                    <HeadingSmall>{title}</HeadingSmall>
                    <LabelSmall>{subtitle}</LabelSmall>
                </View>
            );
        } else {
            return <HeadingMedium>{title}</HeadingMedium>;
        }
    }

    render() {
        return (
            <View style={styles.container}>
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
    },

    titlebar: {
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

        borderBottomStyle: "solid",
        borderBottomColor: Color.offBlack16,
        borderBottomWidth: 1,
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
        flex: "0 0 auto",
        textAlign: "center",
        paddingLeft: 16,
        paddingRight: 16,
    },

    closeButton: {
        flex: "1 0 0",
    },

    titleBarSpacer: {
        flex: "1 0 0",
    },
});

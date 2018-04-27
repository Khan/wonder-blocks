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
};

/**
 * The "standard" modal layout: a titlebar, a content area, and a footer.
 */
export default class StandardModal extends React.Component<Props> {
    _renderTitlebar() {
        const {title, subtitle} = this.props;

        if (subtitle) {
            return (
                <View style={[styles.titlebar]}>
                    <HeadingSmall>{title}</HeadingSmall>
                    <LabelSmall>{subtitle}</LabelSmall>
                </View>
            );
        } else {
            return (
                <View style={[styles.titlebar]}>
                    <HeadingMedium>{title}</HeadingMedium>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderTitlebar()}
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",

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

    titleAndSubtitle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    },
});

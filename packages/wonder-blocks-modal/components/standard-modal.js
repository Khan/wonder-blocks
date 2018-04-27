// @flow
import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import Color from "wonder-blocks-color";
import {View} from "wonder-blocks-core";
import {HeadingMedium} from "wonder-blocks-typography";

type Props = {
    /**
     * The content of the modal, appearing between the header and footer.
     */
    content: React.Node,

    /**
     * The title of the modal, appearing in the header.
     *
     * If a subtitle is also present, this becomes smaller to accommodate both
     * within the title bar.
     */
    title: string,

    /**
     * The subtitle of the modal, appearing in the header, below the title.
     */
    subtitle?: string,

    /**
     * The content of the modal's footer. A great place for buttons!
     *
     * Content is right-aligned by default. To control alignment yourself,
     * provide a container element with 100% width.
     */
    footer?: React.Node,
};

/**
 * The "standard" modal layout: a header, a content area, and a footer.
 */
export default class StandardModal extends React.Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <HeadingMedium style={styles.title}>
                        {this.props.title}
                    </HeadingMedium>
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

    header: {
        flex: "0 0 64px",

        display: "flex",
        flexDirection: "row",
        alignItems: "center",

        paddingLeft: 16,
        paddingRight: 16,

        borderBottomStyle: "solid",
        borderBottomColor: Color.offBlack16,
        borderBottomWidth: 1,
    },

    title: {
        flex: "1 0 0",
        textAlign: "center",
    },

    content: {
        flex: "1 1 auto",
        overflow: "auto",
    },

    footer: {
        flex: "0 0 64px",

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",

        paddingLeft: 16,
        paddingRight: 16,

        borderTopStyle: "solid",
        borderTopColor: Color.offBlack16,
        borderTopWidth: 1,
    },
});

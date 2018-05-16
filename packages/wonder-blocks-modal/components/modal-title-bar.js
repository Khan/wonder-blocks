// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "wonder-blocks-color";
import {View} from "wonder-blocks-core";
import {
    HeadingMedium,
    HeadingSmall,
    LabelSmall,
} from "wonder-blocks-typography";

type Props = {
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

    color: "light" | "dark",
    style?: any,
};

export default class ModalTitleBar extends React.Component<Props> {
    static defaultProps = {
        color: "light",
    };

    _renderTitleAndSubtitle() {
        const {title, subtitle} = this.props;

        if (subtitle) {
            return (
                <View>
                    <HeadingSmall id="wb-modal-title">{title}</HeadingSmall>
                    <LabelSmall>{subtitle}</LabelSmall>
                </View>
            );
        } else {
            return <HeadingMedium id="wb-modal-title">{title}</HeadingMedium>;
        }
    }

    render() {
        const {color, style} = this.props;
        return (
            <View
                style={[
                    styles.titlebar,
                    color === "dark" && styles.dark,
                    (gridSize) => gridSize === "small" && styles.small,
                    style,
                ]}
            >
                <View style={styles.titleAndSubtitle}>
                    {this._renderTitleAndSubtitle()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    },

    // On mobile, the titlebar is more compact.
    small: {
        minHeight: 56,
        paddingTop: 4,
        paddingBottom: 4,
    },

    // This element is centered within the titlebar
    titleAndSubtitle: {
        flex: "1",
        textAlign: "center",
    },

    dark: {
        background: Color.darkBlue,
        color: Color.white,
        borderBottomColor: Color.white64,
    },
});

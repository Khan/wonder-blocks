// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

const {View} = require("wonder-blocks-core");
const {HeadingLarge, LabelLarge, Body} = require("wonder-blocks-typography");
const Color = require("../index").default;

type Props = {
    color: string,
    name: string,
    desc: string,
    use: "text" | "icons" | null,
    width: 256,
    segments: 1 | 2 | 3,
};

const constants = {
    segmentHeight: 64,
};

export default class Swatch extends React.Component<Props> {
    static defaultProps = {
        width: 256,
        segments: 3,
        use: null,
    };

    renderThreeSegments() {
        const {color, use} = this.props;

        let content = null;
        if (use === "text") {
            content = "Aa";
        } else if (use === "icons") {
            content = "💡";
        }
        return (
            <View style={[styles.row, styles.border]}>
                <View
                    style={[
                        styles.box,
                        {background: color, color: Color.white},
                    ]}
                >
                    {content && <HeadingLarge>{content}</HeadingLarge>}
                </View>
                <View style={[styles.offWhite, styles.box, {color: color}]}>
                    {content && <HeadingLarge>{content}</HeadingLarge>}
                </View>
                <View style={[styles.white, styles.box, {color: color}]}>
                    {content && <HeadingLarge>{content}</HeadingLarge>}
                </View>
            </View>
        );
    }
    renderTwoSegments() {
        const {color, use} = this.props;

        let content = null;
        if (use === "text") {
            content = "Aa";
        } else if (use === "icons") {
            content = "💡";
        }
        return (
            <View style={[styles.row, styles.border]}>
                <View style={[styles.white, styles.box]} />
                <View
                    style={[
                        styles.box,
                        {background: color, color: Color.white},
                    ]}
                >
                    {content && <HeadingLarge>{content}</HeadingLarge>}
                </View>
            </View>
        );
    }
    renderOneSegment() {
        const {color, use} = this.props;
        let content = null;
        if (use === "text") {
            content = "Aa";
        } else if (use === "icon") {
            content = "💡";
        }
        return (
            <View
                style={[
                    styles.row,
                    styles.border,
                    styles.box,
                    {
                        background: color,
                        height: constants.segmentHeight,
                        color: Color.white64,
                    },
                ]}
            >
                {use === "text" &&
                    content && <HeadingLarge>{content}</HeadingLarge>}
            </View>
        );
    }
    render() {
        const {name, desc, use, segments, width} = this.props;
        return (
            <View style={[styles.container, {width}]}>
                {segments === 3 && this.renderThreeSegments()}
                {segments === 2 && this.renderTwoSegments()}
                {segments === 1 && this.renderOneSegment()}
                <View style={[styles.row, styles.split]}>
                    <LabelLarge>{name}</LabelLarge>
                    {use === "text" && (
                        <LabelLarge>Text &amp; icons</LabelLarge>
                    )}
                    {use === "icons" && <LabelLarge>Icons</LabelLarge>}
                </View>
                <View style={styles.row}>
                    <Body>{desc}</Body>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    offWhite: {
        background: Color.offWhite,
    },
    white: {
        background: Color.white,
    },
    border: {
        border: `solid 1px ${Color.offBlack32}`,
        borderRadius: 4,
        overflow: "hidden",
    },
    box: {
        width: 256,
        height: constants.segmentHeight,
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
    },
    split: {
        justifyContent: "space-between",
        marginTop: 16,
        marginBottom: 8,
    },
    container: {
        height: 192,
        color: Color.offBlack,
    },
});

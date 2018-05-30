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
    use: "text" | "icon" | null,
    width: 256 | 384,
    segments: 1 | 2 | 3,
};

export default class Swatch extends React.Component<Props> {
    static defaultProps = {
        width: 384,
        segments: 3,
        use: null,
    };

    renderThreeSegments() {
        const {color, use} = this.props;

        let content = null;
        if (use === "text") {
            content = "Aa";
        } else if (use === "icon") {
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
                    <HeadingLarge>{content}</HeadingLarge>
                </View>
                <View style={[styles.offWhite, styles.box, {color: color}]}>
                    <HeadingLarge>{content}</HeadingLarge>
                </View>
                <View style={[styles.white, styles.box, {color: color}]}>
                    <HeadingLarge>{content}</HeadingLarge>
                </View>
            </View>
        );
    }
    renderOneSegment() {
        const {color} = this.props;

        return (
            <View
                style={[
                    styles.row,
                    styles.border,
                    {background: color, height: 128},
                ]}
            />
        );
    }
    render() {
        const {color, name, desc, use, segments, width} = this.props;

        return (
            <View style={[styles.container, {width}]}>
                {segments === 3 && this.renderThreeSegments()}
                {segments === 1 && this.renderOneSegment()}
                <View style={[styles.row, styles.split]}>
                    {/rgba/.test(color) && <LabelLarge>{name}</LabelLarge>}
                    {!/rgba/.test(color) && (
                        <LabelLarge>{`${name} (${color})`}</LabelLarge>
                    )}
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
        width: 128,
        height: 128,
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
        height: 256,
        color: Color.offBlack,
    },
});

// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {
    HeadingLarge,
    LabelLarge,
    Body,
    Caption,
} from "@khanacademy/wonder-blocks-typography";
import Color from "../index.js";

type Props = {|
    color: string,
    name: string,
    desc: string,
    use: "text" | "icons" | null,
    width: 256,
    segments: 1 | 2 | 3,
|};

type DefaultProps = {|
    width: $PropertyType<Props, "width">,
    segments: $PropertyType<Props, "segments">,
    use: $PropertyType<Props, "use">,
|};

const constants = {
    segmentHeight: 64,
};

export default class Swatch extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        width: 256,
        segments: 3,
        use: null,
    };

    getContent(): ?string {
        const {use} = this.props;
        if (use === "text") {
            return "Aa";
        } else if (use === "icons") {
            return "💡";
        } else {
            return null;
        }
    }
    renderThreeSegments(): React.Node {
        const {color} = this.props;
        const content = this.getContent();
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
    renderTwoSegments(): React.Node {
        const {color} = this.props;
        const content = this.getContent();
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
    renderOneSegment(): React.Node {
        const {color, use} = this.props;
        const content = this.getContent();
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
                {use === "text" && content && (
                    <HeadingLarge>{content}</HeadingLarge>
                )}
            </View>
        );
    }
    render(): React.Node {
        const {color, name, desc, use, segments, width} = this.props;
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
                <View>
                    <Caption style={styles.tag}>{color}</Caption>
                    <Strut size={Spacing.xxxSmall_4} />
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
        color: Color.offBlack,
        paddingBottom: 16,
    },
    tag: {
        background: Color.offBlack8,
        border: `solid 1px ${Color.offBlack16}`,
        borderRadius: 2,
        marginRight: "auto",
        padding: `0 ${Spacing.xxxSmall_4}px`,
    },
});

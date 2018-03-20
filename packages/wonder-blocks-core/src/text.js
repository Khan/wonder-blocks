// @flow
import React, {Component} from "react";
import {StyleSheet} from "aphrodite";
import Color from "wonder-blocks-color";

import {processStyleList} from "./util.js";

type Props = {
    style?: any,
    tag: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    children?: any,
};

const isHeaderRegex = /^h[1-6]$/;

const styles = StyleSheet.create({
    text: {
        // Our primary text color, off-black, looks a lot like pure black.
        // We set it to be the default text color so that we don't ever
        // have to worry about trying to visually distinguish the two.
        color: Color.offBlack,

        // Disable subpixel antialiasing on Mac desktop for consistency of
        // rendering with mobile and Sketch (neither of which support it).
        // See https://bjango.com/articles/subpixeltext/ for more details.
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
    },
    header: {
        // User agent stylesheets add vertical margins to header tags by
        // default. We prefer to be more deliberate in our spacing instead.
        marginTop: 0,
        marginBottom: 0,
    },
});

export default class Text extends Component {
    props: Props;

    static defaultProps = {
        tag: "span",
    };

    render() {
        const isHeader = isHeaderRegex.test(this.props.tag);
        const {className, style} = processStyleList([
            styles.text,
            isHeader && styles.header,
            this.props.style,
        ]);

        return (
            <this.props.tag style={style} className={className}>
                {this.props.children}
            </this.props.tag>
        );
    }
}

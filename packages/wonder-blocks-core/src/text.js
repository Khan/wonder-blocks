// @flow
import React, {Component} from "react";

import {processStyleList} from "./util.js";

type Props = {
    style?: any,
    tag: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    children?: any,
};

const isHeaderRegex = /^h[1-6]$/;

export default class Text extends Component {
    props: Props;

    static defaultProps = {
        tag: "span",
    };

    render() {
        const isHeader = isHeaderRegex.test(this.props.tag);
        const {className, style} = processStyleList([
            // User agent stylesheets add vertical margins to header tags by
            // default. We prefer to be more deliberate in our spacing instead.
            isHeader && {marginTop: 0, marginBottom: 0},
            this.props.style,
        ]);

        return (
            <this.props.tag style={style} className={className}>
                {this.props.children}
            </this.props.tag>
        );
    }
}

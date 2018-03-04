// @flow
import React, {Component} from "react";

import {processStyleList} from "./util.js";

type Props = {
    style?: any,
    tag: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    children?: any,
};

export default class Text extends Component {
    props: Props;

    static defaultProps = {
        tag: "span",
    };

    render() {
        const {className, style} = processStyleList(this.props.style);

        return (
            <this.props.tag style={style} className={className}>
                {this.props.children}
            </this.props.tag>
        );
    }
}

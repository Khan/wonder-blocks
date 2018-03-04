// @flow
import React, {Component} from "react";

import {processStyleList} from "./util.js";

import type {Props} from "./types.js";

export default class View extends Component {
    props: Props;

    render() {
        const {className, style} = processStyleList(this.props.style);

        return (
            <div style={style} className={className}>
                {this.props.children}
            </div>
        );
    }
}

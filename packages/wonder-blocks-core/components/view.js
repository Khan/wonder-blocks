// @flow
import React from "react";

import {addStyle} from "../util/add-style.js";

import type {Props} from "../util/types.js";

const StyledDiv = addStyle("div");

export default class View extends React.Component<Props> {
    props: Props;

    render() {
        return <StyledDiv {...this.props} />;
    }
}

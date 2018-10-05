// @flow

import * as React from "react";
import typeof ActionItem from "../components/action-item.js";
import typeof OptionItem from "../components/option-item.js";
import typeof SeparatorItem from "../components/separator-item.js";

//TODO: rename into something more descriptive
export type Item =
    | false
    | React.Element<ActionItem | OptionItem | SeparatorItem>;

export type DropdownItem = {|
    component: React.Element<ActionItem | OptionItem | SeparatorItem>,
    focusable: boolean,
    populatedProps: any,
|};

// @flow
import * as React from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

import SeparatorItem from "./separator-item.js";

import type {DropdownItem} from "../util/types.js";

// copied from https://github.com/bvaughn/react-window/blob/master/src/createListComponent.js#L17
type Props = {|
    /**
     * The complete list of items that will be virtualized.
     */
    data: Array<DropdownItem>,

    /**
     * The current item index.
     */
    index: number,

    /**
     * Whether the item is scrolling or not.
     */
    isScrolling?: boolean,

    /**
     * Custom styles passed from react-window
     */
    style: StyleType,
|};

/**
 * A virtualized list item - It's created by decorating the DropdownItem
 * (ActionItem, OptionItem, SeparatorItem) with custom styles to let
 * react-window make its own calculations.
 */
class DropdownVirtualizedItem extends React.Component<Props> {
    render() {
        const {data, index, style} = this.props;
        const item = data[index];

        if (SeparatorItem.isClassOf(item.component)) {
            // add react-window style to the separator to preserve the correct
            // position
            return React.cloneElement(item.component, {style});
        } else {
            const {component, populatedProps, onClick, role, ref} = item;

            return React.cloneElement(component, {
                style,
                ...populatedProps,
                key: index,
                onClick,
                ref: item.focusable && ref,
                role,
            });
        }
    }
}

export default DropdownVirtualizedItem;

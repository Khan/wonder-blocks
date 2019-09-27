// @flow
import * as React from "react";
import {VariableSizeList as List} from "react-window";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

import SeparatorItem from "./separator-item.js";

import type {DropdownItem} from "../util/types.js";

// copied from https://github.com/bvaughn/react-window/blob/master/src/createListComponent.js#L17
type ItemProps = {|
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
class DropdownVirtualizedItem extends React.Component<ItemProps> {
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
                ...populatedProps,
                key: index,
                onClick,
                ref: item.focusable && ref,
                role,
                style,
            });
        }
    }
}

type Props = {|
    /**
     * The complete list of items that will be virtualized.
     */
    data: Array<DropdownItem>,

    /**
     * The list height that needs to be passed in order to let react-window
     * calculate each item vertical position
     */
    height: number,

    /**
     * The list width that needs to be passed in order to let react-window
     * calculate each item position
     */
    width: number,
|};

/**
 * A react-window's List wrapper that instantiates the virtualized list and
 * dynamically calculates the item height depending on the type
 */
class DropdownCoreVirtualized extends React.Component<Props> {
    /**
     * Calculates item height
     */
    getItemSize = (index: number) => {
        // get the current item in the list
        const item = this.props.data[index];

        return SeparatorItem.isClassOf(item.component) ? 9 : 40;
    };

    render() {
        const {data, height, width} = this.props;
        return (
            <List
                height={height}
                itemCount={data.length}
                itemSize={this.getItemSize}
                itemData={data}
                width={width}
            >
                {DropdownVirtualizedItem}
            </List>
        );
    }
}

export default DropdownCoreVirtualized;

// @flow
import * as React from "react";
import ReactDOM from "react-dom";
import {VariableSizeList as List} from "react-window";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

import SearchTextInput from "./search-text-input.js";
import SeparatorItem from "./separator-item.js";

import type {DropdownItem} from "../util/types.js";

import {DROPDOWN_ITEM_HEIGHT, SEARCH_ITEM_HEIGHT} from "../util/constants.js";

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

type Props = {|
    /**
     * The complete list of items that will be virtualized.
     */
    data: Array<DropdownItem>,

    /**
     * The VariableSizeList ref that needs to be passed to access to
     * react-window's instance methods
     */
    listRef?: {
        current: null | React.ElementRef<typeof List>,
    },
|};

type State = {|
    /**
     * The list width that needs to be passed in order to let react-window
     * calculate each item position
     */
    width: ?number,
    height: ?number,
|};

/**
 * Maximum visible items inside the dropdown list
 */
const MAX_VISIBLE_ITEMS = 10;

/**
 * A react-window's List wrapper that instantiates the virtualized list and
 * dynamically calculates the item height depending on the type
 */
class DropdownCoreVirtualized extends React.Component<Props, State> {
    state = {
        height: this.getHeight(),
        width: null,
    };

    componentDidMount() {
        const rootNode = ((ReactDOM.findDOMNode(this): any): ?HTMLElement);

        // after the non-virtualized items are rendered, we get the container
        //  width to pass it to react-window's List
        if (rootNode) {
            // eslint-disable-next-line react/no-did-mount-set-state
            this.setState({
                width: rootNode.getBoundingClientRect().width,
            });
        }
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        const {data, listRef} = this.props;

        // if the items size has changed, then recalculate each item position
        if (prevProps.data.length !== data.length) {
            // calculate dropdown's height depending on the type of items
            const height = this.getHeight();

            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({height});

            if (listRef && listRef.current) {
                // the ref can't associate this instance method
                // $FlowIgnore
                listRef.current.resetAfterIndex(1);
            }
        }
    }

    /**
     * The list height that is automatically calculated depending on the
     * component's type of each item (e.g. Separator, Option, Search, etc)
     */
    getHeight() {
        // calculate using the first 10 items on the array as we want to display
        // this number of elements in the visible area
        return this.props.data
            .slice(0, MAX_VISIBLE_ITEMS)
            .reduce((sum, item) => {
                if (SeparatorItem.isClassOf(item.component)) {
                    return sum + 9;
                } else if (SearchTextInput.isClassOf(item.component)) {
                    // search text input height
                    return sum + SEARCH_ITEM_HEIGHT;
                } else {
                    return sum + DROPDOWN_ITEM_HEIGHT;
                }
            }, 5);
    }

    /**
     * Calculates item height
     */
    getItemSize = (index: number) => {
        // get the current item in the list
        const item = this.props.data[index];

        if (SeparatorItem.isClassOf(item.component)) {
            // this is the separator's height (1px) + vertical margin (8px)
            return 9;
        } else if (SearchTextInput.isClassOf(item.component)) {
            // search text input height
            return SEARCH_ITEM_HEIGHT;
        } else {
            // default dropdown item height
            return DROPDOWN_ITEM_HEIGHT;
        }
    };

    /**
     * render non virtualized items to calculate the container max-width that
     * will be used by DropdownCoreVirtualized
     */
    renderInitialItems(): Array<React.Node> {
        const {data} = this.props;

        return data.map((item, index) => {
            if (SeparatorItem.isClassOf(item.component)) {
                // add react-window style to the separator to preserve the correct
                // position
                return React.cloneElement(item.component);
            } else {
                const {component, populatedProps, onClick, role, ref} = item;

                return React.cloneElement(component, {
                    ...populatedProps,
                    key: index,
                    onClick,
                    ref: item.focusable && ref,
                    role,
                });
            }
        });
    }

    renderVirtualizedList(): React.Node {
        const {data, listRef} = this.props;
        const {height, width} = this.state;

        return (
            // react-window has some issues for typing lists when passing refs
            // $FlowIgnore
            <List
                height={height}
                itemCount={data.length}
                itemSize={this.getItemSize}
                itemData={data}
                width={width}
                overscanCount={5}
                ref={listRef}
            >
                {DropdownVirtualizedItem}
            </List>
        );
    }

    render() {
        if (!this.state.width) {
            // first load, render non virtualized items to calculate width
            return this.renderInitialItems();
        } else {
            // render optimized list
            return this.renderVirtualizedList();
        }
    }
}

export default DropdownCoreVirtualized;

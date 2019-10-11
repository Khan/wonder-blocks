// @flow
import * as React from "react";
import ReactDOM from "react-dom";
import {VariableSizeList as List} from "react-window";
import {withActionScheduler} from "@khanacademy/wonder-blocks-timing";

import type {WithActionScheduler} from "@khanacademy/wonder-blocks-timing";

import DropdownVirtualizedItem from "./dropdown-core-virtualized-item.js";
import SearchTextInput from "./search-text-input.js";
import SeparatorItem from "./separator-item.js";

import type {DropdownItem} from "../util/types.js";

import {
    DROPDOWN_ITEM_HEIGHT,
    SEARCH_ITEM_HEIGHT,
    SEPARATOR_ITEM_HEIGHT,
} from "../util/constants.js";

type OwnProps = {|
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

    /**
     * An optional fixed width that will be passed to the react-window instance
     */
    width?: ?number,
|};

type Props = WithActionScheduler<OwnProps>;

type State = {|
    /**
     * The list width that needs to be passed in order to let react-window
     * calculate each item position
     */
    width: ?number,

    /**
     * The list height that needs to be passed in order to let react-window
     * calculate the container size
     */
    height: ?number,
|};

/**
 * Maximum visible items inside the dropdown list
 */
const MAX_VISIBLE_ITEMS = 10;

/**
 * Maximum horizontal size allowed for the container
 */
const MAX_ALLOWED_WIDTH = 512;

/**
 * A react-window's List wrapper that instantiates the virtualized list and
 * dynamically calculates the item height depending on the type
 */
class DropdownCoreVirtualized extends React.Component<Props, State> {
    state = {
        height: this.getHeight(),
        width: this.props.width,
    };

    componentDidMount() {
        const {schedule} = this.props;

        // Wait for styles to be applied. This way, we can get a more precise
        // value of the container dimensions.
        schedule.animationFrame(() => {
            this.setWidth();
        });
    }

    componentDidUpdate(prevProps: Props) {
        const {data, listRef} = this.props;

        // if the items size has changed, then recalculate each item position
        if (prevProps.data.length !== data.length) {
            this.setHeight();

            if (listRef && listRef.current) {
                // the ref can't associate this instance method
                // $FlowIgnore
                listRef.current.resetAfterIndex(1);
            }
        }
    }

    /**
     * Update container width
     */
    setWidth() {
        const rootNode = ((ReactDOM.findDOMNode(this): any): ?HTMLElement);

        // after the non-virtualized items are rendered, we get the container
        //  width to pass it to react-window's List
        if (rootNode) {
            const clientWidth = rootNode.getBoundingClientRect().width;
            const width =
                clientWidth < MAX_ALLOWED_WIDTH
                    ? clientWidth
                    : MAX_ALLOWED_WIDTH;

            this.setState({
                width,
            });
        }
    }

    /**
     * Update container height
     */
    setHeight() {
        // calculate dropdown's height depending on the type of items
        const height = this.getHeight();
        this.setState({height});
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
                    return sum + SEPARATOR_ITEM_HEIGHT;
                } else if (SearchTextInput.isClassOf(item.component)) {
                    // search text input height
                    return sum + SEARCH_ITEM_HEIGHT;
                } else {
                    return sum + DROPDOWN_ITEM_HEIGHT;
                }
            }, 0);
    }

    /**
     * Calculates item height
     */
    getItemSize = (index: number) => {
        // get the current item in the list
        const item = this.props.data[index];

        if (SeparatorItem.isClassOf(item.component)) {
            // this is the separator's height (1px) + vertical margin (8px)
            return SEPARATOR_ITEM_HEIGHT;
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

        const allComponents = data.map((e) => e.component);

        // 1. get the children opaque data structure to sort each item by its
        //    label length
        const longestItems = React.Children.toArray(allComponents)
            .filter(Boolean)
            .sort((a, b) => {
                // 2. only sort elements that contain a `label` prop
                if (b.props.label && a.props.label) {
                    return b.props.label.length - a.props.label.length;
                }

                return -1;
            })
            // 3. only render the possible visible items to minimize layout
            //    jumps
            .slice(0, MAX_VISIBLE_ITEMS);

        // Append longest items to calculate the container width.
        // We need to hide these sorted elements to avoid any FOUC.
        return longestItems.map((item) =>
            React.cloneElement(item, {
                style: {visibility: "hidden"},
            }),
        );
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
            // if we don't pass a fixed value, then we need to render
            // non-virtualized items to calculate width
            return this.renderInitialItems();
        } else {
            // width has been provided, then render the virtualized list
            return this.renderVirtualizedList();
        }
    }
}

export default withActionScheduler/*:: <OwnProps> */(DropdownCoreVirtualized);

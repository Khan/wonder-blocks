// @flow
import * as React from "react";
import ReactDOM from "react-dom";
import {VariableSizeList as List} from "react-window";
import {withActionScheduler} from "@khanacademy/wonder-blocks-timing";

import type {
    WithActionSchedulerProps,
    WithoutActionScheduler,
} from "@khanacademy/wonder-blocks-timing";
import DropdownVirtualizedItem from "./dropdown-core-virtualized-item.js";
import SearchTextInput from "./search-text-input.js";
import SeparatorItem from "./separator-item.js";

import type {DropdownItem} from "../util/types.js";

import {
    DROPDOWN_ITEM_HEIGHT,
    MAX_VISIBLE_ITEMS,
    SEARCH_ITEM_HEIGHT,
    SEPARATOR_ITEM_HEIGHT,
} from "../util/constants.js";
import {getDropdownMenuHeight} from "../util/dropdown-menu-styles.js";

type Props = {|
    /**
     * The complete list of items that will be virtualized.
     */
    data: Array<DropdownItem>,

    /**
     * The VariableSizeList ref that needs to be passed to access to
     * react-window's instance methods
     */
    listRef?: {|
        current: null | React.ElementRef<typeof List>,
    |},

    /**
     * An optional fixed width that will be passed to the react-window instance
     */
    width?: ?number,

    ...WithActionSchedulerProps,
|};

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
 * A react-window's List wrapper that instantiates the virtualized list and
 * dynamically calculates the item height depending on the type
 */
class DropdownCoreVirtualized extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            height: getDropdownMenuHeight(props.data),
            width: props.width,
        };
    }

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
        const parentNode = rootNode?.parentElement;

        // after the non-virtualized items are rendered, we get the container
        //  width to pass it to react-window's List
        if (parentNode) {
            const width = parentNode.getBoundingClientRect().width;

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
        const height = getDropdownMenuHeight(this.props.data);
        this.setState({height});
    }

    /**
     * Calculates item height
     */
    getItemSize: (index: number) => number = (index: number) => {
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
                // react-window doesn't accept maybe numbers. It wants numbers
                // or strings.
                // $FlowFixMe
                height={height}
                itemCount={data.length}
                itemSize={this.getItemSize}
                itemData={data}
                style={{overflowX: "hidden"}}
                // react-window doesn't accept maybe numbers. It wants numbers
                // or strings.
                // $FlowFixMe
                width={width}
                overscanCount={5}
                ref={listRef}
            >
                {DropdownVirtualizedItem}
            </List>
        );
    }

    render(): React.Node {
        if (this.state.width === undefined) {
            // if we don't pass a fixed value, then we need to render
            // non-virtualized items to calculate width
            return this.renderInitialItems();
        } else {
            // width has been provided, then render the virtualized list
            return this.renderVirtualizedList();
        }
    }
}

type ExportProps = WithoutActionScheduler<
    React.ElementConfig<typeof DropdownCoreVirtualized>,
>;

export default (withActionScheduler(
    DropdownCoreVirtualized,
): React.ComponentType<ExportProps>);

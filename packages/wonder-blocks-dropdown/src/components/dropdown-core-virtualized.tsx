import * as React from "react";
import * as ReactDOM from "react-dom";
import {VariableSizeList as List} from "react-window";
import {withActionScheduler} from "@khanacademy/wonder-blocks-timing";

import type {WithActionSchedulerProps} from "@khanacademy/wonder-blocks-timing";
import DropdownVirtualizedItem from "./dropdown-core-virtualized-item";
import SeparatorItem from "./separator-item";

import type {DropdownItem} from "../util/types";

import {
    DROPDOWN_ITEM_HEIGHT,
    MAX_VISIBLE_ITEMS,
    SEPARATOR_ITEM_HEIGHT,
} from "../util/constants";
import {getDropdownMenuHeight} from "../util/dropdown-menu-styles";

type Props = {
    /**
     * The complete list of items that will be virtualized.
     */
    data: Array<DropdownItem>;
    /**
     * The VariableSizeList ref that needs to be passed to access to
     * react-window's instance methods
     */
    listRef?: React.RefObject<List>;
    /**
     * An optional fixed width that will be passed to the react-window instance
     */
    width?: number | null | undefined;
} & WithActionSchedulerProps;

type State = {
    /**
     * The list width that needs to be passed in order to let react-window
     * calculate each item position
     */
    width: number | null | undefined;
    /**
     * The list height that needs to be passed in order to let react-window
     * calculate the container size
     */
    height: number;
};

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
                listRef.current.resetAfterIndex(1);
            }
        }
    }

    /**
     * Update container width
     */
    setWidth() {
        // eslint-disable-next-line import/no-deprecated
        const rootNode = ReactDOM.findDOMNode(this) as
            | HTMLElement
            | null
            | undefined;
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
        } else {
            // default dropdown item height
            return DROPDOWN_ITEM_HEIGHT;
        }
    };

    /**
     * render non virtualized items to calculate the container max-width that
     * will be used by DropdownCoreVirtualized
     */
    renderInitialItems(): Array<React.ReactNode> {
        const {data} = this.props;

        const allComponents = data.map((e) => e.component);

        // 1. get the children opaque data structure to sort each item by its
        //    label length
        const longestItems = React.Children.toArray(allComponents)
            .filter(Boolean)
            .sort((a, b) => {
                // 2. only sort elements that contain a `label` prop
                // @ts-expect-error [FEI-5019] - TS2339 - Property 'props' does not exist on type 'ReactChild | ReactFragment | ReactPortal'. | TS2339 - Property 'props' does not exist on type 'ReactChild | ReactFragment | ReactPortal'.
                if (b.props.label && a.props.label) {
                    // @ts-expect-error [FEI-5019] - TS2339 - Property 'props' does not exist on type 'ReactChild | ReactFragment | ReactPortal'. | TS2339 - Property 'props' does not exist on type 'ReactChild | ReactFragment | ReactPortal'.
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
            // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
            React.cloneElement(item, {
                style: {visibility: "hidden"},
            }),
        );
    }

    renderVirtualizedList(width: number, height: number): React.ReactElement {
        const {data, listRef} = this.props;

        return (
            <List
                height={height}
                itemCount={data.length}
                itemSize={this.getItemSize}
                itemData={data}
                style={{overflowX: "hidden"}}
                width={width}
                overscanCount={5}
                ref={listRef}
            >
                {/* @ts-expect-error: No overload matches this call. */}
                {DropdownVirtualizedItem}
            </List>
        );
    }

    render(): React.ReactNode {
        const {width, height} = this.state;

        if (width == null) {
            // if we don't pass a fixed value, then we need to render
            // non-virtualized items to calculate width
            return this.renderInitialItems();
        } else {
            // width has been provided, then render the virtualized list
            return this.renderVirtualizedList(width, height);
        }
    }
}

export default withActionScheduler(DropdownCoreVirtualized);

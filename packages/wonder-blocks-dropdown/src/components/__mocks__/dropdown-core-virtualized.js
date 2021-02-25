// @flow
import * as React from "react";
import {VariableSizeList as List} from "react-window";

import DropdownVirtualizedItem from "../dropdown-core-virtualized-item.js";

import type {DropdownItem} from "../../util/types.js";

type Props = {|
    data: Array<DropdownItem>,
    listRef?: {|
        current: null | React.ElementRef<typeof List>,
    |},
|};

/**
 * A minimal mocked version of the Virtualized implementation
 */
class DropdownCoreVirtualizedMock extends React.Component<Props> {
    render(): React.Node {
        const {data, listRef} = this.props;
        return (
            // react-window has some issues for typing lists when passing refs
            // $FlowIgnore
            <List
                height={400}
                itemCount={data.length}
                itemSize={() => 40}
                itemData={data}
                width={300}
                overscanCount={5}
                ref={listRef}
            >
                {DropdownVirtualizedItem}
            </List>
        );
    }
}

export default DropdownCoreVirtualizedMock;

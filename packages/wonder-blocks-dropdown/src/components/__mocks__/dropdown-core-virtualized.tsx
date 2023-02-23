import * as React from "react";
import {VariableSizeList as List} from "react-window";

import DropdownVirtualizedItem from "../dropdown-core-virtualized-item";

import type {DropdownItem} from "../../util/types";

type Props = {
    data: Array<DropdownItem>;
    listRef?: {
        current: null | React.ElementRef<typeof List>;
    };
};

/**
 * A minimal mocked version of the Virtualized implementation
 */
class DropdownCoreVirtualizedMock extends React.Component<Props> {
    render(): React.ReactElement {
        const {data, listRef} = this.props;
        return (
            <List
                height={400}
                itemCount={data.length}
                itemSize={() => 40}
                itemData={data}
                width={300}
                overscanCount={5}
                // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
                // react-window has some issues for typing lists when passing refs
                ref={listRef}
            >
                {DropdownVirtualizedItem}
            </List>
        );
    }
}

export default DropdownCoreVirtualizedMock;

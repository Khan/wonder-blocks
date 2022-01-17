// @flow
import * as React from "react";

import {LabelMedium} from "@khanacademy/wonder-blocks-typography";

import CellCore from "./internal/cell-core.js";

import type {CellProps} from "../util/types.js";

/**
 * BasicCell is the simplest form of the Cell. It is a compacted-height Cell
 * with limited subviews and accessories, to be used for simple lists, like
 * dropdown option items, navigation items, settings dialogs, etc.
 *
 * ### Usage
 *
 * ```jsx
 * import {BasicCell} from "@khanacademy/wonder-blocks-cell";
 *
 * <BasicCell
 *  title="Basic cell"
 *  rightAccessory={<Icon icon={icons.caretRight} size="medium" />}
 * />
 * ```
 */
function BasicCell(props: CellProps): React.Node {
    const {title, ...coreProps} = props;

    return (
        <CellCore {...coreProps}>
            {typeof title === "string" ? (
                <LabelMedium>{title}</LabelMedium>
            ) : (
                title
            )}
        </CellCore>
    );
}

export default BasicCell;

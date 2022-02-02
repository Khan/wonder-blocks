// @flow
import * as React from "react";

import {LabelMedium} from "@khanacademy/wonder-blocks-typography";

import CellCore from "./internal/cell-core.js";

import type {CellProps} from "../util/types.js";

/**
 * `CompactCell` is the simplest form of the Cell. It is a compacted-height Cell
 * with limited subviews and accessories. Typically they represent additional
 * info or selection lists. It has a minimum height of 48px and a non-bold
 * title. It does not have subtitles or a progress bar, and in general it has
 * less vertical space around text and accessories.
 *
 * ### Usage
 *
 * ```jsx
 * import {CompactCell} from "@khanacademy/wonder-blocks-cell";
 *
 * <CompactCell
 *  title="Compact cell"
 *  rightAccessory={<Icon icon={icons.caretRight} size="medium" />}
 * />
 * ```
 */
function CompactCell(props: CellProps): React.Node {
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

export default CompactCell;

import * as React from "react";

import {LabelMedium} from "@khanacademy/wonder-blocks-typography";

import CellCore from "./internal/cell-core";

import type {CellProps} from "../util/types";

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
 * import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
 * import caretRightIcon from "@phosphor-icons/core/regular/caret-right.svg";
 *
 * <CompactCell
 *  title="Compact cell"
 *  rightAccessory={<PhosphorIcon icon={caretRightIcon} size="medium" />}
 * />
 * ```
 */
const CompactCell = function (props: CellProps): React.ReactElement {
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
};

export default CompactCell;

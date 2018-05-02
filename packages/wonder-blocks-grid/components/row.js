// @flow
import * as React from "react";
import {View} from "wonder-blocks-core";

import styles from "../util/styles.js";
import {matchesSize, gridContextTypes} from "../util/utils.js";
import FixedWidthCell from "./fixed-width-cell.js";
import Gutter from "./gutter.js";

import type {GridSize} from "../util/types.js";

/**
 * A Row holds all of the Cells that make up the contents of the grid. A row
 * also provides the margins on the sides and inserts the gutter spacing
 * in-between the cells. Typically this component will hold a mixture of
 * [Cell](#cell), [FlexCell](#flexcell), and [FixedWidthCells](#fixedwidthcell),
 * but it can also include any elements that could fit in a
 * [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox).
 *
 * This component will automatically attempt to insert [Gutters](#gutter)
 * in-between all child elements. Additionally, it'll perform some basic checks
 * to ensure that no impossible layouts are accidentally generated.
 *
 * Typically this component will be used as a child of a [Grid](#grid-1),
 * but it's not a requirement, you can use it as a descendant, as well.
 *
 * By default (with no properties specified) it will display at all
 * grid sizes. If you specify the `small`, `medium`, or `large`
 * props then the component will only be shown at those grid sizes.
 *
 * @version 1.0
 * @since 1.0
 */
export default class Row extends React.Component<{
    /** Should this row be shown on a Small Grid? */
    small: boolean,
    /** Should this row be shown on a Medium Grid? */
    medium: boolean,
    /** Should this row be shown on a Large Grid? */
    large: boolean,
    /**
     * The child components to populate inside the row. Typically this will be
     * a mixture of [Cell](#cell), [FlexCell](#flexcell), and
     * [FixedWidthCells](#fixedwidthcell), but it can also include any elements
     * that could fit in a [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox).
     * Can also accept a function which receives the `gridSize` and
     * `totalColumns` and should return some React Nodes to render.
     */
    children:
        | React.Node
        | (({
              gridSize: GridSize,
              totalColumns: number,
          }) => React.Node),
    /**
     * Make the cell contents flush with the row. Removes the margins and
     * gutters and adds their spacing as paddings to the cells. Margin
     * spacing gets added as padding to the first and last cell inside the
     * row. Gutter spacing gets added to the right-hand-side of all cells,
     * except for the last one, as padding.
     */
    flush: boolean,
    /** The styling to apply to the row. */
    style?: any,
}> {
    static contextTypes = gridContextTypes;
    static defaultProps = {
        small: false,
        medium: false,
        large: false,
        flush: false,
    };

    render() {
        const {style, flush, children} = this.props;
        const {gridSize, gridSpec} = this.context;
        const {marginWidth, gutterWidth, hasMaxWidth, totalColumns} = gridSpec[
            gridSize
        ];
        const shouldDisplay = matchesSize(this.props, gridSize);

        // Don't render the row if it's been disabled at this size
        if (!shouldDisplay) {
            return null;
        }

        let contents = children;

        // If the contents are a function then we call it with the gridSize and
        // totalColumns properties and render the return value.
        if (typeof contents === "function") {
            contents = contents({gridSize, totalColumns});
        }

        contents = React.Children.toArray(contents);

        // Go through all of the contents and pre-emptively remove anything
        // that shouldn't be rendered and insert Gutters inbetween everything
        // that is still visible.
        const filteredContents = [];
        let hasVisibleCell = false;
        let lastCell;

        for (const item of contents) {
            if (
                typeof item === "object" &&
                (!item.type ||
                    !item.props ||
                    !item.type.shouldDisplay ||
                    (typeof item.type.shouldDisplay === "function" &&
                        item.type.shouldDisplay(item.props, gridSize)))
            ) {
                // Figure out if we need to try and insert a gutter in-between
                // cells. If the contents are flush then we don't insert any.
                if (hasVisibleCell && !flush) {
                    filteredContents.push(
                        <Gutter key={`gutter-${filteredContents.length}`} />,
                    );
                }

                let newItem: Object = item;

                // If the contents are flush then we insert in new padding to
                // the cell to implement the first margin and the gutter spacing.
                if (flush) {
                    newItem = React.cloneElement(newItem, {
                        style: [
                            typeof item.props === "object" &&
                                item.props &&
                                item.props.style,
                            {
                                paddingLeft: lastCell ? 0 : marginWidth,
                                paddingRight: gutterWidth,
                            },
                        ],
                    });

                    lastCell = newItem;
                }

                filteredContents.push(newItem);

                hasVisibleCell = true;
            }
        }

        // For the last cell we also add in the final margin spacing.
        if (lastCell) {
            const lastCellPos = filteredContents.indexOf(lastCell);
            filteredContents[lastCellPos] = React.cloneElement(lastCell, {
                style: [
                    lastCell.props.style,
                    {
                        paddingRight: marginWidth,
                    },
                ],
            });
        }

        // If the contents are flush then we need to make sure that we don't
        // insert the margin spacing.
        return (
            <View style={[styles.rowWrap, style]}>
                <View style={[styles.row, hasMaxWidth && styles.rowMaxWidth]}>
                    {!flush && <FixedWidthCell width={marginWidth} />}
                    {filteredContents}
                    {!flush && <FixedWidthCell width={marginWidth} />}
                </View>
            </View>
        );
    }
}

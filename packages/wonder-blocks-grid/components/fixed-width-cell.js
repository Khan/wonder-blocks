// @flow
import * as React from "react";
import {View} from "wonder-blocks-core";

import styles from "../util/styles.js";
import {flexBasis, gridContextTypes} from "../util/utils.js";

import type {GridSize} from "../util/types.js";

type Props = {
    /** The width of this cell on a Small Grid (in pixels, %, or other). */
    smallWidth?: number | string,
    /** The width of this cell on a Medium Grid (in pixels, %, or other). */
    mediumWidth?: number | string,
    /** The width of this cell on a Large Grid (in pixels, %, or other). */
    largeWidth?: number | string,
    /** The default width of the cell (in pixels, %, or other). */
    width?: number | string | ((size: GridSize) => number | string),
    /**
     * The child components to populate inside the cell. Can also accept a
     * function which receives the `gridSize`, `totalColumns`, and cell
     * `width` and should return some React Nodes to render.
     */
    children?:
        | React.Node
        | (({
              gridSize: GridSize,
              totalColumns: number,
              width: number | string,
          }) => React.Node),
    /** The styling to apply to the cell. */
    style?: any,
};

/**
 * Fixed-width Cell, its width specified using CSS dimensions (such as pixels,
 * %, or other). WARNING: This should only be used only when the grid columns are
 * explicitly not being used. This will almost certainly not align to the grid and
 * may cause other cells to also not align.
 *
 * This component renders a [View](#view) that
 * uses Flex Box and has a [flex-basis](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis)
 * of the specified "width" and [flex-shrink](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink)
 * of 0.
 *
 * Typically this component will be used as a child of a [Row](#row),
 * but it's not a requirement, you can use it as a descendant, as well.
 *
 * By default (with no properties specified) it will display at all
 * grid sizes. If you specify the `smallWidth`, `mediumWidth`, `largeWidth`,
 * or `width` props then the component will only be shown at those grid sizes
 * and using the specified width.
 *
 * @version 1.0
 * @since 1.0
 */
export default class FixedWidthCell extends React.Component<Props> {
    static contextTypes = gridContextTypes;
    static defaultProps = {
        smallWidth: 0,
        mediumWidth: 0,
        largeWidth: 0,
        width: 0,
    };

    static getWidth(
        {smallWidth, mediumWidth, largeWidth, width}: Props,
        gridSize: GridSize,
    ) {
        // If no option was specified then we just return undefined,
        // components may handle this case differently.
        // We go through all the ways in which a fixed width can be
        // specified and find the one that matches our current grid size.
        if (!smallWidth && !mediumWidth && !largeWidth && !width) {
            return undefined;
        } else if (smallWidth && gridSize === "small") {
            return smallWidth;
        } else if (mediumWidth && gridSize === "medium") {
            return mediumWidth;
        } else if (largeWidth && gridSize === "large") {
            return largeWidth;
        } else if (typeof width === "function") {
            return width(gridSize);
        } else if (width) {
            return width;
        }

        // If nothing applies then we return null (usually resulting
        // in the component not being rendered)
        return null;
    }

    static shouldDisplay(props: Props, gridSize: GridSize) {
        return !!FixedWidthCell.getWidth(props, gridSize);
    }

    render() {
        const {children, style} = this.props;
        const {gridSize, gridSpec} = this.context;
        const width = FixedWidthCell.getWidth(this.props, gridSize);

        // If no width is ever specified then we error out.
        if (width === undefined) {
            throw new Error("No width specified to FixedWidthCell.");
        } else if (width === null || width === 0) {
            // If no width is specified then we just don't render this cell
            return null;
        }

        let contents = children;

        // If the contents are a function then we call it with the gridSize,
        // totalColumns, and width properties and render the return value.
        if (typeof contents === "function") {
            const {totalColumns} = gridSpec[gridSize];
            contents = contents({gridSize, totalColumns, width});
        }

        return (
            <View style={[styles.cellFixed, flexBasis(width), style]}>
                {contents}
            </View>
        );
    }
}

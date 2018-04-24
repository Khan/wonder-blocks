// @flow
import * as React from "react";

import gridSizes from "../util/sizes.js";
import {widthFromProps, flexBasis, gridContextTypes} from "../util/utils.js";
import FlexCell from "./flex-cell.js";
import FixedWidthCell from "./fixed-width-cell.js";

import type {GridSize} from "../util/sizes.js";

type Props = {
    /** The number of columns this cell should span on a Small Grid. */
    small?: number,
    /** The number of columns this cell should span on a Medium Grid. */
    medium?: number,
    /** The number of columns this cell should span on a Large Grid. */
    large?: number,
    /** The number of columns this should should span by default. */
    width?: number | ((size: GridSize) => number),
    /**
     * The child components to populate inside the cell. Can also accept a
     * function which receives the `gridSize`, `totalColumns`, and cell
     * `width` and should return some React Nodes to render.
     */
    children:
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
 * A Cell is a form of [FixedWidthCell](#fixedwidthcell) whose width is set
 * based on the width of the specified columns at the current grid size.
 * You will specify the number of columns that you want this component to
 * span at each grid size. This component should only be used as a child
 * of a [Row](#row).
 *
 * This component renders a [View](#view) that
 * uses Flex Box and has a [flex-basis](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis)
 * of the specified "width" and [flex-shrink](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink)
 * of 0.
 *
 * By default (with no properties specified) it will display at all
 * grid sizes. If you specify the `small`, `medium`, `large`, or `width`
 * props then the component will only be shown at those grid sizes and
 * using the specified column width.
 *
 * @version 1.0
 * @since 1.0
 */
export default class Cell extends React.Component<Props> {
    static contextTypes = gridContextTypes;
    static defaultProps = {
        small: 0,
        medium: 0,
        large: 0,
        width: 0,
    };

    static getWidth(props: Props, gridSize: GridSize) {
        return widthFromProps(props, gridSize);
    }

    static shouldDisplay(props: Props, gridSize: GridSize) {
        const width = Cell.getWidth(props, gridSize);
        return width !== null && width !== 0;
    }

    render() {
        const {children, style} = this.props;
        const {gridSize} = this.context;
        // Get the settings for this particular size of grid
        const {totalColumns, gutterWidth, marginWidth} = gridSizes[gridSize];

        const width = Cell.getWidth(this.props, gridSize);

        // If no width is ever specified then we assume we're rendering
        // a flexible-width cell (flex: grow)
        if (width === undefined) {
            return <FlexCell style={style}>{children}</FlexCell>;
        } else if (width === null || width === 0) {
            // If no width is specified then we just don't render this cell
            return null;
        }

        if (width > totalColumns) {
            throw new Error(
                `Specified columns ${width} is greater than the maximum ` +
                    `${totalColumns} at the ${gridSize} grid size.`,
            );
        }

        // We need to start by calculating the total width of all the "content"
        // We do this by starting with the full width (100%) and then
        // subtracting all of the gutter spaces inbetween the cells
        // (gutterWidth * (totalColumns - 1)) and the width of the two margins
        // (marginWidth * 2).
        const contentWidth = `(100% - ${gutterWidth *
            (totalColumns - 1)}px - ${marginWidth * 2}px)`;

        // Now that we have the full width we can calculate the width of this
        // particular cell by multiplying the full width (allCellWidth) by
        // the ratio of this cell (width / totalColumns). But we then need to
        // add back in the missing gutter widths:
        // (gutterWidth * (width - 1)). This gives us to full width of
        // this particular cell.
        const calcWidth = `calc(${contentWidth} * ${width /
            totalColumns} + ${gutterWidth * (width - 1)}px)`;

        let contents = children;

        // If the contents are a function then we call it with the gridSize,
        // totalColumns, and width properties and render the return value.
        if (typeof contents === "function") {
            contents = contents({gridSize, totalColumns, width});
        }

        // Render a fixed-width cell (flex-basis: size, flex-shrink: 0)
        // that matches the intended width of the cell
        return (
            <FixedWidthCell width={calcWidth} style={style}>
                {contents}
            </FixedWidthCell>
        );
    }
}

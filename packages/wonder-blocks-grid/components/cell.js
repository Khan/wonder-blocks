// @flow
import * as React from "react";

import {MediaLayoutWrapper} from "@khanacademy/wonder-blocks-core";
import FlexCell from "./flex-cell.js";
import FixedWidthCell from "./fixed-width-cell.js";

import type {MediaSize, MediaSpec} from "@khanacademy/wonder-blocks-core";

type Props = {
    /** The number of columns this cell should span on a Small Grid. */
    smallCols?: number,
    /** The number of columns this cell should span on a Medium Grid. */
    mediumCols?: number,
    /** The number of columns this cell should span on a Large Grid. */
    largeCols?: number,
    /** The number of columns this should should span by default. */
    cols?: number | ((size: MediaSize) => number),
    /**
     * The child components to populate inside the cell. Can also accept a
     * function which receives the `mediaSize`, `totalColumns`, and cell
     * `width` and should return some React Nodes to render.
     */
    children:
        | React.Node
        | (({
              mediaSize: MediaSize,
              totalColumns: number,
              cols: number,
          }) => React.Node),
    /** The styling to apply to the cell. */
    style?: any,
    /**
     * The size of the media layout being used. Populated by MediaLayoutWrapper.
     * @ignore
     */
    mediaSize: MediaSize,
    /**
     * The current media layout spec being used. Populated by MediaLayoutWrapper.
     * @ignore
     */
    mediaSpec: MediaSpec,
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
 * grid sizes. If you specify the `smallCols`, `mediumCols`, `largeCols`, or
 * `cols` props then the component will only be shown at those grid sizes and
 * using the specified column width.
 *
 * @version 1.0
 * @since 1.0
 */
class Cell extends React.Component<Props> {
    static defaultProps = {
        smallCols: 0,
        mediumCols: 0,
        largeCols: 0,
        cols: 0,
    };

    static getCols(
        {smallCols, mediumCols, largeCols, cols}: Props,
        mediaSize: MediaSize,
    ) {
        // If no option was specified then we just return undefined,
        // components may handle this case differently.
        // We go through all the ways in which a fixed width can be
        // specified and find the one that matches our current grid size.
        if (!smallCols && !mediumCols && !largeCols && !cols) {
            return undefined;
        } else if (smallCols && mediaSize === "small") {
            return smallCols;
        } else if (mediumCols && mediaSize === "medium") {
            return mediumCols;
        } else if (largeCols && mediaSize === "large") {
            return largeCols;
        } else if (typeof cols === "function") {
            return cols(mediaSize);
        } else if (cols) {
            return cols;
        }

        // If nothing applies then we return null (usually resulting
        // in the component not being rendered)
        return null;
    }

    static shouldDisplay(props: Props, mediaSize: MediaSize) {
        const cols = Cell.getCols(props, mediaSize);
        return cols !== null && cols !== 0;
    }

    render() {
        const {children, style, mediaSize, mediaSpec} = this.props;
        // Get the settings for this particular size of grid
        const {totalColumns, gutterWidth, marginWidth} = mediaSpec[mediaSize];

        const cols = Cell.getCols(this.props, mediaSize);

        // If no columns are specified then we assume we're rendering
        // a flexible-width cell (flex: grow)
        if (cols === undefined) {
            return <FlexCell style={style}>{children}</FlexCell>;
        } else if (cols === null || cols === 0) {
            // If no columns are specified then we just don't render this cell
            return null;
        }

        if (cols > totalColumns) {
            throw new Error(
                `Specified columns ${cols} is greater than the maximum ` +
                    `${totalColumns} at the ${mediaSize} grid size.`,
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
        // the ratio of this cell (cols / totalColumns). But we then need to
        // add back in the missing gutter widths:
        // (gutterWidth * (cols - 1)). This gives us to full width of
        // this particular cell.
        const calcWidth = `calc(${contentWidth} * ${cols /
            totalColumns} + ${gutterWidth * (cols - 1)}px)`;

        let contents = children;

        // If the contents are a function then we call it with the mediaSize,
        // totalColumns, and cols properties and render the return value.
        if (typeof contents === "function") {
            contents = contents({mediaSize, totalColumns, cols});
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

export default MediaLayoutWrapper(Cell);

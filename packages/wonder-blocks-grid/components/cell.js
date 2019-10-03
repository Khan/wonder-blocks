// @flow
import * as React from "react";

import {MediaLayout} from "@khanacademy/wonder-blocks-layout";
import {View} from "@khanacademy/wonder-blocks-core";
import type {MediaSize} from "@khanacademy/wonder-blocks-layout";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles.js";
import {flexBasis} from "../util/utils.js";

type Props = {|
    /** The number of columns this cell should span on a Small Grid. */
    smallCols?: number,

    /** The number of columns this cell should span on a Medium Grid. */
    mediumCols?: number,

    /** The number of columns this cell should span on a Large Grid. */
    largeCols?: number,

    /** The number of columns this should should span by default. */
    cols?: number | ((mediaSize: MediaSize) => number),

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
    style?: StyleType,
|};

/**
 * A Cell is a container whose width is set based on the width of the
 * specified columns at the current grid size. You will specify the number
 * of columns that you want this component to span at each grid size.
 * This component should only be used as a child of a [Row](#row).
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
 */
export default class Cell extends React.Component<Props> {
    static isClassOf(instance: React.Element<any>) {
        return instance && instance.type && instance.type.__IS_CELL__;
    }

    static getCols(props: Props, mediaSize: MediaSize) {
        // If no option was specified then we just return undefined,
        // components may handle this case differently.
        // We go through all the ways in which a fixed width can be
        // specified and find the one that matches our current grid size.
        if (
            !props.smallCols &&
            !props.mediumCols &&
            !props.largeCols &&
            !props.cols
        ) {
            return undefined;
        } else if (props.smallCols && mediaSize === "small") {
            return props.smallCols;
        } else if (props.mediumCols && mediaSize === "medium") {
            return props.mediumCols;
        } else if (props.largeCols && mediaSize === "large") {
            return props.largeCols;
        } else if (typeof props.cols === "function") {
            return props.cols(mediaSize);
        } else if (props.cols) {
            return props.cols;
        }

        // If nothing applies then we return null (usually resulting
        // in the component not being rendered)
        return null;
    }

    // HACK(kevinb): we use a stack method here because we can't get a ref to
    // each cell in a row without cloning them all.
    static shouldDisplay(props: Props, mediaSize: MediaSize) {
        const cols = Cell.getCols(props, mediaSize);
        return cols !== null && cols !== 0;
    }

    static defaultProps = {
        smallCols: 0,
        mediumCols: 0,
        largeCols: 0,
        cols: 0,
    };

    static __IS_CELL__ = true;

    render() {
        const {children, style} = this.props;

        return (
            <MediaLayout>
                {({mediaSize, mediaSpec}) => {
                    const spec = mediaSpec[mediaSize];
                    if (!spec) {
                        throw new Error(`mediaSpec.${mediaSize} is undefined`);
                    }

                    // Get the settings for this particular size of grid
                    const {totalColumns, gutterWidth, marginWidth} = spec;

                    const cols = Cell.getCols(this.props, mediaSize);

                    // If no columns are specified then we just don't render this cell
                    if (cols === undefined || cols === null || cols === 0) {
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

                    // If the contents are a function then we call it with the mediaSize,
                    // totalColumns, and cols properties and render the return value.
                    const contents =
                        typeof children === "function"
                            ? children({mediaSize, totalColumns, cols})
                            : children;

                    // Render a fixed-width cell (flex-basis: size, flex-shrink: 0)
                    // that matches the intended width of the cell
                    return (
                        <View
                            style={[
                                styles.cellFixed,
                                flexBasis(calcWidth),
                                style,
                            ]}
                        >
                            {contents}
                        </View>
                    );
                }}
            </MediaLayout>
        );
    }
}

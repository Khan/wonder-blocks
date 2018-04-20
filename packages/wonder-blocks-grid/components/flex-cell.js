// @flow
import * as React from "react";
import {View} from "wonder-blocks-core";

import gridSizes from "../util/sizes.js";
import styles from "../util/styles.js";
import {matchesSize, gridContextTypes} from "../util/utils.js";

import type {GridSize} from "../util/sizes.js";

type Props = {
    /** Should this cell be shown on a Small Grid? */
    small?: boolean,
    /** Should this cell be shown on a Medium Grid? */
    medium?: boolean,
    /** Should this cell be shown on a Large Grid? */
    large?: boolean,
    /**
     * The child components to populate inside the cell. Can also accept a
     * function which receives the `gridSize` and `totalColumns` and should
     * return some React Nodes to render.
     */
    children:
        | React.Node
        | (({
              gridSize: GridSize,
              totalColumns: number,
          }) => React.Node),
    /** The styling to apply to the cell. */
    style?: any,
};

/**
 * A flexible-width grid cell. Expands to fill the available space.
 * Implemented using Flex Box and [flex-grow](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow)
 * of 1.
 *
 * Typically this component will be used as a child of a [Row](#row),
 * but it's not a requirement, you can use it as a descendant, as well.
 *
 * By default (with no properties specified) it will display at all
 * grid sizes. If you specify the `small`, `medium`, or `large`
 * props then the component will only be shown at those grid sizes.
 *
 * @version 1.0
 * @since 1.0
 */
export default class FlexCell extends React.Component<Props> {
    static contextTypes = gridContextTypes;
    static defaultProps = {
        small: false,
        medium: false,
        large: false,
    };

    static shouldDisplay(props: Props, gridSize: GridSize) {
        return matchesSize(props, gridSize);
    }

    render() {
        const {children, style} = this.props;
        const {gridSize} = this.context;

        if (!FlexCell.shouldDisplay(this.props, gridSize)) {
            return null;
        }

        let contents = children;

        // If the contents are a function then we call it with the gridSize and
        // totalColumns properties and render the return value.
        if (typeof contents === "function") {
            const {totalColumns} = gridSizes[gridSize];
            contents = contents({gridSize, totalColumns});
        }

        return <View style={[styles.cellGrow, style]}>{contents}</View>;
    }
}

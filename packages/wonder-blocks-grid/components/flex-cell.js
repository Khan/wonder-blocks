// @flow
import * as React from "react";
import {View, MediaLayoutWrapper} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles.js";
import {matchesSize} from "../util/utils.js";

import type {MediaSize, MediaSpec} from "@khanacademy/wonder-blocks-core";

type Props = {|
    /** Should this cell be shown on a Small Grid? */
    small?: boolean,
    /** Should this cell be shown on a Medium Grid? */
    medium?: boolean,
    /** Should this cell be shown on a Large Grid? */
    large?: boolean,
    /**
     * The child components to populate inside the cell. Can also accept a
     * function which receives the `mediaSize` and `totalColumns` and should
     * return some React Nodes to render.
     */
    children:
        | React.Node
        | (({
              mediaSize: MediaSize,
              totalColumns: number,
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
|};

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
 */
class FlexCell extends React.Component<Props> {
    static defaultProps = {
        small: false,
        medium: false,
        large: false,
    };

    static shouldDisplay(props: Props, mediaSize: MediaSize) {
        return matchesSize(props, mediaSize);
    }

    render() {
        const {children, style, mediaSize, mediaSpec} = this.props;

        if (!FlexCell.shouldDisplay(this.props, mediaSize)) {
            return null;
        }

        let contents = children;

        // If the contents are a function then we call it with the mediaSize and
        // totalColumns properties and render the return value.
        if (typeof contents === "function") {
            const {totalColumns} = mediaSpec[mediaSize];
            contents = contents({mediaSize, totalColumns});
        }

        return <View style={[styles.cellGrow, style]}>{contents}</View>;
    }
}

export default MediaLayoutWrapper(FlexCell);

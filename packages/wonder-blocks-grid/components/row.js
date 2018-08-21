// @flow
import * as React from "react";
import {View, MediaLayoutWrapper} from "@khanacademy/wonder-blocks-core";
import type {MediaSize, MediaSpec} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles.js";
import {matchesSize} from "../util/utils.js";
import FixedWidthCell from "./fixed-width-cell.js";
import Gutter from "./gutter.js";

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
 */
class Row extends React.Component<{
    /** Should this row be shown on a Small Grid? */
    small?: boolean,
    /** Should this row be shown on a Medium Grid? */
    medium?: boolean,
    /** Should this row be shown on a Large Grid? */
    large?: boolean,
    /**
     * The child components to populate inside the row. Typically this will be
     * a mixture of [Cell](#cell), [FlexCell](#flexcell), and
     * [FixedWidthCells](#fixedwidthcell), but it can also include any elements
     * that could fit in a [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox).
     * Can also accept a function which receives the `mediaSize` and
     * `totalColumns` and should return some React Nodes to render.
     */
    children:
        | React.Node
        | (({
              mediaSize: MediaSize,
              totalColumns: number,
          }) => React.Node),
    /** The styling to apply to the row. */
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
}> {
    static defaultProps = {
        small: false,
        medium: false,
        large: false,
    };

    render() {
        const {style, mediaSize, mediaSpec, children} = this.props;
        const {marginWidth, maxWidth, totalColumns} = mediaSpec[mediaSize];
        const shouldDisplay = matchesSize(this.props, mediaSize);

        // Don't render the row if it's been disabled at this size
        if (!shouldDisplay) {
            return null;
        }

        let contents = children;

        // If the contents are a function then we call it with the mediaSize and
        // totalColumns properties and render the return value.
        if (typeof contents === "function") {
            contents = contents({mediaSize, totalColumns});
        }

        contents = React.Children.toArray(contents);

        // Go through all of the contents and pre-emptively remove anything
        // that shouldn't be rendered and insert Gutters inbetween everything
        // that is still visible.
        const filteredContents = [];
        let hasVisibleCell = false;

        for (const item of contents) {
            if (
                !item.type ||
                !item.props ||
                !item.type.shouldDisplay ||
                (typeof item.type.shouldDisplay === "function" &&
                    item.type.shouldDisplay(item.props, mediaSize))
            ) {
                if (hasVisibleCell) {
                    filteredContents.push(
                        <Gutter key={`gutter-${filteredContents.length}`} />,
                    );
                }

                filteredContents.push(item);

                hasVisibleCell = true;
            }
        }

        return (
            <View style={[styles.rowWrap, style]}>
                <View
                    style={[
                        styles.row,
                        !!maxWidth && styles.rowMaxWidth,
                        !!maxWidth && {maxWidth},
                    ]}
                >
                    <FixedWidthCell width={marginWidth} />
                    {filteredContents}
                    <FixedWidthCell width={marginWidth} />
                </View>
            </View>
        );
    }
}

export default MediaLayoutWrapper(Row);

// @flow
import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {
    MediaLayout,
    Strut,
    queryMatchesSize,
} from "@khanacademy/wonder-blocks-layout";
import type {StyleType} from "@khanacademy/wonder-blocks-core";
import type {MediaQuery, MediaSize} from "@khanacademy/wonder-blocks-layout";

import styles from "../util/styles.js";
import Gutter from "./gutter.js";
import Cell from "./cell.js";

type Props = {|
    /**
     * Which media should this cell be renderer on.  Defaults to all.
     */
    mediaQuery: MediaQuery,

    /**
     * The child components to populate inside the row. Typically this will be
     * a [Cell](#cell), but it can also include any elements
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
    style?: StyleType,
|};

/**
 * A Row holds all of the Cells that make up the contents of the grid. A row
 * also provides the margins on the sides and inserts the gutter spacing
 * in-between the cells. Typically this component will hold a [Cell](#cell),
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
export default class Row extends React.Component<Props> {
    static defaultProps = {
        mediaQuery: "all",
    };

    render() {
        const {style, children} = this.props;

        return (
            <MediaLayout>
                {({mediaSize, mediaSpec}) => {
                    const {marginWidth, maxWidth, totalColumns} = mediaSpec[
                        mediaSize
                    ];
                    const shouldDisplay = queryMatchesSize(
                        this.props.mediaQuery,
                        mediaSize,
                    );

                    // Don't render the row if it's been disabled at this size
                    if (!shouldDisplay) {
                        return null;
                    }

                    // If the contents are a function then we call it with the mediaSize and
                    // totalColumns properties and render the return value.
                    const contents =
                        typeof children === "function"
                            ? children({mediaSize, totalColumns})
                            : children;

                    const filteredContents = React.Children.toArray(contents)
                        // Go through all of the contents and pre-emptively remove anything
                        // that shouldn't be rendered.
                        .filter(
                            (item) =>
                                item.type === Cell
                                    ? // Flow doesn't know that item.props has to be Cell's Props
                                      Cell.shouldDisplay(
                                          (item.props: any),
                                          mediaSize,
                                      )
                                    : true,
                        )
                        // Intersperse Gutter elements between the cells.
                        .reduce(
                            (acc, elem, index) => [
                                ...acc,
                                elem,
                                <Gutter key={`gutter-${index}`} />,
                            ],
                            [],
                        )
                        // Remove the extra Gutter at the end.
                        .slice(0, -1);

                    return (
                        <View style={[styles.rowWrap, style]}>
                            <View
                                style={[
                                    styles.row,
                                    !!maxWidth && styles.rowMaxWidth,
                                    !!maxWidth && {maxWidth},
                                ]}
                            >
                                <Strut size={marginWidth} />
                                {filteredContents}
                                <Strut size={marginWidth} />
                            </View>
                        </View>
                    );
                }}
            </MediaLayout>
        );
    }
}

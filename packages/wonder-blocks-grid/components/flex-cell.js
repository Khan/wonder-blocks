// @flow
import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {MediaLayout, queryMatchesSize} from "@khanacademy/wonder-blocks-layout";
import type {StyleType} from "@khanacademy/wonder-blocks-core";
import type {
    MediaQuery,
    MediaSize,
    MediaSpec,
} from "@khanacademy/wonder-blocks-layout";

import styles from "../util/styles.js";

type Props = {|
    /**
     * Which media should this cell be renderer on.  Defaults to all.
     */
    mediaQuery: MediaQuery,

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
    style?: StyleType,
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
export default class FlexCell extends React.Component<Props> {
    static defaultProps = {
        mediaQuery: "all",
    };

    static shouldDisplay(props: Props, mediaSize: MediaSize) {
        return queryMatchesSize(props.mediaQuery, mediaSize);
    }

    getContents = (mediaSize: MediaSize, mediaSpec: MediaSpec) => {
        const {children} = this.props;
        if (typeof children === "function") {
            const {totalColumns} = mediaSpec[mediaSize];
            return children({mediaSize, totalColumns});
        }

        return children;
    };

    render() {
        const {children, style} = this.props;

        return (
            <MediaLayout>
                {({mediaSize, mediaSpec}) => {
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

                    return (
                        <View style={[styles.cellGrow, style]}>{contents}</View>
                    );
                }}
            </MediaLayout>
        );
    }
}

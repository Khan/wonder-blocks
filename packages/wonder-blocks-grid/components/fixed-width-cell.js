// @flow
import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {Layout} from "@khanacademy/wonder-blocks-layout";
import type {StyleType} from "@khanacademy/wonder-blocks-core";
import type {MediaSize} from "@khanacademy/wonder-blocks-layout";

import styles from "../util/styles.js";
import {flexBasis} from "../util/utils.js";

type Props = {|
    /** The default width of the cell (in pixels, %, or other). */
    width: number | string,

    /**
     * The child components to populate inside the cell. Can also accept a
     * function which receives the `mediaSize`, `totalColumns`, and cell
     * `width` and should return some React Nodes to render.
     */
    children?:
        | React.Node
        | (({
              mediaSize: MediaSize,
              totalColumns: number,
              width: number | string,
          }) => React.Node),

    /** The styling to apply to the cell. */
    style?: StyleType,
|};

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
 */
export default class FixedWidthCell extends React.Component<Props> {
    render() {
        const {children, style} = this.props;

        return (
            <Layout>
                {({mediaSize, mediaSpec}) => {
                    const {width} = this.props;

                    let contents = children;

                    // If the contents are a function then we call it with the mediaSize,
                    // totalColumns, and width properties and render the return value.
                    if (typeof contents === "function") {
                        const {totalColumns} = mediaSpec[mediaSize];
                        contents = contents({mediaSize, totalColumns, width});
                    }

                    return (
                        <View
                            style={[styles.cellFixed, flexBasis(width), style]}
                        >
                            {contents}
                        </View>
                    );
                }}
            </Layout>
        );
    }
}

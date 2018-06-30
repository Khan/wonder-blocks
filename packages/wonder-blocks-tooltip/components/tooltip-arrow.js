// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {css, StyleSheet} from "aphrodite";

import Colors from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import type {Placement} from "../util/types.js";
import type {PopperArrowProps} from "react-popper";

type Props = {
    placement: Placement,
    popperArrowProps?: PopperArrowProps,
};

// TODO(somewhatabstract): Replace this really basic unique ID work with
// something SSR-friendly and more robust.
let tempIdCounter = 0;
export default class TooltipArrow extends React.Component<Props> {
    _lastRef: ?HTMLElement;

    updateRef(ref: ?(React.Component<*> | Element)) {
        const {popperArrowProps} = this.props;
        // We only want to update the popper's arrow reference if it is
        // actually changed. Otherwise, we end up in an endless loop of updates
        // as every render would trigger yet another render.
        if (popperArrowProps && ref) {
            const domNode = ReactDOM.findDOMNode(ref);
            if (domNode instanceof HTMLElement && domNode !== this._lastRef) {
                this._lastRef = domNode;
                popperArrowProps.ref(domNode);
            }
        }
    }

    _calculateDimensionsFromPlacement() {
        const {placement} = this.props;
        const arrowWidth = Spacing.large;
        const arrowHeight = Spacing.small;

        // The trimline, which we draw to make the arrow flush to the bubble,
        // has a thickness of 1. Since the line is drawn centered to the
        // coordinates, we use an offset of 0.5 so that it properly covers what
        // we want it to.
        const trimlineOffset = 0.5;

        // Calculate the three points of the arrow. Depending on the arrow's
        // direction (i.e., the tooltip's "side"), we choose different points,
        // and set our SVG's bounds differently.
        //
        // Note that `arrowWidth` and `arrowHeight` refer to the
        // downward-pointing arrow (i.e. side="top"). When the arrow points to
        // the left or right instead, the width/height are inverted.
        switch (placement) {
            case "top":
                return {
                    trimlinePoints: [
                        `0,-${trimlineOffset}`,
                        `${arrowWidth},-${trimlineOffset}`,
                    ],
                    points: [
                        "0,0",
                        `${arrowWidth / 2},${arrowHeight}`,
                        `${arrowWidth},0`,
                    ],
                    height: arrowHeight,
                    width: arrowWidth,
                };

            case "right":
                return {
                    trimlinePoints: [
                        `${arrowHeight + trimlineOffset},0`,
                        `${arrowHeight + trimlineOffset},${arrowWidth}`,
                    ],
                    points: [
                        `${arrowHeight},0`,
                        `0,${arrowWidth / 2}`,
                        `${arrowHeight},${arrowWidth}`,
                    ],
                    width: arrowHeight,
                    height: arrowWidth,
                };

            case "bottom":
                return {
                    trimlinePoints: [
                        `0, ${arrowHeight + trimlineOffset}`,
                        `${arrowWidth},${arrowHeight + trimlineOffset}`,
                    ],
                    points: [
                        `0, ${arrowHeight}`,
                        `${arrowWidth / 2},0`,
                        `${arrowWidth},${arrowHeight}`,
                    ],
                    width: arrowWidth,
                    height: arrowHeight,
                };

            case "left":
                return {
                    trimlinePoints: [
                        `-${trimlineOffset},0`,
                        `-${trimlineOffset},${arrowWidth}`,
                    ],
                    points: [
                        `0,0`,
                        `${arrowHeight},${arrowWidth / 2}`,
                        `0,${arrowWidth}`,
                    ],
                    width: arrowHeight,
                    height: arrowWidth,
                };

            default:
                throw new Error(`Unknown placement: ${placement}`);
        }
    }

    _getFilterPositioning() {
        const {placement} = this.props;
        switch (placement) {
            case "top":
                return {
                    height: "200%",
                    y: "-25%",
                    width: "200%",
                    x: "-50%",
                };

            case "bottom":
                // No shadow on the arrow as it falls "under" the bubble.
                return null;

            case "left":
                return {
                    height: "200%",
                    y: "-50%",
                    width: "200%",
                    x: "0%",
                };

            case "right":
                return {
                    height: "200%",
                    y: "-50%",
                    width: "200%",
                    x: "-100%",
                };

            default:
                throw new Error(`Unknown placement: ${placement}`);
        }
    }

    /**
     * Create an SVG filter that applies a blur to an element.
     * We'll apply it to a dark shape outlining the tooltip, which
     * will produce the overall effect of a drop-shadow.
     *
     * Also, scope its ID by side, so that tooltips with other
     * "side" values don't end up using the wrong filter from
     * elsewhere in the document. (The `height` value depends on
     * which way the arrow is turned!)
     */
    _maybeRenderDropshadow(points: Array<string>) {
        const position = this._getFilterPositioning();
        if (!position) {
            return null;
        }
        const {placement} = this.props;
        const {y, x} = position;
        // TODO(somewhatabstract): Use unique IDs!
        const dropShadowFilterId = `tooltip-dropshadow-${placement}-${tempIdCounter++}`;
        return [
            <filter
                key="filter"
                id={dropShadowFilterId}
                // Height and width tell the filter how big of a canvas to
                // draw based on its parent size. i.e. 2 times bigger.
                // This is so that the diffuse gaussian blur has space to
                // bleed into.
                width={"200%"}
                height={"200%"}
                // The x and y values tell the filter where, relative to its
                // parent, it should begin showing its canvas. Without these
                // the filter would clip at 0,0, which would look really
                // strange.
                x={x}
                y={y}
            >
                {/* Here we provide a nice blur that will be our shadow
                * The stdDeviation is the spread of the blur. We don't want it
                * too diffuse.
                */}
                <feGaussianBlur
                    in="SourceAlpha"
                    stdDeviation={Spacing.xxSmall / 2}
                />

                {/* Here we adjust the alpha (feFuncA) linearly so as to blend
                * the shadow to match the rest of the tooltip bubble shadow.
                * It is a combination of the diffuse blur and this alpha
                * value that will make it look right.
                */}
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.5" />
                </feComponentTransfer>
            </filter>,
            /**
             * Draw the tooltip arrow and apply the blur filter we created
             * above, to produce a drop shadow effect.
             * We move it down a bit with a translation, so that it is what
             * we want.
             */
            <g transform="translate(0,5)">
                <polyline
                    key="dropshadow"
                    fill={Colors.offBlack16}
                    points={points.join(" ")}
                    stroke={Colors.offBlack32}
                    filter={`url(#${dropShadowFilterId})`}
                />
            </g>,
        ];
    }

    _renderArrow() {
        const {placement} = this.props;
        const {
            trimlinePoints,
            points,
            height,
            width,
        } = this._calculateDimensionsFromPlacement();

        return (
            <svg
                className={css(styles.arrow, styles[`arrow-${placement}`])}
                width={width}
                height={height}
            >
                {this._maybeRenderDropshadow(points)}

                {/**
                 * Draw the actual background of the tooltip arrow.
                 *
                 * We draw the outline in white too so that when we draw the
                 * outline, it draws over white and not the dropshadow behind.
                 */}
                <polyline
                    fill={Colors.white}
                    stroke={Colors.white}
                    points={points.join(" ")}
                />

                {/* Draw the tooltip outline around the tooltip arrow. */}
                <polyline
                    // Redraw the stroke on top of the background color,
                    // so that the ends aren't extra dark where they meet
                    // the border of the tooltip.
                    fill={Colors.white}
                    points={points.join(" ")}
                    stroke={Colors.offBlack16}
                />

                {/* Draw a trimline to make the arrow appear flush */}
                <polyline
                    stroke={Colors.white}
                    points={trimlinePoints.join(" ")}
                />
            </svg>
        );
    }

    render() {
        const {placement, popperArrowProps} = this.props;
        const {style} = popperArrowProps || {};
        return (
            <View
                style={[
                    styles.arrowContainer,
                    styles[`container-${placement}`],
                    style,
                ]}
                data-placement={placement}
                ref={(r) => this.updateRef(r)}
            >
                {this._renderArrow()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    /**
     * Container
     */
    arrowContainer: {
        position: "relative",
        pointerEvents: "none",
    },

    // Ensure the container is sized properly for us to be placed correctly
    // by the Popper.js code.
    "container-top": {
        top: -1,
        width: Spacing.large + Spacing.small,
        height: Spacing.small + Spacing.xSmall,
    },
    "container-right": {
        left: 1,
        width: Spacing.small + Spacing.xSmall,
        height: Spacing.large + Spacing.small,
    },
    "container-bottom": {
        top: 1,
        width: Spacing.large + Spacing.small,
        height: Spacing.small + Spacing.xSmall,
    },
    "container-left": {
        left: -1,
        width: Spacing.small + Spacing.xSmall,
        height: Spacing.large + Spacing.small,
    },

    /**
     * Arrow
     */
    arrow: {
        // Ensure the dropshadow bleeds outside our bounds.
        overflow: "visible",
    },
    "arrow-top": {
        marginLeft: Spacing.xxSmall,
        marginRight: Spacing.xxSmall,
        paddingBottom: Spacing.xSmall,
    },
    "arrow-right": {
        marginTop: Spacing.xxSmall,
        marginBottom: Spacing.xxSmall,
        paddingLeft: Spacing.xSmall,
    },
    "arrow-bottom": {
        marginLeft: Spacing.xxSmall,
        marginRight: Spacing.xxSmall,
        paddingTop: Spacing.xSmall,
    },
    "arrow-left": {
        marginTop: Spacing.xxSmall,
        marginBottom: Spacing.xxSmall,
        paddingRight: Spacing.xSmall,
    },
});

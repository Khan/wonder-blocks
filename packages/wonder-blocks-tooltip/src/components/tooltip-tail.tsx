import * as React from "react";
import {css, StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Strut} from "@khanacademy/wonder-blocks-layout";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import type {getRefFn, Placement, Offset} from "../util/types";

export type Props = {
    /**
     * Whether we should use the default white background color or switch to a
     * different bg color.
     *
     * NOTE: Added to support custom popovers
     * @ignore
     */
    color: keyof typeof color;
    /** The offset of the tail indicating where it should be positioned. */
    offset?: Offset;
    /** The placement of the tail with respect to the tooltip anchor. */
    placement: Placement;
    /** A callback to update the ref of the tail element. */
    updateRef?: getRefFn;
    /** When true, the tail is shown; otherwise, it is not but it still takes
     * space in the layout. */
    show: boolean;
};

type DefaultProps = {
    color: Props["color"];
    show: Props["show"];
};

type Dimensions = {
    trimlinePoints: [string, string];
    points: [string, string, string];
    height: number;
    width: number;
};

type FilterPosition = {
    y: string;
    x: string;
    offsetShadowX: number;
};

// TODO(somewhatabstract): Replace this really basic unique ID work with
// something SSR-friendly and more robust.
let tempIdCounter = 0;

export default class TooltipTail extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        color: "white",
        show: true,
    };

    _calculateDimensionsFromPlacement(): Dimensions {
        const {placement} = this.props;

        // The trimline, which we draw to make the tail flush to the bubble,
        // has a thickness of 1. Since the line is drawn centered to the
        // coordinates, we use an offset of 0.5 so that it properly covers what
        // we want it to.
        const trimlineOffset = 0.5;

        // Calculate the three points of the arrow. Depending on the tail's
        // direction (i.e., the tooltip's "side"), we choose different points,
        // and set our SVG's bounds differently.
        //
        // Note that when the tail points to the left or right, the width/height
        // are inverted.
        switch (placement) {
            case "top":
                return {
                    trimlinePoints: [
                        `0,-${trimlineOffset}`,
                        `${ARROW_WIDTH},-${trimlineOffset}`,
                    ],
                    points: [
                        "0,0",
                        `${ARROW_WIDTH / 2},${ARROW_HEIGHT}`,
                        `${ARROW_WIDTH},0`,
                    ],
                    height: ARROW_HEIGHT,
                    width: ARROW_WIDTH,
                };

            case "right":
                return {
                    trimlinePoints: [
                        `${ARROW_HEIGHT + trimlineOffset},0`,
                        `${ARROW_HEIGHT + trimlineOffset},${ARROW_WIDTH}`,
                    ],
                    points: [
                        `${ARROW_HEIGHT},0`,
                        `0,${ARROW_WIDTH / 2}`,
                        `${ARROW_HEIGHT},${ARROW_WIDTH}`,
                    ],
                    width: ARROW_HEIGHT,
                    height: ARROW_WIDTH,
                };

            case "bottom":
                return {
                    trimlinePoints: [
                        `0, ${ARROW_HEIGHT + trimlineOffset}`,
                        `${ARROW_WIDTH},${ARROW_HEIGHT + trimlineOffset}`,
                    ],
                    points: [
                        `0, ${ARROW_HEIGHT}`,
                        `${ARROW_WIDTH / 2},0`,
                        `${ARROW_WIDTH},${ARROW_HEIGHT}`,
                    ],
                    width: ARROW_WIDTH,
                    height: ARROW_HEIGHT,
                };

            case "left":
                return {
                    trimlinePoints: [
                        `-${trimlineOffset},0`,
                        `-${trimlineOffset},${ARROW_WIDTH}`,
                    ],
                    points: [
                        `0,0`,
                        `${ARROW_HEIGHT},${ARROW_WIDTH / 2}`,
                        `0,${ARROW_WIDTH}`,
                    ],
                    width: ARROW_HEIGHT,
                    height: ARROW_WIDTH,
                };

            default:
                throw new Error(`Unknown placement: ${placement}`);
        }
    }

    _getFilterPositioning(): FilterPosition | null | undefined {
        const {placement} = this.props;
        switch (placement) {
            case "top":
                return {
                    y: "-50%",
                    x: "-50%",
                    offsetShadowX: 0,
                };

            case "bottom":
                // No shadow on the arrow as it falls "under" the bubble.
                return null;

            case "left":
                return {
                    y: "-50%",
                    x: "0%",
                    offsetShadowX: 1,
                };

            case "right":
                return {
                    y: "-50%",
                    x: "-100%",
                    offsetShadowX: -1,
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
    _maybeRenderDropshadow(points: [string, string, string]): React.ReactNode {
        const position = this._getFilterPositioning();

        if (!position) {
            return null;
        }
        const {placement} = this.props;
        const {y, x, offsetShadowX} = position;
        const dropShadowFilterId = `tooltip-dropshadow-${placement}-${tempIdCounter++}`;
        return [
            <filter
                key="filter"
                id={dropShadowFilterId}
                // Height and width tell the filter how big of a canvas to
                // draw based on its parent size. i.e. 2 times bigger.
                // This is so that the diffuse gaussian blur has space to
                // bleed into.
                width="200%"
                height="200%"
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
                    stdDeviation={spacing.xxSmall_6 / 2}
                />

                {/* Here we adjust the alpha (feFuncA) linearly so as to blend
                 * the shadow to match the rest of the tooltip bubble shadow.
                 * It is a combination of the diffuse blur and this alpha
                 * value that will make it look right.
                 *
                 * The value of 0.3. was arrived at from trial and error.
                 */}
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3" />
                </feComponentTransfer>
            </filter>,
            /**
             * Draw the tooltip arrow and apply the blur filter we created
             * above, to produce a drop shadow effect.
             * We move it down a bit with a translation, so that it is what
             * we want.
             *
             * We offset the shadow on the X-axis because for left/right
             * tails, we move the tail 1px toward the bubble. If we didn't
             * offset the shadow, it would crash the bubble outline.
             *
             * See styles below for why we offset the arrow.
             */
            <g key="dropshadow" transform={`translate(${offsetShadowX},5.5)`}>
                <polyline
                    fill={color.offBlack16}
                    points={points.join(" ")}
                    stroke={color.offBlack32}
                    filter={`url(#${dropShadowFilterId})`}
                />
            </g>,
        ];
    }

    _getFullTailWidth(): number {
        return ARROW_WIDTH + 2 * MIN_DISTANCE_FROM_CORNERS;
    }

    _getFullTailHeight(): number {
        return ARROW_HEIGHT + DISTANCE_FROM_ANCHOR;
    }

    _getContainerStyle(): StyleType {
        const {placement} = this.props;
        /**
         * Ensure the container is sized properly for us to be placed correctly
         * by the Popper.js code.
         *
         * Here we offset the arrow 1px toward the bubble. This ensures the arrow
         * outline meets the bubble outline and allows the arrow to erase the bubble
         * outline between the ends of the arrow outline. We do this so that the
         * arrow outline and bubble outline create a single, seamless outline of
         * the callout.
         *
         * NOTE: The widths and heights refer to the downward-pointing tail
         * (i.e. placement="top"). When the tail points to the left or right
         * instead, the width/height are inverted.
         */
        const fullTailWidth = this._getFullTailWidth();
        const fullTailHeight = this._getFullTailHeight();

        switch (placement) {
            case "top":
                return {
                    top: -1,
                    width: fullTailWidth,
                    height: fullTailHeight,
                };

            case "right":
                return {
                    left: 1,
                    width: fullTailHeight,
                    height: fullTailWidth,
                };

            case "bottom":
                return {
                    top: 1,
                    width: fullTailWidth,
                    height: fullTailHeight,
                };

            case "left":
                return {
                    left: -1,
                    width: fullTailHeight,
                    height: fullTailWidth,
                };

            default:
                throw new Error(`Unknown placement: ${placement}`);
        }
    }

    _getArrowStyle(): React.CSSProperties {
        const {placement} = this.props;
        switch (placement) {
            case "top":
                return {
                    marginLeft: MIN_DISTANCE_FROM_CORNERS,
                    marginRight: MIN_DISTANCE_FROM_CORNERS,
                    paddingBottom: DISTANCE_FROM_ANCHOR,
                };

            case "right":
                return {
                    marginTop: MIN_DISTANCE_FROM_CORNERS,
                    marginBottom: MIN_DISTANCE_FROM_CORNERS,
                    paddingLeft: DISTANCE_FROM_ANCHOR,
                };

            case "bottom":
                return {
                    marginLeft: MIN_DISTANCE_FROM_CORNERS,
                    marginRight: MIN_DISTANCE_FROM_CORNERS,
                    paddingTop: DISTANCE_FROM_ANCHOR,
                };

            case "left":
                return {
                    marginTop: MIN_DISTANCE_FROM_CORNERS,
                    marginBottom: MIN_DISTANCE_FROM_CORNERS,
                    paddingRight: DISTANCE_FROM_ANCHOR,
                };

            default:
                throw new Error(`Unknown placement: ${placement}`);
        }
    }

    _renderArrow(): React.ReactNode {
        const {trimlinePoints, points, height, width} =
            this._calculateDimensionsFromPlacement();

        const {color: arrowColor, show} = this.props;

        if (!show) {
            // If we aren't showing the tail, we still need to take up space
            // so we render a strut instead.
            return <Strut size={height} />;
        }

        return (
            <svg
                className={css(styles.arrow)}
                style={this._getArrowStyle()}
                width={width}
                height={height}
                aria-hidden
            >
                {this._maybeRenderDropshadow(points)}
                {/**
                 * Draw the actual background of the tooltip arrow.
                 *
                 * We draw the outline in white too so that when we draw the
                 * outline, it draws over white and not the dropshadow behind.
                 */}
                <polyline
                    fill={color[arrowColor]}
                    stroke={color[arrowColor]}
                    points={points.join(" ")}
                />
                {/* Draw the tooltip outline around the tooltip arrow. */}
                <polyline
                    // Redraw the stroke on top of the background color,
                    // so that the ends aren't extra dark where they meet
                    // the border of the tooltip.
                    fill={color[arrowColor]}
                    points={points.join(" ")}
                    stroke={color.offBlack16}
                />
                {/* Draw a trimline to make the arrow appear flush */}
                <polyline
                    stroke={color[arrowColor]}
                    points={trimlinePoints.join(" ")}
                />
            </svg>
        );
    }

    render(): React.ReactNode {
        const {offset, placement, updateRef} = this.props;
        return (
            <View
                style={[
                    styles.tailContainer,
                    {...offset},
                    this._getContainerStyle(),
                ]}
                data-placement={placement}
                ref={updateRef}
            >
                {this._renderArrow()}
            </View>
        );
    }
}

/**
 * Some constants to make style generation easier to understand.
 * NOTE: The widths and heights refer to the downward-pointing tail
 * (i.e. placement="top"). When the tail points to the left or right instead,
 * the width/height are inverted.
 */
const DISTANCE_FROM_ANCHOR = spacing.xSmall_8;

const MIN_DISTANCE_FROM_CORNERS = spacing.xSmall_8;

const ARROW_WIDTH = spacing.large_24;
const ARROW_HEIGHT = spacing.small_12;

const styles = StyleSheet.create({
    /**
     * Container
     */
    tailContainer: {
        position: "relative",
        pointerEvents: "none",
    },

    /**
     * Arrow
     */
    arrow: {
        // Ensure the dropshadow bleeds outside our bounds.
        overflow: "visible",
    },
});

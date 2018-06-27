// @flow
import * as React from "react";
import {css, StyleSheet} from "aphrodite";

import Colors from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import type {Placement} from "../util/types.js";
import type {PopperArrowProps} from "react-popper";

type Props = {
    placement: Placement,
    popperArrowProps?: PopperArrowProps,
};

export default class TooltipArrow extends React.Component<Props> {
    lastRef: ?HTMLElement;

    updateRef(ref: ?HTMLElement) {
        const {popperArrowProps} = this.props;
        // We only want to update the popper's arrow reference if it is
        // actually changed. Otherwise, we end up in an endless loop of updates
        // as every render would trigger yet another render.
        if (popperArrowProps && ref && ref !== this.lastRef) {
            this.lastRef = ref;
            popperArrowProps.ref(ref);
        }
    }

    _calculateDimensionsFromPlacement() {
        const {placement} = this.props;
        const arrowWidth = Spacing.large;
        const arrowHeight = Spacing.small;

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

    _renderArrow() {
        const {placement} = this.props;
        const {
            points,
            height,
            width,
        } = this._calculateDimensionsFromPlacement();

        // TODO(somewhatabstract): Use unique IDs!
        const dropShadowFilterId = `tooltip-dropshadow-${placement}`;

        return (
            <svg
                className={css(styles.arrow, styles[`arrow-${placement}`])}
                width={width}
                height={height}
            >
                {/* Create an SVG filter that applies a blur to an element.
                  * We'll apply it to a dark shape outlining the tooltip, which
                  * will produce the overall effect of a drop-shadow.
                  *
                  * Also, scope its ID by side, so that tooltips with other
                  * "side" values don't end up using the wrong filter from
                  * elsewhere in the document. (The `height` value depends on
                  * which way the arrow is turned!)
                  *
                  * In general, it's not *great* that multiple tooltips of the
                  * same side will yield ID conflicts... but at least they'll
                  * be the same filter, so it doesn't matter which one we
                  * reference, so long as it's for the correct side. */}
                <filter id={dropShadowFilterId} height="150%">
                    <feOffset
                        dx={Spacing.xSmall}
                        dy={Spacing.xSmall}
                        result="offsetblur"
                    />
                    <feGaussianBlur
                        in="SourceAlpha"
                        stdDeviation={Spacing.xxSmall / 2}
                    />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope={0.16} />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Draw the background of the tooltip arrow. */}
                <polyline
                    fill={Colors.white}
                    stroke={Colors.white}
                    points={points.join(" ")}
                />

                {/* Draw an outline around the tooltip arrow, and apply the
                  * blur filter we created above, to produce a drop shadow
                  * effect. */}
                <polyline
                    // Redraw the stroke on top of the background color,
                    // so that the ends aren't extra dark where they meet
                    // the border of the tooltip.
                    fill={Colors.white}
                    points={points.join(" ")}
                    stroke={Colors.offBlack16}
                    filter={`url(#${dropShadowFilterId})`}
                />
            </svg>
        );
    }

    render() {
        const {placement, popperArrowProps} = this.props;
        const {style} = popperArrowProps || {};
        return (
            <div
                className={css(
                    styles.arrowContainer,
                    styles[`container-${placement}`],
                )}
                style={style}
                data-placement={placement}
                ref={(r) => this.updateRef(r)}
            >
                {this._renderArrow()}
            </div>
        );
    }
}

const styles = StyleSheet.create({
    /**
     * Container
     */
    arrowContainer: {
        position: "relative",
        width: Spacing.large,
        height: Spacing.small,
        pointerEvents: "none",
    },

    // Ensure the container is sized properly for us to be placed correctly
    // by the Popper.js code.
    "container-top": {
        width: Spacing.large,
        height: Spacing.small + Spacing.xSmall,
    },
    "container-right": {
        width: Spacing.small + Spacing.xSmall,
        height: Spacing.large,
    },
    "container-bottom": {
        width: Spacing.large,
        height: Spacing.small + Spacing.xSmall,
    },
    "container-left": {
        width: Spacing.small + Spacing.xSmall,
        height: Spacing.large,
    },

    /**
     * Arrow
     */
    arrow: {
        // Ensure the dropshadow bleeds outside our bounds.
        overflow: "visible",
    },
    "arrow-top": {
        paddingBottom: Spacing.xSmall,
    },
    "arrow-right": {
        paddingLeft: Spacing.xSmall,
    },
    "arrow-bottom": {
        paddingTop: Spacing.xSmall,
    },
    "arrow-left": {
        paddingRight: Spacing.xSmall,
    },
});

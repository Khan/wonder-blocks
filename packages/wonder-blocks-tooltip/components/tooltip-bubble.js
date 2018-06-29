// @flow
import {css, StyleSheet} from "aphrodite";
import * as React from "react";
import {Popper} from "react-popper";

import {View} from "@khanacademy/wonder-blocks-core";
import TooltipContent from "./tooltip-content.js";
import TooltipArrow from "./tooltip-arrow.js";
import visibilityModifierDefaultConfig from "../util/visibility-modifier.js";

import type {PopperChildrenProps} from "react-popper";
import type {Placement} from "../util/types.js";

type Props = {|
    // The content to be shown in the bubble.
    children: React.Element<typeof TooltipContent>,

    // The element that anchors the tooltip bubble.
    // This is used to position the bubble.
    anchorElement: ?HTMLElement,

    // Where should the bubble try to go with respect to its anchor.
    placement: Placement,
|};

export default class TooltipBubble extends React.Component<Props> {
    _renderBubble(childrenProps: PopperChildrenProps) {
        const {children, placement} = this.props;
        const {ref, outOfBoundaries, style, arrowProps} = childrenProps;
        const actualPlacement = childrenProps.placement || placement;

        // Here we take the props provided to us by popper.js and use them
        // to position ourselves. We don't use a View because the ref callback
        // for the react-popper integration expects an HTMLElement and coercing
        // a View ref to the right type is a lot of extra lifting for little
        // gain over just using a div.
        return (
            <div
                data-placement={actualPlacement}
                ref={ref}
                className={css(styles.bubble, outOfBoundaries && styles.hide)}
                style={style}
            >
                <View style={styles[`content-${actualPlacement}`]}>
                    {children}
                    <TooltipArrow
                        placement={actualPlacement}
                        popperArrowProps={arrowProps}
                    />
                </View>
            </div>
        );
    }

    render() {
        const {anchorElement, placement} = this.props;
        return (
            <Popper
                referenceElement={anchorElement}
                placement={placement}
                modifiers={{
                    wbVisibility: visibilityModifierDefaultConfig,
                    preventOverflow: {boundariesElement: "viewport"},
                }}
            >
                {(props) => this._renderBubble(props)}
            </Popper>
        );
    }
}

const styles = StyleSheet.create({
    bubble: {
        pointerEvents: "none",
    },

    /**
     * The hide style ensures that the bounds of the bubble stay unchanged.
     * This is because popper.js calculates the bubble position based off its
     * bounds and if we stopped rendering it entirely, it wouldn't know where to
     * place it when it reappeared.
     */
    hide: {
        pointerEvents: "none",
        opacity: 0,
        backgroundColor: "transparent",
        color: "transparent",
    },

    /**
     * Ensure the content and arrow are properly arranged.
     */
    "content-top": {
        flexDirection: "column",
    },
    "content-right": {
        flexDirection: "row-reverse",
    },
    "content-bottom": {
        flexDirection: "column-reverse",
    },
    "content-left": {
        flexDirection: "row",
    },
});

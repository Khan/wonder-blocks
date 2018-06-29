// @flow
import {StyleSheet} from "aphrodite";
import * as React from "react";
import * as ReactDOM from "react-dom";

import Colors from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import TooltipContent from "./tooltip-content.js";
import TooltipArrow from "./tooltip-arrow.js";

import type {PopperChildrenProps} from "./tooltip-popper.js";

type Props = {|
    // The content to be shown in the bubble.
    children: React.Element<typeof TooltipContent>,

    // The props provided by TooltipPopper, which are used to position
    // and manage the bubble contents.
    popperProps: PopperChildrenProps,
|};

export default class TooltipBubble extends React.Component<Props> {
    _lastRef: ?HTMLElement;

    _updateRef(ref: ?(React.Component<*> | Element)) {
        const {popperProps} = this.props;
        // We only want to update the popper's arrow reference if it is
        // actually changed. Otherwise, we end up in an endless loop of updates
        // as every render would trigger yet another render.
        if (popperProps && ref) {
            const domNode = ReactDOM.findDOMNode(ref);
            if (domNode instanceof HTMLElement && domNode !== this._lastRef) {
                this._lastRef = domNode;
                popperProps.ref(domNode);
            }
        }
    }

    render() {
        const {children, popperProps} = this.props;
        const {placement, outOfBoundaries, style, arrowProps} = popperProps;

        return (
            <View
                data-placement={placement}
                ref={(r) => this._updateRef(r)}
                style={[
                    style,
                    outOfBoundaries && styles.hide,
                    styles.bubble,
                    styles[`content-${placement}`],
                ]}
            >
                <View style={styles.content}>{children}</View>
                <TooltipArrow
                    placement={placement}
                    popperArrowProps={arrowProps}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bubble: {
        pointerEvents: "none",
        position: "absolute",
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

    content: {
        padding: "10px 16px",
        maxWidth: 472,
        borderRadius: Spacing.xxxSmall,
        border: `solid 1px ${Colors.offBlack16}`,
        backgroundColor: Colors.white,
        boxShadow: `0 ${Spacing.xSmall}px ${Spacing.xSmall}px 0 ${
            Colors.offBlack8
        }`,
    },
});

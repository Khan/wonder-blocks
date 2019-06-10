// @flow
import {StyleSheet} from "aphrodite";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Colors from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import TooltipContent from "./tooltip-content.js";
import TooltipTail from "./tooltip-tail.js";

import type {getRefFn, Offset, Placement} from "../util/types.js";

export type TooltipBubbleProps = {|
    /** The placement of the bubble with respect to the anchor. */
    placement: Placement,

    /** Whether the bubble is out of bounds or not. */
    outOfBoundaries?: ?boolean,

    /** A callback for updating the ref of the bubble itself. */
    updateBubbleRef?: getRefFn,

    /** A callback for updating the ref of the bubble's tail. */
    updateTailRef?: getRefFn,

    /** Where the tail is to be rendered. */
    tailOffset?: Offset,

    /** Additional styles to be applied by the bubble. */
    style?: StyleType,
|};

export type Props = {|
    /** The unique identifier for this component. */
    id: string,

    /** The `TooltipContent` element that will be rendered in the bubble. */
    children: React.Element<typeof TooltipContent>,

    onActiveChanged: (active: boolean) => mixed,

    onTimeoutChanged: (timeoutID: ?TimeoutID) => mixed,

    anchorTimeoutID: ?TimeoutID,

    // TODO(somewhatabstract): Update react-docgen to support spread operators
    // (v3 beta introduces this)
    ...TooltipBubbleProps,
|};

type State = {|
    active: boolean,
|};

export default class TooltipBubble extends React.Component<Props, State> {
    state = {
        active: false,
    };

    componentDidMount() {
        const bubbleNode = ReactDOM.findDOMNode(this);

        if (!bubbleNode) {
            return;
        }

        bubbleNode.addEventListener("mouseenter", this._handleMouseEnter);
        bubbleNode.addEventListener("mouseleave", this._handleMouseLeave);
        //console.log("Bubbble was mounted");
    }

    _updateActiveState(hovered: boolean) {
        this._setActiveState(hovered);
    }

    _setActiveState(active: boolean, instant?: boolean) {
        this.setState({active});
        this.props.onActiveChanged(active);
    }

    _handleMouseEnter = () => {
        if (this.props.anchorTimeoutID) {
            clearTimeout(this.props.anchorTimeoutID);
            this.props.onTimeoutChanged(null);
        }
        this._updateActiveState(true);
    };

    _handleMouseLeave = () => {
        this.props.onActiveChanged(false);
        this._updateActiveState(false);
    };

    render() {
        const {
            id,
            children,
            updateBubbleRef,
            placement,
            outOfBoundaries,
            style,
            updateTailRef,
            tailOffset,
        } = this.props;

        return (
            <View
                id={id}
                role="tooltip"
                data-placement={placement}
                ref={updateBubbleRef}
                style={[
                    outOfBoundaries && styles.hide,
                    styles.bubble,
                    styles[`content-${placement}`],
                    style,
                ]}
            >
                <View style={styles.content}>{children}</View>
                <TooltipTail
                    updateRef={updateTailRef}
                    placement={placement}
                    offset={tailOffset}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bubble: {
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
     * Ensure the content and tail are properly arranged.
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
        maxWidth: 472,
        borderRadius: Spacing.xxxSmall,
        border: `solid 1px ${Colors.offBlack16}`,
        backgroundColor: Colors.white,
        boxShadow: `0 ${Spacing.xSmall}px ${Spacing.xSmall}px 0 ${
            Colors.offBlack8
        }`,
        justifyContent: "center",
    },
});

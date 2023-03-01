import {StyleSheet} from "aphrodite";
import * as React from "react";
import Colors from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import TooltipContent from "./tooltip-content";
import TooltipTail from "./tooltip-tail";

import type {getRefFn, Offset, Placement} from "../util/types";

export type PopperElementProps = {
    /** The placement of the bubble with respect to the anchor. */
    placement: Placement;
    /** Whether the bubble is out of bounds or not. */
    isReferenceHidden?: boolean | null | undefined;
    /** A callback for updating the ref of the bubble itself. */
    updateBubbleRef?: getRefFn;
    /** A callback for updating the ref of the bubble's tail. */
    updateTailRef?: getRefFn;
    /** Where the tail is to be rendered. */
    tailOffset?: Offset;
    /** Additional styles to be applied by the bubble. */
    style?: StyleType;
};

export type Props = {
    /** The unique identifier for this component. */
    id: string;
    /** The `TooltipContent` element that will be rendered in the bubble. */
    // @ts-expect-error [FEI-5019] - TS2344 - Type 'TooltipContent' does not satisfy the constraint 'keyof IntrinsicElements | JSXElementConstructor<any>'.
    children: React.ReactElement<React.ComponentProps<TooltipContent>>;
    onActiveChanged: (active: boolean) => unknown;
} & // (v3 beta introduces this) // TODO(somewhatabstract): Update react-docgen to support spread operators
PopperElementProps;

type State = {
    active: boolean;
};

export default class TooltipBubble extends React.Component<Props, State> {
    state: State = {
        active: false,
    };

    _setActiveState(active: boolean) {
        this.setState({active});
        this.props.onActiveChanged(active);
    }

    handleMouseEnter: () => void = () => {
        this._setActiveState(true);
    };

    handleMouseLeave: () => void = () => {
        this.props.onActiveChanged(false);
    };

    render(): React.ReactElement {
        const {
            id,
            children,
            updateBubbleRef,
            placement,
            isReferenceHidden,
            style,
            updateTailRef,
            tailOffset,
        } = this.props;

        return (
            <View
                id={id}
                role="tooltip"
                data-placement={placement}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                ref={updateBubbleRef}
                style={[
                    isReferenceHidden && styles.hide,
                    styles.bubble,
                    // @ts-expect-error [FEI-5019] - TS2551 - Property 'content-auto' does not exist on type '{ bubble: { position: string; }; hide: { pointerEvents: string; opacity: number; backgroundColor: string; color: string; }; "content-top": { flexDirection: string; }; "content-right": { flexDirection: string; }; "content-bottom": { ...; }; "content-left": { ...; }; content: { ...; }; }'. Did you mean 'content-top'?
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
        borderRadius: Spacing.xxxSmall_4,
        border: `solid 1px ${Colors.offBlack16}`,
        backgroundColor: Colors.white,
        boxShadow: `0 ${Spacing.xSmall_8}px ${Spacing.xSmall_8}px 0 ${Colors.offBlack8}`,
        justifyContent: "center",
    },
});

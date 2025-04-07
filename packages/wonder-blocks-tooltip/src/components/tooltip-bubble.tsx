import {StyleSheet} from "aphrodite";
import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {color, semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";

import TooltipContent from "./tooltip-content";
import TooltipTail from "./tooltip-tail";
import {PopperElementProps} from "../util/types";

export type Props = {
    /** The unique identifier for this component. */
    id: string;
    /** The `TooltipContent` element that will be rendered in the bubble. */
    children: React.ReactElement<React.ComponentProps<typeof TooltipContent>>;
    onActiveChanged: (active: boolean) => unknown;
    /** Optional background color. */
    backgroundColor?: keyof typeof color;
} & PopperElementProps; // (v3 beta introduces this) // TODO(somewhatabstract): Update react-docgen to support spread operators

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

    render(): React.ReactNode {
        const {
            id,
            children,
            updateBubbleRef,
            placement,
            isReferenceHidden,
            style,
            updateTailRef,
            tailOffset,
            backgroundColor,
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
                    styles[`content-${placement}`],
                    style,
                ]}
            >
                <View
                    style={[
                        styles.content,
                        backgroundColor && {
                            backgroundColor: color[backgroundColor],
                        },
                    ]}
                >
                    {children}
                </View>
                <TooltipTail
                    updateRef={updateTailRef}
                    placement={placement}
                    offset={tailOffset}
                    color={backgroundColor}
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
        borderRadius: spacing.xxxSmall_4,
        border: `solid 1px ${semanticColor.border.primary}`,
        backgroundColor: semanticColor.surface.primary,
        // TODO(WB-1878): Use `elevation` token.
        boxShadow: `0 ${spacing.xSmall_8}px ${spacing.xSmall_8}px 0 ${color.offBlack8}`,
        justifyContent: "center",
    },
});

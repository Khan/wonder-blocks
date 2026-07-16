import {StyleSheet} from "aphrodite";
import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {
    border,
    color,
    boxShadow,
    semanticColor,
} from "@khanacademy/wonder-blocks-tokens";

import TooltipContent from "./tooltip-content";
import TooltipTail from "./tooltip-tail";
import {PopperElementProps, TooltipVariant} from "../util/types";

export type Props = {
    /** The unique identifier for this component. */
    id: string;
    /** The `TooltipContent` element that will be rendered in the bubble. */
    children: React.ReactElement<React.ComponentProps<typeof TooltipContent>>;
    onActiveChanged: (active: boolean) => unknown;
    /** Optional background color. */
    backgroundColor?: keyof typeof color;
    /**
     * The visual style of the tooltip. When `strong`, the bubble uses a
     * higher-emphasis inverse/knockout treatment. Defaults to `subtle`.
     */
    variant?: TooltipVariant;
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
            variant,
        } = this.props;
        const isStrong = variant === "strong";
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
                        // The strong variant takes precedence over the legacy
                        // `backgroundColor` override.
                        isStrong && styles.contentStrong,
                    ]}
                >
                    {children}
                </View>
                <TooltipTail
                    updateRef={updateTailRef}
                    placement={placement}
                    offset={tailOffset}
                    color={backgroundColor}
                    variant={variant}
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
        backgroundColor: semanticColor.core.transparent,
        color: semanticColor.core.transparent,
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
        maxInlineSize: 472,
        borderRadius: border.radius.radius_040,
        border: `solid 1px ${semanticColor.core.border.neutral.subtle}`,
        backgroundColor: semanticColor.core.background.base.default,
        boxShadow: boxShadow.mid,
        justifyContent: "center",
    },

    /**
     * The strong variant uses a higher-emphasis inverse/knockout treatment.
     * The text color is set here so it cascades to the `TooltipContent`
     * typography, which inherits the CSS `color`.
     */
    contentStrong: {
        backgroundColor: semanticColor.feedback.neutral.strong.background,
        borderColor: semanticColor.feedback.neutral.strong.border,
        color: semanticColor.feedback.neutral.strong.text,
    },
});

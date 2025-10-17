import {StyleSheet} from "aphrodite";
import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {
    border,
    color,
    boxShadow,
    semanticColor,
} from "@khanacademy/wonder-blocks-tokens";

import {FloatingArrow} from "@floating-ui/react";
import TooltipContent from "./tooltip-content";
// import TooltipTail from "./tooltip-tail";
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
            // style,
            updateTailRef,
            floatingStyles,
            // tailOffset,
            context,
            backgroundColor,
        } = this.props;

        const arrowColor =
            backgroundColor ?? semanticColor.core.background.base.default;
        const locatedAtBlockStart = placement.startsWith("top");

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
                    // style,
                    floatingStyles,
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
                    {context && (
                        <FloatingArrow
                            ref={
                                updateTailRef as React.RefObject<SVGSVGElement>
                            }
                            context={context}
                            fill={arrowColor}
                            width={24}
                            height={12}
                            stroke={semanticColor.core.border.neutral.subtle}
                            strokeWidth={1}
                            style={
                                locatedAtBlockStart
                                    ? {
                                          filter: `drop-shadow(0 3px 2px ${semanticColor.core.shadow.transparent.mid})`,
                                      }
                                    : undefined
                            }
                        />
                    )}
                </View>
                {/* <TooltipTail
                    updateRef={updateTailRef}
                    placement={placement}
                    offset={tailOffset}
                    color={backgroundColor}
                /> */}
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
        borderRadius: border.radius.radius_040,
        border: `solid 1px ${semanticColor.core.border.neutral.subtle}`,
        backgroundColor: semanticColor.core.background.base.default,
        boxShadow: boxShadow.mid,
        justifyContent: "center",
    },
});

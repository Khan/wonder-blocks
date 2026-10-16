import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {color} from "@khanacademy/wonder-blocks-tokens";

import TooltipContent from "./tooltip-content";
import TooltipTail from "./tooltip-tail";
import {PopperElementProps, TooltipVariant} from "../util/types";
import styles from "./tooltip-bubble.module.css";

const placementStyles = {
    top: styles.contentTop,
    right: styles.contentRight,
    bottom: styles.contentBottom,
    left: styles.contentLeft,
} as const;

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
                    styles.root,
                    isReferenceHidden && styles.hide,
                    styles.bubble,
                    placementStyles[placement],
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

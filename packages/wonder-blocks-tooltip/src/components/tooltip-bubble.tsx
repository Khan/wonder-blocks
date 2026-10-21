import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";

import TooltipContent from "./tooltip-content";

export type Props = {
    /** The unique identifier for this component. */
    id: string;
    /** The `TooltipContent` element that will be rendered in the bubble. */
    children: React.ReactElement<React.ComponentProps<typeof TooltipContent>>;
    /**
     * Called with `true` when the pointer enters the bubble and `false` when it
     * leaves, so the tooltip stays open while the bubble is hovered.
     */
    onActiveChanged: (active: boolean) => unknown;
};

/**
 * The tooltip element rendered inside of the `Floating` element.
 *
 * The bubble chrome (background, border, shadow) and the tail are rendered by
 * `Floating`, so this component is only responsible for exposing the content
 * as a tooltip and keeping the tooltip open while it is hovered.
 */
export default function TooltipBubble({id, children, onActiveChanged}: Props) {
    const handleMouseEnter = React.useCallback(() => {
        onActiveChanged(true);
    }, [onActiveChanged]);

    const handleMouseLeave = React.useCallback(() => {
        onActiveChanged(false);
    }, [onActiveChanged]);

    return (
        <View
            id={id}
            role="tooltip"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </View>
    );
}

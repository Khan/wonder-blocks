import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";

import TooltipContent from "./tooltip-content";

export type Props = {
    /** The unique identifier for this component. */
    id: string;
    /** The `TooltipContent` element that will be rendered in the bubble. */
    children: React.ReactElement<React.ComponentProps<typeof TooltipContent>>;
};

/**
 * The tooltip element rendered inside of the `Floating` element.
 *
 * The bubble chrome (background, border, shadow) and the tail are rendered by
 * `Floating`, which also reports when the bubble is hovered, so this component
 * is only responsible for exposing the content as a tooltip.
 */
export default function TooltipBubble({id, children}: Props) {
    return (
        <View id={id} role="tooltip">
            {children}
        </View>
    );
}

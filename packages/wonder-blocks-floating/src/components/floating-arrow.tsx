import * as React from "react";

import {FloatingArrow, FloatingContext} from "@floating-ui/react";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {ARROW_SIZE_BLOCK, ARROW_SIZE_INLINE} from "../util/constants";

export type ArrowStyles = {
    /**
     * The fill color of the arrow.
     * @default semanticColor.core.background.base.default
     */
    fill?: string;
    /**
     * The stroke color of the arrow.
     * @default semanticColor.core.border.neutral.subtle
     */
    stroke?: string;
    /**
     * The width of the stroke (border) of the arrow.
     * @default 1
     *
     * NOTE: Needs to be a number value (in pixels).
     */
    strokeWidth?: number;
    /**
     * The width of the arrow.
     * @default 20
     *
     * NOTE: Needs to be a number value (in pixels).
     */
    width?: number;
    /**
     * The height of the arrow.
     * @default 10
     *
     * NOTE: Needs to be a number value (in pixels).
     */
    height?: number;
};

type Props = {
    /**
     * The context of the floating element.
     */
    context: FloatingContext;
    /**
     * The styles to use for the arrow.
     */
    style?: ArrowStyles;
};

export const Arrow = React.forwardRef(function Arrow(
    {context, style}: Props,
    ref: React.ForwardedRef<SVGSVGElement>,
) {
    // Only apply the drop shadow to the top placement, that way the shadow
    // follows the floating element's shape.
    const shadowStyle = context.placement.endsWith("top")
        ? {
              filter: `drop-shadow(0 4px 2px ${semanticColor.core.shadow.transparent.mid})`,
          }
        : undefined;

    return (
        <FloatingArrow
            ref={ref}
            context={context}
            fill={style?.fill ?? semanticColor.core.background.base.default}
            stroke={style?.stroke ?? semanticColor.core.border.neutral.subtle}
            strokeWidth={style?.strokeWidth ?? 1}
            width={style?.width ?? ARROW_SIZE_INLINE}
            height={style?.height ?? ARROW_SIZE_BLOCK}
            style={shadowStyle}
        />
    );
});

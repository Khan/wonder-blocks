import * as React from "react";

import {FloatingArrow, FloatingContext} from "@floating-ui/react";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {ARROW_SIZE_BLOCK, ARROW_SIZE_INLINE} from "../util/constants";

export const Arrow = React.forwardRef(function Arrow(
    {context}: {context: FloatingContext},
    ref: React.ForwardedRef<SVGSVGElement>,
) {
    const placement = context.placement;
    const style = placement.endsWith("top")
        ? {
              filter: `drop-shadow(0 4px 2px ${semanticColor.core.shadow.transparent.mid})`,
          }
        : undefined;
    return (
        <FloatingArrow
            ref={ref}
            context={context}
            fill={semanticColor.core.background.base.default}
            stroke={semanticColor.core.border.neutral.subtle}
            strokeWidth={1}
            width={ARROW_SIZE_INLINE}
            height={ARROW_SIZE_BLOCK}
            style={style}
        />
    );
});

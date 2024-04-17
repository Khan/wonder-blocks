import * as React from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import type {State as PopperState} from "@popperjs/core";
import type {CSSProperties} from "aphrodite";

export type getRefFn = (
    arg1?: React.Component<any> | Element | null | undefined,
) => void;

export type Offset = {
    bottom: CSSProperties["bottom"];
    top: CSSProperties["top"];
    left: CSSProperties["left"];
    right: CSSProperties["right"];
    transform: CSSProperties["transform"];
};

export type Placement =
    | "auto"
    | "auto-start"
    | "auto-end"
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "right"
    | "right-start"
    | "right-end"
    | "left"
    | "left-start"
    | "left-end";

/**
 * Subset of CSS properties to allow overriding some of the default styles
 */
export type ContentStyle = {
    color?: CSSProperties["color"];
    padding?: CSSProperties["padding"];
};

export type PopperUpdateFn = () => Promise<null | Partial<PopperState>>;

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
    /** A callback to update the popper. */
    update?: PopperUpdateFn;
};

import * as React from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import type {CSSProperties} from "aphrodite";
import {FloatingContext} from "@floating-ui/react";

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

export type Placement = "top" | "bottom" | "right" | "left";

/**
 * Subset of CSS properties to allow overriding some of the default styles
 */
export type ContentStyle = {
    color?: CSSProperties["color"];
    padding?: CSSProperties["padding"];
};

export type PopperUpdateFn = () => Promise<void>;

export type PopperElementProps = {
    floatingStyles?: any;
    /** The placement of the bubble with respect to the anchor. */
    placement: Placement;
    /** Whether the bubble is out of bounds or not. */
    isReferenceHidden?: boolean | null | undefined;
    /** A callback for updating the ref of the bubble itself. */
    updateBubbleRef?: getRefFn;
    /** A callback for updating the ref of the bubble's tail. */
    updateTailRef?: React.RefObject<SVGSVGElement | null>;
    /** Where the tail is to be rendered. */
    tailOffset?: Offset;
    /** Additional styles to be applied by the bubble. */
    style?: StyleType;
    context?: FloatingContext;
};

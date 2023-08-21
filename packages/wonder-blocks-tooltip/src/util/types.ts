import * as React from "react";

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

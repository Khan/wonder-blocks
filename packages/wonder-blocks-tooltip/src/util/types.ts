import * as React from "react";

export type getRefFn = (
    arg1?: React.Component<any> | Element | null | undefined,
) => void;

export type Offset = {
    bottom: string | null | undefined;
    top: string | null | undefined;
    left: string | null | undefined;
    right: string | null | undefined;
    transform: string | null | undefined;
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

// @flow
import * as React from "react";

export type getRefFn = (?(React.Component<any> | Element)) => void;

export type Offset = {|
    bottom: ?string,
    top: ?string,
    left: ?string,
    right: ?string,
    transform: ?string,
|};

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

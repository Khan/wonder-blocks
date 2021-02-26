// @flow
import * as React from "react";

export type getRefFn = (?(React.Component<any> | Element)) => void;

export type Offset = {|
    top: number,
    left: number,
|};

export type Placement = "top" | "right" | "bottom" | "left";

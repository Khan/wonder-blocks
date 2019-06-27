// @flow
import * as React from "react";

import type {Placement} from "@khanacademy/wonder-blocks-tooltip";

type ContextType = {|
    close?: () => mixed,
    placement?: Placement,
|};

const defaultContext: ContextType = {
    close: undefined,
    placement: "top",
};

export default React.createContext<ContextType>(defaultContext);

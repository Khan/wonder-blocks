// @flow
import * as React from "react";

import type {Placement} from "@khanacademy/wonder-blocks-tooltip";

type ContextType = {|
    close?: () => mixed,
    /**
     * Facilitates passing this value from Popover (via TooltipPopper) down to
     * PopoverContent. This is needed here to reposition the illustration to the
     * start or the end of the content, in case the popper changes its
     * placement.
     */
    placement?: Placement,
|};

const defaultContext: ContextType = {
    close: undefined,
    placement: "top",
};

export default React.createContext<ContextType>(defaultContext);

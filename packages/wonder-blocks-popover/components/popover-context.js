// @flow
import * as React from "react";

import type {Placement} from "@khanacademy/wonder-blocks-tooltip";

export type PopoverContextType = {|
    /**
     * Facilitates passing the `onClose` handler from the Popover down to its
     * children.
     */
    close?: () => mixed,
    /**
     * Facilitates passing this value from Popover (via TooltipPopper) down to
     * PopoverContent. This is needed here to reposition the illustration to the
     * start or the end of the content, in case the popper changes its
     * placement.
     */
    placement?: Placement,
|};

const defaultContext: PopoverContextType = {
    close: undefined,
    placement: "top",
};

/**
 * This context is being used for two reasons:
 *
 * 1. Pass down the `close` method from the `Popover` component to its children
 *    (`PopoverContent` and `CloseButton`). This way, these components can use
 *    this handler internally.
 *
 * 2. Keeps a reference of the TooltipPopper's `placement` value. It can be one
 *    of the following values: "top", "bottom", "left" or "right".
 */
export default React.createContext<PopoverContextType>(defaultContext);

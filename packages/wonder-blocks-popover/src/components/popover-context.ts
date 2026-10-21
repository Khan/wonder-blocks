import * as React from "react";

import type {Placement} from "../util/types";

export type PopoverContextType = {
    /**
     * Facilitates passing the `onClose` handler from the Popover down to its
     * children.
     */
    close?: () => unknown;
    /**
     * Facilitates passing this value from Popover (via the Floating component)
     * down to PopoverContent. This is needed here to reposition the
     * illustration to the start or the end of the content, in case the floating
     * element changes its placement.
     */
    placement?: Placement;
    /**
     * The accessible name of the popover dialog (either an `aria-label`, or
     * the id of the element that labels it). This is used to name the
     * scrollable area of the popover content, so screen readers can announce
     * it when it receives focus.
     */
    "aria-label"?: string;
    "aria-labelledby"?: string;
};

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
 *
 * 3. Passes down the accessible name of the popover dialog, so
 *    `PopoverContentCore` can name its scrollable area.
 */
const PopoverContext = React.createContext<PopoverContextType>(
    defaultContext,
) as React.Context<PopoverContextType>;
PopoverContext.displayName = "PopoverContext";

export default PopoverContext;

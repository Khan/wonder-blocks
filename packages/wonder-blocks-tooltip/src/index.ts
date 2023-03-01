import type {Placement} from "./util/types";
import type {PopperElementProps} from "./components/tooltip-bubble";

import Tooltip from "./components/tooltip";
import TooltipContent from "./components/tooltip-content";
import TooltipPopper from "./components/tooltip-popper";
import TooltipTail from "./components/tooltip-tail";

export {Tooltip as default, TooltipContent, TooltipPopper, TooltipTail};

export type {Placement, PopperElementProps};

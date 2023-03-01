import * as React from "react";
import type {ClickableState} from "@khanacademy/wonder-blocks-clickable";

import ActionItem from "../components/action-item";
import OptionItem from "../components/option-item";
import SeparatorItem from "../components/separator-item";

//TODO: rename into something more descriptive
export type Item =
    | false
    | React.ReactElement<
          React.ComponentProps<
              typeof ActionItem | typeof OptionItem | typeof SeparatorItem
          >
      >;

export type DropdownItem = {
    component: React.ReactElement<
        React.ComponentProps<
            typeof ActionItem | typeof OptionItem | typeof SeparatorItem
        >
    >;
    focusable: boolean;
    populatedProps: any;
    // extra props used by DropdownCore
    onClick?: () => unknown;
    ref?: any;
    role?: string;
};

// Custom opener arguments
export type OpenerProps = ClickableState & {
    text: string;
};

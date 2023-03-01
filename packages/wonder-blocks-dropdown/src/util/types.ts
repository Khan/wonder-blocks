import * as React from "react";
import type {ClickableState} from "@khanacademy/wonder-blocks-clickable";

import ActionItem from "../components/action-item";
import OptionItem from "../components/option-item";
import SeparatorItem from "../components/separator-item";

//TODO: rename into something more descriptive
// @ts-expect-error [FEI-5019] - TS2344 - Type 'ActionItem | OptionItem | SeparatorItem' does not satisfy the constraint 'keyof IntrinsicElements | JSXElementConstructor<any>'.
export type Item =
    | false
    | React.ReactElement<
          React.ComponentProps<ActionItem | OptionItem | SeparatorItem>
      >;

export type DropdownItem = {
    // @ts-expect-error [FEI-5019] - TS2344 - Type 'ActionItem | OptionItem | SeparatorItem' does not satisfy the constraint 'keyof IntrinsicElements | JSXElementConstructor<any>'.
    component: React.ReactElement<
        React.ComponentProps<ActionItem | OptionItem | SeparatorItem>
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

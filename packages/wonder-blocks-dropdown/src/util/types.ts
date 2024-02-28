import * as React from "react";
import type {ClickableState} from "@khanacademy/wonder-blocks-clickable";

import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import {PropsFor} from "@khanacademy/wonder-blocks-core";
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

/**
 * Used to extend the option items with some of the DetailCell props.
 */
export type CellProps = PropsFor<typeof DetailCell>;

/**
 * The allowed types for the label of an option item.
 */
export type OptionLabel = string | CellProps["title"];

// Custom opener arguments
export type OpenerProps = ClickableState & {
    text: OptionLabel;
    opened: boolean;
};

export type OptionItemComponentArray = React.ReactElement<
    React.ComponentProps<typeof OptionItem>
>[];

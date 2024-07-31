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

export type OptionItemComponent = React.ReactElement<
    PropsFor<typeof OptionItem>
>;

export type OptionItemComponentArray = OptionItemComponent[];

/**
 * Allows optional values to be passed to the listbox.
 */
export type MaybeString = string | null | undefined;

export type MaybeValueOrValues = MaybeString | Array<MaybeString>;

/**
 * The labels for the combobox component.
 */
export type ComboboxLabels = {
    /**
     * Label for when the listbox changes to the closed state.
     */
    closedState: string;
    /**
     * Label for the button that toggles the listbox.
     */
    comboboxButton: string;
    /**
     * Descriptive label for the listbox element.
     */
    listbox: string;
    /**
     * Label for the "Remove" item button (pill).
     */
    removeSelected: (label: string) => string;
    /**
     * Label for when the user visually focuses on a specific item in the
     * combobox.
     */
    liveRegionCurrentItem: (options: {
        current: string;
        index: number;
        total: number;
        disabled?: boolean;
        focused?: boolean;
        selected?: boolean;
    }) => string;
    /**
     * Label for when the user visually focuses on multi-select mode (selected
     * pills group). This is used to announce the total number of selected
     * items.
     */
    liveRegionMultipleSelectionTotal: (total: number) => string;
    /**
     * Label for the total number of items in the listbox.
     */
    liveRegionListboxTotal: (total: number) => string;

    /**
     * Label for when there are no items associated with the combobox input
     * value.
     */
    noItems: string;

    /**
     * Label for the selected item(s) in the listbox.
     */
    selected: (labels: string) => string;

    /**
     * Label for when item(s) is/are unselected.
     */
    unselected: (labels: string) => string;
};

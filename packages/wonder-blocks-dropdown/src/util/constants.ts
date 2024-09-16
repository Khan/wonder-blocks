import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {ComboboxLabels} from "./types";

export const keyCodes = {
    tab: 9,
    enter: 13,
    escape: 27,
    space: 32,
    up: 38,
    down: 40,
} as const;

export const selectDropdownStyle = {
    marginTop: spacing.xSmall_8,
    marginBottom: spacing.xSmall_8,
} as const;

// Filterable dropdown has minimum dimensions requested from Design.
// Note that these can be overridden by the provided style if needed.
export const filterableDropdownStyle = {
    minHeight: 100,
} as const;

// The default item height
export const DROPDOWN_ITEM_HEIGHT = 40;

/**
 * Maximum visible items inside the dropdown list. Based on the defined height
 * that we're using, this is the maximum number of items that can fit into the
 * visible portion of the dropdown's listbox.
 */
export const MAX_VISIBLE_ITEMS = 9;

export const SEPARATOR_ITEM_HEIGHT = 9;

// The default labels that will be used by different components
export const defaultLabels = {
    clearSearch: "Clear search",
    filter: "Filter",
    noResults: "No results",
    selectNoneLabel: "Select none",
    selectAllLabel: (numOptions: number): string =>
        `Select all (${numOptions})`,
    noneSelected: "0 items",
    someSelected: (numSelectedValues: number): string =>
        numSelectedValues === 1 ? "1 item" : `${numSelectedValues} items`,
    allSelected: "All items",
} as const;

export const defaultComboboxLabels: ComboboxLabels = {
    clearSelection: "Clear selection",
    closedState: "Combobox is closed",
    comboboxButton: "Toggle listbox",
    listbox: "Options list",
    removeSelected: (label: string) => `Remove ${label}`,
    // Live region labels
    liveRegionCurrentItem: ({
        current,
        index,
        total,
        disabled,
        focused,
        selected,
    }) =>
        `${current}${focused ? " focused" : ""}${disabled ? " disabled" : ""}${
            selected ? " selected" : ""
        }, ${index + 1} of ${total}.`,
    liveRegionMultipleSelectionTotal: (total) => `${total} selected options.`,
    liveRegionListboxTotal: (total) => `${total} results available.`,
    noItems: "No results",
    selected: (labels: string) => `${labels} selected`,
    unselected: (labels: string) => `${labels} not selected`,
};

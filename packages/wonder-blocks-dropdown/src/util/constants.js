//@flow
import Spacing from "@khanacademy/wonder-blocks-spacing";

export const keyCodes = {
    tab: 9,
    enter: 13,
    escape: 27,
    space: 32,
    up: 38,
    down: 40,
};

export const selectDropdownStyle = {
    marginTop: Spacing.xSmall_8,
    marginBottom: Spacing.xSmall_8,
};

// Filterable dropdown has minimum dimensions requested from Design.
// Note that these can be overridden by the provided style if needed.
export const filterableDropdownStyle = {
    minHeight: 100,
};

export const searchInputStyle = {
    margin: Spacing.xSmall_8,
    marginTop: Spacing.xxxSmall_4,
    // Set `minHeight` to "auto" to stop the search field from having
    // a height of 0 and being cut off.
    minHeight: "auto",
};

// The default item height
export const DROPDOWN_ITEM_HEIGHT = 40;

/**
 * Maximum visible items inside the dropdown list. Based on the defined height
 * that we're using, this is the maximum number of items that can fit into the
 * visible portion of the dropdown's listbox.
 */
export const MAX_VISIBLE_ITEMS = 9;

export const SEPARATOR_ITEM_HEIGHT = 9;

export const SEARCH_ITEM_HEIGHT: number =
    DROPDOWN_ITEM_HEIGHT + searchInputStyle.margin + searchInputStyle.marginTop;

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
        `${numSelectedValues} items`,
    allSelected: "All items",
};

import {defaultStringsEn} from "@khanacademy/wonder-blocks-config";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

import type {WonderBlocksStrings} from "@khanacademy/wonder-blocks-config";

import type {ComboboxLabels} from "./types";

export const selectDropdownStyle = {
    marginBlock: sizing.size_080,
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

/**
 * Builds the default labels used by SingleSelect, MultiSelect and DropdownCore
 * from the Wonder Blocks i18n strings.
 *
 * NOTE: The `labels` props keep their positional function args (e.g.
 * `someSelected(n)`), so they are adapted here to the object args used by the
 * strings (e.g. `someSelected({num})`).
 */
export const getDefaultLabels = (strings: WonderBlocksStrings) =>
    ({
        clearSearch: strings.iconAltClearSearch,
        filter: strings.filter,
        noResults: strings.noResults,
        selectNoneLabel: strings.selectNone,
        selectAllLabel: (numOptions: number): string =>
            strings.selectAll({num: numOptions}),
        noneSelected: strings.noneSelected,
        someSelected: (numSelectedValues: number): string =>
            strings.someSelected({num: numSelectedValues}),
        allSelected: strings.allSelected,
    }) as const;

/**
 * Builds the default labels used by Combobox from the Wonder Blocks i18n
 * strings.
 */
export const getDefaultComboboxLabels = (
    strings: WonderBlocksStrings,
): ComboboxLabels => ({
    clearSelection: strings.iconAltClearSelection,
    closedState: strings.srComboboxClosed,
    comboboxButton: strings.iconAltToggleListbox,
    listbox: strings.optionsList,
    removeSelected: (label: string) => strings.removeSelected({label}),
    // Live region labels
    liveRegionCurrentItem: ({
        current,
        index,
        total,
        disabled,
        focused,
        selected,
    }) => {
        // The states are separate strings so they can be translated without
        // needing a message for each combination of them.
        const states = [
            focused && strings.srItemFocused,
            disabled && strings.srItemDisabled,
            selected && strings.srItemSelected,
        ].filter(Boolean);

        return strings.srComboboxCurrentItem({
            current: [current, ...states].join(" "),
            // `index` is 0-based, but the announcement is 1-based. This is
            // done here since translated messages can't add 1 to it.
            index: index + 1,
            total,
        });
    },
    liveRegionMultipleSelectionTotal: (total) =>
        strings.srComboboxSelectedTotal({total}),
    liveRegionListboxTotal: (total) => strings.srComboboxResultsTotal({total}),
    noItems: strings.noResults,
    selected: (labels: string) => strings.srSelected({labels}),
    selectionCleared: strings.srSelectionCleared,
    unselected: (labels: string) => strings.srUnselected({labels}),
});

// The default English labels that will be used by different components
export const defaultLabels = getDefaultLabels(defaultStringsEn);

export const defaultComboboxLabels: ComboboxLabels =
    getDefaultComboboxLabels(defaultStringsEn);

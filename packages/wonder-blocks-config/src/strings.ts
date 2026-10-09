/**
 * The translated strings that are used to render Wonder Blocks.
 */
export type WonderBlocksStrings = {
    // Alt text for icons / icon buttons
    iconAltClearSearch: string;
    iconAltClearSelection: string;
    iconAltOpensNewTab: string;
    iconAltToggleListbox: string;

    // Labels
    allSelected: string;
    filter: string;
    noneSelected: string;
    noResults: string;
    optionsList: string;
    removeSelected: ({label}: {label: string}) => string;
    selectAll: ({num}: {num: number}) => string;
    selectNone: string;
    someSelected: ({num}: {num: number}) => string;

    // Screen reader announcements
    srComboboxClosed: string;
    srComboboxCurrentItem: ({
        current,
        index,
        total,
    }: {
        current: string;
        index: number;
        total: number;
    }) => string;
    srComboboxResultsTotal: ({total}: {total: number}) => string;
    srComboboxSelectedTotal: ({total}: {total: number}) => string;
    srItemDisabled: string;
    srItemFocused: string;
    srItemSelected: string;
    srSelected: ({labels}: {labels: string}) => string;
    srSelectionCleared: string;
    srUnselected: ({labels}: {labels: string}) => string;

    // Form validation
    requiredFieldMessage: string;
};

/**
 * Untranslated strings used in Wonder Blocks. To be used by an external
 * translator to produce translated strings, passed in as `WonderBlocksStrings`.
 *
 * !! Note: Ensure that all escape sequences are double-escaped. (e.g. `\\text` -> `\\\\text`)
 */
export const strings = {
    // Alt text for icons / icon buttons
    iconAltClearSearch: {
        context:
            "Accessible name for an icon button that clears the text in a search field.",
        message: "Clear search",
    },
    iconAltClearSelection: {
        context:
            "Accessible name for an icon button in a combobox that clears the selected option.",
        message: "Clear selection",
    },
    iconAltOpensNewTab: {
        context:
            "Accessible name for an icon marking a link that opens in a new tab.",
        message: "(opens in a new tab)",
    },
    iconAltToggleListbox: {
        context:
            "Accessible name for an icon button in a combobox that opens and closes the list of options.",
        message: "Toggle listbox",
    },

    // Labels
    allSelected: {
        context:
            "Text shown in a multi-select dropdown when all of its options are selected.",
        message: "All items",
    },
    filter: {
        context:
            "Placeholder for the search field used to filter the options in a dropdown.",
        message: "Filter",
    },
    noneSelected: {
        context:
            "Text shown in a multi-select dropdown when none of its options are selected.",
        message: "0 items",
    },
    noResults: {
        context:
            "Text shown in a dropdown or combobox when no options match the search text.",
        message: "No results",
    },
    optionsList: {
        context:
            "Accessible name for the list of options that opens from a combobox.",
        message: "Options list",
    },
    removeSelected: {
        context:
            "Accessible name for a button that removes a selected option from a multi-select combobox. %(label)s is the label of the option.",
        message: "Remove %(label)s",
    },
    selectAll: {
        context:
            "Label for the option in a multi-select dropdown that selects all of the options. %(num)s is the number of options.",
        message: "Select all (%(num)s)",
    },
    selectNone: {
        context:
            "Label for the option in a multi-select dropdown that deselects all of the options.",
        message: "Select none",
    },
    someSelected: {
        context:
            "Text shown in a multi-select dropdown when some of its options are selected, and announced to screen readers as the number of options that match the search text. %(num)s is the number of options.",
        one: "%(num)s item",
        other: "%(num)s items",
    },

    // Screen reader announcements
    srComboboxClosed: {
        context:
            "Screen reader announcement for when the list of options in a combobox closes.",
        message: "Combobox is closed",
    },
    srComboboxCurrentItem: {
        context:
            "Screen reader announcement for the option that is currently focused in a combobox. %(current)s is the option's label, which can be followed by its states (e.g. 'Apple focused selected'). %(index)s is the position of the option in the list, starting at 1, and %(total)s is the number of options.",
        message: "%(current)s, %(index)s of %(total)s.",
    },
    srComboboxResultsTotal: {
        context:
            "Screen reader announcement for the number of options available in a combobox.",
        one: "%(total)s result available.",
        other: "%(total)s results available.",
    },
    srComboboxSelectedTotal: {
        context:
            "Screen reader announcement for the number of options selected in a multi-select combobox.",
        one: "%(total)s selected option.",
        other: "%(total)s selected options.",
    },
    srItemDisabled: {
        context:
            "Screen reader text announced after an option's label when the option is disabled (e.g. 'Apple disabled').",
        message: "disabled",
    },
    srItemFocused: {
        context:
            "Screen reader text announced after an option's label when the option is focused (e.g. 'Apple focused').",
        message: "focused",
    },
    srItemSelected: {
        context:
            "Screen reader text announced after an option's label when the option is selected (e.g. 'Apple selected').",
        message: "selected",
    },
    srSelected: {
        context:
            "Screen reader announcement for when options are selected in a combobox. %(labels)s is a list of the selected options' labels.",
        message: "%(labels)s selected",
    },
    srSelectionCleared: {
        context:
            "Screen reader announcement for when the selected option in a combobox is cleared.",
        message: "Selection cleared",
    },
    srUnselected: {
        context:
            "Screen reader announcement for when options are deselected in a multi-select combobox. %(labels)s is a list of the labels of the options that are still selected.",
        message: "%(labels)s not selected",
    },

    // Form validation
    requiredFieldMessage: {
        context:
            "Error message shown when a required form field is left empty.",
        message: "This field is required.",
    },
} satisfies {
    [Key in keyof WonderBlocksStrings]:
        | string
        | {context?: string; message: string}
        | {context?: string; one: string; other: string};
};

/**
 * Default 'en' strings to use.
 */
export const defaultStringsEn: WonderBlocksStrings = {
    // Alt text for icons / icon buttons
    iconAltClearSearch: strings.iconAltClearSearch.message,
    iconAltClearSelection: strings.iconAltClearSelection.message,
    iconAltOpensNewTab: strings.iconAltOpensNewTab.message,
    iconAltToggleListbox: strings.iconAltToggleListbox.message,

    // Labels
    allSelected: strings.allSelected.message,
    filter: strings.filter.message,
    noneSelected: strings.noneSelected.message,
    noResults: strings.noResults.message,
    optionsList: strings.optionsList.message,
    removeSelected: ({label}) => `Remove ${label}`,
    selectAll: ({num}) => `Select all (${num})`,
    selectNone: strings.selectNone.message,
    someSelected: ({num}) => (num === 1 ? `${num} item` : `${num} items`),

    // Screen reader announcements
    srComboboxClosed: strings.srComboboxClosed.message,
    srComboboxCurrentItem: ({current, index, total}) =>
        `${current}, ${index} of ${total}.`,
    srComboboxResultsTotal: ({total}) =>
        total === 1
            ? `${total} result available.`
            : `${total} results available.`,
    srComboboxSelectedTotal: ({total}) =>
        total === 1
            ? `${total} selected option.`
            : `${total} selected options.`,
    srItemDisabled: strings.srItemDisabled.message,
    srItemFocused: strings.srItemFocused.message,
    srItemSelected: strings.srItemSelected.message,
    srSelected: ({labels}) => `${labels} selected`,
    srSelectionCleared: strings.srSelectionCleared.message,
    srUnselected: ({labels}) => `${labels} not selected`,

    // Form validation
    requiredFieldMessage: strings.requiredFieldMessage.message,
};

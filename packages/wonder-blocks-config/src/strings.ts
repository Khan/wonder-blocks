/**
 * The translated strings that are used to render Wonder Blocks.
 */
export type WonderBlocksStrings = {
    // Alt text for icons / icon buttons
    iconAltClearSearch: string;
    iconAltClearSelection: string;
    iconAltErrorMessagePrefix: string;
    iconAltOpensNewTab: string;
    iconAltToggleListbox: string;

    // Labels
    breadcrumbs: string;
    optionsList: string;
    tabs: string;

    // Selection
    allItems: string;
    numItems: ({num}: {num: number}) => string;
    zeroItems: string;
    selectAllWithCount: ({num}: {num: number}) => string;
    selectNone: string;
    removeSelected: ({label}: {label: string}) => string;
    filter: string;
    noResults: string;

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
    iconAltErrorMessagePrefix: {
        context:
            "Accessible name for an error icon shown before the error message for a form field. Screen readers read it as a prefix to the error message (e.g. 'Error: This field is required.'), so use the punctuation that normally separates a label from the text that follows in this language.",
        message: "Error:",
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
    breadcrumbs: {
        context:
            "Accessible name for the navigation landmark containing breadcrumb links.",
        message: "Breadcrumbs",
    },
    optionsList: {
        context:
            "Accessible name for the list of options that opens from a combobox.",
        message: "Options list",
    },
    tabs: {
        context:
            "Label for the menu of tabs when no tab is selected, shown when the tabs are collapsed into a dropdown.",
        message: "Tabs",
    },

    // Selection
    allItems: {
        context:
            "Text shown when all options are selected. For example, in a multi-select.",
        message: "All items",
    },
    numItems: {
        context:
            "Text shown when a number of items are selected. %(num)s is the number of options.",
        one: "%(num)s item",
        other: "%(num)s items",
    },
    zeroItems: {
        context:
            "Text shown when zero items are selected. For example, in a multi-select.",
        message: "0 items",
    },
    selectAllWithCount: {
        context:
            "Label for an option that selects all options. %(num)s is the number of options.",
        message: "Select all (%(num)s)",
    },
    selectNone: {
        context: "Label for the option to deselect all of the options.",
        message: "Select none",
    },
    removeSelected: {
        context:
            "Accessible name for a button that removes a selected option from a multi-select combobox. %(label)s is the label of the option.",
        message: "Remove %(label)s",
    },
    filter: {
        context: "Placeholder for a field used to filter items.",
        message: "Filter",
    },
    noResults: {
        context:
            "Text shown when there are no results. For example, when no results match a filter.",
        message: "No results",
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
    iconAltErrorMessagePrefix: strings.iconAltErrorMessagePrefix.message,
    iconAltOpensNewTab: strings.iconAltOpensNewTab.message,
    iconAltToggleListbox: strings.iconAltToggleListbox.message,

    // Labels
    breadcrumbs: strings.breadcrumbs.message,
    optionsList: strings.optionsList.message,
    tabs: strings.tabs.message,

    // Selection
    allItems: strings.allItems.message,
    numItems: ({num}) => (num === 1 ? `${num} item` : `${num} items`),
    zeroItems: strings.zeroItems.message,
    selectAllWithCount: ({num}) => `Select all (${num})`,
    selectNone: strings.selectNone.message,
    removeSelected: ({label}) => `Remove ${label}`,
    filter: strings.filter.message,
    noResults: strings.noResults.message,

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

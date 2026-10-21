/**
 * The translated strings that are used to render Wonder Blocks.
 */
export type WonderBlocksStrings = {
    // `num` is a special variable name that is used to determine the plurality
    // of the translated string.

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
    removeOption: ({label}: {label: string}) => string;
    filter: string;
    noResults: string;

    // Screen reader announcements
    srComboboxClosed: string;
    srCurrentItemDetails: ({
        current,
        index,
        total,
    }: {
        current: string;
        index: number;
        total: number;
    }) => string;
    srNumSelectedOptions: ({num}: {num: number}) => string;
    srFocused: string;
    srItemsSelected: ({labels}: {labels: string}) => string;
    srSelectionCleared: string;
    srItemsNotSelected: ({labels}: {labels: string}) => string;

    // Form validation
    requiredFieldMessage: string;
};

/**
 * Untranslated strings used in Wonder Blocks. To be used by an external
 * translator to produce translated strings, passed in as `WonderBlocksStrings`.
 *
 * `num` is a special variable name that is used to determine the plurality
 * of the translated string.
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
            "Accessible name for an icon button that clears the current selection.",
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
            "Accessible name for an icon button that opens and closes a listbox (a list of options).",
        message: "Toggle listbox",
    },

    // Labels
    breadcrumbs: {
        context:
            "Accessible name for the navigation landmark containing breadcrumb links.",
        message: "Breadcrumbs",
    },
    optionsList: {
        context: "Accessible name for a list of options.",
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
    removeOption: {
        context:
            "Accessible name for a button that removes a selected option. %(label)s is the label of the option.",
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
        context: "Screen reader announcement for when a combobox closes.",
        message: "Combobox is closed",
    },
    srCurrentItemDetails: {
        context:
            "Screen reader announcement for the currently focused item in a list. %(current)s is the item's label, which can be followed by its focused state (e.g. 'Apple focused'). %(index)s is the position of the item in the list, starting at 1, and %(total)s is the number of items.",
        message: "%(current)s, %(index)s of %(total)s.",
    },
    srNumSelectedOptions: {
        context:
            "Screen reader announcement for the number of options that are selected. %(num)s is the number of selected options.",
        one: "%(num)s selected option.",
        other: "%(num)s selected options.",
    },
    srFocused: {
        context:
            "Screen reader text announced after an option's label when the option is focused (e.g. 'Apple focused').",
        message: "focused",
    },
    srItemsSelected: {
        context:
            "Screen reader announcement for when options are selected. %(labels)s is a list of the selected options' labels.",
        message: "%(labels)s selected",
    },
    srSelectionCleared: {
        context:
            "Screen reader announcement for when the selected option is cleared.",
        message: "Selection cleared",
    },
    srItemsNotSelected: {
        context:
            "Screen reader announcement for when options are deselected. %(labels)s is a list of the labels of the options that are still selected.",
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
    removeOption: ({label}) => `Remove ${label}`,
    filter: strings.filter.message,
    noResults: strings.noResults.message,

    // Screen reader announcements
    srComboboxClosed: strings.srComboboxClosed.message,
    srCurrentItemDetails: ({current, index, total}) =>
        `${current}, ${index} of ${total}.`,
    srNumSelectedOptions: ({num}) =>
        num === 1 ? `${num} selected option.` : `${num} selected options.`,
    srFocused: strings.srFocused.message,
    srItemsSelected: ({labels}) => `${labels} selected`,
    srSelectionCleared: strings.srSelectionCleared.message,
    srItemsNotSelected: ({labels}) => `${labels} not selected`,

    // Form validation
    requiredFieldMessage: strings.requiredFieldMessage.message,
};

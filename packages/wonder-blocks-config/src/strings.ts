/**
 * The translated strings that are used to render Wonder Blocks.
 */
export type WonderBlocksStrings = {
    // Alt text for icons / icon buttons
    iconAltClearSearch: string;
    iconAltErrorMessagePrefix: string;
    iconAltOpensNewTab: string;

    // Labels
    breadcrumbs: string;
    filter: string;
    noResults: string;
    selectAllWithCount: ({num}: {num: number}) => string;
    selectNone: string;
    tabs: string;

    // Selection
    allItems: string;
    numItems: ({num}: {num: number}) => string;
    zeroItems: string;

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

    // Labels
    breadcrumbs: {
        context:
            "Accessible name for the navigation landmark containing breadcrumb links.",
        message: "Breadcrumbs",
    },
    filter: {
        context:
            "Placeholder for the search field used to filter the options in a dropdown.",
        message: "Filter",
    },
    noResults: {
        context:
            "Text shown in a dropdown or combobox when no options match the search text.",
        message: "No results",
    },
    selectAllWithCount: {
        context:
            "Label for the option in a multi-select dropdown that selects all of the options. %(num)s is the number of options.",
        message: "Select all (%(num)s)",
    },
    selectNone: {
        context:
            "Label for the option in a multi-select dropdown that deselects all of the options.",
        message: "Select none",
    },
    tabs: {
        context:
            "Label for the menu of tabs when no tab is selected, shown when the tabs are collapsed into a dropdown.",
        message: "Tabs",
    },

    // Selection
    allItems: {
        context:
            "Text shown in a multi-select dropdown when all of its options are selected.",
        message: "All items",
    },
    numItems: {
        context:
            "Text shown in a multi-select dropdown when some of its options are selected, and announced to screen readers as the number of options that match the search text. %(num)s is the number of options.",
        one: "%(num)s item",
        other: "%(num)s items",
    },
    zeroItems: {
        context:
            "Text shown in a multi-select dropdown when none of its options are selected.",
        message: "0 items",
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
    iconAltErrorMessagePrefix: strings.iconAltErrorMessagePrefix.message,
    iconAltOpensNewTab: strings.iconAltOpensNewTab.message,

    // Labels
    breadcrumbs: strings.breadcrumbs.message,
    filter: strings.filter.message,
    noResults: strings.noResults.message,
    selectAllWithCount: ({num}) => `Select all (${num})`,
    selectNone: strings.selectNone.message,
    tabs: strings.tabs.message,

    // Selection
    allItems: strings.allItems.message,
    numItems: ({num}) => (num === 1 ? `${num} item` : `${num} items`),
    zeroItems: strings.zeroItems.message,

    // Form validation
    requiredFieldMessage: strings.requiredFieldMessage.message,
};

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
    tabs: string;

    // Selection
    allItems: string;
    filter: string;
    noResults: string;
    numItems: ({num}: {num: number}) => string;
    selectAllWithCount: ({num}: {num: number}) => string;
    selectNone: string;
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
    filter: {
        context: "Placeholder for a field used to filter items.",
        message: "Filter",
    },
    noResults: {
        context:
            "Text shown when there are no results. For example, when no results match a filter.",
        message: "No results",
    },
    numItems: {
        context:
            "Text shown when a number of items are selected. %(num)s is the number of options.",
        one: "%(num)s item",
        other: "%(num)s items",
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
    zeroItems: {
        context:
            "Text shown when zero items are selected. For example, in a multi-select.",
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
    tabs: strings.tabs.message,

    // Selection
    allItems: strings.allItems.message,
    filter: strings.filter.message,
    noResults: strings.noResults.message,
    numItems: ({num}) => (num === 1 ? `${num} item` : `${num} items`),
    selectAllWithCount: ({num}) => `Select all (${num})`,
    selectNone: strings.selectNone.message,
    zeroItems: strings.zeroItems.message,

    // Form validation
    requiredFieldMessage: strings.requiredFieldMessage.message,
};

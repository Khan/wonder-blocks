/**
 * The translated strings that are used to render Wonder Blocks.
 */
export type WonderBlocksStrings = {
    // `num` is a special variable name that is used to determine the plurality
    // of the translated string.

    // Alt text for icons / icon buttons
    iconAltClearSearch: string;
    iconAltClose: string;
    iconAltCloseModal: string;
    iconAltClosePopover: string;
    iconAltDismissBanner: string;
    iconAltErrorMessagePrefix: string;
    iconAltOpensNewTab: string;
    iconAltStatusCritical: string;
    iconAltStatusInfo: string;
    iconAltStatusSuccess: string;
    iconAltStatusWarning: string;
    iconAltToggleCalendar: string;

    // Labels
    breadcrumbs: string;
    datePickerCalendar: string;
    tabs: string;

    // Selection
    allItems: string;
    numItems: ({num}: {num: number}) => string;
    zeroItems: string;
    selectAllWithCount: ({num}: {num: number}) => string;
    selectNone: string;
    filter: string;
    noResults: string;

    // Form field labels
    fieldLabelDay: string;
    fieldLabelMonth: string;
    fieldLabelYear: string;

    // Form validation
    birthdateErrorMessage: string;
    requiredFieldMessage: string;
};

/**
 * Untranslated strings used in Wonder Blocks. To be used by an external
 * translator to produce translated strings, passed in as `WonderBlocksStrings`.
 *
 * !! Note: Ensure that all escape sequences are double-escaped. (e.g. `\\text` -> `\\\\text`)
 */
export const strings = {
    // `num` is a special variable name that is used to determine the plurality
    // of the translated string.

    // Alt text for icons / icon buttons
    iconAltClearSearch: {
        context:
            "Accessible name for an icon button that clears the text in a search field.",
        message: "Clear search",
    },
    iconAltClose: {
        context:
            "Accessible name for an icon button that dismisses a piece of content, such as a card.",
        message: "Close",
    },
    iconAltCloseModal: {
        context: "Accessible name for an icon button that closes a modal.",
        message: "Close modal",
    },
    iconAltClosePopover: {
        context: "Accessible name for an icon button that closes a popover.",
        message: "Close Popover",
    },
    iconAltDismissBanner: {
        context: "Accessible name for an icon button that dismisses a banner.",
        message: "Dismiss banner",
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
    iconAltStatusCritical: {
        context:
            "Accessible name for an icon indicating a critical status, such as in a banner.",
        message: "Critical",
    },
    iconAltStatusInfo: {
        context:
            "Accessible name for an icon indicating an informational status, such as in a banner.",
        message: "Info",
    },
    iconAltStatusSuccess: {
        context:
            "Accessible name for an icon indicating a success status, such as in a banner.",
        message: "Success",
    },
    iconAltStatusWarning: {
        context:
            "Accessible name for an icon indicating a warning status, such as in a banner.",
        message: "Warning",
    },
    iconAltToggleCalendar: {
        context:
            "Accessible name for an icon button in a date picker that opens and closes the calendar.",
        message: "Toggle calendar",
    },

    // Labels
    breadcrumbs: {
        context:
            "Accessible name for the navigation landmark containing breadcrumb links.",
        message: "Breadcrumbs",
    },
    datePickerCalendar: {
        context:
            "Accessible name for the region containing the calendar in a date picker.",
        message: "Date picker calendar",
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
    filter: {
        context: "Placeholder for a field used to filter items.",
        message: "Filter",
    },
    noResults: {
        context:
            "Text shown when there are no results. For example, when no results match a filter.",
        message: "No results",
    },

    // Form field labels
    fieldLabelDay: {
        context:
            "Label and placeholder for a form field to select the day of a date, such as a birthdate.",
        message: "Day",
    },
    fieldLabelMonth: {
        context:
            "Label and placeholder for a form field to select the month of a date, such as a birthdate.",
        message: "Month",
    },
    fieldLabelYear: {
        context:
            "Label and placeholder for a form field to select the year of a date, such as a birthdate.",
        message: "Year",
    },

    // Form validation
    birthdateErrorMessage: {
        context: "Error message shown when the selected birthdate is invalid.",
        message: "Please select a valid birthdate.",
    },
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
    iconAltClose: strings.iconAltClose.message,
    iconAltCloseModal: strings.iconAltCloseModal.message,
    iconAltClosePopover: strings.iconAltClosePopover.message,
    iconAltDismissBanner: strings.iconAltDismissBanner.message,
    iconAltErrorMessagePrefix: strings.iconAltErrorMessagePrefix.message,
    iconAltOpensNewTab: strings.iconAltOpensNewTab.message,
    iconAltStatusCritical: strings.iconAltStatusCritical.message,
    iconAltStatusInfo: strings.iconAltStatusInfo.message,
    iconAltStatusSuccess: strings.iconAltStatusSuccess.message,
    iconAltStatusWarning: strings.iconAltStatusWarning.message,
    iconAltToggleCalendar: strings.iconAltToggleCalendar.message,

    // Labels
    breadcrumbs: strings.breadcrumbs.message,
    datePickerCalendar: strings.datePickerCalendar.message,
    tabs: strings.tabs.message,

    // Selection
    allItems: strings.allItems.message,
    numItems: ({num}) => (num === 1 ? `${num} item` : `${num} items`),
    zeroItems: strings.zeroItems.message,
    selectAllWithCount: ({num}) => `Select all (${num})`,
    selectNone: strings.selectNone.message,
    filter: strings.filter.message,
    noResults: strings.noResults.message,

    // Form field labels
    fieldLabelDay: strings.fieldLabelDay.message,
    fieldLabelMonth: strings.fieldLabelMonth.message,
    fieldLabelYear: strings.fieldLabelYear.message,

    // Form validation
    birthdateErrorMessage: strings.birthdateErrorMessage.message,
    requiredFieldMessage: strings.requiredFieldMessage.message,
};

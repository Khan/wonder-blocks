/**
 * The translated strings that are used to render Wonder Blocks.
 */
export type WonderBlocksStrings = {
    // Alt text for icons / icon buttons
    iconAltClearSearch: string;
    iconAltClose: string;
    iconAltCloseModal: string;
    iconAltClosePopover: string;
    iconAltCritical: string;
    iconAltDismissBanner: string;
    iconAltErrorMessagePrefix: string;
    iconAltInfo: string;
    iconAltOpensNewTab: string;
    iconAltSuccess: string;
    iconAltToggleCalendar: string;
    iconAltWarning: string;

    // Labels
    breadcrumbs: string;
    datePickerCalendar: string;
    tabs: string;

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
    iconAltCritical: {
        context:
            "Accessible name for an icon indicating a critical status, such as in a banner.",
        message: "Critical",
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
    iconAltInfo: {
        context:
            "Accessible name for an icon indicating an informational status, such as in a banner.",
        message: "Info",
    },
    iconAltOpensNewTab: {
        context:
            "Accessible name for an icon marking a link that opens in a new tab.",
        message: "(opens in a new tab)",
    },
    iconAltSuccess: {
        context:
            "Accessible name for an icon indicating a success status, such as in a banner.",
        message: "Success",
    },
    iconAltToggleCalendar: {
        context:
            "Accessible name for an icon button in a date picker that opens and closes the calendar.",
        message: "Toggle calendar",
    },
    iconAltWarning: {
        context:
            "Accessible name for an icon indicating a warning status, such as in a banner.",
        message: "Warning",
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
    iconAltCritical: strings.iconAltCritical.message,
    iconAltDismissBanner: strings.iconAltDismissBanner.message,
    iconAltErrorMessagePrefix: strings.iconAltErrorMessagePrefix.message,
    iconAltInfo: strings.iconAltInfo.message,
    iconAltOpensNewTab: strings.iconAltOpensNewTab.message,
    iconAltSuccess: strings.iconAltSuccess.message,
    iconAltToggleCalendar: strings.iconAltToggleCalendar.message,
    iconAltWarning: strings.iconAltWarning.message,

    // Labels
    breadcrumbs: strings.breadcrumbs.message,
    datePickerCalendar: strings.datePickerCalendar.message,
    tabs: strings.tabs.message,

    // Form field labels
    fieldLabelDay: strings.fieldLabelDay.message,
    fieldLabelMonth: strings.fieldLabelMonth.message,
    fieldLabelYear: strings.fieldLabelYear.message,

    // Form validation
    birthdateErrorMessage: strings.birthdateErrorMessage.message,
    requiredFieldMessage: strings.requiredFieldMessage.message,
};

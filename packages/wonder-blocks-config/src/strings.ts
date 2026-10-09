/**
 * The translated strings that are used to render Wonder Blocks.
 */
export type WonderBlocksStrings = {
    // Alt text for icons / icon buttons
    iconAltOpensNewTab: string;
    iconAltToggleCalendar: string;

    // Labels
    datePickerCalendar: string;

    // Form field labels
    fieldLabelDay: string;
    fieldLabelMonth: string;
    fieldLabelYear: string;

    // Form validation
    birthdateErrorMessage: string;
};

/**
 * Untranslated strings used in Wonder Blocks. To be used by an external
 * translator to produce translated strings, passed in as `WonderBlocksStrings`.
 *
 * !! Note: Ensure that all escape sequences are double-escaped. (e.g. `\\text` -> `\\\\text`)
 */
export const strings = {
    // Alt text for icons / icon buttons
    iconAltOpensNewTab: {
        context:
            "Accessible name for an icon marking a link that opens in a new tab.",
        message: "(opens in a new tab)",
    },
    iconAltToggleCalendar: {
        context:
            "Accessible name for an icon button in a date picker that opens and closes the calendar.",
        message: "Toggle calendar",
    },

    // Labels
    datePickerCalendar: {
        context:
            "Accessible name for the region containing the calendar in a date picker.",
        message: "Date picker calendar",
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
    iconAltOpensNewTab: strings.iconAltOpensNewTab.message,
    iconAltToggleCalendar: strings.iconAltToggleCalendar.message,

    // Labels
    datePickerCalendar: strings.datePickerCalendar.message,

    // Form field labels
    fieldLabelDay: strings.fieldLabelDay.message,
    fieldLabelMonth: strings.fieldLabelMonth.message,
    fieldLabelYear: strings.fieldLabelYear.message,

    // Form validation
    birthdateErrorMessage: strings.birthdateErrorMessage.message,
};

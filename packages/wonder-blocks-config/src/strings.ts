/**
 * The translated strings that are used to render Wonder Blocks.
 */
export type WonderBlocksStrings = {
    // `num` is a special variable name that is used to determine the plurality
    // of the translated string.

    // Alt text for icons / icon buttons
    iconAltClearSearch: string;
    iconAltClearSelection: string;
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
    iconAltToggleListbox: string;

    // Labels
    breadcrumbs: string;
    datePickerCalendar: string;
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
    srNumResultsAvailable: ({num}: {num: number}) => string;
    srNumSelectedOptions: ({num}: {num: number}) => string;
    srDisabled: string;
    srFocused: string;
    srSelected: string;
    srItemsSelected: ({labels}: {labels: string}) => string;
    srSelectionCleared: string;
    srItemsNotSelected: ({labels}: {labels: string}) => string;

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
    datePickerCalendar: {
        context:
            "Accessible name for the region containing the calendar in a date picker.",
        message: "Date picker calendar",
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
            "Screen reader announcement for the currently focused item in a list. %(current)s is the item's label, which can be followed by its states (e.g. 'Apple focused selected'). %(index)s is the position of the item in the list, starting at 1, and %(total)s is the number of items.",
        message: "%(current)s, %(index)s of %(total)s.",
    },
    srNumResultsAvailable: {
        context:
            "Screen reader announcement for the number of results available. %(num)s is the number of results. For example, the number of options that match a search.",
        one: "%(num)s result available.",
        other: "%(num)s results available.",
    },
    srNumSelectedOptions: {
        context:
            "Screen reader announcement for the number of options that are selected. %(num)s is the number of selected options.",
        one: "%(num)s selected option.",
        other: "%(num)s selected options.",
    },
    srDisabled: {
        context:
            "Screen reader text announced after an option's label when the option is disabled (e.g. 'Apple disabled').",
        message: "disabled",
    },
    srFocused: {
        context:
            "Screen reader text announced after an option's label when the option is focused (e.g. 'Apple focused').",
        message: "focused",
    },
    srSelected: {
        context:
            "Screen reader text announced after an option's label when the option is selected (e.g. 'Apple selected').",
        message: "selected",
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
    iconAltClearSelection: strings.iconAltClearSelection.message,
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
    iconAltToggleListbox: strings.iconAltToggleListbox.message,

    // Labels
    breadcrumbs: strings.breadcrumbs.message,
    datePickerCalendar: strings.datePickerCalendar.message,
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
    srNumResultsAvailable: ({num}) =>
        num === 1 ? `${num} result available.` : `${num} results available.`,
    srNumSelectedOptions: ({num}) =>
        num === 1 ? `${num} selected option.` : `${num} selected options.`,
    srDisabled: strings.srDisabled.message,
    srFocused: strings.srFocused.message,
    srSelected: strings.srSelected.message,
    srItemsSelected: ({labels}) => `${labels} selected`,
    srSelectionCleared: strings.srSelectionCleared.message,
    srItemsNotSelected: ({labels}) => `${labels} not selected`,

    // Form field labels
    fieldLabelDay: strings.fieldLabelDay.message,
    fieldLabelMonth: strings.fieldLabelMonth.message,
    fieldLabelYear: strings.fieldLabelYear.message,

    // Form validation
    birthdateErrorMessage: strings.birthdateErrorMessage.message,
    requiredFieldMessage: strings.requiredFieldMessage.message,
};

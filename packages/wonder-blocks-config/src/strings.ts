/**
 * The translated strings that are used to render Wonder Blocks.
 */
export type WonderBlocksStrings = {
    // Status icons
    iconAltInfo: string;
    iconAltSuccess: string;
    iconAltWarning: string;
    iconAltCritical: string;

    // Banner
    iconAltDismissBanner: string;

    // BirthdayPicker
    birthdayPickerError: string;
    birthdayPickerMonth: string;
    birthdayPickerDay: string;
    birthdayPickerYear: string;

    // Breadcrumbs
    breadcrumbs: string;

    // Card
    iconAltClose: string;

    // DatePicker
    iconAltToggleCalendar: string;
    datePickerCalendar: string;

    // Dropdown (SingleSelect, MultiSelect)
    filter: string;
    noResults: string;
    selectNone: string;
    selectAll: ({num}: {num: number}) => string;
    noneSelected: string;
    someSelected: ({num}: {num: number}) => string;
    allSelected: string;

    // Dropdown (Combobox)
    iconAltClearSelection: string;
    iconAltToggleListbox: string;
    optionsList: string;
    removeSelected: ({label}: {label: string}) => string;
    srComboboxClosed: string;
    srComboboxCurrentItem: ({
        current,
        index,
        total,
        disabled,
        focused,
        selected,
    }: {
        current: string;
        index: number;
        total: number;
        disabled?: boolean;
        focused?: boolean;
        selected?: boolean;
    }) => string;
    srComboboxSelectedTotal: ({total}: {total: number}) => string;
    srComboboxResultsTotal: ({total}: {total: number}) => string;
    srSelected: ({labels}: {labels: string}) => string;
    srUnselected: ({labels}: {labels: string}) => string;
    srSelectionCleared: string;

    // Form fields (TextField, TextArea, SingleSelect, MultiSelect)
    requiredField: string;

    // LabeledField
    iconAltError: string;

    // Link
    iconAltOpensNewTab: string;

    // Modal
    iconAltCloseModal: string;

    // Popover
    iconAltClosePopover: string;

    // SearchField (also used by the filter in SingleSelect and MultiSelect)
    iconAltClearSearch: string;

    // Tabs
    tabs: string;
};

/**
 * Untranslated strings used in Wonder Blocks. To be used by an external
 * translator to produce translated strings, passed in as `WonderBlocksStrings`.
 *
 * !! Note: Ensure that all escape sequences are double-escaped. (e.g. `\\text` -> `\\\\text`)
 */
export const strings = {
    // Status icons
    iconAltInfo: {
        context:
            "Accessible name for an icon indicating informational content.",
        message: "Info",
    },
    iconAltSuccess: {
        context: "Accessible name for an icon indicating a success.",
        message: "Success",
    },
    iconAltWarning: {
        context: "Accessible name for an icon indicating a warning.",
        message: "Warning",
    },
    iconAltCritical: {
        context: "Accessible name for an icon indicating a critical error.",
        message: "Critical",
    },

    // Banner
    iconAltDismissBanner: {
        context: "Accessible name for the icon button that dismisses a banner.",
        message: "Dismiss banner.",
    },

    // BirthdayPicker
    birthdayPickerError: {
        context:
            "Error message shown when the selected birthdate is not a valid date.",
        message: "Please select a valid birthdate.",
    },
    birthdayPickerMonth: {
        context:
            "Placeholder and accessible name for the month dropdown in a birthdate picker.",
        message: "Month",
    },
    birthdayPickerDay: {
        context:
            "Placeholder and accessible name for the day dropdown in a birthdate picker.",
        message: "Day",
    },
    birthdayPickerYear: {
        context:
            "Placeholder and accessible name for the year dropdown in a birthdate picker.",
        message: "Year",
    },

    // Breadcrumbs
    breadcrumbs: {
        context:
            "Accessible name for the navigation landmark containing breadcrumb links.",
        message: "Breadcrumbs",
    },

    // Card
    iconAltClose: {
        context: "Accessible name for the icon button that dismisses a card.",
        message: "Close",
    },

    // DatePicker
    iconAltToggleCalendar: {
        context:
            "Accessible name for the icon button that opens or closes the calendar in a date picker.",
        message: "Toggle calendar",
    },
    datePickerCalendar: {
        context:
            "Accessible name for the region containing the calendar in a date picker.",
        message: "Date picker calendar",
    },

    // Dropdown (SingleSelect, MultiSelect)
    filter: {
        context:
            "Placeholder for the search field used to filter the options in a dropdown.",
        message: "Filter",
    },
    noResults: {
        context:
            "Shown (and announced to screen readers in a combobox) when no dropdown options match the search text.",
        message: "No results",
    },
    selectNone: {
        context:
            "Label for the option that deselects all options in a multi-select dropdown.",
        message: "Select none",
    },
    selectAll: {
        context:
            "Label for the option that selects all options in a multi-select dropdown. `{num}` is the total number of options.",
        message: "Select all ({num})",
    },
    noneSelected: {
        context:
            "Text shown in a multi-select dropdown when no options are selected.",
        message: "0 items",
    },
    someSelected: {
        context:
            "Number of items, shown in a multi-select dropdown for the number of selected options, and announced to screen readers for the number of options matching the search text.",
        one: "1 item",
        other: "{num} items",
    },
    allSelected: {
        context:
            "Text shown in a multi-select dropdown when all options are selected.",
        message: "All items",
    },

    // Dropdown (Combobox)
    iconAltClearSelection: {
        context:
            "Accessible name for the icon button that clears the selection in a combobox.",
        message: "Clear selection",
    },
    iconAltToggleListbox: {
        context:
            "Accessible name for the icon button that opens or closes the list of options in a combobox.",
        message: "Toggle listbox",
    },
    optionsList: {
        context: "Accessible name for the list of options in a combobox.",
        message: "Options list",
    },
    removeSelected: {
        context:
            "Accessible name for the button that removes a selected option in a combobox. `{label}` is the option's label.",
        message: "Remove {label}",
    },
    srComboboxClosed: {
        context:
            "Screen reader announcement when the list of options in a combobox closes.",
        message: "Combobox is closed",
    },
    srComboboxCurrentItem: {
        context:
            "Screen reader announcement for the currently highlighted option in a combobox. `{current}` is the option's label, `{index}` is its position in the list (starting at 1), and `{total}` is the number of options. The `focused`, `disabled` and `selected` states are only included when they apply.",
        message:
            "{current}{focused, select, true { focused} other {}}{disabled, select, true { disabled} other {}}{selected, select, true { selected} other {}}, {index} of {total}.",
    },
    srComboboxSelectedTotal: {
        context:
            "Screen reader announcement for the number of selected options in a multi-select combobox.",
        one: "1 selected option.",
        other: "{total} selected options.",
    },
    srComboboxResultsTotal: {
        context:
            "Screen reader announcement for the number of options available in a combobox.",
        one: "1 result available.",
        other: "{total} results available.",
    },
    srSelected: {
        context:
            "Screen reader announcement when options are selected in a combobox. `{labels}` is the list of selected option labels.",
        message: "{labels} selected",
    },
    srUnselected: {
        context:
            "Screen reader announcement when options are deselected in a combobox. `{labels}` is the list of deselected option labels.",
        message: "{labels} not selected",
    },
    srSelectionCleared: {
        context:
            "Screen reader announcement when all selected options in a combobox are cleared.",
        message: "Selection cleared",
    },

    // Form fields (TextField, TextArea, SingleSelect, MultiSelect)
    requiredField: {
        context: "Error message shown when a required form field is empty.",
        message: "This field is required.",
    },

    // LabeledField
    iconAltError: {
        context:
            "Accessible name for the icon shown before a form field's error message. It's read right before the error message.",
        message: "Error:",
    },

    // Link
    iconAltOpensNewTab: {
        context:
            "Accessible name for an icon marking a link that opens in a new tab.",
        message: "(opens in a new tab)",
    },

    // Modal
    iconAltCloseModal: {
        context: "Accessible name for the icon button that closes a modal.",
        message: "Close modal",
    },

    // Popover
    iconAltClosePopover: {
        context: "Accessible name for the icon button that closes a popover.",
        message: "Close Popover",
    },

    // SearchField
    iconAltClearSearch: {
        context:
            "Accessible name for the icon button that clears the text in a search field.",
        message: "Clear search",
    },

    // Tabs
    tabs: {
        context:
            "Label for the menu of tabs when no tab is selected, shown when the tabs are collapsed into a dropdown.",
        message: "Tabs",
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
    // Status icons
    iconAltInfo: strings.iconAltInfo.message,
    iconAltSuccess: strings.iconAltSuccess.message,
    iconAltWarning: strings.iconAltWarning.message,
    iconAltCritical: strings.iconAltCritical.message,

    // Banner
    iconAltDismissBanner: strings.iconAltDismissBanner.message,

    // BirthdayPicker
    birthdayPickerError: strings.birthdayPickerError.message,
    birthdayPickerMonth: strings.birthdayPickerMonth.message,
    birthdayPickerDay: strings.birthdayPickerDay.message,
    birthdayPickerYear: strings.birthdayPickerYear.message,

    // Breadcrumbs
    breadcrumbs: strings.breadcrumbs.message,

    // Card
    iconAltClose: strings.iconAltClose.message,

    // DatePicker
    iconAltToggleCalendar: strings.iconAltToggleCalendar.message,
    datePickerCalendar: strings.datePickerCalendar.message,

    // Dropdown (SingleSelect, MultiSelect)
    filter: strings.filter.message,
    noResults: strings.noResults.message,
    selectNone: strings.selectNone.message,
    selectAll: ({num}) => `Select all (${num})`,
    noneSelected: strings.noneSelected.message,
    someSelected: ({num}) => (num === 1 ? "1 item" : `${num} items`),
    allSelected: strings.allSelected.message,

    // Dropdown (Combobox)
    iconAltClearSelection: strings.iconAltClearSelection.message,
    iconAltToggleListbox: strings.iconAltToggleListbox.message,
    optionsList: strings.optionsList.message,
    removeSelected: ({label}) => `Remove ${label}`,
    srComboboxClosed: strings.srComboboxClosed.message,
    srComboboxCurrentItem: ({
        current,
        index,
        total,
        disabled,
        focused,
        selected,
    }) =>
        `${current}${focused ? " focused" : ""}${disabled ? " disabled" : ""}${
            selected ? " selected" : ""
        }, ${index} of ${total}.`,
    srComboboxSelectedTotal: ({total}) =>
        total === 1 ? "1 selected option." : `${total} selected options.`,
    srComboboxResultsTotal: ({total}) =>
        total === 1 ? "1 result available." : `${total} results available.`,
    srSelected: ({labels}) => `${labels} selected`,
    srUnselected: ({labels}) => `${labels} not selected`,
    srSelectionCleared: strings.srSelectionCleared.message,

    // Form fields (TextField, TextArea, SingleSelect, MultiSelect)
    requiredField: strings.requiredField.message,

    // LabeledField
    iconAltError: strings.iconAltError.message,

    // Link
    iconAltOpensNewTab: strings.iconAltOpensNewTab.message,

    // Modal
    iconAltCloseModal: strings.iconAltCloseModal.message,

    // Popover
    iconAltClosePopover: strings.iconAltClosePopover.message,

    // SearchField
    iconAltClearSearch: strings.iconAltClearSearch.message,

    // Tabs
    tabs: strings.tabs.message,
};

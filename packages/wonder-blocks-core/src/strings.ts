/**
 * The translated strings that are used to render Wonder Blocks.
 *
 * Keys are organized into three groups, in this order: the general strings
 * that users can see, then `iconAlt*`, then `sr*`. Keys are sorted
 * alphabetically within each group, and all three exports in this file
 * (`WonderBlocksStrings`, `strings` and `defaultStringsEn`) use the same
 * grouping and ordering so they can be read side by side.
 *
 * Naming conventions:
 * - `iconAlt*`: accessible names (alt text / `aria-label`) for icons.
 * - `sr*`: messages that are only announced to screen readers (live regions).
 * - Everything else is named after what it labels.
 */
export type WonderBlocksStrings = {
    // General strings: visible labels, placeholders, error messages and
    // selection summaries.

    /**
     * Shown on a multi select's opener when every option is selected.
     */
    allItemsSelected: string;
    /**
     * The accessible name for the breadcrumbs navigation landmark.
     */
    breadcrumbsLabel: string;
    /**
     * The accessible name for the button that clears the search/filter input.
     */
    clearSearch: string;
    /**
     * The accessible name for a date picker's calendar grid.
     */
    datePickerCalendarLabel: string;
    /**
     * The label for the day field of the birthday picker.
     */
    day: string;
    /**
     * The placeholder for the input used to filter a dropdown's options.
     */
    filterPlaceholder: string;
    /**
     * The error message shown when the birthday picker's value is not a valid
     * date.
     */
    invalidBirthdateErrorMessage: string;
    /**
     * The accessible name for a combobox's list of options.
     */
    listboxLabel: string;
    /**
     * The label for the month field of the birthday picker.
     */
    month: string;
    /**
     * Shown when filtering a dropdown's options matches nothing.
     */
    noResults: string;
    /**
     * The error message shown when a required field is left empty.
     */
    requiredFieldErrorMessage: string;
    /**
     * The label for the shortcut that selects every option of a multi select.
     * `numOptions` is the number of options that would be selected.
     */
    selectAll: (args: {numOptions: number}) => string;
    /**
     * Summarizes how many options a multi select currently has selected.
     * `numItems` is the number of selected options and can be zero.
     */
    selectedItemsCount: (args: {numItems: number}) => string;
    /**
     * The label for the shortcut that deselects every option of a multi
     * select.
     */
    selectNone: string;
    /**
     * The accessible name for the dropdown that tabs collapse into when there
     * isn't enough horizontal space to show them as tabs.
     */
    tabs: string;
    /**
     * The label for the year field of the birthday picker.
     */
    year: string;

    // Icon alt text: accessible names for icons.

    /**
     * Accessible name for the button that clears the current selection.
     */
    iconAltClearSelection: string;
    /**
     * Accessible name for the button that closes a modal.
     */
    iconAltCloseModal: string;
    /**
     * Accessible name for the button that closes a popover.
     */
    iconAltClosePopover: string;
    /**
     * Accessible name for the button that dismisses a banner.
     */
    iconAltDismissBanner: string;
    /**
     * Accessible name for the icon shown next to a field's error message.
     */
    iconAltError: string;
    /**
     * Accessible name for the icon marking a link that opens in a new tab.
     */
    iconAltOpensNewTab: string;
    /**
     * Accessible name for the button that removes one of the options selected
     * in a combobox. `label` is the option's label.
     */
    iconAltRemoveSelected: (args: {label: string}) => string;
    /**
     * Accessible name for the button that shows/hides a date picker's
     * calendar.
     */
    iconAltToggleCalendar: string;
    /**
     * Accessible name for the button that shows/hides a combobox's listbox.
     */
    iconAltToggleListbox: string;

    // Screen reader announcements: text that is only announced by assistive
    // technology.

    /**
     * Screen reader announcement for the combobox being closed.
     */
    srComboboxClosed: string;
    /**
     * Screen reader announcement for the option the user has navigated to.
     * `current` is the option's label, `index` is its 1-based position and
     * `total` is the number of options.
     */
    srCurrentItem: (args: {
        current: string;
        index: number;
        total: number;
    }) => string;
    /**
     * Appended to `srCurrentItem`'s option label when the option is disabled.
     */
    srCurrentItemDisabled: string;
    /**
     * Appended to `srCurrentItem`'s option label when the option is focused.
     */
    srCurrentItemFocused: string;
    /**
     * Appended to `srCurrentItem`'s option label when the option is selected.
     */
    srCurrentItemSelected: string;
    /**
     * Screen reader announcement for how many options the listbox is showing.
     */
    srResultsAvailable: (args: {total: number}) => string;
    /**
     * Screen reader announcement for the option(s) that were just selected.
     * `labels` is a comma separated list of the selected options' labels.
     */
    srSelected: (args: {labels: string}) => string;
    /**
     * Screen reader announcement for how many options are currently selected.
     */
    srSelectedOptionsTotal: (args: {total: number}) => string;
    /**
     * Screen reader announcement for the selection being cleared.
     */
    srSelectionCleared: string;
    /**
     * Screen reader announcement for the option(s) that were just deselected.
     * `labels` is a comma separated list of the deselected options' labels.
     */
    srUnselected: (args: {labels: string}) => string;
};

/**
 * Untranslated strings used in Wonder Blocks. To be used by an external
 * translator to produce translated strings, passed in as `WonderBlocksStrings`.
 *
 * Messages that interpolate values are declared as functions that take an
 * object of the named values and return the message, and strings that vary
 * with a count are declared with `one`/`other` messages instead of a single
 * `message`.
 *
 * !! Note: Ensure that all escape sequences are double-escaped. (e.g. `\\text` -> `\\\\text`)
 */
export const strings = {
    // General strings: visible labels, placeholders, error messages and
    // selection summaries.

    allItemsSelected: {
        context:
            "Shown on a multi select's opener when every option is selected.",
        message: "All items",
    },
    breadcrumbsLabel: {
        context:
            "Accessible name for the navigation landmark containing breadcrumb links.",
        message: "Breadcrumbs",
    },
    clearSearch: {
        context:
            "Accessible name for the button that clears the text typed into a search or filter input.",
        message: "Clear search",
    },
    datePickerCalendarLabel: {
        context:
            "Accessible name for the calendar grid shown by a date picker.",
        message: "Date picker calendar",
    },
    day: {
        context: "Label for the day field of a birthdate input.",
        message: "Day",
    },
    filterPlaceholder: {
        context:
            "Placeholder for the input used to filter the options of a dropdown.",
        message: "Filter",
    },
    invalidBirthdateErrorMessage: {
        context:
            "Error message shown when the month, day and year chosen for a birthdate don't form a valid date.",
        message: "Please select a valid birthdate.",
    },
    listboxLabel: {
        context: "Accessible name for a combobox's list of options.",
        message: "Options list",
    },
    month: {
        context: "Label for the month field of a birthdate input.",
        message: "Month",
    },
    noResults: {
        context:
            "Shown in place of a dropdown's options when the text typed into its filter input matches none of them.",
        message: "No results",
    },
    requiredFieldErrorMessage: {
        context: "Error message shown when a required form field is empty.",
        message: "This field is required.",
    },
    selectAll: {
        context:
            "Label for the shortcut that selects every option of a multi select. The numOptions argument is how many options there are.",
        message: ({numOptions}) => `Select all (${numOptions})`,
    },
    selectedItemsCount: {
        context:
            "Shown on a multi select's opener to summarize how many options are selected. The numItems argument is the number of selected options, and can be zero.",
        one: ({numItems}) => `${numItems} item`,
        other: ({numItems}) => `${numItems} items`,
    },
    selectNone: {
        context:
            "Label for the shortcut that deselects every option of a multi select.",
        message: "Select none",
    },
    tabs: {
        context:
            "Accessible name for the dropdown that tabs collapse into when there isn't enough horizontal space to lay them out as tabs.",
        message: "Tabs",
    },
    year: {
        context: "Label for the year field of a birthdate input.",
        message: "Year",
    },

    // Icon alt text: accessible names for icons.

    iconAltClearSelection: {
        context:
            "Accessible name for the button that clears the option currently selected in a combobox.",
        message: "Clear selection",
    },
    iconAltCloseModal: {
        context: "Accessible name for the button that closes a modal.",
        message: "Close modal",
    },
    iconAltClosePopover: {
        context: "Accessible name for the button that closes a popover.",
        message: "Close Popover",
    },
    iconAltDismissBanner: {
        context:
            "Accessible name for the button that dismisses a banner (a message shown at the top of a page or section).",
        message: "Dismiss banner.",
    },
    iconAltError: {
        context:
            "Accessible name for the icon shown beside a form field's error message. The error message itself follows the icon.",
        message: "Error:",
    },
    iconAltOpensNewTab: {
        context:
            "Accessible name for an icon marking a link that opens in a new tab.",
        message: "(opens in a new tab)",
    },
    iconAltRemoveSelected: {
        context:
            "Accessible name for the button that removes one of the options selected in a combobox. The label argument is the option's label.",
        message: ({label}) => `Remove ${label}`,
    },
    iconAltToggleCalendar: {
        context:
            "Accessible name for the button that shows or hides a date picker's calendar.",
        message: "Toggle calendar",
    },
    iconAltToggleListbox: {
        context:
            "Accessible name for the button that shows or hides a combobox's list of options.",
        message: "Toggle listbox",
    },

    // Screen reader announcements: text that is only announced by assistive
    // technology.

    srComboboxClosed: {
        context:
            "Announced to screen reader users when a combobox's list of options closes.",
        message: "Combobox is closed",
    },
    srCurrentItem: {
        context:
            "Announced to screen reader users when they move to an option in a list. The current argument is the option's label, the index argument is its position in the list (starting at 1) and the total argument is how many options there are. Any of srCurrentItemFocused, srCurrentItemDisabled and srCurrentItemSelected that apply are appended to the option's label.",
        message: ({current, index, total}) =>
            `${current}, ${index} of ${total}.`,
    },
    srCurrentItemDisabled: {
        context:
            "Appended to the label of the option announced by srCurrentItem when that option is disabled.",
        message: "disabled",
    },
    srCurrentItemFocused: {
        context:
            "Appended to the label of the option announced by srCurrentItem when that option is focused.",
        message: "focused",
    },
    srCurrentItemSelected: {
        context:
            "Appended to the label of the option announced by srCurrentItem when that option is selected.",
        message: "selected",
    },
    srResultsAvailable: {
        context:
            "Announced to screen reader users to say how many options a list is currently showing. The total argument is the number of options.",
        one: ({total}) => `${total} result available.`,
        other: ({total}) => `${total} results available.`,
    },
    srSelected: {
        context:
            "Announced to screen reader users when option(s) become selected. The labels argument is a comma separated list of the selected options' labels.",
        message: ({labels}) => `${labels} selected`,
    },
    srSelectedOptionsTotal: {
        context:
            "Announced to screen reader users to say how many options are currently selected. The total argument is the number of selected options.",
        one: ({total}) => `${total} selected option.`,
        other: ({total}) => `${total} selected options.`,
    },
    srSelectionCleared: {
        context:
            "Announced to screen reader users when a combobox's selection is cleared.",
        message: "Selection cleared",
    },
    srUnselected: {
        context:
            "Announced to screen reader users when option(s) become deselected. The labels argument is a comma separated list of the deselected options' labels.",
        message: ({labels}) => `${labels} not selected`,
    },
} satisfies {
    [Key in keyof WonderBlocksStrings]: WonderBlocksStrings[Key] extends (
        args: infer Args,
    ) => string
        ?
              | {context?: string; message: (args: Args) => string}
              | {
                    context?: string;
                    one: (args: Args) => string;
                    other: (args: Args) => string;
                }
        : {context?: string; message: WonderBlocksStrings[Key]};
};

/**
 * Default 'en' strings to use.
 */
export const defaultStringsEn: WonderBlocksStrings = {
    // General strings: visible labels, placeholders, error messages and
    // selection summaries.

    allItemsSelected: strings.allItemsSelected.message,
    breadcrumbsLabel: strings.breadcrumbsLabel.message,
    clearSearch: strings.clearSearch.message,
    datePickerCalendarLabel: strings.datePickerCalendarLabel.message,
    day: strings.day.message,
    filterPlaceholder: strings.filterPlaceholder.message,
    invalidBirthdateErrorMessage: strings.invalidBirthdateErrorMessage.message,
    listboxLabel: strings.listboxLabel.message,
    month: strings.month.message,
    noResults: strings.noResults.message,
    requiredFieldErrorMessage: strings.requiredFieldErrorMessage.message,
    selectAll: strings.selectAll.message,
    selectedItemsCount: (args) =>
        args.numItems === 1
            ? strings.selectedItemsCount.one(args)
            : strings.selectedItemsCount.other(args),
    selectNone: strings.selectNone.message,
    tabs: strings.tabs.message,
    year: strings.year.message,

    // Icon alt text: accessible names for icons.

    iconAltClearSelection: strings.iconAltClearSelection.message,
    iconAltCloseModal: strings.iconAltCloseModal.message,
    iconAltClosePopover: strings.iconAltClosePopover.message,
    iconAltDismissBanner: strings.iconAltDismissBanner.message,
    iconAltError: strings.iconAltError.message,
    iconAltOpensNewTab: strings.iconAltOpensNewTab.message,
    iconAltRemoveSelected: strings.iconAltRemoveSelected.message,
    iconAltToggleCalendar: strings.iconAltToggleCalendar.message,
    iconAltToggleListbox: strings.iconAltToggleListbox.message,

    // Screen reader announcements: text that is only announced by assistive
    // technology.

    srComboboxClosed: strings.srComboboxClosed.message,
    srCurrentItem: strings.srCurrentItem.message,
    srCurrentItemDisabled: strings.srCurrentItemDisabled.message,
    srCurrentItemFocused: strings.srCurrentItemFocused.message,
    srCurrentItemSelected: strings.srCurrentItemSelected.message,
    srResultsAvailable: (args) =>
        args.total === 1
            ? strings.srResultsAvailable.one(args)
            : strings.srResultsAvailable.other(args),
    srSelected: strings.srSelected.message,
    srSelectedOptionsTotal: (args) =>
        args.total === 1
            ? strings.srSelectedOptionsTotal.one(args)
            : strings.srSelectedOptionsTotal.other(args),
    srSelectionCleared: strings.srSelectionCleared.message,
    srUnselected: strings.srUnselected.message,
};

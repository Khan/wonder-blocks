import {Temporal} from "temporal-polyfill";
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {SingleSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import infoIcon from "@phosphor-icons/core/bold/info-bold.svg";

export type Labels = {
    /**
     * Label for displaying a validation error.
     */
    readonly errorMessage: string;
    /**
     * Label for the month placeholder.
     */
    readonly month: string;
    /**
     * Label for the year placeholder.
     */
    readonly year: string;
    /**
     * Label for the day placeholder.
     */
    readonly day: string;
};

type Props = {
    /**
     * The default value to populate the birthdate with. Should be in the
     * format: YYYY-MM-DD (e.g. 2021-05-26). It's only used to populate the
     * initial value as this is an uncontrolled component.
     */
    defaultValue?: string;
    /**
     * Whether the birthdate fields are disabled.
     *
     * Internally, the `aria-disabled` attribute will be set so that the
     * element remains focusable and will be included in the tab order.
     */
    disabled?: boolean;
    /**
     * The object containing the custom labels used inside this component.
     */
    labels?: Labels;
    /**
     * Whether we want to hide the day field.
     *
     * **NOTE:** We will set the day to the _last_ day of the _selected_ month
     * if the day field is hidden. Please make sure to modify the passed date
     * value to fit different needs (e.g. if you want to set the _last_ day of
     * the _following_ month instead).
     */
    monthYearOnly?: boolean;
    /**
     * Listen for changes to the birthdate. Could be a string in the YYYY-MM-DD
     * format or `null`.
     */
    onChange: (date?: string | null | undefined) => unknown;
    /**
     * Additional styles applied to the root element of the component.
     */
    style?: StyleType;
    /**
     * Additional styles applied to the dropdowns.
     */
    dropdownStyle?: StyleType;
    /**
     * The locale to use for the month names. If not provided, the browser's
     * `navigator.language` value will be used.
     */
    locale?: string;
};

type State = {
    /**
     * The currently selected month.
     */
    month: string | null;
    /**
     * The currently selected day.
     */
    day: string | null;
    /**
     * The currently selected year.
     */
    year: string | null;
    /**
     * The error message to display (in case there's an invalid date).
     */
    error: string | null;
};

// @ts-expect-error [FEI-5019] - TS2339 - Property 'getYear' does not exist on type 'Date'.
const CUR_YEAR = new Date().getYear() + 1900;

// Only exported internally for testing/documentation purposes.
export const defaultLabels: Labels = Object.freeze({
    errorMessage: "Please select a valid birthdate.",
    month: "Month",
    year: "Year",
    day: "Day",
});

// Default minWidth value when we include the full DOB.
const FIELD_MIN_WIDTH_FULL = 110;

// Alternative minWidth value when we hide the day field.
// See: https://www.figma.com/file/uJZi9ZvuEz5N8GJ3HqKFAa/(2021)-Account-records?node-id=20%3A398
const FIELD_MIN_WIDTH_MONTH_YEAR = 167;

const FIELD_MIN_WIDTH_DAY = 100;

/**
 * Birthday Picker. Similar to a datepicker, but specifically for birthdates.
 * We don't want to show a calendar in this case as it can be quite tedious to
 * try and select a date that's many years old. Instead, we use a set of
 * dropdowns to achieve a similar effect.
 *
 * More information on this pattern:
 * https://medium.com/samsung-internet-dev/making-input-type-date-complicated-a544fd27c45a
 *
 * Arguably, this should probably even be 3 textfields, but that would be a
 * larger design change, more info:
 * https://designnotes.blog.gov.uk/2013/12/05/asking-for-a-date-of-birth/
 *
 * **NOTE:** This component is uncontrolled.
 *
 * ### Usage
 *
 * ```jsx
 * import {BirthdayPicker} from "@khanacademy/wonder-blocks-dates";
 *
 * <BirthdayPicker
 *  defaultValue="2021-05-26"
 *  onChange={(date) => {setDate(date)}}
 * />
 * ```
 */

/* [WB-1655] Update with media query tokens */
const xsMin = "520px";

const screenSizes = {
    small: `@media (max-width: ${xsMin})`,
};

const defaultStyles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        gap: sizing.size_080,
        [screenSizes.small]: {
            flexDirection: "column",
        },
    },
    input: {
        [screenSizes.small]: {
            minInlineSize: "100%",
        },
    },
    errorRow: {
        flexDirection: "row",
        placeItems: "center",
        gap: sizing.size_040,
        marginBlockStart: sizing.size_040,
    },
    errorText: {
        color: semanticColor.core.foreground.critical.default,
    },
});
/**
 * Determines whether a given date is in the future.
 *
 * @param date - The Temporal.PlainDate to check.
 * @returns True if the provided date comes after today's date, false otherwise.
 */
const isFutureDate = (date: Temporal.PlainDate): boolean => {
    // The Temporal.PlainDate.compare() static method returns a number
    // (-1, 0, or 1) indicating whether the first date comes before, is the
    // same as, or comes after the second date.
    return Temporal.PlainDate.compare(date, Temporal.Now.plainDateISO()) === 1;
};

/**
 * Calculates the initial state values based on the default value.
 */
const getStateFromDefault = (
    defaultValue: string | undefined,
    monthYearOnly: boolean | undefined,
    labels: Labels,
): State => {
    const initialState: State = {
        month: null,
        day: monthYearOnly ? "1" : null,
        year: null,
        error: null,
    };

    // If a default value was provided then we use Temporal to convert it
    // into a date that we can use to populate the
    if (defaultValue) {
        let date: Temporal.PlainDate | null = null;
        try {
            date = Temporal.PlainDate.from(defaultValue);
        } catch (err) {
            initialState.error = labels.errorMessage;
            return initialState;
        }

        if (monthYearOnly) {
            date = date.with({day: date.daysInMonth});
        }

        initialState.month = String(date.month);
        initialState.day = String(date.day);
        initialState.year = String(date.year);

        // If the date is in the future then we want to show an error to
        // the user.
        if (isFutureDate(date)) {
            initialState.error = labels.errorMessage;
        }
    }

    return initialState;
};

const getMonthYearWidth = (monthYearOnly: boolean | undefined): number => {
    return monthYearOnly ? FIELD_MIN_WIDTH_MONTH_YEAR : FIELD_MIN_WIDTH_FULL;
};

const BirthdayPicker = (props: Props) => {
    const {
        defaultValue,
        disabled,
        dropdownStyle,
        locale,
        monthYearOnly,
        onChange,
        style,
    } = props;

    /**
     * Strings used for placeholders and error message. These are used this way
     * to support i18n.
     * NOTE: This is stored in a ref rather than state to avoid re-rendering the
     * entire component. Also, we don't need to use state because these strings
     * are only needed on mount.
     */
    // merge custom labels with the default ones
    const labelsRef = React.useRef<Labels>({
        ...defaultLabels,
        ...props.labels,
    });
    const labels = labelsRef.current;

    const [initialState] = React.useState<State>(() =>
        getStateFromDefault(defaultValue, monthYearOnly, labels),
    );
    const [month, setMonth] = React.useState(initialState.month);
    const [day, setDay] = React.useState(initialState.day);
    const [year, setYear] = React.useState(initialState.year);
    const [error, setError] = React.useState(initialState.error);

    // Mirror the selected values in a ref so that the change handlers can read
    // the latest values right after updating them.
    const valuesRef = React.useRef({
        month: initialState.month,
        day: initialState.day,
        year: initialState.year,
    });

    const lastChangeValueRef = React.useRef<string | null | undefined>(
        defaultValue || null,
    );

    /**
     * Report changes back to the calling component, but only if the value
     * has actually changed since the last time it was reported
     * (or initialized).
     *
     * @param value the value to report back to the calling component.
     */
    const reportChange = React.useCallback(
        (value?: string | null | undefined) => {
            if (value !== lastChangeValueRef.current) {
                lastChangeValueRef.current = value;
                onChange(value);
            }
        },
        [onChange],
    );

    /**
     * Handle a change to any of the input fields, confirming if the input is
     * valid, and then reporting the result back to the calling component via
     * reportChange.
     */
    const handleChange = React.useCallback((): void => {
        const {month, day, year} = valuesRef.current;

        const dateFields = [year, month];
        if (!monthYearOnly) {
            dateFields.push(day);
        }

        // If any of the values haven't been set then our overall value is
        // equal to null
        if (dateFields.some((field) => field === null)) {
            reportChange(null);
            return;
        }

        let date: Temporal.PlainDate;
        try {
            // If the month/year only mode is enabled, we set the day to the
            // last day of the selected month.
            // NOTE: at this point dateFields is guaranteed to have non-null values
            // because of the .some() check above.
            if (monthYearOnly) {
                date = Temporal.PlainDate.from({
                    year: Number(year),
                    month: Number(month),
                    // Temporal will constrain the date to the last day of the month
                    day: 31,
                });
            } else {
                date = Temporal.PlainDate.from(
                    {
                        year: Number(year),
                        month: Number(month),
                        day: Number(day),
                    },
                    {overflow: "reject"},
                );
            }
        } catch (err) {
            setError(labels.errorMessage);
            reportChange(null);
            return;
        }

        // If the date is in the future or is invalid then we want to show
        // an error to the user and return a null value.
        if (isFutureDate(date)) {
            setError(labels.errorMessage);
            reportChange(null);
        } else {
            setError(null);
            // Regardless of locale, we want to format the date as YYYY-MM-DD
            // toString() returns an ISO 8601 date string, which is YYYY-MM-DD.
            reportChange(date.toString());
        }
    }, [labels, monthYearOnly, reportChange]);

    const handleMonthChange = React.useCallback(
        (month: string) => {
            valuesRef.current = {...valuesRef.current, month};
            setMonth(month);
            handleChange();
        },
        [handleChange],
    );

    const handleDayChange = React.useCallback(
        (day: string) => {
            valuesRef.current = {...valuesRef.current, day};
            setDay(day);
            handleChange();
        },
        [handleChange],
    );

    const handleYearChange = React.useCallback(
        (year: string) => {
            valuesRef.current = {...valuesRef.current, year};
            setYear(year);
            handleChange();
        },
        [handleChange],
    );

    const maybeRenderError = (): React.ReactNode | null | undefined => {
        if (!error) {
            return null;
        }

        return (
            <View style={defaultStyles.errorRow} role="alert">
                <PhosphorIcon
                    size="small"
                    icon={infoIcon}
                    color={semanticColor.core.foreground.critical.default}
                    aria-hidden="true"
                />
                <BodyText tag="span" style={defaultStyles.errorText}>
                    {error}
                </BodyText>
            </View>
        );
    };

    const monthsShort = (): string[] => {
        const format = new Intl.DateTimeFormat(locale ?? navigator.language, {
            month: "short",
        }).format;
        return [...Array(12).keys()].map((m) =>
            // TODO: use Temporal.PlainDate.from() once the linter lets
            // format() accept a Temporal object
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format#parameters
            format(new Date(2021, m, 15)),
        );
    };

    const renderMonth = (): React.ReactNode => {
        const minWidth = getMonthYearWidth(monthYearOnly);
        return (
            <SingleSelect
                aria-label={labels.month}
                aria-invalid={!!error}
                error={!!error}
                disabled={disabled}
                placeholder={labels.month}
                onChange={handleMonthChange}
                selectedValue={month}
                style={[{minWidth}, defaultStyles.input, dropdownStyle]}
                testId="birthday-picker-month"
            >
                {monthsShort().map((monthShort, i) => (
                    <OptionItem
                        key={monthShort}
                        label={monthShort}
                        // +1 because Temporal months are 1-indexed
                        value={String(i + 1)}
                    />
                ))}
            </SingleSelect>
        );
    };

    const maybeRenderDay = (): React.ReactNode | null | undefined => {
        // Hide the day field if the month/year only mode is enabled.
        if (monthYearOnly) {
            return null;
        }

        return (
            <SingleSelect
                aria-label={labels.day}
                aria-invalid={!!error}
                error={!!error}
                disabled={disabled}
                placeholder={labels.day}
                onChange={handleDayChange}
                selectedValue={day}
                style={[
                    {
                        minInlineSize: FIELD_MIN_WIDTH_DAY,
                    },
                    defaultStyles.input,
                    dropdownStyle,
                ]}
                testId="birthday-picker-day"
            >
                {Array.from(Array(31)).map((_, day) => (
                    <OptionItem
                        key={String(day + 1)}
                        label={String(day + 1)}
                        value={String(day + 1)}
                    />
                ))}
            </SingleSelect>
        );
    };

    const renderYear = (): React.ReactNode => {
        const minWidth = getMonthYearWidth(monthYearOnly);

        return (
            <SingleSelect
                aria-label={labels.year}
                aria-invalid={!!error}
                error={!!error}
                disabled={disabled}
                placeholder={labels.year}
                onChange={handleYearChange}
                selectedValue={year}
                style={[{minWidth}, defaultStyles.input, dropdownStyle]}
                // Allows displaying the dropdown options without truncating
                // them when the user zooms in the browser.
                dropdownStyle={{minWidth: 150}}
                testId="birthday-picker-year"
            >
                {Array.from(Array(120)).map((_, yearOffset) => (
                    <OptionItem
                        key={String(CUR_YEAR - yearOffset)}
                        label={String(CUR_YEAR - yearOffset)}
                        value={String(CUR_YEAR - yearOffset)}
                    />
                ))}
            </SingleSelect>
        );
    };

    return (
        <>
            <View
                testId="birthday-picker"
                style={[defaultStyles.wrapper, style]}
            >
                {renderMonth()}

                {maybeRenderDay()}

                {renderYear()}
            </View>
            {maybeRenderError()}
        </>
    );
};

export default BirthdayPicker;

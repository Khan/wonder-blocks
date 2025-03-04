import moment from "moment"; // NOTE: DO NOT use named imports; 'moment' does not support named imports
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Body} from "@khanacademy/wonder-blocks-typography";
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
        [screenSizes.small]: {
            flexDirection: "column",
        },
    },
    input: {
        [screenSizes.small]: {
            minWidth: "100%",
        },
    },
});
export default class BirthdayPicker extends React.Component<Props, State> {
    /**
     * Strings used for placeholders and error message. These are used this way
     * to support i18n.
     * NOTE: This is a field rather than state to avoid re-rendering the entire
     * component. Also, we don't need to use state because these strings are
     * only needed on mount.
     */
    // @ts-expect-error [FEI-5019] - TS2564 - Property 'labels' has no initializer and is not definitely assigned in the constructor.
    labels: Labels;

    constructor(props: Props) {
        super(props);

        this.lastChangeValue = props.defaultValue || null;
        this.state = this.getStateFromDefault();
    }

    /**
     * Calculates the initial state values based on the default value.
     */
    getStateFromDefault(): State {
        const {defaultValue, monthYearOnly} = this.props;
        const initialState: State = {
            month: null,
            day: null,
            year: null,
            error: null,
        };

        // merge custom labels with the default ones
        this.labels = {...defaultLabels, ...this.props.labels};

        // If a default value was provided then we use moment to convert it
        // into a date that we can use to populate the
        if (defaultValue) {
            let date = moment(defaultValue);

            if (date.isValid()) {
                if (monthYearOnly) {
                    date = date.endOf("month");
                }

                initialState.month = String(date.month());
                initialState.day = String(date.date());
                initialState.year = String(date.year());
            }

            // If the date is in the future or is invalid then we want to show
            // an error to the user.
            if (date.isAfter() || !date.isValid()) {
                initialState.error = this.labels.errorMessage;
            }
        }

        return initialState;
    }

    lastChangeValue: string | null | undefined = null;

    /**
     * Report changes back to the calling component, but only if the value
     * has actually changed since the last time it was reported
     * (or initialized).
     *
     * @param value the value to report back to the calling component.
     */
    reportChange: (value?: string | null | undefined) => void = (value) => {
        if (value !== this.lastChangeValue) {
            this.lastChangeValue = value;
            this.props.onChange(value);
        }
    };

    /**
     * Handle a change to any of the input fields, confirming if the input is
     * valid, and then reporting the result back to the calling component via
     * reportChange.
     */
    handleChange: () => void = (): void => {
        const {month, day, year} = this.state;
        const {monthYearOnly} = this.props;

        const dateFields = [year, month];
        if (!monthYearOnly) {
            dateFields.push(day);
        }

        // If any of the values haven't been set then our overall value is
        // equal to null
        if (dateFields.some((field) => field === null)) {
            this.reportChange(null);
            return;
        }

        // If the month/year only mode is enabled, we set the day to the
        // last day of the selected month.
        // NOTE: at this point dateFields is guaranteed to have non-null values
        // because of the .some() check above.
        let date = moment(dateFields as Array<string>);
        if (monthYearOnly) {
            date = date.endOf("month");
        }

        // If the date is in the future or is invalid then we want to show
        // an error to the user and return a null value.
        if (date.isAfter() || !date.isValid()) {
            this.setState({error: this.labels.errorMessage});
            this.reportChange(null);
        } else {
            this.setState({error: null});
            // If the date picker is in a non-English language, we still
            // want to generate an English date.
            this.reportChange(date.locale("en").format("YYYY-MM-DD"));
        }
    };

    handleMonthChange: (month: string) => void = (month) => {
        this.setState({month}, this.handleChange);
    };

    handleDayChange: (day: string) => void = (day) => {
        this.setState({day}, this.handleChange);
    };

    handleYearChange: (year: string) => void = (year) => {
        this.setState({year}, this.handleChange);
    };

    maybeRenderError(): React.ReactNode | null | undefined {
        const {error} = this.state;

        if (!error) {
            return null;
        }

        return (
            <>
                <Strut size={spacing.xxxSmall_4} />
                <View
                    style={{flexDirection: "row", placeItems: "center"}}
                    role="alert"
                >
                    <PhosphorIcon
                        size="small"
                        icon={infoIcon}
                        color={semanticColor.icon.destructive}
                        aria-hidden="true"
                    />
                    <Strut size={spacing.xxxSmall_4} />
                    <Body
                        style={{
                            color: semanticColor.status.critical.foreground,
                        }}
                    >
                        {error}
                    </Body>
                </View>
            </>
        );
    }

    renderMonth(): React.ReactNode {
        const {disabled, monthYearOnly, dropdownStyle} = this.props;
        const {month} = this.state;
        const minWidth = this.getMonthYearWidth(monthYearOnly);
        return (
            <SingleSelect
                aria-label={this.labels.month}
                aria-invalid={!!this.state.error}
                error={!!this.state.error}
                disabled={disabled}
                placeholder={this.labels.month}
                onChange={this.handleMonthChange}
                selectedValue={month}
                style={[{minWidth}, defaultStyles.input, dropdownStyle]}
                testId="birthday-picker-month"
            >
                {/* eslint-disable-next-line import/no-named-as-default-member */}
                {moment.monthsShort().map((month, i) => (
                    <OptionItem key={month} label={month} value={String(i)} />
                ))}
            </SingleSelect>
        );
    }

    maybeRenderDay(): React.ReactNode | null | undefined {
        const {disabled, monthYearOnly, dropdownStyle} = this.props;
        const {day} = this.state;

        // Hide the day field if the month/year only mode is enabled.
        if (monthYearOnly) {
            return null;
        }

        return (
            <>
                <Strut size={spacing.xSmall_8} />
                <SingleSelect
                    aria-label={this.labels.day}
                    aria-invalid={!!this.state.error}
                    error={!!this.state.error}
                    disabled={disabled}
                    placeholder={this.labels.day}
                    onChange={this.handleDayChange}
                    selectedValue={day}
                    style={[
                        {
                            minWidth: FIELD_MIN_WIDTH_DAY,
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
            </>
        );
    }

    getMonthYearWidth(monthYearOnly: boolean | undefined): number {
        return monthYearOnly
            ? FIELD_MIN_WIDTH_MONTH_YEAR
            : FIELD_MIN_WIDTH_FULL;
    }

    renderYear(): React.ReactNode {
        const {disabled, monthYearOnly, dropdownStyle} = this.props;
        const {year} = this.state;

        const minWidth = this.getMonthYearWidth(monthYearOnly);

        return (
            <SingleSelect
                aria-label={this.labels.year}
                aria-invalid={!!this.state.error}
                error={!!this.state.error}
                disabled={disabled}
                placeholder={this.labels.year}
                onChange={this.handleYearChange}
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
    }

    render(): React.ReactNode {
        const {style} = this.props;

        return (
            <>
                <View
                    testId="birthday-picker"
                    style={[defaultStyles.wrapper, style]}
                >
                    {this.renderMonth()}

                    {this.maybeRenderDay()}

                    <Strut size={spacing.xSmall_8} />

                    {this.renderYear()}
                </View>
                {this.maybeRenderError()}
            </>
        );
    }
}

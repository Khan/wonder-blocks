// @flow
import moment from "moment";
import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body} from "@khanacademy/wonder-blocks-typography";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import Color from "@khanacademy/wonder-blocks-color";
import {SingleSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";

type Props = {|
    /**
     * The default value to populate the birthdate with. Should be in the
     * format: YYYY-MM-DD (e.g. 2021-05-26). It's only used to populate the
     * initial value as this is an uncontrolled component.
     */
    defaultValue?: string,

    /**
     * Listen for changes to the birthdate. Could be a string in the YYYY-MM-DD
     * format or `null`.
     */
    onChange: (date: ?string) => mixed,
|};

type State = {|
    month: string | null,
    day: string | null,
    year: string | null,
    error: string | null,
|};

// Flow doesn't know about the getYear property on Date for some reason!
// $FlowFixMe[prop-missing]
const CUR_YEAR = new Date().getYear() + 1900;
// TODO(WB-1200.2): Add labels prop to handle translations.
const BIRTHDAY_ERROR = "Please select a valid birthdate.";

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
export default class BirthdayPicker extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        let month = null;
        let day = null;
        let year = null;
        let error = null;

        // If a default value was provided then we use moment to convert it
        // into a date that we can use to populate the
        if (props.defaultValue) {
            const date = moment(props.defaultValue);

            if (date.isValid()) {
                month = String(date.month());
                day = String(date.date());
                year = String(date.year());
            }

            // If the date is in the future or is invalid then we want to show
            // an error to the user.
            if (date.isAfter() || !date.isValid()) {
                error = BIRTHDAY_ERROR;
            }
        }

        this.lastChangeValue = props.defaultValue || null;
        this.state = {month, day, year, error};
    }

    lastChangeValue: ?string = null;

    /**
     * Report changes back to the calling component, but only if the value
     * has actually changed since the last time it was reported
     * (or initialized).
     *
     * @param value the value to report back to the calling component.
     */
    reportChange: (value: ?string) => void = (value) => {
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

        // If any of the values haven't been set then our overall value is
        // equal to null
        if (month === null || day === null || year === null) {
            this.reportChange(null);
        } else {
            // This is a legal call to Moment, but our Moment types don't
            // recognize it.
            // $FlowFixMe[incompatible-call]
            const date = moment([year, month, day]);

            // If the date is in the future or is invalid then we want to show
            // an error to the user and return a null value.
            if (date.isAfter() || !date.isValid()) {
                this.setState({error: BIRTHDAY_ERROR});
                this.reportChange(null);
            } else {
                this.setState({error: null});
                // If the date picker is in a non-English language, we still
                // want to generate an English date.
                this.reportChange(date.locale("en").format("YYYY-MM-DD"));
            }
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

    render(): React.Element<any> {
        const {month, day, year, error} = this.state;

        return (
            <>
                <View testId="birthday-picker" style={{flexDirection: "row"}}>
                    <SingleSelect
                        // TODO(WB-1200.2): Add labels prop to handle
                        // translations.
                        placeholder={"Month"}
                        onChange={this.handleMonthChange}
                        selectedValue={month}
                        style={{minWidth: 110}}
                        testId="birthday-picker-month"
                    >
                        {moment.monthsShort().map((month, i) => (
                            <OptionItem
                                key={month}
                                label={month}
                                value={String(i)}
                            />
                        ))}
                    </SingleSelect>
                    <Strut size={Spacing.xSmall_8} />
                    <SingleSelect
                        // TODO(WB-1200.2): Add labels prop to handle
                        // translations.
                        placeholder={"Day"}
                        onChange={this.handleDayChange}
                        selectedValue={day}
                        style={{minWidth: 100}}
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
                    <Strut size={Spacing.xSmall_8} />
                    <SingleSelect
                        // TODO(WB-1200.2): Add labels prop to handle
                        // translations.
                        placeholder={"Year"}
                        onChange={this.handleYearChange}
                        selectedValue={year}
                        style={{minWidth: 110}}
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
                </View>
                {error && (
                    <>
                        <Strut size={Spacing.xxxSmall_4} />
                        <View style={{flexDirection: "row"}} role="alert">
                            <Icon
                                size="small"
                                icon={icons.info}
                                color={Color.red}
                                style={{marginTop: 3}}
                                aria-hidden="true"
                            />
                            <Strut size={Spacing.xxxSmall_4} />
                            <Body style={{color: Color.red}}>{error}</Body>
                        </View>
                    </>
                )}
            </>
        );
    }
}

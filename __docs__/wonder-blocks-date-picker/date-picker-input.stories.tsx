import moment from "moment";
import * as React from "react";
import {ModifiersUtils, type DayModifiers} from "react-day-picker";
import LocaleUtils from "react-day-picker/moment";

import {View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";

import DatePickerInput from "../date-picker-input.tsx";

type StoryArgs = React.ComponentProps<typeof DatePickerInput>;

// A wrapper component that handles state management for the stories
const DateInputWrapper = (props: StoryArgs) => {
    const [isInvalid, setIsInvalid] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState<
        Date | null | undefined
    >(props.value ? moment(props.value).toDate() : null);

    const handleChange = (
        date: Date | null | undefined,
        modifiers: Partial<DayModifiers>,
    ) => {
        // We don't want to send back invalid dates.
        if (!date || modifiers.disabled) {
            setIsInvalid(true);
            return;
        }

        setIsInvalid(false);
        setSelectedDate(date);
    };

    const selectedDateAsValue = selectedDate
        ? LocaleUtils.formatDate(
              selectedDate,
              props.dateFormat,
              moment.locale(),
          )
        : props.value;

    return (
        <View>
            <DatePickerInput
                {...props}
                onBlur={() => {
                    setSelectedDate(selectedDate);
                }}
                onChange={handleChange}
                parseDate={LocaleUtils.parseDate as any}
                getModifiersForDay={ModifiersUtils.getModifiersForDay as any}
                value={selectedDateAsValue}
            />
            {isInvalid && <LabelMedium>Invalid date</LabelMedium>}
        </View>
    );
};

const minDate = moment();
const maxDate = moment().add(10, "day");

export default {
    title: "DatePickerInput",
    component: DatePickerInput,
};

export const SelectedDateIsNow = {
    args: {
        disabled: false,
        value: moment().format("MMMM D, YYYY"),
        dateFormat: "MMMM D, YYYY",
        modifiers: {
            selected: moment().toDate(),
            // We want to disable past dates and dates after 10 days from now
            disabled: (date) =>
                (minDate && date < minDate.startOf("day")) ||
                (maxDate && date > maxDate.endOf("day")),
        },
    },
    render: (args: StoryArgs) => <DateInputWrapper {...args} />,
};

export const DisabledState = {
    args: {
        disabled: true,
        value: "May 7, 2021",
        parseDate: LocaleUtils.parseDate,
        dateFormat: "MMMM D, YYYY",
    },
    render: (args: StoryArgs) => <DateInputWrapper {...args} />,
};

export const InvalidDate = {
    args: {
        value: "May 7, 2024",
        dateFormat: "MMMM D, YYYY",
        modifiers: {
            selected: moment().toDate(),
            // We want to disable past dates and dates after 10 days from now
            disabled: (date) =>
                (minDate && date < minDate.startOf("day")) ||
                (maxDate && date > maxDate.endOf("day")),
        },
    },
    render: (args: StoryArgs) => <DateInputWrapper {...args} />,
};

export const WithAriaLabel = {
    args: {
        "aria-label": "Choose a date",
        value: "May 7, 2021",
        dateFormat: "MMMM D, YYYY",
    },
    render: (args: StoryArgs) => <DatePickerInput {...args} />,
};

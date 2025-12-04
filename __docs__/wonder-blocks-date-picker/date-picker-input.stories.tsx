import {Temporal} from "temporal-polyfill";
import * as React from "react";
import {enUS} from "react-day-picker/locale";
import type {CustomModifiers} from "@khanacademy/wonder-blocks-date-picker";

import {View} from "@khanacademy/wonder-blocks-core";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import {
    DatePickerInput,
    TemporalLocaleUtils,
} from "@khanacademy/wonder-blocks-date-picker";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-date-picker/package.json";

type StoryArgs = React.ComponentProps<typeof DatePickerInput>;

// A wrapper component that handles state management for the stories
const DateInputWrapper = (props: StoryArgs) => {
    const [isInvalid, setIsInvalid] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState<
        Date | null | undefined
    >(() => {
        if (props.value && typeof props.value === "string") {
            try {
                const locale = enUS.code;
                const parsed = TemporalLocaleUtils.parseDate(
                    props.value,
                    props.dateFormat,
                    locale,
                );
                return parsed
                    ? TemporalLocaleUtils.temporalDateToJsDate(parsed)
                    : null;
            } catch {
                return null;
            }
        }
        return null;
    });

    const handleChange = (
        date: Date | null | undefined,
        modifiers: Partial<CustomModifiers>,
    ) => {
        // We don't want to send back invalid dates.
        if (!date || modifiers.disabled) {
            setIsInvalid(true);
            return;
        }

        setIsInvalid(false);
        setSelectedDate(date);
    };
    const locale = navigator.language || "en";

    const selectedDateAsValue = selectedDate
        ? TemporalLocaleUtils.formatDate(
              TemporalLocaleUtils.jsDateToTemporalDate(selectedDate),
              props.dateFormat,
              locale,
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
                value={selectedDateAsValue}
            />
            {isInvalid && <BodyText>Invalid date</BodyText>}
        </View>
    );
};

const minDate = Temporal.Now.plainDateISO();
const maxDate = minDate.add({days: 10});

export default {
    title: "Packages / Date Picker / DatePickerInput",
    component: DatePickerInput,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
};

export const SelectedDateIsNow = {
    args: {
        disabled: false,
        value: TemporalLocaleUtils.formatDate(
            Temporal.Now.plainDateISO(),
            "MMMM D, YYYY",
            "en-US",
        ),
        dateFormat: "MMMM D, YYYY",
        parseDate: TemporalLocaleUtils.parseDateToJsDate,
        getModifiersForDay: TemporalLocaleUtils.getModifiersForDay,
        modifiers: {
            selected: TemporalLocaleUtils.temporalDateToJsDate(
                Temporal.Now.plainDateISO(),
            ),
            // We want to disable past dates and dates after 10 days from now
            disabled: (date: Date) => {
                const temporalDate =
                    TemporalLocaleUtils.jsDateToTemporalDate(date);

                return (
                    (minDate &&
                        Temporal.PlainDate.compare(temporalDate, minDate) <
                            0) ||
                    (maxDate &&
                        Temporal.PlainDate.compare(temporalDate, maxDate) > 0)
                );
            },
        },
    },
    render: (args: StoryArgs) => <DateInputWrapper {...args} />,
};

export const DisabledState = {
    args: {
        disabled: true,
        value: "May 7, 2021",
        parseDate: TemporalLocaleUtils.parseDateToJsDate,
        dateFormat: "MMMM D, YYYY",
    },
    chromatic: {
        // Disabling because this is behavior is tested in TextField stories
        disableSnapshot: true,
    },
    render: (args: StoryArgs) => <DateInputWrapper {...args} />,
};

export const InvalidDate = {
    args: {
        value: "May 7, 2024",
        dateFormat: "MMMM D, YYYY",
        parseDate: TemporalLocaleUtils.parseDateToJsDate,
        getModifiersForDay: TemporalLocaleUtils.getModifiersForDay,
        modifiers: {
            selected: TemporalLocaleUtils.temporalDateToJsDate(
                Temporal.Now.plainDateISO(),
            ),
            // We want to disable past dates and dates after 10 days from now
            disabled: (date: Date) => {
                const temporalDate =
                    TemporalLocaleUtils.jsDateToTemporalDate(date);
                return (
                    (minDate &&
                        Temporal.PlainDate.compare(temporalDate, minDate) <
                            0) ||
                    (maxDate &&
                        Temporal.PlainDate.compare(temporalDate, maxDate) > 0)
                );
            },
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
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
    render: (args: StoryArgs) => <DatePickerInput {...args} />,
};

import type {Meta, StoryObj} from "@storybook/react-vite";
import {Temporal} from "temporal-polyfill";
import * as React from "react";

import Button from "@khanacademy/wonder-blocks-button";
import {View, type PropsFor} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";

import {DatePicker} from "@khanacademy/wonder-blocks-date-picker";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-date-picker/package.json";

type Props = PropsFor<typeof DatePicker>;

const DatePickerWrapper = (props: Props) => {
    const [selectedDate, setSelectedDate] = React.useState<
        Temporal.PlainDate | null | undefined
    >(props.selectedDate);

    const handleUpdateDate = (date?: Temporal.PlainDate | null) => {
        setSelectedDate(date);
    };

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 32,
            }}
        >
            <Button>prev</Button>
            <DatePicker
                {...props}
                updateDate={handleUpdateDate}
                selectedDate={selectedDate}
            />
            <Button>next</Button>
        </View>
    );
};

const ControlledDatePicker = (props: Props) => {
    const [selectedDate, setSelectedDate] = React.useState(props.selectedDate);
    const [isSaving, setIsSaving] = React.useState(false);
    // Check if the changed date is different from the initial date provided.
    const isSameDate = !!(
        selectedDate &&
        props.selectedDate &&
        selectedDate.equals(props.selectedDate)
    );

    const cancelSelection = (close: () => unknown) => {
        // Reset the date to the initial date provided.
        setSelectedDate(props.selectedDate);
        close();
    };

    const saveSelection = (close: () => unknown) => {
        // Save the selected date.
        setIsSaving(true);
        // This is where you would make an API call to save the date.
        /* eslint-disable-next-line no-restricted-syntax
           --
           NOTE: This is just a mock API call so we are using setTimeout just
           for simulation inside the Storybook context. Do not use setTimeout
           directly in your code.
         */
        setTimeout(() => {
            setIsSaving(false);
            close();
        }, 1000);
    };

    return (
        <DatePicker
            {...props}
            updateDate={setSelectedDate}
            selectedDate={selectedDate}
            footer={({close}) => {
                return (
                    <View
                        style={{
                            flexDirection: "row",
                            gap: spacing.small_12,
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            onClick={() => cancelSelection(close)}
                            kind="tertiary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => saveSelection(close)}
                            kind="primary"
                            disabled={isSameDate}
                            spinner={isSaving}
                        >
                            Confirm new date
                        </Button>
                    </View>
                );
            }}
        />
    );
};

/**
 * DatePicker component for selecting dates
 */
const meta: Meta<typeof DatePicker> = {
    title: "Packages / Date Picker / DatePicker",
    component: DatePicker,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

/**
 * Selected date is now, min is 2 days ago from now
 */
export const SelectedDateIsNow: Story = {
    render: (args) => <DatePickerWrapper {...args} />,
    args: {
        disabled: false,
        minDate: Temporal.Now.plainDateISO().subtract({days: 2}),
        selectedDate: Temporal.Now.plainDateISO(),
        updateDate: () => {},
    },
};

/**
 * Displays the disabled state
 */
export const DisabledState: Story = {
    args: {
        disabled: true,
        dateFormat: "MMMM D, YYYY",
        selectedDate: Temporal.PlainDate.from("2021-05-07"),
        updateDate: () => {},
    },
};

/**
 * No selected date, no min, showing placeholder
 */
export const WithPlaceholder: Story = {
    args: {
        dateFormat: "MMMM D, YYYY",
        placeholder: "Select a date",
        updateDate: () => {},
        style: {width: "300px"},
    },
};

/**
 * Don't close on select example with custom footer
 */
export const DontCloseOnSelect: Story = {
    render: (args) => <ControlledDatePicker {...args} />,
    args: {
        closeOnSelect: false,
        disabled: false,
        dateFormat: "MMM D, YYYY",
        minDate: Temporal.Now.plainDateISO().subtract({days: 2}),
        selectedDate: Temporal.Now.plainDateISO(),
        updateDate: () => {},
    },
};

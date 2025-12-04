import type {Meta, StoryObj} from "@storybook/react-vite";
import {Temporal} from "temporal-polyfill";
import * as React from "react";

import {View, type PropsFor} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {Heading, BodyText} from "@khanacademy/wonder-blocks-typography";
import {MaybeNativeDatePicker} from "@khanacademy/wonder-blocks-date-picker";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-date-picker/package.json";

type Props = PropsFor<typeof MaybeNativeDatePicker>;

/**
 * Wrapper component to manage date state
 */
const MaybeNativeDatePickerWrapper = (props: Props) => {
    const [selectedDate, setSelectedDate] = React.useState<
        Temporal.PlainDate | null | undefined
    >(props.selectedDate);

    const handleUpdateDate = (date?: Temporal.PlainDate | null) => {
        setSelectedDate(date);
    };

    return (
        <View
            style={{
                padding: spacing.large_24,
                gap: spacing.medium_16,
            }}
        >
            <MaybeNativeDatePicker
                {...props}
                updateDate={handleUpdateDate}
                selectedDate={selectedDate}
            />
            {selectedDate && (
                <BodyText>Selected date: {selectedDate.toString()}</BodyText>
            )}
        </View>
    );
};

/**
 * Component showing device detection info
 */
const DeviceInfo = () => {
    const [info, setInfo] = React.useState({
        hasTouchSupport: false,
        supportsDateInput: false,
        userAgent: "",
    });

    React.useEffect(() => {
        const el = document.createElement("input");
        el.setAttribute("type", "date");

        setInfo({
            hasTouchSupport:
                typeof window !== "undefined" && "ontouchstart" in window,
            supportsDateInput: el.type === "date",
            userAgent: navigator.userAgent,
        });
    }, []);

    const willUseNative = info.hasTouchSupport && info.supportsDateInput;

    return (
        <View
            style={{
                padding: spacing.medium_16,
                gap: spacing.xSmall_8,
                backgroundColor: willUseNative ? "#e8f5e9" : "#fff3e0",
                borderRadius: 8,
                marginBottom: spacing.large_24,
            }}
        >
            <Heading>
                {willUseNative
                    ? "🎯 Using Native Picker"
                    : "🖱️ Using Custom Picker"}
            </Heading>
            <BodyText>
                Touch Support: {info.hasTouchSupport ? "✅" : "❌"}
            </BodyText>
            <BodyText>
                Date Input Support: {info.supportsDateInput ? "✅" : "❌"}
            </BodyText>
            <BodyText style={{fontSize: 12, color: "#666"}}>
                User Agent: {info.userAgent}
            </BodyText>
        </View>
    );
};

/**
 * Comparison view showing both pickers side-by-side
 */
const ComparisonView = (props: Props) => {
    const [selectedDate, setSelectedDate] = React.useState<
        Temporal.PlainDate | null | undefined
    >(props.selectedDate);

    return (
        <View>
            <DeviceInfo />
            <View
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: spacing.large_24,
                    padding: spacing.large_24,
                }}
            >
                <View style={{gap: spacing.medium_16}}>
                    <Heading>Auto-Detected</Heading>
                    <BodyText>
                        This will show native picker on touch devices with date
                        input support, otherwise custom picker.
                    </BodyText>
                    <MaybeNativeDatePicker
                        {...props}
                        updateDate={setSelectedDate}
                        selectedDate={selectedDate}
                    />
                </View>
            </View>
            {selectedDate && (
                <View style={{padding: spacing.large_24}}>
                    <BodyText>
                        Selected date: {selectedDate.toString()}
                    </BodyText>
                </View>
            )}
        </View>
    );
};

/**
 * MaybeNativeDatePicker component that automatically uses native picker on
 * supported touch devices, falling back to custom picker otherwise.
 *
 * ## Testing on Different Devices
 *
 * To test this component properly, you should view these stories on:
 *
 * **Native Picker (Expected):**
 * - iOS Safari (iPhone/iPad)
 * - Android Chrome
 * - Android Firefox
 *
 * **Custom Picker (Expected):**
 * - Desktop Chrome (any OS)
 * - Desktop Firefox (any OS)
 * - Desktop Safari (macOS)
 *
 * You can also use browser DevTools device emulation, but note that it may not
 * perfectly simulate touch support detection.
 */
const meta: Meta<typeof MaybeNativeDatePicker> = {
    title: "Packages / Date Picker / MaybeNativeDatePicker",
    component: MaybeNativeDatePicker,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // Disabling these snapshots intended for device testing
            disableSnapshot: true,
        },
    },
};

export default meta;

type Story = StoryObj<typeof MaybeNativeDatePicker>;

/**
 * Basic date picker with auto-detection. On touch devices with date input
 * support, this will show the native picker. Otherwise, it shows the custom
 * picker.
 */
export const Default: Story = {
    render: (args) => <MaybeNativeDatePickerWrapper {...args} />,
    args: {
        updateDate: () => {},
    },
};

/**
 * Date picker with a pre-selected date. Try changing the date to see the
 * selected date update below the picker.
 */
export const WithSelectedDate: Story = {
    render: (args) => <MaybeNativeDatePickerWrapper {...args} />,
    args: {
        selectedDate: Temporal.Now.plainDateISO(),
        updateDate: () => {},
    },
};

/**
 * Date picker with minimum and maximum date constraints. The native picker
 * will prevent selecting dates outside this range. Try selecting dates before
 * the min or after the max.
 */
export const WithMinMaxDates: Story = {
    render: (args) => <MaybeNativeDatePickerWrapper {...args} />,
    args: {
        selectedDate: Temporal.Now.plainDateISO(),
        minDate: Temporal.Now.plainDateISO().subtract({days: 7}),
        maxDate: Temporal.Now.plainDateISO().add({days: 14}),
        updateDate: () => {},
    },
};

/**
 * Date picker in disabled state. The input should not be interactive.
 */
export const Disabled: Story = {
    render: (args) => <MaybeNativeDatePickerWrapper {...args} />,
    args: {
        disabled: true,
        selectedDate: Temporal.PlainDate.from("2024-03-15"),
        updateDate: () => {},
    },
};

/**
 * Date picker with a placeholder shown when no date is selected.
 */
export const WithPlaceholder: Story = {
    render: (args) => <MaybeNativeDatePickerWrapper {...args} />,
    args: {
        placeholder: "Select your birthday",
        updateDate: () => {},
    },
};

/**
 * Date picker with a custom date format (only affects custom picker, not
 * native picker which uses browser default).
 */
export const WithCustomFormat: Story = {
    render: (args) => <MaybeNativeDatePickerWrapper {...args} />,
    args: {
        dateFormat: "YYYY-MM-DD",
        selectedDate: Temporal.PlainDate.from("2024-12-25"),
        updateDate: () => {},
    },
};

/**
 * Date picker with custom width styling.
 */
export const WithCustomWidth: Story = {
    render: (args) => <MaybeNativeDatePickerWrapper {...args} />,
    args: {
        style: {width: 300},
        placeholder: "Select a date",
        updateDate: () => {},
    },
};

/**
 * Date picker for selecting dates in the past (e.g., for birthdate selection).
 * Maximum date is today, minimum is 100 years ago.
 */
export const PastDatesOnly: Story = {
    render: (args) => <MaybeNativeDatePickerWrapper {...args} />,
    args: {
        placeholder: "Enter your birthdate",
        maxDate: Temporal.Now.plainDateISO(),
        minDate: Temporal.Now.plainDateISO().subtract({years: 100}),
        updateDate: () => {},
        inputAriaLabel: "Enter your birthdate",
    },
};

/**
 * Date picker for selecting dates in the future (e.g., for appointment
 * scheduling). Minimum date is today, maximum is 1 year from now.
 */
export const FutureDatesOnly: Story = {
    render: (args) => <MaybeNativeDatePickerWrapper {...args} />,
    args: {
        placeholder: "Schedule an appointment",
        minDate: Temporal.Now.plainDateISO(),
        maxDate: Temporal.Now.plainDateISO().add({years: 1}),
        updateDate: () => {},
        inputAriaLabel: "Select appointment date",
    },
};

/**
 * Shows device detection information and which picker type will be used on
 * your current device. This is useful for debugging and understanding the
 * auto-detection behavior.
 */
export const DeviceDetection: Story = {
    render: (args) => <ComparisonView {...args} />,
    args: {
        selectedDate: Temporal.Now.plainDateISO(),
        updateDate: () => {},
    },
};

/**
 * Component for date range selection
 */
const DateRangePickersExample = () => {
    const [startDate, setStartDate] = React.useState<
        Temporal.PlainDate | null | undefined
    >(Temporal.Now.plainDateISO());
    const [endDate, setEndDate] = React.useState<
        Temporal.PlainDate | null | undefined
    >(Temporal.Now.plainDateISO().add({days: 7}));

    return (
        <View
            style={{
                padding: spacing.large_24,
                gap: spacing.large_24,
            }}
        >
            <View style={{gap: spacing.xSmall_8}}>
                <BodyText>Start Date</BodyText>
                <MaybeNativeDatePicker
                    updateDate={setStartDate}
                    selectedDate={startDate}
                    maxDate={endDate ?? undefined}
                    inputAriaLabel="Select start date"
                />
            </View>
            <View style={{gap: spacing.xSmall_8}}>
                <BodyText>End Date</BodyText>
                <MaybeNativeDatePicker
                    updateDate={setEndDate}
                    selectedDate={endDate}
                    minDate={startDate ?? undefined}
                    inputAriaLabel="Select end date"
                />
            </View>
            <Strut size={spacing.medium_16} />
            {startDate && endDate && (
                <View
                    style={{
                        padding: spacing.medium_16,
                        backgroundColor: "#f5f5f5",
                        borderRadius: 8,
                    }}
                >
                    <BodyText>Date Range:</BodyText>
                    <BodyText>
                        {startDate.toString()} to {endDate.toString()}
                    </BodyText>
                    <BodyText>
                        Duration: {startDate.until(endDate).days + 1} days
                    </BodyText>
                </View>
            )}
        </View>
    );
};

/**
 * Multiple date pickers in a form layout, demonstrating how they work together.
 * This is useful for testing date range selection flows.
 */
export const DateRangePickers: Story = {
    render: () => <DateRangePickersExample />,
};

/**
 * Component demonstrating validation behavior
 */
const ValidationBehaviorExample = () => {
    const today = Temporal.Now.plainDateISO();
    const [selectedDate, setSelectedDate] = React.useState<
        Temporal.PlainDate | null | undefined
    >(today);

    return (
        <View
            style={{
                padding: spacing.large_24,
                gap: spacing.medium_16,
            }}
        >
            <View
                style={{
                    padding: spacing.medium_16,
                    backgroundColor: "#fff3e0",
                    borderRadius: 8,
                }}
            >
                <Heading>Validation Test</Heading>
                <BodyText>
                    Try selecting a date before 7 days ago or after 7 days from
                    now.
                </BodyText>
                <BodyText>
                    • Native picker: Browser will prevent selection
                </BodyText>
                <BodyText>
                    • Custom picker: Alert will be shown (if you manage to
                    bypass the calendar UI)
                </BodyText>
            </View>
            <MaybeNativeDatePicker
                updateDate={setSelectedDate}
                selectedDate={selectedDate}
                minDate={today.subtract({days: 7})}
                maxDate={today.add({days: 7})}
                inputAriaLabel="Select date within allowed range"
            />
            {selectedDate && (
                <BodyText>Selected: {selectedDate.toString()}</BodyText>
            )}
        </View>
    );
};

/**
 * Demonstrates the validation behavior when selecting dates outside the
 * allowed range. On native pickers, this should show browser validation. On
 * custom pickers, it shows an alert (legacy behavior that should be improved).
 */
export const ValidationBehavior: Story = {
    render: () => <ValidationBehaviorExample />,
};

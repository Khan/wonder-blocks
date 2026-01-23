import type {Meta, StoryObj} from "@storybook/react-vite";
import {Temporal} from "temporal-polyfill";
import * as React from "react";

import {fr, es} from "date-fns/locale";
import Button from "@khanacademy/wonder-blocks-button";
import {View, type PropsFor} from "@khanacademy/wonder-blocks-core";
import {sizing, spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {DatePicker} from "@khanacademy/wonder-blocks-date-picker";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-date-picker/package.json";

import {allModes} from "../../.storybook/modes";

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
                padding: sizing.size_320,
            }}
        >
            <Button>prev</Button>
            <DatePicker
                {...props}
                inputAriaLabel="Choose or enter a date"
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
            inputAriaLabel="Choose or enter a date"
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
 * DatePicker component for selecting dates. It opens a calendar overlay when
 * interacting with the input field.
 */
const meta: Meta<typeof DatePicker> = {
    title: "Packages / DatePicker / DatePicker",
    component: DatePicker,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // Disabling because these stories require user interaction to open date picker
            disableSnapshot: true,
        },
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
        selectedDate: Temporal.PlainDate.from("2025-05-07"),
        updateDate: () => {},
        inputAriaLabel: "Disabled date picker",
    },
};

/**
 * Example with an explicit label and id pairing.
 * Note: using LabeledField is preferred!
 */
export const WithLabel: Story = {
    render: (args) => (
        <>
            <BodyText
                tag="label"
                htmlFor="labeled-date-picker"
                style={{marginBlockEnd: sizing.size_100}}
            >
                Choose or enter a date
            </BodyText>
            <DatePicker {...args} />
        </>
    ),
    args: {
        dateFormat: "MMMM D, YYYY",
        placeholder: "Select a date",
        updateDate: () => {},
        id: "labeled-date-picker",
    },
};

/**
 * Example using LabeledField
 */
export const WithLabeledField: Story = {
    render: (args) => (
        <LabeledField
            label="Labeled field example"
            field={<ControlledDatePicker {...args} />}
        />
    ),
    args: {
        dateFormat: "MMMM D, YYYY",
        placeholder: "Select a date",
        updateDate: () => {},
    },
};

/**
 * Example using the inputAriaLabel prop
 */
export const WithInputAriaLabel: Story = {
    render: (args) => <ControlledDatePicker {...args} />,
    args: {
        dateFormat: "MMMM D, YYYY",
        placeholder: "Select a date",
        updateDate: () => {},
        inputAriaLabel: "Super fancy input label",
    },
};

/**
 * Example with no selected date and a placeholder
 */
export const WithPlaceholder: Story = {
    args: {
        dateFormat: "MMMM D, YYYY",
        placeholder: "Select a date",
        updateDate: () => {},
    },
};

/**
 * This example shows how we can preserve the date picker element open with the
 * closeOnSelect prop.
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

/**
 * Component that opens the calendar overlay automatically for visual testing
 */
const DatePickerWithOpenOverlay = (props: Props) => {
    const [selectedDate, setSelectedDate] = React.useState<
        Temporal.PlainDate | null | undefined
    >(props.selectedDate);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        // Wait for the component to render, then click the input to open the calendar
        const timer = setTimeout(() => {
            const input = containerRef.current?.querySelector("input");
            if (input) {
                input.click();
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View
            ref={containerRef}
            style={{
                padding: spacing.large_24,
                minHeight: 400,
            }}
        >
            <DatePicker
                {...props}
                inputAriaLabel="Choose or enter a date"
                updateDate={setSelectedDate}
                selectedDate={selectedDate}
            />
        </View>
    );
};

/**
 * DatePicker with the calendar overlay already open. This story is useful for
 * visual regression testing and taking snapshots of the calendar popup.
 *
 * The calendar automatically opens when the story loads, showing a month view
 * with the current date selection and available dates within the min/max range.
 */
export const OpenCalendarOverlay: Story = {
    render: (args) => <DatePickerWithOpenOverlay {...args} />,
    args: {
        selectedDate: Temporal.PlainDate.from("2025-11-01"),
        minDate: Temporal.PlainDate.from("2025-11-01"),
        maxDate: Temporal.PlainDate.from("2026-12-31"),
        updateDate: () => {},
    },
    parameters: {
        chromatic: {
            // Re-enable snapshots for this story since the calendar is visible
            disableSnapshot: false,
            modes: {
                small: allModes.small,
                large: allModes.large,
                thunderblocks: allModes.themeThunderBlocks,
                "default rtl": allModes["themeDefault rtl"],
            },
        },
    },
};

/**
 * DatePicker with a different locale than US English. This story is useful for
 * testing localization functionality.
 */
export const WithAlternateLocale: Story = {
    render: (args) => <DatePickerWithOpenOverlay {...args} />,
    args: {
        selectedDate: Temporal.PlainDate.from("2025-11-01"),
        minDate: Temporal.PlainDate.from("2025-11-01"),
        maxDate: Temporal.PlainDate.from("2026-12-31"),
        updateDate: () => {},
        locale: fr,
        inputAriaLabel: "Choisir ou entrer une date",
    },
    parameters: {
        chromatic: {
            // Re-enable snapshots for this story since the calendar is visible
            disableSnapshot: false,
            modes: {
                small: allModes.small,
                large: allModes.large,
                thunderblocks: allModes.themeThunderBlocks,
                "default rtl": allModes["themeDefault rtl"],
            },
        },
    },
};

/**
 * DatePicker with Spanish localization showing text-based date format.
 * For example, "January 16, 2026" displays as "enero 16, 2026" in the input field.
 * The calendar overlay also shows Spanish month names and day abbreviations.
 * This uses the "MMMM D, YYYY" format which displays the full month name in Spanish.
 */
export const SpanishLocalizationTextFormat: Story = {
    render: (args) => <DatePickerWithOpenOverlay {...args} />,
    args: {
        selectedDate: Temporal.PlainDate.from("2026-01-16"),
        dateFormat: "MMMM D, YYYY",
        updateDate: () => {},
        locale: es,
        inputAriaLabel: "Elegir o introducir una fecha",
    },
    parameters: {
        chromatic: {
            disableSnapshot: false,
            modes: {
                small: allModes.small,
                large: allModes.large,
            },
        },
    },
};

/**
 * DatePicker with Spanish localization showing numeric date format.
 * Displays dates in MM/DD/YYYY format for consistency across locales.
 * For example, January 16, 2026 displays as "01/16/2026" in the input field.
 */
export const SpanishLocalizationNumericFormat: Story = {
    render: (args) => <DatePickerWithOpenOverlay {...args} />,
    args: {
        selectedDate: Temporal.PlainDate.from("2026-01-16"),
        dateFormat: "MM/DD/YYYY",
        updateDate: () => {},
        locale: es,
        inputAriaLabel: "Elegir o introducir una fecha",
    },
    parameters: {
        chromatic: {
            disableSnapshot: false,
            modes: {
                small: allModes.small,
                large: allModes.large,
            },
        },
    },
};

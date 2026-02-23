import type {Meta, StoryObj} from "@storybook/react-vite";
import {Temporal} from "temporal-polyfill";
import * as React from "react";
import {expect, userEvent, waitFor, within} from "storybook/test";

import {fr, es} from "date-fns/locale";
import Button from "@khanacademy/wonder-blocks-button";
import {View, type PropsFor} from "@khanacademy/wonder-blocks-core";
import {sizing, spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {ModalLauncher, OnePaneDialog} from "@khanacademy/wonder-blocks-modal";
import {DatePicker} from "@khanacademy/wonder-blocks-date-picker";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-date-picker/package.json";
import DatePickerArgTypes from "./date-picker.argtypes";

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
            <View style={{flexGrow: 1, maxWidth: "24rem"}}>
                <DatePicker
                    {...props}
                    inputAriaLabel="Choose or enter a date"
                    updateDate={handleUpdateDate}
                    selectedDate={selectedDate}
                />
            </View>
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
    argTypes: DatePickerArgTypes,
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

const DatePickerWithValidation = (props: Props) => {
    const minDate = Temporal.PlainDate.from("2026-01-10");
    const maxDate = Temporal.PlainDate.from("2026-01-31");

    const [selectedDate, setSelectedDate] = React.useState<
        Temporal.PlainDate | null | undefined
    >(Temporal.PlainDate.from("2026-01-16"));

    const [errorMessage, setErrorMessage] = React.useState<
        string | undefined
    >();

    const handleUpdateDate = (date?: Temporal.PlainDate | null) => {
        setSelectedDate(date);

        // Validate the date
        if (!date) {
            setErrorMessage("Please enter a valid date");
        } else if (Temporal.PlainDate.compare(date, minDate) < 0) {
            setErrorMessage(
                `Date must be on or after ${minDate.toLocaleString("en-US", {dateStyle: "long"})}`,
            );
        } else if (Temporal.PlainDate.compare(date, maxDate) > 0) {
            setErrorMessage(
                `Date must be on or before ${maxDate.toLocaleString("en-US", {dateStyle: "long"})}`,
            );
        } else {
            setErrorMessage(undefined);
        }
    };

    return (
        <LabeledField
            label="Class date"
            description="Please select a date between January 10-31, 2026"
            errorMessage={errorMessage}
            field={
                <DatePicker
                    {...props}
                    selectedDate={selectedDate}
                    updateDate={handleUpdateDate}
                    minDate={minDate}
                    maxDate={maxDate}
                    resetInvalidValueOnBlur={false}
                />
            }
        />
    );
};

/**
 * Example with validation feedback using LabeledField.
 * Disables resetInvalidValueOnBlur to retain user input for validation.
 * Shows an error message when the user types a date outside the allowed range.
 * Try editing the date to be before January 10, 2026 or after January 31, 2026.
 */
export const WithLabeledFieldAndValidation: Story = {
    render: (args) => <DatePickerWithValidation {...args} />,
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
};

/**
 * DatePicker with Spanish localization showing text-based date format.
 * For example, "January 16, 2026" displays as "enero 16, 2026" in the input field.
 * The calendar overlay also shows Spanish month names and day abbreviations.
 * This uses the "LL" dateFormat which displays the full month name in Spanish.
 */
export const SpanishLocalizationTextFormat: Story = {
    render: (args) => <DatePickerWithOpenOverlay {...args} />,
    args: {
        selectedDate: Temporal.PlainDate.from("2026-01-16"),
        updateDate: () => {},
        locale: es,
        dateFormat: "LL",
        inputAriaLabel: "Elegir o introducir una fecha",
    },
};

/**
 * DatePicker with Spanish localization showing numeric date format.
 * Displays dates in "L"" format for accuracy across locales.
 * For example, January 16, 2026 displays as "01/16/2026" in the input field.
 */
export const SpanishLocalizationNumericFormat: Story = {
    render: (args) => <DatePickerWithOpenOverlay {...args} />,
    args: {
        selectedDate: Temporal.PlainDate.from("2026-01-16"),
        updateDate: () => {},
        locale: es,
        inputAriaLabel: "Elegir o introducir una fecha",
    },
};

const DatePickerInsideModalExample = () => {
    const [selectedDate, setSelectedDate] = React.useState<
        Temporal.PlainDate | null | undefined
    >(Temporal.PlainDate.from("2026-01-16"));
    const [selectedDate2, setSelectedDate2] = React.useState<
        Temporal.PlainDate | null | undefined
    >(null);

    return (
        <ModalLauncher
            modal={({closeModal}) => (
                <OnePaneDialog
                    title="Date Picker in Modal"
                    content={
                        <View style={{gap: spacing.medium_16}}>
                            <BodyText>
                                This demonstrates DatePickers inside a modal.
                                Press Escape when focused on a date picker input
                                to test that it only closes the calendar
                                overlay, not the entire modal.
                            </BodyText>
                            <LabeledField
                                label="Start Date"
                                field={
                                    <DatePicker
                                        selectedDate={selectedDate}
                                        updateDate={setSelectedDate}
                                        placeholder="MM/DD/YYYY"
                                    />
                                }
                            />
                            <LabeledField
                                label="End Date"
                                field={
                                    <DatePicker
                                        selectedDate={selectedDate2}
                                        updateDate={setSelectedDate2}
                                        placeholder="MM/DD/YYYY"
                                    />
                                }
                            />
                        </View>
                    }
                    footer={<Button onClick={closeModal}>Close Modal</Button>}
                />
            )}
        >
            {({openModal}) => <Button onClick={openModal}>Open Modal</Button>}
        </ModalLauncher>
    );
};

/**
 * DatePicker inside a Modal to test that pressing Escape only closes the
 * calendar overlay, not the modal itself.

 */
export const InsideModal: Story = {
    render: () => <DatePickerInsideModalExample />,
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement.ownerDocument.body);

        // Open modal and focus the first date picker input so the overlay opens
        await userEvent.click(canvas.getByRole("button", {name: "Open Modal"}));
        const dialog = await canvas.findByRole("dialog", {
            name: "Date Picker in Modal",
        });
        const textboxes = await within(dialog).findAllByRole("textbox");
        const dateInput = textboxes[0];
        await userEvent.click(dateInput);

        await canvas.findByRole("grid");
        expect(dateInput).toHaveFocus();

        // fire keydown to trigger handledEscapeRef in DatePicker
        dateInput.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "Escape",
                bubbles: true,
            }),
        );

        // fire keyup to stop propagation to modal based on handledEscapeRef
        dateInput.dispatchEvent(
            new KeyboardEvent("keyup", {
                key: "Escape",
                bubbles: true,
            }),
        );

        await waitFor(() => {
            expect(canvas.queryByRole("grid")).not.toBeInTheDocument();
        });
        expect(
            canvas.getByRole("dialog", {name: "Date Picker in Modal"}),
        ).toBeInTheDocument();

        // Press Escape again to close the modal
        await userEvent.keyboard("{Escape}");
        await waitFor(() => {
            expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
        });
    },
};

/**
 * DatePicker with custom styling to demonstrate that the style prop works.
 * This example shows how to override the default width (225px) and height (40px)
 * using the style prop.
 *
 * **Examples shown:**
 * - Default width (225px) and height (40px)
 * - Custom width (350px) with default height
 * - Full width (100%) to fill parent container
 * - Custom height (48px) for larger touch targets
 */
export const WithCustomStyles: Story = {
    render: (args) => (
        <View style={{gap: spacing.large_24, maxWidth: 600}}>
            <View style={{gap: spacing.xSmall_8}}>
                <BodyText weight="bold" tag="label" htmlFor="custom-example1">
                    Date with default size (225px × 40px)
                </BodyText>
                <DatePicker
                    {...args}
                    placeholder="MM/DD/YYYY"
                    id="custom-example1"
                />
            </View>

            <View style={{gap: spacing.xSmall_8}}>
                <BodyText weight="bold" tag="label" htmlFor="custom-example2">
                    Date with custom width (350px)
                </BodyText>
                <DatePicker
                    {...args}
                    placeholder="MM/DD/YYYY"
                    id="custom-example2"
                    style={{width: 350}}
                />
            </View>

            <View style={{gap: spacing.xSmall_8}}>
                <BodyText weight="bold" tag="label" htmlFor="custom-example3">
                    Date with full width (100%)
                </BodyText>
                <DatePicker
                    {...args}
                    placeholder="MM/DD/YYYY"
                    id="custom-example3"
                    style={{width: "100%"}}
                />
            </View>

            <View style={{gap: spacing.xSmall_8}}>
                <BodyText weight="bold" tag="label" htmlFor="custom-example4">
                    Date with custom height for larger touch target (48px)
                </BodyText>
                <DatePicker
                    {...args}
                    placeholder="MM/DD/YYYY"
                    id="custom-example4"
                    style={{height: sizing.size_480}}
                />
            </View>
        </View>
    ),
    args: {
        updateDate: () => {},
    },
};

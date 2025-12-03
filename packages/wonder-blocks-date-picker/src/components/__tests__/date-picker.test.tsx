import * as React from "react";
import {describe, it} from "@jest/globals";
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
    within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as DateMock from "jest-date-mock";
import {Temporal} from "temporal-polyfill";

import Button from "@khanacademy/wonder-blocks-button";

import {
    DatePicker,
    TemporalLocaleUtils,
} from "@khanacademy/wonder-blocks-date-picker";

describe("DatePicker", () => {
    beforeEach(() => {
        // Mock getBoundingClientRect to provide realistic dimensions
        // This prevents Popper from thinking elements are out of bounds
        Element.prototype.getBoundingClientRect = jest.fn(() => ({
            width: 300,
            height: 50,
            top: 100,
            left: 100,
            bottom: 150,
            right: 400,
            x: 100,
            y: 100,
            toJSON: () => {},
        }));
    });

    it("hides the date picker overlay by default", () => {
        // Arrange

        // Act
        render(<DatePicker updateDate={() => {}} />);

        // Assert
        expect(
            screen.queryByTestId("focus-sentinel-prev"),
        ).not.toBeInTheDocument();
    });

    it("shows the date picker overlay if the input is clicked", async () => {
        // Arrange
        render(<DatePicker updateDate={() => {}} />);

        // Act
        await userEvent.click(screen.getByRole("textbox"));

        // Assert
        expect(screen.getByTestId("focus-sentinel-prev")).toBeInTheDocument();
    });

    it("shows the date picker overlay if the input is focused", async () => {
        // Arrange
        render(<DatePicker updateDate={() => {}} />);

        // Act
        await userEvent.tab();

        await expect(screen.getByRole("grid")).toBeVisible();
        // Assert
        expect(screen.getByTestId("focus-sentinel-prev")).toBeInTheDocument();
    });

    it("includes a footer if set", async () => {
        // Arrange
        render(
            <DatePicker
                updateDate={() => {}}
                footer={({close}) => (
                    <Button onClick={close}>Footer Button</Button>
                )}
            />,
        );

        // Act
        // We need first to focus on the input so we can display the picker.
        await userEvent.tab();

        // Assert
        expect(
            screen.getByRole("button", {name: /footer button/i}),
        ).toBeInTheDocument();
    });

    it("allows closing the date picker from within the footer", async () => {
        // Arrange
        render(
            <DatePicker
                updateDate={() => {}}
                footer={({close}) => (
                    <Button onClick={close}>Footer Button</Button>
                )}
            />,
        );

        // We need first to focus on the input so we can display the picker.
        await userEvent.tab();

        await userEvent.click(
            screen.getByRole("button", {name: /footer button/i}),
        );

        // Assert
        await waitFor(() => {
            expect(screen.queryByRole("grid")).not.toBeInTheDocument();
        });
    });

    it("closes the date picker if ESC is pressed", async () => {
        // Arrange
        render(<DatePicker updateDate={() => {}} />);

        // We need first to focus on the input so we can display the picker.
        await userEvent.tab();

        // Act
        await userEvent.type(screen.getByRole("textbox"), "{Esc}");

        // Assert
        expect(
            screen.queryByTestId("focus-sentinel-prev"),
        ).not.toBeInTheDocument();
    });

    it("closes the date picker if the input is blurred", async () => {
        // Arrange
        render(<DatePicker updateDate={() => {}} />);

        // We need first to focus on the input so we can display the picker.
        await userEvent.tab();

        // Act
        fireEvent.blur(screen.getByRole("textbox"));

        // Assert
        expect(
            screen.queryByTestId("focus-sentinel-prev"),
        ).not.toBeInTheDocument();
    });

    it("closes the date picker if we click outside the container", async () => {
        // Arrange
        render(<DatePicker updateDate={() => {}} />);

        // We need first to focus on the input so we can display the picker.
        await userEvent.tab();

        // Act
        // Click outside the picker and input
        act(() => document.dispatchEvent(new MouseEvent("mouseup")));

        // Assert
        await waitFor(() => {
            expect(
                screen.queryByTestId("focus-sentinel-prev"),
            ).not.toBeInTheDocument();
        });
    });

    it("closes the date picker if a date is selected", async () => {
        // Arrange
        const today = new Date("2023-05-10T09:30:00");
        // Allows opening the calendar on a specific date.
        // NOTE: This happens because the Calendar component uses the current
        // date to open the calendar by default (in case there's no initial
        // selectedDate set).
        DateMock.advanceTo(today);

        const minDate = Temporal.PlainDate.from("2023-05-07");
        const maxDate = Temporal.PlainDate.from("2023-05-22");
        const updateDateMock = jest.fn();

        render(
            <DatePicker
                minDate={minDate}
                maxDate={maxDate}
                updateDate={updateDateMock}
            />,
        );

        // We need first to focus on the input so we can display the picker.
        await userEvent.tab();

        // Act
        // Select a date
        await userEvent.click(screen.getByText("15"));

        // Assert
        await waitFor(() => {
            expect(screen.queryByRole("grid")).not.toBeInTheDocument();
        });
    });

    it("does not close the date picker if a date is selected and closeOnSelect is set false", async () => {
        // Arrange
        const today = new Date("2023-05-10T09:30:00");
        // Allows opening the calendar on a specific date.
        // NOTE: This happens because the Calendar component uses the current
        // date to open the calendar by default (in case there's no initial
        // selectedDate set).
        DateMock.advanceTo(today);

        const minDate = Temporal.PlainDate.from("2023-05-07");
        const maxDate = Temporal.PlainDate.from("2023-05-22");
        const updateDateMock = jest.fn();

        render(
            <DatePicker
                closeOnSelect={false}
                minDate={minDate}
                maxDate={maxDate}
                updateDate={updateDateMock}
            />,
        );

        // We need first to focus on the input so we can display the picker.
        await userEvent.tab();

        // Act
        // Select a date
        await userEvent.click(screen.getByText("15"));

        // Assert
        await expect(screen.getByRole("grid")).toBeInTheDocument();
    });

    it("changes the date in the input if we pick a date from the overlay", async () => {
        // Arrange
        const selectedDate = Temporal.PlainDate.from("2021-05-07");
        const updateDateMock = jest.fn();
        const dateFormat = "YYYY-MM-DD";

        render(
            <DatePicker
                selectedDate={selectedDate}
                updateDate={updateDateMock}
                dateFormat={dateFormat}
            />,
        );

        // We need first to focus on the input so we can display the picker.
        await userEvent.tab();

        // Act
        await userEvent.click(screen.getByText("15"));

        // Assert
        // We'd want to ensure that the input is updated with the picker value.
        expect(
            screen.getByDisplayValue(
                TemporalLocaleUtils.formatDate(
                    Temporal.PlainDate.from("2021-05-15"),
                    dateFormat,
                    "en-US",
                ),
            ),
        ).toBeInTheDocument();
    });

    it("changes the date in the picker if we type in a valid date", async () => {
        // Arrange
        const minDate = Temporal.PlainDate.from("2021-05-05");
        const selectedDate = Temporal.PlainDate.from("2021-05-07");
        const maxDate = Temporal.PlainDate.from("2021-05-12");
        const updateDateMock = jest.fn();
        const dateFormat = "YYYY-MM-DD";

        render(
            <DatePicker
                selectedDate={selectedDate}
                updateDate={updateDateMock}
                dateFormat={dateFormat}
                minDate={minDate}
                maxDate={maxDate}
            />,
        );

        // We need first to focus on the input so we can display the picker.
        await userEvent.tab();

        const input = screen.getByRole("textbox");
        // Act
        await userEvent.clear(input);
        await userEvent.type(input, "2021-05-10");

        // Assert
        const gridcell = screen.getByRole("gridcell", {selected: true});
        expect(
            within(gridcell).getByRole("button", {
                name: "Monday, May 10th, 2021, selected",
            }),
        );
    });

    it("does not modify the current date if current input contains an invalid format", async () => {
        // Arrange
        const minDate = Temporal.PlainDate.from("2021-05-05");
        const selectedDate = Temporal.PlainDate.from("2021-05-07");
        const maxDate = Temporal.PlainDate.from("2021-05-12");
        const updateDateMock = jest.fn();
        const dateFormat = "YYYY-MM-DD";

        render(
            <DatePicker
                selectedDate={selectedDate}
                updateDate={updateDateMock}
                dateFormat={dateFormat}
                minDate={minDate}
                maxDate={maxDate}
            />,
        );

        // We need first to focus on the input so we can display the picker.
        await userEvent.tab();

        // Act
        await userEvent.clear(screen.getByRole("textbox"));
        await userEvent.type(screen.getByRole("textbox"), "2021-55-55");

        // Assert
        const gridcell = screen.getByRole("gridcell", {selected: true});
        expect(
            within(gridcell).getByRole("button", {
                name: "Friday, May 7th, 2021, selected",
            }),
        );
    });

    it("uses default aria-label when no inputAriaLabel prop is provided", async () => {
        // Arrange
        render(<DatePicker updateDate={() => {}} />);

        // Act
        const input = screen.getByRole("textbox");

        // Assert
        expect(input).toHaveAttribute("aria-label", "Choose or enter a date");
    });

    it("uses custom aria-label when inputAriaLabel prop is provided for start date", async () => {
        // Arrange
        render(
            <DatePicker
                updateDate={() => {}}
                inputAriaLabel="Choose or enter a start date"
            />,
        );

        // Act
        const input = screen.getByRole("textbox");

        // Assert
        expect(input).toHaveAttribute(
            "aria-label",
            "Choose or enter a start date",
        );
    });

    it("uses custom aria-label when inputAriaLabel prop is provided for end date", async () => {
        // Arrange
        render(
            <DatePicker
                updateDate={() => {}}
                inputAriaLabel="Choose or enter an end date"
            />,
        );

        // Act
        const input = screen.getByRole("textbox");

        // Assert
        expect(input).toHaveAttribute(
            "aria-label",
            "Choose or enter an end date",
        );
    });
});

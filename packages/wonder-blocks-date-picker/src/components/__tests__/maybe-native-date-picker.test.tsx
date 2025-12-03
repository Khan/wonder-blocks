import * as React from "react";
import {afterEach, beforeEach, describe, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as DateMock from "jest-date-mock";
import {Temporal} from "temporal-polyfill";

import {MaybeNativeDatePicker} from "@khanacademy/wonder-blocks-date-picker";

describe("MaybeNativeDatePicker", () => {
    const originalOnTouchStart = window.ontouchstart;
    const originalAlert = window.alert;

    beforeEach(() => {
        // For the purposes of these tests, we don't want the native date
        // picker so we turn it off.
        delete window.ontouchstart;

        // Mock window.alert to prevent "Not implemented" errors in JSDOM
        window.alert = jest.fn();

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

    afterEach(() => {
        window.ontouchstart = originalOnTouchStart;
        window.alert = originalAlert;
    });

    it("renders the date picker if the date input is clicked", async () => {
        // Arrange
        render(
            <MaybeNativeDatePicker updateDate={() => {}} id="date-picker" />,
        );

        // Act
        // Wait for lazy-loaded DatePicker to render
        const textbox = await screen.findByTestId("date-picker-input");
        await userEvent.click(textbox);

        // Assert
        // make sure date picker opened - the calendar should be visible
        expect(screen.getByRole("grid")).toBeInTheDocument();
    });

    it("calls updateDate if the date is valid (with an initial selectedDate)", async () => {
        // Arrange
        const today = new Date("2023-05-10T09:30:00");
        // Allows opening the calendar on a specific date.
        // NOTE: This happens because the Calendar component uses the current
        // date to open the calendar by default (in case there's no initial
        // selectedDate set).
        DateMock.advanceTo(today);

        const updateDateMock = jest.fn();

        const startOfNextMonth = Temporal.Now.plainDateISO()
            .add({months: 1})
            .with({day: 1});

        render(
            <MaybeNativeDatePicker
                minDate={startOfNextMonth}
                maxDate={startOfNextMonth.add({days: 10})}
                selectedDate={startOfNextMonth}
                updateDate={updateDateMock}
                id="date-picker"
            />,
        );

        // Act
        const textbox = await screen.findByTestId("date-picker-input");
        await userEvent.click(textbox);

        // Pick a valid date
        const validDay = startOfNextMonth.add({days: 2});
        const dayButton = await screen.findByText(validDay.day.toString());
        await userEvent.click(dayButton);

        // Assert
        expect(updateDateMock).toHaveBeenCalled();
    });

    it("calls update if the date is valid (with no initial selectedDate)", async () => {
        // Arrange
        // TODO(FEI-5171): Remove the use of jest-date-mock once the component has been
        // updated to show the month for `minDate` when `selectedDate` is not set.
        jest.useRealTimers();
        DateMock.advanceTo("01-01-2023 09:00");

        const updateDateMock = jest.fn();

        const today = Temporal.Now.plainDateISO();

        render(
            <MaybeNativeDatePicker
                minDate={today}
                maxDate={today.add({days: 10})}
                selectedDate={today}
                updateDate={updateDateMock}
                id="date-picker"
            />,
        );

        // Act
        const textbox = await screen.findByTestId("date-picker-input");
        await userEvent.click(textbox);

        // Pick a valid date
        const validDay = today.add({days: 2});
        const dayButton = await screen.findByText(validDay.day.toString());
        await userEvent.click(dayButton);

        // Assert
        expect(updateDateMock).toHaveBeenCalled();
    });
});

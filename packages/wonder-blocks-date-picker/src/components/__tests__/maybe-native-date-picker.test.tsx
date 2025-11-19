import {afterEach, beforeEach, describe, expect, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as DateMock from "jest-date-mock";
import moment from "moment";

import MaybeNativeDatePicker from "../maybe-native-date-picker.tsx";

describe("MaybeNativeDatePicker", () => {
    const originalOnTouchStart = window.ontouchstart;

    beforeEach(() => {
        // For the purposes of these tests, we don't want the native date
        // picker so we turn it off.
        delete window.ontouchstart;
    });

    afterEach(() => {
        window.ontouchstart = originalOnTouchStart;
    });

    it("renders the date picker if the date input is clicked", async () => {
        // Arrange
        render(
            <MaybeNativeDatePicker updateDate={() => {}} id="date-picker" />,
        );

        // Act
        const textbox = await screen.findByTestId("date-picker-input");
        await userEvent.click(textbox);

        // Assert
        // make sure date picker opened
        await screen.findByTitle(/wednesday/i);
    });

    it("calls updateDate if the date is valid (with an initial selectedDate)", async () => {
        // Arrange
        const today = moment("2023-05-10 09:30").toDate();
        // Allows opening the calendar on a specific date.
        // NOTE: This happens because the Calendar component uses the current
        // date to open the calendar by default (in case there's no initial
        // selectedDate set).
        DateMock.advanceTo(today);

        const updateDateMock = jest.fn();

        const startOfNextMonth = moment()
            .add(1, "month")
            .startOf("month")
            .format("YYYY-MM-DD");

        render(
            <MaybeNativeDatePicker
                minDate={moment(startOfNextMonth)}
                maxDate={moment(startOfNextMonth).add(10, "day")}
                selectedDate={moment(startOfNextMonth)}
                updateDate={updateDateMock}
                id="date-picker"
            />,
        );

        // Act
        const textbox = await screen.findByTestId("date-picker-input");
        await userEvent.click(textbox);

        // Pick a valid date
        const validDay = moment(startOfNextMonth).add(2, "day").startOf("day");
        const dayButton = await screen.findByText(validDay.format("D"));
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

        render(
            <MaybeNativeDatePicker
                minDate={moment()}
                maxDate={moment().add(10, "day")}
                selectedDate={moment()}
                updateDate={updateDateMock}
                id="date-picker"
            />,
        );

        // Act
        const textbox = await screen.findByTestId("date-picker-input");
        await userEvent.click(textbox);

        // Pick a valid date
        const validDay = moment().add(2, "day").startOf("day");
        const dayButton = await screen.findByText(validDay.format("D"));
        await userEvent.click(dayButton);

        // Assert
        expect(updateDateMock).toHaveBeenCalled();
    });
});

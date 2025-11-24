import React from "react";
import {describe, it} from "@jest/globals";
import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Temporal} from "temporal-polyfill";
import {
    TemporalLocaleUtils,
    DatePickerInput,
} from "@khanacademy/wonder-blocks-date-picker";

describe("DatePickerInput", () => {
    it("adds a default value as initial date", async () => {
        // Arrange
        const validDate = "2021-05-13";

        // Act
        render(<DatePickerInput value={validDate} />);

        // Assert
        expect(await screen.findByRole("textbox")).toHaveValue(validDate);
    });

    it("mount: does not change the selected date if it is within range", () => {
        // Arrange
        const validDate = "2021-05-13";
        const onChangeSpy = jest.fn();
        const dateFormat = "YYYY-MM-DD";

        // Act
        render(
            <DatePickerInput
                dateFormat={dateFormat}
                value={validDate}
                parseDate={TemporalLocaleUtils.parseDateToJsDate}
                onChange={onChangeSpy}
                modifiers={{
                    selected: TemporalLocaleUtils.temporalDateToJsDate(
                        Temporal.PlainDate.from(validDate),
                    ),
                    // We want to disable past dates and dates after 10 days from now
                    disabled: (date) => {
                        // (minDate && moment(date) < minDate.startOf("day")) ||
                        // (maxDate && moment(date) > maxDate.endOf("day")),
                        // Convert native Date to Temporal.PlainDate for accurate date-only comparison
                        const plain = Temporal.PlainDate.from({
                            year: date.getFullYear(),
                            month: date.getMonth() + 1,
                            day: date.getDate(),
                        });

                        const today = Temporal.Now.plainDateISO();
                        const min = today;
                        const max = today.add({days: 10});

                        return plain < min || plain > max;
                    },
                }}
                testId="date-picker-input"
            />,
        );

        // Assert
        expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it("mount: calls onChange with null if the value is empty", () => {
        // Arrange
        // Passing in an invalid day (43)
        const onChangeSpy = jest.fn();
        const minDate = Temporal.PlainDate.from("2021-05-13");
        const maxDate = Temporal.PlainDate.from("2021-05-13").add({days: 10});
        const dateFormat = "YYYY-MM-DD";

        // Act
        render(
            <DatePickerInput
                dateFormat={dateFormat}
                value=""
                parseDate={TemporalLocaleUtils.parseDateToJsDate}
                onChange={onChangeSpy}
                modifiers={{
                    // We want to disable past dates and dates after 10 days from now
                    disabled: (date) => {
                        const plain = Temporal.PlainDate.from({
                            year: date.getFullYear(),
                            month: date.getMonth() + 1,
                            day: date.getDate(),
                        });
                        return (
                            Temporal.PlainDate.compare(plain, minDate) < 0 ||
                            Temporal.PlainDate.compare(plain, maxDate) > 0
                        );
                    },
                }}
            />,
        );

        // Assert
        expect(onChangeSpy).toHaveBeenCalledWith(null, {});
    });

    it("calls onChange with null if the date is invalid", () => {
        // Arrange
        // Passing in an invalid day (43)
        const invalidDate = "2021-05-43";
        const onChangeSpy = jest.fn();
        const minDate = Temporal.PlainDate.from("2021-05-13");
        const maxDate = Temporal.PlainDate.from("2021-05-13").add({days: 10});
        const dateFormat = "YYYY-MM-DD";

        // Act
        render(
            <DatePickerInput
                dateFormat={dateFormat}
                value={invalidDate}
                parseDate={TemporalLocaleUtils.parseDateToJsDate}
                onChange={onChangeSpy}
                modifiers={{
                    // We want to disable past dates and dates after 10 days from now
                    disabled: (date) => {
                        const plain = Temporal.PlainDate.from({
                            year: date.getFullYear(),
                            month: date.getMonth() + 1,
                            day: date.getDate(),
                        });
                        return (
                            Temporal.PlainDate.compare(plain, minDate) < 0 ||
                            Temporal.PlainDate.compare(plain, maxDate) > 0
                        );
                    },
                }}
            />,
        );

        // Assert
        expect(onChangeSpy).toHaveBeenCalledWith(null, {});
    });

    it("calls onChange with null if the date is disabled", () => {
        // Arrange
        // Passing in a date 1 day before of the valid range
        const disabledDate = "2021-05-12";
        const onChangeSpy = jest.fn();
        const minDate = Temporal.PlainDate.from("2021-05-13");
        const maxDate = Temporal.PlainDate.from("2021-05-13").add({days: 10});
        const dateFormat = "YYYY-MM-DD";

        // Act
        render(
            <DatePickerInput
                dateFormat={dateFormat}
                value={disabledDate}
                parseDate={TemporalLocaleUtils.parseDateToJsDate}
                getModifiersForDay={TemporalLocaleUtils.getModifiersForDay}
                onChange={onChangeSpy}
                modifiers={{
                    // We want to disable past dates and dates after 10 days from now
                    disabled: (date) => {
                        const plain = Temporal.PlainDate.from({
                            year: date.getFullYear(),
                            month: date.getMonth() + 1,
                            day: date.getDate(),
                        });
                        return (
                            Temporal.PlainDate.compare(plain, minDate) < 0 ||
                            Temporal.PlainDate.compare(plain, maxDate) > 0
                        );
                    },
                }}
            />,
        );

        // Assert
        expect(onChangeSpy).toHaveBeenCalledWith(null, {});
    });

    it("updates the value and calls onChange if the date is valid", async () => {
        // Arrange
        // Passing in a date 1 day before of the valid range
        const initialDate = "2021-05-12";
        const onChangeSpy = jest.fn();
        const minDate = Temporal.PlainDate.from(initialDate);
        const maxDate = Temporal.PlainDate.from(initialDate).add({days: 10});
        const dateFormat = "YYYY-MM-DD";

        render(
            <DatePickerInput
                dateFormat={dateFormat}
                value={initialDate}
                parseDate={TemporalLocaleUtils.parseDateToJsDate}
                onChange={onChangeSpy}
                modifiers={{
                    selected: TemporalLocaleUtils.temporalDateToJsDate(
                        Temporal.PlainDate.from(initialDate),
                    ),
                    // We want to disable past dates and dates after 10 days from now
                    disabled: (date) => {
                        const plain = Temporal.PlainDate.from({
                            year: date.getFullYear(),
                            month: date.getMonth() + 1,
                            day: date.getDate(),
                        });
                        return (
                            Temporal.PlainDate.compare(plain, minDate) < 0 ||
                            Temporal.PlainDate.compare(plain, maxDate) > 0
                        );
                    },
                }}
                testId="date-picker-input"
            />,
        );

        // Act
        // change the date to 2 days in the future
        const input = await screen.findByTestId("date-picker-input");
        await userEvent.click(input);
        await userEvent.clear(input);
        await userEvent.paste("2021-05-14");

        // Assert
        expect(onChangeSpy).toHaveBeenCalledWith(
            TemporalLocaleUtils.temporalDateToJsDate(
                Temporal.PlainDate.from("2021-05-14"),
            ),
            {},
        );
    });

    it("should allow clicking the input by default", async () => {
        // Arrange
        const onClickSpy = jest.fn();
        render(
            <DatePickerInput
                value="2021-05-12"
                disabled={false}
                onClick={onClickSpy}
                testId="date-picker-input"
            />,
        );

        // Act
        await userEvent.click(await screen.findByTestId("date-picker-input"));

        // Assert
        expect(onClickSpy).toHaveBeenCalled();
    });

    it("should not allow clicking the input if it's disabled", async () => {
        // Arrange
        const onClickSpy = jest.fn();
        render(
            <DatePickerInput
                value="2021-05-12"
                disabled={true}
                onClick={onClickSpy}
                testId="date-picker-input"
            />,
        );

        // Act
        await userEvent.click(await screen.findByTestId("date-picker-input"));

        // Assert
        expect(onClickSpy).not.toHaveBeenCalled();
    });

    it("onBlur: reverts back to the latest valid input if the current one is invalid", async () => {
        // Arrange
        const validDate = "2021-05-15";
        const onChangeSpy = jest.fn();
        const minDate = Temporal.PlainDate.from("2021-05-13");
        const maxDate = Temporal.PlainDate.from("2021-05-13").add({days: 10});
        const dateFormat = "YYYY-MM-DD";

        render(
            <DatePickerInput
                dateFormat={dateFormat}
                value={validDate}
                parseDate={TemporalLocaleUtils.parseDateToJsDate}
                onChange={onChangeSpy}
                modifiers={{
                    // We want to disable past dates and dates after 10 days from now
                    disabled: (date) => {
                        const plain = Temporal.PlainDate.from({
                            year: date.getFullYear(),
                            month: date.getMonth() + 1,
                            day: date.getDate(),
                        });
                        return (
                            Temporal.PlainDate.compare(plain, minDate) < 0 ||
                            Temporal.PlainDate.compare(plain, maxDate) > 0
                        );
                    },
                }}
                testId="date-picker-input"
            />,
        );

        // Passing in an invalid day (43)
        await userEvent.type(
            await screen.findByTestId("date-picker-input"),
            "{selectall}2021-05-43",
        );

        // Act
        fireEvent.blur(await screen.findByTestId("date-picker-input"));

        // Assert
        expect(await screen.findByTestId("date-picker-input")).toHaveValue(
            validDate,
        );
    });
});

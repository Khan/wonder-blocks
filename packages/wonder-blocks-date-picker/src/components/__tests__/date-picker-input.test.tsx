import React from "react";
import {describe, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Temporal} from "temporal-polyfill";
import {TemporalLocaleUtils} from "@khanacademy/wonder-blocks-date-picker";
import DatePickerInput from "../date-picker-input";

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

    it("updates the value and calls onChange on blur if the date is valid", async () => {
        // Arrange
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

        // Act - type new date and blur
        const input = screen.getByTestId("date-picker-input");
        await userEvent.click(input);
        await userEvent.clear(input);
        await userEvent.type(input, "2021-05-14");
        await userEvent.tab(); // blur

        // Assert - onChange called on blur, not during typing
        expect(onChangeSpy).toHaveBeenCalledWith(
            TemporalLocaleUtils.temporalDateToJsDate(
                Temporal.PlainDate.from("2021-05-14"),
            ),
            {},
            "2021-05-14",
        );
    });

    it("calls onChange when a valid date is pasted", async () => {
        // Arrange
        const onChangeSpy = jest.fn();
        render(
            <DatePickerInput
                dateFormat="YYYY-MM-DD"
                value=""
                parseDate={TemporalLocaleUtils.parseDateToJsDate}
                onChange={onChangeSpy}
                testId="date-picker-input"
            />,
        );

        // Act
        const input = screen.getByTestId("date-picker-input");
        await userEvent.click(input);
        await userEvent.paste("2021-05-14");

        // Assert
        expect(onChangeSpy).toHaveBeenCalledWith(
            TemporalLocaleUtils.temporalDateToJsDate(
                Temporal.PlainDate.from("2021-05-14"),
            ),
            {},
            "2021-05-14",
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
        await userEvent.click(screen.getByTestId("date-picker-input"));

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
        await userEvent.click(screen.getByTestId("date-picker-input"));

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

        const input = await screen.findByTestId("date-picker-input");
        await userEvent.clear(input);
        await userEvent.type(input, "2021-05-43");

        // Act - blur by clicking outside
        await userEvent.click(document.body);

        // Assert - Invalid date text reverts to last valid value (default behavior)
        expect(input).toHaveValue(validDate);
    });

    it("does not reformat input while user is typing", async () => {
        // Arrange
        const onChangeSpy = jest.fn();
        render(
            <DatePickerInput
                dateFormat="M/D/YYYY"
                value=""
                parseDate={TemporalLocaleUtils.parseDateToJsDate}
                onChange={onChangeSpy}
                testId="date-picker-input"
            />,
        );

        const input = screen.getByTestId("date-picker-input");
        await userEvent.click(input);

        // Act - type partial date while focused
        await userEvent.type(input, "1/28/20");

        // Assert - input should keep raw typed value, not be reformatted
        expect(input).toHaveValue("1/28/20");
    });

    it("keeps raw input value while focused even when prop value changes", async () => {
        // Arrange
        const {rerender} = render(
            <DatePickerInput
                dateFormat="YYYY-MM-DD"
                value="2021-05-15"
                parseDate={TemporalLocaleUtils.parseDateToJsDate}
                testId="date-picker-input"
            />,
        );

        const input = screen.getByTestId("date-picker-input");
        await userEvent.click(input);
        await userEvent.clear(input);
        await userEvent.type(input, "2021-05-");

        // Act - parent tries to update with formatted value while user is typing
        rerender(
            <DatePickerInput
                dateFormat="YYYY-MM-DD"
                value="2021-05-15"
                parseDate={TemporalLocaleUtils.parseDateToJsDate}
                testId="date-picker-input"
            />,
        );

        // Assert - input should keep the user's partial input
        expect(input).toHaveValue("2021-05-");
    });

    it("accepts ISO format input without reformatting while typing", async () => {
        // Arrange
        const handleChange = jest.fn();
        render(
            <DatePickerInput
                value=""
                onChange={handleChange}
                dateFormat="M/D/YYYY"
                parseDate={TemporalLocaleUtils.parseDateToJsDate}
                testId="date-input"
            />,
        );

        const input = screen.getByTestId("date-input");
        await userEvent.click(input);

        // Act - type ISO format date (common in programmatic/e2e tests)
        await userEvent.type(input, "2026-01-28");

        // Assert - input preserves the ISO format exactly as typed
        expect(input).toHaveValue("2026-01-28");
    });

    it("does not corrupt ISO date when typed character-by-character (e2e scenario)", async () => {
        // Arrange - simulates Cypress .type() which types one character at a time
        const dateString = "2026-01-28";
        render(
            <DatePickerInput
                value=""
                onChange={jest.fn()}
                dateFormat="M/D/YYYY"
                parseDate={TemporalLocaleUtils.parseDateToJsDate}
                testId="date-input"
            />,
        );

        const input = screen.getByTestId("date-input");
        await userEvent.click(input);

        // Act - type each character individually (like e2e tests do)
        for (const char of dateString) {
            await userEvent.type(input, char);
        }

        // Assert - the exact string is preserved, not corrupted like "1/21/20269"
        expect(input).toHaveValue(dateString);
    });

    it("keyboard navigation: Tab in, type, Tab out works properly", async () => {
        // Arrange
        const onChangeSpy = jest.fn();
        render(
            <>
                <button>Before</button>
                <DatePickerInput
                    dateFormat="M/D/YYYY"
                    value="1/1/2026"
                    parseDate={TemporalLocaleUtils.parseDateToJsDate}
                    onChange={onChangeSpy}
                    testId="date-picker-input"
                />
                <button>After</button>
            </>,
        );

        onChangeSpy.mockClear();

        // Act - Tab to input and type a complete date
        await userEvent.tab();
        await userEvent.tab();
        const input = screen.getByTestId("date-picker-input");
        await userEvent.clear(input);
        await userEvent.type(input, "1/28/2026");

        // Assert - onChange called with valid date
        expect(onChangeSpy).toHaveBeenCalledWith(
            TemporalLocaleUtils.temporalDateToJsDate(
                Temporal.PlainDate.from("2026-01-28"),
            ),
            {},
            "1/28/2026",
        );
    });

    it("validates complete dates while typing", async () => {
        // Arrange
        const onChangeSpy = jest.fn();
        render(
            <DatePickerInput
                dateFormat="M/D/YYYY"
                value="1/1/2026"
                parseDate={TemporalLocaleUtils.parseDateToJsDate}
                onChange={onChangeSpy}
                testId="date-picker-input"
            />,
        );

        const input = screen.getByTestId("date-picker-input");
        onChangeSpy.mockClear();

        // Act - Type a complete valid date
        await userEvent.clear(input);
        await userEvent.type(input, "1/28/2026");

        // Assert - onChange called when complete valid date is typed
        expect(onChangeSpy).toHaveBeenCalledWith(
            TemporalLocaleUtils.temporalDateToJsDate(
                Temporal.PlainDate.from("2026-01-28"),
            ),
            {},
            "1/28/2026",
        );
    });

    it("strict parsing: rejects partial dates", async () => {
        // Arrange
        const onChangeSpy = jest.fn();
        render(
            <DatePickerInput
                dateFormat="M/D/YYYY"
                value=""
                parseDate={TemporalLocaleUtils.parseDateToJsDate}
                onChange={onChangeSpy}
                testId="date-picker-input"
            />,
        );

        const input = screen.getByTestId("date-picker-input");
        await userEvent.click(input);

        // Act - type partial dates
        await userEvent.type(input, "1/28");
        await userEvent.tab(); // blur

        // Assert - partial date is rejected (not parsed)
        expect(onChangeSpy).toHaveBeenCalledWith(null, {});
    });

    it("strict parsing: accepts ISO format regardless of specified format", async () => {
        // Arrange
        const onChangeSpy = jest.fn();
        render(
            <DatePickerInput
                dateFormat="M/D/YYYY"
                value=""
                parseDate={TemporalLocaleUtils.parseDateToJsDate}
                onChange={onChangeSpy}
                testId="date-picker-input"
            />,
        );

        const input = screen.getByTestId("date-picker-input");
        await userEvent.click(input);

        // Act - type ISO format (common for e2e/programmatic input)
        await userEvent.type(input, "2026-01-28");

        // Assert - ISO format is accepted
        expect(onChangeSpy).toHaveBeenCalledWith(
            TemporalLocaleUtils.temporalDateToJsDate(
                Temporal.PlainDate.from("2026-01-28"),
            ),
            {},
            "2026-01-28",
        );
    });
});

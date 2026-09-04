import {describe, it, expect, jest} from "@jest/globals";
import {renderHook} from "@testing-library/react";
import * as React from "react";
import {Temporal} from "temporal-polyfill";

import {TemporalLocaleUtils} from "../../util/temporal-locale-utils";
import {useDateSegmentArrowKeys} from "../use-date-segment-arrow-keys";

// Passing `undefined` explicitly for dateFormat falls back to the default
// below (a JS default-parameter quirk) rather than selecting the
// locale-aware format -- pass "L" for that instead.
function setup(
    value: string,
    dateFormat: string | undefined = "MM/DD/YYYY",
    dir?: "rtl",
    locale = "en-US",
) {
    const input = document.createElement("input");
    input.value = value;
    if (dir) {
        input.setAttribute("dir", dir);
    }
    document.body.appendChild(input);
    const innerRef: React.RefObject<HTMLInputElement | null> = {
        current: input,
    };
    const handleChange = jest.fn();

    const {result, rerender} = renderHook(
        ({value: v}) =>
            useDateSegmentArrowKeys({
                value: v,
                dateFormat,
                locale,
                parseDate: TemporalLocaleUtils.parseDateToJsDate,
                handleChange,
                innerRef,
            }),
        {initialProps: {value}},
    );

    return {input, handleChange, result, rerender};
}

describe("useDateSegmentArrowKeys", () => {
    it("returns false for keys other than the handled arrow keys", () => {
        // Arrange
        const {input, result} = setup("01/16/2026");
        input.setSelectionRange(1, 1);
        const e = {
            key: "Enter",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        const handled = result.current(e);

        // Assert
        expect(handled).toBe(false);
    });

    it("does not call preventDefault for keys other than the handled arrow keys", () => {
        // Arrange
        const {input, result} = setup("01/16/2026");
        input.setSelectionRange(1, 1);
        const e = {
            key: "Enter",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);

        // Assert
        expect(e.preventDefault).not.toHaveBeenCalled();
    });

    it("returns false when the current value isn't a valid date", () => {
        // Arrange
        const {input, result} = setup("not-a-date");
        input.setSelectionRange(1, 1);
        const e = {
            key: "ArrowDown",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        const handled = result.current(e);

        // Assert
        expect(handled).toBe(false);
    });

    it("does not call handleChange when the current value isn't a valid date", () => {
        // Arrange
        const {input, result, handleChange} = setup("not-a-date");
        input.setSelectionRange(1, 1);
        const e = {
            key: "ArrowDown",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);

        // Assert
        expect(handleChange).not.toHaveBeenCalled();
    });

    it("returns false for a text dateFormat", () => {
        // Arrange
        const {input, result} = setup("January 16, 2026", "MMMM D, YYYY");
        input.setSelectionRange(1, 1);
        const e = {
            key: "ArrowDown",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        const handled = result.current(e);

        // Assert
        expect(handled).toBe(false);
    });

    it("does not call handleChange for a text dateFormat", () => {
        // Arrange
        const {input, result, handleChange} = setup(
            "January 16, 2026",
            "MMMM D, YYYY",
        );
        input.setSelectionRange(1, 1);
        const e = {
            key: "ArrowDown",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);

        // Assert
        expect(handleChange).not.toHaveBeenCalled();
    });

    it("returns true when it handles the key", () => {
        // Arrange
        const {input, result} = setup("01/16/2026");
        input.setSelectionRange(4, 4);
        const e = {
            key: "ArrowDown",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        const handled = result.current(e);

        // Assert
        expect(handled).toBe(true);
    });

    it("calls preventDefault when it handles the key", () => {
        // Arrange
        const {input, result} = setup("01/16/2026");
        input.setSelectionRange(4, 4);
        const e = {
            key: "ArrowDown",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);

        // Assert
        expect(e.preventDefault).toHaveBeenCalled();
    });

    it("decrements the day segment on ArrowDown", () => {
        // Arrange
        const {input, result, handleChange} = setup("01/16/2026");
        input.setSelectionRange(4, 4);
        const e = {
            key: "ArrowDown",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);

        // Assert
        expect(handleChange).toHaveBeenCalledWith("01/15/2026");
    });

    it("increments the month segment on ArrowUp", () => {
        // Arrange
        const {input, result, handleChange} = setup("01/16/2026");
        input.setSelectionRange(1, 1);
        const e = {
            key: "ArrowUp",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);

        // Assert
        expect(handleChange).toHaveBeenCalledWith("02/16/2026");
    });

    it("increments the year segment on ArrowUp", () => {
        // Arrange
        const {input, result, handleChange} = setup("01/16/2026");
        input.setSelectionRange(8, 8);
        const e = {
            key: "ArrowUp",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);

        // Assert
        expect(handleChange).toHaveBeenCalledWith("01/16/2027");
    });

    it("repositions the caret's start to the same segment's new range after the value updates", () => {
        // Arrange
        const {input, result, rerender} = setup("01/09/2026");
        input.setSelectionRange(4, 4);
        const e = {
            key: "ArrowUp",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);
        input.value = "01/10/2026";
        rerender({value: "01/10/2026"});

        // Assert
        expect(input.selectionStart).toBe(3);
    });

    it("repositions the caret's end to the same segment's new range after the value updates", () => {
        // Arrange
        const {input, result, rerender} = setup("01/09/2026");
        input.setSelectionRange(4, 4);
        const e = {
            key: "ArrowUp",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);
        input.value = "01/10/2026";
        rerender({value: "01/10/2026"});

        // Assert
        expect(input.selectionEnd).toBe(5);
    });

    it("selects the start of the day segment when ArrowRight is pressed on the month segment", () => {
        // Arrange
        const {input, result} = setup("01/16/2026");
        input.setSelectionRange(1, 1);
        const e = {
            key: "ArrowRight",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);

        // Assert
        expect(input.selectionStart).toBe(3);
    });

    it("selects the end of the day segment when ArrowRight is pressed on the month segment", () => {
        // Arrange
        const {input, result} = setup("01/16/2026");
        input.setSelectionRange(1, 1);
        const e = {
            key: "ArrowRight",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);

        // Assert
        expect(input.selectionEnd).toBe(5);
    });

    it("selects the month segment when ArrowLeft is pressed on the day segment", () => {
        // Arrange
        const {input, result} = setup("01/16/2026");
        input.setSelectionRange(4, 4);
        const e = {
            key: "ArrowLeft",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);

        // Assert
        expect(input.selectionStart).toBe(0);
    });

    it("returns true when a horizontal arrow key moves to another segment", () => {
        // Arrange
        const {input, result} = setup("01/16/2026");
        input.setSelectionRange(1, 1);
        const e = {
            key: "ArrowRight",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        const handled = result.current(e);

        // Assert
        expect(handled).toBe(true);
    });

    it("calls preventDefault when a horizontal arrow key moves to another segment", () => {
        // Arrange
        const {input, result} = setup("01/16/2026");
        input.setSelectionRange(1, 1);
        const e = {
            key: "ArrowRight",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);

        // Assert
        expect(e.preventDefault).toHaveBeenCalled();
    });

    it("does not call handleChange when a horizontal arrow key moves to another segment", () => {
        // Arrange
        const {input, result, handleChange} = setup("01/16/2026");
        input.setSelectionRange(1, 1);
        const e = {
            key: "ArrowRight",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);

        // Assert
        expect(handleChange).not.toHaveBeenCalled();
    });

    it("returns true when ArrowRight is pressed on the last segment", () => {
        // Arrange
        const {input, result} = setup("01/16/2026");
        input.setSelectionRange(8, 8);
        const e = {
            key: "ArrowRight",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        const handled = result.current(e);

        // Assert
        expect(handled).toBe(true);
    });

    it("keeps the year segment selected when ArrowRight is pressed on it", () => {
        // Arrange
        const {input, result} = setup("01/16/2026");
        input.setSelectionRange(8, 8);
        const e = {
            key: "ArrowRight",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);

        // Assert
        expect(input.selectionStart).toBe(6);
    });

    it("returns true when ArrowLeft is pressed on the first segment", () => {
        // Arrange
        const {input, result} = setup("01/16/2026");
        input.setSelectionRange(1, 1);
        const e = {
            key: "ArrowLeft",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        const handled = result.current(e);

        // Assert
        expect(handled).toBe(true);
    });

    it("keeps the month segment selected when ArrowLeft is pressed on it", () => {
        // Arrange
        const {input, result} = setup("01/16/2026");
        input.setSelectionRange(1, 1);
        const e = {
            key: "ArrowLeft",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);

        // Assert
        expect(input.selectionEnd).toBe(2);
    });

    it("returns false for a horizontal arrow key with a text dateFormat", () => {
        // Arrange
        const {input, result} = setup("January 16, 2026", "MMMM D, YYYY");
        input.setSelectionRange(1, 1);
        const e = {
            key: "ArrowRight",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        const handled = result.current(e);

        // Assert
        expect(handled).toBe(false);
    });

    it("selects the month segment when ArrowRight is pressed on the day segment in RTL", () => {
        // Arrange
        const {input, result} = setup("01/16/2026", "MM/DD/YYYY", "rtl");
        input.setSelectionRange(4, 4);
        const e = {
            key: "ArrowRight",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);

        // Assert
        expect(input.selectionStart).toBe(0);
    });

    it("selects the year segment when ArrowLeft is pressed on the day segment in RTL", () => {
        // Arrange
        const {input, result} = setup("01/16/2026", "MM/DD/YYYY", "rtl");
        input.setSelectionRange(4, 4);
        const e = {
            key: "ArrowLeft",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);

        // Assert
        expect(input.selectionStart).toBe(6);
    });

    it("moves from the day segment to the month segment on ArrowLeft for a real Arabic-formatted date", () => {
        // Arrange: "ar" formats 2026-08-04 as "4‏/8‏/2026" -- day at [0,1],
        // month at [3,4] (the RTL mark sits between the digits and "/").
        const date = Temporal.PlainDate.from("2026-08-04");
        const value = TemporalLocaleUtils.formatDate(date, undefined, "ar");
        const {input, result} = setup(value, "L", "rtl", "ar");
        input.setSelectionRange(0, 0);
        const e = {
            key: "ArrowLeft",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);

        // Assert
        expect(input.selectionStart).toBe(3);
    });

    it("moves from the month segment to the day segment on ArrowRight for a real Hebrew-formatted date", () => {
        // Arrange: "he" formats 2026-08-04 as "4.8.2026" -- day at [0,1],
        // month at [2,3].
        const date = Temporal.PlainDate.from("2026-08-04");
        const value = TemporalLocaleUtils.formatDate(date, undefined, "he");
        const {input, result} = setup(value, "L", "rtl", "he");
        input.setSelectionRange(2, 2);
        const e = {
            key: "ArrowRight",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        result.current(e);

        // Assert
        expect(input.selectionStart).toBe(0);
    });

    it("returns false for a Persian-formatted date, which uses non-ASCII digits", () => {
        // Arrange
        const date = Temporal.PlainDate.from("2026-08-04");
        const value = TemporalLocaleUtils.formatDate(date, undefined, "fa-IR");
        const {input, result} = setup(value, "L", "rtl", "fa-IR");
        input.setSelectionRange(0, 0);
        const e = {
            key: "ArrowRight",
            currentTarget: input,
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>;

        // Act
        const handled = result.current(e);

        // Assert
        expect(handled).toBe(false);
    });
});

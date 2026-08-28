import {describe, it, expect, jest} from "@jest/globals";
import {renderHook} from "@testing-library/react";
import * as React from "react";

import {TemporalLocaleUtils} from "../../util/temporal-locale-utils";
import {useDateSegmentArrowKeys} from "../use-date-segment-arrow-keys";

function makeKeyEvent(
    key: string,
    input: HTMLInputElement,
    selectionStart: number,
) {
    input.setSelectionRange(selectionStart, selectionStart);
    return {
        key,
        currentTarget: input,
        preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent<HTMLInputElement>;
}

function setup(value: string, dateFormat = "MM/DD/YYYY") {
    const input = document.createElement("input");
    input.value = value;
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
                locale: "en-US",
                parseDate: TemporalLocaleUtils.parseDateToJsDate,
                handleChange,
                innerRef,
            }),
        {initialProps: {value}},
    );

    return {input, handleChange, result, rerender};
}

describe("useDateSegmentArrowKeys", () => {
    it("returns false for keys other than ArrowUp/ArrowDown", () => {
        const {input, result} = setup("01/16/2026");
        const e = makeKeyEvent("Enter", input, 1);

        expect(result.current(e)).toBe(false);
    });

    it("does not call preventDefault for keys other than ArrowUp/ArrowDown", () => {
        const {input, result} = setup("01/16/2026");
        const e = makeKeyEvent("Enter", input, 1);
        result.current(e);

        expect(e.preventDefault).not.toHaveBeenCalled();
    });

    it("returns false when the current value isn't a valid date", () => {
        const {input, result} = setup("not-a-date");
        const e = makeKeyEvent("ArrowDown", input, 1);

        expect(result.current(e)).toBe(false);
    });

    it("does not call handleChange when the current value isn't a valid date", () => {
        const {input, result, handleChange} = setup("not-a-date");
        const e = makeKeyEvent("ArrowDown", input, 1);
        result.current(e);

        expect(handleChange).not.toHaveBeenCalled();
    });

    it("returns false for a text dateFormat", () => {
        const {input, result} = setup("January 16, 2026", "MMMM D, YYYY");
        const e = makeKeyEvent("ArrowDown", input, 1);

        expect(result.current(e)).toBe(false);
    });

    it("does not call handleChange for a text dateFormat", () => {
        const {input, result, handleChange} = setup(
            "January 16, 2026",
            "MMMM D, YYYY",
        );
        const e = makeKeyEvent("ArrowDown", input, 1);
        result.current(e);

        expect(handleChange).not.toHaveBeenCalled();
    });

    it("returns true when it handles the key", () => {
        const {input, result} = setup("01/16/2026");
        const e = makeKeyEvent("ArrowDown", input, 4);

        expect(result.current(e)).toBe(true);
    });

    it("calls preventDefault when it handles the key", () => {
        const {input, result} = setup("01/16/2026");
        const e = makeKeyEvent("ArrowDown", input, 4);
        result.current(e);

        expect(e.preventDefault).toHaveBeenCalled();
    });

    it("decrements the day segment on ArrowDown", () => {
        const {input, result, handleChange} = setup("01/16/2026");
        const e = makeKeyEvent("ArrowDown", input, 4);
        result.current(e);

        expect(handleChange).toHaveBeenCalledWith("01/15/2026");
    });

    it("increments the month segment on ArrowUp", () => {
        const {input, result, handleChange} = setup("01/16/2026");
        const e = makeKeyEvent("ArrowUp", input, 1);
        result.current(e);

        expect(handleChange).toHaveBeenCalledWith("02/16/2026");
    });

    it("increments the year segment on ArrowUp", () => {
        const {input, result, handleChange} = setup("01/16/2026");
        const e = makeKeyEvent("ArrowUp", input, 8);
        result.current(e);

        expect(handleChange).toHaveBeenCalledWith("01/16/2027");
    });

    it("repositions the caret's start to the same segment's new range after the value updates", () => {
        const {input, result, rerender} = setup("01/09/2026");
        const e = makeKeyEvent("ArrowUp", input, 4);
        result.current(e);
        input.value = "01/10/2026";
        rerender({value: "01/10/2026"});

        expect(input.selectionStart).toBe(3);
    });

    it("repositions the caret's end to the same segment's new range after the value updates", () => {
        const {input, result, rerender} = setup("01/09/2026");
        const e = makeKeyEvent("ArrowUp", input, 4);
        result.current(e);
        input.value = "01/10/2026";
        rerender({value: "01/10/2026"});

        expect(input.selectionEnd).toBe(5);
    });
});

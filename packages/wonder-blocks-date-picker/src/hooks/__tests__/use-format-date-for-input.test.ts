import {describe, it, expect} from "@jest/globals";
import {renderHook} from "@testing-library/react";
import {Temporal} from "temporal-polyfill";
import type {Locale} from "react-day-picker/locale";

import {useFormatDateForInput} from "../use-format-date-for-input";

describe("useFormatDateForInput", () => {
    it("returns a function", () => {
        // Arrange
        // Act
        const {result} = renderHook(() =>
            useFormatDateForInput({dateFormat: "MMMM D, YYYY"}),
        );

        // Assert
        expect(typeof result.current).toBe("function");
    });

    it("formats a date with default locale", () => {
        // Arrange
        const date = Temporal.PlainDate.from("2026-02-15");
        const {result} = renderHook(() =>
            useFormatDateForInput({dateFormat: "MMMM D, YYYY"}),
        );

        // Act
        const formatted = result.current(date);

        // Assert
        expect(formatted).toBe("February 15, 2026");
    });

    it("returns empty string for null", () => {
        // Arrange
        const {result} = renderHook(() =>
            useFormatDateForInput({dateFormat: "MMMM D, YYYY"}),
        );

        // Act
        const formatted = result.current(null);

        // Assert
        expect(formatted).toBe("");
    });

    it("returns empty string for undefined", () => {
        // Arrange
        const {result} = renderHook(() =>
            useFormatDateForInput({dateFormat: "MMMM D, YYYY"}),
        );

        // Act
        const formatted = result.current(undefined);

        // Assert
        expect(formatted).toBe("");
    });

    it("uses provided locale when given", () => {
        // Arrange - locale code affects formatting
        const date = Temporal.PlainDate.from("2026-02-15");
        const locale = {code: "en-US"} as Locale;
        const {result} = renderHook(() =>
            useFormatDateForInput({
                dateFormat: "MMMM D, YYYY",
                locale,
            }),
        );

        // Act
        const formatted = result.current(date);

        // Assert
        expect(formatted).toBe("February 15, 2026");
    });

    it("uses different dateFormat when provided", () => {
        // Arrange
        const date = Temporal.PlainDate.from("2026-02-15");
        const {result} = renderHook(() =>
            useFormatDateForInput({dateFormat: "MMM D, YYYY"}),
        );

        // Act
        const formatted = result.current(date);

        // Assert
        expect(formatted).toBe("Feb 15, 2026");
    });

    it("returns stable callback reference when deps do not change", () => {
        // Arrange
        const {result, rerender} = renderHook(() =>
            useFormatDateForInput({dateFormat: "MMMM D, YYYY"}),
        );
        const first = result.current;

        // Act
        rerender();
        const second = result.current;

        // Assert
        expect(first).toBe(second);
    });
});

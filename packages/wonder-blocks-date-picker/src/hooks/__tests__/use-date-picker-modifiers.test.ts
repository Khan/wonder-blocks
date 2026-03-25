import {describe, it, expect} from "@jest/globals";
import {renderHook} from "@testing-library/react";
import {Temporal} from "temporal-polyfill";

import {useDatePickerModifiers} from "../use-date-picker-modifiers";

describe("useDatePickerModifiers", () => {
    it("returns selected as the given selectedDateValue", () => {
        // Arrange
        const selectedDateValue = new Date(2026, 0, 15); // Jan 15, 2026

        // Act
        const {result} = renderHook(() =>
            useDatePickerModifiers({selectedDateValue}),
        );

        // Assert
        expect(result.current.selected).toBe(selectedDateValue);
    });

    it("returns disabled function that returns false when no min/max", () => {
        // Arrange
        const {result} = renderHook(() =>
            useDatePickerModifiers({
                selectedDateValue: undefined,
            }),
        );
        const disabled = result.current.disabled as (date: Date) => boolean;
        const date = new Date(2026, 5, 1);

        // Act
        const isDisabled = disabled(date);

        // Assert
        expect(isDisabled).toBe(false);
    });

    it("returns disabled function that returns true for date before minDate", () => {
        // Arrange
        const minDate = Temporal.PlainDate.from("2026-02-01");
        const {result} = renderHook(() =>
            useDatePickerModifiers({
                selectedDateValue: undefined,
                minDate,
            }),
        );
        const disabled = result.current.disabled as (date: Date) => boolean;
        const dateBeforeMin = new Date(2026, 0, 15); // Jan 15, 2026

        // Act
        const isDisabled = disabled(dateBeforeMin);

        // Assert
        expect(isDisabled).toBe(true);
    });

    it("returns disabled function that returns false for date on minDate", () => {
        // Arrange
        const minDate = Temporal.PlainDate.from("2026-02-01");
        const {result} = renderHook(() =>
            useDatePickerModifiers({
                selectedDateValue: undefined,
                minDate,
            }),
        );
        const disabled = result.current.disabled as (date: Date) => boolean;
        const dateOnMin = new Date(2026, 1, 1);

        // Act
        const isDisabled = disabled(dateOnMin);

        // Assert
        expect(isDisabled).toBe(false);
    });

    it("returns disabled function that returns false for date after minDate", () => {
        // Arrange
        const minDate = Temporal.PlainDate.from("2026-02-01");
        const {result} = renderHook(() =>
            useDatePickerModifiers({
                selectedDateValue: undefined,
                minDate,
            }),
        );
        const disabled = result.current.disabled as (date: Date) => boolean;
        const dateAfterMin = new Date(2026, 2, 1);

        // Act
        const isDisabled = disabled(dateAfterMin);

        // Assert
        expect(isDisabled).toBe(false);
    });

    it("returns disabled function that returns true for date after maxDate", () => {
        // Arrange
        const maxDate = Temporal.PlainDate.from("2026-02-28");
        const {result} = renderHook(() =>
            useDatePickerModifiers({
                selectedDateValue: undefined,
                maxDate,
            }),
        );
        const disabled = result.current.disabled as (date: Date) => boolean;
        const dateAfterMax = new Date(2026, 2, 15); // Mar 15, 2026

        // Act
        const isDisabled = disabled(dateAfterMax);

        // Assert
        expect(isDisabled).toBe(true);
    });

    it("returns disabled function that returns false for date on maxDate", () => {
        // Arrange
        const maxDate = Temporal.PlainDate.from("2026-02-28");
        const {result} = renderHook(() =>
            useDatePickerModifiers({
                selectedDateValue: undefined,
                maxDate,
            }),
        );
        const disabled = result.current.disabled as (date: Date) => boolean;
        const dateOnMax = new Date(2026, 1, 28);

        // Act
        const isDisabled = disabled(dateOnMax);

        // Assert
        expect(isDisabled).toBe(false);
    });

    it("returns disabled function that returns false for date before maxDate", () => {
        // Arrange
        const maxDate = Temporal.PlainDate.from("2026-02-28");
        const {result} = renderHook(() =>
            useDatePickerModifiers({
                selectedDateValue: undefined,
                maxDate,
            }),
        );
        const disabled = result.current.disabled as (date: Date) => boolean;
        const dateBeforeMax = new Date(2026, 1, 15);

        // Act
        const isDisabled = disabled(dateBeforeMax);

        // Assert
        expect(isDisabled).toBe(false);
    });

    it("returns disabled function that returns false for date in range when both min and max set", () => {
        // Arrange
        const minDate = Temporal.PlainDate.from("2026-02-01");
        const maxDate = Temporal.PlainDate.from("2026-02-28");
        const {result} = renderHook(() =>
            useDatePickerModifiers({
                selectedDateValue: undefined,
                minDate,
                maxDate,
            }),
        );
        const disabled = result.current.disabled as (date: Date) => boolean;
        const dateInRange = new Date(2026, 1, 15);

        // Act
        const isDisabled = disabled(dateInRange);

        // Assert
        expect(isDisabled).toBe(false);
    });

    it("returns disabled function that returns true for date before min when both min and max set", () => {
        // Arrange
        const minDate = Temporal.PlainDate.from("2026-02-01");
        const maxDate = Temporal.PlainDate.from("2026-02-28");
        const {result} = renderHook(() =>
            useDatePickerModifiers({
                selectedDateValue: undefined,
                minDate,
                maxDate,
            }),
        );
        const disabled = result.current.disabled as (date: Date) => boolean;
        const dateBeforeMin = new Date(2026, 0, 15);

        // Act
        const isDisabled = disabled(dateBeforeMin);

        // Assert
        expect(isDisabled).toBe(true);
    });

    it("returns disabled function that returns true for date after max when both min and max set", () => {
        // Arrange
        const minDate = Temporal.PlainDate.from("2026-02-01");
        const maxDate = Temporal.PlainDate.from("2026-02-28");
        const {result} = renderHook(() =>
            useDatePickerModifiers({
                selectedDateValue: undefined,
                minDate,
                maxDate,
            }),
        );
        const disabled = result.current.disabled as (date: Date) => boolean;
        const dateAfterMax = new Date(2026, 2, 15);

        // Act
        const isDisabled = disabled(dateAfterMax);

        // Assert
        expect(isDisabled).toBe(true);
    });
});

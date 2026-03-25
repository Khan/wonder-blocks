import {describe, it, expect} from "@jest/globals";
import {act, renderHook} from "@testing-library/react";
import {Temporal} from "temporal-polyfill";
import * as React from "react";

import {useOverlayMonthFromInput} from "../use-overlay-month-from-input";

function createParams(
    overrides: Partial<Parameters<typeof useOverlayMonthFromInput>[0]> = {},
) {
    return {
        inputDrivenMonthRef: {
            current: null,
        } as React.MutableRefObject<Date | null>,
        setDisplayMonth: jest.fn(),
        setDisplayMonthAndRefs: jest.fn(),
        setCurrentDate: jest.fn(),
        updateDate: jest.fn(),
        dateFormat: "yyyy-MM-dd",
        localeCode: "en-US",
        ...overrides,
    };
}

describe("useOverlayMonthFromInput", () => {
    describe("clearInputDrivenMonth", () => {
        it("sets inputDrivenMonthRef.current to null", () => {
            // Arrange
            const inputDrivenMonthRef = {current: new Date(2026, 0, 15)};
            const {result} = renderHook(() =>
                useOverlayMonthFromInput(createParams({inputDrivenMonthRef})),
            );

            // Act
            act(() => {
                result.current.clearInputDrivenMonth();
            });

            // Assert
            expect(inputDrivenMonthRef.current).toBeNull();
        });
    });

    describe("handleInputChange", () => {
        it("calls setCurrentDate and updateDate with null when dateFromInput is null", () => {
            // Arrange
            const setCurrentDate = jest.fn();
            const updateDate = jest.fn();
            const {result} = renderHook(() =>
                useOverlayMonthFromInput(
                    createParams({setCurrentDate, updateDate}),
                ),
            );

            // Act
            act(() => {
                result.current.handleInputChange(null, {}, undefined);
            });

            // Assert
            expect(setCurrentDate).toHaveBeenCalledWith(null);
        });

        it("calls updateDate with null when dateFromInput is null", () => {
            // Arrange
            const updateDate = jest.fn();
            const {result} = renderHook(() =>
                useOverlayMonthFromInput(createParams({updateDate})),
            );

            // Act
            act(() => {
                result.current.handleInputChange(null, {}, undefined);
            });

            // Assert
            expect(updateDate).toHaveBeenCalledWith(null);
        });

        it("calls setDisplayMonth with month date when dateFromInput is set and not disabled", () => {
            // Arrange
            const setDisplayMonth = jest.fn();
            const date = new Date(2026, 1, 15);
            const {result} = renderHook(() =>
                useOverlayMonthFromInput(createParams({setDisplayMonth})),
            );

            // Act
            act(() => {
                result.current.handleInputChange(date, {}, undefined);
            });

            // Assert
            expect(setDisplayMonth).toHaveBeenCalledWith(expect.any(Date));
        });

        it("calls setDisplayMonthAndRefs and updateDate when dateFromInput is set and format is non-text", () => {
            // Arrange
            const setDisplayMonthAndRefs = jest.fn();
            const updateDate = jest.fn();
            const date = new Date(2026, 1, 15);
            const {result} = renderHook(() =>
                useOverlayMonthFromInput(
                    createParams({
                        setDisplayMonthAndRefs,
                        updateDate,
                        dateFormat: "yyyy-MM-dd",
                    }),
                ),
            );

            // Act
            act(() => {
                result.current.handleInputChange(date, {}, undefined);
            });

            // Assert
            expect(setDisplayMonthAndRefs).toHaveBeenCalledWith(
                expect.any(Date),
            );
        });

        it("sets inputDrivenMonthRef to month when modifiers.disabled is true", () => {
            // Arrange
            const inputDrivenMonthRef = {current: null as Date | null};
            const date = new Date(2026, 1, 15);
            const {result} = renderHook(() =>
                useOverlayMonthFromInput(
                    createParams({
                        inputDrivenMonthRef,
                        dateFormat: "yyyy-MM-dd",
                    }),
                ),
            );

            // Act
            act(() => {
                result.current.handleInputChange(date, {disabled: true});
            });

            // Assert
            expect(inputDrivenMonthRef.current).toEqual(date);
        });

        it("calls updateDate when date is disabled", () => {
            // Arrange
            const updateDate = jest.fn();
            const date = new Date(2026, 1, 15);
            const {result} = renderHook(() =>
                useOverlayMonthFromInput(
                    createParams({updateDate, dateFormat: "yyyy-MM-dd"}),
                ),
            );

            // Act
            act(() => {
                result.current.handleInputChange(date, {disabled: true});
            });

            // Assert
            expect(updateDate).toHaveBeenCalledWith(
                Temporal.PlainDate.from("2026-02-15"),
            );
        });
    });
});

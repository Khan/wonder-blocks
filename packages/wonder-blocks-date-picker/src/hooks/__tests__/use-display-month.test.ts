import {describe, it, expect} from "@jest/globals";
import {act, renderHook} from "@testing-library/react";
import {Temporal} from "temporal-polyfill";

import {useDisplayMonth} from "../use-display-month";

describe("useDisplayMonth", () => {
    describe("initial state", () => {
        it("returns undefined displayMonth when selectedDate is null", () => {
            // Arrange
            // Act
            const {result} = renderHook(() =>
                useDisplayMonth({selectedDate: null}),
            );

            // Assert
            expect(result.current.displayMonth).toBeUndefined();
        });

        it("returns undefined displayMonthRef when selectedDate is null", () => {
            // Arrange
            // Act
            const {result} = renderHook(() =>
                useDisplayMonth({selectedDate: null}),
            );

            // Assert
            expect(result.current.displayMonthRef.current).toBeUndefined();
        });

        it("returns undefined displayMonth when selectedDate is undefined", () => {
            // Arrange
            // Act
            const {result} = renderHook(() =>
                useDisplayMonth({selectedDate: undefined}),
            );

            // Assert
            expect(result.current.displayMonth).toBeUndefined();
        });

        it("returns displayMonth as JS Date when selectedDate is set", () => {
            // Arrange
            const selectedDate = Temporal.PlainDate.from("2026-02-15");

            // Act
            const {result} = renderHook(() => useDisplayMonth({selectedDate}));

            // Assert
            expect(result.current.displayMonth).toEqual(new Date(2026, 1, 15));
        });
    });

    describe("returned refs", () => {
        it("returns stable displayMonthRef across rerenders", () => {
            // Arrange
            const {result, rerender} = renderHook(() =>
                useDisplayMonth({selectedDate: null}),
            );
            const displayMonthRefFirst = result.current.displayMonthRef;

            // Act
            rerender();
            const displayMonthRefSecond = result.current.displayMonthRef;

            // Assert
            expect(displayMonthRefFirst).toBe(displayMonthRefSecond);
        });

        it("returns stable inputDrivenMonthRef across rerenders", () => {
            // Arrange
            const {result, rerender} = renderHook(() =>
                useDisplayMonth({selectedDate: null}),
            );
            const inputDrivenMonthRefFirst = result.current.inputDrivenMonthRef;

            // Act
            rerender();
            const inputDrivenMonthRefSecond =
                result.current.inputDrivenMonthRef;

            // Assert
            expect(inputDrivenMonthRefFirst).toBe(inputDrivenMonthRefSecond);
        });

        it("inputDrivenMonthRef initial value is null", () => {
            // Arrange
            // Act
            const {result} = renderHook(() =>
                useDisplayMonth({selectedDate: null}),
            );

            // Assert
            expect(result.current.inputDrivenMonthRef.current).toBeNull();
        });
    });

    describe("setDisplayMonthAndRefs", () => {
        it("sets displayMonth when called with a Date", () => {
            // Arrange
            const {result} = renderHook(() =>
                useDisplayMonth({selectedDate: null}),
            );
            const newMonth = new Date(2026, 2, 1); // March 1, 2026

            // Act
            act(() => {
                result.current.setDisplayMonthAndRefs(newMonth);
            });

            // Assert
            expect(result.current.displayMonth).toEqual(newMonth);
        });

        it("sets displayMonthRef when called with a Date", () => {
            // Arrange
            const {result} = renderHook(() =>
                useDisplayMonth({selectedDate: null}),
            );
            const newMonth = new Date(2026, 2, 1); // March 1, 2026

            // Act
            act(() => {
                result.current.setDisplayMonthAndRefs(newMonth);
            });

            // Assert
            expect(result.current.displayMonthRef.current).toEqual(newMonth);
        });

        it("when called with null after ref was set, clears ref and restores displayMonth", () => {
            // Arrange
            const {result} = renderHook(() =>
                useDisplayMonth({selectedDate: null}),
            );
            const month = new Date(2026, 0, 1);

            // Act
            act(() => {
                result.current.setDisplayMonthAndRefs(month);
                result.current.setDisplayMonthAndRefs(null);
            });

            // Assert
            expect(result.current.displayMonthRef.current).toBeUndefined();
        });

        it("when called with null after ref was set, restores displayMonth from ref", () => {
            // Arrange
            const {result} = renderHook(() =>
                useDisplayMonth({selectedDate: null}),
            );
            const month = new Date(2026, 0, 1);

            // Act
            act(() => {
                result.current.setDisplayMonthAndRefs(month);
                result.current.setDisplayMonthAndRefs(null);
            });

            // Assert
            expect(result.current.displayMonth).toEqual(month);
        });

        it("when called with null and ref is already undefined, keeps displayMonth unchanged", () => {
            // Arrange
            const {result} = renderHook(() =>
                useDisplayMonth({selectedDate: null}),
            );
            const before = result.current.displayMonth;

            // Act
            act(() => {
                result.current.setDisplayMonthAndRefs(null);
            });

            // Assert
            expect(result.current.displayMonth).toBe(before);
        });
    });

    describe("setDisplayMonth", () => {
        it("updates displayMonth when setDisplayMonth is called", () => {
            // Arrange
            const selectedDate = Temporal.PlainDate.from("2026-01-15");
            const {result} = renderHook(() => useDisplayMonth({selectedDate}));
            const newMonth = new Date(2026, 5, 1);

            // Act
            act(() => {
                result.current.setDisplayMonth(newMonth);
            });

            // Assert
            expect(result.current.displayMonth).toEqual(newMonth);
        });
    });
});

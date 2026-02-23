import {describe, it, expect} from "@jest/globals";
import * as React from "react";
import {renderHook} from "@testing-library/react";
import {Temporal} from "temporal-polyfill";

import {TemporalLocaleUtils} from "../../util/temporal-locale-utils";
import {useSelectedDateSync} from "../use-selected-date-sync";

type SelectedDateSyncProps = {
    selectedDate: Temporal.PlainDate | null | undefined;
    setCurrentDate: React.Dispatch<
        React.SetStateAction<Temporal.PlainDate | null | undefined>
    >;
    setDisplayMonthAndRefs: (month: Date | null) => void;
};

describe("useSelectedDateSync", () => {
    it("calls setCurrentDate with selectedDate on mount", () => {
        // Arrange
        const setCurrentDate = jest.fn();
        const setDisplayMonthAndRefs = jest.fn();
        const selectedDate = Temporal.PlainDate.from("2026-01-15");

        // Act
        renderHook(
            (props: SelectedDateSyncProps) =>
                useSelectedDateSync({
                    selectedDate: props.selectedDate,
                    setCurrentDate: props.setCurrentDate,
                    setDisplayMonthAndRefs: props.setDisplayMonthAndRefs,
                }),
            {
                initialProps: {
                    selectedDate,
                    setCurrentDate,
                    setDisplayMonthAndRefs,
                },
            },
        );

        // Assert
        expect(setCurrentDate).toHaveBeenCalledWith(selectedDate);
    });

    it("calls setDisplayMonthAndRefs with JS date when selectedDate is set on mount", () => {
        // Arrange
        const setDisplayMonthAndRefs = jest.fn();
        const selectedDate = Temporal.PlainDate.from("2026-01-15");

        // Act
        renderHook(() =>
            useSelectedDateSync({
                selectedDate,
                setCurrentDate: jest.fn(),
                setDisplayMonthAndRefs,
            }),
        );

        // Assert
        expect(setDisplayMonthAndRefs).toHaveBeenCalledWith(
            TemporalLocaleUtils.temporalDateToJsDate(selectedDate),
        );
    });

    it("calls setCurrentDate and setDisplayMonthAndRefs when selectedDate changes", () => {
        // Arrange
        const setCurrentDate = jest.fn();
        const setDisplayMonthAndRefs = jest.fn();
        const selectedDate2 = Temporal.PlainDate.from("2026-02-20");
        const {rerender} = renderHook(
            (props: SelectedDateSyncProps) =>
                useSelectedDateSync({
                    selectedDate: props.selectedDate,
                    setCurrentDate: props.setCurrentDate,
                    setDisplayMonthAndRefs: props.setDisplayMonthAndRefs,
                }),
            {
                initialProps: {
                    selectedDate: Temporal.PlainDate.from("2026-01-15"),
                    setCurrentDate,
                    setDisplayMonthAndRefs,
                },
            },
        );

        // Act
        rerender({
            selectedDate: selectedDate2,
            setCurrentDate,
            setDisplayMonthAndRefs,
        });

        // Assert
        expect(setDisplayMonthAndRefs).toHaveBeenCalledWith(
            TemporalLocaleUtils.temporalDateToJsDate(selectedDate2),
        );
    });

    it("calls setDisplayMonthAndRefs when selectedDate changes from null to a date", () => {
        // Arrange
        const setDisplayMonthAndRefs = jest.fn();
        const selectedDate = Temporal.PlainDate.from("2026-03-10");
        const {rerender} = renderHook<void, SelectedDateSyncProps>(
            (props) =>
                useSelectedDateSync({
                    selectedDate: props.selectedDate,
                    setCurrentDate: jest.fn(),
                    setDisplayMonthAndRefs: props.setDisplayMonthAndRefs,
                }),
            {
                initialProps: {
                    selectedDate: null,
                    setCurrentDate: jest.fn(),
                    setDisplayMonthAndRefs,
                },
            },
        );

        // Act
        rerender({
            selectedDate,
            setCurrentDate: jest.fn(),
            setDisplayMonthAndRefs,
        });

        // Assert
        expect(setDisplayMonthAndRefs).toHaveBeenCalledWith(
            TemporalLocaleUtils.temporalDateToJsDate(selectedDate),
        );
    });

    it("calls setCurrentDate with null when selectedDate is null", () => {
        // Arrange
        const setCurrentDate = jest.fn();

        // Act
        renderHook(() =>
            useSelectedDateSync({
                selectedDate: null,
                setCurrentDate,
                setDisplayMonthAndRefs: jest.fn(),
            }),
        );

        // Assert
        expect(setCurrentDate).toHaveBeenCalledWith(null);
    });

    it("does not call setDisplayMonthAndRefs when selectedDate is null", () => {
        // Arrange
        const setDisplayMonthAndRefs = jest.fn();

        // Act
        renderHook(() =>
            useSelectedDateSync({
                selectedDate: null,
                setCurrentDate: jest.fn(),
                setDisplayMonthAndRefs,
            }),
        );

        // Assert
        expect(setDisplayMonthAndRefs).not.toHaveBeenCalled();
    });

    it("does not call setDisplayMonthAndRefs when selectedDate is undefined", () => {
        // Arrange
        const setDisplayMonthAndRefs = jest.fn();

        // Act
        renderHook(() =>
            useSelectedDateSync({
                selectedDate: undefined,
                setCurrentDate: jest.fn(),
                setDisplayMonthAndRefs,
            }),
        );

        // Assert
        expect(setDisplayMonthAndRefs).not.toHaveBeenCalled();
    });
});

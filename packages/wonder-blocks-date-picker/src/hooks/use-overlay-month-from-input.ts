import {Temporal} from "temporal-polyfill";
import * as React from "react";

import {isTextFormatCommitComplete} from "../util/date-picker-helpers";
import {TemporalLocaleUtils} from "../util/temporal-locale-utils";
import type {CustomModifiers} from "../util/types";

type SetDisplayMonthAndRefs = (month: Date | null) => void;

export type HandleInputChange = (
    dateFromInput: Date | null | undefined,
    modifiers: Partial<CustomModifiers>,
    inputValue?: string,
) => void;

type Params = {
    inputDrivenMonthRef: React.MutableRefObject<Date | null>;
    setDisplayMonth: React.Dispatch<React.SetStateAction<Date | undefined>>;
    setDisplayMonthAndRefs: SetDisplayMonthAndRefs;
    setCurrentDate: React.Dispatch<
        React.SetStateAction<Temporal.PlainDate | null | undefined>
    >;
    updateDate: (date: Temporal.PlainDate | null) => void;
    dateFormat: string | undefined;
    localeCode: string | undefined;
};

/**
 * Encapsulates "input-driven overlay month" logic: while the user types, the
 * calendar month follows the input; when they commit a date (or we clear),
 * the overlay month is no longer driven by input so prev/next buttons work.
 * Returns handleInputChange (for the input's onChange) and clearInputDrivenMonth
 * (call when closing, changing month via nav, or selecting a day).
 */
export function useOverlayMonthFromInput({
    inputDrivenMonthRef,
    setDisplayMonth,
    setDisplayMonthAndRefs,
    setCurrentDate,
    updateDate,
    dateFormat,
    localeCode,
}: Params): {
    handleInputChange: HandleInputChange;
    clearInputDrivenMonth: () => void;
} {
    // Clear the "input is driving overlay month" flag so overlay uses displayMonth again (e.g. after close, nav, or day click).
    const clearInputDrivenMonth = React.useCallback(() => {
        inputDrivenMonthRef.current = null;
    }, [inputDrivenMonthRef]);

    const handleInputChange = React.useCallback<HandleInputChange>(
        (dateFromInput, modifiers, inputValue) => {
            if (!dateFromInput) {
                setCurrentDate(null);
                updateDate(null);
                return;
            }

            const wrappedDate =
                TemporalLocaleUtils.jsDateToTemporalDate(dateFromInput);
            const monthDate = new Date(dateFromInput);
            setDisplayMonth(monthDate);

            // Disabled date: keep overlay month driven by input; notify parent only.
            const isDisabled =
                typeof modifiers.disabled === "function"
                    ? modifiers.disabled(dateFromInput)
                    : modifiers.disabled;

            if (isDisabled) {
                inputDrivenMonthRef.current = monthDate;
                updateDate(wrappedDate);
                return;
            }

            // Text formats (e.g. "January 15, 2026"): only "commit" when input matches formatted date.
            const isTextFormat =
                TemporalLocaleUtils.isTextFormatDate(dateFormat);

            if (isTextFormat && inputValue) {
                const isCompleteDate = isTextFormatCommitComplete(
                    inputValue,
                    dateFromInput,
                    dateFormat,
                    localeCode,
                );

                if (isCompleteDate) {
                    inputDrivenMonthRef.current = null;
                    setDisplayMonthAndRefs(monthDate);
                    setCurrentDate(wrappedDate);
                    updateDate(wrappedDate);
                } else {
                    inputDrivenMonthRef.current = monthDate;
                }
            } else {
                // Non–text format or no inputValue: commit immediately; clear input-driven mode.
                inputDrivenMonthRef.current = null;
                setDisplayMonthAndRefs(monthDate);
                setCurrentDate(wrappedDate);
                updateDate(wrappedDate);
            }
        },
        [
            inputDrivenMonthRef,
            setDisplayMonth,
            setDisplayMonthAndRefs,
            setCurrentDate,
            updateDate,
            dateFormat,
            localeCode,
        ],
    );

    return {handleInputChange, clearInputDrivenMonth};
}

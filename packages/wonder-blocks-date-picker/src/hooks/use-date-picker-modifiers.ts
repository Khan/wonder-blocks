import {Temporal} from "temporal-polyfill";
import * as React from "react";

import {TemporalLocaleUtils} from "../util/temporal-locale-utils";
import type {CustomModifiers} from "../util/types";

type Params = {
    /** Selected date as JS Date for react-day-picker, or undefined if none. */
    selectedDateValue: Date | undefined;
    minDate?: Temporal.PlainDate | null;
    maxDate?: Temporal.PlainDate | null;
};

/**
 * Pure derivation: returns the modifiers object for react-day-picker (selected day
 * and disabled function based on min/max). No refs, no side effects.
 */
export function useDatePickerModifiers({
    selectedDateValue,
    minDate,
    maxDate,
}: Params): Partial<CustomModifiers> {
    return React.useMemo<Partial<CustomModifiers>>(
        () => ({
            selected: selectedDateValue,
            disabled: (date: Date) => {
                const temporalDate =
                    TemporalLocaleUtils.jsDateToTemporalDate(date);
                return (
                    (minDate &&
                        Temporal.PlainDate.compare(temporalDate, minDate) <
                            0) ||
                    (maxDate &&
                        Temporal.PlainDate.compare(temporalDate, maxDate) >
                            0) ||
                    false
                );
            },
        }),
        [selectedDateValue, minDate, maxDate],
    );
}

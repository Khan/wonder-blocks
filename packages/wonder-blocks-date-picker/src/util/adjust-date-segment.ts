import {Temporal} from "temporal-polyfill";

import type {DateSegmentType} from "./types";

/**
 * Adjusts a single date segment by `delta`, wrapping within that field's own
 * valid range without cascading into adjacent fields (a simple "spinner"
 * model, matching native date/time input behavior).
 *
 * @param date - The date to adjust.
 * @param type - Which segment to adjust.
 * @param delta - `1` to increment, `-1` to decrement.
 * @returns A new date with that segment adjusted.
 */
export function adjustDateSegment(
    date: Temporal.PlainDate,
    type: DateSegmentType,
    delta: 1 | -1,
): Temporal.PlainDate {
    if (type === "day") {
        const {daysInMonth} = date;
        const newDay =
            ((((date.day - 1 + delta) % daysInMonth) + daysInMonth) %
                daysInMonth) +
            1;
        return date.with({day: newDay});
    }
    if (type === "month") {
        const newMonth = ((((date.month - 1 + delta) % 12) + 12) % 12) + 1;
        return date.with({month: newMonth});
    }
    return date.with({year: date.year + delta});
}

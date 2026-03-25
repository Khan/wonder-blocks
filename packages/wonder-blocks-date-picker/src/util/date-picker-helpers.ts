import {Temporal} from "temporal-polyfill";

import {TemporalLocaleUtils} from "./temporal-locale-utils";

/**
 * Returns true when the user has finished typing a full date in a text format
 * (LL, MMMM D YYYY, MMM D YYYY): reparsed date matches, and normalized input
 * matches the formatted date.
 */
export function isTextFormatCommitComplete(
    inputValue: string,
    dateFromInput: Date,
    dateFormat: string | null | undefined,
    localeCode?: string | null,
): boolean {
    if (typeof inputValue !== "string" || inputValue.trim() === "") {
        return false;
    }
    const wrappedDate = TemporalLocaleUtils.jsDateToTemporalDate(dateFromInput);
    const reparsed = TemporalLocaleUtils.parseDate(
        inputValue,
        dateFormat,
        localeCode ?? undefined,
    );
    const sameDate =
        reparsed != null &&
        Temporal.PlainDate.compare(reparsed, wrappedDate) === 0;
    const formatted = TemporalLocaleUtils.formatDate(
        wrappedDate,
        dateFormat,
        localeCode ?? undefined,
    );
    if (typeof formatted !== "string") {
        return false;
    }
    const inputMatchesDisplay =
        TemporalLocaleUtils.normalizeDateStringForComparison(formatted) ===
        TemporalLocaleUtils.normalizeDateStringForComparison(inputValue);
    return sameDate && inputMatchesDisplay;
}

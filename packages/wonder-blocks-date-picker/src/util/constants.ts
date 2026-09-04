import type {DateSegmentType} from "./types";

export const enUSLocaleCode = "en-US";

/** Date format strings that use month names (e.g. "January") and need special handling for partial input and commit detection. */
export const TEXT_FORMAT_STRINGS = [
    "LL",
    "MMMM D, YYYY",
    "MMM D, YYYY",
] as const;

// formatDate() always renders this family as month/day/year with "/",
// regardless of what the format string's own label claims (e.g.
// "DD/MM/YYYY" does not actually render day-first).
export const SLASH_FORMAT_STRINGS = new Set([
    "MM/DD/YYYY",
    "M/D/YYYY",
    "DD/MM/YYYY",
]);

export const INTL_TYPE_TO_SEGMENT_TYPE: Partial<
    Record<Intl.DateTimeFormatPartTypes, DateSegmentType>
> = {
    day: "day",
    month: "month",
    year: "year",
};

import {type Matcher} from "react-day-picker";

export type CustomModifiers = Record<string, Matcher | Matcher[]>;

export type DateSegmentType = "day" | "month" | "year";

export type DateSegment = {
    type: DateSegmentType;
    /** Character offset into the formatted string (inclusive). */
    start: number;
    /** Character offset into the formatted string (exclusive). */
    end: number;
};

/** One part of an Intl.DateTimeFormat pattern (see `buildNumericDatePattern`). */
export type DatePatternPart = {
    type: DateSegmentType | "literal";
    value: string;
};

/** A regex (and its day/month/year capture order) for a locale's numeric date pattern. */
export type NumericDatePattern = {
    regex: RegExp;
    partOrder: Array<DateSegmentType>;
};

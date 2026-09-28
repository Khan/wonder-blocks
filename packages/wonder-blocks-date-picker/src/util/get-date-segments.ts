import {SLASH_FORMAT_STRINGS} from "./constants";
import {getIntlOptionsForSegmentDetection} from "./get-intl-options-for-segment-detection";
import {segmentsFromFixedOrder} from "./segments-from-fixed-order";
import {segmentsFromIntlParts} from "./segments-from-intl-parts";
import type {DateSegment} from "./types";

/**
 * Compute the character ranges of the day/month/year segments in `value`,
 * as actually rendered by `formatDate` for this `formatString`/`locale`
 * combination.
 *
 * @param value - The formatted date string to segment (as currently shown
 * in the input).
 * @param formatString - The `dateFormat` prop value used to render `value`.
 * @param locale - The locale used to render `value`.
 * @returns The computed segments, or `null` when segmentation isn't reliable
 * for arrow-key editing -- e.g. a text format that spells out the month
 * name, or any other format/locale combination whose day/month/year parts
 * aren't plain numbers. Callers should treat `null` as "do nothing."
 */
export function getDateSegments(
    value: string,
    formatString: string | null | undefined,
    locale: string,
): Array<DateSegment> | null {
    if (!value) {
        return null;
    }

    if (formatString === "YYYY-MM-DD") {
        return segmentsFromFixedOrder(value, "-", ["year", "month", "day"]);
    }

    if (formatString && SLASH_FORMAT_STRINGS.has(formatString)) {
        return segmentsFromFixedOrder(value, "/", ["month", "day", "year"]);
    }

    const options = getIntlOptionsForSegmentDetection(formatString);
    if (!options) {
        return null;
    }
    return segmentsFromIntlParts(value, locale, options);
}

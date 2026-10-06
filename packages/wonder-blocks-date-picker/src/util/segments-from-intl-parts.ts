import {INTL_TYPE_TO_SEGMENT_TYPE} from "./constants";
import type {DateSegment} from "./types";

/**
 * Discover a locale's actual segment order and literal separators (via a
 * reference date formatted with `options`) and walks `value` using that same
 * structure to compute its segments.
 *
 * @param value - The formatted date string to segment.
 * @param locale - The locale to format the reference date with.
 * @param options - The `Intl.DateTimeFormatOptions` that produced `value`.
 * @returns The computed segments, or `null` if `value` doesn't match the
 * locale's expected layout, or any day/month/year part isn't purely numeric
 * (e.g. a spelled-out month name).
 */
export function segmentsFromIntlParts(
    value: string,
    locale: string,
    options: Intl.DateTimeFormatOptions,
): Array<DateSegment> | null {
    const referenceDate = new Date(2020, 2, 15);
    let parts: Array<Intl.DateTimeFormatPart>;
    try {
        parts = new Intl.DateTimeFormat(locale, options).formatToParts(
            referenceDate,
        );
    } catch {
        return null;
    }

    const segments: Array<DateSegment> = [];
    let offset = 0;
    for (const part of parts) {
        const segmentType = INTL_TYPE_TO_SEGMENT_TYPE[part.type];
        if (segmentType) {
            const match = /^\d+/.exec(value.slice(offset));
            if (!match) {
                return null;
            }
            segments.push({
                type: segmentType,
                start: offset,
                end: offset + match[0].length,
            });
            offset += match[0].length;
        } else {
            if (
                value.slice(offset, offset + part.value.length) !== part.value
            ) {
                return null;
            }
            offset += part.value.length;
        }
    }
    if (offset !== value.length) {
        return null;
    }

    const types = new Set(segments.map((s) => s.type));
    if (types.size !== 3) {
        return null;
    }
    return segments;
}

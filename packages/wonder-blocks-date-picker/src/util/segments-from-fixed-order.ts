import type {DateSegment, DateSegmentType} from "./types";

/**
 * Split `value` on `separator` into segments in a known, fixed `order`.
 * Used for date formats whose segment order and separator don't depend on
 * locale (e.g. "YYYY-MM-DD", "MM/DD/YYYY").
 *
 * @param value - The formatted date string to segment.
 * @param separator - The literal separator between segments (e.g. "/", "-").
 * @param order - The segment type for each part, in the order they appear.
 * @returns The computed segments, or `null` if `value` doesn't split into
 * exactly `order.length` all-numeric parts.
 */
export function segmentsFromFixedOrder(
    value: string,
    separator: string,
    order: ReadonlyArray<DateSegmentType>,
): Array<DateSegment> | null {
    const parts = value.split(separator);
    if (parts.length !== order.length) {
        return null;
    }
    if (!parts.every((part) => /^\d+$/.test(part))) {
        return null;
    }
    const segments: Array<DateSegment> = [];
    let offset = 0;
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        segments.push({
            type: order[i],
            start: offset,
            end: offset + part.length,
        });
        offset += part.length + separator.length;
    }
    return segments;
}

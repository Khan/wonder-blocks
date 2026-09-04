import type {DateSegment} from "./types";

/**
 * Find which segment (if any) contains a given caret/selection offset.
 *
 * @param segments - The segments to search, as returned by `getDateSegments`.
 * @param offset - A character offset into the same string the segments were
 * computed from (e.g. the input's `selectionStart`).
 * @returns The matching segment, or `null` if none contains `offset`.
 */
export function findSegmentAtOffset(
    segments: ReadonlyArray<DateSegment>,
    offset: number,
): DateSegment | null {
    return segments.find((s) => offset >= s.start && offset <= s.end) ?? null;
}

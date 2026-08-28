import {describe, it, expect} from "@jest/globals";

import {findSegmentAtOffset} from "../find-segment-at-offset";
import {getDateSegments} from "../get-date-segments";

describe("findSegmentAtOffset", () => {
    const segments = getDateSegments("01/16/2026", "MM/DD/YYYY", "en-US")!;

    it("finds the segment containing the offset", () => {
        expect(findSegmentAtOffset(segments, 4)).toEqual({
            type: "day",
            start: 3,
            end: 5,
        });
    });

    it("treats a boundary offset as belonging to the segment it ends", () => {
        expect(findSegmentAtOffset(segments, 2)?.type).toBe("month");
    });

    it("returns null when no segment contains the offset", () => {
        expect(findSegmentAtOffset([], 0)).toBeNull();
    });
});

import {describe, it, expect} from "@jest/globals";

import {findSegmentAtOffset} from "../find-segment-at-offset";
import {getDateSegments} from "../get-date-segments";
import type {DateSegment} from "../types";

describe("findSegmentAtOffset", () => {
    it("finds the segment containing the offset", () => {
        // Arrange
        const segments = getDateSegments("01/16/2026", "MM/DD/YYYY", "en-US")!;

        // Act
        const result = findSegmentAtOffset(segments, 4);

        // Assert
        expect(result).toEqual({type: "day", start: 3, end: 5});
    });

    it("treats a boundary offset as belonging to the segment it ends", () => {
        // Arrange
        const segments = getDateSegments("01/16/2026", "MM/DD/YYYY", "en-US")!;

        // Act
        const result = findSegmentAtOffset(segments, 2);

        // Assert
        expect(result?.type).toBe("month");
    });

    it("returns null when no segment contains the offset", () => {
        // Arrange
        const segments: Array<DateSegment> = [];

        // Act
        const result = findSegmentAtOffset(segments, 0);

        // Assert
        expect(result).toBeNull();
    });
});

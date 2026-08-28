import {describe, it, expect} from "@jest/globals";

import {getDateSegments} from "../get-date-segments";

describe("getDateSegments", () => {
    it("returns null for an empty value", () => {
        expect(getDateSegments("", "MM/DD/YYYY", "en-US")).toBeNull();
    });

    it("segments YYYY-MM-DD in year/month/day order", () => {
        const segments = getDateSegments("2026-01-16", "YYYY-MM-DD", "en-US");
        expect(segments).toEqual([
            {type: "year", start: 0, end: 4},
            {type: "month", start: 5, end: 7},
            {type: "day", start: 8, end: 10},
        ]);
    });

    it("segments MM/DD/YYYY in month/day/year order", () => {
        const segments = getDateSegments("01/16/2026", "MM/DD/YYYY", "en-US");
        expect(segments).toEqual([
            {type: "month", start: 0, end: 2},
            {type: "day", start: 3, end: 5},
            {type: "year", start: 6, end: 10},
        ]);
    });

    it("still renders month/day/year for DD/MM/YYYY (matches formatDate's actual output, not the label)", () => {
        const segments = getDateSegments("01/16/2026", "DD/MM/YYYY", "en-US");
        expect(segments).toEqual([
            {type: "month", start: 0, end: 2},
            {type: "day", start: 3, end: 5},
            {type: "year", start: 6, end: 10},
        ]);
    });

    it("handles unpadded numeric formats using the actual current widths", () => {
        const segments = getDateSegments("1/6/2026", "M/D/YYYY", "en-US");
        expect(segments).toEqual([
            {type: "month", start: 0, end: 1},
            {type: "day", start: 2, end: 3},
            {type: "year", start: 4, end: 8},
        ]);
    });

    it('segments the locale-aware default ("L") format for en-US', () => {
        const segments = getDateSegments("1/16/2026", "L", "en-US");
        expect(segments).toEqual([
            {type: "month", start: 0, end: 1},
            {type: "day", start: 2, end: 4},
            {type: "year", start: 5, end: 9},
        ]);
    });

    it('segments the locale-aware default ("L") format for de-DE (day.month.year)', () => {
        const segments = getDateSegments("16.01.2026", "L", "de-DE");
        expect(segments).toEqual([
            {type: "day", start: 0, end: 2},
            {type: "month", start: 3, end: 5},
            {type: "year", start: 6, end: 10},
        ]);
    });

    it("returns null for LL, a text format that spells out the month name", () => {
        expect(getDateSegments("January 16, 2026", "LL", "en-US")).toBeNull();
    });

    it("returns null for MMMM D, YYYY, a text format that spells out the month name", () => {
        expect(
            getDateSegments("January 16, 2026", "MMMM D, YYYY", "en-US"),
        ).toBeNull();
    });

    it("returns null when the value doesn't match the expected shape", () => {
        expect(getDateSegments("not-a-date", "MM/DD/YYYY", "en-US")).toBeNull();
    });
});

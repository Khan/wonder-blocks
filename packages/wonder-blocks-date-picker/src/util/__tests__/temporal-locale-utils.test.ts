import {describe, it} from "@jest/globals";
import {Temporal} from "temporal-polyfill";
import {es, fr} from "react-day-picker/locale";

import {
    formatDate,
    isTextFormatDate,
    normalizeDateStringForComparison,
    parseDate,
    parseDateToJsDate,
    temporalDateToJsDate,
    jsDateToTemporalDate,
    getModifiersForDay,
    startOfIsoWeek,
    startOfDay,
    endOfDay,
} from "../temporal-locale-utils";
import type {CustomModifiers} from "../types";

describe("TemporalLocaleUtils", () => {
    describe("isTextFormatDate", () => {
        it.each([["LL"], ["MMMM D, YYYY"], ["MMM D, YYYY"]])(
            "returns true when format is %s",
            (format) => {
                // Arrange
                // Act
                const result = isTextFormatDate(format);
                // Assert
                expect(result).toBe(true);
            },
        );

        it.each([["L"], ["MM/DD/YYYY"], [null], [undefined]])(
            "returns false when format is %s",
            (format) => {
                // Arrange
                // Act
                const result = isTextFormatDate(format);
                // Assert
                expect(result).toBe(false);
            },
        );
    });

    describe("normalizeDateStringForComparison", () => {
        it("trims, lowercases, and normalizes punctuation to spaces", () => {
            // Arrange
            const input = "  January 20, 2026  ";
            // Act
            const result = normalizeDateStringForComparison(input);
            // Assert
            expect(result).toBe("january 20 2026");
        });

        it("collapses whitespace and replaces punctuation with space", () => {
            // Arrange
            const input = "January  20 ,. 2026";
            // Act
            const result = normalizeDateStringForComparison(input);
            // Assert
            expect(result).toBe("january 20 2026");
        });

        it("normalizes two strings to the same value for comparison", () => {
            // Arrange
            const a = "January 20, 2026";
            const b = "january  20.  2026";
            // Act
            const normA = normalizeDateStringForComparison(a);
            const normB = normalizeDateStringForComparison(b);
            // Assert
            expect(normA).toBe(normB);
        });
    });

    describe("formatDate", () => {
        it("formats YYYY-MM-DD", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2021-05-07");
            // Act
            const result = formatDate(date, "YYYY-MM-DD", "en-US");
            // Assert
            expect(result).toBe("2021-05-07");
        });

        it("formats MMMM D, YYYY", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2021-05-07");
            // Act
            const result = formatDate(date, "MMMM D, YYYY", "en-US");
            // Assert
            expect(result).toBe("May 7, 2021");
        });

        it("formats M/D/YYYY", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2021-05-07");
            // Act
            const result = formatDate(date, "M/D/YYYY", "en-US");
            // Assert
            expect(result).toBe("5/7/2021");
        });

        it("formats MM/DD/YYYY", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2021-05-07");
            // Act
            const result = formatDate(date, "MM/DD/YYYY", "en-US");
            // Assert
            expect(result).toBe("05/07/2021");
        });

        it("uses locale-aware format when format is null", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2021-05-07");
            // Act
            const result = formatDate(date, null, "en-US");
            // Assert
            expect(result).toBe("5/7/2021");
        });

        it("uses locale-aware format when format is undefined", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2021-05-07");
            // Act
            const result = formatDate(date, undefined, "en-US");
            // Assert
            expect(result).toBe("5/7/2021");
        });

        it("formats short year (MM/DD/YY)", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2021-05-07");
            // Act
            const result = formatDate(date, "MM/DD/YY", "en-US");
            // Assert
            expect(result).toBe("05/07/21");
        });

        it("formats full weekday and month", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2021-05-07");
            // Act
            const result = formatDate(date, "dddd, MMMM D, YYYY", "en-US");
            // Assert
            expect(result).toBe("Friday, May 7, 2021");
        });

        it("formats in French locale", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2021-05-07");
            // Act
            const result = formatDate(date, "D MMMM YYYY", "fr-FR");
            // Assert
            expect(result).toBe("7 mai 2021");
        });

        it("formats in German locale", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2021-05-07");
            // Act
            const result = formatDate(date, "D MMMM YYYY", "de-DE");
            // Assert
            expect(result).toBe("7. Mai 2021");
        });

        it("accepts Spanish Locale object with full month", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2026-01-16");
            // Act
            const result = formatDate(date, "MMMM D, YYYY", es);
            // Assert
            expect(result).toBe("enero 16, 2026");
        });

        it("accepts Spanish Locale object with short month", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2026-01-16");
            // Act
            const result = formatDate(date, "MMM D, YYYY", es);
            // Assert
            expect(result).toBe("ene 16, 2026");
        });

        it("accepts French Locale object", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2026-01-16");
            // Act
            const result = formatDate(date, "MMMM D, YYYY", fr);
            // Assert
            expect(result).toBe("janvier 16, 2026");
        });

        it("falls back to ISO or locale on invalid locale", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2021-05-07");
            const spy = jest.spyOn(console, "warn").mockImplementation();
            // Act
            const result = formatDate(
                date,
                "MMMM D, YYYY",
                "invalid-locale-xyz",
            );
            // Assert
            expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$|^\w+/);
            spy.mockRestore();
        });

        it("uses default locale when not provided", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2021-05-07");
            // Act
            const result = formatDate(date, "MMMM D, YYYY");
            // Assert
            expect(result).toBe("May 7, 2021");
        });

        it("formats L (locale short) for en-US", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2026-01-20");
            // Act
            const result = formatDate(date, "L", "en-US");
            // Assert
            expect(result).toBe("1/20/2026");
        });

        it("formats L (locale short) for de-DE", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2026-01-20");
            // Act
            const result = formatDate(date, "L", "de-DE");
            // Assert
            expect(result).toBe("20.1.2026");
        });

        it("formats L (locale short) for bg", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2026-01-20");
            // Act
            const result = formatDate(date, "L", "bg");
            // Assert
            expect(result).toMatch(/^20\.0?1\.2026/);
        });

        it("formats LL (locale long) for en-US", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2026-01-20");
            // Act
            const result = formatDate(date, "LL", "en-US");
            // Assert
            expect(result).toBe("January 20, 2026");
        });

        it("formats LL (locale long) for es", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2026-01-20");
            // Act
            const result = formatDate(date, "LL", "es");
            // Assert
            expect(result).toMatch(/20\s+de\s+enero\s+de\s+2026/);
        });

        it("defaults to locale short when format is undefined", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2026-01-20");
            // Act
            const result = formatDate(date, undefined, "de-DE");
            // Assert
            expect(result).toBe("20.1.2026");
        });

        it("defaults to locale short when format is null", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2026-01-20");
            // Act
            const result = formatDate(date, null, "en-US");
            // Assert
            expect(result).toBe("1/20/2026");
        });

        it("formats with dateStyle:short", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2026-01-20");
            // Act
            const result = formatDate(date, "dateStyle:short", "de-DE");
            // Assert
            expect(result).toMatch(/20\.0?1\.26/);
        });

        it("formats with dateStyle:long", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2026-01-20");
            // Act
            const result = formatDate(date, "dateStyle:long", "en-US");
            // Assert
            expect(result).toBe("January 20, 2026");
        });
    });

    describe("parseDate", () => {
        it("parses ISO format", () => {
            // Arrange
            // Act
            const result = parseDate("2021-05-07", "YYYY-MM-DD", "en-US");
            // Assert
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("parses text format", () => {
            // Arrange
            // Act
            const result = parseDate("May 7, 2021", "MMMM D, YYYY", "en-US");
            // Assert
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("parses numeric format", () => {
            // Arrange
            // Act
            const result = parseDate("05/07/2021", "MM/DD/YYYY", "en-US");
            // Assert
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("returns undefined for invalid input", () => {
            // Arrange
            // Act
            const result = parseDate("invalid", "YYYY-MM-DD", "en-US");
            // Assert
            expect(result).toBeUndefined();
        });

        it("falls back to ISO when format is null", () => {
            // Arrange
            // Act
            const result = parseDate("2021-05-07", null, "en-US");
            // Assert
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("parses full month name", () => {
            // Arrange
            // Act
            const result = parseDate(
                "January 15, 2024",
                "MMMM D, YYYY",
                "en-US",
            );
            // Assert
            expect(result?.toString()).toBe("2024-01-15");
        });

        it("parses abbreviated month name", () => {
            // Arrange
            // Act
            const result = parseDate("Jan 15, 2024", "MMM D, YYYY", "en-US");
            // Assert
            expect(result?.toString()).toBe("2024-01-15");
        });

        it("parses L format for en-US", () => {
            // Arrange
            // Act
            const result = parseDate("1/20/2026", "L", "en-US");
            // Assert
            expect(result?.toString()).toBe("2026-01-20");
        });

        it("parses L format for de-DE", () => {
            // Arrange
            // Act
            const result = parseDate("20.1.2026", "L", "de-DE");
            // Assert
            expect(result?.toString()).toBe("2026-01-20");
        });

        it("parses L format for bg", () => {
            // Arrange
            // Act
            const result = parseDate("20.01.2026", "L", "bg");
            // Assert
            expect(result?.toString()).toBe("2026-01-20");
        });

        it("parses padded locale date for de-DE", () => {
            // Arrange
            // Act
            const result = parseDate("05.07.2021", "L", "de-DE");
            // Assert
            expect(result?.toString()).toBe("2021-07-05");
        });

        it("returns undefined for partial year", () => {
            // Arrange
            // Act
            const result = parseDate("July 20, 202", "MMMM D, YYYY");
            // Assert
            expect(result).toBeUndefined();
        });

        it("parses LL format in English", () => {
            // Arrange
            // Act
            const result = parseDate("January 20, 2026", "LL", "en-US");
            // Assert
            expect(result?.toString()).toBe("2026-01-20");
        });

        it("parses LL format in Spanish", () => {
            // Arrange
            // Act
            const result = parseDate("20 de enero de 2026", "LL", "es");
            // Assert
            expect(result?.toString()).toBe("2026-01-20");
        });

        it("parses LL format in German", () => {
            // Arrange
            // Act
            const result = parseDate("20. Januar 2026", "LL", "de-DE");
            // Assert
            expect(result?.toString()).toBe("2026-01-20");
        });
    });

    describe("temporalDateToJsDate", () => {
        it("converts to Date (ISO string matches)", () => {
            // Arrange
            const temporal = Temporal.PlainDate.from("2021-05-07");
            // Act
            const result = temporalDateToJsDate(temporal);
            // Assert
            expect(result.toISOString().slice(0, 10)).toBe("2021-05-07");
        });
    });

    describe("jsDateToTemporalDate", () => {
        it("converts to Temporal (toString matches)", () => {
            // Arrange
            const jsDate = new Date(2021, 4, 7);
            // Act
            const result = jsDateToTemporalDate(jsDate);
            // Assert
            expect(result.toString()).toBe("2021-05-07");
        });
    });

    describe("parseDateToJsDate", () => {
        it("parses ISO format", () => {
            // Arrange
            // Act
            const result = parseDateToJsDate(
                "2021-05-07",
                "YYYY-MM-DD",
                "en-US",
            );
            // Assert
            expect(result?.toISOString().slice(0, 10)).toBe("2021-05-07");
        });

        it("parses text format", () => {
            // Arrange
            // Act
            const result = parseDateToJsDate(
                "May 7, 2021",
                "MMMM D, YYYY",
                "en-US",
            );
            // Assert
            expect(result?.toISOString().slice(0, 10)).toBe("2021-05-07");
        });

        it("returns Date as-is when Date is passed in", () => {
            // Arrange
            const inputDate = new Date(2021, 4, 7);
            // Act
            const result = parseDateToJsDate(inputDate, "YYYY-MM-DD", "en-US");
            // Assert
            expect(result).toBe(inputDate);
        });

        it("returns undefined for invalid string", () => {
            // Arrange
            // Act
            const result = parseDateToJsDate("invalid", "YYYY-MM-DD", "en-US");
            // Assert
            expect(result).toBeUndefined();
        });

        it("returns undefined for partial input", () => {
            // Arrange
            // Act
            const result = parseDateToJsDate("2026", "MM/DD/YYYY", "en-US");
            // Assert
            expect(result).toBeUndefined();
        });

        it("accepts unpadded input", () => {
            // Arrange
            // Act
            const result = parseDateToJsDate(
                "1/30/2026",
                "MM/DD/YYYY",
                "en-US",
            );
            // Assert
            expect(result?.toISOString().slice(0, 10)).toBe("2026-01-30");
        });

        it("accepts ISO format regardless of specified format", () => {
            // Arrange
            // Act
            const result = parseDateToJsDate(
                "2026-01-30",
                "MM/DD/YYYY",
                "en-US",
            );
            // Assert
            expect(result?.toISOString().slice(0, 10)).toBe("2026-01-30");
        });

        it("parses manually edited month (MMMM D, YYYY)", () => {
            // Arrange
            // Act
            const result = parseDateToJsDate(
                "February 15, 2026",
                "MMMM D, YYYY",
                "en-US",
            );
            // Assert
            expect(result?.toISOString().slice(0, 10)).toBe("2026-02-15");
        });

        it("parses manually edited month (MMM D, YYYY)", () => {
            // Arrange
            // Act
            const result = parseDateToJsDate(
                "Feb 15, 2026",
                "MMM D, YYYY",
                "en-US",
            );
            // Assert
            expect(result?.toISOString().slice(0, 10)).toBe("2026-02-15");
        });

        it("parses month with different capitalization", () => {
            // Arrange
            // Act
            const result = parseDateToJsDate(
                "march 20, 2026",
                "MMMM D, YYYY",
                "en-US",
            );
            // Assert
            expect(result?.toISOString().slice(0, 10)).toBe("2026-03-20");
        });

        it("parses month name only (LL) as first of month", () => {
            // Arrange
            // Act
            const result = parseDateToJsDate("June", "LL", "en-US");
            // Assert
            expect(result?.toISOString().slice(0, 10)).toMatch(/^\d{4}-06-01$/);
        });

        it("parses month name only (MMMM D, YYYY) as first of month", () => {
            // Arrange
            // Act
            const result = parseDateToJsDate("June", "MMMM D, YYYY", "en-US");
            // Assert
            expect(result?.toISOString().slice(0, 10)).toMatch(/^\d{4}-06-01$/);
        });

        it("returns undefined for invalid calendar date (e.g. February 30, 2026)", () => {
            // Arrange - February has no 30th; parser would clamp to Feb 28 but we reject on round-trip mismatch
            // Act
            const result = parseDateToJsDate(
                "February 30, 2026",
                "MMMM D, YYYY",
                "en-US",
            );
            // Assert
            expect(result).toBeUndefined();
        });
    });

    describe("getModifiersForDay", () => {
        it("returns empty array when no modifier matches", () => {
            // Arrange
            const date = new Date(2021, 4, 7);
            // Act
            const result = getModifiersForDay(date, {disabled: () => false});
            // Assert
            expect(result).toEqual([]);
        });

        it("returns disabled when predicate matches", () => {
            // Arrange
            const date = new Date(2021, 4, 7);
            const modifiers = {disabled: (d: Date) => d.getDate() === 7};
            // Act
            const result = getModifiersForDay(date, modifiers);
            // Assert
            expect(result).toEqual(["disabled"]);
        });

        it("returns selected when date matches", () => {
            // Arrange
            const date = new Date(2021, 4, 7);
            // Act
            const result = getModifiersForDay(date, {selected: date});
            // Assert
            expect(result).toEqual(["selected"]);
        });

        it("returns empty when selected date does not match", () => {
            // Arrange
            const date = new Date(2021, 4, 7);
            // Act
            const result = getModifiersForDay(date, {
                selected: new Date(2021, 4, 8),
            });
            // Assert
            expect(result).toEqual([]);
        });

        it("returns all matching modifiers", () => {
            // Arrange
            const date = new Date(2021, 4, 7);
            const modifiers: Partial<CustomModifiers> = {
                selected: date,
                disabled: (d: Date) => d.getMonth() === 4,
                highlighted: date,
            };
            // Act
            const result = getModifiersForDay(date, modifiers).sort();
            // Assert
            expect(result).toEqual(
                ["disabled", "highlighted", "selected"].sort(),
            );
        });

        it("filters out undefined and null modifiers", () => {
            // Arrange
            const date = new Date(2021, 4, 7);
            const modifiers = {
                disabled: undefined,
                selected: null as any,
                highlighted: date,
            };
            // Act
            const result = getModifiersForDay(date, modifiers);
            // Assert
            expect(result).toEqual(["highlighted"]);
        });

        it("returns empty array for empty modifiers", () => {
            // Arrange
            const date = new Date(2021, 4, 7);
            // Act
            const result = getModifiersForDay(date, {});
            // Assert
            expect(result).toEqual([]);
        });

        it("matches by date only (ignores time)", () => {
            // Arrange
            const midnight = new Date(2021, 4, 7, 0, 0, 0);
            const withTime = new Date(2021, 4, 7, 15, 30, 45);
            // Act
            const result = getModifiersForDay(withTime, {selected: midnight});
            // Assert
            expect(result).toEqual(["selected"]);
        });
    });

    describe("startOfIsoWeek", () => {
        it("returns same date for Monday", () => {
            // Arrange
            // Act
            const result = startOfIsoWeek(
                Temporal.PlainDate.from("2021-05-03"),
            );
            // Assert
            expect(result.toString()).toBe("2021-05-03");
        });

        it("returns Monday for Wednesday", () => {
            // Arrange
            // Act
            const result = startOfIsoWeek(
                Temporal.PlainDate.from("2021-05-05"),
            );
            // Assert
            expect(result.toString()).toBe("2021-05-03");
        });

        it("returns Monday for Sunday", () => {
            // Arrange
            // Act
            const result = startOfIsoWeek(
                Temporal.PlainDate.from("2021-05-09"),
            );
            // Assert
            expect(result.toString()).toBe("2021-05-03");
        });

        it("handles week spanning months", () => {
            // Arrange
            // Act
            const result = startOfIsoWeek(
                Temporal.PlainDate.from("2021-06-02"),
            );
            // Assert
            expect(result.toString()).toBe("2021-05-31");
        });

        it("handles week spanning years", () => {
            // Arrange
            // Act
            const result = startOfIsoWeek(
                Temporal.PlainDate.from("2021-01-01"),
            );
            // Assert
            expect(result.toString()).toBe("2020-12-28");
        });
    });

    describe("startOfDay", () => {
        it("returns same calendar day at midnight", () => {
            // Arrange
            const date = new Date(2021, 4, 7, 15, 30, 45, 500);
            // Act
            const result = startOfDay(date);
            // Assert
            expect(result.toDateString()).toBe("Fri May 07 2021");
        });

        it("does not mutate original", () => {
            // Arrange
            const date = new Date(2021, 4, 7, 15, 30, 45, 500);
            const before = date.getTime();
            // Act
            startOfDay(date);
            // Assert
            expect(date.getTime()).toBe(before);
        });
    });

    describe("endOfDay", () => {
        it("returns same calendar day at end of day", () => {
            // Arrange
            const date = new Date(2021, 4, 7, 10, 15, 30, 250);
            // Act
            const result = endOfDay(date);
            // Assert
            expect(result.toDateString()).toBe("Fri May 07 2021");
        });

        it("does not mutate original", () => {
            // Arrange
            const date = new Date(2021, 4, 7, 10, 15, 30, 250);
            const before = date.getTime();
            // Act
            endOfDay(date);
            // Assert
            expect(date.getTime()).toBe(before);
        });
    });
});

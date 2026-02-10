import {describe, it} from "@jest/globals";
import {Temporal} from "temporal-polyfill";
import {es, fr} from "react-day-picker/locale";

import {
    formatDate,
    isTextFormatDate,
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
                // Act
                const result = isTextFormatDate(format);
                // Assert
                expect(result).toBe(true);
            },
        );

        it.each([["L"], ["MM/DD/YYYY"], [null], [undefined]])(
            "returns false when format is %s",
            (format) => {
                // Act
                const result = isTextFormatDate(format);
                // Assert
                expect(result).toBe(false);
            },
        );
    });

    describe("formatDate", () => {
        it("formats YYYY-MM-DD", () => {
            const date = Temporal.PlainDate.from("2021-05-07");
            expect(formatDate(date, "YYYY-MM-DD", "en-US")).toBe("2021-05-07");
        });

        it("formats MMMM D, YYYY", () => {
            const date = Temporal.PlainDate.from("2021-05-07");
            expect(formatDate(date, "MMMM D, YYYY", "en-US")).toBe(
                "May 7, 2021",
            );
        });

        it("formats M/D/YYYY", () => {
            const date = Temporal.PlainDate.from("2021-05-07");
            expect(formatDate(date, "M/D/YYYY", "en-US")).toBe("5/7/2021");
        });

        it("formats MM/DD/YYYY", () => {
            const date = Temporal.PlainDate.from("2021-05-07");
            expect(formatDate(date, "MM/DD/YYYY", "en-US")).toBe("05/07/2021");
        });

        it("uses locale-aware format when format is null", () => {
            const date = Temporal.PlainDate.from("2021-05-07");
            expect(formatDate(date, null, "en-US")).toBe("5/7/2021");
        });

        it("uses locale-aware format when format is undefined", () => {
            const date = Temporal.PlainDate.from("2021-05-07");
            expect(formatDate(date, undefined, "en-US")).toBe("5/7/2021");
        });

        it("formats short year (MM/DD/YY)", () => {
            const date = Temporal.PlainDate.from("2021-05-07");
            expect(formatDate(date, "MM/DD/YY", "en-US")).toBe("05/07/21");
        });

        it("formats full weekday and month", () => {
            const date = Temporal.PlainDate.from("2021-05-07");
            expect(formatDate(date, "dddd, MMMM D, YYYY", "en-US")).toBe(
                "Friday, May 7, 2021",
            );
        });

        it("formats in French locale", () => {
            const date = Temporal.PlainDate.from("2021-05-07");
            expect(formatDate(date, "D MMMM YYYY", "fr-FR")).toBe("7 mai 2021");
        });

        it("formats in German locale", () => {
            const date = Temporal.PlainDate.from("2021-05-07");
            expect(formatDate(date, "D MMMM YYYY", "de-DE")).toBe(
                "7. Mai 2021",
            );
        });

        it("accepts Spanish Locale object with full month", () => {
            const date = Temporal.PlainDate.from("2026-01-16");
            expect(formatDate(date, "MMMM D, YYYY", es)).toBe("enero 16, 2026");
        });

        it("accepts Spanish Locale object with short month", () => {
            const date = Temporal.PlainDate.from("2026-01-16");
            expect(formatDate(date, "MMM D, YYYY", es)).toBe("ene 16, 2026");
        });

        it("accepts French Locale object", () => {
            const date = Temporal.PlainDate.from("2026-01-16");
            expect(formatDate(date, "MMMM D, YYYY", fr)).toBe(
                "janvier 16, 2026",
            );
        });

        it("falls back to ISO or locale on invalid locale", () => {
            const date = Temporal.PlainDate.from("2021-05-07");
            const spy = jest.spyOn(console, "warn").mockImplementation();
            const result = formatDate(
                date,
                "MMMM D, YYYY",
                "invalid-locale-xyz",
            );
            expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$|^\w+/);
            spy.mockRestore();
        });

        it("uses default locale when not provided", () => {
            const date = Temporal.PlainDate.from("2021-05-07");
            expect(formatDate(date, "MMMM D, YYYY")).toBe("May 7, 2021");
        });

        it("formats L (locale short) for en-US", () => {
            const date = Temporal.PlainDate.from("2026-01-20");
            expect(formatDate(date, "L", "en-US")).toBe("1/20/2026");
        });

        it("formats L (locale short) for de-DE", () => {
            const date = Temporal.PlainDate.from("2026-01-20");
            expect(formatDate(date, "L", "de-DE")).toBe("20.1.2026");
        });

        it("formats L (locale short) for bg", () => {
            const date = Temporal.PlainDate.from("2026-01-20");
            expect(formatDate(date, "L", "bg")).toMatch(/^20\.0?1\.2026/);
        });

        it("formats LL (locale long) for en-US", () => {
            const date = Temporal.PlainDate.from("2026-01-20");
            expect(formatDate(date, "LL", "en-US")).toBe("January 20, 2026");
        });

        it("formats LL (locale long) for es", () => {
            const date = Temporal.PlainDate.from("2026-01-20");
            expect(formatDate(date, "LL", "es")).toMatch(
                /20\s+de\s+enero\s+de\s+2026/,
            );
        });

        it("defaults to locale short when format is undefined", () => {
            const date = Temporal.PlainDate.from("2026-01-20");
            expect(formatDate(date, undefined, "de-DE")).toBe("20.1.2026");
        });

        it("defaults to locale short when format is null", () => {
            const date = Temporal.PlainDate.from("2026-01-20");
            expect(formatDate(date, null, "en-US")).toBe("1/20/2026");
        });

        it("formats with dateStyle:short", () => {
            const date = Temporal.PlainDate.from("2026-01-20");
            expect(formatDate(date, "dateStyle:short", "de-DE")).toMatch(
                /20\.0?1\.26/,
            );
        });

        it("formats with dateStyle:long", () => {
            const date = Temporal.PlainDate.from("2026-01-20");
            expect(formatDate(date, "dateStyle:long", "en-US")).toBe(
                "January 20, 2026",
            );
        });
    });

    describe("parseDate", () => {
        it("parses ISO format", () => {
            expect(
                parseDate("2021-05-07", "YYYY-MM-DD", "en-US")?.toString(),
            ).toBe("2021-05-07");
        });

        it("parses text format", () => {
            expect(
                parseDate("May 7, 2021", "MMMM D, YYYY", "en-US")?.toString(),
            ).toBe("2021-05-07");
        });

        it("parses numeric format", () => {
            expect(
                parseDate("05/07/2021", "MM/DD/YYYY", "en-US")?.toString(),
            ).toBe("2021-05-07");
        });

        it("returns undefined for invalid input", () => {
            expect(parseDate("invalid", "YYYY-MM-DD", "en-US")).toBeUndefined();
        });

        it("falls back to ISO when format is null", () => {
            expect(parseDate("2021-05-07", null, "en-US")?.toString()).toBe(
                "2021-05-07",
            );
        });

        it("parses full month name", () => {
            expect(
                parseDate(
                    "January 15, 2024",
                    "MMMM D, YYYY",
                    "en-US",
                )?.toString(),
            ).toBe("2024-01-15");
        });

        it("parses abbreviated month name", () => {
            expect(
                parseDate("Jan 15, 2024", "MMM D, YYYY", "en-US")?.toString(),
            ).toBe("2024-01-15");
        });

        it("parses L format for en-US", () => {
            expect(parseDate("1/20/2026", "L", "en-US")?.toString()).toBe(
                "2026-01-20",
            );
        });

        it("parses L format for de-DE", () => {
            expect(parseDate("20.1.2026", "L", "de-DE")?.toString()).toBe(
                "2026-01-20",
            );
        });

        it("parses L format for bg", () => {
            expect(parseDate("20.01.2026", "L", "bg")?.toString()).toBe(
                "2026-01-20",
            );
        });

        it("parses padded locale date for de-DE", () => {
            expect(parseDate("05.07.2021", "L", "de-DE")?.toString()).toBe(
                "2021-07-05",
            );
        });

        it("returns undefined for partial year", () => {
            expect(parseDate("July 20, 202", "MMMM D, YYYY")).toBeUndefined();
        });

        it("parses LL format in English", () => {
            expect(
                parseDate("January 20, 2026", "LL", "en-US")?.toString(),
            ).toBe("2026-01-20");
        });

        it("parses LL format in Spanish", () => {
            expect(
                parseDate("20 de enero de 2026", "LL", "es")?.toString(),
            ).toBe("2026-01-20");
        });

        it("parses LL format in German", () => {
            expect(
                parseDate("20. Januar 2026", "LL", "de-DE")?.toString(),
            ).toBe("2026-01-20");
        });
    });

    describe("temporalDateToJsDate", () => {
        it("converts to Date (ISO string matches)", () => {
            const temporal = Temporal.PlainDate.from("2021-05-07");
            expect(
                temporalDateToJsDate(temporal).toISOString().slice(0, 10),
            ).toBe("2021-05-07");
        });
    });

    describe("jsDateToTemporalDate", () => {
        it("converts to Temporal (toString matches)", () => {
            const jsDate = new Date(2021, 4, 7);
            expect(jsDateToTemporalDate(jsDate).toString()).toBe("2021-05-07");
        });
    });

    describe("parseDateToJsDate", () => {
        it("parses ISO format", () => {
            const result = parseDateToJsDate(
                "2021-05-07",
                "YYYY-MM-DD",
                "en-US",
            );
            expect(result?.toISOString().slice(0, 10)).toBe("2021-05-07");
        });

        it("parses text format", () => {
            const result = parseDateToJsDate(
                "May 7, 2021",
                "MMMM D, YYYY",
                "en-US",
            );
            expect(result?.toISOString().slice(0, 10)).toBe("2021-05-07");
        });

        it("returns Date as-is when Date is passed in", () => {
            const inputDate = new Date(2021, 4, 7);
            expect(parseDateToJsDate(inputDate, "YYYY-MM-DD", "en-US")).toBe(
                inputDate,
            );
        });

        it("returns undefined for invalid string", () => {
            expect(
                parseDateToJsDate("invalid", "YYYY-MM-DD", "en-US"),
            ).toBeUndefined();
        });

        it("returns undefined for partial input", () => {
            expect(
                parseDateToJsDate("2026", "MM/DD/YYYY", "en-US"),
            ).toBeUndefined();
        });

        it("accepts unpadded input", () => {
            const result = parseDateToJsDate(
                "1/30/2026",
                "MM/DD/YYYY",
                "en-US",
            );
            expect(result?.toISOString().slice(0, 10)).toBe("2026-01-30");
        });

        it("accepts ISO format regardless of specified format", () => {
            const result = parseDateToJsDate(
                "2026-01-30",
                "MM/DD/YYYY",
                "en-US",
            );
            expect(result?.toISOString().slice(0, 10)).toBe("2026-01-30");
        });

        it("parses manually edited month (MMMM D, YYYY)", () => {
            const result = parseDateToJsDate(
                "February 15, 2026",
                "MMMM D, YYYY",
                "en-US",
            );
            expect(result?.toISOString().slice(0, 10)).toBe("2026-02-15");
        });

        it("parses manually edited month (MMM D, YYYY)", () => {
            const result = parseDateToJsDate(
                "Feb 15, 2026",
                "MMM D, YYYY",
                "en-US",
            );
            expect(result?.toISOString().slice(0, 10)).toBe("2026-02-15");
        });

        it("parses month with different capitalization", () => {
            const result = parseDateToJsDate(
                "march 20, 2026",
                "MMMM D, YYYY",
                "en-US",
            );
            expect(result?.toISOString().slice(0, 10)).toBe("2026-03-20");
        });

        it("parses month name only (LL) as first of month", () => {
            const result = parseDateToJsDate("June", "LL", "en-US");
            expect(result?.toISOString().slice(0, 10)).toMatch(/^\d{4}-06-01$/);
        });

        it("parses month name only (MMMM D, YYYY) as first of month", () => {
            const result = parseDateToJsDate("June", "MMMM D, YYYY", "en-US");
            expect(result?.toISOString().slice(0, 10)).toMatch(/^\d{4}-06-01$/);
        });
    });

    describe("getModifiersForDay", () => {
        it("returns empty array when no modifier matches", () => {
            const date = new Date(2021, 4, 7);
            expect(getModifiersForDay(date, {disabled: () => false})).toEqual(
                [],
            );
        });

        it("returns disabled when predicate matches", () => {
            const date = new Date(2021, 4, 7);
            const modifiers = {disabled: (d: Date) => d.getDate() === 7};
            expect(getModifiersForDay(date, modifiers)).toEqual(["disabled"]);
        });

        it("returns selected when date matches", () => {
            const date = new Date(2021, 4, 7);
            expect(getModifiersForDay(date, {selected: date})).toEqual([
                "selected",
            ]);
        });

        it("returns empty when selected date does not match", () => {
            const date = new Date(2021, 4, 7);
            expect(
                getModifiersForDay(date, {selected: new Date(2021, 4, 8)}),
            ).toEqual([]);
        });

        it("returns all matching modifiers", () => {
            const date = new Date(2021, 4, 7);
            const modifiers: Partial<CustomModifiers> = {
                selected: date,
                disabled: (d: Date) => d.getMonth() === 4,
                highlighted: date,
            };
            expect(getModifiersForDay(date, modifiers).sort()).toEqual(
                ["disabled", "highlighted", "selected"].sort(),
            );
        });

        it("filters out undefined and null modifiers", () => {
            const date = new Date(2021, 4, 7);
            const modifiers = {
                disabled: undefined,
                selected: null as any,
                highlighted: date,
            };
            expect(getModifiersForDay(date, modifiers)).toEqual([
                "highlighted",
            ]);
        });

        it("returns empty array for empty modifiers", () => {
            const date = new Date(2021, 4, 7);
            expect(getModifiersForDay(date, {})).toEqual([]);
        });

        it("matches by date only (ignores time)", () => {
            const midnight = new Date(2021, 4, 7, 0, 0, 0);
            const withTime = new Date(2021, 4, 7, 15, 30, 45);
            expect(getModifiersForDay(withTime, {selected: midnight})).toEqual([
                "selected",
            ]);
        });
    });

    describe("startOfIsoWeek", () => {
        it("returns same date for Monday", () => {
            expect(
                startOfIsoWeek(
                    Temporal.PlainDate.from("2021-05-03"),
                ).toString(),
            ).toBe("2021-05-03");
        });

        it("returns Monday for Wednesday", () => {
            expect(
                startOfIsoWeek(
                    Temporal.PlainDate.from("2021-05-05"),
                ).toString(),
            ).toBe("2021-05-03");
        });

        it("returns Monday for Sunday", () => {
            expect(
                startOfIsoWeek(
                    Temporal.PlainDate.from("2021-05-09"),
                ).toString(),
            ).toBe("2021-05-03");
        });

        it("handles week spanning months", () => {
            expect(
                startOfIsoWeek(
                    Temporal.PlainDate.from("2021-06-02"),
                ).toString(),
            ).toBe("2021-05-31");
        });

        it("handles week spanning years", () => {
            expect(
                startOfIsoWeek(
                    Temporal.PlainDate.from("2021-01-01"),
                ).toString(),
            ).toBe("2020-12-28");
        });
    });

    describe("startOfDay", () => {
        it("returns same calendar day at midnight", () => {
            const date = new Date(2021, 4, 7, 15, 30, 45, 500);
            expect(startOfDay(date).toDateString()).toBe("Fri May 07 2021");
        });

        it("does not mutate original", () => {
            const date = new Date(2021, 4, 7, 15, 30, 45, 500);
            const before = date.getTime();
            startOfDay(date);
            expect(date.getTime()).toBe(before);
        });
    });

    describe("endOfDay", () => {
        it("returns same calendar day at end of day", () => {
            const date = new Date(2021, 4, 7, 10, 15, 30, 250);
            expect(endOfDay(date).toDateString()).toBe("Fri May 07 2021");
        });

        it("does not mutate original", () => {
            const date = new Date(2021, 4, 7, 10, 15, 30, 250);
            const before = date.getTime();
            endOfDay(date);
            expect(date.getTime()).toBe(before);
        });
    });
});

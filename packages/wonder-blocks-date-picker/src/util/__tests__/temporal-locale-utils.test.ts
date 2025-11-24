import {describe, it} from "@jest/globals";
import {Temporal} from "temporal-polyfill";

import {
    formatDate,
    parseDate,
    parseDateToJsDate,
    temporalDateToJsDate,
    jsDateToTemporalDate,
    getModifiersForDay,
    getFirstDayOfWeek,
    getMonths,
    getWeekdaysLong,
    getWeekdaysShort,
} from "../temporal-locale-utils";
import type {CustomModifiers} from "../types";

describe("TemporalLocaleUtils", () => {
    describe("formatDate", () => {
        const testDate = Temporal.PlainDate.from("2021-05-07");

        it("formats date with YYYY-MM-DD format", () => {
            expect(formatDate(testDate, "YYYY-MM-DD", "en-US")).toBe(
                "2021-05-07",
            );
        });

        it("formats date with MMMM D, YYYY format", () => {
            const result = formatDate(testDate, "MMMM D, YYYY", "en-US");
            expect(result).toBe("May 7, 2021");
        });

        it("formats date with MMM D, YYYY format", () => {
            const result = formatDate(testDate, "MMM D, YYYY", "en-US");
            expect(result).toBe("May 7, 2021");
        });

        it("formats date with M/D/YYYY format", () => {
            const result = formatDate(testDate, "M/D/YYYY", "en-US");
            expect(result).toBe("5/7/2021");
        });

        it("formats date with MM/DD/YYYY format", () => {
            const result = formatDate(testDate, "MM/DD/YYYY", "en-US");
            expect(result).toBe("05/07/2021");
        });

        it("uses ISO format when format is null", () => {
            expect(formatDate(testDate, null, "en-US")).toBe("2021-05-07");
        });

        it("uses first format when format is an array", () => {
            expect(
                formatDate(testDate, ["YYYY-MM-DD", "M/D/YYYY"], "en-US"),
            ).toBe("2021-05-07");
        });
    });

    describe("parseDate", () => {
        it("parses ISO format date", () => {
            const result = parseDate("2021-05-07", "YYYY-MM-DD", "en-US");
            expect(result).toBeDefined();
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("parses MMMM D, YYYY format", () => {
            const result = parseDate("May 7, 2021", "MMMM D, YYYY", "en-US");
            expect(result).toBeDefined();
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("parses MMM D, YYYY format", () => {
            const result = parseDate("May 7, 2021", "MMM D, YYYY", "en-US");
            expect(result).toBeDefined();
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("parses M/D/YYYY format", () => {
            const result = parseDate("5/7/2021", "M/D/YYYY", "en-US");
            expect(result).toBeDefined();
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("parses MM/DD/YYYY format", () => {
            const result = parseDate("05/07/2021", "MM/DD/YYYY", "en-US");
            expect(result).toBeDefined();
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("parses M-D-YYYY format", () => {
            const result = parseDate("5-7-2021", "M-D-YYYY", "en-US");
            expect(result).toBeDefined();
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("returns undefined for empty string", () => {
            expect(parseDate("", "YYYY-MM-DD", "en-US")).toBeUndefined();
        });

        it("returns undefined for whitespace string", () => {
            expect(parseDate("   ", "YYYY-MM-DD", "en-US")).toBeUndefined();
        });

        it("returns undefined for invalid date", () => {
            expect(parseDate("invalid", "YYYY-MM-DD", "en-US")).toBeUndefined();
        });

        it("tries multiple formats when array is provided", () => {
            const result = parseDate(
                "5/7/2021",
                ["YYYY-MM-DD", "M/D/YYYY"],
                "en-US",
            );
            expect(result).toBeDefined();
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("falls back to ISO format when no format is provided", () => {
            const result = parseDate("2021-05-07", null, "en-US");
            expect(result).toBeDefined();
            expect(result?.toString()).toBe("2021-05-07");
        });
    });

    describe("temporalDateToJsDate", () => {
        it("converts Temporal.PlainDate to JavaScript Date", () => {
            const temporal = Temporal.PlainDate.from("2021-05-07");
            const jsDate = temporalDateToJsDate(temporal);

            expect(jsDate).toBeInstanceOf(Date);
            expect(jsDate.getFullYear()).toBe(2021);
            expect(jsDate.getMonth()).toBe(4); // 0-indexed
            expect(jsDate.getDate()).toBe(7);
        });
    });

    describe("jsDateToTemporalDate", () => {
        it("converts JavaScript Date to Temporal.PlainDate", () => {
            const jsDate = new Date(2021, 4, 7); // May 7, 2021
            const temporal = jsDateToTemporalDate(jsDate);

            expect(temporal.year).toBe(2021);
            expect(temporal.month).toBe(5);
            expect(temporal.day).toBe(7);
        });
    });

    describe("parseDateToJsDate", () => {
        it("parses string date and returns JavaScript Date", () => {
            const result = parseDateToJsDate(
                "2021-05-07",
                "YYYY-MM-DD",
                "en-US",
            );
            expect(result).toBeInstanceOf(Date);
            expect(result?.getFullYear()).toBe(2021);
            expect(result?.getMonth()).toBe(4); // 0-indexed
            expect(result?.getDate()).toBe(7);
        });

        it("parses MMMM D, YYYY format and returns JavaScript Date", () => {
            const result = parseDateToJsDate(
                "May 7, 2021",
                "MMMM D, YYYY",
                "en-US",
            );
            expect(result).toBeInstanceOf(Date);
            expect(result?.getFullYear()).toBe(2021);
            expect(result?.getMonth()).toBe(4);
            expect(result?.getDate()).toBe(7);
        });

        it("returns Date as-is when Date is passed in", () => {
            const inputDate = new Date(2021, 4, 7);
            const result = parseDateToJsDate(inputDate, "YYYY-MM-DD", "en-US");
            expect(result).toBe(inputDate); // Same instance
        });

        it("returns undefined for empty string", () => {
            expect(
                parseDateToJsDate("", "YYYY-MM-DD", "en-US"),
            ).toBeUndefined();
        });

        it("returns undefined for invalid date", () => {
            expect(
                parseDateToJsDate("invalid", "YYYY-MM-DD", "en-US"),
            ).toBeUndefined();
        });

        it("handles null locale parameter", () => {
            const result = parseDateToJsDate("2021-05-07", "YYYY-MM-DD", null);
            expect(result).toBeInstanceOf(Date);
            expect(result?.getFullYear()).toBe(2021);
        });
    });

    describe("getModifiersForDay", () => {
        const testDate = new Date(2021, 4, 7); // May 7, 2021

        it("returns empty array when no modifiers match", () => {
            const modifiers: Partial<CustomModifiers> = {
                disabled: () => false,
            };
            const result = getModifiersForDay(testDate, modifiers);
            expect(result).toEqual([]);
        });

        it("returns modifier name when function matcher returns true", () => {
            const modifiers: Partial<CustomModifiers> = {
                disabled: (date: Date) => date.getDate() === 7,
            };
            const result = getModifiersForDay(testDate, modifiers);
            expect(result).toEqual(["disabled"]);
        });

        it("returns modifier name when Date matcher matches", () => {
            const modifiers: Partial<CustomModifiers> = {
                selected: new Date(2021, 4, 7),
            };
            const result = getModifiersForDay(testDate, modifiers);
            expect(result).toEqual(["selected"]);
        });

        it("does not match Date with different day", () => {
            const modifiers: Partial<CustomModifiers> = {
                selected: new Date(2021, 4, 8), // May 8
            };
            const result = getModifiersForDay(testDate, modifiers);
            expect(result).toEqual([]);
        });

        it("returns multiple matching modifiers", () => {
            const modifiers: Partial<CustomModifiers> = {
                selected: new Date(2021, 4, 7),
                disabled: (date: Date) => date.getMonth() === 4,
                highlighted: new Date(2021, 4, 7),
            };
            const result = getModifiersForDay(testDate, modifiers);
            expect(result).toContain("selected");
            expect(result).toContain("disabled");
            expect(result).toContain("highlighted");
            expect(result).toHaveLength(3);
        });

        it("ignores null/undefined modifiers", () => {
            const modifiers: Partial<CustomModifiers> = {
                disabled: undefined,
                selected: null as any,
                highlighted: new Date(2021, 4, 7),
            };
            const result = getModifiersForDay(testDate, modifiers);
            expect(result).toEqual(["highlighted"]);
        });

        it("handles empty modifiers object", () => {
            const result = getModifiersForDay(testDate, {});
            expect(result).toEqual([]);
        });

        it("matches Date at midnight correctly", () => {
            const dateAtMidnight = new Date(2021, 4, 7, 0, 0, 0);
            const dateWithTime = new Date(2021, 4, 7, 15, 30, 45);
            const modifiers: Partial<CustomModifiers> = {
                selected: dateAtMidnight,
            };
            // Should match because we only compare year/month/day
            const result = getModifiersForDay(dateWithTime, modifiers);
            expect(result).toEqual(["selected"]);
        });
    });

    describe("getFirstDayOfWeek", () => {
        it("returns 0 (Sunday) for en-US locale", () => {
            expect(getFirstDayOfWeek("en-US")).toBe(0);
        });

        it("returns 0 (Sunday) for en-CA locale", () => {
            expect(getFirstDayOfWeek("en-CA")).toBe(0);
        });

        it("returns 0 (Sunday) for ja locale", () => {
            expect(getFirstDayOfWeek("ja")).toBe(0);
        });

        it("returns 1 (Monday) for en-GB locale", () => {
            expect(getFirstDayOfWeek("en-GB")).toBe(1);
        });

        it("returns 1 (Monday) for default/no locale", () => {
            expect(getFirstDayOfWeek()).toBe(1);
        });
    });

    describe("getMonths", () => {
        it("returns 12 months", () => {
            const months = getMonths("en-US");
            expect(months).toHaveLength(12);
        });

        it("returns months with long and short names", () => {
            const months = getMonths("en-US");
            expect(months[0]).toEqual(["January", "Jan"]);
            expect(months[4]).toEqual(["May", "May"]);
            expect(months[11]).toEqual(["December", "Dec"]);
        });
    });

    describe("getWeekdaysLong", () => {
        it("returns 7 weekdays", () => {
            const weekdays = getWeekdaysLong("en-US");
            expect(weekdays).toHaveLength(7);
        });

        it("starts with Sunday", () => {
            const weekdays = getWeekdaysLong("en-US");
            expect(weekdays[0]).toBe("Sunday");
        });

        it("ends with Saturday", () => {
            const weekdays = getWeekdaysLong("en-US");
            expect(weekdays[6]).toBe("Saturday");
        });
    });

    describe("getWeekdaysShort", () => {
        it("returns 7 weekdays", () => {
            const weekdays = getWeekdaysShort("en-US");
            expect(weekdays).toHaveLength(7);
        });

        it("starts with Sun", () => {
            const weekdays = getWeekdaysShort("en-US");
            expect(weekdays[0]).toBe("Sun");
        });

        it("ends with Sat", () => {
            const weekdays = getWeekdaysShort("en-US");
            expect(weekdays[6]).toBe("Sat");
        });
    });
});

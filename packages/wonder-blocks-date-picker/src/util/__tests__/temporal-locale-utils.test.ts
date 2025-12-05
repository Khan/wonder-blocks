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
        it("formats date with YYYY-MM-DD format", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, "YYYY-MM-DD", "en-US");

            // Assert
            expect(result).toBe("2021-05-07");
        });

        it("formats date with MMMM D, YYYY format", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, "MMMM D, YYYY", "en-US");

            // Assert
            expect(result).toBe("May 7, 2021");
        });

        it("formats date with MMM D, YYYY format", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, "MMM D, YYYY", "en-US");

            // Assert
            expect(result).toBe("May 7, 2021");
        });

        it("formats date with M/D/YYYY format", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, "M/D/YYYY", "en-US");

            // Assert
            expect(result).toBe("5/7/2021");
        });

        it("formats date with MM/DD/YYYY format", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, "MM/DD/YYYY", "en-US");

            // Assert
            expect(result).toBe("05/07/2021");
        });

        it("uses ISO format when format is null", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, null, "en-US");

            // Assert
            expect(result).toBe("2021-05-07");
        });

        it("uses first format when format is an array", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(
                testDate,
                ["YYYY-MM-DD", "M/D/YYYY"],
                "en-US",
            );

            // Assert
            expect(result).toBe("2021-05-07");
        });

        it("uses ISO format when format is undefined", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, undefined, "en-US");

            // Assert
            expect(result).toBe("2021-05-07");
        });

        it("handles empty array by using ISO format", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, [] as any, "en-US");

            // Assert
            expect(result).toBe("2021-05-07");
        });
    });

    describe("parseDate", () => {
        it("parses ISO format date", () => {
            // Arrange
            const dateString = "2021-05-07";

            // Act
            const result = parseDate(dateString, "YYYY-MM-DD", "en-US");

            // Assert
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("parses MMMM D, YYYY format", () => {
            // Arrange
            const dateString = "May 7, 2021";

            // Act
            const result = parseDate(dateString, "MMMM D, YYYY", "en-US");

            // Assert
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("parses MMM D, YYYY format", () => {
            // Arrange
            const dateString = "May 7, 2021";

            // Act
            const result = parseDate(dateString, "MMM D, YYYY", "en-US");

            // Assert
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("parses M/D/YYYY format", () => {
            // Arrange
            const dateString = "5/7/2021";

            // Act
            const result = parseDate(dateString, "M/D/YYYY", "en-US");

            // Assert
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("parses MM/DD/YYYY format", () => {
            // Arrange
            const dateString = "05/07/2021";

            // Act
            const result = parseDate(dateString, "MM/DD/YYYY", "en-US");

            // Assert
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("parses M-D-YYYY format", () => {
            // Arrange
            const dateString = "5-7-2021";

            // Act
            const result = parseDate(dateString, "M-D-YYYY", "en-US");

            // Assert
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("returns undefined for empty string", () => {
            // Arrange
            const dateString = "";

            // Act
            const result = parseDate(dateString, "YYYY-MM-DD", "en-US");

            // Assert
            expect(result).toBeUndefined();
        });

        it("returns undefined for whitespace string", () => {
            // Arrange
            const dateString = "   ";

            // Act
            const result = parseDate(dateString, "YYYY-MM-DD", "en-US");

            // Assert
            expect(result).toBeUndefined();
        });

        it("returns undefined for invalid date", () => {
            // Arrange
            const dateString = "invalid";

            // Act
            const result = parseDate(dateString, "YYYY-MM-DD", "en-US");

            // Assert
            expect(result).toBeUndefined();
        });

        it("tries multiple formats when array is provided", () => {
            // Arrange
            const dateString = "5/7/2021";
            const formats = ["YYYY-MM-DD", "M/D/YYYY"];

            // Act
            const result = parseDate(dateString, formats, "en-US");

            // Assert
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("falls back to ISO format when no format is provided", () => {
            // Arrange
            const dateString = "2021-05-07";

            // Act
            const result = parseDate(dateString, null, "en-US");

            // Assert
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("parses month names using getMonths() for locale support", () => {
            // Arrange
            const dateString = "January 15, 2024";

            // Act
            const result = parseDate(dateString, "MMMM D, YYYY", "en-US");

            // Assert
            expect(result?.toString()).toBe("2024-01-15");
        });

        it("parses short month names using getMonths() for locale support", () => {
            // Arrange
            const dateString = "Jan 15, 2024";

            // Act
            const result = parseDate(dateString, "MMM D, YYYY", "en-US");

            // Assert
            expect(result?.toString()).toBe("2024-01-15");
        });

        it("parses month names in different locales using getMonths()", () => {
            // Arrange
            const dateString = "May 15, 2024";

            // Act
            const result = parseDate(dateString, "MMMM D, YYYY", "en-GB");

            // Assert
            expect(result?.toString()).toBe("2024-05-15");
        });
    });

    describe("temporalDateToJsDate", () => {
        it("returns a JavaScript Date instance", () => {
            // Arrange
            const temporal = Temporal.PlainDate.from("2021-05-07");

            // Act
            const jsDate = temporalDateToJsDate(temporal);

            // Assert
            expect(jsDate).toBeInstanceOf(Date);
        });

        it("converts year correctly", () => {
            // Arrange
            const temporal = Temporal.PlainDate.from("2021-05-07");

            // Act
            const jsDate = temporalDateToJsDate(temporal);

            // Assert
            expect(jsDate.getFullYear()).toBe(2021);
        });

        it("converts month correctly", () => {
            // Arrange
            const temporal = Temporal.PlainDate.from("2021-05-07");

            // Act
            const jsDate = temporalDateToJsDate(temporal);

            // Assert
            expect(jsDate.getMonth()).toBe(4); // 0-indexed
        });

        it("converts day correctly", () => {
            // Arrange
            const temporal = Temporal.PlainDate.from("2021-05-07");

            // Act
            const jsDate = temporalDateToJsDate(temporal);

            // Assert
            expect(jsDate.getDate()).toBe(7);
        });
    });

    describe("jsDateToTemporalDate", () => {
        it("converts year correctly", () => {
            // Arrange
            const jsDate = new Date(2021, 4, 7); // May 7, 2021

            // Act
            const temporal = jsDateToTemporalDate(jsDate);

            // Assert
            expect(temporal.year).toBe(2021);
        });

        it("converts month correctly", () => {
            // Arrange
            const jsDate = new Date(2021, 4, 7); // May 7, 2021

            // Act
            const temporal = jsDateToTemporalDate(jsDate);

            // Assert
            expect(temporal.month).toBe(5);
        });

        it("converts day correctly", () => {
            // Arrange
            const jsDate = new Date(2021, 4, 7); // May 7, 2021

            // Act
            const temporal = jsDateToTemporalDate(jsDate);

            // Assert
            expect(temporal.day).toBe(7);
        });
    });

    describe("parseDateToJsDate", () => {
        it("returns JavaScript Date instance when parsing valid date string", () => {
            // Arrange
            const dateString = "2021-05-07";

            // Act
            const result = parseDateToJsDate(dateString, "YYYY-MM-DD", "en-US");

            // Assert
            expect(result).toBeInstanceOf(Date);
        });

        it("parses year correctly from date string", () => {
            // Arrange
            const dateString = "2021-05-07";

            // Act
            const result = parseDateToJsDate(dateString, "YYYY-MM-DD", "en-US");

            // Assert
            expect(result?.getFullYear()).toBe(2021);
        });

        it("parses month correctly from date string", () => {
            // Arrange
            const dateString = "2021-05-07";

            // Act
            const result = parseDateToJsDate(dateString, "YYYY-MM-DD", "en-US");

            // Assert
            expect(result?.getMonth()).toBe(4); // 0-indexed
        });

        it("parses day correctly from date string", () => {
            // Arrange
            const dateString = "2021-05-07";

            // Act
            const result = parseDateToJsDate(dateString, "YYYY-MM-DD", "en-US");

            // Assert
            expect(result?.getDate()).toBe(7);
        });

        it("returns JavaScript Date instance when parsing MMMM D, YYYY format", () => {
            // Arrange
            const dateString = "May 7, 2021";

            // Act
            const result = parseDateToJsDate(
                dateString,
                "MMMM D, YYYY",
                "en-US",
            );

            // Assert
            expect(result).toBeInstanceOf(Date);
        });

        it("returns Date as-is when Date is passed in", () => {
            // Arrange
            const inputDate = new Date(2021, 4, 7);

            // Act
            const result = parseDateToJsDate(inputDate, "YYYY-MM-DD", "en-US");

            // Assert
            expect(result).toBe(inputDate);
        });

        it("returns undefined for empty string", () => {
            // Arrange
            const dateString = "";

            // Act
            const result = parseDateToJsDate(dateString, "YYYY-MM-DD", "en-US");

            // Assert
            expect(result).toBeUndefined();
        });

        it("returns undefined for invalid date", () => {
            // Arrange
            const dateString = "invalid";

            // Act
            const result = parseDateToJsDate(dateString, "YYYY-MM-DD", "en-US");

            // Assert
            expect(result).toBeUndefined();
        });

        it("handles null locale parameter and returns Date instance", () => {
            // Arrange
            const dateString = "2021-05-07";

            // Act
            const result = parseDateToJsDate(dateString, "YYYY-MM-DD", null);

            // Assert
            expect(result).toBeInstanceOf(Date);
        });
    });

    describe("getModifiersForDay", () => {
        it("returns empty array when no modifiers match", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7); // May 7, 2021
            const modifiers: Partial<CustomModifiers> = {
                disabled: () => false,
            };

            // Act
            const result = getModifiersForDay(testDate, modifiers);

            // Assert
            expect(result).toEqual([]);
        });

        it("returns modifier name when function matcher returns true", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7); // May 7, 2021
            const modifiers: Partial<CustomModifiers> = {
                disabled: (date: Date) => date.getDate() === 7,
            };

            // Act
            const result = getModifiersForDay(testDate, modifiers);

            // Assert
            expect(result).toEqual(["disabled"]);
        });

        it("returns modifier name when Date matcher matches", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7); // May 7, 2021
            const modifiers: Partial<CustomModifiers> = {
                selected: new Date(2021, 4, 7),
            };

            // Act
            const result = getModifiersForDay(testDate, modifiers);

            // Assert
            expect(result).toEqual(["selected"]);
        });

        it("does not match Date with different day", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7); // May 7, 2021
            const modifiers: Partial<CustomModifiers> = {
                selected: new Date(2021, 4, 8), // May 8
            };

            // Act
            const result = getModifiersForDay(testDate, modifiers);

            // Assert
            expect(result).toEqual([]);
        });

        it("returns all matching modifiers when multiple match", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7); // May 7, 2021
            const modifiers: Partial<CustomModifiers> = {
                selected: new Date(2021, 4, 7),
                disabled: (date: Date) => date.getMonth() === 4,
                highlighted: new Date(2021, 4, 7),
            };

            // Act
            const result = getModifiersForDay(testDate, modifiers);

            // Assert
            expect(result).toHaveLength(3);
        });

        it("includes selected modifier when it matches", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7); // May 7, 2021
            const modifiers: Partial<CustomModifiers> = {
                selected: new Date(2021, 4, 7),
                disabled: (date: Date) => date.getMonth() === 4,
                highlighted: new Date(2021, 4, 7),
            };

            // Act
            const result = getModifiersForDay(testDate, modifiers);

            // Assert
            expect(result).toContain("selected");
        });

        it("includes disabled modifier when it matches", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7); // May 7, 2021
            const modifiers: Partial<CustomModifiers> = {
                selected: new Date(2021, 4, 7),
                disabled: (date: Date) => date.getMonth() === 4,
                highlighted: new Date(2021, 4, 7),
            };

            // Act
            const result = getModifiersForDay(testDate, modifiers);

            // Assert
            expect(result).toContain("disabled");
        });

        it("includes highlighted modifier when it matches", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7); // May 7, 2021
            const modifiers: Partial<CustomModifiers> = {
                selected: new Date(2021, 4, 7),
                disabled: (date: Date) => date.getMonth() === 4,
                highlighted: new Date(2021, 4, 7),
            };

            // Act
            const result = getModifiersForDay(testDate, modifiers);

            // Assert
            expect(result).toContain("highlighted");
        });

        it("ignores null/undefined modifiers", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7); // May 7, 2021
            const modifiers: Partial<CustomModifiers> = {
                disabled: undefined,
                selected: null as any,
                highlighted: new Date(2021, 4, 7),
            };

            // Act
            const result = getModifiersForDay(testDate, modifiers);

            // Assert
            expect(result).toEqual(["highlighted"]);
        });

        it("handles empty modifiers object", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7); // May 7, 2021

            // Act
            const result = getModifiersForDay(testDate, {});

            // Assert
            expect(result).toEqual([]);
        });

        it("matches Date at midnight correctly", () => {
            // Arrange
            const dateAtMidnight = new Date(2021, 4, 7, 0, 0, 0);
            const dateWithTime = new Date(2021, 4, 7, 15, 30, 45);
            const modifiers: Partial<CustomModifiers> = {
                selected: dateAtMidnight,
            };

            // Act
            const result = getModifiersForDay(dateWithTime, modifiers);

            // Assert
            expect(result).toEqual(["selected"]);
        });
    });

    describe("getFirstDayOfWeek", () => {
        it("returns 0 (Sunday) for en-US locale", () => {
            // Arrange
            const locale = "en-US";

            // Act
            const result = getFirstDayOfWeek(locale);

            // Assert
            expect(result).toBe(0);
        });

        it("returns 0 (Sunday) for en-CA locale", () => {
            // Arrange
            const locale = "en-CA";

            // Act
            const result = getFirstDayOfWeek(locale);

            // Assert
            expect(result).toBe(0);
        });

        it("returns 0 (Sunday) for ja locale", () => {
            // Arrange
            const locale = "ja";

            // Act
            const result = getFirstDayOfWeek(locale);

            // Assert
            expect(result).toBe(0);
        });

        it("returns 1 (Monday) for en-GB locale", () => {
            // Arrange
            const locale = "en-GB";

            // Act
            const result = getFirstDayOfWeek(locale);

            // Assert
            expect(result).toBe(1);
        });

        it("returns 1 (Monday) for default/no locale", () => {
            // Arrange
            // No locale provided

            // Act
            const result = getFirstDayOfWeek();

            // Assert
            expect(result).toBe(1);
        });
    });

    describe("getMonths", () => {
        it("returns 12 months", () => {
            // Arrange
            const locale = "en-US";

            // Act
            const months = getMonths(locale);

            // Assert
            expect(months).toHaveLength(12);
        });

        it("returns January with long and short names", () => {
            // Arrange
            const locale = "en-US";

            // Act
            const months = getMonths(locale);

            // Assert
            expect(months[0]).toEqual(["January", "Jan"]);
        });

        it("returns May with long and short names", () => {
            // Arrange
            const locale = "en-US";

            // Act
            const months = getMonths(locale);

            // Assert
            expect(months[4]).toEqual(["May", "May"]);
        });

        it("returns December with long and short names", () => {
            // Arrange
            const locale = "en-US";

            // Act
            const months = getMonths(locale);

            // Assert
            expect(months[11]).toEqual(["December", "Dec"]);
        });
    });

    describe("getWeekdaysLong", () => {
        it("returns 7 weekdays", () => {
            // Arrange
            const locale = "en-US";

            // Act
            const weekdays = getWeekdaysLong(locale);

            // Assert
            expect(weekdays).toHaveLength(7);
        });

        it("starts with Sunday", () => {
            // Arrange
            const locale = "en-US";

            // Act
            const weekdays = getWeekdaysLong(locale);

            // Assert
            expect(weekdays[0]).toBe("Sunday");
        });

        it("ends with Saturday", () => {
            // Arrange
            const locale = "en-US";

            // Act
            const weekdays = getWeekdaysLong(locale);

            // Assert
            expect(weekdays[6]).toBe("Saturday");
        });
    });

    describe("getWeekdaysShort", () => {
        it("returns 7 weekdays", () => {
            // Arrange
            const locale = "en-US";

            // Act
            const weekdays = getWeekdaysShort(locale);

            // Assert
            expect(weekdays).toHaveLength(7);
        });

        it("starts with Sun", () => {
            // Arrange
            const locale = "en-US";

            // Act
            const weekdays = getWeekdaysShort(locale);

            // Assert
            expect(weekdays[0]).toBe("Sun");
        });

        it("ends with Sat", () => {
            // Arrange
            const locale = "en-US";

            // Act
            const weekdays = getWeekdaysShort(locale);

            // Assert
            expect(weekdays[6]).toBe("Sat");
        });
    });
});

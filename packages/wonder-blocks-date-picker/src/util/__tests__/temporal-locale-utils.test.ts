import {describe, it} from "@jest/globals";
import {Temporal} from "temporal-polyfill";
import {es, fr} from "react-day-picker/locale";

import {
    formatDate,
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
    describe("formatDate", () => {
        it("should format date with YYYY-MM-DD format", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, "YYYY-MM-DD", "en-US");

            // Assert
            expect(result).toBe("2021-05-07");
        });

        it("should format date with MMMM D, YYYY format", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, "MMMM D, YYYY", "en-US");

            // Assert
            expect(result).toBe("May 7, 2021");
        });

        it("should format date with M/D/YYYY format", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, "M/D/YYYY", "en-US");

            // Assert
            expect(result).toBe("5/7/2021");
        });

        it("should format date with MM/DD/YYYY format", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, "MM/DD/YYYY", "en-US");

            // Assert
            expect(result).toBe("05/07/2021");
        });

        it("should use ISO format when format is null", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, null, "en-US");

            // Assert
            expect(result).toBe("2021-05-07");
        });

        it("should use ISO format when format is undefined", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, undefined, "en-US");

            // Assert
            expect(result).toBe("2021-05-07");
        });

        it("should use ISO format when format is empty array", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, [] as any, "en-US");

            // Assert
            expect(result).toBe("2021-05-07");
        });

        it("should use first format when format is an array", () => {
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

        it("should format date with short year in US locale", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, "MM/DD/YY", "en-US");

            // Assert
            expect(result).toBe("05/07/21");
        });

        it("should format date with full weekday and month in US locale", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, "dddd, MMMM D, YYYY", "en-US");

            // Assert
            expect(result).toBe("Friday, May 7, 2021");
        });

        it("should format date in French locale", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, "D MMMM YYYY", "fr-FR");

            // Assert
            expect(result).toBe("7 mai 2021");
        });

        it("should format date in German locale", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, "D MMMM YYYY", "de-DE");

            // Assert
            expect(result).toBe("7. Mai 2021");
        });

        it("should accept Spanish Locale object from react-day-picker with full month", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2026-01-16");

            // Act
            const result = formatDate(testDate, "MMMM D, YYYY", es);

            // Assert
            expect(result).toBe("enero 16, 2026");
        });

        it("should accept Spanish Locale object from react-day-picker with short month", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2026-01-16");

            // Act
            const result = formatDate(testDate, "MMM D, YYYY", es);

            // Assert
            expect(result).toBe("ene 16, 2026");
        });

        it("should accept French Locale object from react-day-picker", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2026-01-16");

            // Act
            const result = formatDate(testDate, "MMMM D, YYYY", fr);

            // Assert
            expect(result).toBe("janvier 16, 2026");
        });

        it("should fall back to ISO format on invalid locale", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");
            const consoleSpy = jest.spyOn(console, "warn").mockImplementation();

            // Act
            const result = formatDate(
                testDate,
                "MMMM D, YYYY",
                "invalid-locale-xyz",
            );

            // Assert
            expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$|^\w+/);
            consoleSpy.mockRestore();
        });

        it("should use default locale when not provided", () => {
            // Arrange
            const testDate = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = formatDate(testDate, "MMMM D, YYYY");

            // Assert
            expect(result).toBe("May 7, 2021");
        });
    });

    describe("parseDate", () => {
        it("should parse ISO format", () => {
            // Arrange
            const input = "2021-05-07";

            // Act
            const result = parseDate(input, "YYYY-MM-DD", "en-US");

            // Assert
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("should parse text format", () => {
            // Arrange
            const input = "May 7, 2021";

            // Act
            const result = parseDate(input, "MMMM D, YYYY", "en-US");

            // Assert
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("should parse numeric format", () => {
            // Arrange
            const input = "05/07/2021";

            // Act
            const result = parseDate(input, "MM/DD/YYYY", "en-US");

            // Assert
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("should return undefined for invalid input", () => {
            // Arrange
            const input = "invalid";

            // Act
            const result = parseDate(input, "YYYY-MM-DD", "en-US");

            // Assert
            expect(result).toBeUndefined();
        });

        it("should try multiple formats when array is provided", () => {
            // Arrange
            const input = "5/7/2021";

            // Act
            const result = parseDate(
                input,
                ["YYYY-MM-DD", "M/D/YYYY"],
                "en-US",
            );

            // Assert
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("should fall back to ISO format when format is null", () => {
            // Arrange
            const input = "2021-05-07";

            // Act
            const result = parseDate(input, null, "en-US");

            // Assert
            expect(result?.toString()).toBe("2021-05-07");
        });

        it("should parse full month name", () => {
            // Arrange
            const input = "January 15, 2024";

            // Act
            const result = parseDate(input, "MMMM D, YYYY", "en-US");

            // Assert
            expect(result?.toString()).toBe("2024-01-15");
        });

        it("should parse abbreviated month name", () => {
            // Arrange
            const input = "Jan 15, 2024";

            // Act
            const result = parseDate(input, "MMM D, YYYY", "en-US");

            // Assert
            expect(result?.toString()).toBe("2024-01-15");
        });

        it("should reject partial or invalid year", () => {
            // Arrange
            const input = "July 20, 202";

            // Act
            const result = parseDate(input, "MMMM D, YYYY");

            // Assert
            expect(result).toBeUndefined();
        });
    });

    describe("temporalDateToJsDate", () => {
        it("should convert to Date with zero-indexed month", () => {
            // Arrange
            const temporal = Temporal.PlainDate.from("2021-05-07");

            // Act
            const result = temporalDateToJsDate(temporal);

            // Assert
            expect(result.getMonth()).toBe(4); // May = 4 (zero-indexed)
        });
    });

    describe("jsDateToTemporalDate", () => {
        it("should convert to Temporal with one-indexed month", () => {
            // Arrange
            const jsDate = new Date(2021, 4, 7);

            // Act
            const result = jsDateToTemporalDate(jsDate);

            // Assert
            expect(result.month).toBe(5); // May = 5 (one-indexed)
        });
    });

    describe("parseDateToJsDate", () => {
        it("should parse ISO format", () => {
            // Arrange
            const input = "2021-05-07";

            // Act
            const result = parseDateToJsDate(input, "YYYY-MM-DD", "en-US");

            // Assert
            expect(result?.getDate()).toBe(7);
        });

        it("should parse text format", () => {
            // Arrange
            const input = "May 7, 2021";

            // Act
            const result = parseDateToJsDate(input, "MMMM D, YYYY", "en-US");

            // Assert
            expect(result?.getDate()).toBe(7);
        });

        it("should return Date as-is when Date is passed in", () => {
            // Arrange
            const inputDate = new Date(2021, 4, 7);

            // Act
            const result = parseDateToJsDate(inputDate, "YYYY-MM-DD", "en-US");

            // Assert
            expect(result).toBe(inputDate);
        });

        it("should return undefined for empty or invalid string", () => {
            // Arrange
            const input = "invalid";

            // Act
            const result = parseDateToJsDate(input, "YYYY-MM-DD", "en-US");

            // Assert
            expect(result).toBeUndefined();
        });

        it("should reject partial input", () => {
            // Arrange
            const input = "2026";

            // Act
            const result = parseDateToJsDate(input, "MM/DD/YYYY", "en-US");

            // Assert
            expect(result).toBeUndefined();
        });

        it("should accept unpadded input", () => {
            // Arrange
            const input = "1/30/2026";

            // Act
            const result = parseDateToJsDate(input, "MM/DD/YYYY", "en-US");

            // Assert
            expect(result?.getDate()).toBe(30);
        });

        it("should accept ISO format regardless of specified format", () => {
            // Arrange
            const input = "2026-01-30";

            // Act
            const result = parseDateToJsDate(input, "MM/DD/YYYY", "en-US");

            // Assert
            expect(result?.getDate()).toBe(30);
        });
    });

    describe("getModifiersForDay", () => {
        it("should return empty array when modifier predicate returns false", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7);

            // Act
            const result = getModifiersForDay(testDate, {
                disabled: () => false,
            });

            // Assert
            expect(result).toEqual([]);
        });

        it("should return disabled when predicate matches", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7);
            const modifiers = {disabled: (date: Date) => date.getDate() === 7};

            // Act
            const result = getModifiersForDay(testDate, modifiers);

            // Assert
            expect(result).toEqual(["disabled"]);
        });

        it("should return selected when date matches", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7);
            const modifiers = {selected: new Date(2021, 4, 7)};

            // Act
            const result = getModifiersForDay(testDate, modifiers);

            // Assert
            expect(result).toEqual(["selected"]);
        });

        it("should return empty array when selected date does not match", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7);
            const modifiers = {selected: new Date(2021, 4, 8)};

            // Act
            const result = getModifiersForDay(testDate, modifiers);

            // Assert
            expect(result).toEqual([]);
        });

        it("should return all matching modifiers", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7);
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

        it("should include selected in result when it matches", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7);
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

        it("should include disabled in result when it matches", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7);
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

        it("should include highlighted in result when it matches", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7);
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

        it("should filter out undefined modifiers", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7);
            const modifiers = {
                disabled: undefined,
                selected: null as any,
                highlighted: new Date(2021, 4, 7),
            };

            // Act
            const result = getModifiersForDay(testDate, modifiers);

            // Assert
            expect(result).toEqual(["highlighted"]);
        });

        it("should return empty array for empty modifiers object", () => {
            // Arrange
            const testDate = new Date(2021, 4, 7);

            // Act
            const result = getModifiersForDay(testDate, {});

            // Assert
            expect(result).toEqual([]);
        });

        it("should match dates ignoring time component", () => {
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

    describe("startOfIsoWeek", () => {
        it("should return same date for Monday", () => {
            // Arrange
            const monday = Temporal.PlainDate.from("2021-05-03");

            // Act
            const result = startOfIsoWeek(monday);

            // Assert
            expect(result.toString()).toBe("2021-05-03");
        });

        it("should return Monday for Wednesday", () => {
            // Arrange
            const wednesday = Temporal.PlainDate.from("2021-05-05");

            // Act
            const result = startOfIsoWeek(wednesday);

            // Assert
            expect(result.toString()).toBe("2021-05-03");
        });

        it("should return Monday for Sunday", () => {
            // Arrange
            const sunday = Temporal.PlainDate.from("2021-05-09");

            // Act
            const result = startOfIsoWeek(sunday);

            // Assert
            expect(result.toString()).toBe("2021-05-03");
        });

        it("should handle week spanning across months", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2021-06-02");

            // Act
            const result = startOfIsoWeek(date);

            // Assert
            expect(result.toString()).toBe("2021-05-31");
        });

        it("should handle week spanning across years", () => {
            // Arrange
            const date = Temporal.PlainDate.from("2021-01-01");

            // Act
            const result = startOfIsoWeek(date);

            // Assert
            expect(result.toString()).toBe("2020-12-28");
        });
    });

    describe("startOfDay", () => {
        it("should set hours to 0", () => {
            // Arrange
            const date = new Date(2021, 4, 7, 15, 30, 45, 500);

            // Act
            const result = startOfDay(date);

            // Assert
            expect(result.getHours()).toBe(0);
        });

        it("should set minutes to 0", () => {
            // Arrange
            const date = new Date(2021, 4, 7, 15, 30, 45, 500);

            // Act
            const result = startOfDay(date);

            // Assert
            expect(result.getMinutes()).toBe(0);
        });

        it("should set seconds to 0", () => {
            // Arrange
            const date = new Date(2021, 4, 7, 15, 30, 45, 500);

            // Act
            const result = startOfDay(date);

            // Assert
            expect(result.getSeconds()).toBe(0);
        });

        it("should set milliseconds to 0", () => {
            // Arrange
            const date = new Date(2021, 4, 7, 15, 30, 45, 500);

            // Act
            const result = startOfDay(date);

            // Assert
            expect(result.getMilliseconds()).toBe(0);
        });

        it("should preserve date", () => {
            // Arrange
            const date = new Date(2021, 4, 7, 15, 30, 45, 500);

            // Act
            const result = startOfDay(date);

            // Assert
            expect(result.toDateString()).toBe("Fri May 07 2021");
        });

        it("should not mutate original date", () => {
            // Arrange
            const date = new Date(2021, 4, 7, 15, 30, 45, 500);
            const originalTime = date.getTime();

            // Act
            startOfDay(date);

            // Assert
            expect(date.getTime()).toBe(originalTime);
        });
    });

    describe("endOfDay", () => {
        it("should set hours to 23", () => {
            // Arrange
            const date = new Date(2021, 4, 7, 10, 15, 30, 250);

            // Act
            const result = endOfDay(date);

            // Assert
            expect(result.getHours()).toBe(23);
        });

        it("should set minutes to 59", () => {
            // Arrange
            const date = new Date(2021, 4, 7, 10, 15, 30, 250);

            // Act
            const result = endOfDay(date);

            // Assert
            expect(result.getMinutes()).toBe(59);
        });

        it("should set seconds to 59", () => {
            // Arrange
            const date = new Date(2021, 4, 7, 10, 15, 30, 250);

            // Act
            const result = endOfDay(date);

            // Assert
            expect(result.getSeconds()).toBe(59);
        });

        it("should set milliseconds to 999", () => {
            // Arrange
            const date = new Date(2021, 4, 7, 10, 15, 30, 250);

            // Act
            const result = endOfDay(date);

            // Assert
            expect(result.getMilliseconds()).toBe(999);
        });

        it("should preserve date", () => {
            // Arrange
            const date = new Date(2021, 4, 7, 10, 15, 30, 250);

            // Act
            const result = endOfDay(date);

            // Assert
            expect(result.toDateString()).toBe("Fri May 07 2021");
        });

        it("should not mutate original date", () => {
            // Arrange
            const date = new Date(2021, 4, 7, 10, 15, 30, 250);
            const originalTime = date.getTime();

            // Act
            endOfDay(date);

            // Assert
            expect(date.getTime()).toBe(originalTime);
        });
    });
});

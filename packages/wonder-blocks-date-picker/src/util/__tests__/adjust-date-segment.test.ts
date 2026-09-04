import {describe, it, expect} from "@jest/globals";
import {Temporal} from "temporal-polyfill";

import {adjustDateSegment} from "../adjust-date-segment";

describe("adjustDateSegment", () => {
    it("increments the day", () => {
        // Arrange
        const date = Temporal.PlainDate.from("2026-01-16");

        // Act
        const result = adjustDateSegment(date, "day", 1);

        // Assert
        expect(result.toString()).toBe("2026-01-17");
    });

    it("decrements the day", () => {
        // Arrange
        const date = Temporal.PlainDate.from("2026-01-16");

        // Act
        const result = adjustDateSegment(date, "day", -1);

        // Assert
        expect(result.toString()).toBe("2026-01-15");
    });

    it("wraps the day forward past the end of the month", () => {
        // Arrange
        const endOfMonth = Temporal.PlainDate.from("2026-01-31");

        // Act
        const result = adjustDateSegment(endOfMonth, "day", 1);

        // Assert
        expect(result.toString()).toBe("2026-01-01");
    });

    it("wraps the day backward past the start of the month", () => {
        // Arrange
        const startOfMonth = Temporal.PlainDate.from("2026-01-01");

        // Act
        const result = adjustDateSegment(startOfMonth, "day", -1);

        // Assert
        expect(result.toString()).toBe("2026-01-31");
    });

    it("wraps the month forward past December", () => {
        // Arrange
        const december = Temporal.PlainDate.from("2026-12-16");

        // Act
        const result = adjustDateSegment(december, "month", 1);

        // Assert
        expect(result.toString()).toBe("2026-01-16");
    });

    it("wraps the month backward past January", () => {
        // Arrange
        const january = Temporal.PlainDate.from("2026-01-16");

        // Act
        const result = adjustDateSegment(january, "month", -1);

        // Assert
        expect(result.toString()).toBe("2026-12-16");
    });

    it("constrains the day when the month changes to a shorter month", () => {
        // Arrange
        const jan31 = Temporal.PlainDate.from("2026-01-31");

        // Act
        const result = adjustDateSegment(jan31, "month", 1);

        // Assert
        expect(result.toString()).toBe("2026-02-28");
    });

    it("constrains Feb 29 on a leap year when the year changes to a non-leap year", () => {
        // Arrange
        const leapDay = Temporal.PlainDate.from("2024-02-29");

        // Act
        const result = adjustDateSegment(leapDay, "year", 1);

        // Assert
        expect(result.toString()).toBe("2025-02-28");
    });

    it("increments the year", () => {
        // Arrange
        const date = Temporal.PlainDate.from("2026-01-16");

        // Act
        const result = adjustDateSegment(date, "year", 1);

        // Assert
        expect(result.toString()).toBe("2027-01-16");
    });

    it("decrements the year", () => {
        // Arrange
        const date = Temporal.PlainDate.from("2026-01-16");

        // Act
        const result = adjustDateSegment(date, "year", -1);

        // Assert
        expect(result.toString()).toBe("2025-01-16");
    });
});

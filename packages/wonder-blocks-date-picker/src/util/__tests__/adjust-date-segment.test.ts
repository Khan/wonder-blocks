import {describe, it, expect} from "@jest/globals";
import {Temporal} from "temporal-polyfill";

import {adjustDateSegment} from "../adjust-date-segment";

describe("adjustDateSegment", () => {
    const date = Temporal.PlainDate.from("2026-01-16");

    it("increments the day", () => {
        expect(adjustDateSegment(date, "day", 1).toString()).toBe("2026-01-17");
    });

    it("decrements the day", () => {
        expect(adjustDateSegment(date, "day", -1).toString()).toBe(
            "2026-01-15",
        );
    });

    it("wraps the day forward past the end of the month", () => {
        const endOfMonth = Temporal.PlainDate.from("2026-01-31");
        expect(adjustDateSegment(endOfMonth, "day", 1).toString()).toBe(
            "2026-01-01",
        );
    });

    it("wraps the day backward past the start of the month", () => {
        const startOfMonth = Temporal.PlainDate.from("2026-01-01");
        expect(adjustDateSegment(startOfMonth, "day", -1).toString()).toBe(
            "2026-01-31",
        );
    });

    it("wraps the month forward past December", () => {
        const december = Temporal.PlainDate.from("2026-12-16");
        expect(adjustDateSegment(december, "month", 1).toString()).toBe(
            "2026-01-16",
        );
    });

    it("wraps the month backward past January", () => {
        const january = Temporal.PlainDate.from("2026-01-16");
        expect(adjustDateSegment(january, "month", -1).toString()).toBe(
            "2026-12-16",
        );
    });

    it("constrains the day when the month changes to a shorter month", () => {
        const jan31 = Temporal.PlainDate.from("2026-01-31");
        expect(adjustDateSegment(jan31, "month", 1).toString()).toBe(
            "2026-02-28",
        );
    });

    it("constrains Feb 29 on a leap year when the year changes to a non-leap year", () => {
        const leapDay = Temporal.PlainDate.from("2024-02-29");
        expect(adjustDateSegment(leapDay, "year", 1).toString()).toBe(
            "2025-02-28",
        );
    });

    it("increments the year", () => {
        expect(adjustDateSegment(date, "year", 1).toString()).toBe(
            "2027-01-16",
        );
    });

    it("decrements the year", () => {
        expect(adjustDateSegment(date, "year", -1).toString()).toBe(
            "2025-01-16",
        );
    });
});

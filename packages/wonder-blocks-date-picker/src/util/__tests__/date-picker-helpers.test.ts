import {describe, it} from "@jest/globals";
import {Temporal} from "temporal-polyfill";

import {TemporalLocaleUtils} from "../temporal-locale-utils";
import {isTextFormatCommitComplete} from "../date-picker-helpers";

describe("date-picker-helpers", () => {
    describe("isTextFormatCommitComplete", () => {
        it("returns false when inputValue is empty string", () => {
            // Arrange
            const date = TemporalLocaleUtils.temporalDateToJsDate(
                Temporal.PlainDate.from("2026-01-16"),
            );
            // Act
            const result = isTextFormatCommitComplete(
                "",
                date,
                "MMMM D, YYYY",
                "en-US",
            );
            // Assert
            expect(result).toBe(false);
        });

        it("returns false when inputValue is whitespace only", () => {
            // Arrange
            const date = TemporalLocaleUtils.temporalDateToJsDate(
                Temporal.PlainDate.from("2026-01-16"),
            );
            // Act
            const result = isTextFormatCommitComplete(
                "   ",
                date,
                "MMMM D, YYYY",
                "en-US",
            );
            // Assert
            expect(result).toBe(false);
        });

        it("returns true when input exactly matches formatted date (MMMM D, YYYY)", () => {
            // Arrange
            const date = TemporalLocaleUtils.temporalDateToJsDate(
                Temporal.PlainDate.from("2026-01-16"),
            );
            const inputValue = "January 16, 2026";
            // Act
            const result = isTextFormatCommitComplete(
                inputValue,
                date,
                "MMMM D, YYYY",
                "en-US",
            );
            // Assert
            expect(result).toBe(true);
        });

        it("returns true when input matches formatted date after normalization (spacing/capitalization)", () => {
            // Arrange
            const date = TemporalLocaleUtils.temporalDateToJsDate(
                Temporal.PlainDate.from("2026-01-16"),
            );
            const inputValue = "  january  16 ,  2026  ";
            // Act
            const result = isTextFormatCommitComplete(
                inputValue,
                date,
                "MMMM D, YYYY",
                "en-US",
            );
            // Assert
            expect(result).toBe(true);
        });

        it("returns false when reparsed date does not match dateFromInput", () => {
            // Arrange - user typed a different date than dateFromInput
            const dateFromInput = TemporalLocaleUtils.temporalDateToJsDate(
                Temporal.PlainDate.from("2026-01-16"),
            );
            const inputValue = "January 20, 2026";
            // Act
            const result = isTextFormatCommitComplete(
                inputValue,
                dateFromInput,
                "MMMM D, YYYY",
                "en-US",
            );
            // Assert
            expect(result).toBe(false);
        });

        it("returns false when input is partial (e.g. month name only)", () => {
            // Arrange - "January" does not match formatted "January 16, 2026"
            const date = TemporalLocaleUtils.temporalDateToJsDate(
                Temporal.PlainDate.from("2026-01-16"),
            );
            const inputValue = "January";
            // Act
            const result = isTextFormatCommitComplete(
                inputValue,
                date,
                "MMMM D, YYYY",
                "en-US",
            );
            // Assert
            expect(result).toBe(false);
        });

        it("returns true for LL format when input matches formatted date", () => {
            // Arrange
            const date = TemporalLocaleUtils.temporalDateToJsDate(
                Temporal.PlainDate.from("2026-01-20"),
            );
            const inputValue = "January 20, 2026";
            // Act
            const result = isTextFormatCommitComplete(
                inputValue,
                date,
                "LL",
                "en-US",
            );
            // Assert
            expect(result).toBe(true);
        });

        it("returns true for MMM D, YYYY format when input matches", () => {
            // Arrange
            const date = TemporalLocaleUtils.temporalDateToJsDate(
                Temporal.PlainDate.from("2026-01-16"),
            );
            const inputValue = "Jan 16, 2026";
            // Act
            const result = isTextFormatCommitComplete(
                inputValue,
                date,
                "MMM D, YYYY",
                "en-US",
            );
            // Assert
            expect(result).toBe(true);
        });
    });
});

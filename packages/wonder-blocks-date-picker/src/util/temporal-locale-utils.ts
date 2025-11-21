import {Temporal} from "temporal-polyfill";

/**
 * Utility functions for working with Temporal dates in react-day-picker.
 * These replace the MomentLocaleUtils that were previously used.
 *
 * Question: Should we move this to a separate package?
 */

/**
 * Format a Temporal.PlainDate using a format string.
 * Supports a subset of moment.js format tokens for compatibility.
 */
export function formatDate(
    date: Temporal.PlainDate,
    format: string | Array<string> | null | undefined,
    locale: string = "en",
): string {
    // If format is an array, use the first one
    const formatString = Array.isArray(format) ? format[0] : format;

    if (!formatString) {
        // Default format: ISO 8601 (YYYY-MM-DD)
        return date.toString();
    }

    // Common format patterns
    if (formatString === "YYYY-MM-DD") {
        return date.toString(); // ISO format
    }

    // For complex formats, use Intl.DateTimeFormat with approximations
    // Convert Temporal.PlainDate to a Date for formatting
    const jsDate = temporalDateToJsDate(date);
    const formatter = getFormatterForFormat(formatString, locale);

    return formatter.format(jsDate);
}

/**
 * Parse a date string into a Temporal.PlainDate.
 * Attempts multiple formats if an array is provided.
 */
export function parseDate(
    str: string,
    format: string | Array<string> | null | undefined,
    locale?: string,
): Temporal.PlainDate | undefined {
    if (!str || str.trim() === "") {
        return undefined;
    }

    const formats = Array.isArray(format) ? format : [format || "YYYY-MM-DD"];

    // Try ISO format first (most common)
    try {
        return Temporal.PlainDate.from(str);
    } catch {
        // Continue to try other formats
    }

    // Try parsing with Intl for locale-specific formats
    for (const fmt of formats) {
        try {
            const parsed = parseWithFormat(str, fmt, locale);
            if (parsed) {
                return parsed;
            }
        } catch {
            // Try next format
            continue;
        }
    }

    return undefined;
}

/**
 * Convert a Temporal.PlainDate to a JavaScript Date object.
 * Sets the time to midnight in the local timezone.
 */
export function temporalDateToJsDate(date: Temporal.PlainDate): Date {
    return new Date(date.year, date.month - 1, date.day);
}

/**
 * Convert a JavaScript Date to a Temporal.PlainDate.
 * Uses local date components (not UTC).
 */
export function jsDateToTemporalDate(date: Date): Temporal.PlainDate {
    return Temporal.PlainDate.from({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
    });
}

/**
 * Get the first day of the week for a given locale.
 * Returns 0 for Sunday, 1 for Monday, etc.
 */
export function getFirstDayOfWeek(locale?: string): number {
    // Most locales use Monday (1), but some like US use Sunday (0)
    const localeStr = locale || "en-US";

    // US, Canada, and some others use Sunday
    if (
        localeStr.startsWith("en-US") ||
        localeStr.startsWith("en-CA") ||
        localeStr.startsWith("ja") ||
        localeStr.startsWith("ko")
    ) {
        return 0; // Sunday
    }

    return 1; // Monday (most of the world)
}

/**
 * Get month names for a given locale.
 */
export function getMonths(locale?: string): string[][] {
    const format = new Intl.DateTimeFormat(locale || "en", {month: "long"});
    const formatShort = new Intl.DateTimeFormat(locale || "en", {
        month: "short",
    });

    const months: string[][] = [];
    for (let i = 0; i < 12; i++) {
        const date = new Date(2021, i, 15); // Use a date in the middle of month
        months.push([format.format(date), formatShort.format(date)]);
    }

    return months;
}

/**
 * Get weekday names for a given locale.
 */
export function getWeekdaysLong(locale?: string): string[] {
    const format = new Intl.DateTimeFormat(locale || "en", {weekday: "long"});
    const weekdays: string[] = [];

    // Start with Sunday (day 0) through Saturday (day 6)
    for (let i = 0; i < 7; i++) {
        const date = new Date(2021, 0, 3 + i); // Jan 3, 2021 is a Sunday
        weekdays.push(format.format(date));
    }

    return weekdays;
}

/**
 * Get short weekday names for a given locale.
 */
export function getWeekdaysShort(locale?: string): string[] {
    const format = new Intl.DateTimeFormat(locale || "en", {weekday: "short"});
    const weekdays: string[] = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(2021, 0, 3 + i);
        weekdays.push(format.format(date));
    }

    return weekdays;
}

// Helper functions

function getFormatterForFormat(
    format: string,
    locale: string,
): Intl.DateTimeFormat {
    // Map common moment format patterns to Intl.DateTimeFormat options
    const options: Intl.DateTimeFormatOptions = {};

    // Detect year
    if (format.includes("YYYY")) {
        options.year = "numeric";
    } else if (format.includes("YY")) {
        options.year = "2-digit";
    }

    // Detect month
    if (format.includes("MMMM")) {
        options.month = "long";
    } else if (format.includes("MMM")) {
        options.month = "short";
    } else if (format.includes("MM")) {
        options.month = "2-digit";
    } else if (format.includes("M")) {
        options.month = "numeric";
    }

    // Detect day
    if (format.includes("DD")) {
        options.day = "2-digit";
    } else if (format.includes("D")) {
        options.day = "numeric";
    }

    // Detect weekday
    if (format.includes("dddd")) {
        options.weekday = "long";
    } else if (format.includes("ddd")) {
        options.weekday = "short";
    }

    return new Intl.DateTimeFormat(locale, options);
}

function parseWithFormat(
    str: string,
    format: string | null | undefined,
    locale?: string,
): Temporal.PlainDate | undefined {
    if (!format) {
        return undefined;
    }

    // Handle common formats manually
    // This is a simplified parser - you may need to expand this based on your needs

    // M/D/YYYY or M-D-YYYY
    if (format === "M/D/YYYY" || format === "M-D-YYYY") {
        const separator = format.includes("/") ? "/" : "-";
        const parts = str.split(separator);
        if (parts.length === 3) {
            try {
                return Temporal.PlainDate.from({
                    year: parseInt(parts[2], 10),
                    month: parseInt(parts[0], 10),
                    day: parseInt(parts[1], 10),
                });
            } catch {
                return undefined;
            }
        }
    }

    // For more complex parsing, you might need a proper date parsing library
    // or implement more format patterns as needed

    return undefined;
}

/**
 * LocaleUtils object compatible with react-day-picker's expected interface.
 */
export const TemporalLocaleUtils = {
    formatDate,
    parseDate,
    getFirstDayOfWeek,
    getMonths,
    getWeekdaysLong,
    getWeekdaysShort,
};

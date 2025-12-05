import {Temporal} from "temporal-polyfill";
import {CustomModifiers} from "./types";

/**
 * Utility functions for working with Temporal dates in react-day-picker.
 * These replace the MomentLocaleUtils that were previously used.
 *
 * Question: Should we move this to a separate package?
 */

/**
 * Format a Temporal.PlainDate using a format string.
 * Supports a subset of moment.js format tokens for compatibility.
 *
 * @param date - The Temporal.PlainDate to format
 * @param format - The format string(s) to use for formatting:
 *   - **string**: Uses the specified format (e.g., "YYYY-MM-DD", "MMM D, YYYY")
 *   - **Array<string>**: Uses the **first** format in the array (ignores the rest)
 *   - **null**: Returns ISO 8601 format (YYYY-MM-DD)
 *   - **undefined**: Returns ISO 8601 format (YYYY-MM-DD)
 * @param locale - The locale to use for formatting (default: "en")
 * @returns The formatted date string
 *
 * @example
 * formatDate(date, "YYYY-MM-DD", "en") // => "2024-01-15"
 * formatDate(date, ["MMM D, YYYY", "M/D/YYYY"], "en") // => "Jan 15, 2024" (uses first format)
 * formatDate(date, null, "en") // => "2024-01-15" (ISO format)
 * formatDate(date, undefined, "en") // => "2024-01-15" (ISO format)
 * formatDate(date, "MMM D", "invalid-locale") // => "2024-01-15" (falls back to ISO on error)
 *
 * @remarks
 * If formatting fails (e.g., invalid locale, unsupported format), the function
 * automatically falls back to ISO 8601 format and logs a warning to the console.
 * This ensures the function never throws errors and always returns a valid date string.
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
    try {
        const jsDate = temporalDateToJsDate(date);
        const formatter = getFormatterForFormat(formatString, locale);
        return formatter.format(jsDate);
    } catch (error) {
        // If formatting fails (invalid locale, unsupported format, etc.),
        // fall back to ISO format
        /* eslint-disable-next-line no-console
           --
           This warning helps developers debug format/locale issues
         */
        console.warn(
            `Failed to format date with format "${formatString}" and locale "${locale}". Falling back to ISO format.`,
            error,
        );
        return date.toString();
    }
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

// Helper function to get modifiers for a given day
export const getModifiersForDay = (
    day: Date,
    modifiers: Partial<CustomModifiers>,
): Array<string> => {
    const matchedModifiers: Array<string> = [];

    for (const [modifierName, matcher] of Object.entries(modifiers)) {
        if (!matcher) {
            continue;
        }

        // If matcher is a function, call it with the day
        if (typeof matcher === "function") {
            if (matcher(day)) {
                matchedModifiers.push(modifierName);
            }
        }
        // If matcher is a Date, check if it's the same day
        else if (matcher instanceof Date) {
            if (
                day.getFullYear() === matcher.getFullYear() &&
                day.getMonth() === matcher.getMonth() &&
                day.getDate() === matcher.getDate()
            ) {
                matchedModifiers.push(modifierName);
            }
        }
    }

    return matchedModifiers;
};

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
 * Parse a date string and return a JavaScript Date.
 * This is a convenience wrapper around parseDate that converts the result
 * to a Date object for compatibility with react-day-picker.
 * If a Date is passed in, it's returned as-is.
 */
export function parseDateToJsDate(
    value: string | Date,
    format: string | Array<string> | null | undefined,
    locale?: string | null | undefined,
): Date | null | undefined {
    // If already a Date, return it
    if (value instanceof Date) {
        return value;
    }

    const temporalDate = parseDate(value, format, locale || undefined);
    return temporalDate ? temporalDateToJsDate(temporalDate) : undefined;
}

/**
 * Get the first day of the week for a given locale.
 * Returns 0 for Sunday, 1 for Monday, etc.
 */
export function getFirstDayOfWeek(locale?: string): number {
    // Most locales use Monday (1), but some like US use Sunday (0)
    // If no locale is provided, default to Monday
    if (!locale) {
        return 1; // Monday (most of the world)
    }

    // US, Canada, and some others use Sunday
    if (
        locale.startsWith("en-US") ||
        locale.startsWith("en-CA") ||
        locale.startsWith("ja") ||
        locale.startsWith("ko")
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

    // M/D/YYYY, MM/DD/YYYY or M-D-YYYY, MM-DD-YYYY
    if (
        format === "M/D/YYYY" ||
        format === "M-D-YYYY" ||
        format === "MM/DD/YYYY" ||
        format === "MM-DD-YYYY"
    ) {
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

    // MMMM D, YYYY (e.g., "May 7, 2021")
    if (format === "MMMM D, YYYY" || format === "MMM D, YYYY") {
        try {
            // Parse using Intl.DateTimeFormat
            // This is a bit of a hack but works for most locales
            const cleaned = str.trim();
            const localeStr = locale || "en-US";

            // Try to parse the date using Date constructor
            // which can handle many locale-specific formats
            const jsDate = new Date(cleaned);

            // Validate the date is valid
            if (!isNaN(jsDate.getTime())) {
                return jsDateToTemporalDate(jsDate);
            }

            // Alternative approach: split by comma and parse parts
            const parts = cleaned.split(",");
            if (parts.length === 2) {
                const [monthDay, yearStr] = parts;
                const year = parseInt(yearStr.trim(), 10);

                // Get month names for the locale (use long names from getMonths)
                const months = getMonths(localeStr).map((m) => m[0]);

                // Parse month and day
                const monthDayParts = monthDay.trim().split(" ");
                if (monthDayParts.length === 2) {
                    const monthName = monthDayParts[0];
                    const day = parseInt(monthDayParts[1], 10);

                    // Find month index
                    const monthIndex = months.findIndex(
                        (m) =>
                            m.toLowerCase() === monthName.toLowerCase() ||
                            m.slice(0, 3).toLowerCase() ===
                                monthName.toLowerCase(),
                    );

                    if (monthIndex >= 0 && !isNaN(day) && !isNaN(year)) {
                        return Temporal.PlainDate.from({
                            year,
                            month: monthIndex + 1,
                            day,
                        });
                    }
                }
            }
        } catch {
            return undefined;
        }
    }

    // For more complex parsing, you might need a proper date parsing library
    // or implement more format patterns as needed

    return undefined;
}

/**
 * LocaleUtils object compatible with react-day-picker's expected interface.
 * Includes all utility functions for working with Temporal dates.
 */
export const TemporalLocaleUtils = {
    // Core date formatting and parsing
    formatDate,
    parseDate,
    parseDateToJsDate,

    // Date conversion utilities
    temporalDateToJsDate,
    jsDateToTemporalDate,

    // Modifier utilities
    getModifiersForDay,

    // Locale-specific utilities
    getFirstDayOfWeek,
    getMonths,
    getWeekdaysLong,
    getWeekdaysShort,
};

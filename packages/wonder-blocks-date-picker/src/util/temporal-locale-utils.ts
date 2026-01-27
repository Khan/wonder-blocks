import {Temporal} from "temporal-polyfill";
import type {Locale} from "react-day-picker/locale";
import {CustomModifiers} from "./types";

export const enUSLocaleCode = "en-US";
/**
 * Utility functions for working with Temporal dates in react-day-picker.
 * Uses Intl.DateTimeFormat for locale-aware date formatting and parsing.
 *
 * Question: Should we move this to a separate package?
 */

/**
 * Format a Temporal.PlainDate using a format string.
 * Supports locale-aware formatting using Intl.DateTimeFormat and fixed format tokens.
 *
 * @param date - The Temporal.PlainDate to format
 * @param format - The format string(s) to use for formatting:
 *   - **"L"**: Locale-aware short date with full year (e.g., "1/20/2026" in en-US, "20.01.2026" in de-DE, "20/01/2026" in bg)
 *   - **"LL"**: Locale-aware long date with full month name (e.g., "January 20, 2026" in en-US, "20 януари 2026 г." in bg)
 *   - **"dateStyle:short|medium|long|full"**: Explicit Intl.DateTimeFormat dateStyle values
 *   - **"YYYY-MM-DD"**: ISO 8601 format (e.g., "2024-01-15")
 *   - **"MM/DD/YYYY"**: Fixed US numeric format (always month/day/year regardless of locale)
 *   - **"MMMM D, YYYY"**: Text format with localized month name but US order
 *   - **Array<string>**: Uses the **first** format in the array (ignores the rest)
 *   - **null/undefined**: Defaults to locale-aware short date (same as "L")
 * @param locale - The locale to use for formatting. Accepts:
 *   - **Locale object** from react-day-picker (e.g., `es`, `fr`)
 *   - **string** locale code (e.g., "en-US", "de-DE", "bg")
 *   - **undefined**: defaults to "en-US"
 * @returns The formatted date string
 *
 * @example
 * // Locale-aware formatting (recommended for international apps)
 * formatDate(date, "L", "en-US") // => "1/15/2024"
 * formatDate(date, "L", "de-DE") // => "15.01.2024"
 * formatDate(date, "L", "bg") // => "15.01.2024"
 * formatDate(date, "LL", "en-US") // => "January 15, 2024"
 * formatDate(date, "LL", "bg") // => "15 януари 2024 г."
 *
 * // Fixed format (always same order regardless of locale)
 * formatDate(date, "MM/DD/YYYY", "de-DE") // => "01/15/2024" (US order even in German locale)
 * formatDate(date, "YYYY-MM-DD", "en-US") // => "2024-01-15" (ISO format)
 *
 * // Default behavior
 * formatDate(date, undefined, "de-DE") // => "15.01.2024" (locale-aware short date)
 * formatDate(date, null, "en-US") // => "1/15/2024" (locale-aware short date)
 *
 * @remarks
 * If formatting fails (e.g., invalid locale, unsupported format), the function
 * automatically falls back to ISO 8601 format and logs a warning to the console.
 * This ensures the function never throws errors and always returns a valid date string.
 */
export function formatDate(
    date: Temporal.PlainDate,
    format: string | Array<string> | null | undefined,
    locale?: Locale | string,
): string {
    // Extract locale code string from Locale object or use string directly
    const localeCode =
        typeof locale === "string" ? locale : (locale?.code ?? enUSLocaleCode);

    // If format is an array, use the first one
    const formatString = Array.isArray(format) ? format[0] : format;

    if (!formatString) {
        // Default format: Locale-aware short date with 4-digit year
        return date.toLocaleString(localeCode, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });
    }

    // "L" format: Locale-aware short date with 4-digit year
    // (e.g., "1/20/2026" in en-US, "20.01.2026" in de-DE)
    if (formatString === "L") {
        return date.toLocaleString(localeCode, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });
    }

    // "LL" format: Locale-aware long date (e.g., "January 20, 2026" in en-US)
    if (formatString === "LL") {
        return date.toLocaleString(localeCode, {dateStyle: "long"});
    }

    // Support explicit dateStyle values
    if (
        formatString === "dateStyle:short" ||
        formatString === "dateStyle:medium" ||
        formatString === "dateStyle:long" ||
        formatString === "dateStyle:full"
    ) {
        const style = formatString.split(":")[1] as
            | "short"
            | "medium"
            | "long"
            | "full";
        return date.toLocaleString(localeCode, {dateStyle: style});
    }

    // Common format patterns
    if (formatString === "YYYY-MM-DD") {
        return date.toString(); // ISO format
    }

    // For text formats (MMMM D, YYYY or MMM D, YYYY), build custom format
    // to maintain consistent ordering regardless of locale
    if (formatString === "MMMM D, YYYY" || formatString === "MMM D, YYYY") {
        try {
            const monthFormat =
                formatString === "MMMM D, YYYY" ? "long" : "short";
            const monthName = date.toLocaleString(localeCode, {
                month: monthFormat,
            });
            return `${monthName} ${date.day}, ${date.year}`;
        } catch (error) {
            // Fall back to ISO format on error
            return date.toString();
        }
    }

    // For numeric date formats, build manually to maintain consistent MM/DD/YYYY ordering
    // regardless of locale (preventing DD/MM/YYYY for non-US locales)
    if (
        formatString === "MM/DD/YYYY" ||
        formatString === "M/D/YYYY" ||
        formatString === "DD/MM/YYYY"
    ) {
        const shouldPad =
            formatString.includes("MM") || formatString.includes("DD");
        const month = shouldPad
            ? String(date.month).padStart(2, "0")
            : String(date.month);
        const day = shouldPad
            ? String(date.day).padStart(2, "0")
            : String(date.day);
        return `${month}/${day}/${date.year}`;
    }

    // For other patterns, use toLocaleString with Intl options
    try {
        const options = getOptionsForFormat(formatString);
        return date.toLocaleString(localeCode, options);
    } catch (error) {
        // If formatting fails (invalid locale, unsupported format, etc.),
        // fall back to ISO format
        /* eslint-disable-next-line no-console
           --
           This warning helps developers debug format/locale issues
         */
        console.warn(
            `Failed to format date with format "${formatString}" and locale "${localeCode}". Falling back to ISO format.`,
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
 *
 * @example
 * // With format "MM/DD/YYYY":
 * parseDateToJsDate("1/28/2026", "MM/DD/YYYY") // ✓ Returns Date (accepts unpadded)
 * parseDateToJsDate("01/28/2026", "MM/DD/YYYY") // ✓ Returns Date (accepts padded)
 * parseDateToJsDate("1/28", "MM/DD/YYYY")      // ✗ Returns undefined (incomplete)
 * parseDateToJsDate("2026-01-28", "MM/DD/YYYY") // ✗ Returns undefined (wrong format)
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

    // STRICT VALIDATION: Verify the parsed date, when formatted back,
    // matches the original input (allowing for padding flexibility).
    if (temporalDate) {
        const formatted = formatDate(temporalDate, format, locale || undefined);

        // For numeric formats, accept both padded and unpadded input
        // e.g., "1/30/2026" and "01/30/2026" should both be valid for "MM/DD/YYYY"
        if (formatted === value) {
            return temporalDateToJsDate(temporalDate);
        }

        // Check if the difference is only in padding (for numeric formats)
        const normalizedFormatted = formatted.replace(/\b0(\d)\b/g, "$1");
        const normalizedValue = value.replace(/\b0(\d)\b/g, "$1");

        if (normalizedFormatted === normalizedValue) {
            return temporalDateToJsDate(temporalDate);
        }

        // Always accept ISO format (YYYY-MM-DD) regardless of specified format
        // This allows programmatic input and e2e tests to use standard ISO dates
        if (value === temporalDate.toString()) {
            return temporalDateToJsDate(temporalDate);
        }

        // Date was parsed but doesn't match format - return undefined
        return undefined;
    }

    return undefined;
}

/**
 * Get month names for a given locale.
 * Used internally by parseWithFormat() for parsing locale-specific month names.
 */
function getMonths(locale?: string): string[][] {
    const format = new Intl.DateTimeFormat(locale || enUSLocaleCode, {
        month: "long",
    });
    const formatShort = new Intl.DateTimeFormat(locale || enUSLocaleCode, {
        month: "short",
    });

    const months: string[][] = [];
    for (let i = 0; i < 12; i++) {
        const date = new Date(2021, i, 15); // Use a date in the middle of month
        months.push([format.format(date), formatShort.format(date)]);
    }

    return months;
}

// Helper functions

/**
 * Map format pattern tokens to Intl.DateTimeFormat options.
 * Used by toLocaleString() to format Temporal.PlainDate.
 */
function getOptionsForFormat(format: string): Intl.DateTimeFormatOptions {
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

    return options;
}

/**
 * Parse a locale-aware date string (format "L" or dateStyle).
 * Uses Intl.DateTimeFormat to understand the locale's date pattern.
 */
function parseLocaleAwareDate(
    str: string,
    locale?: string,
): Temporal.PlainDate | undefined {
    const localeStr = locale || enUSLocaleCode;
    const cleaned = str.trim();

    if (!cleaned) {
        return undefined;
    }

    try {
        // Create a formatter with short date style to get the locale's pattern
        const formatter = new Intl.DateTimeFormat(localeStr, {
            dateStyle: "short",
        });

        // Use a known date to analyze the pattern
        const testDate = new Date(2020, 0, 15); // Jan 15, 2020
        const parts = formatter.formatToParts(testDate);

        // Extract the order and separators
        type PartType = "day" | "month" | "year" | "literal";
        const pattern: Array<{type: PartType; value: string}> = parts.map(
            (p) => ({
                type: p.type as PartType,
                value: p.value,
            }),
        );

        // Find separators (literals between date parts)
        const separators = pattern
            .filter((p) => p.type === "literal")
            .map((p) => p.value);

        // Split input by all possible separators
        const inputParts = cleaned.split(
            new RegExp(`[${separators.map((s) => `\\${s}`).join("")}]`),
        );

        if (inputParts.length !== 3) {
            return undefined;
        }

        // Map parts to day/month/year based on locale pattern
        const dateComponents: {
            day?: number;
            month?: number;
            year?: number;
        } = {};
        let partIndex = 0;

        for (const patternPart of pattern) {
            if (patternPart.type === "literal") {
                continue;
            }

            const value = parseInt(inputParts[partIndex], 10);
            if (isNaN(value)) {
                return undefined;
            }

            dateComponents[patternPart.type] = value;
            partIndex++;
        }

        // Validate ranges
        if (
            !dateComponents.year ||
            !dateComponents.month ||
            !dateComponents.day ||
            dateComponents.month < 1 ||
            dateComponents.month > 12 ||
            dateComponents.day < 1 ||
            dateComponents.day > 31 ||
            dateComponents.year < 1000 ||
            dateComponents.year > 9999
        ) {
            return undefined;
        }

        return Temporal.PlainDate.from({
            year: dateComponents.year,
            month: dateComponents.month,
            day: dateComponents.day,
        });
    } catch {
        return undefined;
    }
}

function parseWithFormat(
    str: string,
    format: string | null | undefined,
    locale?: string,
): Temporal.PlainDate | undefined {
    if (!format) {
        return undefined;
    }

    // Handle locale-aware formats ("L", "LL", or dateStyle)
    if (format === "L" || format === "LL" || format.startsWith("dateStyle:")) {
        return parseLocaleAwareDate(str, locale);
    }

    // Handle common formats manually
    // This is a simplified parser - you may need to expand this based on your needs

    // M/D/YYYY, MM/DD/YYYY or M-D-YYYY, MM-DD-YYYY
    // Accept both padded and unpadded input for all these formats
    if (
        format === "M/D/YYYY" ||
        format === "M-D-YYYY" ||
        format === "MM/DD/YYYY" ||
        format === "MM-DD-YYYY"
    ) {
        const separator = format.includes("/") ? "/" : "-";
        const parts = str.split(separator);
        if (parts.length === 3) {
            const month = parseInt(parts[0], 10);
            const day = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);

            // Validate ranges
            if (
                isNaN(month) ||
                isNaN(day) ||
                isNaN(year) ||
                month < 1 ||
                month > 12 ||
                day < 1 ||
                day > 31 ||
                year < 1000 ||
                year > 9999
            ) {
                return undefined;
            }

            try {
                return Temporal.PlainDate.from({
                    year,
                    month,
                    day,
                });
            } catch {
                return undefined;
            }
        }
    }

    // MMMM D, YYYY (e.g., "May 7, 2021")
    if (format === "MMMM D, YYYY" || format === "MMM D, YYYY") {
        try {
            const cleaned = str.trim();
            const localeStr = locale || enUSLocaleCode;

            // Use strict manual parsing
            const parts = cleaned.split(",");
            if (parts.length === 2) {
                const [monthDay, yearStr] = parts;
                const year = parseInt(yearStr.trim(), 10);

                // Validate year is 4 digits (1000-9999)
                if (year < 1000 || year > 9999) {
                    return undefined;
                }

                const months = getMonths(localeStr).map((m) => m[0]);
                const monthDayParts = monthDay.trim().split(" ");
                if (monthDayParts.length === 2) {
                    const monthName = monthDayParts[0];
                    const day = parseInt(monthDayParts[1], 10);
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
 * Get the start of the ISO week (Monday) for a given date.
 * ISO weeks start on Monday (dayOfWeek = 1) and end on Sunday (dayOfWeek = 7).
 */
export const startOfIsoWeek = (
    date: Temporal.PlainDate,
): Temporal.PlainDate => {
    const dayOfWeek = date.dayOfWeek; // 1 = Monday, 7 = Sunday
    return date.subtract({days: dayOfWeek - 1});
};

/**
 * Get the start of day (00:00:00.000) for a given JS Date.
 * Returns a new Date object; does not mutate the original.
 */
export const startOfDay = (date: Date): Date => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
};

/**
 * Get the end of day (23:59:59.999) for a given JS Date.
 * Returns a new Date object; does not mutate the original.
 */
export const endOfDay = (date: Date): Date => {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
};
/**
 * Utility functions for working with Temporal dates.
 *
 * NOTE: Locale-specific utilities (getMonths, getWeekdaysLong, etc.) were
 * removed as they are no longer needed for react-day-picker v9. These may
 * be added to a shared wonder-blocks-dates package in a future update to
 * support both DatePicker and BirthdayPicker.
 */
export const TemporalLocaleUtils = {
    // Core date formatting and parsing
    formatDate,
    parseDate,
    parseDateToJsDate,
    startOfIsoWeek,
    startOfDay,
    endOfDay,

    // Date conversion utilities
    temporalDateToJsDate,
    jsDateToTemporalDate,

    // Modifier utilities (react-day-picker specific)
    getModifiersForDay,
};

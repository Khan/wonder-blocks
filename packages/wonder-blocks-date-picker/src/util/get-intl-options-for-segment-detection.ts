/**
 * Map a locale-dependent `dateFormat` string to the `Intl.DateTimeFormat`
 * options that reproduce it, so its actual segment order/separators can be
 * discovered via `formatToParts`.
 *
 * @param formatString - The `dateFormat` prop value (`undefined`/"L" or a
 * "dateStyle:*" string).
 * @returns The equivalent `Intl.DateTimeFormatOptions`, or `null` if
 * `formatString` isn't one of the locale-dependent formats this handles.
 */
export function getIntlOptionsForSegmentDetection(
    formatString: string | null | undefined,
): Intl.DateTimeFormatOptions | null {
    if (!formatString || formatString === "L") {
        return {year: "numeric", month: "numeric", day: "numeric"};
    }
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
        return {dateStyle: style};
    }
    return null;
}

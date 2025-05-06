/**
 * The baseline for the size tokens.
 */
const BASELINE_VALUE = 10;

/**
 * Converts a rem value to a number (px).
 * @param value The rem value to convert (includes the unit).
 * @param baseline Optional number to configure the baseline for calculations. Defaults to 10.
 * @returns A string with the px value.
 */

export function remToPx(
    value: string,
    baseline: number = BASELINE_VALUE,
): string {
    const num = parseFloat(value);
    const result = Math.round(num * baseline);
    return `${result}px`;
}

/**
 * Converts a number (px) to a rem value.
 */
export function pxToRem(
    value: number,
    baseline: number = BASELINE_VALUE,
): string {
    return `${value / baseline}rem`;
}

/**
 * The baseline for the size tokens.
 */
const baseline = 10;

/**
 * Converts a number (px) to a rem value.
 */
export function pxToRem(value: number): string {
    return `${value / baseline}rem`;
}

/**
 * Converts a rem value to a number (px).
 * @param value The rem value to convert (includes the unit).
 * @returns A string with the px value.
 */
export function remToPx(value: string): string {
    const num = parseFloat(value);
    return `${Math.round(num * baseline)}px`;
}

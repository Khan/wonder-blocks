/**
 * The baseline for the size tokens.
 */
const BASELINE_VALUE = 10;

/**
 * Converts a rem value to a number (px).
 * @param value The rem value to convert (includes the unit).
 * @param includeUnit A boolean for whether to include the string unit.
 * @param baseline A number to configure the baseline for calculations, e.g. 10.
 * @returns A string with the px value or a number without.
 */
export function remToPx(
    value: string,
    includeUnit?: true,
    baseline?: number,
): string;
export function remToPx(
    value: string,
    includeUnit: false,
    baseline?: number,
): number;

export function remToPx(
    value: string,
    includeUnit: boolean = true,
    baseline: number = BASELINE_VALUE,
): string | number {
    const num = parseFloat(value);
    const result = Math.round(num * baseline);
    return includeUnit ? `${result}px` : result;
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

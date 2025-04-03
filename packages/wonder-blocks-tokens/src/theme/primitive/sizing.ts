/**
 * The baseline for the size tokens.
 */
const baseline = 10;

/**
 * Converts a number (px) to a rem value.
 */
function pxToRem(value: number): string {
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

/**
 * Tokens that define the sizing of elements. These values are expressed in
 * `rem` units.
 *
 * These tokens are multiples of 8px, the baseline for the design system.
 *
 * These tokens can be used for:
 * - Margin and padding
 * - Component sizes
 * - Typography
 */
export const sizing = {
    size_0: pxToRem(0),
    size_010: pxToRem(1),
    size_020: pxToRem(2),
    size_040: pxToRem(4),
    size_060: pxToRem(6),
    size_080: pxToRem(8),
    size_100: pxToRem(10),
    size_120: pxToRem(12),
    size_140: pxToRem(14),
    size_160: pxToRem(16),
    size_170: pxToRem(17),
    size_180: pxToRem(18),
    size_200: pxToRem(20),
    size_220: pxToRem(22),
    size_240: pxToRem(24),
    size_260: pxToRem(26),
    size_280: pxToRem(28),
    size_320: pxToRem(32),
    size_340: pxToRem(34),
    size_360: pxToRem(36),
    size_400: pxToRem(40),
    size_480: pxToRem(48),
    size_560: pxToRem(56),
    size_640: pxToRem(64),
    size_720: pxToRem(72),
    size_800: pxToRem(80),
    size_880: pxToRem(88),
    size_960: pxToRem(96),
} as const;

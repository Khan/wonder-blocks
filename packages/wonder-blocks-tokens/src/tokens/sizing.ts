/**
 * The baseline for the size tokens.
 */
const baseline = 8;

/**
 * Converts a number (px) to a rem value.
 */
function pxToRem(value: number): string {
    return `${value / baseline}rem`;
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
    size_0125: pxToRem(1),
    size_025: pxToRem(2),
    size_050: pxToRem(4),
    size_075: pxToRem(6),
    size_100: pxToRem(8),
    size_125: pxToRem(10),
    size_150: pxToRem(12),
    size_200: pxToRem(16),
    size_225: pxToRem(18),
    size_250: pxToRem(20),
    size_300: pxToRem(24),
    size_400: pxToRem(32),
    size_500: pxToRem(40),
    size_600: pxToRem(48),
    size_700: pxToRem(56),
    size_800: pxToRem(64),
    size_900: pxToRem(72),
    size_1000: pxToRem(80),
    size_1100: pxToRem(88),
    size_1200: pxToRem(96),
} as const;

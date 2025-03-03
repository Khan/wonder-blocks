/**
 * The baseline for the size tokens.
 */
const baseline = 8;

/**
 * Converts a number (px) to a rem value.
 */
function convertUnitsToRem(value: number): string {
    return `${value / baseline}rem`;
}

/**
 * Tokens that define the sizing of elements.
 *
 * These tokens are multiples of 8px, the baseline for the design system.
 *
 * These tokens can be used for:
 * - Margin and padding
 * - Component sizes
 */
export const sizing = {
    size_0: convertUnitsToRem(0),
    size_0125: convertUnitsToRem(1),
    size_025: convertUnitsToRem(2),
    size_050: convertUnitsToRem(4),
    size_075: convertUnitsToRem(6),
    size_100: convertUnitsToRem(8),
    size_125: convertUnitsToRem(10),
    size_150: convertUnitsToRem(12),
    size_200: convertUnitsToRem(16),
    size_225: convertUnitsToRem(18),
    size_250: convertUnitsToRem(20),
    size_300: convertUnitsToRem(24),
    size_400: convertUnitsToRem(32),
    size_500: convertUnitsToRem(40),
    size_600: convertUnitsToRem(48),
    size_700: convertUnitsToRem(56),
    size_800: convertUnitsToRem(64),
    size_900: convertUnitsToRem(72),
    size_1000: convertUnitsToRem(80),
    size_1100: convertUnitsToRem(88),
    size_1200: convertUnitsToRem(96),
} as const;

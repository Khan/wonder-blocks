/**
 * Primitive tokens for dimensional values (margin, padding, gaps, sizes).
 *
 * @deprecated Use `sizing` from `@khanacademy/wonder-blocks-tokens` instead.
 * Each `spacing.<name>` value has an equivalent `sizing.size_<n>` token (e.g.
 * `spacing.medium_16` → `sizing.size_160`). A codemod is available at
 * `wb-codemod/transforms/migrate-spacing-to-sizing.ts` to help migrate
 * consumers.
 */
export const spacing = {
    // Named
    xxxxSmall_2: 2,
    xxxSmall_4: 4,
    xxSmall_6: 6,
    xSmall_8: 8,
    small_12: 12,
    medium_16: 16,
    large_24: 24,
    xLarge_32: 32,
    xxLarge_48: 48,
    xxxLarge_64: 64,
} as const;

/**
 * @deprecated The `spacing` token is deprecated; use `sizing` from
 * `@khanacademy/wonder-blocks-tokens` instead. For APIs that need to constrain
 * to a numeric set, prefer `number` (or `number | string` to also accept rem
 * strings from `sizing`).
 */
export type VALID_PRIMARY_SPACING = 4 | 8 | 16 | 32 | 64;

/**
 * @deprecated The `spacing` token is deprecated; use `sizing` from
 * `@khanacademy/wonder-blocks-tokens` instead. For APIs that need to constrain
 * to a numeric set, prefer `number` (or `number | string` to also accept rem
 * strings from `sizing`).
 */
export type VALID_SECONDARY_SPACING = 6 | 12 | 24 | 48;

/**
 * @deprecated The `spacing` token is deprecated; use `sizing` from
 * `@khanacademy/wonder-blocks-tokens` instead. For APIs that need to constrain
 * to a numeric set, prefer `number` (or `number | string` to also accept rem
 * strings from `sizing`).
 */
export type VALID_SPACING = VALID_PRIMARY_SPACING | VALID_SECONDARY_SPACING;

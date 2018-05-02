// @flow
const Spacing = {
    // Named
    xxxs: 4,
    xxs: 6,
    xxs: 8,
    s: 12,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
};

export type VALID_PRIMARY_SPACING = 4 | 8 | 16 | 32 | 64;
export type VALID_SECONDARY_SPACING = 6 | 12 | 24 | 48;
export type VALID_SPACING = VALID_PRIMARY_SPACING | VALID_SECONDARY_SPACING;

export {Spacing as default};

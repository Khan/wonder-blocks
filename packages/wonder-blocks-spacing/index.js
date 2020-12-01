// @flow
const Spacing = {
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
};



export type VALID_PRIMARY_SPACING = 4 | 8 | 16 | 32 | 64;
export type VALID_SECONDARY_SPACING = 6 | 12 | 24 | 48;
export type VALID_SPACING = VALID_PRIMARY_SPACING | VALID_SECONDARY_SPACING;

export {Spacing as default};

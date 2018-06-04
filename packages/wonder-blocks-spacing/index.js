// @flow
import Spring from "./components/spring.js";
import Strut from "./components/strut.js";

const Spacing = {
    // Named
    xxxSmall: 4,
    xxSmall: 6,
    xSmall: 8,
    small: 12,
    medium: 16,
    large: 24,
    xLarge: 32,
    xxLarge: 48,
    xxxLarge: 64,
};

export type VALID_PRIMARY_SPACING = 4 | 8 | 16 | 32 | 64;
export type VALID_SECONDARY_SPACING = 6 | 12 | 24 | 48;
export type VALID_SPACING = VALID_PRIMARY_SPACING | VALID_SECONDARY_SPACING;

export {Spring, Strut, Spacing as default};

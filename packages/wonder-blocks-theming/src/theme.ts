import tokens from "./tokens";
import { ThemeContract } from "./types";

export const theme: ThemeContract = {
    color: {
        primary: tokens.colors.blue,
        secondary: tokens.colors.purple,
        tertiary: tokens.colors.green,
        background: tokens.colors.offBlack,
        text: tokens.colors.offWhite,
        textInverted: tokens.colors.white,
    },
    spacing: {
        small: tokens.spacing.small_12,
        medium: tokens.spacing.medium_16,
        large: tokens.spacing.xLarge_32,
    },
    fontSize: {
        small: `${tokens.fontSizes.xSmall}px`,
        medium: `${tokens.fontSizes.medium}px`,
        large: `${tokens.fontSizes.xLarge}px`,
    },
    font: tokens.fonts,
    fontWeight: tokens.fontWeights,
    lineHeight: {
        small: `${tokens.lineHeights.small}px`,
        medium: `${tokens.lineHeights.medium}px`,
        large: `${tokens.lineHeights.large}px`,
    },
};

export default theme;
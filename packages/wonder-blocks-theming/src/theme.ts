import tokens from "./tokens";

export const theme = {
    color: {
        bg: {
            action: tokens.colors.blue,
            actionInverseActive: tokens.colors.fadedBlue,
            accent: tokens.colors.gold,
            mastery: tokens.colors.purple,
            success: tokens.colors.green,
            critical: tokens.colors.red,
            criticalInverseActive: tokens.colors.fadedRed,
            primary: tokens.colors.white,
            primaryDisabled: tokens.colors.offBlack32,
            primaryHover: tokens.colors.offBlack8,
            primaryPressed: tokens.colors.offBlack16,
            secondary: tokens.colors.offBlack64,
            secondaryDisabled: tokens.colors.offWhite,
            inverse: tokens.colors.darkBlue,
        },
        text: {
            primary: tokens.colors.offBlack,
            primaryDisabled: tokens.colors.offBlack32,
            primaryInverse: tokens.colors.white,
            secondary: tokens.colors.offBlack64,
            secondaryInverse: tokens.colors.white50,
            tertiaryInverse: tokens.colors.white64,
            action: tokens.colors.blue,
            actionInverseActive: tokens.colors.fadedBlue,
            actionInverseDisabled: tokens.colors.fadedBlue,
            critical: tokens.colors.red,
            criticalInverseActive: tokens.colors.fadedRed,
        },
        border: {
            primary: tokens.colors.offBlack16,
            primaryDisabled: tokens.colors.offBlack32,
            primaryInverseFocus: tokens.colors.white,
            secondary: tokens.colors.offBlack50,
            secondaryInverse: tokens.colors.white50,
        },
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

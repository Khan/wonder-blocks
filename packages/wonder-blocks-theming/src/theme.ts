import * as React from "react";
import tokens from "./tokens";

const theme = {
    border: {
        radius: {
            xSmall: 2,
            small: 3,
            medium: 4,
            large: 6,
            full: "50%",
        },
        width: {
            none: 0,
            small: 1,
            medium: 2,
            large: 4,
        },
    },
    color: {
        bg: {
            action: tokens.color.blue,
            actionActive: tokens.color.activeBlue,
            actionInverse: tokens.color.fadedBlue,
            critical: tokens.color.red,
            criticalActive: tokens.color.activeRed,
            criticalInverse: tokens.color.fadedRed,
            accent: tokens.color.gold,
            mastery: tokens.color.purple,
            success: tokens.color.green,
            disabled: tokens.color.offBlack32,
            primary: tokens.color.white,
            primaryHover: tokens.color.offBlack8,
            primaryPressed: tokens.color.offBlack16,
            secondary: tokens.color.offBlack64,
            secondaryDisabled: tokens.color.offWhite,
            inverse: tokens.color.darkBlue,
        },
        text: {
            action: tokens.color.blue,
            actionActive: tokens.color.activeBlue,
            actionInverse: tokens.color.fadedBlue,
            critical: tokens.color.red,
            criticalActive: tokens.color.activeRed,
            criticalInverse: tokens.color.fadedRed,
            disabled: tokens.color.offBlack32,
            primary: tokens.color.offBlack,
            primaryDisabled: tokens.color.white64,
            inverse: tokens.color.white,
            secondary: tokens.color.offBlack64,
            secondaryInverse: tokens.color.white50,
        },
        border: {
            action: tokens.color.blue,
            actionActive: tokens.color.activeBlue,
            actionInverse: tokens.color.fadedBlue,
            critical: tokens.color.red,
            criticalActive: tokens.color.activeRed,
            criticalInverse: tokens.color.fadedRed,
            disabled: tokens.color.offBlack32,
            primary: tokens.color.offBlack16,
            primaryInverse: tokens.color.white,
            secondary: tokens.color.offBlack50,
            secondaryInverse: tokens.color.white50,
        },
    },
    spacing: tokens.spacing,
    fontSize: {
        small: `${tokens.fontSize.xSmall}px`,
        medium: `${tokens.fontSize.medium}px`,
        large: `${tokens.fontSize.xLarge}px`,
    },
    font: tokens.font,
    fontWeight: tokens.fontWeight,
    lineHeight: {
        small: `${tokens.lineHeight.small}px`,
        medium: `${tokens.lineHeight.medium}px`,
        large: `${tokens.lineHeight.large}px`,
    },
};

export function createTheme<T>(theme: T) {
    return React.createContext(theme);
}

export default theme;

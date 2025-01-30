import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {border, color, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

const primaryState = {
    hover: {foreground: semanticColor.khanmigo.primary},
};

const primaryLightState = {
    hover: {
        background: semanticColor.surface.primary,
        foreground: semanticColor.khanmigo.primary,
    },
    press: {
        border: "transparent",
        background: color.white64,
        foreground: semanticColor.khanmigo.primary,
    },
};

/**
 * The overrides for the Khanmigo theme.
 */
const theme = mergeTheme(defaultTheme, {
    color: {
        primary: {
            // NOTE: These are shared by action type
            progressive: primaryState,
            destructive: primaryState,
            progressiveLight: primaryLightState,
            destructiveLight: primaryLightState,
        },

        secondary: {
            progressive: {
                hover: semanticColor.action.filled.progressive.hover,
                press: semanticColor.action.filled.progressive.press,
            },
            destructive: {
                hover: semanticColor.action.filled.destructive.hover,
                press: semanticColor.action.filled.destructive.press,
            },
        },

        tertiary: {
            progressive: {
                hover: semanticColor.action.filled.progressive.hover,
                press: semanticColor.action.filled.progressive.press,
            },
            destructive: {
                hover: semanticColor.action.filled.destructive.hover,
                press: semanticColor.action.filled.destructive.press,
            },
        },
    },
    border: {
        width: {
            hovered: border.width.none,
            hoveredInverse: border.width.none,
        },
    },
});

export default theme;

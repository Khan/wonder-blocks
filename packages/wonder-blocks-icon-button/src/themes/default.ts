import {border, semanticColor} from "@khanacademy/wonder-blocks-tokens";

const disabledStates = {
    // NOTE: This is a special case for the button
    border: semanticColor.action.primary.disabled.border,
    background: "transparent",
    foreground: semanticColor.action.secondary.disabled.foreground,
};

/**
 * The color styles shared between all the button kinds.
 *
 * NOTE: This will change when we create the new polaris theme as IconButton
 * will apply the same styles as Button.
 */
const baseColorStates = {
    ...semanticColor.action.secondary,
    progressive: {
        ...semanticColor.action.secondary.progressive,
        default: {
            ...semanticColor.action.secondary.progressive.default,
            border: "transparent",
            background: "transparent",
        },
        hover: {
            ...semanticColor.action.secondary.progressive.hover,
            background: "transparent",
        },
        press: {
            border: semanticColor.action.secondary.progressive.press.border,
            background: "transparent",
            foreground:
                semanticColor.action.secondary.progressive.press.foreground,
        },
    },
    destructive: {
        ...semanticColor.action.secondary.destructive,
        default: {
            ...semanticColor.action.secondary.destructive.default,
            border: "transparent",
            background: "transparent",
        },
        hover: {
            ...semanticColor.action.secondary.destructive.hover,
            background: "transparent",
        },
        press: {
            border: semanticColor.action.secondary.destructive.press.border,
            background: "transparent",
            foreground:
                semanticColor.action.secondary.destructive.press.foreground,
        },
    },
    disabled: {
        default: disabledStates,
        hover: disabledStates,
        press: disabledStates,
    },
};

const theme = {
    color: {
        primary: baseColorStates,

        // secondary
        secondary: {
            ...baseColorStates,
            progressive: {
                ...baseColorStates.progressive,
                default: {
                    ...baseColorStates.progressive.default,
                    foreground: semanticColor.text.primary,
                },
            },
            destructive: {
                ...baseColorStates.destructive,
                default: {
                    ...baseColorStates.destructive.default,
                    foreground: semanticColor.icon.secondary,
                },
            },
        },
        // tertiary
        tertiary: {
            ...baseColorStates,
            progressive: {
                ...baseColorStates.progressive,
                default: {
                    ...baseColorStates.progressive.default,
                    foreground: semanticColor.icon.primary,
                },
            },
            destructive: {
                ...baseColorStates.destructive,
                default: {
                    ...baseColorStates.destructive.default,
                    foreground: semanticColor.icon.primary,
                },
            },
        },
    },

    border: {
        width: {
            hover: border.width.thin,
            press: border.width.thin,
        },
        radius: {
            default: border.radius.medium_4,
        },
    },
};

export default theme;

import * as tokens from "@khanacademy/wonder-blocks-tokens";

const {semanticColor} = tokens;

const disabledStates = {
    border: semanticColor.action.disabled.default,
    background: "transparent",
    foreground: semanticColor.action.disabled.default,
};

const disabledLightStates = {
    border: tokens.color.white50,
    background: "transparent",
    foreground: tokens.color.white50,
};

/**
 * The color styles shared between all the button kinds.
 *
 * NOTE: This will change when we create the new polaris theme as IconButton
 * will apply the same styles as Button.
 */
const baseColorStates = {
    ...semanticColor.action.outlined,
    progressive: {
        ...semanticColor.action.outlined.progressive,
        press: {
            border: semanticColor.action.outlined.progressive.press.border,
            background: "transparent",
            foreground:
                semanticColor.action.outlined.progressive.press.foreground,
        },
    },
    destructive: {
        ...semanticColor.action.outlined.destructive,
        press: {
            border: semanticColor.action.outlined.destructive.press.border,
            background: "transparent",
            foreground:
                semanticColor.action.outlined.destructive.press.foreground,
        },
    },
    disabled: {
        default: disabledStates,
        hover: disabledStates,
        press: disabledStates,
    },
    // TODO(WB-1852): Remove light variants.
    disabledLight: {
        default: disabledLightStates,
        hover: disabledLightStates,
        press: disabledLightStates,
    },
};

const theme = {
    color: {
        primary: {
            ...baseColorStates,
            // Only primary supports the light variants.
            // TODO(WB-1852): Remove light variants.
            progressiveLight: {
                default: {
                    border: tokens.color.white,
                    background: "transparent",
                    foreground: tokens.color.white,
                },
                hover: {
                    border: tokens.color.white,
                    background: "transparent",
                    foreground: tokens.color.white,
                },
                press: {
                    border: tokens.color.fadedBlue,
                    background: "transparent",
                    foreground: tokens.color.fadedBlue,
                },
            },
            // TODO(WB-1852): Remove light variants.
            destructiveLight: {
                default: {
                    border: tokens.color.white,
                    background: "transparent",
                    foreground: tokens.color.white,
                },
                hover: {
                    border: tokens.color.white,
                    background: "transparent",
                    foreground: tokens.color.white,
                },
                press: {
                    border: tokens.color.fadedRed,
                    background: "transparent",
                    foreground: tokens.color.fadedRed,
                },
            },
        },

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
                    foreground: semanticColor.text.primary,
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
                    foreground: semanticColor.text.secondary,
                },
            },
            destructive: {
                ...baseColorStates.destructive,
                default: {
                    ...baseColorStates.destructive.default,
                    foreground: semanticColor.text.secondary,
                },
            },
        },
    },

    border: {
        width: {
            default: tokens.border.width.thin,
            active: tokens.border.width.none,
            hovered: tokens.border.width.thin,
            hoveredInverse: tokens.border.width.thin,
        },
        radius: {
            default: tokens.border.radius.medium_4,
        },
    },
};

export default theme;

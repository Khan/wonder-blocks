import {border, color, semanticColor} from "@khanacademy/wonder-blocks-tokens";

const disabledStates = {
    border: semanticColor.action.disabled.default,
    background: "transparent",
    foreground: semanticColor.action.disabled.default,
};

// TODO(WB-1852): Remove light variants.
const disabledLightStates = {
    border: color.white50,
    background: "transparent",
    foreground: color.white50,
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
        default: {
            ...semanticColor.action.outlined.progressive.default,
            border: "transparent",
            background: "transparent",
        },
        press: {
            border: semanticColor.action.outlined.progressive.press.border,
            background: "transparent",
            foreground:
                semanticColor.action.outlined.progressive.press.foreground,
        },
    },
    destructive: {
        ...semanticColor.action.outlined.destructive,
        default: {
            ...semanticColor.action.outlined.destructive.default,
            border: "transparent",
            background: "transparent",
        },
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
                    border: semanticColor.border.inverse,
                    background: "transparent",
                    foreground: semanticColor.text.inverse,
                },
                hover: {
                    border: semanticColor.border.inverse,
                    background: "transparent",
                    foreground: semanticColor.text.inverse,
                },
                press: {
                    border: color.fadedBlue,
                    background: "transparent",
                    foreground: color.fadedBlue,
                },
            },
            // TODO(WB-1852): Remove light variants.
            destructiveLight: {
                default: {
                    border: semanticColor.border.inverse,
                    background: "transparent",
                    foreground: semanticColor.text.inverse,
                },
                hover: {
                    border: semanticColor.border.inverse,
                    background: "transparent",
                    foreground: semanticColor.text.inverse,
                },
                press: {
                    border: color.fadedRed,
                    background: "transparent",
                    foreground: color.fadedRed,
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
            default: border.width.thin,
            active: border.width.none,
            hovered: border.width.thin,
            hoveredInverse: border.width.thin,
        },
        radius: {
            default: border.radius.medium_4,
        },
    },
};

export default theme;

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

const focusOutline = {
    border: semanticColor.focus.outer,
};

const focusOutlineLight = {
    border: semanticColor.border.inverse,
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
        focus: focusOutline,
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
        focus: focusOutline,
        press: {
            border: semanticColor.action.secondary.destructive.press.border,
            background: "transparent",
            foreground:
                semanticColor.action.secondary.destructive.press.foreground,
        },
    },
    disabled: {
        default: disabledStates,
        focus: focusOutline,
        hover: disabledStates,
        press: disabledStates,
    },
    // TODO(WB-1852): Remove light variants.
    disabledLight: {
        default: disabledLightStates,
        focus: focusOutlineLight,
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
                focus: focusOutlineLight,
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
                focus: focusOutlineLight,
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

import {color} from "../../tokens/color";

const border = {
    primary: color.fadedOffBlack16,
    subtle: color.fadedOffBlack8,
    strong: color.fadedOffBlack50,
    inverse: color.white,
    progressive: color.blue,
    destructive: color.red,
};

const surface = {
    primary: color.white,
    secondary: color.offWhite,
    emphasis: color.blue,
    inverse: color.darkBlue,
    overlay: color.offBlack64,
};

const text = {
    primary: color.offBlack,
    secondary: color.fadedOffBlack72,
    disabled: color.fadedOffBlack32,
    inverse: color.white,
};

export const semanticColor = {
    /**
     * For buttons, links, and controls to communicate the presence and meaning
     * of interaction.
     */
    action: {
        primary: {
            progressive: {
                default: {
                    border: "transparent",
                    background: color.blue,
                    foreground: text.inverse,
                },
                hover: {
                    border: border.progressive,
                    background: color.blue,
                    foreground: text.inverse,
                },
                press: {
                    border: color.activeBlue,
                    background: color.activeBlue,
                    foreground: text.inverse,
                },
            },
            destructive: {
                default: {
                    border: "transparent",
                    background: color.red,
                    foreground: text.inverse,
                },
                hover: {
                    border: border.destructive,
                    background: color.red,
                    foreground: text.inverse,
                },
                press: {
                    border: color.activeRed,
                    background: color.activeRed,
                    foreground: text.inverse,
                },
            },

            neutral: {
                default: {
                    border: "transparent",
                    background: color.fadedOffBlack72,
                    foreground: text.inverse,
                },
                hover: {
                    border: color.fadedOffBlack72,
                    background: color.fadedOffBlack72,
                    foreground: text.inverse,
                },
                press: {
                    border: color.offBlack,
                    background: color.offBlack,
                    foreground: text.inverse,
                },
            },

            disabled: {
                border: color.fadedOffBlack32,
                background: color.fadedOffBlack32,
                foreground: color.offWhite,
            },
        },

        secondary: {
            progressive: {
                default: {
                    border: border.strong,
                    background: "transparent",
                    foreground: color.blue,
                },
                hover: {
                    border: border.progressive,
                    background: "transparent",
                    foreground: color.blue,
                },
                press: {
                    border: color.activeBlue,
                    background: color.fadedBlue,
                    foreground: color.activeBlue,
                },
            },
            destructive: {
                default: {
                    border: border.strong,
                    background: "transparent",
                    foreground: color.red,
                },
                hover: {
                    border: border.destructive,
                    background: "transparent",
                    foreground: color.red,
                },
                press: {
                    border: color.activeRed,
                    background: color.fadedRed,
                    foreground: color.activeRed,
                },
            },
            neutral: {
                default: {
                    border: border.strong,
                    background: "transparent",
                    foreground: text.secondary,
                },
                hover: {
                    border: color.fadedOffBlack72,
                    background: "transparent",
                    foreground: text.secondary,
                },
                press: {
                    border: color.offBlack,
                    background: color.offBlack16,
                    foreground: text.primary,
                },
            },

            disabled: {
                border: border.primary,
                background: "transparent",
                foreground: text.disabled,
            },
        },

        tertiary: {
            progressive: {
                default: {
                    border: "transparent",
                    background: "transparent",
                    foreground: color.blue,
                },
                hover: {
                    border: border.progressive,
                    background: "transparent",
                    foreground: color.blue,
                },
                press: {
                    border: color.activeBlue,
                    background: "transparent",
                    foreground: color.activeBlue,
                },
            },

            destructive: {
                default: {
                    border: "transparent",
                    background: "transparent",
                    foreground: color.red,
                },
                hover: {
                    border: border.destructive,
                    background: "transparent",
                    foreground: color.red,
                },
                press: {
                    border: color.activeRed,
                    background: "transparent",
                    foreground: color.activeRed,
                },
            },
            neutral: {
                default: {
                    border: "transparent",
                    background: "transparent",
                    foreground: text.secondary,
                },
                hover: {
                    border: color.fadedOffBlack72,
                    background: "transparent",
                    foreground: text.secondary,
                },
                press: {
                    border: color.offBlack,
                    background: "transparent",
                    foreground: text.primary,
                },
            },

            disabled: {
                border: border.primary,
                background: "transparent",
                foreground: text.disabled,
            },
        },
    },
    /**
     * For inputs, form elements, and other elements that require user input.
     */
    input: {
        default: {
            border: border.strong,
            background: surface.primary,
            foreground: text.primary,
            placeholder: text.secondary,
        },
        checked: {
            border: border.progressive,
            background: color.blue,
            foreground: text.inverse,
        },
        disabled: {
            border: border.primary,
            background: color.offWhite,
            foreground: text.secondary,
            placeholder: text.secondary,
        },
        error: {
            border: border.destructive,
            background: color.fadedRed8,
            foreground: text.primary,
        },
    },
    /**
     * For labels, icons, filters, alerts, and other elements where color can
     * add meaning to the state of the system or an item in the system.
     */
    status: {
        critical: {
            background: color.fadedRed8,
            foreground: color.red,
        },
        warning: {
            background: color.fadedGold8,
            foreground: color.gold,
        },
        success: {
            background: color.fadedGreen8,
            foreground: color.green,
        },
        notice: {
            background: color.fadedBlue8,
            foreground: color.blue,
        },
        neutral: {
            background: color.fadedOffBlack8,
            foreground: text.primary,
        },
    },
    /**
     * For background colors. Overlays act as supplementary surfaces that mask
     * areas of the UI.
     */
    surface,
    /**
     * For all type to ensure contrast for legibility. Inverse text applies for
     * dark backgrounds in light mode.
     */
    text,
    /**
     * Borders define structure for elements. Generally borders for component
     * elements would use -Primary, rows and layout elements use -Subtle and
     * -Strong for when 3:1 contrast is a priority (ex. form elements)
     */
    border: border,

    focus: {
        outer: color.blue,
        inner: color.white,
    },
    /**
     * Default icon colors that change in context (like actions).
     */
    icon: {
        primary: color.fadedOffBlack72,
        secondary: color.offBlack,
        inverse: color.white,
        action: color.blue,
        destructive: color.red,
        disabled: color.fadedOffBlack32,
    },
    /**
     * Colors to be used exclusively for Khanmigo or to communicate a
     * relationship to it.
     */
    khanmigo: {
        primary: color.eggplant,
        secondary: color.fadedEggplant8,
    },
    /**
     * Standalone colors used only for communicating mastery.
     */
    mastery: {
        primary: color.purple,
    },
};

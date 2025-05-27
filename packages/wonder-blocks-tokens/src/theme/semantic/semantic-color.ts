import {color} from "../../tokens/color";

const transparent = "transparent";

const core = {
    transparent,
    border: {
        instructive: {
            subtle: color.fadedBlue,
            default: color.blue,
            strong: color.activeBlue,
        },
        neutral: {
            subtle: color.fadedOffBlack16,
            default: color.fadedOffBlack50,
            strong: color.fadedOffBlack72,
        },
        critical: {
            subtle: color.fadedRed24,
            default: color.red,
            strong: color.activeRed,
        },
        success: {
            subtle: color.fadedGreen24,
            default: color.green,
            strong: color.activeGreen,
        },
        warning: {
            subtle: color.fadedGold24,
            default: color.gold,
            strong: color.activeGold,
        },
        disabled: {
            subtle: transparent,
            default: color.fadedOffBlack16,
            strong: color.fadedOffBlack32,
        },
        inverse: {
            subtle: color.offBlack16,
            default: color.offBlack8,
            strong: color.white,
        },
    },
    background: {
        instructive: {
            subtle: color.fadedBlue8,
            default: color.blue,
            strong: color.activeBlue,
        },
        neutral: {
            subtle: color.fadedOffBlack8,
            default: color.fadedOffBlack72,
            strong: color.offBlack,
        },
        critical: {
            subtle: color.fadedRed8,
            default: color.red,
            strong: color.activeRed,
        },
        success: {
            subtle: color.fadedGreen8,
            default: color.green,
            strong: color.activeGreen,
        },
        warning: {
            subtle: color.fadedGold8,
            default: color.fadedGold24,
            strong: color.gold,
        },
        disabled: {
            subtle: transparent,
            default: color.fadedOffBlack8,
            strong: color.fadedOffBlack16,
        },
    },

    /**
     * Used for text and icons.
     */
    foreground: {
        instructive: {
            subtle: color.blue,
            default: color.activeBlue,
            strong: color.offBlack,
        },
        neutral: {
            subtle: color.fadedOffBlack64,
            default: color.fadedOffBlack72,
            strong: color.offBlack,
        },
        critical: {
            subtle: color.red,
            default: color.activeRed,
            strong: color.offBlack,
        },
        success: {
            subtle: color.green,
            default: color.activeGreen,
            strong: color.offBlack,
        },
        warning: {
            subtle: color.gold,
            default: color.activeGold,
            strong: color.offBlack,
        },
        inverse: {
            subtle: color.fadedOffBlack32,
            default: color.offWhite,
            strong: color.white,
        },
    },
};

/**
 * TODO(WB-1941): Remove border once we have migrated to the new core.border
 * tokens.
 */
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

/**
 * TODO(WB-1941): Remove text once we have migrated to the new core.foreground
 * tokens.
 */
const text = {
    primary: core.foreground.neutral.strong,
    secondary: core.foreground.neutral.default,
    disabled: core.foreground.inverse.subtle,
    inverse: core.foreground.inverse.strong,
};

export const semanticColor = {
    /**
     * Our core colors are used for the most common elements in our UI. They
     * are the most important colors in our system and should be used
     * consistently across all components.
     */
    core,
    /**
     * For buttons, links, and controls to communicate the presence and meaning
     * of interaction.
     */
    action: {
        primary: {
            progressive: {
                default: {
                    border: core.transparent,
                    background: core.background.instructive.default,
                    foreground: core.foreground.inverse.strong,
                },
                hover: {
                    border: core.border.instructive.default,
                    background: core.background.instructive.default,
                    foreground: core.foreground.inverse.strong,
                },
                press: {
                    border: core.border.instructive.strong,
                    background: core.background.instructive.strong,
                    foreground: core.foreground.inverse.strong,
                },
            },
            destructive: {
                default: {
                    border: core.transparent,
                    background: core.background.critical.default,
                    foreground: core.foreground.inverse.strong,
                },
                hover: {
                    border: core.border.critical.default,
                    background: core.background.critical.default,
                    foreground: core.foreground.inverse.strong,
                },
                press: {
                    border: core.border.critical.strong,
                    background: core.background.critical.strong,
                    foreground: core.foreground.inverse.strong,
                },
            },

            neutral: {
                default: {
                    border: core.transparent,
                    background: core.background.neutral.default,
                    foreground: core.foreground.inverse.strong,
                },
                hover: {
                    border: core.border.neutral.default,
                    background: core.background.neutral.default,
                    foreground: core.foreground.inverse.strong,
                },
                press: {
                    border: core.border.neutral.strong,
                    background: core.background.neutral.strong,
                    foreground: core.foreground.inverse.strong,
                },
            },

            disabled: {
                border: core.border.disabled.strong,
                background: core.border.disabled.strong,
                foreground: core.foreground.inverse.default,
            },
        },

        secondary: {
            progressive: {
                default: {
                    border: core.border.neutral.default,
                    background: core.transparent,
                    foreground: core.foreground.instructive.subtle,
                },
                hover: {
                    border: core.border.instructive.default,
                    background: core.transparent,
                    foreground: core.foreground.instructive.subtle,
                },
                press: {
                    border: core.border.instructive.strong,
                    background: core.background.instructive.subtle,
                    foreground: core.foreground.instructive.default,
                },
            },
            destructive: {
                default: {
                    border: core.border.neutral.default,
                    background: core.transparent,
                    foreground: core.foreground.critical.subtle,
                },
                hover: {
                    border: core.border.critical.default,
                    background: core.transparent,
                    foreground: core.foreground.critical.subtle,
                },
                press: {
                    border: core.border.critical.strong,
                    background: core.background.critical.subtle,
                    foreground: core.foreground.critical.default,
                },
            },
            neutral: {
                default: {
                    border: core.border.neutral.default,
                    background: core.transparent,
                    foreground: core.foreground.neutral.default,
                },
                hover: {
                    border: core.border.neutral.default,
                    background: core.transparent,
                    foreground: core.foreground.neutral.default,
                },
                press: {
                    border: core.border.neutral.strong,
                    background: core.background.neutral.subtle,
                    foreground: core.foreground.neutral.strong,
                },
            },

            disabled: {
                border: core.border.disabled.strong,
                background: core.background.disabled.subtle,
                foreground: core.foreground.inverse.subtle,
            },
        },

        tertiary: {
            progressive: {
                default: {
                    border: core.transparent,
                    background: core.transparent,
                    foreground: core.foreground.instructive.subtle,
                },
                hover: {
                    border: core.border.instructive.default,
                    background: core.transparent,
                    foreground: core.foreground.instructive.subtle,
                },
                press: {
                    border: core.border.instructive.strong,
                    background: core.transparent,
                    foreground: core.foreground.instructive.default,
                },
            },

            destructive: {
                default: {
                    border: core.transparent,
                    background: core.transparent,
                    foreground: core.foreground.critical.subtle,
                },
                hover: {
                    border: core.border.critical.default,
                    background: core.transparent,
                    foreground: core.foreground.critical.subtle,
                },
                press: {
                    border: core.border.critical.strong,
                    background: core.transparent,
                    foreground: core.foreground.critical.default,
                },
            },
            neutral: {
                default: {
                    border: core.transparent,
                    background: core.transparent,
                    foreground: core.foreground.neutral.default,
                },
                hover: {
                    border: core.border.neutral.default,
                    background: core.transparent,
                    foreground: core.foreground.neutral.default,
                },
                press: {
                    border: core.border.neutral.strong,
                    background: core.transparent,
                    foreground: core.foreground.neutral.strong,
                },
            },

            disabled: {
                border: core.border.disabled.default,
                background: core.background.disabled.subtle,
                foreground: core.foreground.inverse.subtle,
            },
        },
    },
    /**
     * For inputs, form elements, and other elements that require user input.
     */
    input: {
        default: {
            border: core.border.neutral.default,
            background: surface.primary,
            foreground: core.foreground.neutral.strong,
            placeholder: core.foreground.neutral.default,
        },
        checked: {
            border: core.border.instructive.default,
            background: core.background.instructive.default,
            foreground: core.foreground.inverse.strong,
        },
        disabled: {
            border: core.border.disabled.default,
            background: color.offWhite,
            foreground: core.foreground.neutral.default,
            placeholder: core.foreground.neutral.default,
        },
        error: {
            border: core.border.critical.default,
            background: core.background.critical.subtle,
            foreground: core.foreground.neutral.strong,
        },
    },
    /**
     * For labels, icons, filters, alerts, and other elements where color can
     * add meaning to the state of the system or an item in the system.
     */
    status: {
        critical: {
            background: core.background.critical.subtle,
            foreground: core.foreground.critical.subtle,
        },
        warning: {
            background: core.background.warning.subtle,
            foreground: core.foreground.warning.subtle,
        },
        success: {
            background: core.background.success.subtle,
            foreground: core.foreground.success.subtle,
        },
        notice: {
            background: core.background.instructive.subtle,
            foreground: core.foreground.instructive.subtle,
        },
        neutral: {
            background: core.background.neutral.subtle,
            foreground: core.foreground.neutral.strong,
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

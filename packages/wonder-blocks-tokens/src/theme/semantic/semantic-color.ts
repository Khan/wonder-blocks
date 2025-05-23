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
            default: color.gold,
            strong: color.activeGold,
        },
        disabled: {
            subtle: transparent,
            default: color.fadedOffBlack8,
            strong: color.fadedOffBlack16,
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

const text = {
    primary: color.offBlack,
    secondary: color.fadedOffBlack72,
    disabled: color.fadedOffBlack32,
    inverse: color.white,
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
                    foreground: text.inverse,
                },
                hover: {
                    border: core.border.instructive.default,
                    background: core.background.instructive.default,
                    foreground: text.inverse,
                },
                press: {
                    border: core.border.instructive.strong,
                    background: core.background.instructive.strong,
                    foreground: text.inverse,
                },
            },
            destructive: {
                default: {
                    border: core.transparent,
                    background: core.background.critical.default,
                    foreground: text.inverse,
                },
                hover: {
                    border: core.border.critical.default,
                    background: core.background.critical.default,
                    foreground: text.inverse,
                },
                press: {
                    border: core.border.critical.strong,
                    background: core.background.critical.strong,
                    foreground: text.inverse,
                },
            },

            neutral: {
                default: {
                    border: core.transparent,
                    background: core.background.neutral.default,
                    foreground: text.inverse,
                },
                hover: {
                    border: core.border.neutral.default,
                    background: core.background.neutral.default,
                    foreground: text.inverse,
                },
                press: {
                    border: core.border.neutral.strong,
                    background: core.background.neutral.strong,
                    foreground: text.inverse,
                },
            },

            disabled: {
                border: core.border.disabled.strong,
                background: core.border.disabled.strong,
                foreground: color.offWhite,
            },
        },

        secondary: {
            progressive: {
                default: {
                    border: core.border.neutral.default,
                    background: core.transparent,
                    foreground: color.blue,
                },
                hover: {
                    border: core.border.instructive.default,
                    background: core.transparent,
                    foreground: color.blue,
                },
                press: {
                    border: core.border.instructive.strong,
                    background: core.background.instructive.subtle,
                    foreground: color.activeBlue,
                },
            },
            destructive: {
                default: {
                    border: core.border.neutral.default,
                    background: core.transparent,
                    foreground: color.red,
                },
                hover: {
                    border: core.border.critical.default,
                    background: core.transparent,
                    foreground: color.red,
                },
                press: {
                    border: core.border.critical.strong,
                    background: core.background.critical.subtle,
                    foreground: color.activeRed,
                },
            },
            neutral: {
                default: {
                    border: core.border.neutral.default,
                    background: core.transparent,
                    foreground: text.secondary,
                },
                hover: {
                    border: core.border.neutral.default,
                    background: core.transparent,
                    foreground: text.secondary,
                },
                press: {
                    border: core.border.neutral.strong,
                    background: core.background.neutral.subtle,
                    foreground: text.primary,
                },
            },

            disabled: {
                border: core.border.disabled.strong,
                background: core.background.disabled.subtle,
                foreground: text.disabled,
            },
        },

        tertiary: {
            progressive: {
                default: {
                    border: core.transparent,
                    background: core.transparent,
                    foreground: color.blue,
                },
                hover: {
                    border: core.border.instructive.default,
                    background: core.transparent,
                    foreground: color.blue,
                },
                press: {
                    border: core.border.instructive.strong,
                    background: core.transparent,
                    foreground: color.activeBlue,
                },
            },

            destructive: {
                default: {
                    border: core.transparent,
                    background: core.transparent,
                    foreground: color.red,
                },
                hover: {
                    border: core.border.critical.default,
                    background: core.transparent,
                    foreground: color.red,
                },
                press: {
                    border: core.border.critical.strong,
                    background: core.transparent,
                    foreground: color.activeRed,
                },
            },
            neutral: {
                default: {
                    border: core.transparent,
                    background: core.transparent,
                    foreground: text.secondary,
                },
                hover: {
                    border: core.border.neutral.default,
                    background: core.transparent,
                    foreground: text.secondary,
                },
                press: {
                    border: core.border.neutral.strong,
                    background: core.transparent,
                    foreground: text.primary,
                },
            },

            disabled: {
                border: core.border.disabled.default,
                background: core.background.disabled.subtle,
                foreground: text.disabled,
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
            foreground: text.primary,
            placeholder: text.secondary,
        },
        checked: {
            border: core.border.instructive.default,
            background: core.background.instructive.default,
            foreground: text.inverse,
        },
        disabled: {
            border: core.border.disabled.default,
            background: color.offWhite,
            foreground: text.secondary,
            placeholder: text.secondary,
        },
        error: {
            border: core.border.critical.default,
            background: core.background.critical.subtle,
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

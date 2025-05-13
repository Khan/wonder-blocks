import {color} from "../../tokens/color";
import {mix} from "../../util";

const core = {
    progressive: {
        subtle: color.fadedBlue8,
        default: color.blue,
        strong: color.activeBlue,
    },
    destructive: {
        subtle: color.fadedRed8,
        default: color.red,
        strong: color.activeRed,
    },
    neutral: {
        subtle: color.fadedOffBlack16,
        default: color.fadedOffBlack50,
        strong: color.fadedOffBlack72,
    },
    inverse: {
        subtle: color.fadedOffBlack8,
        default: color.offWhite,
        strong: color.white,
    },
    // States
    warning: {
        subtle: color.fadedGold8,
        default: color.gold,
        strong: mix(color.offBlack32, color.gold),
    },
    success: {
        subtle: color.fadedGreen8,
        default: color.green,
        strong: mix(color.offBlack32, color.green),
    },
};

const border = core;

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
                    background: core.progressive.default,
                    foreground: text.inverse,
                },
                hover: {
                    border: border.progressive.default,
                    background: core.progressive.default,
                    foreground: text.inverse,
                },
                press: {
                    border: border.progressive.strong,
                    background: core.progressive.strong,
                    foreground: text.inverse,
                },
            },
            destructive: {
                default: {
                    border: "transparent",
                    background: core.progressive.default,
                    foreground: text.inverse,
                },
                hover: {
                    border: border.destructive.default,
                    background: core.progressive.default,
                    foreground: text.inverse,
                },
                press: {
                    border: border.destructive.strong,
                    background: core.destructive.strong,
                    foreground: text.inverse,
                },
            },

            neutral: {
                default: {
                    border: "transparent",
                    background: core.neutral.default,
                    foreground: text.inverse,
                },
                hover: {
                    border: border.neutral.default,
                    background: core.neutral.default,
                    foreground: text.inverse,
                },
                press: {
                    border: border.neutral.strong,
                    background: border.neutral.strong,
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
                    border: border.neutral.default,
                    background: "transparent",
                    foreground: core.progressive.default,
                },
                hover: {
                    border: border.progressive.default,
                    background: "transparent",
                    foreground: core.progressive.default,
                },
                press: {
                    border: border.progressive.strong,
                    background: color.fadedBlue,
                    foreground: core.progressive.strong,
                },
            },
            destructive: {
                default: {
                    border: border.neutral.default,
                    background: "transparent",
                    foreground: core.destructive.default,
                },
                hover: {
                    border: border.destructive.default,
                    background: "transparent",
                    foreground: core.destructive.default,
                },
                press: {
                    border: border.destructive.strong,
                    background: color.fadedRed,
                    foreground: core.destructive.strong,
                },
            },
            neutral: {
                default: {
                    border: border.neutral.default,
                    background: "transparent",
                    foreground: text.secondary,
                },
                hover: {
                    border: border.neutral.default,
                    background: "transparent",
                    foreground: text.secondary,
                },
                press: {
                    border: border.neutral.strong,
                    background: color.offBlack16,
                    foreground: text.primary,
                },
            },

            disabled: {
                border: color.fadedOffBlack32,
                background: "transparent",
                foreground: text.disabled,
            },
        },

        tertiary: {
            progressive: {
                default: {
                    border: "transparent",
                    background: "transparent",
                    foreground: core.progressive.default,
                },
                hover: {
                    border: border.progressive.default,
                    background: "transparent",
                    foreground: core.progressive.default,
                },
                press: {
                    border: border.progressive.strong,
                    background: "transparent",
                    foreground: core.progressive.strong,
                },
            },

            destructive: {
                default: {
                    border: "transparent",
                    background: "transparent",
                    foreground: core.destructive.default,
                },
                hover: {
                    border: border.destructive.default,
                    background: "transparent",
                    foreground: core.destructive.default,
                },
                press: {
                    border: border.destructive.strong,
                    background: "transparent",
                    foreground: core.destructive.strong,
                },
            },
            neutral: {
                default: {
                    border: "transparent",
                    background: "transparent",
                    foreground: text.secondary,
                },
                hover: {
                    border: border.neutral.default,
                    background: "transparent",
                    foreground: text.secondary,
                },
                press: {
                    border: border.neutral.strong,
                    background: "transparent",
                    foreground: text.primary,
                },
            },

            disabled: {
                border: border.neutral.default,
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
            border: border.neutral.strong,
            background: surface.primary,
            foreground: text.primary,
            placeholder: text.secondary,
        },
        checked: {
            border: border.progressive.default,
            background: core.progressive.default,
            foreground: text.inverse,
        },
        disabled: {
            border: border.neutral.default,
            background: color.offWhite,
            foreground: text.secondary,
            placeholder: text.secondary,
        },
        error: {
            border: border.destructive.default,
            background: core.destructive.subtle,
            foreground: text.primary,
        },
    },
    /**
     * For labels, icons, filters, alerts, and other elements where color can
     * add meaning to the state of the system or an item in the system.
     */
    status: {
        critical: {
            background: core.destructive.subtle,
            foreground: core.destructive.default,
        },
        warning: {
            background: core.warning.subtle,
            foreground: core.warning.default,
        },
        success: {
            background: core.success.subtle,
            foreground: core.success.default,
        },
        notice: {
            background: core.progressive.subtle,
            foreground: core.progressive.default,
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
        outer: core.progressive.default,
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

import {color} from "./color";

const border = {
    primary: color.fadedOffBlack16,
    subtle: color.fadedOffBlack8,
    strong: color.fadedOffBlack50,
    inverse: color.white,
};

export const semanticColor = {
    /**
     * For buttons, links, and controls to communicate the presence and meaning
     * of interaction.
     */
    action: {
        // Filled buttons are meant for primary actions.
        filled: {
            progressive: {
                default: {
                    border: "transparent",
                    background: color.blue,
                    foreground: color.white,
                },
                hover: {
                    border: color.blue,
                    background: color.blue,
                    foreground: color.white,
                },
                press: {
                    border: color.activeBlue,
                    background: color.activeBlue,
                    foreground: color.white,
                },
            },
            destructive: {
                default: {
                    border: "transparent",
                    background: color.red,
                    foreground: color.white,
                },
                hover: {
                    border: color.red,
                    background: color.red,
                    foreground: color.white,
                },
                press: {
                    border: color.activeRed,
                    background: color.activeRed,
                    foreground: color.white,
                },
            },
        },

        // Outlined is meant for use on secondary controls, or controls over
        // white/transparent backgrounds.
        outlined: {
            progressive: {
                default: {
                    border: border.strong,
                    background: color.white,
                    foreground: color.blue,
                },
                hover: {
                    border: color.blue,
                    background: color.white,
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
                    background: color.white,
                    foreground: color.red,
                },
                hover: {
                    border: color.red,
                    background: color.white,
                    foreground: color.red,
                },
                press: {
                    border: color.activeRed,
                    background: color.fadedRed,
                    foreground: color.activeRed,
                },
            },
        },
        disabled: {
            default: color.fadedOffBlack32,
            secondary: color.offWhite,
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
            foreground: color.offBlack,
        },
    },
    /**
     * For background colors. Overlays act as supplementary surfaces that mask
     * areas of the UI.
     */
    surface: {
        primary: color.white,
        secondary: color.offWhite,
        emphasis: color.blue,
        inverse: color.darkBlue,
        overlay: color.offBlack64,
    },
    /**
     * For all type to ensure contrast for legibility. Inverse text applies for
     * dark backgrounds in light mode.
     */
    text: {
        primary: color.offBlack,
        secondary: color.fadedOffBlack64,
        disabled: color.fadedOffBlack32,
        inverse: color.white,
    },
    /**
     * Borders define structure for elements. Generally borders for component
     * elements would use -Primary, rows and layout elements use -Subtle and
     * -Strong for when 3:1 contrast is a priority (ex. form elements)
     */
    border: border,
    /**
     * Default icon colors that change in context (like actions).
     */
    icon: {
        primary: color.fadedOffBlack64,
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

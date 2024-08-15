import {color} from "./color";

export const semanticColor = {
    /**
     * For buttons, links, and controls to communicate the presence and meaning
     * of interaction.
     */
    action: {
        primary: {
            default: color.blue,
            active: color.activeBlue,
        },
        destructive: {
            default: color.red,
            active: color.activeRed,
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
    border: {
        primary: color.offBlack16,
        subtle: color.offBlack8,
        strong: color.offBlack50,
        inverse: color.white,
    },
    /**
     * Default icon colors that change in context (like actions).
     */
    icon: {
        primary: color.offBlack64,
        secondary: color.offBlack,
        inverse: color.white,
        action: color.blue,
        destructive: color.red,
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

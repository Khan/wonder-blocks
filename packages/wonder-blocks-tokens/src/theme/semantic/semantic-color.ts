// This import is valid as this is the only place in the codebase where we
// should import/reference primitive colors.
/* eslint-disable import/no-deprecated */
import {color} from "../../tokens/color";
// NOTE: This import is only to provide backwards compatibility with some
// colors that don't exist in the OG primitives.
import {color as thunderBlocksColor} from "./internal/primitive-color-thunderblocks";

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
        knockout: {
            default: color.white,
        },
    },
    background: {
        base: {
            subtle: color.offWhite,
            default: color.white,
            strong: color.fadedBlue16,
        },
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
        overlay: {
            default: color.offBlack50,
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
        disabled: {
            subtle: color.fadedOffBlack16,
            default: color.fadedOffBlack32,
            strong: color.fadedOffBlack50,
        },
        knockout: {
            default: color.white,
        },
    },
    shadow: {
        transparent: color.offBlack16,
        chonky: {
            progressive: {
                subtle: color.fadedBlue,
                default: color.activeBlue,
            },
            neutral: {
                subtle: color.fadedOffBlack32,
                default: color.fadedOffBlack50,
                strong: color.offBlack,
            },
        },
    },
};

const surface = {
    primary: color.white,
    secondary: color.offWhite,
    emphasis: color.fadedBlue16,
    inverse: color.darkBlue,
    overlay: color.offBlack64,
};

const sharedFeedbackStrongTokens = {
    background: core.background.neutral.strong,
    border: core.border.neutral.strong,
    text: core.foreground.knockout.default,
};

export const semanticColor = {
    /**
     * Our core colors are used for the most common elements in our UI. They
     * are the most important colors in our system and should be used
     * consistently across all components.
     */
    core,
    /**
     * Learning tokens are used for elements that are related to learning
     * experiences, such as practice and mastery, among others.
     */
    learning: {
        /**
         * These colors are used for MathJax elements, which are used to
         * render mathematical expressions in Khan Academy.
         *
         * NOTE: These colors are extracted from the Khan/mathjax-renderer repo.
         * @see https://github.com/Khan/mathjax-renderer/blob/main/src/ts/tex-input-config.ts#L26-L35
         */
        math: {
            foreground: {
                blue: "#3D7586",
                gold: "#946700",
                green: "#447A53",
                gray: "#5D5F66",
                grayH: "#3B3D45",
                grayI: "#21242C",
                purple: "#594094",
                purpleD: "#8351E8",
                pink: "#B25071",
                red: "#D92916",
            },
        },
        background: {
            gems: {
                subtle: thunderBlocksColor.magenta_90,
                default: thunderBlocksColor.magenta_80,
                strong: thunderBlocksColor.magenta_10,
            },
            due: {
                subtle: thunderBlocksColor.cyan_80,
                default: thunderBlocksColor.cyan_60,
                strong: thunderBlocksColor.cyan_10,
            },
            streaks: {
                subtle: thunderBlocksColor.orange_80,
                default: thunderBlocksColor.orange_60,
                strong: thunderBlocksColor.orange_10,
            },
            progress: {
                notStarted: {
                    default: thunderBlocksColor.gray_60,
                },
                attempted: {
                    default: thunderBlocksColor.yellow_60,
                },
                complete: {
                    default: thunderBlocksColor.green_60,
                },
            },
        },
        border: {
            gems: {
                subtle: thunderBlocksColor.magenta_80,
                default: thunderBlocksColor.magenta_60,
                strong: thunderBlocksColor.magenta_30,
            },
            streaks: {
                subtle: thunderBlocksColor.orange_80,
                default: thunderBlocksColor.orange_60,
                strong: thunderBlocksColor.orange_30,
            },
            due: {
                subtle: thunderBlocksColor.cyan_80,
                default: thunderBlocksColor.cyan_60,
                strong: thunderBlocksColor.cyan_30,
            },
        },
        foreground: {
            gems: {
                subtle: thunderBlocksColor.magenta_60,
                default: thunderBlocksColor.magenta_30,
                strong: thunderBlocksColor.magenta_10,
            },
            streaks: {
                subtle: thunderBlocksColor.orange_60,
                default: thunderBlocksColor.orange_30,
                strong: thunderBlocksColor.orange_10,
            },
            due: {
                subtle: thunderBlocksColor.cyan_60,
                default: thunderBlocksColor.cyan_20,
                strong: thunderBlocksColor.cyan_10,
            },
            progress: {
                notStarted: {
                    subtle: thunderBlocksColor.gray_50,
                    strong: thunderBlocksColor.gray_10,
                },
                attempted: {
                    subtle: thunderBlocksColor.yellow_50,
                    strong: thunderBlocksColor.yellow_10,
                },
                complete: {
                    strong: thunderBlocksColor.green_50,
                },
            },
        },
        shadow: {
            progress: {
                notStarted: {
                    default: thunderBlocksColor.gray_20,
                },
                attempted: {
                    default: thunderBlocksColor.yellow_30,
                },
                complete: {
                    default: thunderBlocksColor.green_30,
                },
            },
        },
    },

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
                    foreground: core.foreground.knockout.default,
                },
                hover: {
                    border: core.border.instructive.default,
                    background: core.background.instructive.default,
                    foreground: core.foreground.knockout.default,
                },
                press: {
                    border: core.border.instructive.strong,
                    background: core.background.instructive.strong,
                    foreground: core.foreground.knockout.default,
                },
            },
            destructive: {
                default: {
                    border: core.transparent,
                    background: core.background.critical.default,
                    foreground: core.foreground.knockout.default,
                },
                hover: {
                    border: core.border.critical.default,
                    background: core.background.critical.default,
                    foreground: core.foreground.knockout.default,
                },
                press: {
                    border: core.border.critical.strong,
                    background: core.background.critical.strong,
                    foreground: core.foreground.knockout.default,
                },
            },

            neutral: {
                default: {
                    border: core.transparent,
                    background: core.background.neutral.default,
                    foreground: core.foreground.knockout.default,
                },
                hover: {
                    border: core.border.neutral.default,
                    background: core.background.neutral.default,
                    foreground: core.foreground.knockout.default,
                },
                press: {
                    border: core.border.neutral.strong,
                    background: core.background.neutral.strong,
                    foreground: core.foreground.knockout.default,
                },
            },

            disabled: {
                border: core.border.disabled.strong,
                background: core.border.disabled.strong,
                foreground: core.foreground.knockout.default,
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
                foreground: core.foreground.disabled.default,
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
                foreground: core.foreground.disabled.default,
            },
        },
    },
    /**
     * For activity and conversation buttons.
     */
    chonky: {
        progressive: {
            background: {
                primary: {
                    rest: core.background.instructive.default,
                    hover: core.background.instructive.default,
                    press: core.background.instructive.default,
                    selected: core.background.instructive.default,
                },
                secondary: {
                    rest: core.background.instructive.subtle,
                    hover: core.background.instructive.subtle,
                    press: core.background.instructive.subtle,
                    selected: core.background.instructive.subtle,
                },
                tertiary: {
                    rest: core.transparent,
                    hover: core.transparent,
                    press: core.transparent,
                    selected: core.transparent,
                },
            },
            border: {
                primary: {
                    rest: core.transparent,
                    hover: core.transparent,
                    press: core.transparent,
                    selected: core.transparent,
                },
                secondary: {
                    rest: core.border.instructive.subtle,
                    hover: core.border.instructive.subtle,
                    press: core.border.instructive.subtle,
                    selected: core.border.instructive.subtle,
                },
                tertiary: {
                    rest: core.transparent,
                    hover: core.border.neutral.subtle,
                    press: core.border.neutral.subtle,
                    selected: core.border.instructive.subtle,
                },
            },
            foreground: {
                primary: {
                    rest: core.foreground.knockout.default,
                    hover: core.foreground.knockout.default,
                    press: core.foreground.knockout.default,
                    selected: core.foreground.knockout.default,
                },
                secondary: {
                    rest: core.foreground.instructive.default,
                    hover: core.foreground.instructive.default,
                    press: core.foreground.instructive.default,
                    selected: core.foreground.instructive.default,
                },
                tertiary: {
                    rest: core.foreground.instructive.default,
                    hover: core.foreground.instructive.default,
                    press: core.foreground.instructive.default,
                    selected: core.foreground.instructive.default,
                },
            },
            shadow: {
                primary: {
                    rest: core.shadow.chonky.progressive.default,
                    hover: core.shadow.chonky.progressive.default,
                    press: core.shadow.chonky.progressive.default,
                    selected: core.shadow.chonky.progressive.default,
                },
                secondary: {
                    rest: core.shadow.chonky.progressive.subtle,
                    hover: core.shadow.chonky.progressive.subtle,
                    press: core.shadow.chonky.progressive.subtle,
                    selected: core.shadow.chonky.progressive.subtle,
                },
                tertiary: {
                    rest: core.transparent,
                    hover: core.shadow.chonky.neutral.subtle,
                    press: core.shadow.chonky.neutral.subtle,
                    selected: core.shadow.chonky.progressive.subtle,
                },
            },
        },
        neutral: {
            background: {
                primary: {
                    rest: core.background.neutral.default,
                    hover: core.background.neutral.default,
                    press: core.background.neutral.default,
                    selected: core.background.neutral.default,
                },
                secondary: {
                    rest: core.transparent,
                    hover: core.transparent,
                    press: core.transparent,
                    selected: core.background.neutral.subtle,
                },
                tertiary: {
                    rest: core.transparent,
                    hover: core.transparent,
                    press: core.transparent,
                    selected: core.transparent,
                },
            },
            border: {
                primary: {
                    rest: core.transparent,
                    hover: core.transparent,
                    press: core.transparent,
                    selected: core.transparent,
                },
                secondary: {
                    rest: core.border.neutral.subtle,
                    hover: core.border.neutral.subtle,
                    press: core.border.neutral.subtle,
                    selected: core.border.neutral.subtle,
                },
                tertiary: {
                    rest: core.transparent,
                    hover: core.border.neutral.subtle,
                    press: core.border.neutral.subtle,
                    selected: core.transparent,
                },
            },
            foreground: {
                primary: {
                    rest: core.foreground.knockout.default,
                    hover: core.foreground.knockout.default,
                    press: core.foreground.knockout.default,
                    selected: core.foreground.knockout.default,
                },
                secondary: {
                    rest: core.foreground.neutral.subtle,
                    hover: core.foreground.neutral.subtle,
                    press: core.foreground.neutral.subtle,
                    selected: core.foreground.neutral.subtle,
                },
                tertiary: {
                    rest: core.foreground.neutral.default,
                    hover: core.foreground.neutral.default,
                    press: core.foreground.neutral.default,
                    selected: core.foreground.neutral.default,
                },
            },
            shadow: {
                primary: {
                    rest: core.shadow.chonky.neutral.strong,
                    hover: core.shadow.chonky.neutral.strong,
                    press: core.transparent,
                    selected: core.shadow.chonky.neutral.strong,
                },
                secondary: {
                    rest: core.shadow.chonky.neutral.subtle,
                    hover: core.shadow.chonky.neutral.subtle,
                    press: core.shadow.chonky.neutral.strong,
                    selected: core.shadow.chonky.neutral.subtle,
                },
                tertiary: {
                    rest: core.transparent,
                    hover: core.shadow.chonky.neutral.subtle,
                    press: core.shadow.chonky.neutral.subtle,
                    selected: core.shadow.chonky.progressive.subtle,
                },
            },
        },
        disabled: {
            background: {
                primary: core.background.disabled.default,
                secondary: core.background.disabled.default,
                tertiary: core.background.disabled.subtle,
            },
            border: {
                primary: core.border.disabled.default,
                secondary: core.border.disabled.default,
                tertiary: core.border.disabled.subtle,
            },
            foreground: {
                primary: core.foreground.disabled.default,
                secondary: core.foreground.disabled.default,
                tertiary: core.foreground.disabled.default,
            },
            shadow: {
                primary: core.shadow.chonky.neutral.subtle,
                secondary: core.shadow.chonky.neutral.subtle,
                tertiary: core.transparent,
            },
        },
    },

    /**
     * For inputs, form elements, and other elements that require user input.
     */
    input: {
        default: {
            border: core.border.neutral.default,
            background: core.background.base.default,
            foreground: core.foreground.neutral.strong,
            placeholder: core.foreground.neutral.default,
        },
        checked: {
            border: core.border.instructive.default,
            background: core.background.instructive.default,
            foreground: core.foreground.knockout.default,
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
        readOnly: {
            background: core.background.base.default,
            text: core.foreground.neutral.strong,
            icon: core.transparent,
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

    focus: {
        outer: color.blue,
        inner: color.white,
    },

    link: {
        rest: core.foreground.instructive.subtle,
        hover: core.foreground.instructive.subtle,
        press: core.foreground.instructive.default,
        disabled: core.foreground.disabled.default,
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
    /**
     * Colors related to feedback.
     */
    feedback: {
        info: {
            subtle: {
                background: core.background.instructive.subtle,
                border: core.border.instructive.subtle,
                icon: core.foreground.instructive.default,
                text: core.foreground.instructive.strong,
            },
            strong: {
                ...sharedFeedbackStrongTokens,
                icon: core.foreground.instructive.subtle,
            },
        },
        success: {
            subtle: {
                background: core.background.success.subtle,
                border: core.border.success.subtle,
                icon: core.foreground.success.default,
                text: core.foreground.success.strong,
            },
            strong: {
                ...sharedFeedbackStrongTokens,
                icon: core.foreground.success.subtle,
            },
        },
        warning: {
            subtle: {
                background: core.background.warning.subtle,
                border: core.border.warning.default,
                icon: core.foreground.warning.default,
                text: core.foreground.warning.strong,
            },
            strong: {
                ...sharedFeedbackStrongTokens,
                icon: core.foreground.warning.subtle,
            },
        },
        critical: {
            subtle: {
                background: core.background.critical.subtle,
                border: core.border.critical.subtle,
                icon: core.foreground.critical.default,
                text: core.foreground.critical.strong,
            },
            strong: {
                ...sharedFeedbackStrongTokens,
                icon: core.foreground.critical.subtle,
            },
        },
    },
};

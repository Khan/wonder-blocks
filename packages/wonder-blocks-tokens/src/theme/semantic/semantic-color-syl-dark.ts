import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {color} from "./internal/primitive-color-thunderblocks";
import {semanticColor as thunderblocksSemanticColor} from "./semantic-color-thunderblocks";

const transparent = "transparent";

const transparentShadowColor = color.black_60;

const core = {
    transparent,
    border: {
        instructive: {
            subtle: color.blue_40,
            default: color.blue_50,
            strong: color.blue_60,
        },
        neutral: {
            subtle: color.gray_10,
            default: color.gray_20,
            strong: color.gray_40,
        },
        critical: {
            subtle: color.red_30,
            default: color.red_40,
            strong: color.red_60,
        },
        success: {
            subtle: color.green_30,
            default: color.green_40,
            strong: color.green_60,
        },
        warning: {
            subtle: color.yellow_20,
            default: color.yellow_30,
            strong: color.yellow_50,
        },
        disabled: {
            subtle: transparent,
            default: color.gray_30,
            strong: color.gray_40,
        },
        knockout: {
            default: color.white_100,
        },
    },
    background: {
        base: {
            subtle: color.gray_05,
            default: color.black_100,
            strong: color.gray_60,
        },
        instructive: {
            subtle: color.blue_01,
            default: color.blue_30,
            strong: color.blue_70,
        },
        neutral: {
            subtle: color.gray_10,
            default: color.gray_20,
            strong: color.gray_70,
        },
        critical: {
            subtle: color.red_05,
            default: color.red_30,
            strong: color.red_50,
        },
        success: {
            subtle: color.green_05,
            default: color.green_30,
            strong: color.green_50,
        },
        warning: {
            subtle: color.yellow_05,
            default: color.yellow_30,
            strong: color.yellow_50,
        },
        disabled: {
            subtle: transparent,
            default: color.gray_20,
            strong: color.gray_40,
        },
        overlay: {
            default: color.black_50,
        },
    },

    /**
     * Used for text and icons.
     */
    foreground: {
        instructive: {
            subtle: color.blue_20,
            default: color.blue_40,
            strong: color.blue_70,
        },
        neutral: {
            subtle: color.gray_40,
            default: color.gray_60,
            strong: color.gray_80,
        },
        critical: {
            subtle: color.red_50,
            default: color.red_80,
            strong: color.red_90,
        },
        success: {
            subtle: color.green_50,
            default: color.green_80,
            strong: color.green_90,
        },
        warning: {
            subtle: color.yellow_50,
            default: color.yellow_80,
            strong: color.yellow_90,
        },
        disabled: {
            subtle: color.gray_50,
            default: color.gray_60,
            strong: color.gray_70,
        },
        knockout: {
            default: color.white_100,
        },
    },
    shadow: {
        transparent: {
            low: transparentShadowColor,
            mid: transparentShadowColor,
            high: transparentShadowColor,
        },
        chonky: {
            instructive: {
                subtle: color.blue_40,
                default: color.blue_10,
            },
            neutral: {
                subtle: color.gray_10,
                default: color.gray_30,
                strong: color.gray_50,
            },
        },
    },
};

const sharedFeedbackStrongTokens = {
    background: core.background.neutral.strong,
    border: core.border.neutral.strong,
    text: core.foreground.knockout.default,
};

const feedbackTokens = {
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
    neutral: {
        subtle: {
            background: core.background.neutral.subtle,
            border: core.border.neutral.subtle,
            icon: core.foreground.neutral.subtle,
            text: core.foreground.neutral.default,
        },
        strong: {
            ...sharedFeedbackStrongTokens,
            icon: core.foreground.neutral.subtle,
        },
    },
};

export const semanticColor = mergeTheme(thunderblocksSemanticColor, {
    action: {
        primary: {
            ...thunderblocksSemanticColor.action.primary,
            disabled: {
                border: core.transparent,
                background: core.background.disabled.strong,
                foreground: core.foreground.disabled.default,
            },
        },

        secondary: {
            progressive: {
                default: {
                    border: core.border.instructive.subtle,
                    background: core.background.instructive.subtle,
                    foreground: core.foreground.instructive.default,
                },
                hover: {
                    border: core.border.instructive.default,
                    background: core.background.instructive.subtle,
                    foreground: core.foreground.instructive.default,
                },
                press: {
                    border: core.border.instructive.default,
                    background: core.background.instructive.subtle,
                    foreground: core.foreground.instructive.default,
                },
            },
            destructive: {
                default: {
                    border: core.border.critical.default,
                    background: core.background.critical.subtle,
                    foreground: core.foreground.critical.default,
                },
                hover: {
                    border: core.border.critical.strong,
                    background: core.background.critical.subtle,
                    foreground: core.foreground.critical.strong,
                },
                press: {
                    border: core.border.critical.strong,
                    background: core.background.critical.subtle,
                    foreground: core.foreground.critical.strong,
                },
            },
            neutral: {
                default: {
                    border: core.border.neutral.subtle,
                    background: core.background.base.default,
                    foreground: core.foreground.neutral.default,
                },
                hover: {
                    border: core.border.neutral.strong,
                    background: core.background.base.default,
                    foreground: core.foreground.neutral.strong,
                },
                press: {
                    border: core.border.neutral.strong,
                    background: core.background.base.default,
                    foreground: core.foreground.neutral.strong,
                },
            },

            disabled: {
                border: core.border.disabled.default,
                background: core.background.disabled.default,
                foreground: core.foreground.disabled.default,
            },
        },

        tertiary: {
            progressive: {
                default: {
                    border: core.transparent,
                    background: core.transparent,
                    foreground: core.foreground.instructive.default,
                },
                hover: {
                    border: core.border.instructive.strong,
                    background: core.transparent,
                    foreground: core.foreground.instructive.strong,
                },
                press: {
                    border: core.border.instructive.strong,
                    background: core.transparent,
                    foreground: core.foreground.instructive.strong,
                },
            },

            destructive: {
                default: {
                    border: core.transparent,
                    background: core.transparent,
                    foreground: core.foreground.critical.default,
                },
                hover: {
                    border: core.border.critical.strong,
                    background: core.transparent,
                    foreground: core.foreground.critical.strong,
                },
                press: {
                    border: core.border.critical.strong,
                    background: core.transparent,
                    foreground: core.foreground.critical.strong,
                },
            },
            neutral: {
                default: {
                    border: core.transparent,
                    background: core.transparent,
                    foreground: core.foreground.neutral.default,
                },
                hover: {
                    border: core.border.neutral.strong,
                    background: core.transparent,
                    foreground: core.foreground.neutral.strong,
                },
                press: {
                    border: core.border.neutral.strong,
                    background: core.transparent,
                    foreground: core.foreground.neutral.strong,
                },
            },

            disabled: {
                border: core.border.disabled.subtle,
                background: core.background.disabled.subtle,
                foreground: core.foreground.disabled.subtle,
            },
        },
    },

    /**
     * For activity and conversation buttons.
     */
    chonky: {
        progressive: {
            background: {
                primary:
                    thunderblocksSemanticColor.chonky.progressive.background
                        .primary,
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
                primary:
                    thunderblocksSemanticColor.chonky.progressive.border
                        .primary,
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
                primary:
                    thunderblocksSemanticColor.chonky.progressive.foreground
                        .primary,
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
                primary:
                    thunderblocksSemanticColor.chonky.progressive.shadow
                        .primary,
                secondary: {
                    rest: core.shadow.chonky.instructive.subtle,
                    hover: core.shadow.chonky.instructive.subtle,
                    press: core.shadow.chonky.instructive.subtle,
                    selected: core.shadow.chonky.instructive.subtle,
                },
                tertiary: {
                    rest: core.transparent,
                    hover: core.shadow.chonky.neutral.subtle,
                    press: core.shadow.chonky.neutral.subtle,
                    selected: core.shadow.chonky.instructive.subtle,
                },
            },
        },
        neutral: {
            background: {
                primary:
                    thunderblocksSemanticColor.chonky.neutral.background
                        .primary,
                secondary: {
                    rest: core.background.base.default,
                    hover: core.background.base.default,
                    press: core.background.base.default,
                    selected: core.background.base.default,
                },
                tertiary: {
                    rest: core.transparent,
                    hover: core.transparent,
                    press: core.transparent,
                    selected: core.transparent,
                },
            },
            border: {
                primary:
                    thunderblocksSemanticColor.chonky.neutral.border.primary,
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
                primary:
                    thunderblocksSemanticColor.chonky.neutral.foreground
                        .primary,
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
                primary:
                    thunderblocksSemanticColor.chonky.neutral.shadow.primary,
                secondary: {
                    rest: core.shadow.chonky.neutral.subtle,
                    hover: core.shadow.chonky.neutral.subtle,
                    press: core.shadow.chonky.neutral.subtle,
                    selected: core.shadow.chonky.neutral.subtle,
                },
                tertiary: {
                    rest: core.transparent,
                    hover: core.shadow.chonky.neutral.subtle,
                    press: core.shadow.chonky.neutral.subtle,
                    selected: core.shadow.chonky.instructive.subtle,
                },
            },
        },
        disabled: {
            background: {
                primary:
                    thunderblocksSemanticColor.chonky.disabled.background
                        .primary,
                secondary: core.background.disabled.default,
                tertiary: core.background.disabled.subtle,
            },
            border: {
                primary:
                    thunderblocksSemanticColor.chonky.disabled.border.primary,
                secondary: core.border.disabled.strong,
                tertiary: core.border.disabled.subtle,
            },
            foreground: {
                primary:
                    thunderblocksSemanticColor.chonky.disabled.foreground
                        .primary,
                secondary: color.gray_50,
                tertiary: color.gray_50,
            },
            shadow: {
                primary:
                    thunderblocksSemanticColor.chonky.disabled.shadow.primary,
                secondary: core.shadow.chonky.neutral.subtle,
                tertiary: core.transparent,
            },
        },
    },
    status: {
        critical: {
            background: feedbackTokens.critical.subtle.background,
            foreground: feedbackTokens.critical.subtle.text,
        },
        warning: {
            background: feedbackTokens.warning.subtle.background,
            foreground: feedbackTokens.warning.subtle.text,
        },
        success: {
            background: feedbackTokens.success.subtle.background,
            foreground: feedbackTokens.success.subtle.text,
        },
        notice: {
            background: feedbackTokens.info.subtle.background,
            foreground: feedbackTokens.info.subtle.text,
        },
        neutral: {
            background: feedbackTokens.neutral.subtle.background,
            foreground: feedbackTokens.neutral.subtle.text,
        },
    },

    focus: {
        outer: color.blue_30,
        inner: color.white_100,
    },
    link: {
        rest: core.foreground.instructive.default,
        hover: core.foreground.instructive.strong,
        press: core.foreground.instructive.strong,
        disabled: core.foreground.disabled.subtle,
    },
    core,
    feedback: feedbackTokens,
    learning: {
        math: {
            foreground: {
                blue: color.cyan_50,
                gold: color.yellow_40,
                green: color.green_50,
                gray: color.gray_60,
                grayH: color.gray_70,
                grayI: color.gray_80,
                purple: color.blue_60,
                purpleD: color.blue_50,
                pink: color.magenta_50,
                red: color.red_60,
            },
        },
        background: {
            gems: {
                subtle: color.magenta_05,
                default: color.magenta_10,
                strong: color.magenta_20,
            },
            due: {
                subtle: color.cyan_05,
                default: color.cyan_10,
                strong: color.cyan_20,
            },
            streaks: {
                subtle: color.orange_05,
                default: color.orange_10,
                strong: color.orange_20,
            },
            progress: {
                notStarted: {
                    default: color.gray_50,
                },
                attempted: {
                    default: color.yellow_40,
                },
                complete: {
                    default: color.green_40,
                },
            },
        },
        border: {
            gems: {
                subtle: color.magenta_10,
                default: color.magenta_20,
                strong: color.magenta_30,
            },
            streaks: {
                subtle: color.orange_10,
                default: color.orange_20,
                strong: color.orange_30,
            },
            due: {
                subtle: color.cyan_20,
                default: color.cyan_40,
                strong: color.cyan_60,
            },
        },
        foreground: {
            gems: {
                subtle: color.magenta_20,
                default: color.magenta_30,
                strong: color.magenta_90,
            },
            streaks: {
                subtle: color.orange_20,
                default: color.orange_30,
                strong: color.orange_90,
            },
            due: {
                subtle: color.cyan_20,
                default: color.cyan_30,
                strong: color.cyan_40,
            },
            progress: {
                notStarted: {
                    subtle: color.gray_50,
                    strong: color.gray_10,
                },
                attempted: {
                    subtle: color.yellow_20,
                    strong: color.yellow_05,
                },
                complete: {
                    strong: color.green_10,
                },
            },
        },
        shadow: {
            progress: {
                notStarted: {
                    default: color.gray_10,
                },
                attempted: {
                    default: color.yellow_20,
                },
                complete: {
                    default: color.green_20,
                },
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
            placeholder: core.foreground.neutral.subtle,
        },
        checked: {
            border: core.border.instructive.default,
            background: core.background.instructive.default,
            foreground: core.foreground.knockout.default,
        },
        disabled: {
            border: core.border.disabled.default,
            background: core.background.base.default,
            foreground: core.foreground.disabled.default,
            placeholder: core.foreground.disabled.subtle,
        },
        error: {
            border: core.border.critical.default,
            background: core.background.base.default,
            foreground: core.foreground.neutral.strong,
        },
        readOnly: {
            background: core.background.disabled.default,
            text: core.foreground.neutral.default,
            icon: core.foreground.neutral.subtle,
        },
    },
});

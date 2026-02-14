import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {color} from "./internal/primitive-color-thunderblocks";

import {semanticColor as defaultSemanticColor} from "./semantic-color";

const transparent = "transparent";

// NOTE: We use `color-mix` to generate a transparent color because it supports
// using CSS variables as input, which is not possible with the CSS `rgba`
// function or the `fade` JS function.
const transparentShadowColor = `color-mix(in srgb, ${color.blue_05} 20%, ${transparent})`;

const core = {
    transparent,
    border: {
        instructive: {
            subtle: color.blue_60,
            default: color.blue_40,
            strong: color.blue_10,
        },
        neutral: {
            subtle: color.gray_60,
            default: color.gray_30,
            strong: color.gray_10,
        },
        critical: {
            subtle: color.red_60,
            default: color.red_30,
            strong: color.red_10,
        },
        success: {
            subtle: color.green_60,
            default: color.green_30,
            strong: color.green_10,
        },
        warning: {
            subtle: color.yellow_60,
            default: color.yellow_40,
            strong: color.yellow_10,
        },
        disabled: {
            subtle: transparent,
            default: color.gray_70,
            strong: color.gray_60,
        },
        knockout: {
            default: color.white_100,
        },
    },
    background: {
        base: {
            subtle: color.blue_90,
            default: color.white_100,
            strong: color.black_100,
        },
        instructive: {
            subtle: color.blue_80,
            default: color.blue_30,
            strong: color.blue_10,
        },
        neutral: {
            subtle: color.gray_80,
            default: color.gray_20,
            strong: color.gray_10,
        },
        critical: {
            subtle: color.red_80,
            default: color.red_20,
            strong: color.red_05,
        },
        success: {
            subtle: color.green_80,
            default: color.green_30,
            strong: color.green_20,
        },
        warning: {
            subtle: color.yellow_80,
            default: color.yellow_60,
            strong: color.yellow_10,
        },
        disabled: {
            subtle: transparent,
            default: color.gray_80,
            strong: color.gray_70,
        },
        overlay: {
            default: color.black_60,
        },
    },

    /**
     * Used for text and icons.
     */
    foreground: {
        instructive: {
            subtle: color.blue_50,
            default: color.blue_30,
            strong: color.blue_10,
        },
        neutral: {
            subtle: color.gray_20,
            default: color.gray_10,
            strong: color.black_100,
        },
        critical: {
            subtle: color.red_50,
            default: color.red_20,
            strong: color.red_10,
        },
        success: {
            subtle: color.green_50,
            default: color.green_20,
            strong: color.green_05,
        },
        warning: {
            subtle: color.yellow_50,
            default: color.yellow_10,
            strong: color.yellow_05,
        },
        disabled: {
            subtle: color.gray_60,
            default: color.gray_50,
            strong: color.gray_40,
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
                subtle: color.blue_60,
                default: color.blue_10,
            },
            neutral: {
                subtle: color.gray_60,
                default: color.gray_30,
                strong: color.gray_10,
            },
        },
    },
};

const sharedFeedbackStrongTokens = {
    background: core.background.base.strong,
    border: core.border.neutral.strong,
    text: core.foreground.knockout.default,
};

export const semanticColor = mergeTheme(defaultSemanticColor, {
    action: {
        primary: {
            progressive: {
                default: {
                    border: core.transparent,
                    background: core.background.instructive.default,
                    foreground: core.foreground.knockout.default,
                },
                hover: {
                    border: core.transparent,
                    background: core.background.instructive.strong,
                    foreground: core.foreground.knockout.default,
                },
                press: {
                    border: core.transparent,
                    background: core.background.instructive.strong,
                    foreground: core.foreground.knockout.default,
                },
            },
            destructive: {
                default: {
                    border: core.border.critical.default,
                    background: core.background.critical.default,
                    foreground: core.foreground.knockout.default,
                },
                hover: {
                    border: core.border.critical.strong,
                    background: core.background.critical.strong,
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
                    border: core.transparent,
                    background: core.background.neutral.strong,
                    foreground: core.foreground.knockout.default,
                },
                press: {
                    border: core.transparent,
                    background: core.background.neutral.strong,
                    foreground: core.foreground.knockout.default,
                },
            },

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
                    foreground: core.foreground.critical.default,
                },
                press: {
                    border: core.border.critical.strong,
                    background: core.background.critical.subtle,
                    foreground: core.foreground.critical.default,
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
                    rest: core.shadow.chonky.instructive.default,
                    hover: core.shadow.chonky.instructive.default,
                    press: core.transparent,
                    selected: core.shadow.chonky.instructive.default,
                },
                secondary: {
                    rest: core.shadow.chonky.instructive.subtle,
                    hover: core.shadow.chonky.instructive.subtle,
                    press: core.transparent,
                    selected: core.shadow.chonky.instructive.subtle,
                },
                tertiary: {
                    rest: core.transparent,
                    hover: core.shadow.chonky.neutral.subtle,
                    press: core.transparent,
                    selected: core.shadow.chonky.instructive.subtle,
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
                    press: core.shadow.chonky.neutral.strong,
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
                    selected: core.shadow.chonky.instructive.subtle,
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
                primary: core.border.disabled.subtle,
                secondary: core.border.disabled.strong,
                tertiary: core.border.disabled.subtle,
            },
            foreground: {
                primary: core.foreground.disabled.default,
                secondary: core.foreground.disabled.default,
                tertiary: core.foreground.disabled.subtle,
            },
            shadow: {
                primary: core.shadow.chonky.neutral.subtle,
                secondary: core.shadow.chonky.neutral.subtle,
                tertiary: core.transparent,
            },
        },
    },
    status: {
        critical: {
            background: color.red_90,
            foreground: color.red_10,
        },
        warning: {
            background: color.yellow_90,
            foreground: color.yellow_05,
        },
        success: {
            background: color.green_90,
            foreground: color.green_10,
        },
        notice: {
            background: color.blue_90,
            foreground: color.blue_10,
        },
        neutral: {
            background: color.gray_90,
            foreground: color.gray_10,
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
    },
    learning: {
        math: {
            foreground: {
                blue: color.cyan_10,
                gold: color.yellow_10,
                green: color.green_20,
                gray: color.gray_10,
                grayH: color.gray_05,
                grayI: color.black_100,
                purple: color.blue_05,
                purpleD: color.blue_10,
                pink: color.magenta_10,
                red: color.red_20,
            },
        },
        background: {
            gems: {
                subtle: color.magenta_90,
                default: color.magenta_80,
                strong: color.magenta_10,
            },
            due: {
                subtle: color.cyan_80,
                default: color.cyan_60,
                strong: color.cyan_10,
            },
            streaks: {
                subtle: color.orange_80,
                default: color.orange_60,
                strong: color.orange_10,
            },
            progress: {
                notStarted: {
                    default: color.gray_60,
                },
                attempted: {
                    default: color.yellow_60,
                },
                complete: {
                    default: color.green_60,
                },
            },
        },
        border: {
            gems: {
                subtle: color.magenta_80,
                default: color.magenta_60,
                strong: color.magenta_30,
            },
            streaks: {
                subtle: color.orange_80,
                default: color.orange_60,
                strong: color.orange_30,
            },
            due: {
                subtle: color.cyan_80,
                default: color.cyan_60,
                strong: color.cyan_30,
            },
        },
        foreground: {
            gems: {
                subtle: color.magenta_60,
                default: color.magenta_30,
                strong: color.magenta_20,
            },
            streaks: {
                subtle: color.orange_60,
                default: color.orange_30,
                strong: color.orange_10,
            },
            due: {
                subtle: color.cyan_60,
                default: color.cyan_20,
                strong: color.cyan_10,
            },
            progress: {
                notStarted: {
                    subtle: color.gray_50,
                    strong: color.gray_10,
                },
                attempted: {
                    subtle: color.yellow_50,
                    strong: color.yellow_10,
                },
                complete: {
                    strong: color.green_10,
                },
            },
        },
        shadow: {
            progress: {
                notStarted: {
                    default: color.gray_20,
                },
                attempted: {
                    default: color.yellow_30,
                },
                complete: {
                    default: color.green_30,
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

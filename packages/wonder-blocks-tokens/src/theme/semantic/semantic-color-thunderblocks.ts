import {mergeTheme} from "@khanacademy/wonder-blocks-theming";

import {semanticColor as defaultSemanticColor} from "./semantic-color";

const TEMP_COLOR = "#beabea";
const transparent = TEMP_COLOR;

// NOTE: We use `color-mix` to generate a transparent color because it supports
// using CSS variables as input, which is not possible with the CSS `rgba`
// function or the `fade` JS function.
const transparentShadowColor = TEMP_COLOR;

const core = {
    transparent,
    border: {
        instructive: {
            subtle: TEMP_COLOR,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        neutral: {
            subtle: TEMP_COLOR,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        critical: {
            subtle: TEMP_COLOR,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        success: {
            subtle: TEMP_COLOR,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        warning: {
            subtle: TEMP_COLOR,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        disabled: {
            subtle: transparent,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        knockout: {
            default: TEMP_COLOR,
        },
    },
    background: {
        base: {
            subtle: TEMP_COLOR,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        instructive: {
            subtle: TEMP_COLOR,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        neutral: {
            subtle: TEMP_COLOR,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        critical: {
            subtle: TEMP_COLOR,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        success: {
            subtle: TEMP_COLOR,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        warning: {
            subtle: TEMP_COLOR,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        disabled: {
            subtle: transparent,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        overlay: {
            default: TEMP_COLOR,
        },
    },

    /**
     * Used for text and icons.
     */
    foreground: {
        instructive: {
            subtle: TEMP_COLOR,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        neutral: {
            subtle: TEMP_COLOR,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        critical: {
            subtle: TEMP_COLOR,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        success: {
            subtle: TEMP_COLOR,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        warning: {
            subtle: TEMP_COLOR,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        disabled: {
            subtle: TEMP_COLOR,
            default: TEMP_COLOR,
            strong: TEMP_COLOR,
        },
        knockout: {
            default: TEMP_COLOR,
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
                subtle: TEMP_COLOR,
                default: TEMP_COLOR,
            },
            neutral: {
                subtle: TEMP_COLOR,
                default: TEMP_COLOR,
                strong: TEMP_COLOR,
            },
        },
    },
};

const sharedFeedbackStrongTokens = {
    background: core.background.neutral.strong,
    border: core.border.neutral.strong,
    text: core.foreground.knockout.default,
};

export const semanticColor = mergeTheme(defaultSemanticColor, {
    action: {
        primary: {
            progressive: {
                default: {
                    border: core.border.instructive.default,
                    background: core.background.instructive.default,
                    foreground: core.foreground.knockout.default,
                },
                hover: {
                    border: core.border.instructive.strong,
                    background: core.background.instructive.strong,
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
                    border: core.border.neutral.default,
                    background: core.background.neutral.default,
                    foreground: core.foreground.knockout.default,
                },
                hover: {
                    border: core.border.neutral.strong,
                    background: core.background.neutral.strong,
                    foreground: core.foreground.knockout.default,
                },
                press: {
                    border: core.border.neutral.strong,
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
                    press: core.shadow.chonky.instructive.default,
                    selected: core.shadow.chonky.instructive.default,
                },
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
                    press: core.shadow.chonky.neutral.strong,
                    selected: core.shadow.chonky.neutral.strong,
                },
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
                primary: TEMP_COLOR,
                secondary: TEMP_COLOR,
                tertiary: TEMP_COLOR,
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
            background: TEMP_COLOR,
            foreground: TEMP_COLOR,
        },
        warning: {
            background: TEMP_COLOR,
            foreground: TEMP_COLOR,
        },
        success: {
            background: TEMP_COLOR,
            foreground: TEMP_COLOR,
        },
        notice: {
            background: TEMP_COLOR,
            foreground: TEMP_COLOR,
        },
        neutral: {
            background: TEMP_COLOR,
            foreground: TEMP_COLOR,
        },
    },

    focus: {
        outer: TEMP_COLOR,
        inner: TEMP_COLOR,
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
    },
    learning: {
        math: {
            foreground: {
                blue: TEMP_COLOR,
                gold: TEMP_COLOR,
                green: TEMP_COLOR,
                gray: TEMP_COLOR,
                grayH: TEMP_COLOR,
                grayI: TEMP_COLOR,
                purple: TEMP_COLOR,
                purpleD: TEMP_COLOR,
                pink: TEMP_COLOR,
                red: TEMP_COLOR,
            },
        },
        background: {
            gems: {
                subtle: TEMP_COLOR,
                default: TEMP_COLOR,
                strong: TEMP_COLOR,
            },
            due: {
                subtle: TEMP_COLOR,
                default: TEMP_COLOR,
                strong: TEMP_COLOR,
            },
            streaks: {
                subtle: TEMP_COLOR,
                default: TEMP_COLOR,
                strong: TEMP_COLOR,
            },
            progress: {
                notStarted: {
                    default: TEMP_COLOR,
                },
                attempted: {
                    default: TEMP_COLOR,
                },
                complete: {
                    default: TEMP_COLOR,
                },
            },
        },
        border: {
            gems: {
                subtle: TEMP_COLOR,
                default: TEMP_COLOR,
                strong: TEMP_COLOR,
            },
            streaks: {
                subtle: TEMP_COLOR,
                default: TEMP_COLOR,
                strong: TEMP_COLOR,
            },
            due: {
                subtle: TEMP_COLOR,
                default: TEMP_COLOR,
                strong: TEMP_COLOR,
            },
        },
        foreground: {
            gems: {
                subtle: TEMP_COLOR,
                default: TEMP_COLOR,
                strong: TEMP_COLOR,
            },
            streaks: {
                subtle: TEMP_COLOR,
                default: TEMP_COLOR,
                strong: TEMP_COLOR,
            },
            due: {
                subtle: TEMP_COLOR,
                default: TEMP_COLOR,
                strong: TEMP_COLOR,
            },
            progress: {
                notStarted: {
                    subtle: TEMP_COLOR,
                    strong: TEMP_COLOR,
                },
                attempted: {
                    subtle: TEMP_COLOR,
                    strong: TEMP_COLOR,
                },
                complete: {
                    strong: TEMP_COLOR,
                },
            },
        },
        shadow: {
            progress: {
                notStarted: {
                    default: TEMP_COLOR,
                },
                attempted: {
                    default: TEMP_COLOR,
                },
                complete: {
                    default: TEMP_COLOR,
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

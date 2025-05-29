import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {color} from "./internal/primitive-color-thunderblocks";

import {semanticColor as defaultSemanticColor} from "./semantic-color";

const transparent = "transparent";

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
        inverse: {
            subtle: color.gray_60,
            default: color.gray_90,
            strong: color.white_100,
        },
    },
    background: {
        instructive: {
            subtle: color.blue_80,
            default: color.blue_30,
            strong: color.blue_10,
        },
        neutral: {
            subtle: color.white_100,
            default: color.gray_20,
            strong: color.black_100,
        },
        critical: {
            subtle: color.red_90,
            default: color.red_20,
            strong: color.red_05,
        },
        success: {
            subtle: color.green_90,
            default: color.green_30,
            strong: color.green_10,
        },
        warning: {
            subtle: color.yellow_90,
            default: color.yellow_60,
            strong: color.yellow_10,
        },
        disabled: {
            subtle: transparent,
            default: color.gray_80,
            strong: color.gray_70,
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
        inverse: {
            subtle: color.gray_60,
            default: color.gray_90,
            strong: color.white_100,
        },
    },
};

/**
 * TODO(WB-1941): Remove border once we have migrated to the new core.border
 * tokens.
 */
const border = {
    subtle: color.gray_60,
    // TODO(WB-1941): Change to the new core.border structure and use
    // neutral.default instead of primary.
    // primary: color.fadedOffBlack16,
    primary: color.gray_30,
    strong: color.gray_20,
    inverse: color.white_100,
    progressive: color.blue_30,
    destructive: color.red_30,
};

const surface = {
    primary: color.white_100,
    secondary: color.blue_90,
    emphasis: color.blue_70,
    inverse: color.gray_05,
    overlay: color.black_50,
};

const text = {
    primary: core.foreground.neutral.strong,
    secondary: core.foreground.neutral.subtle,
    disabled: core.foreground.inverse.subtle,
    inverse: core.foreground.inverse.strong,
};

export const semanticColor = mergeTheme(defaultSemanticColor, {
    action: {
        primary: {
            progressive: {
                default: {
                    border: core.border.instructive.default,
                    background: core.background.instructive.default,
                    foreground: text.inverse,
                },
                hover: {
                    border: core.border.instructive.strong,
                    background: core.background.instructive.strong,
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
                    border: core.border.critical.default,
                    background: core.background.critical.default,
                    foreground: text.inverse,
                },
                hover: {
                    border: core.border.critical.strong,
                    background: core.background.critical.strong,
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
                    border: core.border.neutral.default,
                    background: core.background.neutral.default,
                    foreground: text.inverse,
                },
                hover: {
                    border: core.border.neutral.strong,
                    background: core.background.neutral.strong,
                    foreground: text.inverse,
                },
                press: {
                    border: core.border.neutral.strong,
                    background: core.background.neutral.strong,
                    foreground: text.inverse,
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
                    background: core.background.neutral.subtle,
                    foreground: core.foreground.neutral.default,
                },
                hover: {
                    border: core.border.neutral.strong,
                    background: core.background.neutral.subtle,
                    foreground: core.foreground.neutral.strong,
                },
                press: {
                    border: core.border.neutral.strong,
                    background: core.background.neutral.subtle,
                    foreground: core.foreground.neutral.strong,
                },
            },

            disabled: {
                border: core.border.disabled.strong,
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

    surface,
    text,
    border,

    focus: {
        outer: color.blue_30,
        inner: color.white_100,
    },
    link: {
        rest: core.foreground.instructive.default,
        hover: core.foreground.instructive.strong,
        press: core.foreground.instructive.strong,
        disabled: core.foreground.inverse.subtle,
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
        },
        success: {
            subtle: {
                background: core.background.success.subtle,
                border: core.border.success.subtle,
                icon: core.foreground.success.default,
                text: core.foreground.success.strong,
            },
        },
        warning: {
            subtle: {
                background: core.background.warning.subtle,
                border: core.border.warning.default,
                icon: core.foreground.warning.default,
                text: core.foreground.warning.strong,
            },
        },
        critical: {
            subtle: {
                background: core.background.critical.subtle,
                border: core.border.critical.subtle,
                icon: core.foreground.critical.default,
                text: core.foreground.critical.strong,
            },
        },
    },
});

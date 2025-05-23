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
    primary: color.black_100,
    secondary: color.gray_20,
    disabled: color.gray_60,
    inverse: color.white_100,
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
                foreground: color.gray_50,
            },
        },

        secondary: {
            progressive: {
                default: {
                    border: core.border.instructive.subtle,
                    background: core.background.instructive.subtle,
                    foreground: color.blue_30,
                },
                hover: {
                    border: core.border.instructive.default,
                    background: core.background.instructive.subtle,
                    foreground: color.blue_30,
                },
                press: {
                    border: core.border.instructive.default,
                    background: core.background.instructive.subtle,
                    foreground: color.blue_30,
                },
            },
            destructive: {
                default: {
                    border: core.border.critical.default,
                    background: core.background.critical.subtle,
                    foreground: color.red_20,
                },
                hover: {
                    border: core.border.critical.strong,
                    background: core.background.critical.subtle,
                    foreground: color.red_10,
                },
                press: {
                    border: core.border.critical.strong,
                    background: core.background.critical.subtle,
                    foreground: color.red_10,
                },
            },
            neutral: {
                default: {
                    border: core.border.neutral.subtle,
                    background: core.background.neutral.subtle,
                    foreground: color.gray_10,
                },
                hover: {
                    border: core.border.neutral.strong,
                    background: core.background.neutral.subtle,
                    foreground: color.black_100,
                },
                press: {
                    border: core.border.neutral.strong,
                    background: core.background.neutral.subtle,
                    foreground: color.black_100,
                },
            },

            disabled: {
                border: core.border.disabled.strong,
                background: core.background.disabled.default,
                foreground: color.gray_50,
            },
        },

        tertiary: {
            progressive: {
                default: {
                    border: core.transparent,
                    background: core.transparent,
                    foreground: color.blue_30,
                },
                hover: {
                    border: core.border.instructive.strong,
                    background: core.transparent,
                    foreground: color.blue_10,
                },
                press: {
                    border: core.border.instructive.strong,
                    background: core.transparent,
                    foreground: color.blue_10,
                },
            },

            destructive: {
                default: {
                    border: core.transparent,
                    background: core.transparent,
                    foreground: color.red_20,
                },
                hover: {
                    border: core.border.critical.strong,
                    background: core.transparent,
                    foreground: color.red_10,
                },
                press: {
                    border: core.border.critical.strong,
                    background: core.transparent,
                    foreground: color.red_10,
                },
            },
            neutral: {
                default: {
                    border: core.transparent,
                    background: core.transparent,
                    foreground: color.gray_10,
                },
                hover: {
                    border: core.border.neutral.strong,
                    background: core.transparent,
                    foreground: color.black_100,
                },
                press: {
                    border: core.border.neutral.strong,
                    background: core.transparent,
                    foreground: color.black_100,
                },
            },

            disabled: {
                border: core.border.disabled.subtle,
                background: core.background.disabled.subtle,
                foreground: color.gray_50,
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
});

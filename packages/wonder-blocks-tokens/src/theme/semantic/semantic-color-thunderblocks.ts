import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {color} from "./internal/primitive-color-thunderblocks";

import {semanticColor as defaultSemanticColor} from "./semantic-color";

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
                    border: border.progressive,
                    background: color.blue_30,
                    foreground: text.inverse,
                },
                hover: {
                    border: color.blue_10,
                    background: color.blue_10,
                    foreground: text.inverse,
                },
                press: {
                    border: color.blue_10,
                    background: color.blue_10,
                    foreground: text.inverse,
                },
            },
            destructive: {
                default: {
                    border: border.destructive,
                    background: color.red_20,
                    foreground: text.inverse,
                },
                hover: {
                    border: color.red_05,
                    background: color.red_05,
                    foreground: text.inverse,
                },
                press: {
                    border: color.red_05,
                    background: color.red_05,
                    foreground: text.inverse,
                },
            },
            neutral: {
                default: {
                    border: border.primary,
                    background: color.gray_20,
                    foreground: text.inverse,
                },
                hover: {
                    border: color.gray_05,
                    background: color.gray_05,
                    foreground: text.inverse,
                },
                press: {
                    border: color.gray_05,
                    background: color.gray_05,
                    foreground: text.inverse,
                },
            },

            disabled: {
                border: color.gray_70,
                background: color.gray_70,
                foreground: color.gray_50,
            },
        },

        secondary: {
            progressive: {
                default: {
                    border: color.blue_60,
                    background: color.blue_80,
                    foreground: color.blue_30,
                },
                hover: {
                    border: color.blue_40,
                    background: color.blue_70,
                    foreground: color.blue_30,
                },
                press: {
                    border: color.blue_40,
                    background: color.blue_70,
                    foreground: color.blue_30,
                },
            },
            destructive: {
                default: {
                    border: color.red_30,
                    background: color.red_90,
                    foreground: color.red_20,
                },
                hover: {
                    border: color.red_10,
                    background: color.red_70,
                    foreground: color.red_10,
                },
                press: {
                    border: color.red_10,
                    background: color.red_70,
                    foreground: color.red_10,
                },
            },
            neutral: {
                default: {
                    border: color.gray_60,
                    background: color.white_100,
                    foreground: color.gray_10,
                },
                hover: {
                    border: color.gray_10,
                    background: color.white_100,
                    foreground: color.black_100,
                },
                press: {
                    border: color.gray_10,
                    background: color.white_100,
                    foreground: color.black_100,
                },
            },

            disabled: {
                border: color.gray_60,
                background: color.gray_80,
                foreground: color.gray_50,
            },
        },

        tertiary: {
            progressive: {
                default: {
                    border: "transparent",
                    background: "transparent",
                    foreground: color.blue_30,
                },
                hover: {
                    border: color.blue_10,
                    background: "transparent",
                    foreground: color.blue_10,
                },
                press: {
                    border: color.blue_10,
                    background: "transparent",
                    foreground: color.blue_10,
                },
            },

            destructive: {
                default: {
                    border: "transparent",
                    background: "transparent",
                    foreground: color.red_20,
                },
                hover: {
                    border: color.red_10,
                    background: "transparent",
                    foreground: color.red_10,
                },
                press: {
                    border: color.red_10,
                    background: "transparent",
                    foreground: color.red_10,
                },
            },
            neutral: {
                default: {
                    border: "transparent",
                    background: "transparent",
                    foreground: color.gray_10,
                },
                hover: {
                    border: color.gray_10,
                    background: "transparent",
                    foreground: color.black_100,
                },
                press: {
                    border: color.gray_10,
                    background: "transparent",
                    foreground: color.black_100,
                },
            },

            disabled: {
                border: "transparent",
                background: "transparent",
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

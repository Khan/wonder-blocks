import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import defaultSemantic from "./default";
import {color} from "../../tokens/color-thunderblocks";

export default mergeTheme(defaultSemantic, {
    action: {
        primary: {
            progressive: {
                default: {
                    border: color.blue_30,
                    background: color.blue_30,
                    foreground: color.white_100,
                },
                hover: {
                    border: color.blue_20,
                    background: color.blue_20,
                    foreground: color.white_100,
                },
                press: {
                    border: color.blue_20,
                    background: color.blue_20,
                    foreground: color.white_100,
                },
            },
            destructive: {
                default: {
                    border: color.red_30,
                    background: color.red_30,
                    foreground: color.white_100,
                },
                hover: {
                    border: color.red_20,
                    background: color.red_20,
                    foreground: color.white_100,
                },
                press: {
                    border: color.red_20,
                    background: color.red_20,
                    foreground: color.white_100,
                },
            },
            neutral: {
                default: {
                    border: color.gray_50,
                    background: color.gray_30,
                    foreground: color.white_100,
                },
                hover: {
                    border: color.gray_10,
                    background: color.gray_10,
                    foreground: color.white_100,
                },
                press: {
                    border: color.gray_10,
                    background: color.gray_10,
                    foreground: color.white_100,
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
                    border: color.blue_30,
                    background: color.blue_80,
                    foreground: color.blue_30,
                },
                hover: {
                    border: color.blue_20,
                    background: color.blue_70,
                    foreground: color.blue_20,
                },
                press: {
                    border: color.blue_20,
                    background: color.blue_70,
                    foreground: color.blue_20,
                },
            },
            destructive: {
                default: {
                    border: color.red_30,
                    background: color.red_80,
                    foreground: color.red_30,
                },
                hover: {
                    border: color.red_20,
                    background: color.red_70,
                    foreground: color.red_20,
                },
                press: {
                    border: color.red_20,
                    background: color.red_70,
                    foreground: color.red_20,
                },
            },
            neutral: {
                default: {
                    border: color.gray_20,
                    background: color.gray_80,
                    foreground: color.gray_20,
                },
                hover: {
                    border: color.gray_10,
                    background: color.gray_70,
                    foreground: color.gray_10,
                },
                press: {
                    border: color.gray_10,
                    background: color.gray_70,
                    foreground: color.gray_10,
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
                    border: color.white_01,
                    background: color.white_01,
                    foreground: color.blue_30,
                },
                hover: {
                    border: color.blue_20,
                    background: color.white_01,
                    foreground: color.blue_20,
                },
                press: {
                    border: color.blue_20,
                    background: color.white_01,
                    foreground: color.blue_20,
                },
            },

            destructive: {
                default: {
                    border: color.white_01,
                    background: color.white_01,
                    foreground: color.red_30,
                },
                hover: {
                    border: color.red_20,
                    background: color.white_01,
                    foreground: color.red_20,
                },
                press: {
                    border: color.red_20,
                    background: color.white_01,
                    foreground: color.red_20,
                },
            },
            neutral: {
                default: {
                    border: color.white_01,
                    background: color.white_01,
                    foreground: color.gray_20,
                },
                hover: {
                    border: color.gray_10,
                    background: color.white_01,
                    foreground: color.gray_10,
                },
                press: {
                    border: color.gray_10,
                    background: color.white_01,
                    foreground: color.gray_10,
                },
            },

            disabled: {
                border: color.white_01,
                background: color.white_01,
                foreground: color.gray_50,
            },
        },
    },

    status: {
        critical: {
            background: color.red_80,
            foreground: color.red_10,
        },
        warning: {
            background: color.yellow_80,
            foreground: color.yellow_10,
        },
        success: {
            background: color.green_80,
            foreground: color.green_10,
        },
        // TODO(juan): check with design
        notice: {
            background: color.blue_80,
            foreground: color.blue_10,
        },
        neutral: {
            background: color.gray_80,
            foreground: color.gray_10,
        },
    },

    surface: {
        primary: color.white_100,
        secondary: color.blue_90,
        emphasis: color.blue_70,
        inverse: color.gray_05,
        overlay: color.black_50,
    },
    text: {
        primary: color.black_100,
        secondary: color.gray_20,
        disabled: color.gray_60,
        inverse: color.white_100,
    },
    border: {
        subtle: color.gray_60,
        // TODO(juan): Figure out neutral name
        // neutral: color.gray_30,
        strong: color.gray_20,
    },

    focus: {
        outer: color.blue_30,
        inner: color.white_100,
    },
});

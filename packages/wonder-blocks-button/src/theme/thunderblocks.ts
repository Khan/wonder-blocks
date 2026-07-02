import {mergeTheme} from "@khanacademy/wonder-blocks-theming";

import {border, sizing} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

const paddingInlineSizing = {
    small: sizing.size_080,
    medium: sizing.size_160, // default
    large: sizing.size_180,
};

export default mergeTheme(defaultTheme, {
    root: {
        border: {
            width: {
                primary: {
                    default: border.width.none,
                    hover: border.width.none,
                    press: border.width.none,
                },
                tertiary: {
                    default: border.width.none,
                    hover: border.width.medium,
                    press: border.width.medium,
                },
            },
            radius: {
                default: border.radius.radius_080,
                hover: border.radius.radius_080,
                press: border.radius.radius_120,
            },
        },
        font: {
            decoration: {
                hover: "none",
                press: "none",
            },
            offset: {
                default: sizing.size_0,
            },
        },
        layout: {
            padding: {
                inline: {
                    primary: paddingInlineSizing,
                    secondary: paddingInlineSizing,
                    tertiary: paddingInlineSizing,
                },
            },
        },
        sizing: {
            height: {
                small: sizing.size_260,
                medium: sizing.size_400,
                large: sizing.size_440,
            },
            // Remove underline for tertiary buttons
            underline: {
                hover: sizing.size_0,
                press: sizing.size_0,
            },
        },
    },
    icon: {
        sizing: {
            small: sizing.size_120,
            medium: sizing.size_180,
            large: sizing.size_200,
        },
    },
});

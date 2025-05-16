import {border, sizing} from "@khanacademy/wonder-blocks-tokens";

export default {
    iconButton: {
        root: {
            border: {
                offset: {
                    primary: border.width.medium,
                    secondary: `calc(-1 * ${border.width.medium})`,
                    tertiary: `calc(-1 * ${border.width.medium})`,
                },
                width: {
                    primary: {
                        default: border.width.none,
                        hover: border.width.medium,
                        press: border.width.medium,
                    },
                    secondary: {
                        default: border.width.thin,
                        hover: border.width.medium,
                        press: border.width.medium,
                    },
                    tertiary: {
                        default: border.width.none,
                        hover: border.width.medium,
                        press: border.width.medium,
                    },
                },
                radius: {
                    default: border.radius.radius_040,
                    hover: border.radius.radius_040,
                    press: border.radius.radius_040,
                },
            },
            // Target areas for each button size.
            size: {
                xsmall: sizing.size_240,
                small: sizing.size_320,
                medium: sizing.size_400,
                large: sizing.size_480,
            },
        },
        icon: {
            // Icon sizes for each button size.
            size: {
                xsmall: sizing.size_160,
                small: sizing.size_240,
                medium: sizing.size_240,
                large: sizing.size_240,
            },
        },
    },
};

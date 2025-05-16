import {mergeTheme} from "@khanacademy/wonder-blocks-theming";

import {border, sizing} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    iconButton: {
        root: {
            border: {
                width: {
                    primary: {
                        default: border.width.none,
                        hover: border.width.none,
                        press: border.width.none,
                    },
                },
                radius: {
                    default: border.radius.radius_080,
                    hover: border.radius.radius_080,
                    press: border.radius.radius_120,
                },
            },
            size: {
                xsmall: sizing.size_240,
                small: sizing.size_260,
                medium: sizing.size_400,
                large: sizing.size_440,
            },
        },
        icon: {
            size: {
                xsmall: sizing.size_120,
                small: sizing.size_120,
                medium: sizing.size_180,
                large: sizing.size_200,
            },
        },
    },
});

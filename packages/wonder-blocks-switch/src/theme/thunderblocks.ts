import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {border, spacing} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    switch: {
        root: {
            border: {
                radius: {
                    default: border.radius.radius_080,
                    hover: border.radius.radius_080,
                    press: border.radius.radius_120,
                },
            },
            sizing: {
                height: spacing.large_24,
                width: 40, // Using hardcoded value since there's no matching token
            },
        },
        slider: {
            sizing: {
                height: 20, // Using hardcoded value since there's no matching token
                width: 20, // Using hardcoded value since there's no matching token
            },
        },
    },
});

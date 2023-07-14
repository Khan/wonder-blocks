import {mergeTheme, tokens} from "@khanacademy/wonder-blocks-theming";
import themeDefault from "./default";

export default mergeTheme(themeDefault, {
    color: {
        bg: {
            primary: tokens.color.lightBlue,
            action: tokens.color.darkBlue,
        },
        text: {
            inverse: tokens.color.gold,
        },
    },
    border: {
        radius: {
            medium: tokens.spacing.xSmall_8,
        },
    },
    spacing: {
        medium: tokens.spacing.xxxLarge_64,
    },
    size: {
        medium: tokens.spacing.xxxLarge_64,
    },
});

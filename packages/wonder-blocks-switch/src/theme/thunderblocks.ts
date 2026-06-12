import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {border, sizing} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    root: {
        border: {
            radius: {
                default: border.radius.radius_240,
            },
        },
        sizing: {
            width: sizing.size_440,
        },
    },
});

import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {border, sizing} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    root: {
        border: {
            radius: {
                default: border.radius.radius_080,
                hover: border.radius.radius_080,
            },
        },
        sizing: {
            width: sizing.size_440,
        },
    },
});

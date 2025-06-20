import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {border, sizing} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    root: {
        border: {
            radius: border.radius.radius_120,
        },
    },
    closeButton: {
        layout: {
            gap: sizing.size_120,
        },
    },
});

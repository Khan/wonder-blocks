import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    root: {
        sizing: {
            medium: sizing.size_360,
        },
    },
});

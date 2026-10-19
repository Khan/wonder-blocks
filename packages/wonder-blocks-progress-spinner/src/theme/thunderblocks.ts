import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    root: {
        sizing: {
            // Large buttons are 44px tall in Thunderblocks and render the
            // medium spinner, so it needs to be smaller than 48px to fit.
            medium: sizing.size_360,
        },
    },
});

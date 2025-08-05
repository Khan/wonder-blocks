import {mergeTheme} from "@khanacademy/wonder-blocks-theming";

import {border, font} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    root: {
        font: {
            weight: font.weight.bold,
        },
        border: {
            offset: border.width.thick,
        },
    },
});

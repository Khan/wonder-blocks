import {mergeTheme} from "@khanacademy/wonder-blocks-theming";

import {font} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    root: {
        font: {
            family: font.family.sans,
            weight: font.weight.bold,
            textDecoration: {
                offset: font.textDecoration.offset.thick,
            },
        },
    },
});

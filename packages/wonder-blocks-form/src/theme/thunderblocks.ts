import {mergeTheme} from "@khanacademy/wonder-blocks-theming";

import {border, sizing} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    field: {
        border: {
            radius: border.radius.radius_080,
        },
        sizing: {
            height: sizing.size_440,
        },
        layout: {
            paddingBlock: sizing.size_100,
            paddingInline: sizing.size_120,
        },
    },
});

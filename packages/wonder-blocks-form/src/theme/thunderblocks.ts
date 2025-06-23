import {mergeTheme} from "@khanacademy/wonder-blocks-theming";

import {border} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    field: {
        border: {
            radius: border.radius.radius_080,
        },
    },
});

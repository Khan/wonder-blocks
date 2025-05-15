import {mergeTheme} from "@khanacademy/wonder-blocks-theming";

import {border} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    border: {
        width: {
            primary: {
                default: border.width.none,
                hover: border.width.none,
                press: border.width.none,
            },
        },
    },
});

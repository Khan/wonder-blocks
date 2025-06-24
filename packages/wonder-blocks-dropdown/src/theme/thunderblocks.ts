import {mergeTheme} from "@khanacademy/wonder-blocks-theming";

import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    selectOpener: {
        border: {
            radius: {
                rest: border.radius.radius_080,
                press: border.radius.radius_120,
            },
        },
        color: {
            icon: semanticColor.core.foreground.instructive.default,
        },
        layout: {
            padding: {
                inlineStart: sizing.size_120,
                inlineEnd: sizing.size_120,
            },
        },
    },
});

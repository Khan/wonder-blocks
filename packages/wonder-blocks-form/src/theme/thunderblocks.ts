import {mergeTheme} from "@khanacademy/wonder-blocks-theming";

import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    choice: {
        inputWrapper: {
            layout: {
                padding: sizing.size_040,
                margin: `calc(${sizing.size_040} * -1)`,
            },
        },
    },
    description: {
        color: {
            foreground: semanticColor.core.foreground.neutral.strong,
        },
    },
    field: {
        border: {
            radius: border.radius.radius_080,
            width: {
                error: border.width.medium,
                // Press state has a thin border because box shadow is used to
                // apply the thicker border so the size of the field doesn't
                // change. The field still has a border so it will look like a
                // medium border width.
                press: border.width.thin,
            },
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

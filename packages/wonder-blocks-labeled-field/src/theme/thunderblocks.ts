import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {font, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    label: {
        color: {
            error: {
                foreground: semanticColor.core.foreground.critical.default,
            },
        },
    },
    errorIcon: {
        layout: {
            // Error icon is hidden in TB because it is shown in the field instead
            display: "none",
        },
    },
    error: {
        color: {
            foreground: semanticColor.core.foreground.critical.default,
        },
        font: {
            size: font.body.size.xsmall,
            weight: font.weight.bold,
            lineHeight: font.body.lineHeight.xsmall,
        },
    },
    requiredIndicator: {
        color: {
            foreground: semanticColor.core.foreground.critical.default,
        },
    },
});

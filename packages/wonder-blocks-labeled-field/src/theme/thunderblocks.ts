import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
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
    },
    requiredIndicator: {
        color: {
            foreground: semanticColor.core.foreground.critical.default,
        },
    },
});

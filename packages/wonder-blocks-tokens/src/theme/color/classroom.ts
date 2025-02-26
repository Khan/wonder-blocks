import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import defaultSemantic from "./default";
import {color} from "../../tokens/color";

export default mergeTheme(defaultSemantic, {
    surface: {
        primary: color.fadedBlue16,
    },
    text: {
        primary: color.activeBlue,
    },
    status: {
        critical: {
            background: color.fadedPurple16,
            foreground: color.purple,
        },
    },

    action: {
        // Filled buttons are meant for primary actions.
        filled: {
            progressive: {
                default: {
                    border: color.red,
                    background: color.eggplant,
                    foreground: color.white,
                },
            },
        },
    },
});

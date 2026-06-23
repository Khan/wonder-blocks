import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import thunderblocksTheme from "./thunderblocks";

export default mergeTheme(thunderblocksTheme, {
    activityIconButton: {
        label: {
            color: {
                progressive: semanticColor.core.foreground.neutral.strong,
            },
        },
    },
});

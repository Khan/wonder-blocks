import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    root: {
        border: {
            radius: border.radius.radius_120,
        },
    },
    dialog: {
        shadow: {
            default: `0 ${sizing.size_080} ${sizing.size_160} 0 ${semanticColor.core.shadow.transparent.high}`,
        },
    },
    header: {
        layout: {
            padding: {
                block: sizing.size_220,
                inline: {
                    default: sizing.size_240,
                },
            },
        },
    },
    panel: {
        layout: {
            gap: {
                default: sizing.size_240,
            },
        },
    },
    footer: {
        layout: {
            padding: {
                inline: sizing.size_160,
                block: sizing.size_160,
            },
        },
    },
    closeButton: {
        layout: {
            gapRight: sizing.size_120,
            gapTop: sizing.size_160,
        },
    },
});

import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import * as tokens from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";
import {defineTheme} from "./theme";

/**
 * The overrides for the Khanmigo theme.
 */
const theme = defineTheme(
    mergeTheme(defaultTheme, {
        semanticTokens: {
            colors: {
                bg: {
                    secondary: {
                        default: {value: tokens.color.offWhite},
                        active: {
                            action: {value: tokens.color.fadedBlue8},
                            critical: {value: tokens.color.fadedRed8},
                        },
                        focus: {value: tokens.color.offWhite},
                    },
                    icon: {
                        secondaryHover: {value: tokens.color.fadedBlue16},
                    },
                },
                border: {
                    secondary: {
                        action: {value: tokens.color.fadedBlue},
                        critical: {value: tokens.color.fadedRed},
                    },
                },
                text: {
                    icon: {
                        secondaryHover: {value: tokens.color.blue},
                    },
                },
            },
            radii: {
                default: {value: tokens.border.radius.xLarge_12 + "px"},
                small: {value: tokens.border.radius.large_6 + "px"},
                large: {value: tokens.border.radius.xLarge_12 + "px"},
            },
            borderWidths: {
                disabled: {value: tokens.border.width.hairline + "px"},
                focused: {value: tokens.border.width.hairline + "px"},
            },
            spacing: {
                margin: {
                    icon: {
                        offset: {value: -tokens.spacing.xSmall_8 + "px"},
                    },
                },
            },
            fontWeights: {
                default: {value: tokens.font.weight.regular},
            },
        },
    }),
);

export default theme;

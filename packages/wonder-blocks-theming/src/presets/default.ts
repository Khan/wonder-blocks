import * as tokens from "@khanacademy/wonder-blocks-tokens";
import {defineTheme} from "./theme";

const theme = {
    colors: {
        bg: {
            /**
             * Color
             */
            // color="default"
            action: {
                default: {value: tokens.color.blue},
                active: {value: tokens.color.activeBlue},
                inverse: {value: tokens.color.fadedBlue},
            },
            // color="destructive"
            critical: {
                default: {value: tokens.color.red},
                active: {value: tokens.color.activeRed},
                inverse: {value: tokens.color.fadedRed},
            },

            /**
             * Kind
             */
            primary: {
                default: {value: tokens.color.white},
                disabled: {value: tokens.color.offBlack32},
                inverse: {value: tokens.color.darkBlue},
            },
            secondary: {
                default: {value: "none"},
                inverse: {value: "none"},
                focus: {value: tokens.color.white},
                active: {
                    action: {value: tokens.color.fadedBlue},
                    critical: {value: tokens.color.fadedRed},
                },
            },
            tertiary: {
                hover: {value: tokens.color.white},
            },

            /**
             * Icons
             */
            icon: {
                secondaryHover: {value: "transparent"},
            },
        },
        text: {
            /**
             * Default
             */
            // kind="secondary, tertiary", disabled=true, light=false
            disabled: {value: tokens.color.offBlack32},
            // kind="primary", light=false | kind="secondary, tertiary", light=true
            inverse: {value: tokens.color.white},

            /**
             * Kind
             */
            primary: {
                disabled: {value: tokens.color.white64},
            },
            secondary: {
                inverse: {value: tokens.color.white50},
            },

            /**
             * Icons
             */
            icon: {
                secondaryHover: {value: tokens.color.blue},
            },
        },
        border: {
            /**
             * Default
             */
            // kind="secondary", light=false | kind="tertiary", light=false
            disabled: {value: tokens.color.offBlack32},
            /**
             * Kind
             */
            primary: {
                inverse: {value: tokens.color.white},
            },
            secondary: {
                action: {value: tokens.color.offBlack50},
                critical: {value: tokens.color.offBlack50},
                inverse: {value: tokens.color.white50},
            },
            tertiary: {
                inverse: {value: tokens.color.white},
            },
        },
    },
    borderWidths: {
        // secondary (resting)
        secondary: {value: tokens.border.width.hairline + "px"},
        // secondary (resting, focus, active), tertiary (focus)
        focused: {value: tokens.border.width.thin + "px"},
        // secondary (disabled)
        disabled: {value: tokens.border.width.thin + "px"},
    },
    radii: {
        // default
        default: {value: tokens.border.radius.medium_4 + "px"},
        // tertiary
        tertiary: {value: tokens.border.radius.xSmall_2 + "px"},
        // small button
        small: {value: tokens.border.radius.medium_4 + "px"},
        // large button
        large: {value: tokens.border.radius.large_6 + "px"},

        /**
         * Icons
         */
        icon: {value: tokens.border.radius.full},
    },
    sizes: {
        height: {
            tertiaryHover: {value: tokens.spacing.xxxxSmall_2 + "px"},
            small: {value: tokens.spacing.xLarge_32 + "px"},
            // NOTE: These tokens are specific to this component.
            medium: {value: "40px"},
            large: {value: "56px"},
        },
    },
    spacing: {
        margin: {
            icon: {
                offset: {value: `-${tokens.spacing.xxxxSmall_2}px`},
            },
        },
        padding: {
            xsmall: {value: tokens.spacing.xxxxSmall_2 + "px"},
            small: {value: tokens.spacing.xxSmall_6 + "px"},
            medium: {value: tokens.spacing.small_12 + "px"},
            large: {value: tokens.spacing.medium_16 + "px"},
            xLarge: {value: tokens.spacing.xLarge_32 + "px"},
        },
    },
    fontSizes: {
        // NOTE: This token is specific to this button size.
        large: {value: "18px"},
    },
    lineHeights: {
        large: {value: tokens.font.lineHeight.medium + "px"},
    },
    fontWeights: {
        default: {value: tokens.font.weight.regular.toString()},
    },
};

export default defineTheme({
    semanticTokens: theme,
});

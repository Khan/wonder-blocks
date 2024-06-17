import {defineThemeContract} from "@pandacss/dev";

export const defineTheme = defineThemeContract({
    // Follows the same "Token types" structure defined in Panda
    // @see https://panda-css.com/docs/theming/tokens#token-types
    semanticTokens: {
        colors: {
            // @see https://panda-css.com/docs/theming/tokens#token-nesting
            bg: {
                // color="default"
                action: {
                    default: {value: ""},
                    active: {value: ""},
                    inverse: {value: ""},
                },
                // color="destructive"
                critical: {
                    default: {value: ""},
                    active: {value: ""},
                    inverse: {value: ""},
                },
                // kind="primary"
                primary: {
                    default: {value: ""},
                    disabled: {value: ""},
                    inverse: {value: ""},
                },
                // kind="secondary"
                secondary: {
                    default: {value: ""},
                    inverse: {value: ""},
                    focus: {value: ""},
                    active: {
                        action: {value: ""},
                        critical: {value: ""},
                    },
                },
                // kind="tertiary"
                tertiary: {
                    hover: {value: ""},
                },
                // icon
                icon: {
                    secondaryHover: {value: ""},
                },
            },
            text: {
                // kind="secondary, tertiary", disabled=true, light=false
                disabled: {value: ""},
                // kind="primary", light=false | kind="secondary, tertiary", light=true
                inverse: {value: ""},
                // kind
                primary: {
                    disabled: {value: ""},
                },
                secondary: {
                    inverse: {value: ""},
                },
                // icons
                icon: {
                    secondaryHover: {value: ""},
                },
            },
            border: {
                // kind="secondary", light=false | kind="tertiary", light=false
                disabled: {value: ""},
                // kind
                primary: {
                    inverse: {value: ""},
                },
                secondary: {
                    action: {value: ""},
                    critical: {value: ""},
                    inverse: {value: ""},
                },
                tertiary: {
                    inverse: {value: ""},
                },
            },
        },

        borderWidths: {
            secondary: {value: ""},
            focused: {value: ""},
            disabled: {value: ""},
        },
        radii: {
            default: {value: ""},
            tertiary: {value: ""},
            small: {value: ""},
            large: {value: ""},
            icon: {value: ""},
        },

        sizes: {
            height: {
                tertiaryHover: {value: ""},
                small: {value: ""},
                medium: {value: ""},
                large: {value: ""},
            },
        },
        spacing: {
            margin: {
                icon: {
                    offset: {value: ""},
                },
            },

            padding: {
                xsmall: {value: ""},
                small: {value: ""},
                medium: {value: ""},
                large: {value: ""},
                xLarge: {value: ""},
            },
        },

        fontSizes: {
            large: {value: ""},
        },
        lineHeights: {
            large: {value: ""},
        },
        fontWeights: {
            default: {value: ""},
        },
    },
});

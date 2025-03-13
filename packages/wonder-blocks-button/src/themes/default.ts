import * as tokens from "@khanacademy/wonder-blocks-tokens";

const {semanticColor} = tokens;

// The underline-offset is the distance between the text baseline and the
// bottom of the underline. This is necessary to prevent the underline from
// breaking with descenders.
const textUnderlineOffset = tokens.spacing.xxxSmall_4;

const focusOutline = {
    border: semanticColor.focus.outer,
};

const focusOutlineLight = {
    border: semanticColor.border.inverse,
};

const theme = {
    color: {
        /**
         * Primary
         */
        primary: {
            // kind=primary / color=default / light=false
            progressive: {
                ...semanticColor.action.primary.progressive,
                focus: focusOutline,
                disabled: semanticColor.action.primary.disabled,
            },

            // kind=primary / color=default / light=true
            // NOTE: These colors will be removed from WB as soon as we remove the
            // light variant.
            progressiveLight: {
                ...semanticColor.action.secondary.progressive,
                default: {
                    ...semanticColor.action.secondary.progressive.default,
                    background: semanticColor.surface.primary,
                },
                focus: focusOutlineLight,
                hover: {
                    ...semanticColor.action.secondary.progressive.hover,
                    border: semanticColor.border.inverse,
                },
                press: {
                    ...semanticColor.action.secondary.progressive.press,
                    border: semanticColor.action.secondary.progressive.press
                        .background,
                },
                disabled: {
                    background:
                        semanticColor.action.secondary.progressive.press
                            .background,
                    foreground:
                        semanticColor.action.secondary.progressive.default
                            .foreground,
                },
            },
            // kind=primary / color=destructive / light=false
            destructive: {
                ...semanticColor.action.primary.destructive,
                focus: focusOutline,
                disabled: semanticColor.action.primary.disabled,
            },
            // kind=primary / color=destructive / light=true
            // NOTE: These colors will be removed from WB as soon as we remove the
            // light variant.
            destructiveLight: {
                ...semanticColor.action.secondary.destructive,
                default: {
                    ...semanticColor.action.secondary.destructive.default,
                    background: semanticColor.surface.primary,
                },
                focus: focusOutlineLight,
                hover: {
                    ...semanticColor.action.secondary.progressive.hover,
                    border: semanticColor.border.inverse,
                },
                press: {
                    ...semanticColor.action.secondary.destructive.press,
                    border: semanticColor.action.secondary.destructive.press
                        .background,
                },
                disabled: {
                    background:
                        semanticColor.action.secondary.destructive.press
                            .background,
                    foreground:
                        semanticColor.action.secondary.destructive.default
                            .foreground,
                },
            },
        },

        /**
         * Secondary
         *
         * Outlined buttons
         */
        secondary: {
            // kind=secondary / color=default / light=false
            progressive: {
                ...semanticColor.action.secondary.progressive,
                focus: focusOutline,
                hover: {
                    ...semanticColor.action.secondary.progressive.hover,
                    icon: "transparent",
                },
                disabled: {
                    // NOTE: This is a special case for the secondary button
                    // TODO(WB-1895): Revisit disabled styles.
                    border: semanticColor.action.primary.disabled.border,
                    foreground:
                        semanticColor.action.secondary.disabled.foreground,
                },
            },
            // kind=secondary / color=default / light=true
            // NOTE: These colors will be removed from WB as soon as we remove the
            // light variant.
            progressiveLight: {
                default: {
                    border: tokens.color.white64,
                    background: "transparent",
                    foreground: semanticColor.text.inverse,
                },
                focus: focusOutlineLight,
                hover: {
                    border: semanticColor.border.inverse,
                    background: "transparent",
                    foreground: semanticColor.text.inverse,
                    // NOTE: Not used, but included for type safety.
                    icon: "transparent",
                },
                press: {
                    border: tokens.color.fadedBlue,
                    background:
                        semanticColor.action.primary.progressive.press
                            .background,
                    foreground: semanticColor.text.inverse,
                },
                disabled: {
                    border: semanticColor.action.secondary.progressive.press
                        .background,
                    background:
                        semanticColor.action.secondary.progressive.press
                            .background,
                    // NOTE: Using primitive token, but this will go away once
                    // we remove the light variant.
                    foreground: tokens.color.white50,
                },
            },
            // kind=secondary / color=destructive / light=false
            destructive: {
                ...semanticColor.action.secondary.destructive,
                focus: focusOutline,
                hover: {
                    ...semanticColor.action.secondary.destructive.hover,
                    icon: "transparent",
                },
                disabled: {
                    // NOTE: This is a special case for the secondary button
                    // TODO(WB-1895): Revisit disabled styles.
                    border: semanticColor.action.primary.disabled.border,
                    foreground:
                        semanticColor.action.secondary.disabled.foreground,
                },
            },
            // kind=secondary / color=destructive / light=true
            // NOTE: These colors will be removed from WB as soon as we remove the
            // light variant.
            destructiveLight: {
                default: {
                    border: tokens.color.white64,
                    background: "transparent",
                    foreground: semanticColor.text.inverse,
                },
                focus: focusOutlineLight,
                hover: {
                    border: semanticColor.border.inverse,
                    background: "transparent",
                    foreground: semanticColor.text.inverse,
                    // NOTE: Not used, but included for type safety.
                    icon: "transparent",
                },
                press: {
                    border: tokens.color.fadedRed,
                    background:
                        semanticColor.action.primary.destructive.press
                            .background,
                    foreground: semanticColor.text.inverse,
                },
                disabled: {
                    border: semanticColor.action.secondary.destructive.press
                        .background,
                    background:
                        semanticColor.action.secondary.destructive.press
                            .background,
                    foreground: tokens.color.white50,
                },
            },
        },
        /**
         * Tertiary
         *
         * Text buttons
         */
        tertiary: {
            // kind=tertiary / color=default / light=false
            progressive: {
                ...semanticColor.action.tertiary.progressive,
                focus: focusOutline,
            },
            // kind=tertiary / color=default / light=true
            // NOTE: These colors will be removed from WB as soon as we remove the
            // light variant.
            progressiveLight: {
                default: {
                    border: tokens.color.white64,
                    background: "transparent",
                    foreground: semanticColor.text.inverse,
                },
                focus: focusOutlineLight,
                hover: {
                    border: semanticColor.border.inverse,
                    background: "transparent",
                    foreground: semanticColor.text.inverse,
                },
                press: {
                    border: semanticColor.border.inverse,
                    foreground: tokens.color.fadedBlue,
                },
                disabled: {
                    foreground: tokens.color.white50,
                },
            },
            // kind=tertiary / color=destructive / light=false
            destructive: {
                ...semanticColor.action.tertiary.destructive,
                focus: focusOutline,
            },
            // kind=tertiary / color=destructive / light=true
            // NOTE: These colors will be removed from WB as soon as we remove the
            // light variant.
            destructiveLight: {
                default: {
                    border: tokens.color.white64,
                    background: "transparent",
                    foreground: semanticColor.text.inverse,
                },
                focus: focusOutlineLight,
                hover: {
                    border: semanticColor.border.inverse,
                    background: "transparent",
                    foreground: semanticColor.text.inverse,
                },
                press: {
                    border: semanticColor.border.inverse,
                    foreground: tokens.color.fadedRed,
                },
                disabled: {
                    foreground: tokens.color.white50,
                },
            },
        },
    },
    border: {
        width: {
            // secondary (resting)
            secondary: tokens.border.width.hairline,
            // primary (focus), secondary (focus, active), tertiary (focus)
            focused: tokens.border.width.thin,
            // secondary (disabled)
            disabled: tokens.border.width.thin,
        },
        offset: {
            primary: tokens.spacing.xxxxSmall_2,
            secondary: -tokens.spacing.xxxxSmall_2,
        },
        radius: {
            // default
            default: tokens.border.radius.medium_4,
            // small button
            small: tokens.border.radius.medium_4,
            // large button
            large: tokens.border.radius.large_6,

            /**
             * Icons
             */
            icon: tokens.border.radius.full,
        },
    },
    size: {
        height: {
            small: tokens.spacing.xLarge_32,
            // NOTE: These height tokens are specific to this component.
            medium: 40,
            large: 56,
        },
        underline: {
            hover: tokens.spacing.xxxxSmall_2,
            active: 1,
        },
    },
    margin: {
        icon: {
            offset: -tokens.spacing.xxxxSmall_2,
        },
    },
    padding: {
        xsmall: tokens.spacing.xxxxSmall_2,
        small: tokens.spacing.xxSmall_6,
        medium: tokens.spacing.small_12,
        large: tokens.spacing.medium_16,
        xLarge: tokens.spacing.xLarge_32,
    },
    font: {
        size: {
            // NOTE: This token is specific to this button size.
            large: 18,
        },
        lineHeight: {
            small: tokens.font.lineHeight.small + textUnderlineOffset,
            default: tokens.font.lineHeight.medium + textUnderlineOffset,
            large: tokens.font.lineHeight.medium + 2 + textUnderlineOffset,
        },
        weight: {
            default: tokens.font.weight.bold,
        },
        offset: {
            default: textUnderlineOffset,
        },
    },
};

export default theme;

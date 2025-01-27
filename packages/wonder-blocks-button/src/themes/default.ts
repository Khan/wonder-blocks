import * as tokens from "@khanacademy/wonder-blocks-tokens";

const {semanticColor} = tokens;

// The underline-offset is the distance between the text baseline and the
// bottom of the underline. This is necessary to prevent the underline from
// breaking with descenders.
const textUnderlineOffset = tokens.spacing.xxxSmall_4;

const theme = {
    color: {
        /**
         * Primary
         */
        filled: {
            // kind=primary / color=default / light=false
            progressive: {
                // filled
                ...semanticColor.action.filled.progressive,
                disabled: {
                    border: semanticColor.action.disabled.default,
                    background: semanticColor.action.disabled.default,
                    foreground: semanticColor.action.disabled.secondary,
                },
            },

            // kind=primary / color=default / light=true
            // NOTE: These colors will be removed from WB as soon as we remove the
            // light variant.
            progressiveLight: {
                ...semanticColor.action.outlined.progressive,
                press: {
                    ...semanticColor.action.outlined.progressive.press,
                    border: semanticColor.action.outlined.progressive.press
                        .background,
                },
                disabled: {
                    border: semanticColor.action.outlined.progressive.press
                        .background,
                    background:
                        semanticColor.action.outlined.progressive.press
                            .background,
                    foreground:
                        semanticColor.action.outlined.progressive.default
                            .foreground,
                },
            },
            // kind=primary / color=destructive / light=false
            destructive: {
                ...semanticColor.action.filled.destructive,
                disabled: {
                    border: semanticColor.action.disabled.default,
                    background: semanticColor.action.disabled.default,
                    foreground: semanticColor.action.disabled.secondary,
                },
            },
            // kind=primary / color=destructive / light=true
            // NOTE: These colors will be removed from WB as soon as we remove the
            // light variant.
            destructiveLight: {
                ...semanticColor.action.outlined.destructive,
                press: {
                    ...semanticColor.action.outlined.destructive.press,
                    border: semanticColor.action.outlined.destructive.press
                        .background,
                },
                disabled: {
                    border: semanticColor.action.outlined.destructive.press
                        .background,
                    background:
                        semanticColor.action.outlined.destructive.press
                            .background,
                    foreground:
                        semanticColor.action.outlined.destructive.default
                            .foreground,
                },
            },
        },

        /**
         * Secondary
         *
         * Outlined buttons
         */
        outlined: {
            // kind=secondary / color=default / light=false
            progressive: {
                ...semanticColor.action.outlined.progressive,
                default: {
                    ...semanticColor.action.outlined.progressive.default,
                    // NOTE: This is a special case for the secondary button
                    background: "transparent",
                },
                hover: {
                    ...semanticColor.action.outlined.progressive.hover,
                    // NOTE: This is a special case for the secondary button
                    background: "transparent",
                    icon: "transparent",
                },
                disabled: {
                    border: semanticColor.action.disabled.default,
                    background:
                        semanticColor.action.outlined.progressive.press
                            .background,
                    foreground: semanticColor.text.disabled,
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
                hover: {
                    border: semanticColor.border.inverse,
                    background: "transparent",
                    foreground: semanticColor.text.inverse,
                    // NOTE: Not used, but included for type safety.
                    icon: "transparent",
                },
                press: {
                    border: semanticColor.border.inverse,
                    background:
                        semanticColor.action.filled.progressive.press
                            .background,
                    foreground: semanticColor.text.inverse,
                },
                disabled: {
                    border: semanticColor.action.outlined.progressive.press
                        .background,
                    background:
                        semanticColor.action.outlined.progressive.press
                            .background,
                    // NOTE: Using primitive token, but this will go away once
                    // we remove the light variant.
                    foreground: tokens.color.white50,
                },
            },
            // kind=secondary / color=destructive / light=false
            destructive: {
                ...semanticColor.action.outlined.destructive,
                hover: {
                    ...semanticColor.action.outlined.destructive.hover,
                    // NOTE: This is a special case for the secondary button
                    background: "transparent",
                    icon: "transparent",
                },
                disabled: {
                    border: semanticColor.action.disabled.default,
                    background:
                        semanticColor.action.outlined.destructive.press
                            .background,
                    foreground: semanticColor.text.disabled,
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
                hover: {
                    border: semanticColor.border.inverse,
                    background: "transparent",
                    foreground: semanticColor.text.inverse,
                    // NOTE: Not used, but included for type safety.
                    icon: "transparent",
                },
                press: {
                    border: semanticColor.border.inverse,
                    background:
                        semanticColor.action.filled.destructive.press
                            .background,
                    foreground: semanticColor.text.inverse,
                },
                disabled: {
                    border: semanticColor.action.outlined.destructive.press
                        .background,
                    background:
                        semanticColor.action.outlined.destructive.press
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
        text: {
            // kind=tertiary / color=default / light=false
            progressive: {
                default: {
                    background: "transparent",
                    foreground:
                        semanticColor.action.outlined.progressive.default
                            .foreground,
                },
                hover: {
                    border: semanticColor.action.outlined.progressive.hover
                        .border,
                },
                press: {
                    foreground:
                        semanticColor.action.outlined.progressive.press
                            .foreground,
                },
                disabled: {
                    border: semanticColor.action.disabled.default,
                    foreground: semanticColor.text.disabled,
                },
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
                hover: {
                    border: semanticColor.border.inverse,
                    background: "transparent",
                    foreground: semanticColor.text.inverse,
                },
                press: {
                    border: semanticColor.border.inverse,
                    foreground: semanticColor.text.inverse,
                },
                disabled: {
                    border: semanticColor.action.outlined.progressive.press
                        .background,
                    foreground: tokens.color.white50,
                },
            },
            // kind=tertiary / color=destructive / light=false
            destructive: {
                default: {
                    background: "transparent",
                    foreground:
                        semanticColor.action.outlined.destructive.default
                            .foreground,
                },
                hover: {
                    border: semanticColor.action.outlined.destructive.hover
                        .border,
                },
                press: {
                    foreground:
                        semanticColor.action.outlined.destructive.press
                            .foreground,
                },
                disabled: {
                    border: semanticColor.action.disabled.default,
                    foreground: semanticColor.text.disabled,
                },
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
                hover: {
                    border: semanticColor.border.inverse,
                    background: "transparent",
                    foreground: semanticColor.text.inverse,
                },
                press: {
                    border: semanticColor.border.inverse,
                    foreground: semanticColor.text.inverse,
                },
                disabled: {
                    border: semanticColor.action.outlined.destructive.press
                        .background,
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

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
        // kind=primary / color=default / light=false
        progressive: {
            // filled
            ...semanticColor.action.progressive,
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
            ...semanticColor.action.progressiveInverse,
            press: {
                ...semanticColor.action.progressiveInverse.press,
                border: semanticColor.action.progressiveInverse.press
                    .background,
            },
            disabled: {
                border: semanticColor.action.progressiveInverse.press
                    .background,
                background:
                    semanticColor.action.progressiveInverse.press.background,
                foreground:
                    semanticColor.action.progressiveInverse.default.foreground,
            },
        },
        // kind=primary / color=destructive / light=false
        destructive: {
            ...semanticColor.action.destructive,
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
            ...semanticColor.action.destructiveInverse,
            press: {
                ...semanticColor.action.destructiveInverse.press,
                border: semanticColor.action.destructiveInverse.press
                    .background,
            },
            disabled: {
                border: semanticColor.action.destructiveInverse.press
                    .background,
                background:
                    semanticColor.action.destructiveInverse.press.background,
                foreground:
                    semanticColor.action.destructiveInverse.default.foreground,
            },
        },
        /**
         * Secondary
         *
         * Outlined buttons
         */
        // kind=secondary / color=default / light=false
        progressiveSecondary: {
            ...semanticColor.action.progressiveInverse,
            default: {
                ...semanticColor.action.progressiveInverse.default,
                // NOTE: This is a special case for the secondary button
                background: "transparent",
            },
            hover: {
                ...semanticColor.action.progressiveInverse.hover,
                // NOTE: This is a special case for the secondary button
                background: "transparent",
                icon: "transparent",
            },
            disabled: {
                border: semanticColor.action.disabled.default,
                background:
                    semanticColor.action.progressiveInverse.press.background,
                foreground: semanticColor.text.disabled,
            },
        },
        // kind=secondary / color=default / light=true
        // NOTE: These colors will be removed from WB as soon as we remove the
        // light variant.
        progressiveSecondaryLight: {
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
                background: semanticColor.action.progressive.press.background,
                foreground: semanticColor.text.inverse,
            },
            disabled: {
                border: semanticColor.action.progressiveInverse.press
                    .background,
                background:
                    semanticColor.action.progressiveInverse.press.background,
                foreground: tokens.color.white50,
            },
        },
        // kind=secondary / color=destructive / light=false
        destructiveSecondary: {
            ...semanticColor.action.destructiveInverse,
            hover: {
                ...semanticColor.action.destructiveInverse.hover,
                // NOTE: This is a special case for the secondary button
                background: "transparent",
                icon: "transparent",
            },
            disabled: {
                border: semanticColor.action.disabled.default,
                background:
                    semanticColor.action.destructiveInverse.press.background,
                foreground: semanticColor.text.disabled,
            },
        },
        // kind=secondary / color=destructive / light=true
        // NOTE: These colors will be removed from WB as soon as we remove the
        // light variant.
        destructiveSecondaryLight: {
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
                background: semanticColor.action.progressive.press.background,
                foreground: semanticColor.text.inverse,
            },
            disabled: {
                border: semanticColor.action.destructiveInverse.press
                    .background,
                background:
                    semanticColor.action.destructiveInverse.press.background,
                foreground: tokens.color.white50,
            },
        },
        /**
         * Tertiary
         *
         * Text buttons
         */
        // kind=tertiary / color=default / light=false
        progressiveTertiary: {
            default: {
                background: "transparent",
                foreground:
                    semanticColor.action.progressiveInverse.default.foreground,
            },
            hover: {
                border: semanticColor.action.progressiveInverse.hover.border,
            },
            press: {
                foreground:
                    semanticColor.action.progressiveInverse.press.foreground,
            },
            disabled: {
                border: semanticColor.action.disabled.default,
                foreground: semanticColor.text.disabled,
            },
        },
        // kind=tertiary / color=default / light=true
        // NOTE: These colors will be removed from WB as soon as we remove the
        // light variant.
        progressiveTertiaryLight: {
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
                border: semanticColor.action.progressiveInverse.press
                    .background,
                foreground: tokens.color.white50,
            },
        },
        // kind=tertiary / color=destructive / light=false
        destructiveTertiary: {
            default: {
                background: "transparent",
                foreground:
                    semanticColor.action.destructiveInverse.default.foreground,
            },
            hover: {
                border: semanticColor.action.destructiveInverse.hover.border,
            },
            press: {
                foreground:
                    semanticColor.action.destructiveInverse.press.foreground,
            },
            disabled: {
                border: semanticColor.action.disabled.default,
                foreground: semanticColor.text.disabled,
            },
        },
        // kind=tertiary / color=destructive / light=true
        // NOTE: These colors will be removed from WB as soon as we remove the
        // light variant.
        destructiveTertiaryLight: {
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
                border: semanticColor.action.destructiveInverse.press
                    .background,
                foreground: tokens.color.white50,
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

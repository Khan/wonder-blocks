import * as tokens from "@khanacademy/wonder-blocks-tokens";

const theme = {
    color: {
        bg: {
            /**
             * Color
             */
            // color="default"
            action: {
                default: tokens.semanticColor.action.primary.default,
                active: tokens.semanticColor.action.primary.active,
                inverse: tokens.color.fadedBlue,
            },
            // color="destructive"
            critical: {
                default: tokens.semanticColor.action.destructive.default,
                active: tokens.semanticColor.action.destructive.active,
                inverse: tokens.color.fadedRed,
            },

            /**
             * Kind
             */
            primary: {
                default: tokens.semanticColor.surface.primary,
                disabled: tokens.semanticColor.action.disabled.default,
                // used in boxShadow
                inverse: tokens.color.darkBlue,
            },

            secondary: {
                default: "none",
                inverse: "none",
                focus: tokens.semanticColor.surface.primary,
                active: {
                    action: tokens.color.fadedBlue,
                    critical: tokens.color.fadedRed,
                },
            },

            tertiary: {
                hover: tokens.semanticColor.surface.primary,
            },

            /**
             * Icons
             */
            icon: {
                secondaryHover: "transparent",
            },
        },
        text: {
            /**
             * Default
             */
            // kind="secondary, tertiary", disabled=true, light=false
            disabled: tokens.semanticColor.text.disabled,
            // kind="primary", light=false | kind="secondary, tertiary", light=true
            inverse: tokens.semanticColor.text.inverse,

            /**
             * Kind
             */
            primary: {
                disabled: tokens.color.white64,
            },
            secondary: {
                inverse: tokens.color.white50,
            },

            /**
             * Icons
             */
            icon: {
                // Allows the icon to be visible on hover in both light and dark
                // backgrounds.
                secondaryHover: "inherit",
            },
        },
        border: {
            /**
             * Default
             */
            // kind="secondary", light=false | kind="tertiary", light=false
            disabled: tokens.semanticColor.action.disabled.default,
            /**
             * Kind
             */
            primary: {
                inverse: tokens.semanticColor.border.inverse,
            },
            secondary: {
                action: tokens.color.offBlack50,
                critical: tokens.color.offBlack50,
                inverse: tokens.color.white50,
            },
            tertiary: {
                inverse: tokens.semanticColor.border.inverse,
            },
        },
    },
    border: {
        width: {
            // secondary (resting)
            secondary: tokens.border.width.hairline,
            // secondary (resting, focus, active), tertiary (focus)
            focused: tokens.border.width.thin,
            // secondary (disabled)
            disabled: tokens.border.width.thin,
        },
        radius: {
            // default
            default: tokens.border.radius.medium_4,
            // tertiary
            tertiary: tokens.border.radius.xSmall_2,
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
            tertiaryHover: tokens.spacing.xxxxSmall_2,
            small: tokens.spacing.xLarge_32,
            // NOTE: These height tokens are specific to this component.
            medium: 40,
            large: 56,
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
            large: tokens.font.lineHeight.medium,
        },
        weight: {
            default: tokens.font.weight.bold,
        },
    },
};

export default theme;

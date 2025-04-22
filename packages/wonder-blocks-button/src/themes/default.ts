import * as tokens from "@khanacademy/wonder-blocks-tokens";

const {semanticColor} = tokens;

// The underline-offset is the distance between the text baseline and the
// bottom of the underline. This is necessary to prevent the underline from
// breaking with descenders.
const textUnderlineOffset = tokens.sizing.size_040;

const focusOutline = {
    border: semanticColor.focus.outer,
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
            },

            // kind=primary / color=destructive / light=false
            destructive: {
                ...semanticColor.action.primary.destructive,
                focus: focusOutline,
            },
            disabled: semanticColor.action.primary.disabled,
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
                    // NOTE: This is a special case for the secondary button
                    icon: "transparent",
                },
            },

            // kind=secondary / color=destructive / light=false
            destructive: {
                ...semanticColor.action.secondary.destructive,
                focus: focusOutline,
                hover: {
                    ...semanticColor.action.secondary.destructive.hover,
                    // NOTE: This is a special case for the secondary button
                    icon: "transparent",
                },
            },

            disabled: {
                ...semanticColor.action.secondary.disabled,
                // NOTE: This is a special case for the secondary button
                // TODO(WB-1895): Revisit disabled styles.
                border: semanticColor.action.primary.disabled.border,
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

            // kind=tertiary / color=destructive / light=false
            destructive: {
                ...semanticColor.action.tertiary.destructive,
                focus: focusOutline,
            },

            disabled: semanticColor.action.tertiary.disabled,
        },
    },
    border: {
        width: {
            // secondary (resting)
            secondary: tokens.border.width.thin,
            // primary (focus), secondary (focus, active), tertiary (focus)
            focused: tokens.border.width.medium,
            // secondary (disabled)
            disabled: tokens.border.width.medium,
        },
        offset: {
            primary: tokens.spacing.xxxxSmall_2,
            secondary: -tokens.spacing.xxxxSmall_2,
        },
        radius: {
            // default
            default: tokens.border.radius.radius_040,
            // small button
            small: tokens.border.radius.radius_040,
            // large button
            large: tokens.border.radius.radius_040,

            /**
             * Icons
             */
            icon: tokens.border.radius.radius_full,
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
            large: "1.8rem",
        },
        lineHeight: {
            small: tokens.font.lineHeight.xMedium,
            default: tokens.font.lineHeight.large,
            // NOTE: this token is specific to this button size.
            large: "2.42rem",
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

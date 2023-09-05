import {tokens} from "@khanacademy/wonder-blocks-theming";

const theme = {
    color: {
        bg: {
            /**
             * Color
             */
            // color="default"
            action: tokens.color.blue,
            actionActive: tokens.color.activeBlue,
            actionInverse: tokens.color.fadedBlue,
            // color="destructive"
            critical: tokens.color.red,
            criticalActive: tokens.color.activeRed,
            criticalInverse: tokens.color.fadedRed,

            /**
             * Kind
             */
            // kind="primary", light=true | kind="secondary", light=false
            primary: tokens.color.white,
            // kind="primary", disabled=true
            primaryDisabled: tokens.color.offBlack32,
            // SHADOW kind="primary", state="focus, active"
            primaryInverse: tokens.color.darkBlue,

            // kind="secondary", light=false
            secondary: "none",
            // kind="secondary", light=true
            secondaryInverse: "none",
            secondaryFocus: tokens.color.white,
            // kind="secondary", light=false, active=true
            secondaryActive: tokens.color.fadedBlue,
        },
        text: {
            /**
             * Default
             */
            // kind="secondary, tertiary", disabled=true, light=false
            disabled: tokens.color.offBlack32,
            // kind="primary", light=false | kind="secondary, tertiary", light=true
            inverse: tokens.color.white,
            /**
             * Kind
             */
            // kind="primary", disabled=true
            primaryDisabled: tokens.color.white64,
            // kind="secondary", disabled=true, light=true
            secondaryInverse: tokens.color.white50,
        },
        border: {
            /**
             * Default
             */
            // kind="secondary", light=false | kind="tertiary", light=false
            disabled: tokens.color.offBlack32,
            /**
             * Kind
             */
            primaryInverse: tokens.color.white,
            secondaryAction: tokens.color.offBlack50,
            secondaryCritical: tokens.color.offBlack50,
            secondaryInverse: tokens.color.white50,
            // kind="tertiary", state="hover", light=true
            tertiaryInverse: tokens.color.white,
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
            default: tokens.border.radius.small_3,
            // tertiary
            tertiary: tokens.border.radius.xSmall_2,
            // small button
            small: tokens.border.radius.small_3,
            // large button
            large: tokens.border.radius.large_6,
        },
    },
    size: {
        width: {
            medium: tokens.spacing.large_24,
            large: tokens.spacing.xLarge_32,
        },
        height: {
            tertiaryHover: tokens.spacing.xxxxSmall_2,
            small: tokens.spacing.xLarge_32,
            // NOTE: These height tokens are specific to this component.
            medium: 40,
            large: 56,
        },
    },
    padding: {
        small: tokens.spacing.xSmall_8,
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
    },
};

export default theme;

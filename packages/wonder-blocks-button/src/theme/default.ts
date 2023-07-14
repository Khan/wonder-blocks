import {tokens} from "@khanacademy/wonder-blocks-theming";

export default {
    color: {
        bg: {
            // color="destructive"
            critical: tokens.color.red,
            criticalActive: tokens.color.activeRed,
            criticalInverse: tokens.color.fadedRed,
            // color="default"
            action: tokens.color.blue,
            actionActive: tokens.color.activeBlue,
            actionInverse: tokens.color.fadedBlue,
            // kind="primary", light=true | kind="secondary", light=false
            primary: tokens.color.white,
            // disabled=true
            disabled: tokens.color.offBlack32,
            // SHADOW kind="primary", state="focus, active"
            inverse: tokens.color.darkBlue,
        },
        text: {
            // kind="primary", disabled=true
            primaryDisabled: tokens.color.white64,
            // kind="primary, secondary", light=false | kind="tertiary", light=true
            inverse: tokens.color.white,
            // kind="secondary", disabled=true, light=true
            secondaryInverse: tokens.color.white50,
            // kind="secondary, tertiary", disabled=true, light=false
            disabled: tokens.color.offBlack32,
        },
        border: {
            primaryInverse: tokens.color.white,
            secondary: tokens.color.offBlack50,
            secondaryInverse: tokens.color.white50,
            disabled: tokens.color.offBlack32,
        },
    },
    spacing: {
        // icon
        small: tokens.spacing.xSmall_8,
        // default padding
        medium: tokens.spacing.medium_16,
        // large padding
        large: tokens.spacing.xLarge_32,
    },
    border: {
        radius: {
            // tertiary
            small: tokens.spacing.xxxxSmall_2,
            // default
            medium: tokens.spacing.xxxSmall_4,
            // large
            large: tokens.spacing.xxSmall_6,
        },
        width: {
            // secondary (resting)
            small: 1,
            // secondary (focus, active, disabled)
            medium: tokens.spacing.xxxxSmall_2,
        },
    },
    size: {
        small: tokens.spacing.xLarge_32,
        medium: tokens.spacing.medium_16 + tokens.spacing.large_24,
        large: tokens.spacing.xLarge_32 + tokens.spacing.large_24,
    },
};

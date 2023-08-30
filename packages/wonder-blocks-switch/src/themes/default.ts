import {tokens} from "@khanacademy/wonder-blocks-theming";

const theme = {
    color: {
        bg: {
            switch: {
                off: tokens.color.offBlack50,
                disabledOff: tokens.color.offBlack32,
                activeOff: tokens.color.offBlack64,
                on: tokens.color.blue,
                disabledOn: tokens.color.fadedBlue,
                activeOn: tokens.color.activeBlue,
            },
            slider: {
                on: tokens.color.white,
                off: tokens.color.white,
            },
            icon: {
                on: tokens.color.blue,
                disabledOn: tokens.color.fadedBlue,
                off: tokens.color.offBlack50,
                disabledOff: tokens.color.offBlack32,
            },
        },
        outline: {
            default: tokens.color.blue,
        },
    },
    border: {
        radius: {
            // slider
            small: tokens.spacing.small_12,
            // switch
            full: tokens.border.radius.full,
        },
    },
    size: {
        height: {
            none: 0,
            // switch
            medium: 20,
            // slider
            large: tokens.spacing.large_24,
        },
        width: {
            none: 0,
            small: tokens.spacing.xxxxSmall_2,
            // NOTE: This token is specific to the Switch component
            // switch
            medium: 20,
            // NOTE: This token is specific to the Switch component
            // slider
            large: 40,
        },
        offset: {
            default: 1,
        },
    },
    spacing: {
        slider: {
            position: tokens.spacing.xxxxSmall_2,
        },
        icon: {
            position: tokens.spacing.xxxSmall_4,
        },
        transform: `translateX(${tokens.spacing.medium_16}px)`,
    },
};

export default theme;

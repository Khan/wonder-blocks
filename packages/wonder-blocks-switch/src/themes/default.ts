import {
    border,
    color,
    semanticColor,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";

const theme = {
    color: {
        bg: {
            switch: {
                off: semanticColor.core.border.neutral.default,
                disabledOff: semanticColor.core.border.disabled.strong,
                // NOTE: Adding this as a primitive token b/c we don't have a
                // semantic token for this background color
                activeOff: color.fadedOffBlack64,
                on: semanticColor.core.background.instructive.default,
                disabledOn: semanticColor.core.border.instructive.subtle,
                activeOn: semanticColor.core.background.instructive.strong,
            },
            slider: {
                on: semanticColor.icon.inverse,
                off: semanticColor.icon.inverse,
            },
            icon: {
                on: semanticColor.icon.action,
                // NOTE: We use border to match the switch color.
                disabledOn: semanticColor.core.border.instructive.subtle,
                off: semanticColor.core.border.neutral.default,
                disabledOff: semanticColor.icon.disabled,
            },
        },
    },
    border: {
        radius: {
            // slider
            small: border.radius.radius_120,
            // switch
            full: border.radius.radius_full,
        },
    },
    size: {
        height: {
            none: 0,
            // switch
            medium: 20,
            // slider
            large: spacing.large_24,
        },
        width: {
            none: 0,
            small: spacing.xxxxSmall_2,
            // NOTE: This token is specific to the Switch component
            // switch
            medium: 20,
            // NOTE: This token is specific to the Switch component
            // slider
            large: 40,
        },
    },
    spacing: {
        slider: {
            position: spacing.xxxxSmall_2,
        },
        icon: {
            position: spacing.xxxSmall_4,
        },
        transform: {
            default: `translateX(${spacing.medium_16}px)`,
            transition: "transform 0.15s ease-in-out",
        },
    },
};

export default theme;

import {
    border,
    color,
    semanticColor,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";

// The color of the switch is based on the action color.
const action = semanticColor.action.secondary.progressive;

const theme = {
    color: {
        bg: {
            switch: {
                off: action.default.border,
                disabledOff: semanticColor.action.disabled.default,
                // NOTE: Adding this as a primitive token b/c we don't have a
                // semantic token for this background color
                activeOff: color.fadedOffBlack64,
                on: action.default.foreground,
                disabledOn: action.press.background,
                activeOn: action.press.foreground,
            },
            slider: {
                on: semanticColor.icon.inverse,
                off: semanticColor.icon.inverse,
            },
            icon: {
                on: action.default.foreground,
                disabledOn: action.press.background,
                off: action.default.border,
                disabledOff: semanticColor.action.disabled.default,
            },
        },
        outline: {
            default: semanticColor.focus.outer,
        },
    },
    border: {
        radius: {
            // slider
            small: spacing.small_12,
            // switch
            full: border.radius.full,
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
        offset: {
            default: 1,
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

import * as tokens from "@khanacademy/wonder-blocks-tokens";

const {semanticColor} = tokens;

// The color of the switch is based on the action color.
const action = semanticColor.action.outlined.progressive;

const theme = {
    color: {
        bg: {
            switch: {
                off: action.default.border,
                disabledOff: semanticColor.action.disabled.default,
                activeOff: semanticColor.text.secondary,
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
            // TODO(WB-1856): Change with global focus token
            default: action.hover.border,
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
        transform: {
            default: `translateX(${tokens.spacing.medium_16}px)`,
            transition: "transform 0.15s ease-in-out",
        },
    },
};

export default theme;

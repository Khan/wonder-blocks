import {
    border,
    color,
    semanticColor,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";

export default {
    switch: {
        root: {
            border: {
                radius: {
                    default: border.radius.radius_120,
                    hover: border.radius.radius_120,
                    press: border.radius.radius_120,
                },
            },
            sizing: {
                height: spacing.large_24,
                width: 40, // Using hardcoded value since there's no matching token
            },
        },
        slider: {
            sizing: {
                height: 20, // Using hardcoded value since there's no matching token
                width: 20, // Using hardcoded value since there's no matching token
            },
            position: {
                top: spacing.xxxxSmall_2,
                left: spacing.xxxxSmall_2,
            },
            transform: {
                default: `translateX(${spacing.medium_16}px)`,
                transition: "transform 0.15s ease-in-out",
            },
        },
        icon: {
            position: {
                top: spacing.xxxSmall_4,
                left: spacing.xxxSmall_4,
            },
            transform: {
                default: `translateX(${spacing.medium_16}px)`,
                transition: "transform 0.15s ease-in-out",
            },
        },
        color: {
            bg: {
                switch: {
                    off: semanticColor.core.border.neutral.default,
                    disabledOff: semanticColor.core.border.disabled.strong,
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
                    disabledOn: semanticColor.core.border.instructive.subtle,
                    off: semanticColor.core.border.neutral.default,
                    disabledOff: semanticColor.icon.disabled,
                },
            },
        },
    },
};

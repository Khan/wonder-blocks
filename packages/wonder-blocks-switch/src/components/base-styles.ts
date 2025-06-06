import {
    border,
    color,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";

const baseStyles = {
    root: {
        border: {
            radius: {
                default: border.radius.radius_120,
                hover: border.radius.radius_120,
                press: border.radius.radius_120,
            },
        },
        sizing: {
            height: sizing.size_240,
            width: sizing.size_400,
        },
    },
    slider: {
        sizing: {
            height: sizing.size_200,
            width: sizing.size_200,
        },
        position: {
            top: sizing.size_020,
            left: sizing.size_020,
        },
        transform: {
            default: `translateX(${sizing.size_160})`,
            transition: "transform 0.15s ease-in-out",
        },
    },
    icon: {
        position: {
            top: sizing.size_040,
            left: sizing.size_040,
        },
        transform: {
            default: `translateX(${sizing.size_160})`,
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
};

export default baseStyles;

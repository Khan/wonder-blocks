import {color, semanticColor} from "@khanacademy/wonder-blocks-tokens";

const baseStyles = {
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

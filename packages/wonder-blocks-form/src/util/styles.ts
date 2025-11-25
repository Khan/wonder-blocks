import {border, sizing, semanticColor} from "@khanacademy/wonder-blocks-tokens";

type InteractionState = {
    background?: string;
    border?: string;
};

type ComponentState = {
    rest: InteractionState;
    hover: InteractionState;
    press: InteractionState;
};

type ComponentStates = {
    default: ComponentState;
    disabled: ComponentState;
    error: ComponentState;
};

export interface StyleMap {
    [key: string]: {
        unchecked: ComponentStates;
        checked: ComponentStates;
    };
}

export const baseStyles = {
    // Reusable base styles for Checkbox and Radio
    choice: {
        sizing: {
            // The checkbox/radio size
            size: sizing.size_160,
        },
        checked: {
            border: semanticColor.input.checked.border,
        },
        disabled: {
            border: semanticColor.input.disabled.border,
            background: semanticColor.input.disabled.background,
        },
        error: {
            border: semanticColor.input.error.border,
            background: semanticColor.input.error.background,
        },
        unchecked: {
            rest: {
                border: semanticColor.input.default.border,
                background: semanticColor.input.default.background,
            },
            hover: {
                border: semanticColor.action.secondary.progressive.hover.border,
                background:
                    semanticColor.action.secondary.progressive.hover.background,
            },
            press: {
                border: semanticColor.action.secondary.progressive.press.border,
                background:
                    semanticColor.action.secondary.progressive.press.background,
            },
        },
    },
    radio: {
        border: {
            radius: {
                default: border.radius.radius_full,
            },
            width: {
                default: border.width.thin,
            },
        },
    },
    checkbox: {
        border: {
            radius: {
                default: border.radius.radius_040,
            },
            width: {
                default: border.width.thin,
            },
        },
        sizing: {
            // The check icon size
            checkSize: sizing.size_120,
        },
        disabledChecked: {
            border: semanticColor.core.transparent,
            background: semanticColor.core.background.disabled.strong,
        },
    },
    icon: {
        default: {
            foreground: semanticColor.core.foreground.knockout.default,
        },
        disabled: {
            foreground: semanticColor.core.foreground.disabled.default,
        },
    },
};

// The different states that components can be in.
// These states reference baseStyles defaults with overrides where necessary.
export const colorStates: StyleMap = {
    checkbox: {
        unchecked: {
            default: baseStyles.choice.unchecked,
            disabled: {
                rest: baseStyles.choice.disabled,
                hover: baseStyles.choice.disabled,
                press: baseStyles.choice.disabled,
            },
            error: {
                rest: baseStyles.choice.error,
                hover: baseStyles.choice.error,
                press: {
                    ...baseStyles.choice.error,
                    border: semanticColor.core.border.critical.strong,
                },
            },
        },
        // specific styles for Checkbox states
        checked: {
            default: {
                rest: {
                    border: semanticColor.core.transparent,
                    background: semanticColor.input.checked.background,
                },
                hover: {
                    border: semanticColor.core.border.instructive.default,
                },
                press: {
                    border: semanticColor.input.checked.border,
                    background:
                        semanticColor.core.background.instructive.strong,
                },
            },
            disabled: {
                rest: baseStyles.checkbox.disabledChecked,
                hover: baseStyles.checkbox.disabledChecked,
                press: baseStyles.checkbox.disabledChecked,
            },
            error: {
                rest: {
                    background: semanticColor.core.border.critical.default,
                    border: semanticColor.core.border.critical.default,
                },
                hover: {
                    background: semanticColor.core.background.critical.default,
                    border: semanticColor.core.border.critical.default,
                },
                press: {
                    background: semanticColor.core.background.critical.strong,
                    border: semanticColor.core.border.critical.strong,
                },
            },
        },
    },
    radio: {
        unchecked: {
            default: baseStyles.choice.unchecked,
            disabled: {
                rest: baseStyles.choice.disabled,
                hover: baseStyles.choice.disabled,
                press: baseStyles.choice.disabled,
            },
            error: {
                rest: baseStyles.choice.error,
                hover: baseStyles.choice.error,
                press: {
                    ...baseStyles.choice.error,
                    border: semanticColor.core.border.critical.strong,
                },
            },
        },
        // specific styles for Radio states
        checked: {
            default: {
                rest: {
                    border: semanticColor.input.checked.background,
                    background: semanticColor.core.background.base.default,
                },
                hover: baseStyles.choice.checked,
                press: {
                    border: semanticColor.core.background.instructive.strong,
                    background:
                        semanticColor.core.background.instructive.strong,
                },
            },
            error: {
                rest: baseStyles.choice.error,
                hover: baseStyles.choice.error,
                press: {
                    ...baseStyles.choice.error,
                    background: semanticColor.core.background.critical.strong,
                    border: semanticColor.core.border.critical.strong,
                },
            },
            disabled: {
                rest: {
                    border: semanticColor.core.border.disabled.default,
                    background: semanticColor.core.background.base.default,
                },
                hover: {
                    border: semanticColor.core.border.disabled.strong,
                    background: semanticColor.core.background.base.default,
                },
                press: {
                    border: semanticColor.core.border.disabled.strong,
                    background: semanticColor.core.background.base.default,
                },
            },
        },
    },
};

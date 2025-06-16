import * as React from "react";
import {StyleSheet} from "aphrodite";

import {border, sizing, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";
import minusIcon from "@phosphor-icons/core/bold/minus-bold.svg";
import theme from "../theme/index";

import type {ChoiceCoreProps, Checked} from "../util/types";

// `AriaChecked` and `mapCheckedToAriaChecked()` are used to convert the
// `checked` prop value to a value that a screen reader can understand via the
// `aria-checked` attribute
type AriaChecked = "true" | "false" | "mixed";

function mapCheckedToAriaChecked(value: Checked): AriaChecked {
    switch (value) {
        case true:
            return "true";
        case false:
            return "false";
        default:
            return "mixed";
    }
}

const baseStyles = {
    // The checkbox size
    size: sizing.size_160,
    // The check icon size
    checkSize: sizing.size_120,
};

const StyledInput = addStyle("input");

/**
 * The internal stateless ☑️ Checkbox
 */
const CheckboxCore = React.forwardRef(function CheckboxCore(
    props: ChoiceCoreProps,
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    const {checked, disabled, error, groupName, id, testId, ...sharedProps} =
        props;

    const innerRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        // Keep the indeterminate state in sync with the checked prop
        if (innerRef.current != null) {
            innerRef.current.indeterminate = checked == null;
        }
    }, [checked, innerRef]);

    const handleChange: () => void = () => {
        // Empty because change is handled by ClickableBehavior
        return;
    };

    const stateStyles = _generateStyles(checked, error, disabled);

    const defaultStyle = [
        sharedStyles.inputReset,
        sharedStyles.default,
        stateStyles.default,
    ];

    const wrapperStyle = [theme.inputWrapper, stateStyles.inputWrapper];

    const checkboxIcon = (
        <PhosphorIcon
            color={
                disabled
                    ? theme.icon.disabled.foreground
                    : theme.icon.default.foreground
            }
            icon={checked ? checkIcon : minusIcon}
            size="small"
            style={[
                sharedStyles.checkboxIcon,
                // The check icon is smaller than the checkbox, as per design.
                {
                    width: baseStyles.checkSize,
                    height: baseStyles.checkSize,
                },
            ]}
        />
    );

    const ariaChecked = mapCheckedToAriaChecked(checked);

    const handleWrapperClick = (e: React.MouseEvent) => {
        // forward event from wrapper Div
        if (!disabled && e.target !== innerRef.current) {
            innerRef.current?.click();
        }
    };

    return (
        <React.Fragment>
            <View
                style={wrapperStyle}
                onClick={handleWrapperClick}
                testId="wb-checkbox-wrapper"
            >
                <StyledInput
                    {...sharedProps}
                    ref={(node) => {
                        // @ts-expect-error: current is not actually read-only
                        innerRef.current = node;
                        if (typeof ref === "function") {
                            ref(node);
                        } else if (ref != null) {
                            ref.current = node;
                        }
                    }}
                    type="checkbox"
                    aria-checked={ariaChecked}
                    aria-invalid={error}
                    checked={checked ?? undefined}
                    disabled={disabled}
                    id={id}
                    name={groupName}
                    // Need to specify because this is a controlled React form
                    // component, but we handle the click via ClickableBehavior
                    onChange={handleChange}
                    style={defaultStyle}
                    data-testid={testId}
                />
                {checked || checked == null ? checkboxIcon : <></>}
            </View>
        </React.Fragment>
    );
});

const sharedStyles = StyleSheet.create({
    inputWrapper: {
        position: "relative",
    },
    // Reset the default styled input element
    inputReset: {
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
    },

    default: {
        height: baseStyles.size,
        width: baseStyles.size,
        minHeight: baseStyles.size,
        minWidth: baseStyles.size,
        margin: 0,
        outline: "none",
        boxSizing: "border-box",
        borderStyle: "solid",
        borderWidth: theme.checkbox.border.width.default,
        borderRadius: theme.checkbox.border.radius.default,
    },

    checkboxIcon: {
        position: "absolute",
        pointerEvents: "none",
        // This margin is to center the check icon in the checkbox.
        margin: `calc((${baseStyles.size} - ${baseStyles.checkSize}) / 2)`,
    },
});

const styles: Record<string, any> = {};

const _generateStyles = (
    checked: Checked,
    error: boolean,
    disabled: boolean,
) => {
    // "hash" the parameters
    const styleKey = `${String(checked)}-${String(error)}-${String(disabled)}`;
    if (styles[styleKey]) {
        return styles[styleKey];
    }

    const isCheckedOrIndeterminate = checked || checked == null;
    const actionType = error ? "destructive" : "progressive";
    const styleType = isCheckedOrIndeterminate ? "primary" : "secondary";

    const colorAction = semanticColor.action[styleType][actionType];

    // The different states that the component can be in.
    const states = {
        // Resting state (shared between checked and unchecked)
        default: {
            border: colorAction.default.border,
            background: colorAction.default.background,
        },
        // Form validation error state
        error: {
            border: theme.choice.error.border,
            background: theme.choice.error.background,
        },
        // Disabled state
        disabled: theme.choice.disabled,
        // Disabled and checked state
        disabledChecked: theme.choice.disabledChecked,
    };

    let stateStyles: Record<string, any> = {};

    // Handle disabled states first
    if (disabled) {
        if (isCheckedOrIndeterminate) {
            // Disabled and checked/indeterminate
            stateStyles = {
                default: {
                    cursor: "auto",
                    backgroundColor: states.disabledChecked.background,
                    borderColor: states.disabledChecked.border,
                    borderWidth: theme.checkbox.border.width.default,
                },
            };
        } else {
            // Disabled and unchecked
            stateStyles = {
                default: {
                    cursor: "auto",
                    backgroundColor: states.disabled.background,
                    borderColor: states.disabled.border,
                    borderWidth: theme.checkbox.border.width.default,
                },
            };
        }
    } else if (isCheckedOrIndeterminate) {
        stateStyles = {
            inputWrapper: {
                // TODO(WB-1864): Revisit hover, press tokens
                ":hover input:not([disabled])": {
                    outline: `${border.width.medium} solid ${colorAction.hover.border}`,
                    outlineOffset: 1,
                },
            },
            default: {
                backgroundColor: states.default.background,
                borderColor: states.default.border,

                // Focus and hover have the same style. Focus style only shows
                // up with keyboard navigation.
                // TODO(WB-1864): Use focusStyles.focus
                ":focus-visible": {
                    outline: `${border.width.medium} solid ${semanticColor.focus.outer}`,
                    outlineOffset: 1,
                },

                ":active": {
                    outline: `${border.width.medium} solid ${colorAction.press.border}`,
                    outlineOffset: 1,
                    background: colorAction.press.background,
                },
            },
        };
        // Unchecked state
    } else {
        const currentState = error ? states.error : states.default;

        stateStyles = {
            inputWrapper: {
                ":hover input:not([disabled])": {
                    backgroundColor: error
                        ? theme.choice.error.background
                        : colorAction.hover.background,
                    outline: `${border.width.medium} solid ${colorAction.hover.border}`,
                    outlineOffset: -1,
                },
            },
            default: {
                backgroundColor: currentState.background,
                borderColor: currentState.border,

                // Focus and hover have the same style. Focus style only shows
                // up with keyboard navigation.
                // TODO(WB-1864): Use focusStyles.focus
                ":focus-visible": {
                    backgroundColor: error
                        ? theme.choice.error.background
                        : colorAction.hover.background,
                    outline: `${border.width.medium} solid ${semanticColor.focus.outer}`,
                    outlineOffset: -1,
                },

                ":active": {
                    backgroundColor: colorAction.press.background,
                    outline: `${border.width.medium} solid ${colorAction.press.border}`,
                    outlineOffset: -1,
                },
            },
        };
    }
    styles[styleKey] = StyleSheet.create(stateStyles);
    return styles[styleKey];
};

export default CheckboxCore;

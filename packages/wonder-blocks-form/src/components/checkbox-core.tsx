import * as React from "react";
import {StyleSheet} from "aphrodite";

import {border} from "@khanacademy/wonder-blocks-tokens";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";
import minusIcon from "@phosphor-icons/core/bold/minus-bold.svg";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import theme from "../theme/index";

import type {ChoiceCoreProps, Checked} from "../util/types";

import {colorStates, baseStyles} from "../util/styles";

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

    const wrapperStyle = [sharedStyles.inputWrapper, stateStyles.inputWrapper];

    const checkboxIcon = (
        <PhosphorIcon
            color={
                disabled
                    ? baseStyles.icon.disabled.foreground
                    : baseStyles.icon.default.foreground
            }
            icon={checked ? checkIcon : minusIcon}
            size="small"
            style={[
                sharedStyles.checkboxIcon,
                // The check icon is smaller than the checkbox, as per design.
                {
                    width: baseStyles.checkbox.sizing.checkSize,
                    height: baseStyles.checkbox.sizing.checkSize,
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
        margin: theme.choice.inputWrapper.layout.margin,
        padding: theme.choice.inputWrapper.layout.padding,
        position: "relative",
    },
    // Reset the default styled input element
    inputReset: {
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
    },

    default: {
        height: baseStyles.choice.sizing.size,
        width: baseStyles.choice.sizing.size,
        minHeight: baseStyles.choice.sizing.size,
        minWidth: baseStyles.choice.sizing.size,
        margin: 0,
        outline: "none",
        boxSizing: "border-box",
        borderStyle: "solid",
        borderWidth: baseStyles.checkbox.border.width.default,
        borderRadius: baseStyles.checkbox.border.radius.default,
    },

    checkboxIcon: {
        position: "absolute",
        pointerEvents: "none",
        // This margin is to center the check icon in the checkbox.
        margin: `calc((${baseStyles.choice.sizing.size} - ${baseStyles.checkbox.sizing.checkSize}) / 2)`,
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

    let stateStyles: Record<string, any> = {};

    type ChoiceState = "default" | "disabled" | "error";

    const currentState: ChoiceState = error
        ? "error"
        : disabled
          ? "disabled"
          : "default";

    if (isCheckedOrIndeterminate) {
        const checkedStyles = colorStates.checkbox.checked[currentState];
        stateStyles = {
            inputWrapper: {
                // TODO(WB-1864): Revisit hover, press tokens
                ":hover input:not([disabled])": {
                    outline: `${border.width.medium} solid ${checkedStyles.hover.border}`,
                    outlineOffset: 1,
                },
            },
            default: {
                backgroundColor: checkedStyles.rest.background,
                borderColor: checkedStyles.rest.border,

                // Use the global focus style
                ":focus-visible:not([disabled])":
                    focusStyles.focus[":focus-visible"],

                ":active:not([disabled])": {
                    outline: `${border.width.medium} solid ${checkedStyles.press.border}`,
                    outlineOffset: 1,
                    background: checkedStyles.press.background,
                    // Add border to ensure error press state matches background
                    borderColor: checkedStyles.press.background,
                },
            },
        };
    } else {
        // Unchecked state
        const uncheckedStyles = colorStates.checkbox.unchecked[currentState];
        stateStyles = {
            inputWrapper: {
                ":hover input:not([disabled])": {
                    backgroundColor: uncheckedStyles.hover.background,
                    outline: `${border.width.medium} solid ${uncheckedStyles.hover.border}`,
                    outlineOffset: -1,
                },
            },
            default: {
                backgroundColor: uncheckedStyles.rest.background,
                borderColor: uncheckedStyles.rest.border,

                ":focus-visible:not([disabled])": {
                    ...focusStyles.focus,
                },

                ":active:not([disabled])": {
                    backgroundColor: uncheckedStyles.press.background,
                    outline: `${border.width.medium} solid ${uncheckedStyles.press.border}`,
                    outlineOffset: -1,
                },
            },
        };
    }
    styles[styleKey] = StyleSheet.create(stateStyles);
    return styles[styleKey];
};

export default CheckboxCore;

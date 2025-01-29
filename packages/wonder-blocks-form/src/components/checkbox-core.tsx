import * as React from "react";
import {StyleSheet} from "aphrodite";

import {
    border,
    spacing,
    semanticColor,
} from "@khanacademy/wonder-blocks-tokens";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";
import minusIcon from "@phosphor-icons/core/bold/minus-bold.svg";

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

// The checkbox size
const size = spacing.medium_16;
// The check icon size
const checkSize = spacing.small_12;

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

    const stateStyles = _generateStyles(checked, error);

    const defaultStyle = [
        sharedStyles.inputReset,
        sharedStyles.default,
        !disabled && stateStyles.default,
        disabled && sharedStyles.disabled,
    ];

    const checkboxIcon = (
        <PhosphorIcon
            color={
                disabled
                    ? semanticColor.icon.disabled
                    : semanticColor.icon.inverse
            }
            icon={checked ? checkIcon : minusIcon}
            size="small"
            style={[
                sharedStyles.checkboxIcon,
                // The check icon is smaller than the checkbox, as per design.
                {
                    width: checkSize,
                    height: checkSize,
                },
            ]}
        />
    );

    const ariaChecked = mapCheckedToAriaChecked(checked);

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
});

const disabledState = {
    border: semanticColor.border.primary,
    background: semanticColor.action.disabled.secondary,
};

const sharedStyles = StyleSheet.create({
    // Reset the default styled input element
    inputReset: {
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
    },

    default: {
        height: size,
        width: size,
        minHeight: size,
        minWidth: size,
        margin: 0,
        outline: "none",
        boxSizing: "border-box",
        borderStyle: "solid",
        borderWidth: border.width.hairline,
        borderRadius: border.radius.small_3,
    },

    disabled: {
        cursor: "auto",
        backgroundColor: disabledState.background,
        borderColor: disabledState.border,
        borderWidth: border.width.hairline,
    },

    checkboxIcon: {
        position: "absolute",
        pointerEvents: "none",
        // This margin is to center the check icon in the checkbox.
        margin: (size - checkSize) / 2,
    },
});

const styles: Record<string, any> = {};

const _generateStyles = (checked: Checked, error: boolean) => {
    // "hash" the parameters
    const styleKey = `${String(checked)}-${String(error)}`;
    if (styles[styleKey]) {
        return styles[styleKey];
    }

    const isCheckedOrIndeterminate = checked || checked == null;
    const actionType = error ? "destructive" : "progressive";
    const styleType = isCheckedOrIndeterminate ? "filled" : "outlined";

    const colorAction = semanticColor.action[styleType][actionType];

    // The different states that the component can be in.
    const states = {
            border: colorAction.default.border,
            background: colorAction.default.background,
        },
        // Form validation error state
        error: {
            border: semanticColor.status.critical.foreground,
            background: semanticColor.status.critical.background,
        },
    };

    let newStyles: Record<string, any> = {};

    if (isCheckedOrIndeterminate) {
            default: {
                backgroundColor: states.default.background,
                borderColor: states.default.border,

                // Focus and hover have the same style. Focus style only shows
                // up with keyboard navigation.
                ":focus-visible": {
                    // TODO(WB-1856): Define global pattern for focus styles
                    outline: `${border.width.thin}px solid ${colorAction.hover.border}`,
                    outline: `${border.width.thin}px solid ${colorAction.hover.border}`,
                    outlineOffset: 1,
                },

                ":active": {
                    outline: `${border.width.thin}px solid ${colorAction.press.border}`,
                    outlineOffset: 1,
                    background: colorAction.press.background,
                },
            },
        };
        // Unchecked state
    } else {
        const currentState = error ? states.error : states.default;

        newStyles = {
            default: {
                backgroundColor: currentState.background,
                borderColor: currentState.border,

                // Focus and hover have the same style. Focus style only shows
                // up with keyboard navigation.
                ":focus-visible": {
                    backgroundColor: error
                        ? states.error.background
                        : colorAction.hover.background,
                    // TODO(WB-1856): Define global pattern for focus styles
                    outline: `${border.width.thin}px solid ${colorAction.hover.border}`,
                    outlineOffset: -1,
                },

                ":hover": {
                    backgroundColor: error
                        ? states.error.background
                        : colorAction.hover.background,
                    outline: `${border.width.thin}px solid ${colorAction.hover.border}`,
                    outlineOffset: -1,
                },

                ":active": {
                    backgroundColor: colorAction.press.background,
                    outline: `${border.width.thin}px solid ${colorAction.press.border}`,
                    outlineOffset: -1,
                },
            },
        };
    }
    styles[styleKey] = StyleSheet.create(newStyles);
    return styles[styleKey];
};

export default CheckboxCore;

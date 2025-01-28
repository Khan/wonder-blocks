import * as React from "react";
import {StyleSheet} from "aphrodite";

import {border, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {addStyle} from "@khanacademy/wonder-blocks-core";

import type {ChoiceCoreProps, Checked} from "../util/types";

const StyledInput = addStyle("input");

/**
 * The internal stateless 🔘 Radio button
 */ const RadioCore = React.forwardRef(function RadioCore(
    props: ChoiceCoreProps,
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    const handleChange = () => {
        // Empty because change is handled by ClickableBehavior
        return;
    };

    const {checked, disabled, error, groupName, id, testId, ...sharedProps} =
        props;

    const stateStyles = _generateStyles(checked, error);
    const defaultStyle = [
        sharedStyles.inputReset,
        sharedStyles.default,
        !disabled && stateStyles.default,
        disabled && sharedStyles.disabled,
    ];

    return (
        <React.Fragment>
            <StyledInput
                {...sharedProps}
                type="radio"
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
                ref={ref}
            />
            {disabled && checked && <span style={disabledChecked} />}
        </React.Fragment>
    );
});

const disabledState = {
    border: semanticColor.border.primary,
    background: semanticColor.action.disabled.secondary,
};

const size = 16; // circle with a different color. Here, we add that center circle. // If the checkbox is disabled and selected, it has a border but also an inner
const disabledChecked = {
    position: "absolute",
    top: size / 4,
    left: size / 4,
    height: size / 2,
    width: size / 2,
    borderRadius: "50%",
    backgroundColor: semanticColor.action.disabled.default,
} as const;

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
        borderRadius: "50%",
    },
    disabled: {
        cursor: "auto",
        backgroundColor: disabledState.background,
        borderColor: disabledState.border,
        borderWidth: border.width.hairline,
    },
});

const styles: Record<string, any> = {};
const _generateStyles = (checked: Checked, error: boolean) => {
    // "hash" the parameters
    const styleKey = `${String(checked)}-${String(error)}`;
    if (styles[styleKey]) {
        return styles[styleKey];
    }
    const actionType = error ? "destructive" : "progressive";
    // NOTE: Radio buttons use the outlined style regardless of the checked
    // state.
    const colorAction = semanticColor.action.outlined[actionType];

    // The different states that the component can be in.
    const states = {
        // Resting state (unchecked)
        unchecked: {
            border: semanticColor.border.strong,
            background: colorAction.default.background,
        },
        checked: {
            // NOTE: This is a special case where the border is the same color
            // as the foreground. This should change as soon as we simplify the
            // existing `action` tokens.
            border: colorAction.default.foreground,
            background: colorAction.default.background,
        },
        // Form validation error state
        error: {
            border: semanticColor.status.critical.foreground,
            background: semanticColor.status.critical.background,
        },
    };

    let newStyles: Record<string, any> = {};
    if (checked) {
        newStyles = {
            default: {
                backgroundColor: states.checked.background,
                borderColor: states.checked.border,
                borderWidth: size / 4,

                // Focus and hover have the same style. Focus style only shows
                // up with keyboard navigation.
                ":focus-visible": {
                    // TODO(WB-1856): Define global pattern for focus styles
                    outline: `${border.width.thin}px solid ${semanticColor.border.focus}`,
                    outlineOffset: 1,
                },

                ":hover": {
                    outline: `${border.width.thin}px solid ${colorAction.hover.border}`,
                    outlineOffset: 1,
                },

                ":active": {
                    outline: `${border.width.thin}px solid ${colorAction.press.border}`,
                    outlineOffset: 1,
                    borderColor: colorAction.press.border,
                },
            },
        };
    } else {
        const currentState = error ? states.error : states.unchecked;

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
                    outline: `${border.width.thin}px solid ${semanticColor.border.focus}`,
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

export default RadioCore;

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
        backgroundColor: semanticColor.action.disabled.secondary,
        borderColor: semanticColor.border.primary,
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

    let newStyles: Record<string, any> = {};
    if (checked) {
        newStyles = {
            default: {
                backgroundColor: colorAction.default.background,
                borderColor: colorAction.default.foreground,
                borderWidth: size / 4,

                // Focus and hover have the same style. Focus style only shows
                // up with keyboard navigation.
                ":focus-visible": {
                    outline: `${border.width.thin}px solid ${colorAction.hover.border}`,
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
        newStyles = {
            default: {
                backgroundColor: error
                    ? semanticColor.status.critical.background
                    : colorAction.default.background,
                borderColor: error
                    ? semanticColor.status.critical.foreground
                    : colorAction.default.border,

                // Focus and hover have the same style. Focus style only shows
                // up with keyboard navigation.
                ":focus-visible": {
                    backgroundColor: error
                        ? semanticColor.status.critical.background
                        : colorAction.hover.background,
                    outline: `${border.width.thin}px solid ${colorAction.hover.border}`,
                    outlineOffset: -1,
                },

                ":hover": {
                    backgroundColor: error
                        ? semanticColor.status.critical.background
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

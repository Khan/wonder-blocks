import * as React from "react";
import {StyleSheet} from "aphrodite";

import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import theme from "../theme/index";
import type {ChoiceCoreProps, Checked} from "../util/types";

const StyledInput = addStyle("input");

/**
 * The internal stateless 🔘 Radio button
 */ const RadioCore = React.forwardRef(function RadioCore(
    props: ChoiceCoreProps,
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    const innerRef = React.useRef<HTMLInputElement>(null);

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

    const wrapperStyle = [theme.inputWrapper, stateStyles.inputWrapper];

    const handleWrapperClick = (e: React.MouseEvent) => {
        // forward event from wrapper Div
        if (!disabled && e.target !== innerRef?.current) {
            innerRef?.current?.click();
        }
    };

    return (
        <React.Fragment>
            <View style={wrapperStyle} onClick={handleWrapperClick}>
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
                    ref={(node) => {
                        // @ts-expect-error: current is not actually read-only
                        innerRef.current = node;
                        if (typeof ref === "function") {
                            ref(node);
                        } else if (ref != null) {
                            ref.current = node;
                        }
                    }}
                />
                {disabled && checked && <span style={disabledChecked} />}
            </View>
        </React.Fragment>
    );
});

const baseStyles = {
    size: sizing.size_160,
};

const disabledChecked = {
    position: "absolute",
    top: `calc(${baseStyles.size} * .25 + ${theme.inputWrapper.padding})`,
    left: `calc(${baseStyles.size} * .25 + ${theme.inputWrapper.padding})`,
    height: `calc(${baseStyles.size} / 2)`,
    width: `calc(${baseStyles.size} / 2)`,
    borderRadius: theme.radio.border.radius.default,
    backgroundColor: semanticColor.core.border.disabled.strong,
} as const;

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
        borderWidth: theme.radio.border.width.default,
        borderRadius: theme.radio.border.radius.default,
    },
    disabled: {
        cursor: "auto",
        backgroundColor: semanticColor.input.disabled.background,
        borderColor: semanticColor.input.disabled.border,
        borderWidth: theme.radio.border.width.default,
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
    // NOTE: Radio buttons use the secondary style regardless of the checked
    // state.
    const colorAction = semanticColor.action.secondary[actionType];

    const coreType = error ? "critical" : "instructive";
    const colorCore = semanticColor.core.background[coreType];

    // The different states that the component can be in.
    const states = {
        // Resting state (unchecked)
        unchecked: {
            border: semanticColor.input.default.border,
            background: colorCore.subtle,
        },
        checked: {
            // NOTE: This is a special case where the border is the same color
            // as the foreground. This should change as soon as we simplify the
            // existing `action` tokens.
            border: colorAction.default.foreground,
            background: colorCore.subtle,
        },
        // Form validation error state
        error: {
            border: semanticColor.input.error.border,
            background: semanticColor.input.error.background,
        },
    };

    let newStyles: Record<string, any> = {};
    if (checked) {
        newStyles = {
            inputWrapper: {
                // TODO(WB-1864): Revisit hover, press tokens
                ":hover input": {
                    outline: `${border.width.medium} solid ${colorAction.hover.border}`,
                    outlineOffset: 1,
                },
            },
            default: {
                backgroundColor: states.checked.background,
                borderColor: states.checked.border,
                // borders need to render in pixels for consistent size
                borderWidth: `calc(${baseStyles.size} / 4)`,

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
                    borderColor: colorAction.press.border,
                },
            },
        };
    } else {
        const currentState = error ? states.error : states.unchecked;

        newStyles = {
            inputWrapper: {
                // TODO(WB-1864): Revisit hover, press tokens
                ":hover input": {
                    backgroundColor: error
                        ? states.error.background
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
                        ? states.error.background
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
    styles[styleKey] = StyleSheet.create(newStyles);
    return styles[styleKey];
};

export default RadioCore;

import * as React from "react";
import {StyleSheet} from "aphrodite";

import {border} from "@khanacademy/wonder-blocks-tokens";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import theme from "../theme/index";
import type {ChoiceCoreProps, Checked} from "../util/types";

import {colorStates, baseStyles} from "../util/styles";

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

    const stateStyles = _generateStyles(checked, error, disabled);
    const defaultStyle = [
        sharedStyles.inputReset,
        sharedStyles.default,
        stateStyles.default,
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
                {disabled && checked && (
                    <span style={stateStyles.disabledChecked} />
                )}
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
        height: baseStyles.radio.sizing.size,
        width: baseStyles.radio.sizing.size,
        minHeight: baseStyles.radio.sizing.size,
        minWidth: baseStyles.radio.sizing.size,
        margin: 0,
        outline: "none",
        boxSizing: "border-box",
        borderStyle: "solid",
        borderWidth: baseStyles.radio.border.width.default,
        borderRadius: baseStyles.radio.border.radius.default,
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

    let newStyles: Record<string, any> = {};

    type ChoiceState = "default" | "disabled" | "error";

    const currentState: ChoiceState = error
        ? "error"
        : disabled
          ? "disabled"
          : "default";

    if (checked) {
        const checkedStyles = colorStates.radio.checked[currentState];
        newStyles = {
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
                // borders need to render in pixels for consistent size
                borderWidth: `calc(${baseStyles.radio.sizing.size} / 4)`,

                // Use the global focus style
                ":focus-visible:not([disabled])":
                    focusStyles.focus[":focus-visible"],

                ":active:not([disabled])": {
                    outline: `${border.width.medium} solid ${checkedStyles.press.border}`,
                    outlineOffset: 1,
                    borderColor: checkedStyles.press.border,
                },
            },
            disabledChecked: {
                position: "absolute",
                top: `calc(${baseStyles.radio.sizing.size} * .25 + ${theme.inputWrapper.padding})`,
                left: `calc(${baseStyles.radio.sizing.size} * .25 + ${theme.inputWrapper.padding})`,
                height: `calc(${baseStyles.radio.sizing.size} / 2)`,
                width: `calc(${baseStyles.radio.sizing.size} / 2)`,
                borderRadius: baseStyles.radio.border.radius.default,
                backgroundColor: checkedStyles.rest.background,
            },
        };
    } else {
        const uncheckedStyles = colorStates.radio.unchecked[currentState];
        newStyles = {
            inputWrapper: {
                // TODO(WB-1864): Revisit hover, press tokens
                ":hover input:not([disabled])": {
                    backgroundColor: uncheckedStyles.hover.background,
                    outline: `${border.width.medium} solid ${uncheckedStyles.hover.border}`,
                    outlineOffset: -1,
                },
            },
            default: {
                backgroundColor: uncheckedStyles.rest.background,
                borderColor: uncheckedStyles.rest.border,

                // Use the global focus style
                ":focus-visible:not([disabled])":
                    focusStyles.focus[":focus-visible"],

                ":active:not([disabled])": {
                    backgroundColor: uncheckedStyles.press.background,
                    outline: `${border.width.medium} solid ${uncheckedStyles.press.border}`,
                    outlineOffset: -1,
                },
            },
        };
    }
    styles[styleKey] = StyleSheet.create(newStyles);
    return styles[styleKey];
};

export default RadioCore;

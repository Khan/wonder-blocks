import * as React from "react";
import {StyleSheet} from "aphrodite";

import {mix, color} from "@khanacademy/wonder-blocks-tokens";
import {addStyle} from "@khanacademy/wonder-blocks-core";

import type {ChoiceCoreProps, Checked} from "../util/types";

const {blue, red, white, offWhite, offBlack16, offBlack32, offBlack50} = color;

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
                data-test-id={testId}
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
    backgroundColor: offBlack32,
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
        borderWidth: 1,
        borderRadius: "50%",
    },
    disabled: {
        cursor: "auto",
        backgroundColor: offWhite,
        borderColor: offBlack16,
        borderWidth: 1,
    },
});
const fadedBlue = mix(color.fadedBlue16, white);
const fadedRed = mix(color.fadedRed8, white);
const colors = {
    default: {
        faded: fadedBlue,
        base: blue,
        active: color.activeBlue,
    },
    error: {
        faded: fadedRed,
        base: red,
        active: color.activeRed,
    },
} as const;
const styles: Record<string, any> = {};
const _generateStyles = (checked: Checked, error: boolean) => {
    // "hash" the parameters
    const styleKey = `${String(checked)}-${String(error)}`;
    if (styles[styleKey]) {
        return styles[styleKey];
    }
    const palette = error ? colors.error : colors.default;
    let newStyles: Record<string, any> = {};
    if (checked) {
        newStyles = {
            default: {
                backgroundColor: white,
                borderColor: palette.base,
                borderWidth: size / 4,

                // Focus and hover have the same style. Focus style only shows
                // up with keyboard navigation.
                ":focus-visible": {
                    boxShadow: `0 0 0 1px ${white}, 0 0 0 3px ${palette.base}`,
                },

                ":hover": {
                    boxShadow: `0 0 0 1px ${white}, 0 0 0 3px ${palette.base}`,
                },

                ":active": {
                    boxShadow: `0 0 0 1px ${white}, 0 0 0 3px ${palette.active}`,
                    borderColor: palette.active,
                },
            },
        };
    } else {
        newStyles = {
            default: {
                backgroundColor: error ? fadedRed : white,
                borderColor: error ? red : offBlack50,

                // Focus and hover have the same style. Focus style only shows
                // up with keyboard navigation.
                ":focus-visible": {
                    backgroundColor: error ? fadedRed : white,
                    borderColor: palette.base,
                    borderWidth: 2,
                },

                ":hover": {
                    backgroundColor: error ? fadedRed : white,
                    borderColor: palette.base,
                    borderWidth: 2,
                },

                ":active": {
                    backgroundColor: palette.faded,
                    borderColor: error ? color.activeRed : blue,
                    borderWidth: 2,
                },
            },
        };
    }
    styles[styleKey] = StyleSheet.create(newStyles);
    return styles[styleKey];
};

export default RadioCore;

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Spacing from "@khanacademy/wonder-blocks-spacing";
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

const {blue, red, white, offWhite, offBlack16, offBlack32, offBlack50} = Color;

// The checkbox size
const size = Spacing.medium_16;
// The check icon size
const checkSize = Spacing.small_12;

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
            color={disabled ? offBlack32 : white}
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
                data-test-id={testId}
            />
            {checked || checked == null ? checkboxIcon : <></>}
        </React.Fragment>
    );
});

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
        borderRadius: 3,
    },

    disabled: {
        cursor: "auto",
        backgroundColor: offWhite,
        borderColor: offBlack16,
        borderWidth: 1,
    },

    checkboxIcon: {
        position: "absolute",
        pointerEvents: "none",
        // This margin is to center the check icon in the checkbox.
        margin: (size - checkSize) / 2,
    },
});

const fadedBlue = mix(fade(blue, 0.16), white);
const activeBlue = mix(offBlack32, blue);
const fadedRed = mix(fade(red, 0.08), white);
const activeRed = mix(offBlack32, red);

const colors = {
    default: {
        faded: fadedBlue,
        base: blue,
        active: activeBlue,
    },
    error: {
        faded: fadedRed,
        base: red,
        active: activeRed,
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
    if (checked || checked == null) {
        newStyles = {
            default: {
                backgroundColor: palette.base,
                borderWidth: 0,

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
                    background: palette.active,
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
                    borderColor: error ? activeRed : blue,
                    borderWidth: 2,
                },
            },
        };
    }
    styles[styleKey] = StyleSheet.create(newStyles);
    return styles[styleKey];
};

export default CheckboxCore;

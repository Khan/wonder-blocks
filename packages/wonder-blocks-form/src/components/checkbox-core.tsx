import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import Icon from "@khanacademy/wonder-blocks-icon";

import type {IconAsset} from "@khanacademy/wonder-blocks-icon";
import type {ChoiceCoreProps} from "../util/types";

type Checked = boolean | null | undefined;

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

const StyledInput = addStyle("input");

const checkPath: IconAsset = {
    small: "M11.263 4.324a1 1 0 1 1 1.474 1.352l-5.5 6a1 1 0 0 1-1.505-.036l-2.5-3a1 1 0 1 1 1.536-1.28L6.536 9.48l4.727-5.157z",
};

const indeterminatePath: IconAsset = {
    small: "M3 8C3 7.44772 3.44772 7 4 7H12C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9H4C3.44772 9 3 8.55228 3 8Z",
};

/**
 * The internal stateless ☑️ Checkbox
 */
export default class CheckboxCore extends React.Component<ChoiceCoreProps> {
    handleChange: () => void = () => {
        // Empty because change is handled by ClickableBehavior
        return;
    };

    render(): React.ReactNode {
        const {
            checked,
            disabled,
            error,
            groupName,
            id,
            testId,
            ...sharedProps
        } = this.props;

        const stateStyles = _generateStyles(checked, error);

        const defaultStyle = [
            sharedStyles.inputReset,
            sharedStyles.default,
            !disabled && stateStyles.default,
            disabled && sharedStyles.disabled,
        ];

        const props = {
            "data-test-id": testId,
        } as const;

        const checkboxIcon = (
            <Icon
                color={disabled ? offBlack32 : white}
                icon={checked ? checkPath : indeterminatePath}
                size="small"
                style={sharedStyles.checkboxIcon}
            />
        );

        const ariaChecked = mapCheckedToAriaChecked(checked);

        return (
            <React.Fragment>
                <StyledInput
                    {...sharedProps}
                    type="checkbox"
                    role="checkbox"
                    aria-checked={ariaChecked}
                    aria-invalid={error}
                    checked={checked}
                    disabled={disabled}
                    id={id}
                    name={groupName}
                    // Need to specify because this is a controlled React form
                    // component, but we handle the click via ClickableBehavior
                    onChange={this.handleChange}
                    style={defaultStyle}
                    {...props}
                />
                {/* // ariaChecked is truthy if it is true or "mixed"  */}
                {checked || checked == null ? checkboxIcon : <></>}
            </React.Fragment>
        );
    }
}

const size = 16;

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

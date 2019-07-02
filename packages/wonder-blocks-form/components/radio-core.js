// @flow

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import {addStyle} from "@khanacademy/wonder-blocks-core";

import type {ChoiceCoreProps} from "../util/types.js";

type Props = {|
    ...ChoiceCoreProps,
    hovered: boolean,
    focused: boolean,
    pressed: boolean,
|};

const {blue, red, white, offWhite, offBlack16, offBlack32, offBlack50} = Color;

const StyledInput = addStyle("input");

/**
 * The internal stateless 🔘 Radio button
 */ export default class RadioCore extends React.Component<Props> {
    handleChange = () => {
        // Empty because change is handled by ClickableBehavior
        return;
    };

    render() {
        const {
            checked,
            disabled,
            error,
            groupName,
            id,
            testId,
            hovered,
            focused,
            pressed,
            ...sharedProps
        } = this.props;
        const stateStyles = _generateStyles(checked, error);
        const defaultStyle = [
            sharedStyles.inputReset,
            sharedStyles.default,
            stateStyles.default,
            !disabled &&
                (pressed
                    ? stateStyles.active
                    : (hovered || focused) && stateStyles.focus),
            disabled && sharedStyles.disabled,
        ];
        const props = {
            "data-test-id": testId,
        };
        return (
            <React.Fragment>
                <StyledInput
                    {...sharedProps}
                    type="radio"
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
                {disabled && checked && <span style={disabledChecked} />}
            </React.Fragment>
        );
    }
}
const size = 16; // circle with a different color. Here, we add that center circle. // If the checkbox is disabled and selected, it has a border but also an inner
const disabledChecked = {
    position: "absolute",
    top: size / 4,
    left: size / 4,
    height: size / 2,
    width: size / 2,
    borderRadius: "50%",
    backgroundColor: offBlack32,
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
};
const styles = {};
const _generateStyles = (checked, error) => {
    // "hash" the parameters
    const styleKey = `${String(checked)}-${String(error)}`;
    if (styles[styleKey]) {
        return styles[styleKey];
    }
    const palette = error ? colors.error : colors.default;
    let newStyles = {};
    if (checked) {
        newStyles = {
            default: {
                backgroundColor: white,
                borderColor: palette.base,
                borderWidth: size / 4,
            },
            focus: {
                boxShadow: `0 0 0 1px ${white}, 0 0 0 3px ${palette.base}`,
            },
            active: {
                boxShadow: `0 0 0 1px ${white}, 0 0 0 3px ${palette.active}`,
                borderColor: palette.active,
            },
        };
    } else {
        newStyles = {
            default: {
                backgroundColor: error ? fadedRed : white,
                borderColor: error ? red : offBlack50,
            },
            focus: {
                backgroundColor: error ? fadedRed : white,
                borderColor: palette.base,
                borderWidth: 2,
            },
            active: {
                backgroundColor: palette.faded,
                borderColor: error ? activeRed : blue,
                borderWidth: 2,
            },
        };
    }
    styles[styleKey] = StyleSheet.create(newStyles);
    return styles[styleKey];
};

// @flow
import React from "react";
import renderer from "react-test-renderer";

import CheckboxCore from "./components/checkbox-core.js";
import RadioCore from "./components/radio-core.js";

const states = ["default", "error", "disabled"];
const clickableStates = ["default", "hovered", "pressed"];
const checkedStates = [false, true];

const defaultHandlers = {
    onClick: () => void 0,
    onMouseEnter: () => void 0,
    onMouseLeave: () => void 0,
    onMouseDown: () => void 0,
    onMouseUp: () => void 0,
    onTouchStart: () => void 0,
    onTouchEnd: () => void 0,
    onTouchCancel: () => void 0,
    onKeyDown: () => void 0,
    onKeyUp: () => void 0,
    onFocus: () => void 0,
    onBlur: () => void 0,
};

describe("CheckboxCore", () => {
    states.forEach((state) => {
        clickableStates.forEach((clickableState) => {
            checkedStates.forEach((checked) => {
                test(`type:${state} state:${clickableState} checked:${String(
                    checked,
                )}`, () => {
                    const disabled = state === "disabled";
                    const tree = renderer
                        .create(
                            <CheckboxCore
                                checked={checked}
                                disabled={disabled}
                                error={state === "error"}
                                hovered={clickableState === "hovered"}
                                pressed={clickableState === "pressed"}
                                focused={clickableState === "focused"}
                                tabIndex={disabled ? -1 : 0}
                                {...defaultHandlers}
                            />,
                        )
                        .toJSON();
                    expect(tree).toMatchSnapshot();
                });
            });
        });
    });
});

describe("RadioCore", () => {
    states.forEach((state) => {
        clickableStates.forEach((clickableState) => {
            checkedStates.forEach((checked) => {
                test(`type:${state} state:${clickableState} checked:${String(
                    checked,
                )}`, () => {
                    const disabled = state === "disabled";
                    const tree = renderer
                        .create(
                            <RadioCore
                                checked={checked}
                                disabled={disabled}
                                error={state === "error"}
                                hovered={clickableState === "hovered"}
                                pressed={clickableState === "pressed"}
                                focused={clickableState === "focused"}
                                tabIndex={disabled ? -1 : 0}
                                {...defaultHandlers}
                            />,
                        )
                        .toJSON();
                    expect(tree).toMatchSnapshot();
                });
            });
        });
    });
});

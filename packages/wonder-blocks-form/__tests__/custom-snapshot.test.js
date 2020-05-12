// @flow
import React from "react";
import renderer from "react-test-renderer";

import CheckboxCore from "../components/checkbox-core.js";
import RadioCore from "../components/radio-core.js";

const states = ["default", "error", "disabled"];
const clickableStates = ["default", "hovered", "pressed"];
const checkedStates = [false, true];

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
                            />,
                        )
                        .toJSON();
                    expect(tree).toMatchSnapshot();
                });
            });
        });
    });
});

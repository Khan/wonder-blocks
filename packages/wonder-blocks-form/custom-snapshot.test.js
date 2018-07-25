// @flow
import React from "react";
import renderer from "react-test-renderer";

import CheckboxCore from "./components/checkbox-core.js";

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
                    const tree = renderer
                        .create(
                            <CheckboxCore
                                checked={checked}
                                disabled={state === "disabled"}
                                error={state === "error"}
                                hovered={clickableState === "hovered"}
                                pressed={clickableState === "pressed"}
                            />,
                        )
                        .toJSON();
                    expect(tree).toMatchSnapshot();
                });
            });
        });
    });
});

import React from "react";
// @ts-expect-error [FEI-5019] - TS7016 - Could not find a declaration file for module 'react-test-renderer'. '/Users/kevinbarabash/khan/wonder-blocks/node_modules/react-test-renderer/index.js' implicitly has an 'any' type.
import renderer from "react-test-renderer";

import CheckboxCore from "../components/checkbox-core";
import RadioCore from "../components/radio-core";

const states = ["default", "error", "disabled"];
const clickableStates = ["default", "hovered", "pressed"];
const checkedStates = [false, true];

describe("CheckboxCore", () => {
    states.forEach((state: any) => {
        clickableStates.forEach((clickableState: any) => {
            checkedStates.forEach((checked: any) => {
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
                                waiting={false}
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
    states.forEach((state: any) => {
        clickableStates.forEach((clickableState: any) => {
            checkedStates.forEach((checked: any) => {
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
                                waiting={false}
                            />,
                        )
                        .toJSON();
                    expect(tree).toMatchSnapshot();
                });
            });
        });
    });
});

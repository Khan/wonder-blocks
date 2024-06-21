import * as React from "react";
import {render} from "@testing-library/react";

import CheckboxCore from "../components/checkbox-core";
import RadioCore from "../components/radio-core";

const states = ["default", "error", "disabled"];
const checkedStates = [false, true, null];

describe("CheckboxCore", () => {
    states.forEach((state: any) => {
        checkedStates.forEach((checked: any) => {
            test(`type:${state} checked:${String(checked)}`, () => {
                const disabled = state === "disabled";
                const {container} = render(
                    <CheckboxCore
                        checked={checked}
                        disabled={disabled}
                        error={state === "error"}
                        onClick={() => {}}
                    />,
                );

                expect(container).toMatchSnapshot();
            });
        });
    });
});

describe("RadioCore", () => {
    states.forEach((state: any) => {
        checkedStates.forEach((checked: any) => {
            test(`type:${state} checked:${String(checked)}`, () => {
                const disabled = state === "disabled";
                const {container} = render(
                    <RadioCore
                        checked={checked}
                        disabled={disabled}
                        error={state === "error"}
                        onClick={() => {}}
                    />,
                );

                expect(container).toMatchSnapshot();
            });
        });
    });
});

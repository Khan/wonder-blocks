// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FocusTrap from "../focus-trap.js";

describe("FocusTrap", () => {
    it("finds the first focusable node correctly", () => {
        render(
            <>
                <FocusTrap>
                    <div tabIndex="-1">
                        <label>
                            <input type="radio" name="group" value="1" />
                            first option
                        </label>
                    </div>
                    <div tabIndex="-1">
                        <label>
                            <input type="radio" name="group" value="2" />
                            second option
                        </label>
                    </div>
                </FocusTrap>
                <input type="text" />
            </>,
        );

        const firstRadioButton = screen.getByRole("radio", {
            name: /first option/i,
        });

        firstRadioButton.focus();

        userEvent.tab();

        // eslint-disable-next-line testing-library/no-node-access
        expect(document.activeElement).toBe(firstRadioButton);
    });
});
